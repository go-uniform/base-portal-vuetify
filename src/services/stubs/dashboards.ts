import {
  baseCreateStub,
  baseHandlers,
  baseListLoad,
  generateUuid,
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
], dashboards);

const handlers = baseHandlers(dashboards);
handlers['POST /dashboards'] = baseCreateStub(dashboards, (record: any) => {
  record.urlView = `https://en.wikipedia.org/wiki/${encodeURIComponent(record.title)}`;
  record.urlEdit = `https://en.wikipedia.org/w/index.php?title=${encodeURIComponent(record.title)}&action=history`;
  return record;
});

const stub = {
  repository: dashboards,
  handlers: handlers,
  initialData: DashboardsList,
};

export const StubDashboards = stub;
