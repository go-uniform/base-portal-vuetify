import {mergeHeaders, getBaseUrl, processStandardResponse} from './base';
import {bus} from '@/services/bus';
import {__} from '@/plugins/vuetify';

interface Token {
    twoFactor: boolean;
    otpRequestId: string | null;
    otp: string | null; // only populated in development, testing and demo environments to reduce sms/email costs/delays
    token: string | null;
    jwt: string | null;
}

interface ITokenResponse {
    status: number;
    headers: Headers;
    token: Token;
}
let authToken: string | null = null;
let authJwt: string | null = null;

export const auth = {
    getToken: (): string | null => {
        return authToken;
    },
    getJwt: (): string | null => {
        return authJwt;
    },

    login: (type: string, identifier: string, password: string, headers: any = {}): Promise<ITokenResponse> => {
        // @ts-ignore
        return new Promise((resolve, reject) => {
            resolve({
                status: 200,
                headers: new Headers(),
                token: {
                    twoFactor: true,
                    otpRequestId: 'xyz123',
                    otp: '000000',
                    token: null,
                    jwt: null,
                },
            });
            return;

            fetch(`${getBaseUrl()}/auth/login`, {

                method: 'POST',
                body: JSON.stringify({
                    type,
                    identifier,
                    password,
                }),
                headers: mergeHeaders(headers),

            }).then((response) => {

                // tslint:disable-next-line:no-shadowed-variable
                const tokenWrapper = (resolve: any, value: any): void => {
                    if (!value.item.twoFactor && value.item.token) {
                        authToken = value.item.token;
                        authJwt = value.item.jwt;
                    }
                    resolve({
                        status: value.status,
                        headers: value.headers,
                        token: value.item,
                    });
                };
                processStandardResponse(response, tokenWrapper, reject);

            }).catch((reason) => {

                reject(reason);

            });
        });
    },

    otp: (otpRequestId: string, pin: string, headers: any = {}): Promise<ITokenResponse> => {
        // @ts-ignore
        return new Promise((resolve, reject) => {
            if (pin !== '000000') {
                const message = __('Incorrect pin supplied', []);
                bus.publish('toast.show', {
                    type: 'error',
                    message,
                });
                return;
            }
            authToken = 'e47b6d46-a0b6-446f-a520-86e5fc82b364';
            authJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
            resolve({
                status: 200,
                headers: new Headers(),
                token: {
                    twoFactor: false,
                    otpRequestId: 'xyz123',
                    otp: '000000',
                    token: authToken,
                    jwt: authJwt,
                },
            });
            return;

            fetch(`${getBaseUrl()}/auth/login/otp`, {

                method: 'POST',
                body: JSON.stringify({
                    otpRequestId,
                    pin,
                }),
                headers: mergeHeaders(headers),

            }).then((response) => {

                // tslint:disable-next-line:no-shadowed-variable
                const tokenWrapper = (resolve: any, value: any): void => {
                    authToken = value.item.token;
                    authJwt = value.item.jwt;
                    resolve({
                        status: value.status,
                        headers: value.headers,
                        token: value.item,
                    });
                };
                processStandardResponse(response, tokenWrapper, reject);

            }).catch((reason) => {

                reject(reason);

            });
        });
    },
};
