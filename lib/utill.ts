import { useState, useCallback, useEffect } from "react";

export const useSearch = (initialValue = "", delay = 300) => {
  const [value, setValue] = useState(initialValue);
  const [debouncedValue, setDebouncedValue] = useState(initialValue);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const onClear = useCallback(() => {
    setValue("");
  }, []);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return {
    debouncedValue,
    setValue,
    value,
    onChange,
    onClear,
  };
};
