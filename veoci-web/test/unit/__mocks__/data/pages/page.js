const testImage1 = { ...require('./blocks').image }
const testImage2 = JSON.parse(JSON.stringify(require('./blocks').image))
testImage2.properties.source = 'https://tailandfur.com/wp-content/uploads/2014/03/Funny-pictures-of-animals-41.jpg'
testImage2.id = '103'

export default {
  id: '1000',
  containerId: '1',
  slug: 'orgHome',
  name: 'Home Page',
  type: 'PAGE',
  status: 'DRAFT',
  favorite: true,
  properties: {
    thumbnail: 'mdi-account',
    backgroundColor: '#fafafa',
    hideVeociHeader: false,
    customizeHeader: {
      menu: true,
      breadcrumbs: true,
      search: true,
      chat: true,
      alerts: true,
      userMenu: true,
      userMenuProps: {
        profile: true,
        accountSettings: true,
        tour: true,
        help: true
      }
    },
    maxWidth: 1200,
  },
  meta: {
    lastModified: 1652363492424,
    lastModifiedBy: {
      id: '1690',
      name: 'Geoff'
    },
    createdOn: 1652363492424,
    createdBy: {
      id: '1690',
      name: 'Geoff'
    },
  },
  blocks: [{
    ...require('./blocks').heading
  }, {
    id: '10',
    type: 'SECTION',
    direction: 'ROW',
    properties: {
      height: 'auto'
    },
    children: [{
      ...require('./blocks').richText
    }, {
      id: '101',
      type: 'SECTION',
      direction: 'COL',
      properties: {
        width: 25,
        height: 'auto',
      },
      children: [
        testImage1,
        testImage2
      ]
    }]
  }, {
    ...require('./blocks').buttons
  }, {
    ...require('./blocks').divider
  }, {
    ...require('./blocks').map
  }, {
    id: '1f633a78-c8e9-4cec-b281-b59e6b214d84',
    type: 'SECTION',
    direction: 'ROW',
    properties: {
      height: 'auto'
    },
    children: [{
      ...require('./blocks').formEntryGrid
    }, {
      ...require('./blocks').listMembers
    }]
  }, {
    ...require('./blocks').calendar
  }, {
    id: '40423f73-7e8b-40f7-8277-f1a90be9237d',
    type: 'SECTION',
    direction: 'ROW',
    properties: {
      height: 'auto'
    },
    children: [{
      ...require('./blocks').formEntry
    }, {
      ...require('./blocks').workflowEntry
    }]
  }, {
    ...require('./blocks').messaging
  }]
}
