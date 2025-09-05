const storage = {
  set: (key: string, value: any) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  },
  get: <T>(key: string, defaultValue?: T): T => {
    const value = sessionStorage.getItem(key);
    return (value ? JSON.parse(value) : defaultValue) as T;
  },
  remove: (key: string) => {
    sessionStorage.removeItem(key);
  },
};

export default storage;
