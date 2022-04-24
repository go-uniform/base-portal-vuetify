import {AuthToken, AuthTokenJwt, generic} from './global.types';
import {EnumAttributeType, EnumFieldType, EnumHeaderAlign} from '@/services/base/global.enums';
import {toastError} from '@/plugins/vuetify';

export interface IError {
  status: number;
  headers: Headers;
  message: string | null;
  body: object | object[] | null;
}

export interface IErrorResponse {
  (error: IError): void;
}

export interface IList<T> {
  status: number;
  headers: Headers;
  items: T[];
}

export interface IListResponse<T> {
  (response: IList<T>): void;
}

export interface IItem<T> {
  status: number;
  headers: Headers;
  item: T;
}

export interface IItemResponse<T> {
  (response: IItem<T>): void;
}

export type IGeneric<T> = IList<T> | IItem<T>;

export interface IResponse<T> {
  (value: IGeneric<T>): void;
}

export interface ILogoutPromise {
  (): Promise<IItem<null>>;
}

export interface ILoginPromise {
  (type: string, identifier: string, password: string, headers: Headers): Promise<IItem<AuthToken>>;
}

export interface IOtpPromise {
  (otpRequestId: string, pin: string, headers?: Headers): Promise<IItem<AuthTokenJwt>>;
}

export interface IListPromise<T> {
  (
    order: string,
    filters: object,
    pageIndex: number,
    pageSize: number,
  ): Promise<IList<T>>;
}

export interface ICreatePromise<T> {
  (
    document: T,
  ): Promise<IItem<T>>;
}

export interface IReadPromise<T> {
  (
    id: string,
  ): Promise<IItem<T>>;
}

export interface IUpdatePromise<T> {
  (
    id: string,
    document: T,
  ): Promise<IItem<T>>;
}

export interface IDeletePromise<T> {
  (
    id: string,
  ): Promise<IItem<T>>;
}

export interface IBulkPromise {
  (
    action: string,
    ids: string[]
  ): Promise<IGeneric<generic>>;
}

export interface IEnum {
  value: string;
  title: string;
  icon?: string;
  color?: string;
}

export interface IFieldNormal {
  label: string;
  type: EnumFieldType;
  optional?: boolean;
  readonly?: boolean;
  filterable?: boolean;
  pattern?: RegExp;
  patternMessage?: string;
  hint?: string;
}

export interface IFieldEnum {
  label: string;
  type: EnumFieldType;
  optional?: boolean;
  readonly?: boolean;
  filterable?: boolean;
  defaultValue: string;
  values?: IEnum[];
  textOnly?: boolean;
  iconOnly?: boolean;
  hint?: string;
  multiple?: boolean;
}

export interface IFieldBoolean {
  label: string;
  type: EnumFieldType;
  optional?: boolean;
  readonly?: boolean;
  filterable?: boolean;
  hint?: string;
  inverted?: boolean;
  textOnly?: boolean;
  iconOnly?: boolean;
}

export interface IFieldLinkId {
  label: string;
  type: EnumFieldType;
  optional?: boolean;
  readonly?: boolean;
  filterable?: boolean;
  linkLabelFieldKey: string;
  linkRepository: IRepository<any>;
  textAssemblyCallback: (item: any) => string;
  hint?: string;
  multiple?: boolean;
}

export interface IFieldLinkLabel {
  label: string;
  type: EnumFieldType;
  optional?: boolean;
  readonly?: boolean;
  filterable?: boolean;
  linkIdFieldKey: string;
  hint?: string;
  multiple?: boolean;
}

export interface ISelfReferenceId {
  label: string;
  type: EnumFieldType;
  optional?: boolean;
  readonly?: boolean;
  filterable?: boolean;
  selfReferenceLabelFieldKey: string;
  textAssemblyCallback: (item: any) => string;
  hint?: string;
  multiple?: boolean;
}

export interface ISelfReferenceLabel {
  label: string;
  type: EnumFieldType;
  optional?: boolean;
  readonly?: boolean;
  filterable?: boolean;
  selfReferenceIdFieldKey: string;
  hint?: string;
  multiple?: boolean;
}

export interface IFieldAttribute {
  label: string;
  type: EnumFieldType;
  attributeRepository: IRepository<any>;
  hint?: string;
}

export type IField = IFieldNormal | IFieldEnum | IFieldBoolean | IFieldLinkId | IFieldLinkLabel | IFieldAttribute | ISelfReferenceId | ISelfReferenceLabel;

export type IFields = { [key: string]: IField }

export type HeaderCallback = (item: any) => string;

export interface IHeaderCustom {
  title: string;
  align?: EnumHeaderAlign;
  sortable?: boolean;
  filterable?: boolean;
  class?: string | string[];
  displayText?: string;
  displayCallback?: HeaderCallback;
}

export interface IHeaderLinked {
  title?: string;
  fieldKey: string;
  align?: EnumHeaderAlign;
  sortable?: boolean;
  filterable?: boolean;
  class?: string | string[];
}

export type IHeader = IHeaderCustom | IHeaderLinked;

export interface ISection {
  title: string;
  fieldKeys: string[];
  cols?: number;
  xl?: number;
  lg?: number;
  md?: number;
  sm?: number;
  xs?: number;
  childCols?: number;
  childXl?: number;
  childLg?: number;
  childMd?: number;
  childSm?: number;
  childXs?: number;

  getCols: () => number;
  getXl: () => number;
  getLg: () => number;
  getMd: () => number;
  getSm: () => number;
  getXs: () => number;
  getChildCols: () => number;
  getChildXl: () => number;
  getChildLg: () => number;
  getChildMd: () => number;
  getChildSm: () => number;
  getChildXs: () => number;
}

export interface IBulkActionButton {
  color?: string;
  icon?: string;
  key: string;
  title: string;
}

export interface IRepositoryTitle {
  singular: string;
  plural: string;
}

export interface IRepository<T> {
  disableCreation?: boolean;
  freeTextSearch?: boolean;
  entity: string;
  title: IRepositoryTitle;
  defaultSortOrder: string;
  listPage: string;
  addPage: string;
  viewPagePrefix: string;
  editPagePrefix: string;
  default?: object;
  fields: IFields;
  headers: IHeader[];
  sections: ISection[];
  bulkActions?: IBulkActionButton[];

  list?: IListPromise<T>;
  create?: ICreatePromise<T>;
  read?: IReadPromise<T>;
  update?: IUpdatePromise<T>;
  delete?: IDeletePromise<T>;
  bulk?: IBulkPromise;
}

export interface IAuthRepository {
  isAuthenticated(): boolean;

  getToken(): string | null;

  getJwt(): string | null;

  meta(): object;

  logout: ILogoutPromise;
  login: ILoginPromise;
  otp: IOtpPromise;
}

export interface IAttribute {
  id: string;
  key: string;
  name: string;
  description?: string;
  type: EnumAttributeType;
  modifiedAt: Date;
  createdAt: Date;
}
