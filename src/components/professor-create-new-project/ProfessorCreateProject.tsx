import * as S from "@/components/professor-create-new-project/ProfessorCreateProject.styles";
import { ProfessorsProperties } from "@/redux/features/projectSlice";
import {
  Typography,
  TextField,
  FormControl,
  Button,
  Autocomplete,
  Chip,
} from "@mui/material";
import { MuiChipsInput, MuiChipsInputChip } from "mui-chips-input";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import RemoveIcon from "@mui/icons-material/Remove";

interface ProfessorCreateProjectProps {
  allProfessors: ProfessorsProperties[];
  currentProfessorUsername: string;
  term: string;
  projectTypeId: string;
  onSubmit: (data: any) => void;
}

function ProfessorCreateProject(props: ProfessorCreateProjectProps) {
  const {
    allProfessors,
    currentProfessorUsername,
    term,
    projectTypeId,
    onSubmit,
  } = props || {};
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [sessionId, setSessionId] = useState<string>("");

  useEffect(() => {
    if (window !== undefined) {
      const userId = localStorage.getItem("userId");
      setSessionId(userId || "");
    }
  }, []);

  const router = useRouter();

  const beforeSubmit = async (data: any) => {
    data.sessionId = sessionId;
    data.term = term;
    data.projectTypeId = projectTypeId;
    if (!keywordChips) data.keywords = [];
    if (!val) data.professors = [];
    console.log(data);
    onSubmit(data);
    router.push("/all-projects-professor");
  };

  const [val, setVal] = useState<ProfessorsProperties[]>([]);

  const valHtml = val.map((option: ProfessorsProperties, index) => {
    const label = option.username;
    return (
      <Chip
        key={option.id}
        label={label}
        deleteIcon={<RemoveIcon />}
        onDelete={() => {
          setVal(val.filter((entry) => entry !== option) || []);
        }}
      />
    );
  });
  const [keywordChips, setKeywordChips] = useState<MuiChipsInputChip[]>([]);

  return (
    <S.StyledProjectCardWrapper>
      <Typography variant="h2HeadlineBold" color="#D54949">
        Create a new project
      </Typography>
      <S.StyledInputFieldsWrapper>
        <form onSubmit={handleSubmit(beforeSubmit)}>
          <TextField
            id="title"
            label="Title"
            helperText="Enter title of the project"
            color="secondary"
            {...register("title")}
          />
          <TextField
            multiline
            rows={4}
            id="description"
            label="Description"
            helperText="Enter description of the project"
            color="secondary"
            {...register("description")}
          />
          {allProfessors && (
            <Autocomplete
              multiple
              id="professors"
              freeSolo
              filterSelectedOptions
              options={allProfessors}
              onChange={(e, newValue) => {
                setValue("professors", newValue);
                setVal(newValue as ProfessorsProperties[]);
              }}
              getOptionLabel={(option: string | ProfessorsProperties) => {
                if (typeof option === "string") {
                  return option;
                } else {
                  return option.username;
                }
              }}
              value={val.filter((professor) => {
                return professor.username !== currentProfessorUsername;
              })}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  margin="normal"
                  fullWidth
                  label="Select professors"
                />
              )}
            />
          )}
          <TextField
            id="number"
            type="number"
            label="Maximum student expected"
            helperText="Enter maximum number of students expected"
            color="secondary"
            {...register("studentLimit")}
          />
          <MuiChipsInput
            id="keywords"
            label="Keywords"
            helperText="Enter keywords for the project"
            value={keywordChips}
            onChange={(newValue) => {
              const uniqueKeywords = Array.from(new Set(newValue));
              setKeywordChips(uniqueKeywords);
              setValue("keywords", uniqueKeywords);
            }}
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
