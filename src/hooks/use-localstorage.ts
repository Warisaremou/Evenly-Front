/* eslint-disable @typescript-eslint/no-unused-expressions */
export const useLocalStorage = () => {
  const removeItem = (key: string) => {
    window !== undefined && localStorage.removeItem(key);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setItem = (key: string, value: any) => {
    window !== undefined && localStorage.setItem(key, JSON.stringify(value));
  };

  const getItem = (key: string) => {
    return localStorage.getItem(key);
  };

  return { removeItem, setItem, getItem };
};
