export const text = {
  name: 'Text Test',
  mandatory: false,
  unique: false,
  fieldId: '6d7799bf-867c-4576-bee5-bfb806c41cd6',
  properties: { helpText: { text: '', inline: false }, hidden: false, inputSize: 'medium' },
  rules: [],
  fieldType: 'TEXT',
  index: '',
  position: ''
}

export const customContent = {
  name: 'Custom content breh',
  mandatory: false,
  unique: false,
  fieldId: '6fe362df-aae6-48ad-93e5-a317aaf258c9',
  properties: { helpText: { text: '', inline: false }, hidden: false, inputSize: 'medium' },
  rules: [],
  fieldType: 'LONG_TEXT',
  index: '',
  position: ''
}

// TODO: get a real stub for this eventually
export const payment = {
  name: 'Payment',
  mandatory: false,
  unique: false,
  fieldId: '6fe362df-aae6-48ad-93e5-a317aaf258c8',
  properties: { helpText: { text: '', inline: false }, hidden: false, inputSize: 'medium' },
  rules: [],
  fieldType: 'PAYMENT',
  index: '',
  position: ''
}

export const number = {
  name: 'Numbah',
  mandatory: false,
  unique: false,
  fieldId: '4f232d4f-aece-4531-9487-56889423a58c',
  properties: { helpText: { text: '', inline: false }, hidden: false, inputSize: 'medium' },
  rules: [],
  fieldType: 'NUMERIC',
  index: '',
  position: ''
}

export const signature = {
  name: 'Signature',
  mandatory: false,
  unique: false,
  fieldId: '1e8840e6-f601-4132-93cc-ed1e37f837ba',
  properties: { helpText: { text: '', inline: false }, hidden: false, fileType: 'SIGNATURE' },
  rules: [],
  fieldType: 'FILE',
  index: '',
  position: ''
}

export const autoNumber = {
  name: 'Auto Numbah',
  mandatory: false,
  unique: false,
  fieldId: '8acd6c1e-5869-4f66-8545-fb47101bdbb4',
  properties: { helpText: { text: '', inline: false }, hidden: false },
  rules: [],
  fieldType: 'AUTO_INCREMENT',
  index: '',
  position: ''
}

export const date = {
  name: 'Date',
  mandatory: false,
  unique: false,
  fieldId: 'b29cc96e-1a4c-4b3b-8dcc-61a604821bc7',
  properties: {
    helpText: { text: '', inline: false },
    hidden: false,
    days: ['0', '1', '2', '3', '4', '5', '6'],
    restriction: '',
    restrictBusinessHours: false,
    timeZone: '',
    parseTimeZone: false
  },
  rules: [],
  fieldType: 'DATE',
  index: '',
  position: ''
}

export const time = {
  name: 'Time',
  mandatory: false,
  unique: false,
  fieldId: 'eae16c51-e253-4baa-9bb3-3b3581e6b9e0',
  properties: { helpText: { text: '', inline: false }, hidden: false },
  rules: [],
  fieldType: 'TIME',
  index: '',
  position: ''
}

export const dateTime = {
  name: 'Date/Time',
  mandatory: false,
  unique: false,
  fieldId: 'c1806165-fc29-45ce-8fe7-6fed7eb9ed76',
  properties: {
    helpText: { text: '', inline: false },
    hidden: false,
    days: ['0', '1', '2', '3', '4', '5', '6'],
    restriction: '',
    displayUTC: false,
    useSeconds: false,
    restrictBusinessHours: false,
    timeZone: '',
    parseTimeZone: false
  },
  rules: [],
  fieldType: 'DATE_TIME',
  index: '',
  position: ''
}

export const datePair = {
  name: 'Date Pair',
  mandatory: false,
  unique: false,
  fieldId: '18ba0318-bb5a-4fc6-a5c3-f58eebbbdd9f',
  properties: { helpText: { text: '', inline: false }, hidden: false },
  rules: [],
  fieldType: 'DATE_PAIR',
  index: '',
  position: ''
}

export const dateTimePair = {
  name: 'Date/Time Pair',
  mandatory: false,
  unique: false,
  fieldId: 'c9a18897-c571-4233-98a0-7778f0ee111f',
  properties: { helpText: { text: '', inline: false }, hidden: false },
  rules: [],
  fieldType: 'DATE_TIME_PAIR',
  index: '',
  position: ''
}

export const location = {
  name: 'Location',
  mandatory: false,
  unique: false,
  fieldId: '1a63a97b-0bb9-4617-9eb5-e0b9b9249e17',
  properties: {
    helpText: { text: '', inline: false },
    hidden: false,
    defaultMapIcon: '__vue_devtool_undefined__',
    labelFieldIndex: '',
    hasLabel: false,
    useDefaultRoomMap: false,
    addressRequired: false,
    distanceValue: '',
    distanceUnit: '',
    zoom: '',
    mapType: 'roadmap',
    showMapThumbnail: false,
    showMapThumbnailInEditMode: false,
    labelHover: false
  },
  rules: [],
  fieldType: 'LOCATION',
  index: '',
  position: ''
}

export const mapLine = {
  name: 'Map Line',
  mandatory: false,
  unique: false,
  fieldId: '1b346222-45ed-4ccd-b99d-bab480e21094',
  properties: {
    helpText: { text: '', inline: false },
    hidden: false,
    showArrow: false,
    lineStyle: '',
    snapToRoad: false,
    zoom: '',
    mapType: 'roadmap',
    showMapThumbnail: false,
    showMapThumbnailInEditMode: false,
    fixedLabel: false,
    defaultColor: '',
    useDefaultRoomMap: false,
    labelType: 'user_input'
  },
  rules: [],
  fieldType: 'MAPLINESTRING',
  index: '',
  position: ''
}

export const mapArea = {
  name: 'Map Area',
  mandatory: false,
  unique: false,
  fieldId: 'f1f5765f-89fa-4d40-b939-0bbab6d38095',
  properties: {
    helpText: { text: '', inline: false },
    hidden: false,
    opacity: '0.2',
    radiusUnit: 'miles',
    zoom: '',
    mapType: 'roadmap',
    showMapThumbnail: false,
    showMapThumbnailInEditMode: false,
    fixedLabel: false,
    defaultColor: '',
    useDefaultRoomMap: false,
    labelType: 'user_input'
  },
  rules: [],
  fieldType: 'MAPAREA',
  index: '',
  position: ''
}

export const single = {
  name: 'Test',
  mandatory: false,
  unique: false,
  fieldId: '1903978f-f7ef-4315-8331-b8a4dc416e5a',
  properties: {
    helpText: { text: '', inline: false },
    hidden: false,
    numericValues: false,
    sortNumeric: false,
    valuesColor: [],
    inputStyle: 'select',
    valuesHelp: ['', '']
  },
  rules: [],
  fieldType: 'SINGLE',
  index: '',
  position: '',
  valueList: [{
    id: '',
    index: 0,
    numericValue: null,
    value: '1',
    uuid: '1bff84b4-18b3-482a-996a-709fa79f06f6'
  }, {
    id: '',
    index: 1,
    numericValue: null,
    value: '2',
    uuid: 'fefe9309-6c5a-45a9-8903-f674342a7b95'
  }],
  values: ['1', '2']
}

export const multi = {
  name: 'Multi Select',
  mandatory: false,
  unique: false,
  fieldId: '0cd6f8ae-9cbb-4d1d-834c-43500dae5a3c',
  properties: {
    helpText: { text: '', inline: false },
    hidden: false,
    numericValues: false,
    sortNumeric: false,
    valuesColor: [],
    showFullEntry: false,
    disableSelectAll: false,
    valuesHelp: ['', ''],
    toggle: false
  },
  rules: [],
  fieldType: 'MULTI',
  index: '',
  position: '',
  valueList: [{
    id: '',
    index: 0,
    numericValue: null,
    value: 'one',
    uuid: '8011124f-8c79-4909-83de-c5c2fde30fb0'
  }, { id: '', index: 1, numericValue: null, value: 'two', uuid: 'c7cfb7f5-cf92-4dbc-af81-f61481cd7f3d' }],
  values: ['one', 'two']
}

export const person = {
  name: 'Person Picker',
  mandatory: false,
  unique: false,
  fieldId: 'c32c421f-1b14-4d12-8b06-4f08b5ad701b',
  properties: {
    helpText: { text: '', inline: false },
    hidden: false,
    multiValue: false,
    allowInactive: false,
    sortKey: '',
    sortOrder: '',
    limitToList: null
  },
  rules: [],
  fieldType: 'PEOPLE',
  index: '',
  position: ''
}

export const contact = {
  name: 'Contact Picker',
  mandatory: false,
  unique: false,
  fieldId: '5cc3a8af-5b96-4559-9537-18177e57dd15',
  properties: {
    helpText: { text: '', inline: false },
    hidden: false,
    multiValue: false,
    createContactIfNotExists: false,
    allowInactive: false,
    sortKey: '',
    sortOrder: '',
    limitToList: null
  },
  rules: [],
  fieldType: 'CONTACT',
  index: '',
  position: ''
}

export const file = {
  name: 'File',
  mandatory: false,
  unique: false,
  fieldId: '1b9bec4c-3fc2-4602-8756-87111eb37bb0',
  properties: { helpText: { text: '', inline: false }, hidden: false },
  rules: [],
  fieldType: 'FILE',
  index: '',
  position: ''
}

export const drawing = {
  name: 'Drawing',
  mandatory: false,
  unique: false,
  fieldId: 'fb254dbd-0108-4fde-859c-f663d0894ed9',
  properties: { helpText: { text: '', inline: false }, hidden: false, fileType: 'IMAGE' },
  rules: [],
  fieldType: 'FILE',
  index: '',
  position: ''
}

export const reference = {
  name: 'Reference',
  mandatory: false,
  unique: false,
  fieldId: '6142a053-b89d-43cb-912c-fb1ed97cc867',
  properties: {
    helpText: { text: '', inline: false },
    hidden: false,
    displayHorizontal: false,
    showGridView: false,
    sourceFieldIndices: [],
    buttonName: '',
    customButtonName: '',
    multipleEntry: false,
    hideViewSource: false,
    hideEditViewButton: false,
    showDropdowns: true,
    showList: true,
    showGallery: false,
    showSelectMap: false,
    showAutocomplete: false,
    linkCreateOption: '',
    filterKey: '',
    lockSavedView: false,
    filterParamMap: '__vue_devtool_undefined__'
  },
  rules: [],
  fieldType: 'REFERENCE',
  index: '',
  position: ''
}

export const subform = {
  name: 'Subform',
  mandatory: false,
  unique: false,
  fieldId: 'db81ac6a-0e5b-4877-99b3-0932b57fde5d',
  properties: { helpText: { text: '', inline: false }, hidden: false, referenceNewEntry: true },
  rules: [],
  fieldType: 'REFERENCE',
  index: '',
  position: ''
}

export const formLookup = {
  name: 'Form Lookup',
  mandatory: false,
  unique: false,
  fieldId: '48c57549-2d66-474f-8221-672a605edf6d',
  properties: {
    helpText: { text: '', inline: false },
    hidden: false,
    defaultCollapsed: false,
    lookupIndex: {},
    sourceFieldIndices: [],
    editAllowed: false,
    filterKey: '',
    customButtonName: '',
    copySelectValues: false,
    replaceValues: false,
    hideViewSource: false,
    hideEditViewButton: false,
    showDropdowns: true,
    showList: true,
    showGallery: false,
    showSelectMap: false,
    showAutocomplete: false,
    multipleEntry: false,
    linkCreateOption: '',
    lockSavedView: false,
    filterParamMap: '__vue_devtool_undefined__'
  },
  rules: [],
  fieldType: 'LOOKUP',
  fields: {},
  index: '',
  position: '',
  permissionConfig: [{
    entityDto: { displayName: 'Generic Permission', id: '-4' },
    modify: true,
    access: true,
    admin: false
  }]
}

export const workflowLookup = {
  name: 'WF Lookup',
  mandatory: false,
  unique: false,
  fieldId: 'b43ac89b-401c-4521-b101-c94936a2bad6',
  properties: { helpText: { text: '', inline: false }, hidden: false },
  rules: [],
  fieldType: 'WORKFLOW_LOOKUP',
  fields: {},
  index: '',
  position: ''
}

export const taskLink = {
  name: 'Task Link',
  mandatory: false,
  unique: false,
  fieldId: '3f1f814b-6cf2-4f34-b24a-3184a01539cc',
  properties: {
    helpText: { text: '', inline: false },
    hidden: false,
    filterKey: '',
    taskTypeFilter: '',
    buttonName: '',
    linkCreateOption: '',
    enableContainerSelection: false,
    unlinkedEntries: false,
    sortKey: '',
    sortOrder: '',
    multiValue: ''
  },
  rules: [],
  fieldType: 'TASK',
  index: '',
  position: ''
}

export const formEntryLink = {
  name: 'Form Entry Link',
  mandatory: false,
  unique: false,
  fieldId: '86ae6a37-d958-4e3f-9b1f-3e0c8e221d48',
  properties: {
    helpText: { text: '', inline: false },
    hidden: false,
    showAutocomplete: false,
    hideEditViewButton: false,
    allowUnlinkAndDelete: false,
    filterKey: false,
    filterParamMap: '__vue_devtool_undefined__',
    formName: 'Select Entry',
    buttonName: ''
  },
  rules: [],
  fieldType: 'FORM_ENTRY',
  index: '',
  position: ''
}

export const workflowLink = {
  name: 'Workflow Link',
  mandatory: false,
  unique: false,
  fieldId: 'bb7b5ff3-67f5-4d47-a534-61eb4503f649',
  properties: {
    helpText: { text: '', inline: false },
    hidden: false,
    processId: '',
    filterKey: false,
    linkCreateOption: '',
    enableContainerSelection: false,
    unlinkedEntries: false,
    sortKey: '',
    sortOrder: '',
    multiValue: '',
    buttonName: ''
  },
  rules: [],
  fieldType: 'WORKFLOW',
  index: '',
  position: ''
}

export const roomLink = {
  name: 'Room Link',
  mandatory: false,
  unique: false,
  fieldId: 'f9871ae7-218c-46f3-bf97-1dc2dcbb064b',
  properties: { helpText: { text: '', inline: false }, hidden: false },
  rules: [],
  fieldType: 'ROOM',
  index: '',
  position: ''
}

export const label = {
  name: 'Label',
  mandatory: false,
  unique: false,
  fieldId: '7906929e-0f21-4b5f-b5d0-66ebc7fbad1e',
  properties: { helpText: { text: '', inline: false }, hidden: false },
  rules: [],
  fieldType: 'LABEL',
  index: '',
  position: ''
}

export const section = {
  name: 'Section',
  mandatory: false,
  unique: false,
  fieldId: 'a5226359-1b14-45e5-b33a-76395160710f',
  properties: { helpText: { text: '', inline: false }, hidden: false },
  rules: [],
  fieldType: 'SECTION',
  fields: {},
  index: '',
  position: '',
  permissionConfig: [{
    entityDto: { id: '-4', displayName: 'Generic Permission' },
    modify: true,
    access: true,
    admin: false
  }]
}
