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
    urlThumbnail: 'https://via.placeholder.com/800x600',
    urlView: `https://en.wikipedia.org/wiki/Report1`,
    urlEdit: `https://en.wikipedia.org/w/index.php?title=Main_course&action=history`,
    title: 'Report #1',
    description: 'This is a description',
    modifiedAt: new Date(),
    createdAt: new Date(),
  },
  {
    id: generateUuid(),
    urlThumbnail: 'https://via.placeholder.com/800x600',
    urlView: `https://en.wikipedia.org/wiki/Report2`,
    title: 'Report #2',
    description: 'This is a description',
    modifiedAt: new Date(),
    createdAt: new Date(),
  },
  {
    id: generateUuid(),
    urlThumbnail: 'https://via.placeholder.com/800x600',
    urlView: `https://en.wikipedia.org/wiki/Report3`,
    title: 'Report #3',
    description: 'This is a description',
    modifiedAt: new Date(),
    createdAt: new Date(),
  },
  {
    id: generateUuid(),
    urlThumbnail: 'https://via.placeholder.com/800x600',
    urlView: `https://en.wikipedia.org/wiki/Report4`,
    title: 'Report #4',
    description: 'This is a description',
    modifiedAt: new Date(),
    createdAt: new Date(),
  },
  {
    id: generateUuid(),
    urlThumbnail: 'https://via.placeholder.com/800x600',
    urlView: `https://en.wikipedia.org/wiki/Report5`,
    title: 'Report #5',
    description: 'This is a description',
    modifiedAt: new Date(),
    createdAt: new Date(),
  },
  {
    id: generateUuid(),
    urlThumbnail: 'https://via.placeholder.com/800x600',
    urlView: `https://en.wikipedia.org/wiki/Report6`,
    title: 'Report #6',
    description: 'This is a description',
    modifiedAt: new Date(),
    createdAt: new Date(),
  },
  {
    id: generateUuid(),
    urlThumbnail: 'https://via.placeholder.com/800x600',
    urlView: `https://en.wikipedia.org/wiki/Report7`,
    title: 'Report #7',
    description: 'This is a description',
    modifiedAt: new Date(),
    createdAt: new Date(),
  },
  {
    id: generateUuid(),
    urlThumbnail: 'https://via.placeholder.com/800x600',
    urlView: `https://en.wikipedia.org/wiki/Report8`,
    title: 'Report #8',
    description: 'This is a description',
    modifiedAt: new Date(),
    createdAt: new Date(),
  },
], reports.entity);

const stub = {
  repository: reports,
  handlers: {
    'GET /reports': baseListStub(reports.entity),
    'POST /reports': baseCreateStub(reports.entity, (record: any) => {
      record.urlThumbnail = 'https://via.placeholder.com/800x600';
      record.urlView = `https://en.wikipedia.org/wiki/${encodeURIComponent(record.title)}`;
      record.urlEdit = `https://en.wikipedia.org/w/index.php?title=${encodeURIComponent(record.title)}&action=history`;
      return record;
    }),
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
