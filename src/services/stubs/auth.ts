import {baseRestItemStub, generateFakeJwt, stubScenario} from '@/services/base/stub';
import {UsersList} from '@/services/stubs/users';

const stub = {
  handlers: {
    'POST /auth/logout': baseRestItemStub<null>('auth', (input: string, init: RequestInit, resolve: any, reject: any) => {
      resolve(stubScenario({}))
    }),
    'POST /auth/login': baseRestItemStub<null>('auth', (input: string, init: RequestInit, resolve: any, reject: any) => {
      let scenario = stubScenario({}, 500, new Headers({
        'Message': '$vuetify.errors.general'
      }));

      let body: any = null;
      if (init && init.body) {
        body = JSON.parse(init.body.toString());
      }

      if (body) {
        scenario = stubScenario({}, 401, new Headers({
          'Message': '$vuetify.errors.accountDoesNotExist'
        }));

        let list: any = [];
        let findHandler = (item: any) => {
          return false;
        }
        switch (body.type) {
          case 'user':
            list = UsersList;
            findHandler = (item: any) => {
              return item.username === body.identifier || item.email === body.identifier;
            }
            break
        }

        const index = list.findIndex(findHandler);
        if (index >= 0) {
          const user = UsersList[index];
          if (user.password !== body.password) {
            scenario = stubScenario({}, 401, new Headers({
              'Message': '$vuetify.errors.invalidCredentials'
            }));
          } else {
            scenario = stubScenario({
              twoFactor: true,
              otpRequestId: index,
              otp: '000000',
            });
          }
        }
      }

      resolve(scenario);
    }),
    'POST /auth/login/otp': baseRestItemStub<null>('auth', (input: string, init: RequestInit, resolve: any, reject: any) => {
      let scenario = stubScenario({}, 500, new Headers({
        'Message': '$vuetify.errors.general'
      }));

      let body: any = null;
      if (init && init.body) {
        body = JSON.parse(init.body.toString());
      }

      if (body) {
        if (body.pin !== '000000') {
          scenario = stubScenario({}, 500, new Headers({
            'Message': '$vuetify.errors.incorrectOtpPin'
          }));
          resolve(scenario)
          return
        }

        scenario = stubScenario({}, 404, new Headers({
          'Message': '$vuetify.errors.recordNotFound'
        }));
        const user = UsersList[parseInt(body.otpRequestId)]
        if (user) {
          const jwt = generateFakeJwt({
            "name": `${user.firstName} ${user.lastName}`,
            "sub": user.id,
          });
          scenario = stubScenario({
            token: 'e47b6d46-a0b6-446f-a520-86e5fc82b364',
            jwt: jwt,
          });
        }
      }

      resolve(scenario)
    }),
    'POST /auth/login/resend-otp': baseRestItemStub<null>('auth', (input: string, init: RequestInit, resolve: any, reject: any) => {
      alert('server would send a new code but since you are in stub mode just use 000000 as your code');
      resolve(stubScenario({}))
    }),
  },
};

export const StubAuth = stub;
