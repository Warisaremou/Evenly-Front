/* eslint-disable @typescript-eslint/no-unused-expressions */
export const useLocalStorage = () => {
  const removeFromLocalStorage = (key: string) => {
    window !== undefined && localStorage.removeItem(key);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setLocalStorage = (key: string, value: any) => {
    window !== undefined && localStorage.setItem(key, JSON.stringify(value));
  };

  const getItem = (key: string) => {
    return localStorage.getItem(key);
  };

  return { removeFromLocalStorage, setLocalStorage, getItem };
};
