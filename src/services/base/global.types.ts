export type generic = object | object[] | null;

export interface AuthTokenJwt {
  token: string | null;
  jwt: string | null;
}

export interface AuthTokenTwoFactorRedirect {
  twoFactor: boolean;
  otpRequestId: string;
  otp?: string; // only populated in development, testing and demo environments to reduce sms/email costs/delays
}

export type AuthToken = AuthTokenJwt | AuthTokenTwoFactorRedirect;

export type Attributes = { [key: string]: any };

export interface Link {
  id: string;
  label: string;
}
