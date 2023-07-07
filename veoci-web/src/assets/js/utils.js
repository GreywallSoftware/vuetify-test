import _ from 'lodash'
import $ from 'jquery'
import store from '@/veoci-store/veoci-store'
import * as types from '@/veoci-store/veoci-mutation-types'
import { veocijs } from '@shared/vue-plugins/veocijs-instance'
import {
  generateUUID,
  convertPogi,
  convertAggregateType
} from '@shared/js/utils/general'
import {
  isNumeric,
  endsWith
} from '@shared/js/utils/string'
import { convertToSeconds } from '@shared/filters/veoci-filters'
import { processExtraFilter } from './utils/gridUtils'
import { isNoArgCond } from '@shared/filters/filter-options'
import { htmlEnc } from '@shared/js/utils/html'
import moment from 'moment'
import { setI18nLanguage } from '@shared/i18n'

export function processLanguage () {
  // map of our supported languages
  const supportedLanguages = {
    en: true,
    es: true,
    fr: true,
    pt: true
  }

  // set the start locale to use
  const browserLanguage = navigator.language.split('-')[0]
  if (this.$store.state.authdUser && this.$store.state.authdUser.user &&
    this.$store.state.authdUser.user.userPrefs &&
    this.$store.state.authdUser.user.userPrefs.language) {
    if (this.$getUserPref('language', 'en') !== this.language) {
      // if there is a language preference stored, then load it into our store now
      setI18nLanguage(this.$store.state.authdUser.user.userPrefs.language.value)
    }
  } else if (browserLanguage && supportedLanguages[browserLanguage]) {
    // if the browser default is a supported language, load that up now
    setI18nLanguage(browserLanguage)
  } else {
    // otherwise load the default
    setI18nLanguage('en')
  }
}

/**
 * This is an important util function.  YOU CANNOT TRIGGER AN API REQUEST IMMEDIATELY ON IDLE RETURN
 * If you do, there is a high probability it'll trigger an unauth when the user's session is not actuall expired
 * This is because the auth token is only valid for 10 minutes and doesn't refresh while idle.
 * @param callback
 */
export function checkRefresh (callback) {
  // we need to add a check to make sure the token refresh is not firing while we are coming back in parallel
  // with the token refresh endpoint.  Doing so will result in an auth error if the access token expired while idle
  const checkRefresh = function () {
    setTimeout(function () {
      if (!store.state.auth.refreshingTokens) {
        callback()
      } else {
        checkRefresh()
      }
    }, 100)
  }
  // put it in a next tick to make sure the refresh is triggered before we try to process it
  this.$nextTick(() => {
    checkRefresh()
  })
}

export function getFilterFromStore (filterData) {
  // copied from /veoci-client/veoci-mobile/src/utils/filter-util.js
  const options = {}
  const searchString = filterData?.filter?.text ? filterData.filter.text : null
  const geofence = filterData?.filter?.geofence ? filterData.filter.geofence : null
  let displayOptions = false
  if (filterData?.filter?.options?.draftDisplay === 'show-drafts' || filterData?.filter?.options?.draftDisplay === 'show-only-drafts' || filterData?.filter?.options?.bypassArchiving === 'bypass-archiving') {
    displayOptions = true
  }
  if (filterData?.filter?.groups?.length || searchString || filterData?.grouping?.groupBy?.length || geofence || filterData?.filter?.options?.entryLimit || displayOptions) {
    options.filters = convertVueToVeociFilter.call(this, {
      vueFilter: filterData.filter,
      vueSort: filterData.sort[0],
      vueGroup: filterData.grouping
    })
    if (filterData?.grouping?.groupBy[0]) {
      options.sortCol = filterData?.sort instanceof Array && filterData.sort[0]?.colId ? filterData.sort[0]?.colId : 'lastModified'
      options.sortDir = filterData?.sort instanceof Array ? filterData.sort[0]?.sort === 'asc' : false
    }
  } else {
    options.sortCol = filterData?.sort instanceof Array && filterData.sort[0]?.colId ? filterData.sort[0]?.colId : 'lastModified'
    options.sortDir = filterData?.sort instanceof Array ? filterData.sort[0]?.sort === 'asc' : false
  }
  return options
}

export function encodeURIComponentWithoutSpecialCharacters (string) {
  if (!string) {
    return ''
  }
  string = string.replace(/\[|\]|%/g, '')
  return encodeURIComponent(string)
}

export function isScriptLoaded (src) {
  return !!document.querySelector('script[src="' + src + '"]')
}

/**
 * Used to inject a script dynamically and returns a promise
 * @param src
 * @returns {Promise<any>}
 */
export function injectScript (src, maxRetries = 2, retryDelay = 500) {
  let retries = 0
  const loadScript = (resolve, reject) => {
    const script = document.createElement('script')
    script.async = true
    script.src = src
    script.addEventListener('load', () => {
      resolve()
    })
    script.addEventListener('error', () => {
      retries++
      if (retries <= maxRetries) {
        setTimeout(() => {
          loadScript(resolve, reject)
        }, retryDelay)
      } else {
        reject('Stripe is not loading, Please try again after some time.')
      }
    })
    script.addEventListener('abort', () => {
      retries++
      if (retries <= maxRetries) {
        setTimeout(() => {
          loadScript(resolve, reject)
        }, retryDelay)
      } else {
        reject('Stripe loading is aborted, Please try again after some time.')
      }
    })
    document.head.appendChild(script)
  }
  if (isScriptLoaded(src)) {
    return new Promise((resolve) => {
      resolve()
    })
  } else {
    return new Promise((resolve, reject) => {
      loadScript(resolve, reject)
    })
  }
}

/**
 * Takes a Vue saved view structure and converts it into what the Veoci back end is expecting.
 * Hopefully we can deprecate this someday, but I'm not optimistic
 * vueFilter - filter rows in vue format, can also include cell highlighting filters
 * vueSort - sort column and sort direction in vue format
 * vueGroup - group column, group sort direction and aggregate data in vue format
 * vueColumnState - list of columns in vue format
 * buildForSavedView - boolean value, if true than we are buiding the view to save as a view so we want to include things like columns
 * and we want to save the sort data correctly depending on if there is a group defined
 * @returns {{sortCol: string, searchString: (*|string), entryLimit: number, columns: Array, showExactDates: boolean, aggregates: Array, filters: *, groupBy: null, sortDir: boolean}}
 */
export function convertVueToVeociFilter ({ vueFilter, vueSort, vueGroup, vueColumnState, buildForSavedView } = {}) {
  const filters = {
    advancedFilters: {
      anyAll: 'all',
      displayFilters: [],
      filters: [],
      type: 'advanced'
    }
  }
  let extraFilter
  _.each(vueFilter?.groups, (group, index) => {
    if (index === 0) {
      filters.advancedFilters = {
        anyAll: group.condition || 'all',
        displayFilters: [],
        filters: [],
        type: 'advanced'
      }

      _.each(group?.rows, (row) => {
        const filter = formatFilterForServer({
          row,
          dashboardParam: vueFilter.dashboardQuery,
          supportsEntityMatch: true
        })
        if (filter) {
          if (!row.extraFilter) {
            filters.advancedFilters.filters.push(filter)
          } else {
            extraFilter = filter
          }
        }
      })
    } else {
      const _filters = []
      filters.advancedFilters.filters.push({
        type: 'subgroup',
        subgroup: {
          anyAll: group.condition,
          filters: _filters,
          type: 'advanced'
        }
      })

      _.each(group?.rows, (row) => {
        const filter = formatFilterForServer({
          row,
          dashboardParam: vueFilter.dashboardQuery,
          supportsEntityMatch: true
        })
        if (filter) {
          _filters.push(filter)
        }
      })
    }
  })
  // This is to handle clicking a group count on a summary tile for a filter that has a top level anyAll value of any
  // in this case we need to nest the full filter on the view inside a subgroup and add the "extra filter" as the first filter group
  if (extraFilter) {
    const newFilters = [extraFilter, {
      type: 'subgroup',
      subgroup: {
        type: 'advanced',
        anyAll: 'any',
        filters: filters.advancedFilters.filters
      }
    }]
    filters.advancedFilters.anyAll = 'all'
    filters.advancedFilters.filters = newFilters
  }
  const colorFilters = vueFilter?.colors && vueFilter?.colors.length ? vueFilter?.colors[0]?.rows : null
  _.each(colorFilters, (row) => {
    const filter = formatFilterForServer({ row, supportsEntityMatch: false })
    if (filter) {
      filters.advancedFilters.displayFilters.push({
        columnId: filter.columnId,
        condition: filter.condition,
        type: filter.type,
        value: filter.value,
        bgColor: row.bgColor,
        bgColorName: row.bgColorName
      })
    }
  })
  const sortDir = {
    asc: true,
    desc: false
  }
  const columns = []
  if (buildForSavedView) {
    _.each(vueColumnState, (column) => {
      if (column.children) {
        _.each(column.children, (child) => {
          columns.push({
            id: child.field || child.colId,
            hidden: child.hide || false,
            width: child.width,
            pinned: child.pinned || 'none'
          })
        })
      } else {
        columns.push({
          id: column.field || column.colId,
          hidden: column.hide || false,
          width: column.width,
          pinned: column.pinned || 'none'
        })
      }
    })
  }
  // if we are not saving a view and a group column is set then the group by column should be set as the sort col
  vueSort = vueSort?.colId === 'folderName' ? this?.defaultSortObject : vueSort // #63181
  let sortCol = vueSort && vueSort.colId && vueSort.colId !== 'ag-Grid-AutoColumn' ? vueSort.colId : 'lastModified'
  let sortDirection = vueSort && vueSort.sort && sortDir[vueSort.sort] ? sortDir[vueSort.sort] : false
  if (!buildForSavedView && vueGroup?.groupBy[0]) {
    sortCol = vueGroup.groupBy[0]?.column || vueGroup.groupBy[0]
      sortDirection = true
  }

  const veociView = {
    aggregates: _.map(vueGroup?.aggregates, aggregate => {
      return {
        type: convertAggregateType(aggregate.type),
        field: aggregate.column
      }
    }),
    columns,
    filters: !_.isEmpty(filters.advancedFilters) ? filters : {},
    searchString: vueFilter?.text || '',
    showExactDates: vueFilter?.options?.dateDisplay === 'exact',
    sortCol,
    sortDir: sortDirection,
    bypassSqlTable: vueFilter?.bypassSqlTable
  }

  // the stepOwner column on the server needs to be referred to as owners for sorting and grouping
  // for filtering it needs to be stepOwner
  if (veociView.sortCol === 'stepOwner') {
    veociView.sortCol = 'owners'
  }

  // only supporting single groupings on the entries grid currently
  if (vueGroup && vueGroup.groupBy) {
    const groups = []
    _.each(vueGroup.groupBy, (group) => {
      let groupColumn
      if (typeof group === 'string') {
        groupColumn = group
      } else {
        // we have the new multiple grouping format where group is an object
        groupColumn = group.column
        if (group.format && group.format !== 'none') {
          groupColumn = `${groupColumn}|${group.format}`
        }
      }

      if (groupColumn === 'folderName' && this && this.viewType !== 'FORM') {
        // ignore. Not sure how this happens, but the column folderName should only be set from the forms grid #65964
      } else {
        if (groupColumn === 'stepOwner') {
          groupColumn = 'owners'
        }

        if (typeof group === 'string') {
          veociView.groupBy = groupColumn
        } else {
          groups.push(groupColumn)
        }
      }
    })
    if (groups.length) {
      veociView.groupBy = groups.toString()
      veociView.groupByData = vueGroup.groupBy
      // I think this has something to do with paging and lets the backend know which groups to return first
      if (!buildForSavedView && vueGroup?.groupBy[0] && groups.length === 1) {
        veociView.sortCol = veociView.groupBy
        veociView.sortDirection = true
      }
    } else {
      if (vueGroup.groupLimit) {
        veociView.groupEntryLimit = vueGroup.groupLimit
      }
      if (vueGroup.collapseGroups) {
        veociView.collapseGroups = vueGroup.collapseGroups
      }
      veociView.groupBySort = vueGroup.sort || 'asc'
    }
  }

  if (vueFilter?.geofence) {
    veociView.geofence = vueFilter.geofence
  }
  if (vueFilter?.geofenceAnyAll) {
    veociView.filters.advancedFilters.geofenceAnyAll = vueFilter.geofenceAnyAll
  }
  if (vueFilter?.options?.draftDisplay === 'show-drafts') {
    veociView.includeDrafts = true
  } else if (vueFilter?.options?.draftDisplay === 'show-only-drafts') {
    veociView.includeOnlyUserDrafts = true
  }

  if (vueFilter?.options?.bypassArchiving === 'bypass-archiving') {
    veociView.bypassArchiving = true
  }

  if (vueGroup?.includeGroupsNotPresent) {
    veociView.includeGroupsNotPresent = vueGroup?.includeGroupsNotPresent
  }

  if (vueFilter?.options?.wrapText) {
    veociView.wrapText = vueFilter.options.wrapText
  }

  if (vueFilter?.cardwall) {
    veociView.cardwall = {
      columnSelector: vueFilter.cardwall.columnField,
      visibleData: vueFilter.cardwall.fields
    }
  }
  if (vueFilter?.options?.entryLimit) {
    veociView.entryLimit = vueFilter?.options?.entryLimit
  }

  return veociView
}

/**
 * Convers an existing Veoci "saved view filter" into something that makes more logical sense for the Vue filter builder
 * @param veociFilter
 * @param fastFiltering
 * @param dynamicFilters filters that come from dynamic filters on dashboard
 * @returns {{filter: {columns: *, action: string, groups: Array, text: string}, sort: {sort: string, colId: (string|*)}[]}}
 */
export function convertVeociToVueFilter (veociFilter, fastFiltering, dynamicFilters) {
  const geofence = veociFilter?.vgrid?.geofence || veociFilter?.geofence
  veociFilter = veociFilter?.vgrid || veociFilter

  let bypassSqlTable = true
  if (fastFiltering) {
    bypassSqlTable = !!veociFilter?.bypassSqlTable
  }

  const vueFilter = {
    filter: {
      action: 'FILTER',
      groups: [],
      colors: [{
        rows: [],
        uuid: generateUUID()
      }],
      options: {
        dateDisplay: veociFilter?.showExactDates ? 'exact' : 'relative',
        bypassArchiving: veociFilter?.bypassArchiving ? 'bypass-archiving' : 'archive',
        entryLimit: veociFilter?.entryLimit,
        wrapText: veociFilter?.wrapText
      },
      text: veociFilter?.searchString || '',
      dashboardQuery: false,
      bypassSqlTable
    },
    grouping: {
      groupBy: [],
      aggregates: [],
      allExpanded: true,
      includeGroupsNotPresent: false
    },
    sort: [{
      colId: veociFilter?.sortCol === 'owners' ? 'stepOwner' : veociFilter?.sortCol,
      sort: veociFilter?.sortDir ? 'asc' : 'desc'
    }]
  }

  // Columns that are currently displayed
  if (veociFilter?.columns) {
    vueFilter.columns = _.map(veociFilter.columns, (col) => {
      return {
        colId: col.id,
        field: col.id,
        hide: col.hidden,
        pinned: col.pinned || 'none'
      }
    })
  }

  // Draft display options
  if (veociFilter?.includeDrafts) {
    vueFilter.filter.options.draftDisplay = 'show-drafts'
  } else if (veociFilter?.includeOnlyUserDrafts) {
    vueFilter.filter.options.draftDisplay = 'show-only-drafts'
  } else {
    vueFilter.filter.options.draftDisplay = 'no-drafts'
  }

  // See comment in convertVueToVeociFunction. Now we need to convert this back to something the grid will understand
  // move the nested filters back to the top level and add the extraFilter to the first filter group marked with extraFilter as true
  const hasNestedSubgroup = veociFilter?.filters?.advancedFilters?.filters[1]?.type === 'subgroup' && veociFilter?.filters?.advancedFilters?.filters[1]?.subgroup?.filters[1]?.type === 'subgroup'
  let extraFilter
  if (hasNestedSubgroup) {
    extraFilter = veociFilter?.filters?.advancedFilters?.filters[0]
    const actualFilters = veociFilter?.filters?.advancedFilters?.filters[1]?.subgroup?.filters
    veociFilter.filters.advancedFilters.filters = actualFilters
    veociFilter.filters.advancedFilters.anyAll = veociFilter?.filters?.advancedFilters?.filters[1]?.subgroup?.anyAll
  }

  if (!vueFilter.filter.groups[0]) {
    vueFilter.filter.groups[0] = {
      condition: veociFilter?.filters?.advancedFilters?.anyAll,
      rows: []
    }
  }
  _.each(veociFilter?.filters?.advancedFilters?.filters, (filterRow) => {
    // the old filters had nested groups like this
    if (filterRow.type === 'subgroup') {
      const newGroup = {
        condition: filterRow.subgroup.anyAll,
        rows: [],
        uuid: generateUUID()
      }
      _.each(filterRow.subgroup.filters, (_filter) => {
        const filter = formatFilterRowForVue(_filter, dynamicFilters)
        if (filter.paramName) {
          vueFilter.filter.dashboardQuery = true
        } else if (filter.condition === 'between' && (filter.value?.paramLower || filter.value?.paramUpper || filter.value?.lower?.paramName || filter.value?.upper?.paramName)) {
          vueFilter.filter.dashboardQuery = true
        }
        newGroup.rows.push(filter)
      })
      vueFilter.filter.groups.push(newGroup)
    } else {
      const filter = formatFilterRowForVue(filterRow, dynamicFilters)
      if (filter.paramName) {
        vueFilter.filter.dashboardQuery = true
      } else if (filter.condition === 'between' && (filter.value?.paramLower || filter.value?.paramUpper || filter.value?.lower?.paramName || filter.value?.upper?.paramName)) {
        vueFilter.filter.dashboardQuery = true
      }
      vueFilter.filter.groups[0].rows.push(filter)
    }
  })
  if (extraFilter) {
    const filter = formatFilterRowForVue(extraFilter)
    filter.extraFilter = true
    vueFilter.filter.groups[0].rows.push(filter)
  }
  _.each(veociFilter?.filters?.advancedFilters?.displayFilters, (colorRow) => {
    const filter = formatFilterRowForVue(colorRow)
    filter.bgColor = colorRow.bgColor
    filter.bgColorName = colorRow.bgColorName
    vueFilter.filter.colors[0].rows.push(filter)
  })

  // Grouping
  if (veociFilter?.groupByData) {
    vueFilter.grouping.groupBy = veociFilter.groupByData
  } else {
    if (veociFilter?.groupBy) {
      // date groups can set another value like year, month, week, etc
      const groupValue = veociFilter.groupBy === 'owners' ? 'stepOwner' : veociFilter.groupBy
      vueFilter.grouping.groupBy.push(groupValue)
    }
    vueFilter.grouping.sort = veociFilter?.groupBySort || 'asc'
    vueFilter.grouping.groupLimit = veociFilter?.groupEntryLimit
    vueFilter.grouping.collapseGroups = veociFilter?.collapseGroups
    vueFilter.grouping.allExpanded = !veociFilter?.collapseGroups
    if (veociFilter?.includeGroupsNotPresent) {
      vueFilter.grouping.includeGroupsNotPresent = veociFilter?.includeGroupsNotPresent
    }
  }
  if (veociFilter?.aggregates) {
    vueFilter.grouping.aggregates = _.map(veociFilter?.aggregates, aggregate => {
      return {
        type: convertAggregateType(aggregate.type),
        column: aggregate.field
      }
    })
  }
  if (geofence) {
    vueFilter.filter.geofence = geofence
    vueFilter.filter.geofenceAnyAll = veociFilter?.filters?.advancedFilters?.geofenceAnyAll
  }
  return vueFilter
}

/**
 * Converts vue filter row to a veoci filter row
 * @param row the filter row in the vue format
 * @param dashboardParam if true include the param name
 * @returns {{condition: *, columnId: *, type: *, value: *}}
 */
export function formatFilterForServer ({ row, dashboardParam, supportsEntityMatch }) {
  // Somehow a nested subgroup was created with no other properties in the object and this is the only place I can think of that would cause this
  // Nested subgroups can happen when a group count is click on dashboard summary tile (see ticket 54896). Handled in convertVueToVeoci function.
  if (row.type === 'subgroup') {
    return
  }
  // there is a case where the type is changed from duration to dateTime? #80964
  if (row.type === 'dateTime' && row.column === 'duration') {
    // change the type back to duration
    row.type = 'duration'
  }
  let type = row.type
  let value = row.value
  let columnId = row.column
  if (row.value?.rule) {
    const val = row.value.value === 'Fundefined' ? null : row.value.value
    let ruleType
    let textValue
    if (val) {
      ruleType = 'select'
      textValue = {
        type: 'rule',
        value: {
          type: row.value.type,
          value: val
        }
      }
    } else { // if value is Fundefined then just treat is as a regular text field and save the value as null
      ruleType = 'text'
      textValue = {
        value: val,
        type: 'text'
      }
    }
    return {
      columnId: row.column,
      condition: row.condition,
      type: ruleType,
      value: textValue
    }
  }
  switch (row.type) {
    case 'text':
      const blankValue = row.condition.match(/oneof/) ? [] : ''
      if (typeof value !== 'string' && !row.condition.match(/oneof/)) {
        value = value?.value
        if (value?.value?.type === 'custom') {
          value = value?.value?.value
        }
      }
      type = 'text'
      // just trying to make sure value is always set to an empty array if it's not defined
      if (!value && row.condition.match(/oneof/)) {
        value = []
      }
      value = {
        type: 'text',
        value: value || blankValue
      }
      break
    case 'number':
      if (row.condition === 'between') {
        type = row.condition
        let newValue = row.value
        if (row.value) {
          newValue = {
            includeLower: row.value.includeLower || false, // if row.value.includeLower is undefined, set it to false
            includeUpper: row.value.includeUpper || false,
            lower: row.value.lower ? Number(row.value.lower) : row.value.lower,
            upper: row.value.upper ? Number(row.value.upper) : row.value.upper
          }
        }
        if (newValue?.lower?.toString() && newValue?.upper?.toString()) { // if the lower or upper value is 0, the condition is going to be false
          if (!('includeLower' in newValue)) {
            // includeLower hasn't been added for some reason so add it here
            newValue.includeLower = row.value.includeLower
          } else if (!('includeUpper' in newValue)) {
            newValue.includeUpper = row.value.includeUpper
          }
          value = {
            type: row.condition,
            value: newValue
          }
        } else {
          value = {
            type: row.condition,
            value: {}
          }
        }
      } else if (row.column === 'orgSequenceId') {
        type = 'text'
        value = {
          type: 'text',
          value: row.value
        }
      } else {
        let val = row.value ? row.value.toString() : row.value
        if (row.condition.match(/oneof/)) {
          val = row.value || []
        }
        type = 'text'
        value = {
          type: 'text',
          value: val
        }
      }
      break
    case 'date':
    case 'dateTime':
      const regEx = /^\d{4}-\d{2}-\d{2}$/
      if (row.condition === 'between') {
        if (!value) {
          value = {}
        }
        if (value && !value.dateOnly && row.type === 'date') {
          value.dateOnly = true
        }
        if (!value.lower) {
          value.lower = {
            type: 'abs',
            value: null,
            dateOnly: row.type === 'date',
            upper: false
          }
        }

        if (!value.upper) {
          value.upper = {
            type: 'abs',
            value: null,
            dateOnly: row.type === 'date',
            upper: true
          }
        }

        if (!value.lower.type) {
          value.lower.type = value.lower.relDate ? 'rel' : 'abs'
        }

        if (!value.upper.type) {
          value.upper.type = value.upper.relDate ? 'rel' : 'abs'
        }

        const newVal = {
          includeLower: value.includeLower,
          includeUpper: value.includeUpper,
          lower: value.lower,
          upper: value.upper,
          dateOnly: value.dateOnly
        }
        if (value.paramLower && value.lower) {
          newVal.lower.paramName = value.paramLower
        }
        if (value.paramUpper && value.upper) {
          newVal.upper.paramName = value.paramUpper
        }
        if (row.type === 'date' && newVal.lower?.type === 'rel' && typeof newVal.lower?.value === 'object') {
          newVal.lower.value = newVal.lower.value?.value
        }
        if (row.type === 'date' && newVal.lower?.value && typeof newVal.lower.value === 'string' && !newVal.lower.value?.match(regEx)) {
          newVal.lower.value = moment(new Date(newVal.lower.value)).format('YYYY-MM-DD')
        }
        if (row.type === 'date' && newVal.upper?.type === 'rel' && typeof newVal.upper?.value === 'object') {
          newVal.upper.value = newVal.upper?.value?.value
        }
        if (row.type === 'date' && newVal.upper?.value && typeof newVal.upper.value === 'string' && !newVal.upper.value?.match(regEx)) {
          newVal.upper.value = moment(new Date(newVal.upper.value)).format('YYYY-MM-DD')
        }
        value = {
          type: 'betweenDate',
          value: newVal,
          dateOnly: row.type === 'date'
        }
      } else if (row.condition === 'thisyear') {
        type = 'thisyear'
      } else if (row.condition === 'nothisyear') {
        type = 'nothisyear'
      } else if (row.condition === 'today') {
        type = 'today'
      } else if (row.condition === 'notoday') {
        type = 'notoday'
      } else if (row.condition === 'thismonth') {
        type = 'thismonth'
      } else if (row.condition === 'nothismonth') {
        type = 'nothismonth'
      } else if (row.value?.value?.dateFormat) {
        type = 'text'
        value = {
          type: 'text',
          value: row.value?.value?.value
        }
        columnId = `${columnId}|${row.value?.value?.dateFormat}`
      } else if (row.value?.type === 'custom') {
        if (!row.value?.value?.value) {
          value = null
        } else if (row.value?.value?.value) {
          value = {
            type: 'text',
            value: row.value?.value?.value
          }
        }
        type = 'text'
      }
      if (row.type === 'date' && row.value?.value && typeof row.value?.value === 'string' && !row.value?.value?.match(regEx)) {
        row.value.value = moment(new Date(row.value.value)).format('YYYY-MM-DD')
      }

      // Check if the relative or absolute date has a nested value property, if it does then set value to the inner value
      if (value?.value && typeof value.value === 'object' && (value.value.type === 'rel' || value.value.type === 'abs')) {
        value.value = value.value.value
      }

      // Verify if the type is defined, if it's not then value should not be defined
      const hasType = !!value?.value?.type || !!value?.type
      if (!hasType) {
        value = undefined
      }
      break
    case 'entity':
      if (isNoArgCond(row.condition)) {
        value = row.value
        type = row.condition
      } else if ((typeof row.value === 'string' && row.value !== '') || !supportsEntityMatch) {
        type = 'text'
        value = {
          type: 'text',
          value: row.value?.name || row.value?.value || row.value
        }
      } else {
        type = 'text'
        value = row.value && row.value !== '' ? {
          type: 'entity',
          value: {
            displayName: row.value?.name,
            entityType: row.value?.entityType,
            id: row.value?.id,
            name: row.value?.name
          }
        } : {
          type: 'entity',
          value: null
        }
      }
      break
    case 'container':
      if (row.condition === 'sameRoomSet') {
        type = 'sameRoomSet'
      } else if (row.condition === 'currentContainer') {
        type = 'currentContainer'
      } else {
        type = 'text'
      }
      if (!row.value) {
        value = {
          type: 'text',
          value: null
        }
      }
      break
    case 'messageType':
      type = 'select'
      break
    case 'select':
      const blankVal = row.condition?.match(/oneof/) ? [] : value
      type = 'select'
      value = {
        type: 'select',
        value: value || blankVal
      }
      break
    case 'duration':
      type = 'dateTime'
      if (row.condition === 'between') {
        let lower = value?.lower
        let upper = value?.upper
        if (typeof lower === 'object') {
          lower = lower.relDate.number
        }
        if (typeof upper === 'object') {
          upper = upper.relDate.number
        }
        value = {
          type: row.condition,
          value: {
            lower: {
              type: 'duration',
              value: convertToSeconds(lower, row.units),
              relDate: {
                number: lower,
                units: row.units
              }
            },
            upper: {
              type: 'duration',
              value: convertToSeconds(upper, row.units),
              relDate: {
                number: upper,
                units: row.units
              }
            },
            includeLower: value?.includeLower,
            includeUpper: value?.includeUpper
          }
        }
      } else {
        value = {
          type: 'duration',
          value: convertToSeconds(value, row.units),
          relDate: {
            number: value,
            units: row.units
          }
        }
      }
  }
  const filter = isNoArgCond(row.condition)
    ? {
      columnId,
      condition: row.condition,
      type
    }
    : {
      columnId,
      condition: row.condition,
      type,
      value
    }
  if (dashboardParam) {
    filter.paramName = row.paramName
  }
  return filter
}

export function formatFilterRowForVue (row, dynamicFilters) {
  let type = row.type
  const dynamicValue = row.paramName ? dynamicFilters?.[row.paramName] : null
  let value = dynamicValue ? processExtraFilter({ key: dynamicValue }, row.type) : row.value
  let units
  if (row.value?.type === 'rule') {
    const filter = {
      column: row.columnId,
      condition: row.condition,
      type: 'text',
      value: {
        rule: true,
        type: 'SUBSTITUTION',
        value: row.value.value.value
      }
    }
    return filter
  }
  const splitColumn = row.columnId?.split('|')
  if (splitColumn && splitColumn[1]) {
    return {
      column: splitColumn[0],
      condition: row.condition,
      type: 'date',
      value: {
        type: 'text',
        value: {
          dateFormat: splitColumn[1],
          value: row?.value?.value,
          type: 'custom'
        }
      }
    }
  }
  if (row.type === 'between') {
    type = 'number'
    value = value?.value
  } else if ((row.type === 'date' || row.type === 'dateTime') && row.condition === 'between') {
    // set to date or dateTime
    type = row.type
    const newVal = {
      dateOnly: value?.value?.dateOnly,
      includeLower: value?.value?.includeLower,
      includeUpper: value?.value?.includeUpper,
      lower: value?.value?.lower,
      upper: value?.value?.upper
    }
    if (value?.value?.lower?.paramName) {
      newVal.paramLower = value.value.lower.paramName
      const lowerDynamicValue = newVal.paramLower ? dynamicFilters?.[newVal.paramLower] : null
      if (lowerDynamicValue) {
        newVal.lower = processExtraFilter({ key: lowerDynamicValue }, row.type)
      }
    }
    if (value?.value?.upper?.paramName) {
      newVal.paramUpper = value.value.upper.paramName
      const upperDynamicValue = newVal.paramUpper ? dynamicFilters?.[newVal.paramUpper] : null
      if (upperDynamicValue) {
        newVal.upper = processExtraFilter({ key: upperDynamicValue }, row.type)
      }
    }
    value = newVal
  } else if (value && ((row.type === 'text' || row.type === 'select') && typeof value === 'object')) {
    if (value.type === 'entity') {
      type = value.type
    }
    if (row.type === 'text' && row.condition === 'between') {
      // ignore value should stay the same
    } else if (_.isEmpty(value.value)) {
      if (!dynamicValue) {
        value = null
      }
    } else {
      value = value.value
    }
  } else if (row.columnId === 'wfProgress') {
    value = value?.value || value
    switch (value) {
      case 'In Progress':
        value = 'IN_PROGRESS'
        break
      case 'Closed':
        value = 'CLOSED'
        break
      case 'Rejected':
        value = 'REJECTED'
        break
      case 'Draft':
        value = 'DRAFT'
        break
    }
  } else if (row.columnId === 'duration') {
    units = value.relDate.units
    value = value.relDate.number
  }
  const filter = {
    column: row.columnId,
    condition: row.condition,
    type,
    value
  }

  if (units) {
    filter.units = units
  }

  if (row.paramName) {
    filter.paramName = row.paramName
  }
  return filter
}

/**
 * Converts a given "web API" message into the "v1" version.  This is to increase inerop between the two APIs by building
 * a consistent format.  This WILL go away when the v2 messaging is build
 * @param webMessage
 * @returns {{container: {name: (*|jQuery|*|*|*), id: *}, extraInfoType: *, flags: *, messageId: *, thread: *, message: *, sent: *, uuid: string, entryId: *, extraXML: *, mode: *, location: *, activityType: *, user: {displayName: *, id: *}}}
 */
export function convertWebMessageToV1 (webMessage) {
  const newMessage = {
    activityType: webMessage.activityType,
    container: {
      name: webMessage.chatName,
      id: webMessage.chatId
    },
    entryId: webMessage.entryId,
    extraXML: webMessage.extraXmlInfo,
    extraInfoType: webMessage.extraInfoType,
    flags: webMessage.flags,
    location: webMessage.location,
    message: webMessage.message,
    messageId: webMessage.messageId,
    mode: webMessage.mode,
    sent: webMessage.time,
    thread: webMessage.threadId,
    user: {
      displayName: webMessage.userDisplayName,
      id: webMessage.userId
    },
    uuid: generateUUID()
  }
  // parse out the pogi string into JSON
  convertPogi(newMessage, 'extraXML')
  return newMessage
}

/**
 * MOVE_ME
 * Returns a profile photo URL from a given user
 * This likely doesn't belong here and is a remnant from when soschat-common was a dumping ground
 * @param context
 * @param orgId
 * @param entityId
 * @param entityType
 * @param imageType
 * @param cache
 * @returns {string}
 */
export function getProfilePhotoUrl (orgId, entityId, entityType, imageType, cache) {
  let url = `/api/v2/classic`

  if (orgId || orgId === 0 || orgId === '0') {
    url += `/${orgId}`
  }

  if (entityType && entityType.toLowerCase() === 'list') {
    url += '/lists/'
  } else {
    url += '/users/profile/'
  }

  url += `${entityId}/photo/`

  url += `?redir=false`

  if (imageType) {
    url += `&size=${imageType}`
  }
  if (cache) {
    url += `&bypassPhotoCache=${Date.now()}` // expects the word 'bypass', if anything
  }
  return url
}

export function sessionStorageReset () {
  try {
    const tabId = window.sessionStorage.getItem('tabId')
    window.sessionStorage.clear()
    if (tabId) {
      window.sessionStorage.setItem('tabId', tabId)
    }
  } catch (ex) {
    // not supported
  }
}

export function sessionStorageStore (key, value) {
  try {
    if (typeof value !== 'string') {
      value = JSON.stringify(value)
    }
    window.sessionStorage.setItem(key, value)
  } catch (ex) {
    // sessionstorage not supported, ignore
  }
}

export function sessionStorageRemove (key) {
  try {
    window.sessionStorage.removeItem(key)
  } catch (ex) {
    // sessionstorage not supported, ignore
  }
}

export function sessionStorageGet (key) {
  let item
  try {
    item = window.sessionStorage.getItem(key)
    return JSON.parse(item)
  } catch (ex) {
    // sessionstorage not supported, ignore or the item returned is not in JSON format
    return item || null
  }
}

export function isLocalStorageAvailable () {
  const test = 'test'
  try {
    localStorage.setItem(test, test)
    localStorage.removeItem(test)
    return true
  } catch (e) {
    return false
  }
}

export function localStorageGet (key) {
  let item
  try {
    item = window.localStorage.getItem(key)
    return JSON.parse(item)
  } catch (ex) {
    // localStorage not supported, ignore or the item returned is not in JSON format
    return item || null
  }
}

export function localStorageStore (key, value) {
  try {
    if (typeof value !== 'string') {
      value = JSON.stringify(value)
    }
    window.localStorage.setItem(key, value)
  } catch (ex) {
    // localStorage not supported, ignore
  }
}

export function localStorageRemove (key) {
  try {
    window.localStorage.removeItem(key)
  } catch (ex) {
    // sessionstorage not supported, ignore
  }
}

/**
 * Gets a file icon class from a file name
 * @param fileName
 * @returns {*}
 */
export function getFileIconClass (fileName) {
  if (fileName == null) {
    return 'file'
  }
  const fileLower = fileName.toLowerCase()
  if (endsWith(fileLower, '.docx') || endsWith(fileLower, '.doc') || endsWith(fileLower, '.odt')) {
    return 'mdi-file-word'
  } else if (endsWith(fileLower, '.xls') || endsWith(fileLower, '.xlsx') || endsWith(fileLower, '.ods')) {
    return 'mdi-file-excel'
  } else if (endsWith(fileLower, '.ppt') || endsWith(fileLower, '.pptx') || endsWith(fileLower, '.odp')) {
    return 'mdi-file-powerpoint'
  } else if (endsWith(fileLower, '.pdf')) {
    return 'mdi-file-pdf-box'
  } else if (endsWith(fileLower, '.zip') || endsWith(fileLower, '.gzip')) {
    return 'mdi-zip-box'
  } else if (endsWith(fileLower, '.txt')) {
    return 'mdi-file-document'
  } else if (endsWith(fileLower, '.jpg') || endsWith(fileLower, '.jpeg') || endsWith(fileLower, '.gif') || endsWith(fileLower, '.png') || endsWith(fileLower, '.bmp') || endsWith(fileLower, '.tif')) {
    return 'mdi-file-image'
  } else if (endsWith(fileLower, '.html') || endsWith(fileLower, '.htm') || endsWith(fileLower, '.exe')) {
    return 'mdi-file-xml'
  }
  return 'mdi-file'
}

/**
 * Comprehensive file icon checker
 * Takes a raw mime type and tries to determine from there what the icon should be
 * and contains a fallback to use the file name if no icon can be determined
 * @param mime
 * @param fileName
 * @returns {*}
 */
export function getFileIconByMime (mime, fileName) {
  const classes = {
    // Images
    image: 'mdi-file-image',
    // Audio
    audio: 'mdi-file-music',
    // Video
    video: 'mdi-file-video',

    // Documents
    // MS Docs
    'application/msword': 'mdi-file-word',
    'application/vnd.oasis.opendocument.text': 'mdi-file-word',

    // Excel Docs
    'text/csv': 'mdi-file-excel',
    'application/vnd.ms-excel': 'mdi-file-excel',
    'application/vnd.oasis.opendocument.spreadsheet': 'mdi-file-excel',

    // powerpoint Docs
    'application/vnd.ms-powerpoint': 'mdi-file-powerpoint',

    'application/pdf': 'mdi-file-pdf-box',
    'text/plain': 'mdi-file-document',
    'text/html': 'mdi-file-xml',
    'application/json': 'mdi-json',

    // Archives
    'application/gzip': 'mdi-zip-box',
    'application/zip': 'mdi-zip-box',
    // Misc
    'application/octet-stream': 'mdi-file-xml'
  }

  if (classes[mime]) {
    return classes[mime] // they passed in the raw type
  }

  let parsedMime
  if (mime && (mime.includes('image/') ||
    mime.includes('audio/') ||
    mime.includes('video/'))) {
    parsedMime = mime.split('/')[0]
  }
  if (classes[parsedMime]) {
    return classes[parsedMime]
  }

  // now check the file name if we've made it this far
  return getFileIconClass(fileName)
}

/**
 * Logs a manual error to us
 * @param message - Message to send
 * @param options
 *  - level: what log level you want to send
 *  - skipBS: pass true if you want to skip sending the error to bungsag
 *  - metadata: Additional metadata object to pass to bugsnag
 *  - hash (REQUIRED): UUID for the bugsnag report
 */
export function vLog (message, options = {}) {
  if (process.env.NODE_ENV === 'testing') {
    return // don't log on unit tests
  }

  if (!('hash' in options) && !options.skipBS) {
    options.hash = 'aa8ea05c-2327-45c1-b844-8be7efdbca61' // default for anyting without a hash so they are grouped together and can be fixed
    console.warn(`vLog called with no hash!  This will be grouped in bugsnag incorrectly: ${message}`)
  }

  const rawMessage = message.slice(0)

  const data = {
    message
  }

  if (options.level != null) {
    data.level = options.level
  } else {
    data.level = 'error'
  }
  // if we have a meta object to pass in, pass it along with the data
  if (options.metadata) {
    data.metadata = options.metadata
  }

  const currentTimeStamp = data.lastErrorDateTime = new Date().getTime()
  let priorErrorFound = false
  let clientErrorIndex
  const clientErrors = store.state.clientErrors

  try {
    for (let i = 0; i < clientErrors.length; i++) {
      const priorError = clientErrors[i]

      if (data.message === priorError.message && ((!data.trace && !priorError.trace) || data.trace === priorError.trace) && ((!data.level && !priorError.level) || data.level === priorError.level)) {
        priorErrorFound = true
        clientErrorIndex = i
        priorError.count++
        data.count = priorError.count++
        store.commit(types.LOG_ERROR, {
          index: i,
          error: data
        })
        break
      }
    }
  } catch (ex) {
    // top could be unavailble, not a reason to silence this
  }

  if (!priorErrorFound) {
    data.count = 1
    clientErrorIndex = store.commit(types.LOG_ERROR, {
      error: data
    })
  }

  if (data.count < 6 || (data.lastPostDateTime && data.lastPostDateTime < currentTimeStamp - 21600000)) {
    if (data.count >= 6) {
      data.throttleWarningMessage = 'WARNING: this error notification is being throttled!'
      data.errorCount = data.count
    } else {
      delete data.errorCount
    }

    const headers = {}

    // TODO: figure out how to get the git revision in there

    // bugsnag log implementation
    // only send for errors
    let e = options.ex
    if (e) {
      e.message = rawMessage
    } else if (rawMessage instanceof Error) {
      e = rawMessage
    } else {
      e = new Error(rawMessage)
    }
    if (data.level === 'error' && !options.skipBS) {
      data.metadata = data.metadata || {}
      data.metadata.headers = headers
      if (data.level === 'warn') {
        // hack to make bugsnag work
        data.level = 'warning'
      }
      data.groupingHash = options.hash

      window.bugsnagClient.notify(e, event => {
        event.severity = data.level
        event.addMetadata('custom', data.metadata)
        event.groupingHash = data.groupingHash
      })
      console.error(data.message)
      delete data.headers // idk what leaving this will do, so get rid of them
    }

    data.lastPostDateTime = currentTimeStamp
    store.commit(types.LOG_ERROR, {
      index: clientErrorIndex,
      error: data
    })
  }
}

/**
 * parses an incoming admin message for rendering
 * NOTE: this must be called in the context of a vue component to work
 * @param message
 * @returns {*}
 */
export function parseAdminMessage (message) {
  if (!message) {
    return null
  }
  const $pogi = $('pogi', message.msg)
  const isMention = $pogi.attr('is-mention') === 'true'
  let text

  const processClick = function (route) {
    if ($pogi.attr('alert-id')) {
      veocijs.api.web.AuthdUser.alerts.acknowledge($pogi.attr('alert-id'))
        .then(() => {
          this.$router.push(route)
        })
        .catch(() => {
          // ignore, nothing we can do here, just send them along
          this.$router.push(route)
        })
    } else {
      this.$router.push(route)
    }
    this.visible = false
  }.bind(this)

  switch (message.type) {
    // TASK CONDITIONS
    case 'newTask':
    case 'taskUpdateNew':
    case 'task-reminder':
    case 'task-reminder-to-creator':
    case 'task-escalation':
      text = this.$t(this.$vtrans.TASK_ASSIGN)
      if (message.type === 'task-reminder') {
        text = this.$t(this.$vtrans.TASK_REMINDER)
      } else if (message.type === 'task-reminder-to-creator') {
        text = this.$t(this.$vtrans.TASK_REMINDER_TO_CREATOR_ON_NO_ACTION)
      } else if (message.type === 'task-escalation') {
        text = this.$t(this.$vtrans.TASK_ESCALATION)
      }
      return {
        text: `${text}: ${$pogi.attr('name')}`,
        theme: 'info',
        button: {
          callback: function () {
            processClick({ name: 'room/task', params: { id: $pogi.attr('room-id'), taskId: $pogi.attr('id') } })
          },
          text: 'View'
        }
      }
    // ROOM CONDITIONS
    case 'chat-invite':
      return {
        text: `${this.$t(this.$vtrans.CHAT_INVITE)}: ${$pogi.attr('name')}`,
        theme: 'info',
        button: {
          callback: function () {
            // TODO: wire in joining the room and acknowledgement
            console.log(this)
          }.bind(this),
          text: 'Join'
        }
      }
    case 'message-mention':
      return {
        text: `${this.$t(this.$vtrans.MESSAGE_MENTION_VERBOSE)}: ${$pogi.attr('message-text')}`,
        theme: 'info',
        button: {
          callback: function () {
            // TODO: wire in viewing the message and acknowledgement if alert ID
            console.log(this)
          }.bind(this),
          text: 'View'
        }
      }
    case 'thread-follow-add':
      text = isMention ? this.$t(this.$vtrans.THREAD_MENTION_VERBOSE) : this.$t(this.$vtrans.THREAD_ADD_VERBOSE)
      return {
        text: `${text}: ${$pogi.attr('thread-name')}`,
        theme: 'info',
        button: {
          callback: function () {
            // TODO: wire in viewing the thread and acknowledgement if alert ID
            console.log(this)
          }.bind(this),
          text: 'View'
        }
      }
    case 'userCreatedAlertMessage':
    case 'userCreatedAlertThread':
      const isThread = ($pogi.attr('thread-name'))
      text = isThread ? `${this.$t(this.$vtrans.THREAD_REMINDER_VERBOSE)} ${$pogi.attr('thread-name')}` : this.$t(this.$vtrans.MESSAGE_REMINDER_VERBOSE)
      return {
        text,
        theme: 'info',
        button: {
          callback: function () {
            // TODO: wire in viewing the thread/message and acknowledgement if alert ID
            console.log(this)
          }.bind(this),
          text: 'View'
        }
      }
    case 'request-container-access':
      return {
        text: `${$pogi.attr('requesterName')} ${this.$t(this.$vtrans.REQUESTED_ACCESS_IN)} ${$pogi.attr('containerName')}`,
        theme: 'info',
        button: {
          callback: function () {
            // TODO: wire in viewing the container and acknowledgement if alert ID
            console.log(this)
          }.bind(this),
          text: 'View'
        }
      }
    // CHECK_IN CONDITIONS
    case 'checkIn-request':
      const notificationType = $pogi.attr('notification-type')
      text = `${this.$t(this.$vtrans.YOU_HAVE_BEEN)} ${(notificationType === 'RESPONSE_REQUIRED' || notificationType === 'CALL_TREE') ? this.$t(this.$vtrans.CHECK_IN_VERBOSE) : this.$t(this.$vtrans.NOTIFICATION_VERBOSE)} ${this.$t(this.$vtrans.THE_ROOM)} ${$pogi.attr('room-name')}`
      return {
        text: `${$pogi.attr('requesterName')} ${this.$t(this.$vtrans.REQUESTED_ACCESS_IN)} ${$pogi.attr('containerName')}`,
        theme: 'info',
        button: {
          callback: function () {
            // TODO: wire in viewing the check-in and acknowledgement if alert ID
            console.log(this)
          }.bind(this),
          text: 'View'
        }
      }
    // WORKFLOW CONDITIONS
    case 'process-task-escalation':
    case 'process-task-reminder':
      let action
      switch ($pogi.attr('type')) {
        case 'newProcessTask':
          action = this.$t(this.$vtrans.PROCESS_TASK_ASSIGN)
          break
        case 'sendbackProcessTask':
          action = this.$t(this.$vtrans.PROCESS_TASK_REOPEN)
          break
        case 'resumeProcessTask':
          action = this.$t(this.$vtrans.PROCESS_TASK_RESUME)
          break
        case 'process-task-escalation':
          action = this.$t(this.$vtrans.PROCESS_TASK_ESCALATION)
          break
        case 'process-task-reminder':
          action = this.$t(this.$vtrans.PROCESS_TASK_REMINDER)
          break
      }
      return {
        text: `${action}: ${$pogi.attr('name')}`,
        theme: 'info',
        button: {
          callback: function () {
            processClick({ name: 'room/workflow', params: { id: $pogi.attr('room-id'), taskId: $pogi.attr('id') } })
          },
          text: 'View'
        }
      }
    // GENERAL CONDITIONS
    case 'dataImport-failure':
      // build the url for the notifications button callback if applicable
      let urlRedirect = null

      // if the pogi doesn't have an object-id (I guess user imports is an example of this) then leave the url blank
      const pogiObjectId = $pogi.attr('object-id')
      const pogiContainerId = $pogi.attr('container-id')
      const pogiObjectType = $pogi.attr('object-type')
      if (pogiObjectId) {
        urlRedirect = `/veoci/o/${pogiObjectId}` // use the default object url handler

        // if the pogi has a container-id as well, then add the container query parameter
        if (pogiContainerId) {
          urlRedirect += `?c=${pogiContainerId}`
        }
      } else if (pogiObjectType === 'TASK' && pogiContainerId) {
        urlRedirect = `/${process.env.PATH_NAME}/${pogiContainerId}/details/tasks`
      }
      return {
        text: this.$t(this.$vtrans.IMPORT_ISSUE_VERBOSE, { fileName: $pogi.attr('file-name') }),
        theme: 'error',
        button: {
          callback: function () {
            // TODO: wire in viewing the failed thing and acknowledgement if alert ID
            console.log(urlRedirect)
            console.log(this)
          }.bind(this),
          text: 'View'
        }
      }
    case 'form-review-notice':
      return {
        text: this.$t(this.$vtrans.FORM_REVIEW_VERBOSE, {
          formName: $pogi.attr('formName'),
          recordCount: $pogi.attr('recordCount')
        }),
        theme: 'info',
        button: {
          callback: function () {
            // TODO: wire in viewing the form review and acknowledgement if alert ID
            console.log(this)
          }.bind(this),
          text: 'View'
        }
      }
    case 'file-copy-complete':
      let theme
      if ($pogi.attr('error') === 'true') {
        text = this.$t(this.$vtrans.COPY_ERROR_VERBOSE)
        theme = 'error'
      } else {
        text = this.$t(this.$vtrans.COPY_SUCCESS_VERBOSE)
        theme = 'info'
      }
      return {
        text,
        theme
      }
    case 'general-message':
      return {
        text: message.rawText ? message.msg : $('body', message.msg).text(),
        theme: 'info'
      }
    case 'generic-error':
      return {
        text: `${$('body', message.msg).text()} The Veoci team has been notified.`,
        theme: 'info'
      }
    case 'container-delete-complete':
      // const chatId = $pogi.attr('room-id')
      const chatName = $pogi.attr('room-name')

      if ($pogi.attr('error') !== 'true') {
        for (let i = 0; i < 10; i++) {
          setTimeout(() => {
            // TODO: figure out what the hell this does
            // top.presenceParent.bodyTrigger('containerDeletedComplete', {id: chatId})
          }, i * 1000)
        }
        return {
          text: this.$t(this.$vtrans.ROOM_DELETE_VERBOSE, { chatName }),
          theme: 'info'
        }
      } else {
        // TODO: figure out what the hell this does
        // top.presenceParent.bodyTrigger('containerDeleteFailed', {id: chatId})
      }
      return {
        text: `${$('body', message.msg).text()} The Veoci team has been notified.`,
        theme: 'info'
      }
  }
}

// client side equivalent of server-side com.soschat.map.MapPoint
// not to be confused with mapPoint which is used for actually rendering points on a map
// constructor expects a Google Maps geocoding result as its argument
export function convertGooglePlaceToValidGeo (geoData, useName) {
  if (typeof geoData === 'string') {
    const coord = geoData.split(/,/)
    if (coord.length === 2 && isNumeric(coord[0]) && isNumeric(coord[1])) {
      this.point = {
        coordinates: {
          x: parseFloat(coord[0]),
          y: parseFloat(coord[1])
        }
      }
      return this.point
    } else {
      // without coordinates, we don't have a real point, but this JSON structure is needed if there are other properties to be passed along, so we handle it this way
      this.geocodeTerm = geoData
      return this.geocodeTerm
    }
  }

  const address = {
    formattedAddress: geoData.formatted_address
  }
  if (geoData.name) {
    address.name = geoData.name
    if (useName) {
      address.formattedAddress = geoData.name
    }
  }
  _.each(geoData.address_components, (component) => {
    _.each(component.types, (type) => {
      switch (type) {
        case 'street_number':
          address.streetNumber = component.short_name
          break
        case 'route':
          address.street = component.long_name
          break
        case 'administrative_area_level_1':
          address.countryRegion = component.short_name
          break
        case 'administrative_area_level_2':
          address.adminDistrict = component.long_name
          break
        case 'locality':
          address.locality = component.long_name
          break
        case 'postal_town':
          if (!address.locality) {
            address.locality = component.long_name
          }
          break
        case 'sublocality':
          if (!address.locality) {
            address.locality = component.long_name
          }
          break
        case 'neighborhood':
          address.neighborhood = component.long_name
          break
        case 'postal_code':
          address.postalCode = component.long_name
          break
        case 'country':
          address.country = component.short_name
          break
        case 'colloquial_area':
          address.colloquialArea = component.short_name
          break
      }
    })
  })
  return {
    address,
    point: {
      coordinates: {
        x: geoData.geometry.location.lat(),
        y: geoData.geometry.location.lng()
      }
    }
  }
}

export function convertEsriPlaceTovalidGeo (geoData) {
  let candidate
  if (geoData.candidates) {
    candidate = geoData.candidates[0]
  } else {
    candidate = geoData
  }
  if (!candidate.location) {
    // was coordinates hopefully
    const cs = geoData.place_name.split(/,/)
    const coordinates = {
      x: parseFloat(cs[0]),
      y: parseFloat(cs[1])
    }
    if (!isNaN(coordinates.x) && !isNaN(coordinates.y)) {
      return {
        address: {
          formattedAddress: geoData.place_name
        },
        point: { coordinates }
      }
    } else {
      return // not a valid location after all
    }
  }
  const address = {
    formattedAddress: candidate.address
  }
  if (candidate.attributes) {
    const att = candidate.attributes
    address.street = att.StName + ' ' + att.StType
    address.streetNumber = att.AddNum
    address.locality = att.City
    address.countryRegion = att.Region
    address.country = att.Country
    address.neighborhood = att.Nbrhd
    let postal = att.Postal
    if (postal && att.PostalExt) {
      // This is so dumb, but it's what Esri gives us
      postal += ' ' + att.PostalExt
    }
    address.postalCode = postal
    address.name = att.PlaceName
  }
  const location = {
    address,
    point: {
      coordinates: { x: candidate.location.y, y: candidate.location.x }
    }
  }
  if (geoData.magicKey) {
    location.magicKey = geoData.magicKey
  }
  return location
}

export function convertMapboxPlaceToVaildGeo (geoData) {
  const address = {
    formattedAddress: geoData.place_name
  }

  if (!geoData.geometry && !geoData.place_name && !geoData.context) {
    return null
  }

  if (!geoData.geometry) {
    // was coordinates hopefully
    const cs = geoData.place_name.split(/,/)
    const coordinates = {
      x: parseFloat(cs[0]),
      y: parseFloat(cs[1])
    }
    if (!isNaN(coordinates.x) && !isNaN(coordinates.y)) {
      return {
        address,
        point: { coordinates }
      }
    } else {
      return // not a valid location after all
    }
  }
  geoData.context && geoData.context.forEach(ctx => {
    const m = ctx.id.match(/^(\w+)\./)
    if (!m) {
      return
    }
    switch (m[1]) {
      case 'postcode':
        address.postalCode = ctx.text
        break
      case 'place':
        address.locality = ctx.text
        break
      case 'district':
        address.adminDistrict = ctx.text
        break
      case 'region':
        address.countryRegion = ctx.text
        break
      case 'country':
        address.country = ctx.text
        break
    }
  })
  return {
    address,
    point: {
      coordinates: {
        x: geoData.geometry.coordinates[1],
        y: geoData.geometry.coordinates[0]
      }
    }
  }
}

/**
 * Convert a leaflet map LatLngBounds to a list of coordinates, so that it can be used as geofence
 * @param {*} bounds
 */
export function boundsToCoords (bounds) {
  const coords = []
  if (bounds) {
    try {
      coords.push({ x: bounds.getNorthEast().lat(), y: bounds.getNorthEast().lng() })
      coords.push({ x: bounds.getSouthWest().lat(), y: bounds.getNorthEast().lng() })
      coords.push({ x: bounds.getSouthWest().lat(), y: bounds.getSouthWest().lng() })
      coords.push({ x: bounds.getNorthEast().lat(), y: bounds.getSouthWest().lng() })
    } catch (error) {
      // igrore
    }
  }
  return coords
}

export function boundsToCoordsLeaflet (bounds) {
  const coords = []
  if (bounds) {
    try {
      coords.push({ x: bounds.getNorthEast().lat, y: bounds.getNorthEast().lng })
      coords.push({ x: bounds.getSouthWest().lat, y: bounds.getNorthEast().lng })
      coords.push({ x: bounds.getSouthWest().lat, y: bounds.getSouthWest().lng })
      coords.push({ x: bounds.getNorthEast().lat, y: bounds.getSouthWest().lng })
    } catch (error) {
      // igrore
    }
  }
  return coords
}

/**
 * Generates a center object
 * @returns {LatLng google maps object}
 */
export function generateCenterObject (center) {
  if (center && center.x && center.y) {
    return new google.maps.LatLng(center.x, center.y)
  } else if (center && center.lat && center.lng) {
    if (typeof center.lat === 'function' && typeof center.lat === 'function') {
      // This means the center was already a google map LatLngObject
      return new google.maps.LatLng(center.lat(), center.lng())
    } else {
      return new google.maps.LatLng(parseFloat(center.lat), parseFloat(center.lng))
    }
  }
  // Default to New Haven
  return new google.maps.LatLng(41.311147, -72.923150)
}

/**
 * Gets a cookie from the browser cookies
 * @param cname
 * @returns {*}
 */
export function getCookie (cname) {
  try {
    const name = `${cname}=`
    const ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === ' ') {
        c = c.substring(1)
      }
      if (c.indexOf(name) !== -1) {
        return c.substring(name.length, c.length)
      }
    }
    return ''
  } catch (e) {
    return ''
  }
}

export async function fileClickHandler (event) {
  // keeping in place just in case we ever want to bring back custom logic here
}

export function getDefaultPrintView ({ object, fields, mode, bulk }) {
  // Build the table
  const mappedFields = []
  const skipField = new Set(['LABEL'])
  if (Array.isArray(fields)) {
    fields.forEach(field => {
      const fieldType = field?.fieldType || ''
      if (fieldType && !skipField.has(fieldType) && field.index) {
        mappedFields.push({
          id: `F${field.index}`,
          index: field.index,
          fieldId: field.fieldId,
          fieldName: field.name || `${this.$t(this.$vtrans.NO_VALUE)}`,
          showInDefaultTemplate: true,
          formFieldValue: true,
          fieldType
        })
      }
    })
  }

  const fmt = function (fld) {
    let code = `${object.processVersion === 1 && fld.stepId ? `S${fld.stepId}|` : ''}F${fld.index}`
    if (bulk) {
      code += 'L' // in bulk mode, we're rendering a two-row table and assuming they want repeating data
    }
    return `%%${code}%%`
  }

  const defaultTemplatePrefix = getDefaultTemplatePrefix.call(this, object, mode)
  let defaultTemplate = `${defaultTemplatePrefix}<table style="background-color: #eef6ff; width: 80%; border-spacing: 0px;"><tbody>`

  let t1 = ''
  let t2 = ''
  let t3 = ''
  let g = ''

  if (bulk === 'group') {
    g += '<tr class="template-data-row"><td colspan="100">%%GROUP%%</td></tr>'
    t3 = '<tr class="template-data-row"><td colspan="100">' // aggregates
  }
  if (bulk) {
    t1 = '<tr>'
    t2 = '<tr class="template-data-row">'
  }
  // Build the field mapper
  mappedFields.forEach((field) => {
    if (field.fieldType === 'REFERENCE' || field.fields || field.fieldType === 'LABEL' || field.fieldType === 'PLACEHOLDER') {
      return
    }
    if (bulk) {
      t1 += '<td style=\'color: #6d6f71; padding: 8px\'>'
      t2 += '<td style=\'padding: 8px\'>'
      t1 += htmlEnc(field.fieldName)
      t2 += fmt(field)
      t1 += '</td>'
      t2 += '</td>'

      if (bulk === 'group' && field.fieldType === 'NUMERIC') {
        t3 += ` ${htmlEnc(field.fieldName)} Aggregate: %%AGG_${field.index}%%`
      }
    } else {
      defaultTemplate += '<tr ><td style=\'width: 30%; color: #6d6f71; padding: 8px\'>'
      defaultTemplate += htmlEnc(field.fieldName)
      defaultTemplate += '</td><td style=\'padding: 8px; \'>'
      defaultTemplate += fmt(field)
      defaultTemplate += '</td></tr>'
    }
  })
  if (bulk) {
    t1 += '</tr>'
    t2 += '</tr>'
    if (bulk === 'group') {
      t3 += '</td></tr>'
    }
  }
  defaultTemplate += `${t1 + g + t2 + t3}`
  // Close the table
  defaultTemplate = `${defaultTemplate}</tbody></table>`
  return defaultTemplate
}

export function getDefaultTemplatePrefix (object, mode) {
  // Default Template Prefix
  const hostname = window.location.hostname
  let env
  switch (hostname) {
    case 'stage.veoci.com':
      env = 'Veoci Stage'
      break
    case 'dev.veoci.com':
      env = 'Veoci Dev'
      break
    case 'localhost':
      env = 'Veoci Local'
      break
    default:
      env = 'Veoci'
      break
  }
  let defaultTemplatePrefix = `<h4>${env} ${this.$t(this.$vtrans.PRINT_VIEW)}</h4>`
  if (mode === 'email') {
    defaultTemplatePrefix = `<h3>${env} ${this.$t(this.$vtrans.NOTIFICATION)}</h3>`
  }
  if (mode) {
    let extraText = ''
    if (mode === 'email') {
      extraText = `<p>${this.$t(this.$vtrans.PRINT_VIEW_EMAIL_TEXT)} <b>${htmlEnc(object.name)}</b> ${this.$t(this.$vtrans.IN)} ${env}</p>`
    } else if (mode === 'print') {
      extraText = `<p>${this.$t(this.$vtrans.PRINT_VIEW_PRINT_TEXT)} <b><a href="%%MAIN_OBJECT_URL%%">${htmlEnc(object.name)}</a></b></p> ${this.$t(this.$vtrans.IN)} ${env}`
    }
    defaultTemplatePrefix = `${defaultTemplatePrefix} ${extraText}`
  }
  return defaultTemplatePrefix
}

export function skipLink (tag, destination) {
  if (!tag || !destination) {
    this.$vError('Missing tag or destination for skipLink')
  }
  const dest = document.querySelector(`[${tag}="${destination}"]`)
  if (dest) {
    dest.focus()
  }
}

export const TEMP_FILES_ROOT = '/api/v2/classic/temp-files'
