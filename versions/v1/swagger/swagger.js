import config from '../../../configs'

export default {
  'swagger': '2.0',
  'info': {
    'title': 'Authentication',
    'description': 'Authentication API',
    'version': 'v1'
  },
  'host': config.api.host || 'localhost:80',
  'basePath': '/v1',
  'schemes': [
    'http'
  ],
  'produces': [
    'application/json'
  ],
  'securityDefinitions': {
    'Bearer': {
      'type': 'apiKey',
      'description': 'JWT',
      'name': 'Authorization',
      'in': 'header'
    }
  },
  'paths': {
    '/health': {
      'get': {
        'summary': 'Informations about API Health.',
        'description': 'Returns informations about API Health.',
        'operationId': 'LoginAPI',
        'produces': [
          'application/json'
        ],
        'consumes': [
          'application/json'
        ],
        'responses': {
          '200': {
            'description': 'Informations about API Health.',
            'schema': {
              'type': 'object',
              'properties': {
                '/health': {
                  'type': 'boolean'
                }
              }
            },
            'example': {
              '/health': true
            }
          }
        },
        'default': {
          'description': 'Unexpected error',
          'schema': {
            '$ref': '#/definitions/Error'
          }
        }
      }
    },
    '/register': {
      'post': {
        'summary': 'Create a new company.',
        'description': 'Create company from wizard.',
        'operationId': 'create companies',
        'produces': [
          'application/json'
        ],
        'consumes': [
          'application/json'
        ],
        'responses': {
          '200': {
            'description': 'Informations about company.',
            'schema': {
              'type': 'object'
            }
          },
          '404': {
            'description': 'Company not found.',
            'schema': {
              'type': 'object'
            },
            'example': {
              'message': 'Company not found.'
            }
          },
          '500': {
            'description': 'authentication status error.',
            'schema': {
              'type': 'object',
              'properties': {
                'code': {
                  'type': 'integer'
                },
                'message': {
                  'type': 'string'
                }
              }
            },
            'example': {
              'status': 'error',
              'message': ''
            }
          }
        },
        'default': {
          'description': 'Unexpected error',
          'schema': {
            '$ref': '#/definitions/Error'
          }
        }
      }
    },
    '/login': {
      'post': {
        'summary': 'Login.',
        'description': 'Returns the informations.',
        'operationId': 'Login user',
        'produces': [
          'application/json'
        ],
        'consumes': [
          'application/json'
        ],
        'responses': {
          '200': {
            'description': 'Informations about user.',
            'schema': {
              'type': 'object'
            }
          },
          '400': {
            'description': 'Problem login.',
            'schema': {
              'type': 'object'
            },
            'example': {
              'message': 'User not found.'
            }
          },
          '404': {
            'description': 'User not found.',
            'schema': {
              'type': 'object'
            },
            'example': {
              'message': 'User not found.'
            }
          },
          '500': {
            'description': 'authentication status error.',
            'schema': {
              'type': 'object',
              'properties': {
                'code': {
                  'type': 'integer'
                },
                'message': {
                  'type': 'string'
                }
              }
            },
            'example': {
              'status': 'error',
              'message': ''
            }
          }
        },
        'default': {
          'description': 'Unexpected error',
          'schema': {
            '$ref': '#/definitions/Error'
          }
        }
      }
    },
    '/user': {
      'get': {
        'summary': 'get user.',
        'description': 'Returns the informations.',
        'operationId': 'Get user',
        'produces': [
          'application/json'
        ],
        'consumes': [
          'application/json'
        ],
        'responses': {
          '200': {
            'description': 'Get user.',
            'schema': {
              'type': 'object'
            }
          },
          '400': {
            'description': 'Problem find.',
            'schema': {
              'type': 'object'
            },
            'example': {
              'message': 'User not found.'
            }
          },
          '404': {
            'description': 'User not found.',
            'schema': {
              'type': 'object'
            },
            'example': {
              'message': 'User not found.'
            }
          },
          '500': {
            'description': 'authentication status error.',
            'schema': {
              'type': 'object',
              'properties': {
                'code': {
                  'type': 'integer'
                },
                'message': {
                  'type': 'string'
                }
              }
            },
            'example': {
              'status': 'error',
              'message': ''
            }
          }
        },
        'default': {
          'description': 'Unexpected error',
          'schema': {
            '$ref': '#/definitions/Error'
          }
        }
      }
    }
  }
}
