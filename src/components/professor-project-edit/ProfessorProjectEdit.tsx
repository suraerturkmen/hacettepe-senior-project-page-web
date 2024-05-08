import * as S from "@/components/professor-project-edit/ProfessorProjectEdit.styles";
import {
  Typography,
  TextField,
  FormControl,
  Button,
  Autocomplete,
  Chip,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import RemoveIcon from "@mui/icons-material/RemoveCircleOutlineSharp";

export interface StudentProperties {
  id: number;
  name: string;
}

interface ProfessorProjectEditProps {
  defaultTitle: string;
  defaultDescription: string;
  defaultStudentNumber: number;
  studentNames?: StudentProperties[];
  defaultStudentNames: StudentProperties[];
}

const ProfessorProjectEdit = (
  props: ProfessorProjectEditProps
): JSX.Element => {
  const {
    defaultTitle,
    defaultDescription,
    defaultStudentNumber,
    studentNames,
    defaultStudentNames,
  } = props || {};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const [val, setVal] = useState<StudentProperties[]>(defaultStudentNames);

  const valHtml = val.map((option: StudentProperties, index) => {
    const label = option.name;
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
        Update Project
      </Typography>
      <S.StyledInputFieldsWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            id="title"
            name="title"
            label="Title"
            helperText="Enter title of the project"
            color="secondary"
            defaultValue={defaultTitle}
          />
          <TextField
            multiline
            rows={4}
            id="description"
            name="description"
            label="Description"
            helperText="Enter description of the project"
            color="secondary"
            defaultValue={defaultDescription}
          />
          {!studentNames && (
            <TextField
              id="number"
              name="maxStudents"
              label="Maximum student expected"
              helperText="Enter maximum number of students expected"
              color="secondary"
              defaultValue={defaultStudentNumber}
            />
          )}
          {studentNames && (
            <Autocomplete
              multiple
              id="tags-standard"
              freeSolo
              filterSelectedOptions
              options={studentNames}
              onChange={(e, newValue) =>
                setVal(newValue as StudentProperties[])
              }
              getOptionLabel={(option: string | StudentProperties) => {
                if (typeof option === "string") {
                  return option;
                } else {
                  return option.name;
                }
              }}
              value={val.filter((option) =>
                defaultStudentNames.some(
                  (defaultOption) => defaultOption.id === option.id
                )
              )}
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
          )}
          <S.StyledButton type="submit" variant="contained">
            Submit
          </S.StyledButton>
        </form>
      </S.StyledInputFieldsWrapper>
    </S.StyledProjectCardWrapper>
  );
};

export default ProfessorProjectEdit;
