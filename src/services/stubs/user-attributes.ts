import {IAttribute} from '@/services/base/global.interfaces';
import {
  baseBulkStub,
  baseCreateStub, baseDeleteStub,
  baseListLoad,
  baseListStub,
  baseReadStub,
  baseUpdateStub,
  generateUuid, IBulkStubScenarioResponse, stubScenario
} from '@/services/base/stub';
import {EnumValueType} from '@/services/base/global.enums';
import {userAttributes} from '@/services/repositories/user-attributes';

export const UserAttributesList: IAttribute[] = baseListLoad([
  {
    id: generateUuid(),
    key: 'sex',
    name: 'Sex',
    description: 'Either of the two main categories (male and female) into which humans and most other living things are divided on the basis of their reproductive functions.',
    type: EnumValueType.Text,
    modifiedAt: new Date(),
    createdAt: new Date(),
  },
], userAttributes);

const stub = {
  repository: userAttributes,
  recordAssemblyHandler: (item: IAttribute) => {
    return item;
  },
  handlers: {
    'GET /user-attributes': baseListStub(userAttributes),
    'POST /user-attributes': baseCreateStub(userAttributes),
    'GET /user-attributes/:id': baseReadStub(userAttributes),
    'PUT /user-attributes/:id': baseUpdateStub(userAttributes),
    'DELETE /user-attributes/:id': baseDeleteStub(userAttributes),
    'POST /user-attributes/bulk': baseBulkStub(userAttributes, (action: string, indexes: number[], list: any[]): IBulkStubScenarioResponse => {
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
        scenario: stubScenario({}, 400, new Headers({'Message':'$vuetify.errors.unknownBulkAction','Message-Arguments':`${action}###${userAttributes.entity}`}))
      };
    }),
  },
  initialData: UserAttributesList,
};

export const StubUserAttributes = stub;
