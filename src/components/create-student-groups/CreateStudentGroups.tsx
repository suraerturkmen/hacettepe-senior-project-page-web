import * as S from "@/components/create-student-groups/CreateStudentGroups.styles";
import {
  Typography,
  TextField,
  Button,
  Autocomplete,
  Chip,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import RemoveIcon from "@mui/icons-material/RemoveCircleOutlineSharp";

export interface StudentOptionsType {
  studentName: string;
  id: number;
}

interface CreateStudentGroupsProps {
  students: StudentOptionsType[];
}

const CreateStudentGroups = (props: CreateStudentGroupsProps): JSX.Element => {
  const { students } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  // Ensure val state is always of type StudentOptionsType[]
  const [val, setVal] = useState<StudentOptionsType[]>([]);

  const valHtml = val.map((option: StudentOptionsType, index) => {
    const label = option.studentName;
    return (
      <Chip
        key={label}
        label={label}
        deleteIcon={<RemoveIcon />}
        onDelete={() => {
          setVal(val.filter((entry) => entry !== option));
        }}
      />
    );
  });

  return (
    <S.StyledProjectCardWrapper>
      <Typography variant="h2HeadlineBold" color="#D54949">
        Create a new group
      </Typography>
      <S.StyledInputFieldsWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Autocomplete
            multiple
            id="tags-standard"
            freeSolo
            filterSelectedOptions
            options={students}
            onChange={(e, newValue) => setVal(newValue as StudentOptionsType[])}
            getOptionLabel={(option: string | StudentOptionsType) => {
              if (typeof option === "string") {
                return option;
              } else {
                return option.studentName;
              }
            }}
            value={val}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                margin="normal"
                fullWidth
                label="Select students"
              />
            )}
          />
          <TextField
            id="groupName"
            name="groupName"
            label="Group Name"
            helperText="Enter group name"
            color="secondary"
          />
          <S.StyledButton type="submit" variant="contained">
            Submit
          </S.StyledButton>
        </form>
      </S.StyledInputFieldsWrapper>
    </S.StyledProjectCardWrapper>
  );
};

export default CreateStudentGroups;
