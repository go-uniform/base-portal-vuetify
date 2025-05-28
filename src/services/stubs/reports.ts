import {
  baseCreateStub,
  baseHandlers,
  baseListLoad,
  generateUuid,
} from '@/services/base/stub';
import {Report, reports} from '@/services/repositories/reports';

export const ReportsList: Report[] = baseListLoad([
  {
    id: generateUuid(),
    urlThumbnail: 'https://placehold.co/800x600',
    urlView: `https://en.wikipedia.org/wiki/Report1`,
    urlEdit: `https://en.wikipedia.org/w/index.php?title=Main_course&action=history`,
    title: 'Report #1',
    description: 'This is a description',
    modifiedAt: new Date(),
    createdAt: new Date(),
  },
  {
    id: generateUuid(),
    urlThumbnail: 'https://placehold.co/800x600',
    urlView: `https://en.wikipedia.org/wiki/Report2`,
    title: 'Report #2',
    description: 'This is a description',
    modifiedAt: new Date(),
    createdAt: new Date(),
  },
  {
    id: generateUuid(),
    urlThumbnail: 'https://placehold.co/800x600',
    urlView: `https://en.wikipedia.org/wiki/Report3`,
    title: 'Report #3',
    description: 'This is a description',
    modifiedAt: new Date(),
    createdAt: new Date(),
  },
  {
    id: generateUuid(),
    urlThumbnail: 'https://placehold.co/800x600',
    urlView: `https://en.wikipedia.org/wiki/Report4`,
    title: 'Report #4',
    description: 'This is a description',
    modifiedAt: new Date(),
    createdAt: new Date(),
  },
  {
    id: generateUuid(),
    urlThumbnail: 'https://placehold.co/800x600',
    urlView: `https://en.wikipedia.org/wiki/Report5`,
    title: 'Report #5',
    description: 'This is a description',
    modifiedAt: new Date(),
    createdAt: new Date(),
  },
  {
    id: generateUuid(),
    urlThumbnail: 'https://placehold.co/800x600',
    urlView: `https://en.wikipedia.org/wiki/Report6`,
    title: 'Report #6',
    description: 'This is a description',
    modifiedAt: new Date(),
    createdAt: new Date(),
  },
  {
    id: generateUuid(),
    urlThumbnail: 'https://placehold.co/800x600',
    urlView: `https://en.wikipedia.org/wiki/Report7`,
    title: 'Report #7',
    description: 'This is a description',
    modifiedAt: new Date(),
    createdAt: new Date(),
  },
  {
    id: generateUuid(),
    urlThumbnail: 'https://placehold.co/800x600',
    urlView: `https://en.wikipedia.org/wiki/Report8`,
    title: 'Report #8',
    description: 'This is a description',
    modifiedAt: new Date(),
    createdAt: new Date(),
  },
], reports);

const handlers = baseHandlers(reports);
handlers['POST /reports'] = baseCreateStub(reports, (record: any) => {
  record.urlThumbnail = 'https://placehold.co/800x600';
  record.urlView = `https://en.wikipedia.org/wiki/${encodeURIComponent(record.title)}`;
  record.urlEdit = `https://en.wikipedia.org/w/index.php?title=${encodeURIComponent(record.title)}&action=history`;
  return record;
});

const stub = {
  repository: reports,
  handlers: baseHandlers(reports),
  initialData: ReportsList,
};

export const StubReports = stub;
