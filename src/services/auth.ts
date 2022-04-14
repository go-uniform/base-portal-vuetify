import {mergeHeaders, getBaseUrl, processStandardResponse} from './base';
import {bus} from '@/services/bus';
import {formatString} from '@/plugins/vuetify';

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
let authJwtMeta: object | null = null;

const storeAuthDetails = () => {
    if (window && window.localStorage) {
        if (authToken !== null && authJwt !== null) {
            window.localStorage.setItem('auth.token', authToken);
            window.localStorage.setItem('auth.jwt', authJwt);
        }
    }
}

const loadAuthDetails = () => {
    if (window && window.localStorage) {
        const token = window.localStorage.getItem('auth.token');
        const jwt = window.localStorage.getItem('auth.jwt');
        if (token !== null && token.length > 0 && jwt !== null && jwt.length > 0) {
            authToken = token;
            authJwt = jwt;
        }
    }
}

const clearAuthDetails = () => {
    if (window && window.localStorage) {
        window.localStorage.removeItem('auth.token');
        window.localStorage.removeItem('auth.jwt');
    }
}

loadAuthDetails();

export const auth = {
    isAuthenticated: (): boolean => {
        return authToken != null && authToken.length > 0;
    },
    getToken: (): string | null => {
        return authToken;
    },
    getJwt: (): string | null => {
        return authJwt;
    },
    meta: (): any => {
        if (authJwtMeta !== null) {
            return authJwtMeta;
        }
        if (authJwt !== null && authJwt.length > 0) {
            try {
                authJwtMeta = JSON.parse(atob(authJwt.split('.')[1]));
                if (authJwtMeta !== null) {
                    return authJwtMeta;
                } else {
                    throw 'Failed to parse JWT data';
                }
            } catch (e) {
                console.log(e);
                bus.publish('toast.show', {
                    type: 'error',
                    message: formatString('Unable to decode your token locally, please try to logout and back in again.'),
                })
            }
        }
        return {};
    },

    logout: (): Promise<ITokenResponse> => {
        return new Promise((resolve, reject) => {
            clearAuthDetails();
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

            fetch(`${getBaseUrl()}/auth/logout`, {

                method: 'POST',
                body: JSON.stringify({
                }),
                headers: mergeHeaders({}),

            }).then((response) => {

                // tslint:disable-next-line:no-shadowed-variable
                const tokenWrapper = (resolve: any, value: any): void => {
                    clearAuthDetails();
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

    login: (type: string, identifier: string, password: string, headers: any = {}): Promise<ITokenResponse> => {
        clearAuthDetails();
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
                        storeAuthDetails();
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
        return new Promise((resolve, reject) => {
            if (pin !== '000000') {
                const message = formatString('custom.errors.incorrectOtpPin', []);
                bus.publish('toast.show', {
                    type: 'error',
                    message,
                });
                return;
            }
            authToken = 'e47b6d46-a0b6-446f-a520-86e5fc82b364';
            authJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
            storeAuthDetails();
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
                    storeAuthDetails();
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
