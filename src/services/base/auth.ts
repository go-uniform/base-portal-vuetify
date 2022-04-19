import {toastError} from '@/plugins/vuetify';
import {IAuthRepository, IItem} from '@/services/base/global.interfaces';
import {EnumHttpMethod} from '@/services/base/global.enums';
import {baseRestItemStub, stubScenario} from '@/services/base/stub';
import {AuthToken, AuthTokenJwt} from '@/services/base/global.types';

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

export const auth: IAuthRepository =  {
    isAuthenticated: (): boolean => {
        return authToken != null && authToken.length > 0;
    },
    getToken: (): string | null => {
        return authToken;
    },
    getJwt: (): string | null => {
        return authJwt;
    },
    meta: (): object => {
        if (authJwtMeta !== null) {
            return authJwtMeta;
        }
        if (authJwt !== null && authJwt.length > 0) {
            try {
                authJwtMeta = JSON.parse(atob(authJwt.split('.')[1]));
                if (authJwtMeta !== null) {
                    return authJwtMeta;
                }
            } catch (e) {
                console.log(e);
                toastError('Unable to decode your token locally, please try to logout and back in again.');
            }
        }
        return {};
    },

    logout: () => {
        return baseRestItemStub<null>(stubScenario({}), () => {
            clearAuthDetails();
            return true;
        }, null, EnumHttpMethod.Post, 'auth/logout');
    },

    login: (type: string, identifier: string, password: string, headers: Headers = new Headers()) => {
        return baseRestItemStub<AuthToken>(stubScenario({
            twoFactor: true,
            otpRequestId: 'xyz123',
            otp: '000000',
        }), (value: IItem<AuthToken>) => {
            const jwtToken = (value.item as AuthTokenJwt);
            if (jwtToken) {
                authToken = jwtToken.token;
                authJwt = jwtToken.jwt;
                storeAuthDetails();
            }
            return true;
        }, null, EnumHttpMethod.Post, 'auth/login', {
            type,
            identifier,
            password,
        }, headers);
    },

    otp: (otpRequestId: string, pin: string, headers: Headers = new Headers()) => {
        return baseRestItemStub<AuthTokenJwt>(stubScenario({
            token: 'e47b6d46-a0b6-446f-a520-86e5fc82b364',
            jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        }), (value: IItem<AuthTokenJwt>) => {
            if (pin !== '000000') {
                toastError('base.errors.incorrectOtpPin', []);
                return false;
            }
            authToken = value.item.token;
            authJwt = value.item.jwt;
            storeAuthDetails();
            return true;
        }, null, EnumHttpMethod.Post, 'auth/login/otp', {
            otpRequestId,
            pin,
        }, headers);
    },
};
