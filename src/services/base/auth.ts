import {toastError} from '@/plugins/base/vuetify';
import {IAuthRepository, IItem} from '@/services/base/global.interfaces';
import {EnumHttpMethod} from '@/services/base/global.enums';
import {baseRestItemStub, generateFakeJwt, stubScenario} from '@/services/base/stub';
import {AuthToken, AuthTokenJwt} from '@/services/base/global.types';
import {UsersList} from '@/services/stubs/users';
import {baseRestItem} from '@/services/base/base';

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
        if (
            authToken != null && authToken.length <= 0
            || authJwt != null && authJwt.length <= 0
        )
        {
            toastError('$vuetify.errors.corruptedAuthenticationToken');
            return false;
        }
        return authToken != null && authToken.length > 0;
    },
    getToken: (): string | null => {
        auth.isAuthenticated();
        return authToken;
    },
    getJwt: (): string | null => {
        auth.isAuthenticated();
        return authJwt;
    },
    meta: (): object => {
        if (!auth.isAuthenticated()) {
            toastError('Unable to decode your token locally, please try to logout and back in again.');
        }
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
        return baseRestItem<null>(() => {
            clearAuthDetails();
            return true;
        }, null, EnumHttpMethod.Post, 'auth/logout');
    },

    login: (type: string, identifier: string, password: string, headers: Headers = new Headers()) => {
        return baseRestItem<AuthToken>((value: IItem<AuthToken>) => {
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
        return baseRestItem<AuthTokenJwt>((value: IItem<AuthTokenJwt>) => {
            authToken = value.item.token;
            authJwt = value.item.jwt;
            storeAuthDetails();
            return true;
        }, null, EnumHttpMethod.Post, 'auth/login/otp', {
            otpRequestId,
            pin,
        }, headers);
    },

    resendOtp: (otpRequestId: string, headers: Headers = new Headers()) => {
        return baseRestItem<AuthTokenJwt>(null, null, EnumHttpMethod.Post, 'auth/login/resend-otp', {
            otpRequestId,
        }, headers);
    },
};
