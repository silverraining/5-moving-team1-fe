import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";

export const SimpleDropdown = () => {
  const [value, setValue] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };

  return (
    <FormControl fullWidth size="small">
      <InputLabel id="simple-dropdown-label">옵션 선택</InputLabel>
      <Select
        labelId="simple-dropdown-label"
        value={value}
        label="옵션 선택"
        onChange={handleChange}
      >
        <MenuItem value="option1">옵션 1</MenuItem>
        <MenuItem value="option2">옵션 2</MenuItem>
        <MenuItem value="option3">옵션 3</MenuItem>
      </Select>
    </FormControl>
  );
};
