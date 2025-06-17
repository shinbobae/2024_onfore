import { Dispatch, SetStateAction, useCallback, useState } from 'react';

type Handler = (e: any) => void;
type ReturnTypes<T = any> = [T, Handler, Dispatch<SetStateAction<T>>];
const useNumberInput = <T = any,>(initialValue: T): ReturnTypes<T> => {
  const [value, setValue] = useState(initialValue);
  const handler = useCallback((e: any) => {
    if (/^(\d*)[\.]?(\d{1})?$/g.test(e.target.value)) {
      setValue(e.target.value);
    } else {
      return;
    }
  }, []);
  return [value, handler, setValue];
};

export default useNumberInput;
