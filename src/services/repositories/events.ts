import {Repository} from '@/services/base/global.interfaces';
import {EnumValueType, EnumHeaderAlign} from '@/services/base/global.enums';
import {Section} from '@/services/base/global.classes.section';

const entity = 'events';
const slug = 'events';

export interface Event {
  id: string;
  title: string;
  description?: string;
  startAt: Date;
  endAt: Date;
  modifiedAt: Date;
  createdAt: Date;
}

const repository = new Repository<Event>(slug, {}, {});

repository.addField('title', {
  type: EnumValueType.Text,
});
repository.addField('description', {
  type: EnumValueType.TextArea,
});
repository.addField('startAt', {
  type: EnumValueType.DateTime,
  filterable: true,
});
repository.addField('endAt', {
  type: EnumValueType.DateTime,
  filterable: true,
});

repository.setHeaders([
  'title',
  'startAt',
  'endAt',
  {
    fieldKey: 'createdAt',
    align: EnumHeaderAlign.End,
  },
]);

repository.addSection(
  new Section(`$vuetify.${entity}.sections.general`, [
    'title',
    'description',
    'startAt',
    'endAt',
    'modifiedAt',
    'createdAt',
  ])
);

repository.bulkActions = [
  {
    color: 'error',
    icon: 'mdi-delete',
    title: '$vuetify.entityList.delete',
    key: 'delete'
  }
];

repository.setCalendarFields([
  {
    type: "start",
    displayCallback: (item) => {
      return `${item.startAt}`;
    },
  },
  {
    type: "end",
    displayCallback: (item) => {
      return `${item.endAt}`;
    },
  },
  {
    type: "name",
    displayCallback: (item) => {
      return `${item.title}`;
    },
  },
])

export const events = repository;
