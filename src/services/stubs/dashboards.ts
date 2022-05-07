import {
  baseBulkStub,
  baseCreateStub, baseDeleteStub,
  baseListLoad,
  baseListStub,
  baseReadStub,
  baseUpdateStub,
  generateUuid, IBulkStubScenarioResponse, IStubScenario, stubScenario
} from '@/services/base/stub';
import {Dashboard, dashboards} from '@/services/repositories/dashboards';

export const DashboardsList: Dashboard[] = baseListLoad([
  {
    id: generateUuid(),
    urlView: `https://en.wikipedia.org/wiki/Main`,
    urlEdit: `https://en.wikipedia.org/w/index.php?title=Main&action=history`,
    title: 'Main',
    description: 'This is a description',
    modifiedAt: new Date(),
    createdAt: new Date(),
  },
  {
    id: generateUuid(),
    urlView: `https://en.wikipedia.org/wiki/Secondary`,
    urlEdit: `https://en.wikipedia.org/w/index.php?title=Secondary&action=history`,
    title: 'Secondary',
    description: 'This is a description',
    modifiedAt: new Date(),
    createdAt: new Date(),
  },
], dashboards.entity);

const stub = {
  repository: dashboards,
  handlers: {
    'GET /dashboards': baseListStub(dashboards.entity),
    'POST /dashboards': baseCreateStub(dashboards.entity, (record: any) => {
      record.urlView = `https://en.wikipedia.org/wiki/${encodeURIComponent(record.title)}`;
      record.urlEdit = `https://en.wikipedia.org/w/index.php?title=${encodeURIComponent(record.title)}&action=history`;
      return record;
    }),
    'GET /dashboards/:id': baseReadStub(dashboards.entity),
    'PUT /dashboards/:id': baseUpdateStub(dashboards.entity),
    'DELETE /dashboards/:id': baseDeleteStub(dashboards.entity),
    'POST /dashboards/bulk': baseBulkStub(dashboards.entity, (action: string, indexes: number[], list: any[]): IBulkStubScenarioResponse => {
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
        scenario: stubScenario({}, 400, new Headers({'Message':'$vuetify.errors.unknownBulkAction','Message-Arguments':`${action}###${dashboards.entity}`}))
      };
    }),
  },
  initialData: DashboardsList,
};

export const StubDashboards = stub;