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
    thumbnail: 'https://via.placeholder.com/800x600',
    title: 'Main',
    description: 'This is a description',
    modifiedAt: new Date(),
    createdAt: new Date(),
  },
  {
    id: generateUuid(),
    thumbnail: 'https://via.placeholder.com/800x600',
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
    'POST /dashboards/:id': baseCreateStub(dashboards.entity),
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
