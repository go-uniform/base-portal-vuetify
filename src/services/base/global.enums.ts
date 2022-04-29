export enum EnumHttpMethod {
  Post = 'POST',
  Get = 'GET',
  Delete = 'DELETE',
  Put = 'PUT',
  Patch = 'PATCH',
  Restore = 'RESTORE',
  Options = 'OPTIONS',
}

export enum EnumFieldType {
  Link = 'link',
  SelfReference = 'self-reference',
  Uuid = 'uuid',
  Text = 'text',
  TextArea = 'textarea',
  Boolean = 'boolean',
  DateTime = 'datetime',
  Attributes = 'attributes',
  Enumeration = 'enumeration',
}

export enum EnumHeaderAlign {
  Start = 'start',
  Center = 'center',
  End = 'end',
}

export enum EnumAttributeType {
  Text = "text",
  Enumeration = 'enumeration',
}
