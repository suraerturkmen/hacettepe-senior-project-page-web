import * as S from "@/components/professor-create-new-project/ProfessorCreateProject.styles";
import { Typography, TextField, FormControl, Button } from "@mui/material";
import { useForm } from "react-hook-form";

function ProfessorCreateProject() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <S.StyledProjectCardWrapper>
      <Typography variant="h2HeadlineBold" color="#D54949">
        Create a new project
      </Typography>
      <S.StyledInputFieldsWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            id="title"
            name="title"
            label="Title"
            helperText="Enter title of the project"
            color="secondary"
          />
          <TextField
            multiline
            rows={4}
            id="description"
            name="description"
            label="Description"
            helperText="Enter description of the project"
            color="secondary"
          />
          <TextField
            id="number"
            name="maxStudents"
            label="Maximum student expected"
            helperText="Enter maximum number of students expected"
            color="secondary"
          />
          <S.StyledButton type="submit" variant="contained">
            Submit
          </S.StyledButton>
        </form>
      </S.StyledInputFieldsWrapper>
    </S.StyledProjectCardWrapper>
  );
}

export default ProfessorCreateProject;
