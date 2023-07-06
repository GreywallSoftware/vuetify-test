const form = {
  id: '162497',
  orgSequenceId: null,
  container: {
    id: '1050',
    name: 'Geoff\'s MAIN test room',
    type: 'MUCROOM',
    created: null,
    modified: null,
    orgId: '1',
    themeName: null,
    supportUrl: null,
    group: null
  },
  name: 'Location On Top',
  lastModified: 1647439550932,
  properties: {
    childObjectPermissions: 'false',
    backgroundSqlTable: 'true',
    barcodeType: 'QR',
    barcodeSource: 'entryId',
    useSqlTable: 'true',
    publicRead: 'false',
    childObjectCreationPermissions: 'false'
  },
  created: 1393873503000,
  createdBy: {
    id: '1690',
    name: 'geoff@veoci.com',
    displayName: 'Geoff Update Baum Again Veoci Development',
    type: 'USER',
    expertise: 'Javascript, HTML5 and CSS3, mobile, Objective-C, Jquery',
    ignoreCredentialsExpired: false,
    guest: false
  },
  modifiedBy: {
    id: '1690',
    name: 'geoff@veoci.com',
    displayName: 'Geoff Update Baum Again Veoci Development',
    type: 'USER',
    expertise: 'Javascript, HTML5 and CSS3, mobile, Objective-C, Jquery',
    ignoreCredentialsExpired: false,
    guest: false
  },
  fields: {
    0: {
      fieldId: '3632',
      uuid: '319cdf1a-38f7-470b-ba89-725acfff9612',
      index: '0',
      fieldType: 'LOCATION',
      name: 'Location on top',
      properties: { showMapThumbnail: true, defaultMapIcon: '31' },
      fields: null,
      defaultValue: null,
      mandatoryValue: null,
      sourceFormId: null,
      sourceForm: null,
      position: '0',
      permissionConfig: [],
      permission: null,
      rules: [],
      valueList: null,
      mandatory: false,
      payment: null,
      drivesRules: true,
      parentSectionIndex: null,
      orderedFields: null,
      numericFormat: null,
      unique: false,
      modified: false,
      mandatoryOnServer: false
    },
    1: {
      fieldId: '3633',
      uuid: '10fc8b8c-a200-4db1-bb19-cc8f2a71154e',
      index: '1',
      fieldType: 'TEXT',
      name: 'Test',
      properties: { inputSize: 'medium', disableInput: true },
      fields: null,
      defaultValue: null,
      mandatoryValue: null,
      sourceFormId: null,
      sourceForm: null,
      position: '1',
      permissionConfig: [],
      permission: null,
      rules: [{
        type: 'CONCAT',
        condition: null,
        value: 'F0,"is some goodness"',
        id: '923174',
        childFieldIndex: null,
        defaultValueRule: false
      }],
      valueList: null,
      mandatory: true,
      payment: null,
      drivesRules: false,
      parentSectionIndex: null,
      orderedFields: null,
      numericFormat: null,
      unique: false,
      modified: false,
      mandatoryOnServer: false
    },
    2: {
      fieldId: '3634',
      uuid: '263e6929-9b43-49c4-ab03-79e5cde0a6f8',
      index: '2',
      fieldType: 'NUMERIC',
      name: 'num',
      properties: { fieldRanges: [], enableObscure: true },
      fields: null,
      defaultValue: null,
      mandatoryValue: null,
      sourceFormId: null,
      sourceForm: null,
      position: '2',
      permissionConfig: [],
      permission: null,
      rules: [],
      valueList: null,
      mandatory: false,
      payment: null,
      drivesRules: false,
      parentSectionIndex: null,
      orderedFields: null,
      numericFormat: null,
      unique: false,
      modified: false,
      mandatoryOnServer: false
    },
    3: {
      fieldId: '3635',
      uuid: '2720f87c-5653-4abe-893d-30b5196c3ed9',
      index: '3',
      fieldType: 'LONG_TEXT',
      name: 'Lon text',
      properties: { sticky: true },
      fields: null,
      defaultValue: null,
      mandatoryValue: null,
      sourceFormId: null,
      sourceForm: null,
      position: '3',
      permissionConfig: [],
      permission: null,
      rules: [],
      valueList: null,
      mandatory: false,
      payment: null,
      drivesRules: false,
      parentSectionIndex: null,
      orderedFields: null,
      numericFormat: null,
      unique: true,
      modified: false,
      mandatoryOnServer: false
    },
    4: {
      fieldId: '3636',
      uuid: 'c4a8220d-f411-49b1-b949-c81145930ac6',
      index: '4',
      fieldType: 'DATE',
      name: 'Date',
      properties: { hidden: true },
      fields: null,
      defaultValue: null,
      mandatoryValue: null,
      sourceFormId: null,
      sourceForm: null,
      position: '4',
      permissionConfig: [],
      permission: null,
      rules: [],
      valueList: null,
      mandatory: false,
      payment: null,
      drivesRules: false,
      parentSectionIndex: null,
      orderedFields: null,
      numericFormat: null,
      unique: false,
      modified: false,
      mandatoryOnServer: false
    },
    5: {
      fieldId: '3637',
      uuid: 'c5c4d866-4c2f-4df9-99eb-0d6734d78bcc',
      index: '5',
      fieldType: 'TIME',
      name: 'Teas',
      properties: { helpText: { inline: true, text: 'HELP TEXT' } },
      fields: null,
      defaultValue: null,
      mandatoryValue: null,
      sourceFormId: null,
      sourceForm: null,
      position: '5',
      permissionConfig: [],
      permission: null,
      rules: [],
      valueList: null,
      mandatory: false,
      payment: null,
      drivesRules: false,
      parentSectionIndex: null,
      orderedFields: null,
      numericFormat: null,
      unique: false,
      modified: false,
      mandatoryOnServer: false
    },
    10: {
      fieldId: '617401',
      uuid: 'c35a3749-3eef-4520-ade4-3b4cc26bec68',
      index: '10',
      fieldType: 'LOOKUP',
      name: 'Lookup',
      properties: { showList: true, lookupIndex: { 1: 11 }, showDropdowns: true },
      fields: {
        11: {
          fieldId: '617402',
          uuid: null,
          index: '11',
          fieldType: 'FILE',
          name: 'Versions',
          properties: { sourceFieldIndex: 1, useVersions: true },
          fields: null,
          defaultValue: null,
          mandatoryValue: null,
          sourceFormId: null,
          sourceForm: null,
          position: '7',
          permissionConfig: [],
          permission: null,
          rules: [],
          valueList: null,
          mandatory: false,
          payment: null,
          drivesRules: false,
          parentSectionIndex: '10',
          orderedFields: null,
          numericFormat: null,
          unique: false,
          modified: false,
          mandatoryOnServer: false,
          parentIndex: '10'
        }
      },
      defaultValue: null,
      mandatoryValue: null,
      sourceFormId: '341574',
      sourceForm: null,
      position: '6',
      permissionConfig: [{
        access: true,
        modify: true,
        admin: false,
        entityDto: {
          id: '-4',
          name: 'Generic Permission',
          displayName: 'Generic Permission',
          type: 'SYSTEM',
          ignoreCredentialsExpired: false,
          guest: true
        }
      }],
      permission: {
        access: true,
        modify: true,
        admin: false,
        entityDto: {
          id: '-4',
          name: 'Generic Permission',
          displayName: 'Generic Permission',
          type: 'SYSTEM',
          ignoreCredentialsExpired: false,
          guest: true
        }
      },
      rules: [],
      valueList: null,
      mandatory: false,
      payment: null,
      drivesRules: false,
      parentSectionIndex: null,
      orderedFields: [{
        fieldId: '617402',
        uuid: null,
        index: '11',
        fieldType: 'FILE',
        name: 'Versions',
        properties: { sourceFieldIndex: 1, useVersions: true },
        fields: null,
        defaultValue: null,
        mandatoryValue: null,
        sourceFormId: null,
        sourceForm: null,
        position: '7',
        permissionConfig: [],
        permission: null,
        rules: [],
        valueList: null,
        mandatory: false,
        payment: null,
        drivesRules: false,
        parentSectionIndex: '10',
        orderedFields: null,
        numericFormat: null,
        unique: false,
        modified: false,
        mandatoryOnServer: false,
        parentIndex: '10'
      }],
      numericFormat: null,
      unique: false,
      modified: false,
      mandatoryOnServer: false
    },
    12: {
      fieldId: '617408',
      uuid: 'dc4bc5eb-96cb-4ca5-83f7-ef3654f31f0d',
      index: '12',
      fieldType: 'DATE_PAIR',
      name: 'Date Pair',
      properties: {},
      fields: {
        13: {
          fieldId: '617409',
          uuid: null,
          index: '13',
          fieldType: 'DATE',
          name: 'Date Pair Start',
          properties: { datePairField: true },
          fields: null,
          defaultValue: null,
          mandatoryValue: null,
          sourceFormId: null,
          sourceForm: null,
          position: '9',
          permissionConfig: [],
          permission: null,
          rules: [],
          valueList: null,
          mandatory: false,
          payment: null,
          drivesRules: true,
          parentSectionIndex: '12',
          orderedFields: null,
          numericFormat: null,
          unique: false,
          modified: false,
          mandatoryOnServer: false,
          dateTimePairChild: true,
          parentIndex: '12'
        },
        14: {
          fieldId: '617410',
          uuid: null,
          index: '14',
          fieldType: 'DATE',
          name: 'Date Pair End',
          properties: { datePairField: true },
          fields: null,
          defaultValue: null,
          mandatoryValue: null,
          sourceFormId: null,
          sourceForm: null,
          position: '10',
          permissionConfig: [],
          permission: null,
          rules: [],
          valueList: null,
          mandatory: false,
          payment: null,
          drivesRules: true,
          parentSectionIndex: '12',
          orderedFields: null,
          numericFormat: null,
          unique: false,
          modified: false,
          mandatoryOnServer: false,
          dateTimePairChild: true,
          parentIndex: '12'
        },
        15: {
          fieldId: '617411',
          uuid: null,
          index: '15',
          fieldType: 'NUMERIC',
          name: 'Date Pair Interval',
          properties: { hidden: true, rangeMin: 0 },
          fields: null,
          defaultValue: null,
          mandatoryValue: null,
          sourceFormId: null,
          sourceForm: null,
          position: '11',
          permissionConfig: [],
          permission: null,
          rules: [{
            type: 'FORMULA',
            condition: null,
            value: 'F14-F13',
            id: '923175',
            childFieldIndex: null,
            defaultValueRule: false
          }],
          valueList: null,
          mandatory: false,
          payment: null,
          drivesRules: false,
          parentSectionIndex: '12',
          orderedFields: null,
          numericFormat: null,
          unique: false,
          modified: false,
          mandatoryOnServer: false,
          dateTimePairChild: true,
          parentIndex: '12'
        }
      },
      defaultValue: null,
      mandatoryValue: null,
      sourceFormId: null,
      sourceForm: null,
      position: '8',
      permissionConfig: [],
      permission: {
        access: true,
        modify: true,
        admin: false,
        entityDto: {
          id: '1690',
          name: 'geoff@veoci.com',
          displayName: 'Geoff Update Baum Again Veoci Development',
          type: 'USER',
          expertise: 'Javascript, HTML5 and CSS3, mobile, Objective-C, Jquery',
          ignoreCredentialsExpired: false,
          guest: false
        }
      },
      rules: [],
      valueList: null,
      mandatory: false,
      payment: null,
      drivesRules: false,
      parentSectionIndex: null,
      orderedFields: [{
        fieldId: '617409',
        uuid: null,
        index: '13',
        fieldType: 'DATE',
        name: 'Date Pair Start',
        properties: { datePairField: true },
        fields: null,
        defaultValue: null,
        mandatoryValue: null,
        sourceFormId: null,
        sourceForm: null,
        position: '9',
        permissionConfig: [],
        permission: null,
        rules: [],
        valueList: null,
        mandatory: false,
        payment: null,
        drivesRules: true,
        parentSectionIndex: '12',
        orderedFields: null,
        numericFormat: null,
        unique: false,
        modified: false,
        mandatoryOnServer: false,
        dateTimePairChild: true,
        parentIndex: '12'
      }, {
        fieldId: '617410',
        uuid: null,
        index: '14',
        fieldType: 'DATE',
        name: 'Date Pair End',
        properties: { datePairField: true },
        fields: null,
        defaultValue: null,
        mandatoryValue: null,
        sourceFormId: null,
        sourceForm: null,
        position: '10',
        permissionConfig: [],
        permission: null,
        rules: [],
        valueList: null,
        mandatory: false,
        payment: null,
        drivesRules: true,
        parentSectionIndex: '12',
        orderedFields: null,
        numericFormat: null,
        unique: false,
        modified: false,
        mandatoryOnServer: false,
        dateTimePairChild: true,
        parentIndex: '12'
      }, {
        fieldId: '617411',
        uuid: null,
        index: '15',
        fieldType: 'NUMERIC',
        name: 'Date Pair Interval',
        properties: { hidden: true, rangeMin: 0 },
        fields: null,
        defaultValue: null,
        mandatoryValue: null,
        sourceFormId: null,
        sourceForm: null,
        position: '11',
        permissionConfig: [],
        permission: null,
        rules: [{
          type: 'FORMULA',
          condition: null,
          value: 'F14-F13',
          id: '923175',
          childFieldIndex: null,
          defaultValueRule: false
        }],
        valueList: null,
        mandatory: false,
        payment: null,
        drivesRules: false,
        parentSectionIndex: '12',
        orderedFields: null,
        numericFormat: null,
        unique: false,
        modified: false,
        mandatoryOnServer: false,
        dateTimePairChild: true,
        parentIndex: '12'
      }],
      numericFormat: null,
      unique: false,
      modified: false,
      mandatoryOnServer: false,
      dateTimePairParent: true
    },
    16: {
      fieldId: '617419',
      uuid: 'db0b2e51-2d2f-486e-89ad-475672951aa7',
      index: '16',
      fieldType: 'SECTION',
      name: 'Section',
      properties: {},
      fields: {},
      defaultValue: null,
      mandatoryValue: null,
      sourceFormId: null,
      sourceForm: null,
      position: '12',
      permissionConfig: [{
        access: true,
        modify: true,
        admin: false,
        entityDto: {
          id: '-4',
          name: 'Generic Permission',
          displayName: 'Generic Permission',
          type: 'SYSTEM',
          ignoreCredentialsExpired: false,
          guest: true
        }
      }],
      permission: {
        access: true,
        modify: true,
        admin: false,
        entityDto: {
          id: '-4',
          name: 'Generic Permission',
          displayName: 'Generic Permission',
          type: 'SYSTEM',
          ignoreCredentialsExpired: false,
          guest: true
        }
      },
      rules: [],
      valueList: null,
      mandatory: false,
      payment: null,
      drivesRules: false,
      parentSectionIndex: null,
      orderedFields: [],
      numericFormat: null,
      unique: false,
      modified: false,
      mandatoryOnServer: false
    }
  },
  ruleMap: { 1: [0], 15: [13, 14] },
  formType: 'GENERIC',
  permissions: { viewerCanEdit: true, canCreateEditEntries: true, availableViaSharing: null },
  accessorContainerId: null,
  adminEditOnly: false,
  entryCount: 1,
  lastEntryDate: 1542810020004,
  mappable: true,
  publicRead: false,
  publicForm: false,
  parent: null,
  resourceForm: false,
  publicKey: null,
  publicChild: false,
  sharingType: 'VIEW_ALL',
  autoIncrementMaxValue: null,
  autoIncrementField: null,
  uniqueField: false,
  tags: [],
  childObjectCreationRestricted: false,
  childObjectsRestricted: false,
  calendar: true,
  lastIndex: 16,
  formVersion: 2,
  visibleViews: ['calendar', 'dashboard', 'room', 'mobile', 'map'],
  permissionConfig: {},
  description: '',
  skipCircularRuleCheck: false,
  fieldsRemoved: false,
  comment: null,
  hasPublicKey: false,
  processId: null,
  permissionChange: false,
  type: 'FORM'
}

export { form }