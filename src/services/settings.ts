let store: any | null = null;

export const settings = {
  store: () => {
    // todo: load, flatten and cache settings
    return store;
  },
  get: (key: string): any | null => {
    if (!store) {
      settings.store();
    }
    return store[key];
  },
  set: (key: string, value: any | null) => {
    // todo: save change on server-side
    store[key] = value;
  }
}
