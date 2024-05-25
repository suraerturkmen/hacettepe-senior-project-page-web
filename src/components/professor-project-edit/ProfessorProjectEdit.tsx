import * as S from "@/components/professor-project-edit/ProfessorProjectEdit.styles";
import { Typography, TextField, Chip, Autocomplete } from "@mui/material";
import { set, useForm } from "react-hook-form";
import RemoveIcon from "@mui/icons-material/Remove";
import { SetStateAction, use, useEffect, useState } from "react";
import {
  ProfessorsProperties,
  ProjectStatus,
} from "@/redux/features/projectSlice";
import { MuiChipsInput, MuiChipsInputChip } from "mui-chips-input";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export interface GroupProperties {
  id?: number;
  students?: string[];
}

interface ProfessorProjectEditProps {
  id: string;
  defaultTitle: string;
  defaultDescription: string;
  defaultStudentNumber: number;
  defaultStudentGroup?: string;
  defaultKeywords?: string[];
  defaultProfessors: string;
  currentProfessorUsername: string;
  allProfessors: ProfessorsProperties[];
  projectStatus: ProjectStatus;
  onSubmit: (data: any) => void;
}

const ProfessorProjectEdit = (
  props: ProfessorProjectEditProps
): JSX.Element => {
  const {
    id,
    defaultTitle,
    defaultDescription,
    defaultStudentNumber,
    defaultStudentGroup,
    defaultKeywords,
    defaultProfessors,
    currentProfessorUsername,
    allProfessors,
    projectStatus,
    onSubmit,
  } = props || {};

  const [parsedDefaultStudentGroup, setParsedDefaultStudentGroup] =
    useState<GroupProperties | null>(null);
  const [parsedDefaultKeywords, setParsedDefaultKeywords] = useState<
    string[] | null
  >(null);
  const [parsedDefaultProfessors, setParsedDefaultProfessors] = useState<
    ProfessorsProperties[] | null
  >(null);
  const [sessionId, setSessionId] = useState<string>("");
  const [val, setVal] = useState<ProfessorsProperties[]>([]);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (defaultStudentGroup) {
      setParsedDefaultStudentGroup(JSON.parse(defaultStudentGroup as any));
    }
    if (defaultKeywords) {
      setParsedDefaultKeywords(defaultKeywords);
    }
    if (defaultProfessors) {
      setParsedDefaultProfessors(JSON.parse(defaultProfessors as any));
    }
  }, [
    defaultStudentGroup,
    defaultKeywords,
    currentProfessorUsername,
    defaultProfessors,
  ]);

  useEffect(() => {
    if (window !== undefined) {
      const userId = Cookies.get("userId");
      setSessionId(userId || "");
    }
  }, []);

  useEffect(() => {
    if (parsedDefaultProfessors) {
      setVal(parsedDefaultProfessors);
    }
  }, [parsedDefaultProfessors]);

  const beforeSubmit = async (data: any) => {
    data.id = id;
    data.sessionId = sessionId;
    if (!keywordChips) data.keywords = [];
    if (!val) data.professors = [];
    if (!parsedDefaultStudentGroup) data.groupId = "";
    else data.groupId = parsedDefaultStudentGroup?.id || "";
    onSubmit(data);
    setTimeout(() => {
      router.push("/professor-projects");
    }, 50);
  };

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

  useEffect(() => {
    if (parsedDefaultKeywords) {
      setKeywordChips(parsedDefaultKeywords);
    }
  }, [parsedDefaultKeywords]);

  useEffect(() => {
    if (parsedDefaultProfessors) {
      parsedDefaultProfessors.map((professor, index) => {
        register(`professors[${index}]`, { value: professor });
      });
    }
    if (parsedDefaultKeywords) {
      parsedDefaultKeywords.map((keyword, index) => {
        register(`keywords[${index}]`, { value: keyword });
      });
    }
  }, [parsedDefaultProfessors, parsedDefaultKeywords, register]);

  return (
    <S.StyledProjectCardWrapper>
      <Typography variant="h2HeadlineBold" color="#D54949">
        Update Project
      </Typography>
      <S.StyledInputFieldsWrapper>
        <form onSubmit={handleSubmit(beforeSubmit)}>
          <TextField
            id="title"
            label="Title"
            helperText="Enter title of the project"
            color="secondary"
            {...register("title")}
            defaultValue={defaultTitle}
          />
          <TextField
            multiline
            rows={4}
            id="description"
            label="Description"
            helperText="Enter description of the project"
            color="secondary"
            {...register("description")}
            defaultValue={defaultDescription}
          />
          {allProfessors && (
            <Autocomplete
              multiple
              id="Co-Supervisors"
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
                  label="Select Co-Supervisors"
                />
              )}
            />
          )}
          {!parsedDefaultStudentGroup?.id && (
            <TextField
              id="number"
              type="number"
              label="Maximum student expected"
              helperText="Enter maximum number of students expected"
              color="secondary"
              {...register("studentLimit")}
              defaultValue={defaultStudentNumber || 0}
            />
          )}
          {parsedDefaultStudentGroup &&
            !!parsedDefaultStudentGroup?.id &&
            ProjectStatus.Working === projectStatus && (
              <S.StyledStudentList>
                <S.StyledHeaderArea>
                  <Typography variant="h5TaglineBold" color={"#344767"}>
                    Group
                  </Typography>
                  <S.StyledRemoveArea
                    onClick={() => {
                      setParsedDefaultStudentGroup(null);
                    }}>
                    <S.StyledDeleteIcon />
                    <Typography variant="captionBold" color="#F44334">
                      Delete
                    </Typography>
                  </S.StyledRemoveArea>
                </S.StyledHeaderArea>
                {parsedDefaultStudentGroup.students?.map((studentName) => (
                  <Chip key={studentName} label={studentName} />
                ))}
              </S.StyledStudentList>
            )}
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
};

export default ProfessorProjectEdit;
