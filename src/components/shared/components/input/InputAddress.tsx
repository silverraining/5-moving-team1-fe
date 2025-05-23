import { Box, TextField, Button, Typography } from "@mui/material";

interface InputBoxProps {
  field1: string;
  field2: string;
  isEditing: boolean;
  onChangeField1: (value: string) => void;
  onChangeField2: (value: string) => void;
  onSubmit: () => void;
  onEditToggle: () => void;
}

export const InputBox = ({
  field1,
  field2,
  isEditing,
  onChangeField1,
  onChangeField2,
  onSubmit,
  onEditToggle,
}: InputBoxProps) => {
  const isFilled = field1.trim() !== "" && field2.trim() !== "";

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      p={2}
      border="1px solid #ccc"
      borderRadius="8px"
      width="300px"
    >
      <Box>
        <TextField
          variant="outlined"
          value={field1}
          onChange={(e) => onChangeField1(e.target.value)}
          disabled={!isEditing}
        />
        {field1.trim() !== "" && (
          <Button>
            <Typography
              variant="body2"
              color="primary"
              sx={{
                cursor: "pointer",
                textDecoration: "underline",
                width: "fit-content",
                mt: 0.5,
              }}
              onClick={onEditToggle}
            >
              수정하기1
            </Typography>
          </Button>
        )}
      </Box>

      <Box>
        <TextField
          variant="outlined"
          value={field2}
          onChange={(e) => onChangeField2(e.target.value)}
          disabled={!isEditing}
        />
        {field2.trim() !== "" && (
          <Typography
            variant="body2"
            color="primary"
            sx={{
              cursor: "pointer",
              textDecoration: "underline",
              width: "fit-content",
              mt: 0.5,
            }}
            onClick={onEditToggle}
          >
            수정하기2
          </Typography>
        )}
      </Box>

      {isEditing && (
        <Button variant="contained" onClick={onSubmit} disabled={!isFilled}>
          저장
        </Button>
      )}
    </Box>
  );
};
