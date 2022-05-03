import {
  baseBulkStub,
  baseCreateStub, baseDeleteStub,
  baseListLoad,
  baseListStub,
  baseReadStub,
  baseUpdateStub,
  generateUuid, IBulkStubScenarioResponse, IStubScenario, stubScenario
} from '@/services/base/stub';
import {Report, reports} from '@/services/repositories/reports';

export const ReportsList: Report[] = baseListLoad([
  {
    id: generateUuid(),
    title: 'Report #1',
    description: 'This is a description',
    modifiedAt: new Date(),
    createdAt: new Date(),
  },
], reports.entity);

const stub = {
  repository: reports,
  handlers: {
    'GET /reports': baseListStub(reports.entity),
    'POST /reports/:id': baseCreateStub(reports.entity),
    'GET /reports/:id': baseReadStub(reports.entity),
    'PUT /reports/:id': baseUpdateStub(reports.entity),
    'DELETE /reports/:id': baseDeleteStub(reports.entity),
    'POST /reports/bulk': baseBulkStub(reports.entity, (action: string, indexes: number[], list: any[]): IBulkStubScenarioResponse => {
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
        scenario: stubScenario({}, 400, new Headers({'Message':'$vuetify.errors.unknownBulkAction','Message-Arguments':`${action}###${reports.entity}`}))
      };
    }),
  },
  initialData: ReportsList,
};

export const StubReports = stub;
