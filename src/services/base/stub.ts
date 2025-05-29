import {IRepository} from './global.interfaces';
import {getBaseUrl} from '@/services/base/base';
import {EnumValueType} from '@/services/base/global.enums';

const StubTimeout = 500;

export const generateUuid = () => {
  let d = performance.now();
  let d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = Math.random() * 16;
    if(d > 0){
      r = (d + r)%16 | 0;
      d = Math.floor(d/16);
    } else {
      r = (d2 + r)%16 | 0;
      d2 = Math.floor(d2/16);
    }
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

export interface IBulkStubScenarioResponse {
  list?: any[];
  scenario?: IStubScenario;
}

export interface IBulkStubScenarioHandler {
  (action: string, indexes: number[], list: any[]): IBulkStubScenarioResponse;
}

export interface IStubScenario {
  status: number;
  headers: Headers;

  json(): Promise<any>;
}

const generateJsonPromise = (body: any): Promise<any> => {
  return new Promise<any>((resolve, reject) => {
    resolve(body);
  });
};

export const stubScenario = (body: any, status = 200, headers: Headers = new Headers()): IStubScenario => {
  return {
    status: status,
    headers: headers,
    json: (): Promise<any> => {
      return generateJsonPromise(body);
    },
  };
};

export const baseRestItemStub = <T>(slug: string | IRepository<any>, handler: any): IResponse => {
  const repository = (slug as IRepository<any>);
  if (repository) {
    slug = repository.slug;
  }
  return (input: RequestInfo, init?: RequestInit): Promise<Response> => {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        console.log('rest-item', slug, input, init);
        handler(input, init, resolve, reject);
      }, StubTimeout);
    });
  };
};

export const baseRestListStub = <T>(slug: string | IRepository<any>, handler: any): IResponse => {
  return (input: RequestInfo, init?: RequestInit): Promise<Response> => {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        console.log('rest-list', slug, input, init);
        handler(input, init, resolve, reject);
      }, StubTimeout);
    });
  };
};

interface IResponse {
  (input: RequestInfo, init?: RequestInit): Promise<Response>;
}

export const getPathId = (path: string): string | null => {
  let id: string | null = null;

  // todo: there must be a more accurate way of handling this, though I am sure it will rework a large amount of rework
  const pieces = path.split('/');
  pieces.map((piece) => {
    // if it looks like an id, it must be an id => such bad logic, for the love of God please figure out a better way!
    if (/^[0-9a-f]{32}$/i.test(piece.replaceAll('-', ''))) {
      id = piece;
      return ':id';
    }
    return piece;
  });

  return id;
}

export const baseHandlers = <T>(repository: IRepository<any>): any => {
  const handlers: { [key: string]: any } = {};
  const slug: string = repository.slug;
  handlers['GET /'+ slug] = baseListStub<T>(repository);
  handlers['POST /'+ slug] = baseCreateStub<T>(repository);
  handlers['GET /'+ slug + '/:id'] = baseReadStub<T>(repository);
  handlers['PUT /'+ slug + '/:id'] = baseUpdateStub<T>(repository);
  handlers['DELETE /'+ slug + '/:id'] = baseDeleteStub<T>(repository);
  handlers['POST /'+ slug + '/bulk'] = baseBulkStub<T>(repository, (action: string, indexes: number[], list: any[]): IBulkStubScenarioResponse => {
    switch (action) {
      case 'delete':
        return {
          scenario: stubScenario({}),
          list: list.filter(function(value, index, arr){
            return !indexes.includes(index);
          }),
        };
    }
    return {
      scenario: stubScenario({}, 400, new Headers({'Message':'$vuetify.errors.unknownBulkAction','Message-Arguments':`${action}###${repository.entity}`}))
    };
  });
  return handlers;
}

export const baseListStub = <T>(slug: string | IRepository<any>, scenario?: IStubScenario | null, filter?: any): IResponse => {
  const repository = (slug as IRepository<any>);
  if (repository) {
    slug = repository.slug;
  }
  return (input: RequestInfo, init?: RequestInit): Promise<Response> => {
    let itemsPerPage = 15;
    let page = 0;
    let order: string | null = null;
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (init && init.headers) {
          const headers = (init.headers as Headers);
          if (headers) {
            const pageSizeString = headers.get('Page-Size');
            if (pageSizeString) {
              itemsPerPage = parseInt(pageSizeString);
            }
            const pageString = headers.get('Page');
            if (pageString) {
              page = parseInt(pageString);
            }
          }
        }
        console.log('list', slug, filter, input, init, );
        if (scenario) {
          resolve(scenario);
        } else {
          const responseHeaders = new Headers();
          let list = [];
          if (window.localStorage) {
            const data = window.localStorage.getItem(`stub.${slug}`);
            if (data) {
              list = JSON.parse(data);
            }
          }
          const filters: any = {};
          const url = new URL('http://example.com/' + input.toString());
          url.searchParams.forEach((value, key) => {
            if (key === '-order') {
              order = value;
            } else {
              filters[key] = value;
            }
          });
          if (filter) {
            list = filter(list, filters, order, itemsPerPage, page);
          } else if (repository) {
            list = list.sort(() => {
              return true;
            });
            list = list.filter((item: any) => {
              let include = true;
              Object.keys(filters).forEach((key: string) => {
                const value = filters[key];
                if (key === '-text') {
                  const text = Object.keys(item).reduce((result: string, key: string) => {
                    if (item[key] !== undefined && item[key] !== null) {
                      if (result !== undefined && result !== null) {
                        return result + " " + item[key].toString();
                      }
                      return item[key].toString();
                    }
                  }, "");
                  if (value.startsWith('"') && value.endsWith('"')) {
                    if (text.indexOf(value.substring(1, value.length - 1)) == -1) {
                      include = false;
                    }
                  }
                  else {
                    if (text.toLowerCase().indexOf(value.toString().toLowerCase()) == -1) {
                      include = false;
                    }
                  }
                } else {
                  let itemValue = item[key];
                  if (itemValue === null || itemValue === undefined) {
                    itemValue = '##null##';
                  }
                  const itemDate: Date = new Date(Date.parse(itemValue));
                  const values = value.toLowerCase().split(',');
                  values.forEach((val: string, index: number) => {
                    if (val === '') {
                      values[index] = '##null##';
                    }
                  });
                  let from: Date = new Date();
                  let to: Date = new Date();
                  const text = itemValue.toString();
                  switch (repository.fields[key].type) {
                    default:
                      if (!values.includes(itemValue.toString().toLowerCase())) {
                        include = false;
                      }
                      break;
                    case EnumValueType.Text:
                    case EnumValueType.TextArea:
                      if (value != 'null' && value != '##null##' && value !== null && value !== undefined) {
                        if (value.startsWith('"') && value.endsWith('"')) {
                          if (text.indexOf(value.substring(1, value.length - 1)) == -1) {
                            include = false;
                          }
                        } else {
                          if (text.toLowerCase().indexOf(value.toString().toLowerCase()) == -1) {
                            include = false;
                          }
                        }
                      }
                      break;
                    case EnumValueType.DateTime:
                      if (values.length > 1) {
                        from = new Date(Date.parse(values[0]));
                        to = new Date(Date.parse(values[1]));
                      } else if (values.length > 0) {
                        from = new Date(Date.parse(values[0]));
                      }
                      if (from > to) {
                        const temp = from;
                        from = to;
                        to = temp;
                      }
                      if (!(from && to && itemDate && itemDate > from && itemDate < to)) {
                        include = false;
                      }
                      break;
                  }
                }
              });
              return include;
            });
            const totalCount = list.length;
            if (page < 1) {
              page = 1;
            }
            if (itemsPerPage > 0) {
              if (list.length > itemsPerPage) {
                list = list.splice((page - 1) * itemsPerPage, itemsPerPage);
              }
            }
            responseHeaders.set('Page', page.toString());
            responseHeaders.set('Page-Size', list.length);
            responseHeaders.set('Record-Total-Count', totalCount);
          }
          resolve(stubScenario(list, 200, responseHeaders));
        }
      }, StubTimeout);
    });
  };
};

export const baseCreateStub = <T>(slug: string | IRepository<any>, handler?: any, scenario?: IStubScenario | null): IResponse => {
  const repository = (slug as IRepository<any>);
  if (repository) {
    slug = repository.slug;
  }
  return (input: RequestInfo, init?: RequestInit): Promise<Response> => {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        console.log('create', slug, input, init);
        if (scenario) {
          resolve(scenario);
        } else {
          let list = [];
          if (window.localStorage) {
            const data = window.localStorage.getItem(`stub.${slug}`);
            if (data) {
              list = JSON.parse(data);
            }
          }

          let subScenario = stubScenario({}, 500, new Headers({
            'Message': '$vuetify.errors.general'
          }));

          let body: any = null;
          if (init && init.body) {
            body = JSON.parse(init.body.toString());
          }

          if (body) {
            const record = body;
            record.id = generateUuid();
            record.modifiedAt = new Date();
            record.createdAt = new Date();
            if (handler) {
              list.push(handler(record));
            } else {
              list.push(record);
            }
            if (window.localStorage) {
              window.localStorage.setItem(`stub.${slug}`, JSON.stringify(list));
            }
            subScenario = stubScenario(record);
          }
          resolve(subScenario);
        }
      }, StubTimeout);
    });
  };
};

export const baseReadStub = <T>(slug: string | IRepository<any>, scenario?: IStubScenario | null): IResponse => {
  const repository = (slug as IRepository<any>);
  if (repository) {
    slug = repository.slug;
  }
  return (input: RequestInfo, init?: RequestInit): Promise<Response> => {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        console.log('read', slug, input, init);
        if (scenario) {
          resolve(scenario);
        } else {
          let list = [];
          if (window.localStorage) {
            const data = window.localStorage.getItem(`stub.${slug}`);
            if (data) {
              list = JSON.parse(data);
            }
          }

          let subScenario = stubScenario({}, 404, new Headers({
            'Message': '$vuetify.errors.recordNotFound'
          }));

          const id = getPathId(input.toString());
          if (id) {
            const index = list.findIndex((item: any) => {
              return item.id === id;
            });
            if (index >= 0) {
              subScenario = stubScenario(list[index], 200)
            }
          }
          resolve(subScenario);
        }
      }, StubTimeout);
    });
  };
};

export const baseUpdateStub = <T>(slug: string | IRepository<any>, handler?: any, scenario?: IStubScenario | null): IResponse => {
  const repository = (slug as IRepository<any>);
  if (repository) {
    slug = repository.slug;
  }
  return (input: RequestInfo, init?: RequestInit): Promise<Response> => {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        console.log('update', slug, input, init);
        if (scenario) {
          resolve(scenario);
        } else {
          let list = [];
          if (window.localStorage) {
            const data = window.localStorage.getItem(`stub.${slug}`);
            if (data) {
              list = JSON.parse(data);
            }
          }

          let subScenario = stubScenario({}, 500, new Headers({
            'Message': '$vuetify.errors.general'
          }));

          let body: any = null;
          if (init && init.body) {
            body = JSON.parse(init.body.toString());
          }

          if (body) {
            subScenario = stubScenario({}, 404, new Headers({
              'Message': '$vuetify.errors.recordNotFound'
            }));

            const id = getPathId(input.toString());
            if (id) {
              const index = list.findIndex((item: any) => {
                return item.id === id;
              });
              if (index >= 0) {
                const record: any = {
                  ...list[index],
                  ...body
                };
                record.modifiedAt = new Date();
                if (handler) {
                  list[index] = handler(record);
                } else {
                  list[index] = record;
                }
                if (window.localStorage) {
                  window.localStorage.setItem(`stub.${slug}`, JSON.stringify(list));
                }
                subScenario = stubScenario(record);
              }
            }
          }
          resolve(subScenario);
        }
      }, StubTimeout);
    });
  };
};

export const baseDeleteStub = <T>(slug: string | IRepository<any>, scenario?: IStubScenario | null): IResponse => {
  const repository = (slug as IRepository<any>);
  if (repository) {
    slug = repository.slug;
  }
  return (input: RequestInfo, init?: RequestInit): Promise<Response> => {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        console.log('delete', slug, input, init);
        if (scenario) {
          resolve(scenario);
        } else {
          let list = [];
          if (window.localStorage) {
            const data = window.localStorage.getItem(`stub.${slug}`);
            if (data) {
              list = JSON.parse(data);
            }
          }

          let subScenario = stubScenario({}, 500, new Headers({
            'Message': '$vuetify.errors.general'
          }));

          subScenario = stubScenario({}, 404, new Headers({
            'Message': '$vuetify.errors.recordNotFound'
          }));

          const id = getPathId(input.toString());
          if (id) {
            const index = list.findIndex((item: any) => {
              return item.id === id
            });
            if (index >= 0) {
              const record = list[index];
              list.splice(index, 1);
              if (window.localStorage) {
                window.localStorage.setItem(`stub.${slug}`, JSON.stringify(list));
              }
              subScenario = stubScenario(record);
            }
          }
          resolve(subScenario);
        }
      }, StubTimeout);
    });
  };
};

export const baseBulkStub = <T>(slug: string | IRepository<any>, recordHandler?: IBulkStubScenarioHandler, scenario?: IStubScenario | null): IResponse => {
  const repository = (slug as IRepository<any>);
  if (repository) {
    slug = repository.slug;
  }
  return (input: RequestInfo, init?: RequestInit): Promise<Response> => {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        console.log('bulk', slug, input, init);
        if (scenario) {
          resolve(scenario);
        } else {
          let list: any = [];
          if (window.localStorage) {
            const data = window.localStorage.getItem(`stub.${slug}`);
            if (data) {
              list = JSON.parse(data);
            }
          }

          let subScenario = stubScenario({}, 500, new Headers({
            'Message': '$vuetify.errors.general'
          }));

          let body: any = null;
          if (init && init.body) {
            body = JSON.parse(init.body.toString());
          }

          if (body && body.action && body.ids && recordHandler) {
            const recordIndexes: number[] = [];
            body.ids.forEach((id: string) => {
              const index = list.findIndex((item: any) => {
                return item.id.toLowerCase() === id.toLowerCase();
              });
              recordIndexes.push(index);
            });
            const response = recordHandler(body.action, recordIndexes, list);
            if (response.scenario) {
              subScenario = response.scenario;
            }
            if (response.list) {
              list = response.list;
            }
            if (window.localStorage) {
              window.localStorage.setItem(`stub.${slug}`, JSON.stringify(list));
            }
          }

          resolve(subScenario);
        }
      }, StubTimeout);
    });
  };
};

export const baseListLoad = <T>(list: T[], slug: string | IRepository<any>): T[] => {
  const repository = (slug as IRepository<any>);
  if (repository) {
    slug = repository.slug;
  }
  if (window.localStorage) {
    const data = window.localStorage.getItem(`stub.${slug}`);
    if (data) {
      const items = JSON.parse(data);
      if (items) {
        return items;
      }
    }
    window.localStorage.setItem(`stub.${slug}`, JSON.stringify(list));
  }
  return list;
}

export const baseStoreLoad = <T>(item: T, slug: string | IRepository<any>): T => {
  const repository = (slug as IRepository<any>);
  if (repository) {
    slug = repository.slug;
  }
  if (window.localStorage) {
    const data = window.localStorage.getItem(`stub.${slug}`);
    if (data) {
      const items = JSON.parse(data);
      if (items) {
        return items;
      }
    }
    window.localStorage.setItem(`stub.${slug}`, JSON.stringify(item));
  }
  return item;
}

export const baseStoreSave = <T>(item: T, slug: string | IRepository<any>): T => {
  const repository = (slug as IRepository<any>);
  if (repository) {
    slug = repository.slug;
  }
  if (window.localStorage) {
    window.localStorage.setItem(`stub.${slug}`, JSON.stringify(item));
  }
  return item;
}

export const generateFakeJwt = (claims: any): string => {
  const header = {
    'alg': 'HS256',
    'typ': 'JWT',
  }
  const encodedHeaders = btoa(JSON.stringify(header))

  if (!claims) {
    claims = {
      'iat': Math.round((new Date()).getTime() / 1000),
    }
  } else {
    claims.iat = Math.round((new Date()).getTime() / 1000);
  }
  const encodedPayload = btoa(JSON.stringify(claims))

  const signature = 'fake';
  const encodedSignature = btoa(signature)

  return `${encodedHeaders}.${encodedPayload}.${encodedSignature}`
}

const handlers: any = {};

export const baseStubHandlerAppend = (stub: any) => {
  Object.keys(stub.handlers).forEach((key) => {
    handlers[key] = stub.handlers[key];
  });
}

export const baseStubHandlerRoutine = (input: RequestInfo, init?: RequestInit): Promise<Response> => {
  let method = 'GET';
  if (init && init.method) {
    method = init.method.toUpperCase();
  }

  let path = input.toString().replace(getBaseUrl(), '').toLowerCase();
  if (!path.startsWith('/')) {
    path = `/${path}`;
  }
  if (path.includes('?')) {
    path = path.substring(0, path.indexOf('?'))
  }

  // todo: there must be a more accurate way of handling this, though I am sure it will rework a large amount of rework
  let pieces = path.split('/');
  pieces = pieces.map((piece) => {
    // if it looks like an id, it must be an id => such bad logic, for the love of God please figure out a better way!
    if (/^[0-9a-f]{32}$/i.test(piece.replaceAll('-', ''))) {
      return ':id';
    }
    return piece;
  });
  path = pieces.join('/');

  const pathKey = `${method} ${path}`;
  if (handlers[pathKey]) {
    return handlers[pathKey](input, init);
  } else {
    throw `no stub handler for ${pathKey}`;
  }
};
