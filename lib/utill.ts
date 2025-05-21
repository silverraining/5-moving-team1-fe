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

export const useDrawer = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = useCallback(
    (newOpen: boolean) => () => {
      setOpen(newOpen);
    },
    []
  );

  return { open, toggleDrawer };
};

export const useTab = () => {
  const [value, setValue] = useState<number | false>(false);

  const handleChange = useCallback(
    (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    },
    []
  );

  return { value, handleChange, setValue };
};
