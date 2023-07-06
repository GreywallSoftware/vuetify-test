export default {
  auth () {
    return {
      access_token: 'test',

      generateDownloadToken () {
        return new Promise((resolve) => {
          resolve('test_token_yo')
        })
      }
    }
  },
  api: {
    v2: {
      Form: {
        id () {
          return {
            get () {
              // mock our form
              return new require('./data/formMock').form
            }
          }
        }
      },

      Workflow: {
        id () {
          return {
            get () {
              return {}
            },

            associations: {
              get () {
                return new Promise((resolve) => {
                  resolve(require('./data/pages/pages').default)
                })
              }
            }
          }
        }
      },

      Container: {
        id () {
          return {
            getForms () {
              const testForm = require('./data/formMock').form
              const singleField = Object.assign({}, require('./data/fieldMocks').single)
              singleField.index = '17'
              singleField.position = '17'
              testForm.fields[17] = singleField
              return new Promise((resolve) => {
                resolve([
                  testForm
                ])
              })
            },

            getWorkflows () {
              return Promise.resolve([{ id: 1, name: 'Workflow 1' }, { id: 2, name: 'Workflow 2' }])
            },

            pages: {
              get () {
                return new Promise((resolve) => {
                  resolve(require('./data/pages/pages').default)
                })
              }
            },

            page (pageId) {
              return {
                get () {
                  return new Promise((resolve) => {
                    if (pageId === '1001' && process.env.JEST_WORKER_ID === undefined) {
                      resolve(require('./data/pages/compass').default)
                    } else {
                      resolve(require('./data/pages/page').default)
                    }
                  })
                }
              }
            }
          }
        }
      },

      View: {
        id (viewId) {
          return {
            get () {
              // mock our form
              return {
                id: viewId,
                description: 'Test View'
              }
            }
          }
        }
      }
    },

    v1: {
      Container: {
        id () {
          return {
            getDetails (silent) {}
          }
        }
      }
    },

    web: {
      AuthdUser: {
        accessibleContainers () {
          return {
            orgs: [{ id: '1' }],
            groups: [{ id: '1019' }],
            rooms: [{ id: '1050' }]
          }
        },

        groups () {
          return new Promise((resolve) => {
            resolve([{
              id: '1050',
              containerType: 'GROUP',
              name: 'Test Group'
            }])
          })
        }
      },
      Form: {
        id () {
          return {
            checkFieldDelete () {
              return []
            },
            rules: {
              get () {
                return []
              }
            }
          }
        }
      },

      Room: {
        id () {
          return {
            tasks: {
              taskTypes () {
                return {
                  get () {
                    return new Promise((resolve) => {
                      resolve([])
                    })
                  }
                }
              }
            },

            dashboards: {
              get () {
                return new Promise((resolve) => {
                  resolve([])
                })
              }
            }
          }
        }
      },

      Container: {
        id () {
          return {
            plans: {
              get () {
                return new Promise((resolve) => {
                  resolve([])
                })
              },

              getPlanCategories () {
                return {
                  'Testing Plan': ['Plan Test', 'Value of DDL'],
                  ' ': [],
                  '': [],
                  Test: ['Test-sub category', 'New Category Test'],
                  'Customer Solutions': ['New Haven', 'Iolio'],
                  category: ['subcategory'],
                  createNew: []
                }
              }
            },

            files: {
              get () {
                return new Promise((resolve) => {
                  resolve([])
                })
              },

              uploadUrl () {
                return 'test url'
              }
            },

            forms: {
              get () {
                return new Promise((resolve) => {
                  resolve([])
                })
              }
            },

            workflows: {
              get () {
                return new Promise((resolve) => {
                  resolve([])
                })
              }
            },

            lists: {
              get () {
                return new Promise((resolve) => {
                  resolve([])
                })
              }
            },

            checkIns: {
              events: {
                get () {
                  return new Promise((resolve) => {
                    resolve([])
                  })
                }
              }
            },

            views: {
              get () {
                return new Promise((resolve) => {
                  resolve([{
                    containerId: '1050',
                    createdBy: '-1',
                    desc: 'Public Room Map',
                    key: 'v2esncacsrej',
                    options: null,
                    orgId: '1',
                    personal: false,
                    pub: true,
                    state: '{"participants":true,"forms":{"153233":{"filters":{},"removedFields":[]}},"mapTypeId":"roadmap","taskCats":{},"processes":{},"bounds":{"ne":{"lat":41.90265656838849,"lng":-70.72172274501952},"sw":{"lat":39.804707868660735,"lng":-76.57743563564452}},"mapName":"Geoff\'s Public Map","mapLegend":"<p>\\n\\t<span style=\\"color:#008000;\\"><strong>Green </strong></span>Skull - Poison</p>\\n<p>\\n\\t<span style=\\"color:#008000;\\">Green</span> House - <span style=\\"font-size:16px;\\">Home</span></p>\\n"}',
                    type: 'MAP',
                    urlExtraInfo: null,
                    viewId: '2070723',
                  }])
                })
              }
            }
          }
        }
      },

      Object: {
        id () {
          return {
            views: {
              get () {
                return new Promise((resolve) => {
                  resolve([{ viewId: '12345', description: 'Test View', key: 'abc123', objectId: '1000' }])
                })
              }
            }
          }
        }
      }
    }
  }
}
