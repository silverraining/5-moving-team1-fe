import { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";

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

// 리뷰 모달용 react-hook-form 훅
interface ReviewFormValues {
  rating: number;
  content: string;
}

export const useReviewForm = () => {
  const {
    control,
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    defaultValues: {
      rating: 0,
      content: "",
    },
    mode: "onChange", // 변경 시마다 검증
  });

  const isValid = watch("rating") > 0 && watch("content").trim().length >= 10;

  return {
    control,
    handleSubmit,
    register: (name: keyof ReviewFormValues) =>
      register(name, {
        required: "내용을 입력해주세요",
        minLength: {
          value: 10,
          message: "10자 이상 입력해주세요.",
        },
      }),
    errors,
    isValid,
    watch,
  };
};
