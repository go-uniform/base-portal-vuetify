import {AuthToken, AuthTokenJwt, generic} from './global.types';
import {EnumHeaderAlign, EnumValueType} from '@/services/base/global.enums';
import {baseCreate, baseDelete, baseList, baseRead, baseUpdate} from '@/services/base/entity.crud';
import {baseBulk} from '@/services/base/entity.bulk';
import {camelize} from '@/plugins/base/vuetify';

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

export interface IResendOtpPromise {
  (otpRequestId: string, headers?: Headers): Promise<IItem<any>>;
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
  title?: string;
  icon?: string;
  color?: string;
}
export type IEnumQuick = IEnum | string;

export interface IFieldNormal {
  label?: string;
  type: EnumValueType;
  optional?: boolean;
  readonly?: boolean;
  filterable?: boolean;
  pattern?: RegExp;
  patternMessage?: string;
  hint?: string;
  meta: any;
}

export interface IFieldEnum {
  label?: string;
  type: EnumValueType;
  optional?: boolean;
  readonly?: boolean;
  filterable?: boolean;
  defaultValue: string;
  values: IEnumQuick[];
  textOnly?: boolean;
  iconOnly?: boolean;
  hint?: string;
  multiple?: boolean;
}

export interface IFieldBoolean {
  label?: string;
  type: EnumValueType;
  optional?: boolean;
  readonly?: boolean;
  filterable?: boolean;
  hint?: string;
  inverted?: boolean;
  textOnly?: boolean;
  iconOnly?: boolean;
}

export interface IFieldLink {
  label?: string;
  type: EnumValueType;
  optional?: boolean;
  readonly?: boolean;
  filterable?: boolean;
  linkLabelFieldKey: string;
  linkRepository: IRepository<any>;
  textAssemblyCallback: (item: any) => string;
  hint?: string;
  multiple?: boolean;
}

export interface ISelfReference {
  label?: string;
  type: EnumValueType;
  optional?: boolean;
  readonly?: boolean;
  filterable?: boolean;
  selfReferenceLabelFieldKey: string;
  textAssemblyCallback: (item: any) => string;
  hint?: string;
  multiple?: boolean;
}

export interface IFieldAttribute {
  label?: string;
  type: EnumValueType;
  attributeRepository: IRepository<any>;
  hint?: string;
  meta: any;
}

export type IField = IFieldNormal | IFieldEnum | IFieldBoolean | IFieldLink | IFieldAttribute | ISelfReference;

export type CalendarTypes = 'start' | 'end' | 'name';

export type CalendarCallback = (item: any) => string;

export interface ICalendarField {
  type: CalendarTypes;
  displayCallback: CalendarCallback;
}

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
export type IHeaderQuick = IHeader | string;

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
  slug: string;
  title: IRepositoryTitle;
  defaultSortOrder: string;
  listPage: string;
  addPage: string;
  viewPage: string;
  editPage: string;
  default?: object;
  fields: IFields;
  headers: IHeader[];
  sections: ISection[];
  calendarFields: ICalendarField[];
  bulkActions?: IBulkActionButton[];

  list?: IListPromise<T>;
  create?: ICreatePromise<T>;
  read?: IReadPromise<T>;
  update?: IUpdatePromise<T>;
  delete?: IDeletePromise<T>;
  bulk?: IBulkPromise;
}

export class Repository<T> implements  IRepository<T> {
  disableCreation?: boolean;
  freeTextSearch?: boolean;
  entity: string;
  slug: string;
  title: IRepositoryTitle;
  defaultSortOrder: string;
  listPage: string;
  addPage: string;
  viewPage: string;
  editPage: string;
  default?: object;
  fields: IFields;
  headers: IHeader[];
  sections: ISection[];
  calendarFields: ICalendarField[];
  bulkActions?: IBulkActionButton[];

  list?: IListPromise<T>;
  create?: ICreatePromise<T>;
  read?: IReadPromise<T>;
  update?: IUpdatePromise<T>;
  delete?: IDeletePromise<T>;
  bulk?: IBulkPromise;

  constructor(slug: string, defaultValue: object, options: any) {
    this.slug = slug;
    this.entity = camelize(slug);
    this.title = {
      singular: `$vuetify.${this.entity}.singular`,
      plural: `$vuetify.${this.entity}.plural`,
    };
    this.freeTextSearch = options.freeTextSearch ?? true;
    this.disableCreation = options.disableCreation ?? false;
    this.listPage = options.listPage ?? `/${slug}`;
    this.addPage = options.addPage ?? `/${slug}/add`;
    this.viewPage = options.viewPage ?? `/${slug}/view/{0}`;
    this.editPage = options.editPage ?? `/${slug}/edit/{0}`;
    this.defaultSortOrder = options.defaultSortOrder ?? '-createdAt';
    this.default = defaultValue;
    this.fields = {
      id: {
        label: `$vuetify.${this.entity}.fields.id`,
        type: EnumValueType.Uuid,
        readonly: true,
      },
      modifiedAt: {
        label: `$vuetify.${this.entity}.fields.modifiedAt`,
        type: EnumValueType.DateTime,
        filterable: options.modifiedAtFilterable ?? false,
        readonly: true,
      },
      createdAt: {
        label: `$vuetify.${this.entity}.fields.createdAt`,
        type: EnumValueType.DateTime,
        filterable: options.createdAtFilterable ?? true,
        readonly: true,
      },
    };
    this.headers = [];
    this.sections = [];
    this.calendarFields = [];

    this.list = baseList<T>(slug);
    this.create = baseCreate<T>(slug);
    this.read = baseRead<T>(slug);
    this.update = baseUpdate<T>(slug);
    this.delete = baseDelete<T>(slug);
    this.bulk = baseBulk(slug);
  }

  setHeaders(headers: IHeaderQuick[]) {
    const normalizedHeaders: IHeader[] = [];
    headers.forEach((header) => {
      if (typeof header === 'string') {
        normalizedHeaders.push({
          fieldKey: header,
        });
      } else {
        normalizedHeaders.push(header as IHeader);
      }
    });
    this.headers = normalizedHeaders;
  }

  setCalendarFields(fields: ICalendarField[]) {
    const calendarFields: ICalendarField[] = [];
    fields.forEach((field) => {
      calendarFields.push(field as ICalendarField);
    });
    this.calendarFields = calendarFields;
  }

  addField(key: string, field: IField) {
    if (field.label === null || field.label === undefined || field.label.trim() === '') {
      field.label = `$vuetify.${this.entity}.fields.${key}`;
    }

    const enumField = (field as IFieldEnum);
    if (enumField && enumField.type === EnumValueType.Enumeration && enumField.values) {
      const normalizedValues: IEnum[] = [];
      enumField.values.forEach((value) => {
        let enumValue: string;
        if (typeof value === 'string') {
          enumValue = value;
        } else {
          const item = (value as IEnum);
          enumValue = item.value;
        }
        let title = `$vuetify.${this.entity}.enums.${key}.${enumValue}.title`;
        let icon = `$vuetify.${this.entity}.enums.${key}.${enumValue}.icon`;
        let color = `$vuetify.${this.entity}.enums.${key}.${enumValue}.color`;
        if (typeof value !== 'string') {
          const item = (value as IEnum);
          enumValue = item.value;
          if (!(item.title === null || item.title === undefined || item.title.trim() === '')) {
            title = item.title;
          }
          if (!(item.icon === null || item.icon === undefined || item.icon.trim() === '')) {
            icon = item.icon;
          }
          if (!(item.color === null || item.color === undefined || item.color.trim() === '')) {
            color = item.color;
          }
        }
        normalizedValues.push({
          value: enumValue,
          title: title,
          icon: icon,
          color: color,
        });
        enumField.values = normalizedValues;

        if (enumField.filterable === undefined || enumField.filterable === null) {
          enumField.filterable = true;
        }

        if (enumField.textOnly === undefined || enumField.textOnly === null) {
          enumField.textOnly = true;
        }
      });
    }

    const boolField = (field as IFieldBoolean);
    if (boolField && boolField.type === EnumValueType.Boolean) {
      if (boolField.optional === undefined || boolField.optional === null) {
        boolField.optional = false;
      }
      if (boolField.iconOnly === undefined || boolField.iconOnly === null && boolField.textOnly === undefined || boolField.textOnly === null) {
        boolField.iconOnly = true;
      }
      if (boolField.filterable === undefined || boolField.filterable === null) {
        boolField.filterable = true;
      }
    }

    if (field.type === EnumValueType.TextArea) {
      const normalField = (field as IFieldNormal);
      if (normalField.optional === undefined || normalField.optional === null) {
        normalField.optional = true;
      }
    }

    const selfReferenceField = (field as ISelfReference);
    if (selfReferenceField && selfReferenceField.type === EnumValueType.SelfReference) {
      if (boolField.optional === undefined || boolField.optional === null) {
        boolField.optional = true;
      }
    }

    this.fields[key] = field;
  }

  addSection(section: ISection) {
    this.sections.push(section);
  }
}

export interface IAuthRepository {
  isAuthenticated(): boolean;

  getToken(): string | null;

  getJwt(): string | null;

  meta(): object;

  logout: ILogoutPromise;
  login: ILoginPromise;
  otp: IOtpPromise;
  resendOtp: IResendOtpPromise;
}

export interface IAttribute {
  id: string;
  key: string;
  name: string;
  description?: string;
  type: EnumValueType;
  modifiedAt: Date;
  createdAt: Date;
}
