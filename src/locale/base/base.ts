export const extend = (base: any, custom: any): any => {
  const keys: string[] = [];

  if (typeof base === 'object') {
    Object.keys(base).forEach((key) => {
      keys.push(key);
    });
  }
  if (typeof custom === 'object') {
    Object.keys(custom).forEach((key) => {
      keys.push(key);
    });
  }

  if (keys.length > 0) {
    const extended: any = {};
    keys.forEach((key) => {
      if (base[key] && !custom[key]) {
        extended[key] = base[key];
      } else if (!base[key] && custom[key]) {
        extended[key] = custom[key];
      } else {
        extended[key] = extend(base[key], custom[key]);
      }
    });
    return extended;
  }

  return custom || base;
}
