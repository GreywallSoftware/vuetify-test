export const previousStepsStep1 = {}
export const step1 = {
  nodeId: '39814',
  name: 'Workflow Submission',
  type: 'REQUEST',
  next: [
    '39815'
  ],
  previous: [],
  defaultOrder: 0,
  properties: {},
  commentsEnabled: true,
  reassignAllowed: false,
  parallelTasks: false,
  actions: [
    {
      id: '821730',
      type: 'APPROVE',
      requiresComment: false,
      customLabel: null,
      requireAllConditions: false,
      transitions: [
        {
          nodes: [
            {
              nodeId: '39815',
              name: '2'
            }
          ],
          id: '329932',
          condition: null
        }
      ],
      order: 0,
      validators: []
    },
    {
      id: '821731',
      type: 'SAVE',
      requiresComment: false,
      customLabel: null,
      requireAllConditions: false,
      transitions: [],
      order: 1,
      validators: []
    }
  ],
  mappableForm: false,
  order: 0,
  accessibility: [
    {
      step: '39814',
      type: 'MODIFY',
      fieldAccess: {
        677595: {
          permType: 'MODIFY',
          childAccess: {
            0: null,
            1: null
          }
        },
        677598: 'ACCESS',
        677599: 'MODIFY'
      },
      collapsed: false
    }
  ],
  fields: {
    0: {
      fieldId: '677595',
      uuid: null,
      index: '0',
      fieldType: 'REFERENCE',
      name: 'Subform testing',
      properties: {
        referenceNewEntry: true
      },
      fields: null,
      defaultValue: null,
      mandatoryValue: null,
      sourceFormId: '22682462',
      sourceForm: {
        id: '22682462',
        orgSequenceId: null,
        container: {
          id: '26160',
          name: 'Dan Lynch Stage Testing Room',
          type: 'MUCROOM',
          created: null,
          modified: null,
          orgId: '1',
          themeName: null,
          supportUrl: null,
          group: null
        },
        name: 'Text Field',
        lastModified: 1645720427555,
        properties: {
          closeOnSubmit: 'false',
          childObjectPermissions: 'false',
          backgroundSqlTable: 'true',
          barcodeType: 'QR',
          viewModePrint: 'false',
          barcodeSource: 'entryId',
          useSqlTable: 'true',
          overlaySavedView: '{}',
          publicRead: 'false',
          childObjectCreationPermissions: 'false'
        },
        created: 1620247892100,
        createdBy: {
          id: '144404',
          name: 'dan.lynch@veoci.com',
          displayName: 'Dan Lynch',
          type: 'USER',
          expertise: '',
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
            fieldId: '407849',
            uuid: null,
            index: '0',
            fieldType: 'TEXT',
            name: 'Text Field',
            properties: {
              inputSize: 'medium'
            },
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
            drivesRules: false,
            parentSectionIndex: null,
            orderedFields: null,
            numericFormat: null,
            unique: false,
            modified: false,
            mandatoryOnServer: false
          },
          1: {
            fieldId: '603908',
            uuid: null,
            index: '1',
            fieldType: 'TEXT',
            name: 'Hidden text',
            properties: {
              hidden: true,
              inputSize: 'medium'
            },
            fields: null,
            defaultValue: null,
            mandatoryValue: null,
            sourceFormId: null,
            sourceForm: null,
            position: '1',
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
          }
        },
        ruleMap: {},
        formType: 'GENERIC',
        permissions: null,
        accessorContainerId: null,
        adminEditOnly: false,
        entryCount: 12,
        lastEntryDate: null,
        mappable: false,
        publicRead: false,
        publicForm: false,
        parent: null,
        resourceForm: false,
        publicKey: null,
        publicChild: false,
        sharingType: 'NOT_SHARED',
        autoIncrementMaxValue: null,
        autoIncrementField: null,
        uniqueField: false,
        tags: [],
        childObjectCreationRestricted: false,
        childObjectsRestricted: false,
        calendar: false,
        lastIndex: 1,
        formVersion: 2,
        type: 'FORM'
      },
      position: '0',
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
      fieldId: '677598',
      uuid: null,
      index: '3',
      fieldType: 'TEXT',
      name: 'text',
      properties: {
        inputSize: 'medium'
      },
      fields: null,
      defaultValue: null,
      mandatoryValue: null,
      sourceFormId: null,
      sourceForm: null,
      position: '1',
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
    4: {
      fieldId: '677599',
      uuid: null,
      index: '4',
      fieldType: 'TEXT',
      name: 'text 2',
      properties: {
        inputSize: 'medium'
      },
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
    }
  },
  formId: '28977388',
  ruleMap: null,
  owners: [],
  external: false,
  notificationEnabled: true,
  alertNotificationEnabled: true,
  uuid: null,
  escalationRules: [],
  container: {
    id: '26160',
    name: 'Dan Lynch Stage Testing Room',
    type: 'MUCROOM',
    created: null,
    modified: null,
    orgId: '1',
    themeName: null,
    supportUrl: null,
    group: null
  }
}

export const previousStepsStep2 = {
  39814: {
    nodeId: '39814',
    name: 'Workflow Submission',
    type: 'REQUEST',
    next: [
      '39815'
    ],
    previous: [],
    defaultOrder: 0,
    properties: {},
    commentsEnabled: true,
    reassignAllowed: false,
    parallelTasks: false,
    actions: [
      {
        id: '821730',
        type: 'APPROVE',
        requiresComment: false,
        customLabel: null,
        requireAllConditions: false,
        transitions: [
          {
            nodes: [
              {
                nodeId: '39815',
                name: '2'
              }
            ],
            id: '329932',
            condition: null
          }
        ],
        order: 0,
        validators: []
      },
      {
        id: '821731',
        type: 'SAVE',
        requiresComment: false,
        customLabel: null,
        requireAllConditions: false,
        transitions: [],
        order: 1,
        validators: []
      }
    ],
    mappableForm: false,
    order: 0,
    accessibility: [
      {
        step: '39814',
        type: 'SET_BY_FIELDS',
        fieldAccess: {
          677595: {
            childAccess: {
              0: 'MODIFY',
              1: 'MODIFY'
            },
            permType: 'MODIFY'
          },
          677598: 'MODIFY',
          677599: 'MODIFY'
        },
        collapsed: false
      }
    ],
    fields: {
      0: {
        fieldId: '677595',
        uuid: null,
        index: '0',
        fieldType: 'REFERENCE',
        name: 'Subform testing',
        properties: {
          referenceNewEntry: true
        },
        fields: null,
        defaultValue: null,
        mandatoryValue: null,
        sourceFormId: '22682462',
        sourceForm: {
          id: '22682462',
          orgSequenceId: null,
          container: {
            id: '26160',
            name: 'Dan Lynch Stage Testing Room',
            type: 'MUCROOM',
            created: null,
            modified: null,
            orgId: '1',
            themeName: null,
            supportUrl: null,
            group: null
          },
          name: 'Text Field',
          lastModified: 1645720427555,
          properties: {
            closeOnSubmit: 'false',
            childObjectPermissions: 'false',
            backgroundSqlTable: 'true',
            barcodeType: 'QR',
            viewModePrint: 'false',
            barcodeSource: 'entryId',
            useSqlTable: 'true',
            overlaySavedView: '{}',
            publicRead: 'false',
            childObjectCreationPermissions: 'false'
          },
          created: 1620247892100,
          createdBy: {
            id: '144404',
            name: 'dan.lynch@veoci.com',
            displayName: 'Dan Lynch',
            type: 'USER',
            expertise: '',
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
              fieldId: '407849',
              uuid: null,
              index: '0',
              fieldType: 'TEXT',
              name: 'Text Field',
              properties: {
                inputSize: 'medium'
              },
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
              drivesRules: false,
              parentSectionIndex: null,
              orderedFields: null,
              numericFormat: null,
              unique: false,
              modified: false,
              mandatoryOnServer: false
            },
            1: {
              fieldId: '603908',
              uuid: null,
              index: '1',
              fieldType: 'TEXT',
              name: 'Hidden text',
              properties: {
                hidden: true,
                inputSize: 'medium'
              },
              fields: null,
              defaultValue: null,
              mandatoryValue: null,
              sourceFormId: null,
              sourceForm: null,
              position: '1',
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
            }
          },
          ruleMap: {},
          formType: 'GENERIC',
          permissions: null,
          accessorContainerId: null,
          adminEditOnly: false,
          entryCount: 12,
          lastEntryDate: null,
          mappable: false,
          publicRead: false,
          publicForm: false,
          parent: null,
          resourceForm: false,
          publicKey: null,
          publicChild: false,
          sharingType: 'NOT_SHARED',
          autoIncrementMaxValue: null,
          autoIncrementField: null,
          uniqueField: false,
          tags: [],
          childObjectCreationRestricted: false,
          childObjectsRestricted: false,
          calendar: false,
          lastIndex: 1,
          formVersion: 2,
          type: 'FORM'
        },
        position: '0',
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
        fieldId: '677598',
        uuid: null,
        index: '3',
        fieldType: 'TEXT',
        name: 'text',
        properties: {
          inputSize: 'medium'
        },
        fields: null,
        defaultValue: null,
        mandatoryValue: null,
        sourceFormId: null,
        sourceForm: null,
        position: '1',
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
      4: {
        fieldId: '677599',
        uuid: null,
        index: '4',
        fieldType: 'TEXT',
        name: 'text 2',
        properties: {
          inputSize: 'medium'
        },
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
      }
    },
    formId: '28977388',
    ruleMap: null,
    owners: [],
    external: false,
    notificationEnabled: true,
    alertNotificationEnabled: true,
    uuid: null,
    escalationRules: [],
    container: {
      id: '26160',
      name: 'Dan Lynch Stage Testing Room',
      type: 'MUCROOM',
      created: null,
      modified: null,
      orgId: '1',
      themeName: null,
      supportUrl: null,
      group: null
    }
  }
}
export const step2 = {
  nodeId: '39815',
  name: '2',
  type: 'USER_STEP',
  next: [],
  previous: [
    '39814'
  ],
  defaultOrder: 1,
  properties: {
    overlaySavedView: '{}'
  },
  commentsEnabled: true,
  reassignAllowed: true,
  parallelTasks: false,
  actions: [
    {
      id: '821732',
      type: 'APPROVE',
      requiresComment: false,
      customLabel: null,
      requireAllConditions: false,
      transitions: [],
      order: 0,
      validators: []
    },
    {
      id: '821733',
      type: 'SAVE',
      requiresComment: false,
      customLabel: null,
      requireAllConditions: false,
      transitions: [],
      order: 1,
      validators: []
    }
  ],
  mappableForm: false,
  order: 1,
  accessibility: [
    {
      step: '39815',
      type: 'MODIFY',
      fieldAccess: {
        677597: 'ACCESS',
        677646: 'MODIFY',
        677647: 'MODIFY'
      },
      collapsed: false
    }
  ],
  fields: {
    1: {
      fieldId: '677596',
      uuid: null,
      index: '1',
      fieldType: 'PLACEHOLDER',
      name: 'Placeholder',
      properties: {},
      fields: null,
      defaultValue: null,
      mandatoryValue: null,
      sourceFormId: null,
      sourceForm: null,
      position: '0',
      permissionConfig: [],
      permission: null,
      rules: [
        {
          type: 'SUBSTITUTION',
          condition: null,
          value: 'CREATOR',
          id: '1017658',
          childFieldIndex: null,
          defaultValueRule: false
        }
      ],
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
    2: {
      fieldId: '677597',
      uuid: null,
      index: '2',
      fieldType: 'TEXT',
      name: 'text',
      properties: {
        inputSize: 'medium'
      },
      fields: null,
      defaultValue: null,
      mandatoryValue: null,
      sourceFormId: null,
      sourceForm: null,
      position: '1',
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
      fieldId: '677646',
      uuid: null,
      index: '5',
      fieldType: 'TEXT',
      name: '2',
      properties: {
        inputSize: 'medium'
      },
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
    6: {
      fieldId: '677647',
      uuid: null,
      index: '6',
      fieldType: 'TEXT',
      name: '4',
      properties: {
        inputSize: 'medium'
      },
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
      unique: false,
      modified: false,
      mandatoryOnServer: false
    }
  },
  formId: '28977389',
  ruleMap: null,
  owners: [],
  external: false,
  notificationEnabled: true,
  alertNotificationEnabled: true,
  uuid: null,
  escalationRules: [],
  container: {
    id: '26160',
    name: 'Dan Lynch Stage Testing Room',
    type: 'MUCROOM',
    created: null,
    modified: null,
    orgId: '1',
    themeName: null,
    supportUrl: null,
    group: null
  }
}

export const allFieldsStep1 = () => [
  {
    fieldId: '677595',
    uuid: null,
    index: '0',
    fieldType: 'REFERENCE',
    name: 'Subform testing',
    properties: {
      referenceNewEntry: true
    },
    fields: null,
    defaultValue: null,
    mandatoryValue: null,
    sourceFormId: '22682462',
    sourceForm: {
      id: '22682462',
      orgSequenceId: null,
      container: {
        id: '26160',
        name: 'Dan Lynch Stage Testing Room',
        type: 'MUCROOM',
        created: null,
        modified: null,
        orgId: '1',
        themeName: null,
        supportUrl: null,
        group: null
      },
      name: 'Text Field',
      lastModified: 1645720427555,
      properties: {
        closeOnSubmit: 'false',
        childObjectPermissions: 'false',
        backgroundSqlTable: 'true',
        barcodeType: 'QR',
        viewModePrint: 'false',
        barcodeSource: 'entryId',
        useSqlTable: 'true',
        overlaySavedView: '{}',
        publicRead: 'false',
        childObjectCreationPermissions: 'false'
      },
      created: 1620247892100,
      createdBy: {
        id: '144404',
        name: 'dan.lynch@veoci.com',
        displayName: 'Dan Lynch',
        type: 'USER',
        expertise: '',
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
          fieldId: '407849',
          uuid: null,
          index: '0',
          fieldType: 'TEXT',
          name: 'Text Field',
          properties: {
            inputSize: 'medium'
          },
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
          drivesRules: false,
          parentSectionIndex: null,
          orderedFields: null,
          numericFormat: null,
          unique: false,
          modified: false,
          mandatoryOnServer: false
        },
        1: {
          fieldId: '603908',
          uuid: null,
          index: '1',
          fieldType: 'TEXT',
          name: 'Hidden text',
          properties: {
            hidden: true,
            inputSize: 'medium'
          },
          fields: null,
          defaultValue: null,
          mandatoryValue: null,
          sourceFormId: null,
          sourceForm: null,
          position: '1',
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
        }
      },
      ruleMap: {},
      formType: 'GENERIC',
      permissions: null,
      accessorContainerId: null,
      adminEditOnly: false,
      entryCount: 12,
      lastEntryDate: null,
      mappable: false,
      publicRead: false,
      publicForm: false,
      parent: null,
      resourceForm: false,
      publicKey: null,
      publicChild: false,
      sharingType: 'NOT_SHARED',
      autoIncrementMaxValue: null,
      autoIncrementField: null,
      uniqueField: false,
      tags: [],
      childObjectCreationRestricted: false,
      childObjectsRestricted: false,
      calendar: false,
      lastIndex: 1,
      formVersion: 2,
      type: 'FORM'
    },
    position: '0',
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
  {
    fieldId: '677598',
    uuid: null,
    index: '3',
    fieldType: 'TEXT',
    name: 'text',
    properties: {
      inputSize: 'medium'
    },
    fields: null,
    defaultValue: null,
    mandatoryValue: null,
    sourceFormId: null,
    sourceForm: null,
    position: '1',
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
  {
    fieldId: '677599',
    uuid: null,
    index: '4',
    fieldType: 'TEXT',
    name: 'text 2',
    properties: {
      inputSize: 'medium'
    },
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
  }
]

export const allFieldsStep2 = () => [
  {
    fieldId: '677596',
    uuid: null,
    index: '1',
    fieldType: 'PLACEHOLDER',
    name: 'Placeholder',
    properties: {},
    fields: null,
    defaultValue: null,
    mandatoryValue: null,
    sourceFormId: null,
    sourceForm: null,
    position: '0',
    permissionConfig: [],
    permission: null,
    rules: [
      {
        type: 'SUBSTITUTION',
        condition: null,
        value: 'CREATOR',
        id: '1017658',
        childFieldIndex: null,
        defaultValueRule: false
      }
    ],
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
  {
    fieldId: '677597',
    uuid: null,
    index: '2',
    fieldType: 'TEXT',
    name: 'text',
    properties: {
      inputSize: 'medium'
    },
    fields: null,
    defaultValue: null,
    mandatoryValue: null,
    sourceFormId: null,
    sourceForm: null,
    position: '1',
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
  {
    fieldId: '677646',
    uuid: null,
    index: '5',
    fieldType: 'TEXT',
    name: '2',
    properties: {
      inputSize: 'medium'
    },
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
  {
    fieldId: '677647',
    uuid: null,
    index: '6',
    fieldType: 'TEXT',
    name: '4',
    properties: {
      inputSize: 'medium'
    },
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
    unique: false,
    modified: false,
    mandatoryOnServer: false
  }
]
