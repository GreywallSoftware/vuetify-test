export const buttons = {
  id: '104',
  type: 'BUTTON_SET',
  properties: {
    width: 100,
    height: 0,
    buttons: [{
      uuid: '6b85a4d4-74b0-4df7-94ca-3beda38ed549',
      icon: 'mdi-currency-usd',
      iconPosition: 'left',
      borderColor: '#24390a',
      borderWidth: '5',
      type: 'BUTTON',
      color: '#24476b',
      textColor: '#FFFFFF',
      action: {
        linkAction: 'CREATE_TASK',
        label: '401K Info',
        newWindow: false,
        url: '',
        uuid: '1dcd0276-7417-40e3-b1cf-1a6f52659798',
        container: '1050',
        containerType: 'MUCROOM',
        dynamicContainer: false,
        dynamicParentContainer: false,
        group: '',
        org: '',
        linkObject: ''
      }
    }, {
      uuid: '31b13753-fa4f-4528-aa99-559096e53246',
      icon: 'mdi-airplane',
      iconPosition: 'top',
      type: 'BUTTON',
      color: '#D8D8D8',
      action: {
        linkAction: 'CREATE_FORM_ENTRY',
        label: 'Flight Info',
        newWindow: false,
        url: '/v/c/1050/form/2551422/entry/create/input',
        uuid: '822ffe86-62b2-4be6-a019-0f1b53ba22c6',
        container: '1050',
        containerType: 'MUCROOM',
        dynamicContainer: false,
        dynamicParentContainer: false,
        group: '',
        org: '',
        linkObject: '2551422'
      }
    }, {
      uuid: '28a89d88-84d9-4b81-be7f-5f52f0a081ad',
      icon: 'mdi-account-outline',
      iconPosition: 'right',
      type: 'BUTTON',
      color: '#D8D8D8',
      action: {
        linkAction: 'LAUNCH_PLAN',
        label: 'Baby Info',
        newWindow: false,
        url: '',
        uuid: 'a0e331e6-9afe-407d-bf26-e4c621742c02',
        container: '1050',
        containerType: 'MUCROOM',
        dynamicContainer: false,
        dynamicParentContainer: false,
        group: '1050',
        org: '',
        linkObject: '8404',
        plan: {
          id: '8404',
          name: '153 Plan',
          desc: null,
          open: false,
          mainRoomId: '5297',
          mainRoomName: '5 Mintues after again',
          category: null,
          planType: 'INCIDENT_RESPONSE',
          eventXDate: null,
          launchMessage: '',
          launchable: true,
          progressTracker: null,
          subCategory: null,
          canLaunch: true,
          org: '1',
          group: '1019'
        }
      }
    }],
    direction: 'row',
    spacing: 'center'
  },
  mode: 'MODIFY'
}

export const richText = {
  id: '100',
  type: 'RICH_TEXT',
  properties: {
    width: 75,
    height: 'auto',
    content: '<h3>Welcome Aboard!</h3>\n\n' +
      '\n' +
      '<p>Dolor sit amet, consectetur adipiscing elit. Cras nec laoreet justo. Sed condimentum non quam at sagittis. Ut gravida quam ac pellentesque condimentum. Pellentesque non condimentum nulla, id imperdiet est. Duis facilisis sem quis egestas cursus. Aliquam sed sem non massa mollis auctor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed bibendum convallis elit, a lobortis massa ullamcorper at. Pellentesque suscipit urna sit amet condimentum euismod. Nulla eget elit et purus varius consectetur in a tortor. Nunc molestie vestibulum nulla ac tempor. Vestibulum molestie urna eget quam dignissim placerat. </p>\n'
  },
  mode: 'MODIFY'
}

export const image = {
  id: '102',
  type: 'IMAGE',
  properties: {
    imageHeight: '100',
    imageWidth: '50',
    imageAction: {},
    source: 'https://media.istockphoto.com/photos/barbary-macaque-picture-id824860820?k=20&m=824860820&s=612x612&w=0&h=W8783ZGcqMfDMJoXvBAyDFcSjnOWdKqKhgLGvf-VIuU=',
    veociFileId: null,
    veociFileName: ''
  },
  mode: 'MODIFY'
}

export const divider = {
  id: '106',
  type: 'DIVIDER',
  properties: {
    color: '#123abc',
    thickness: '4',
    width: 100,
    height: 'auto',
    spacing: {
      margin: {
        top: '0',
        right: '0',
        bottom: '0',
        left: '0'
      },
      padding: {
        top: '0',
        right: '0',
        bottom: '0',
        left: '0'
      }
    }
  },
  mode: 'MODIFY'
}

export const map = {
  id: '105',
  type: 'MAP',
  properties: {
    width: 100,
    height: 0,
    container: '1050',
    containerType: 'MUCROOM',
    dynamicContainer: false,
    dynamicParentContainer: false,
    group: '1019',
    label: 'Map: Public Room Map',
    linkAction: 'NAVIGATE_MAP',
    linkObject: '',
    newWindow: false,
    org: '1',
    savedViewKey: 'v2esncacsrej',
    url: '/v/c/1050/map?&key=v2esncacsrej',
    uuid: 'fb527954-3bd3-4d8d-a0fa-eab85080dde1',
  },
  mode: 'MODIFY'
}

export const heading = {
  id: '37fc2e99-1d1f-46b5-aea1-29356e31dd5d',
  type: 'HEADING',
  properties: {
    width: 100,
    height: 0,
    content: 'This is a heading block with the absolute biggest size you can imagine',
    level: 1,
    margin: 20,
    color: '#404040',
    alignment: 'center'
  },
  mode: 'MODIFY'
}

export const formEntryGrid = {
  id: 'f49fa1fe-3158-46b1-98f5-8c1122d50bd3',
  type: 'FORM_ENTRIES',
  properties: {
    width: 100,
    height: 0,
    label: 'Form Entry Test',
    allowFilter: true,
    linkAction: 'NAVIGATE_FORM',
    newWindow: false,
    url: '/v/c/1050/form/197434/entries/tsun7n',
    container: '1050',
    containerType: 'MUCROOM',
    dynamicContainer: false,
    dynamicParentContainer: false,
    group: '1019',
    org: '1',
    linkObject: '197434',
    savedViewKey: 'tsun7n'
  },
  mode: 'MODIFY'
}

export const formEntry = {
  id: '57a8f1aa-2530-4d2d-b44d-ad691826fd36',
  type: 'FORM_ENTRY',
  properties: {
    width: 50,
    height: 0,
    label: 'FORM ENTRY TEST',
    formId: '154633',
    containerId: '1050',
    embeddedCreate: true,
    type: 'MUCROOM',
    savedViewKey: 'xg4764',
    condensedSpacing: true,
    hideEmptyFields: false,
    customNoValue: 'NO VALUE BRUH',
    printViewId: '29881115',
    allowEdit: true
  },
  mode: 'MODIFY'
}

export const workflowEntry = {
  id: '1987926f-562d-4eea-9e7d-9faedfa47aab',
  type: 'WORKFLOW_ENTRY',
  properties: {
    width: 50,
    height: 0,
    label: 'WORKFLOW ENTRY TEST',
    workflowId: '54700',
    containerId: '1050',
    embeddedCreate: false,
    type: 'MUCROOM',
    savedViewKey: 'zjxy2v',
    condensedSpacing: true,
    hideEmptyFields: false,
    customNoValue: 'NO VALUE BRUH',
    printViewId: '',
    allowEdit: true
  },
  mode: 'MODIFY'
}

export const listMembers = {
  id: '492f3fa1-482a-4f6e-9022-89cd01bbfe8d',
  type: 'LIST_MEMBERS',
  properties: {
    width: 100,
    height: 0,
    label: 'View List Members: 2021-3-24 Contact List Jon',
    allowFilter: true,
    linkAction: 'NAVIGATE_LIST',
    newWindow: false,
    url: '/v/c/1/list/281966/details',
    uuid: 'd908905a-8257-464d-ad1e-3866dba9c07f',
    container: '1',
    containerType: 'ORGANIZATION',
    dynamicContainer: false,
    dynamicParentContainer: false,
    group: '',
    org: '',
    linkObject: '281966'
  },
  mode: 'MODIFY'
}

export const messaging = {
  id: '45a9f768-4fd5-4612-9862-b56bbc326bd6',
  type: 'MESSAGING',
  properties: {
    width: 100,
    height: 0,
    maxHeight: 500,
    label: '',
    linkAction: 'NAVIGATE_ROOM',
    linkObject: '',
    containerType: 'MUCROOM',
    url: '/v/c/1050/cockpit',
    container: '1050',
    group: '1019',
    org: '1'
  },
  mode: 'MODIFY'
}

export const calendar = {
  id: '242427ee-c7f6-486a-9591-f428fff09c17',
  type: 'CALENDAR',
  properties: {
    width: 100,
    height: 50,
    label: 'Calendar: Geoff\'s MAIN test room',
    linkAction: 'NAVIGATE_CALENDAR',
    linkObject: '',
    containerType: 'MUCROOM',
    url: '/v/c/1050/calendar',
    container: '1050',
    group: '1019',
    org: '1',
    savedViewKey: 'ud6438a7sy'
  }
}
