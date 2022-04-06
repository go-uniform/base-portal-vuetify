import {mergeHeaders, getBaseUrl, processStandardResponse} from "./base";

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

    login: (type, identifier, password, headers = {}): Promise<ITokenResponse> => {
        // @ts-ignore
        return new Promise((resolve, reject) => {
            fetch(`${getBaseUrl()}/auth/login`, {

                method: 'POST',
                body: JSON.stringify({
                    'type': type,
                    'identifier': identifier,
                    'password': password,
                }),
                headers: mergeHeaders(headers)

            }).then((response) => {

                const tokenWrapper = (resolve, value): void => {
                    if (!value.item.twoFactor && value.item.token) {
                        authToken = value.item.token;
                        authJwt = value.item.jwt;
                    }
                    resolve({
                        status: value.status,
                        headers: value.headers,
                        token: value.item,
                    })
                }
                processStandardResponse(response, tokenWrapper, reject)

            }).catch((reason) => {

                reject(reason);

            });
        });
    },

    otp: (otpRequestId, pin, headers = {}): Promise<ITokenResponse> => {
        // @ts-ignore
        return new Promise((resolve, reject) => {
            fetch(`${getBaseUrl()}/auth/login/otp`, {

                method: 'POST',
                body: JSON.stringify({
                    'otpRequestId': otpRequestId,
                    'pin': pin,
                }),
                headers: mergeHeaders(headers)

            }).then((response) => {

                const tokenWrapper = (resolve, value): void => {
                    authToken = value.item.token;
                    authJwt = value.item.jwt;
                    resolve({
                        status: value.status,
                        headers: value.headers,
                        token: value.item,
                    })
                }
                processStandardResponse(response, tokenWrapper, reject)

            }).catch((reason) => {

                reject(reason);

            });
        });
    }
}