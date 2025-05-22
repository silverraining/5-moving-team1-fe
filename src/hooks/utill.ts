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

type OptionKey = "small" | "home" | "office";

export const useFilterModal = () => {
  const [open, setOpen] = useState(false);

  const [checked, setChecked] = useState({
    all: false,
    small: false,
    home: false,
    office: false,
  });

  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);

  const handleAllChange = (value: boolean) => {
    setChecked({
      all: value,
      small: value,
      home: value,
      office: value,
    });
  };

  const handleIndividualChange = (key: OptionKey, value: boolean) => {
    const updated = {
      ...checked,
      [key]: value,
    };
    const allChecked = updated.small && updated.home && updated.office;
    setChecked({
      ...updated,
      all: allChecked,
    });
  };

  const indeterminate =
    !checked.all && (checked.small || checked.home || checked.office);

  const handleSubmitFilters = () => {
    closeModal(); // 필요 시 닫기
  };
  return {
    open,
    openModal,
    closeModal,
    handleSubmitFilters,
    checked,
    indeterminate,
    handleAllChange,
    handleIndividualChange,
  };
};
