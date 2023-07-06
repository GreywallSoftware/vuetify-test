export default {
  id: '1000',
  containerId: '1',
  slug: 'orgHome',
  name: 'Home Page',
  type: 'PAGE',
  status: 'LIVE',
  favorite: true,
  properties: {
    thumbnail: 'mdi-account',
    backgroundColor: '#0A141F',
    hideVeociHeader: false,
    customizeHeader: {
      menu: false,
      breadcrumbs: false,
      search: false,
      chat: false,
      alerts: false,
      userMenu: true,
      userMenuProps: {
        profile: false,
        accountSettings: false,
        tour: false,
        help: true
      }
    },
    theme: 'dark'
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
  canvas: {
    maxWidth: 1200,
    blocks: [{
      id: '34f3e3e3-a300-4a04-8447-88b27c88d5da',
      width: 100,
      height: 100,
      type: 'BUTTON_SET',
      properties: {
        buttons: [{
          uuid: '4cde27c2-9a6e-49f1-a969-b4c38306148f',
          icon: 'mdi-clipboard-text-search',
          iconPosition: 'top',
          type: 'BUTTON',
          color: '#1E89E4',
          textColor: '#FFFFFF',
          action: {
            label: 'New Self-Inspection',
            linkObject: '18356012',
            containerType: 'MUCROOM',
            linkAction: 'CREATE_FORM_ENTRY',
            container: '11356',
            group: '2119',
            org: '1',
            url: '/v/c/11356/form/18356012/entry/create/input'
          }
        }, {
          uuid: '59dc1100-243f-47aa-9eca-52f729175bbe',
          icon: 'mdi-paw',
          iconPosition: 'top',
          type: 'BUTTON',
          color: '#419844',
          textColor: '#FFFFFF',
          action: {
            label: 'Create Strike Report / Observation',
            linkObject: '24511329',
            containerType: 'MUCROOM',
            linkAction: 'CREATE_FORM_ENTRY',
            container: '11356',
            group: '2119',
            org: '1',
            url: '/v/c/11356/form/24511329/entry/create/input'
          }
        }, {
          uuid: '9e8ec02c-95ff-4aaf-a19b-dd49755c08a3',
          icon: 'mdi-hammer-wrench',
          iconPosition: 'top',
          type: 'BUTTON',
          color: '#F2511D',
          textColor: '#FFFFFF',
          action: {
            label: 'New Work Order',
            linkObject: '25555053',
            containerType: 'MUCROOM',
            linkAction: 'CREATE_WORKFLOW',
            url: '/v/c/11356/workflow/25555053/entry/create',
            container: '11356',
            group: '2119',
            org: '1'
          }
        }, {
          uuid: '46d62b76-4a42-4c9c-ac71-2c35926ba4be',
          icon: 'mdi-tag',
          iconPosition: 'top',
          type: 'BUTTON',
          color: '#5D35B1',
          textColor: '#FFFFFF',
          action: {
            label: 'New Asset Log',
            linkObject: '13848281',
            containerType: 'MUCROOM',
            linkAction: 'CREATE_FORM_ENTRY',
            container: '11356',
            group: '2119',
            org: '1',
            url: '/v/c/11356/form/13848281/entry/create/input'
          }
        }, {
          uuid: 'd9d999ae-7601-4592-8e2c-0d0cc41969dd',
          icon: 'mdi-file-document-plus',
          iconPosition: 'top',
          type: 'BUTTON',
          text: '',
          color: '#00887A',
          textColor: '#FFFFFF',
          action: {
            label: 'New Daily Log',
            linkObject: '21470241',
            containerType: 'MUCROOM',
            linkAction: 'CREATE_FORM_ENTRY',
            container: '11356',
            group: '2119',
            org: '1',
            url: '/v/c/11356/form/21470241/entry/create/input'
          }
        }]
      }
    }, {
      id: 'ac6c8181-f85e-4201-889c-34740b2f7826',
      width: 100,
      height: 100,
      type: 'HEADING',
      properties: { content: 'My Reports', level: 2, margin: '0', color: '#FFFFFF' }
    }, {
      id: '7928bf34-79e1-4447-9070-f59943808ba4',
      width: 100,
      height: 100,
      type: 'MAP',
      properties: {
        linkAction: 'NAVIGATE_MAP',
        label: 'Work Orders',
        newWindow: false,
        url: '/v/c/11356/map?&key=hnquaw7sgy',
        uuid: 'bca172cc-b474-4159-90f4-d850e34a754c',
        container: '11356',
        containerType: 'MUCROOM',
        dynamicContainer: false,
        dynamicParentContainer: false,
        group: '2119',
        org: '1',
        linkObject: '',
        savedViewKey: 'hnquaw7sgy'
      }
    }, {
      id: '13',
      height: 0,
      type: 'SECTION',
      direction: 'ROW',
      children: [{
        id: '22fb34d9-3ec1-47c2-b5b4-2f88cc373af9',
        width: 50,
        height: 100,
        type: 'WORKFLOW_ENTRIES',
        properties: {
          label: 'Open Work Orders',
          allowFilter: true,
          linkAction: 'NAVIGATE_WORKFLOW',
          newWindow: false,
          url: '/v/c/11356/workflow/21869830/entries',
          uuid: '290590d4-a98a-4a02-86bf-3296b36466c8',
          container: '11356',
          containerType: 'MUCROOM',
          dynamicContainer: false,
          dynamicParentContainer: false,
          group: '2119',
          org: '1',
          linkObject: '21869830'
        }
      }, {
        id: '57112c6f-5b3a-4ada-9353-690d12afeeaa',
        width: 50,
        height: 100,
        type: 'WORKFLOW_ENTRIES',
        properties: {
          label: 'Closed Work Orders',
          allowFilter: true,
          linkAction: 'NAVIGATE_WORKFLOW',
          newWindow: false,
          url: '/v/c/11356/workflow/22281927/entries/gusfeaeuzv',
          uuid: 'ca9aab93-213c-43d8-9f63-c386cf093dee',
          container: '11356',
          containerType: null,
          dynamicContainer: false,
          dynamicParentContainer: false,
          group: '2119',
          org: '1',
          linkObject: '22281927',
          savedViewKey: 'gusfeaeuzv'
        }
      }]
    }, {
      id: '0ab26aa2-4d11-4560-80c1-2fb9112f26f3',
      width: 100,
      height: 100,
      type: 'FORM_ENTRIES',
      properties: {
        label: 'Inspections',
        allowFilter: true,
        linkAction: 'NAVIGATE_FORM',
        newWindow: false,
        url: '/v/c/11356/form/19277558',
        uuid: '6b1f72bc-6bd8-4740-a46c-33a753f69a7b',
        container: '11356',
        containerType: 'MUCROOM',
        dynamicContainer: false,
        dynamicParentContainer: false,
        group: '2119',
        org: '1',
        linkObject: '19277558'
      }
    }, {
      id: '2dffca80-03cc-43af-ab9b-af0dd831cb11',
      height: 0,
      type: 'SECTION',
      direction: 'ROW',
      children: [{
        id: 'c8c3a063-7452-466b-9dc2-c3699dc8d3d4',
        width: 50,
        height: 100,
        type: 'CHART',
        properties: {
          label: 'Wildlife Sightings',
          allowFilter: true,
          linkAction: 'NAVIGATE_FORM',
          newWindow: false,
          url: '/v/c/11356/form/24511320',
          uuid: '4c874cf0-9980-424b-810c-a5197fbe5233',
          container: '11356',
          containerType: 'MUCROOM',
          dynamicContainer: false,
          dynamicParentContainer: false,
          group: '2119',
          org: '1',
          linkObject: '24511320',
          savedViewKey: '9ub29jfbxe',
          chartSettings: {}
        }
      }, {
        id: 'c5e75f42-9d0d-4e94-a65e-84db76576bd3',
        width: 50,
        height: 100,
        type: 'FORM_ENTRIES',
        properties: {
          label: 'Assets',
          allowFilter: true,
          linkAction: 'NAVIGATE_FORM',
          newWindow: false,
          url: '/v/c/11356/form/29553660',
          uuid: '35584b78-dcaf-45bc-b3bc-d586b3beada7',
          container: '11356',
          containerType: 'MUCROOM',
          dynamicContainer: false,
          dynamicParentContainer: false,
          group: '2119',
          org: '1',
          linkObject: '29553660'
        }
      }]
    }, {
      id: '7d2c2a23-48ad-42be-aa8f-345c3705174e',
      width: 50,
      height: 100,
      type: 'RICH_TEXT',
      properties: { content: '<div><strong><span style="font-size: 18px;">Help Center</span></strong></div><table style="width: 100%;"><tbody><tr><td style="width: 50.0000%;">Training Videos<br></td><td style="width: 50.0000%;">Contact</td></tr><tr><td style="width: 50.0000%;"><a class="create-link" data-linkaction="NONE" data-vtarget="_blank" href="http://veoci.com/" rel="noopener noreferrer" target="_blank">Introduction to Veoci</a><br><a class="create-link" data-linkaction="NONE" data-vtarget="_blank" href="http://veoci.com/" rel="noopener noreferrer" target="_blank">Adding/Removing Users</a><br><a class="create-link" data-linkaction="NONE" data-vtarget="_blank" href="http://veoci.com/" rel="noopener noreferrer" target="_blank">Create New Entry/Edit Existing Entry</a><br><a class="create-link" data-linkaction="NONE" data-vtarget="_blank" href="http://veoci.com/" rel="noopener noreferrer" target="_blank">View Entries</a><br><a class="create-link" data-linkaction="NONE" data-vtarget="_blank" href="http://veoci.com/" rel="noopener noreferrer" target="_blank">Filter/Search Entries</a><br></td><td style="width: 50%; vertical-align: top;"><a class="create-link" data-linkaction="NONE" data-vtarget="_blank" href="http://veoci.com" rel="noopener noreferrer" target="_blank">Helpdesk &amp; FAQ</a><br><a class="create-link" data-linkaction="NONE" data-vtarget="_blank" href="http://veoci.com/" rel="noopener noreferrer" target="_blank">Contact Veoci</a><br><a class="create-link" data-linkaction="NONE" data-vtarget="_blank" href="http://veoci.com" rel="noopener noreferrer" target="_blank">Billing &amp; Payments</a></td></tr></tbody></table>' }
    }]
  }
}
