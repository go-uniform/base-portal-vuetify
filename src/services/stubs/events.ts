import {
  baseHandlers,
  baseListLoad,
  generateUuid
} from '@/services/base/stub';
import {Event, events} from '@/services/repositories/events';

function today(hours: number, min: number) {
  const date = new Date();
  date.setHours(hours, min, 0, 0);
  return date;
}

export const EventsList: Event[] = baseListLoad([
  {
    id: generateUuid(),
    title: 'Wallow in self pity',
    startAt: today(13, 0),
    endAt: today(16, 30),
    modifiedAt: new Date(),
    createdAt: new Date(),
  },
  {
    id: generateUuid(),
    title: 'Stare into the abyss',
    startAt: today(16, 30),
    endAt: today(17, 0),
    modifiedAt: new Date(),
    createdAt: new Date(),
  },
  {
    id: generateUuid(),
    title: 'Solve world hunger; Tell no one',
    startAt: today(17, 0),
    endAt: today(17, 30),
    modifiedAt: new Date(),
    createdAt: new Date(),
  },
  {
    id: generateUuid(),
    title: 'Jazz-ercise',
    startAt: today(17, 30),
    endAt: today(18, 30),
    modifiedAt: new Date(),
    createdAt: new Date(),
  },
  {
    id: generateUuid(),
    title: 'Dinner with me',
    startAt: today(18, 30),
    endAt: today(19, 0),
    modifiedAt: new Date(),
    createdAt: new Date(),
  },
  {
    id: generateUuid(),
    title: 'Wrestle with my self-loathing',
    startAt: today(19, 0),
    endAt: today(21, 0),
    modifiedAt: new Date(),
    createdAt: new Date(),
  },
  {
    id: generateUuid(),
    title: 'Slip slowly into madness',
    description: 'Lay in bed and stare at the ceiling and slip slowly into madness',
    startAt: today(21, 0),
    endAt: today(22, 0),
    modifiedAt: new Date(),
    createdAt: new Date(),
  },
], events);

const stub = {
  repository: events,
  handlers: baseHandlers(events),
  initialData: EventsList,
};

export const StubEvents = stub;
