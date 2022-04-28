import {IAttribute} from '@/services/base/global.interfaces';
import {baseListLoad, baseListStub, generateUuid} from '@/services/base/stub';
import {EnumAttributeType} from '@/services/base/global.enums';
import {userAttributes} from '@/services/repositories/user-attributes';

export const UserAttributesList: IAttribute[] = baseListLoad([
  {
    id: generateUuid(),
    key: 'sex',
    name: 'Sex',
    description: 'Either of the two main categories (male and female) into which humans and most other living things are divided on the basis of their reproductive functions.',
    type: EnumAttributeType.Text,
    modifiedAt: new Date(),
    createdAt: new Date(),
  },
], userAttributes.entity);

const stub = {
  repository: userAttributes,
  recordAssemblyHandler: (item: IAttribute) => {
    return item;
  },
  handlers: {
    'GET /user-attributes': baseListStub(userAttributes.entity, null),
  },
  initialData: UserAttributesList,
};

export const StubUserAttributes = stub;
