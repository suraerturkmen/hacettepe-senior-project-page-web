import * as S from "@/components/update-student-groups/UpdateStudentGroups.styles";
import {
  Typography,
  TextField,
  Button,
  Autocomplete,
  Chip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import RemoveIcon from "@mui/icons-material/RemoveCircleOutlineSharp";
import { StudentProperties } from "@/redux/features/CreateGroup";
import { useRouter } from "next/router";

interface UpdateStudentGroupProps {
  defaultGroupName: string;
  defaultStudents: string;
  students: StudentProperties[];
  currentStudentName: string;
  onSubmit: (data: any) => void;
}

const UpdateStudentGroup = (props: UpdateStudentGroupProps): JSX.Element => {
  const {
    defaultGroupName,
    defaultStudents,
    students,
    currentStudentName,
    onSubmit,
  } = props;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const beforeSubmit = async (data: any) => {
    data.sessionId = sessionId;
    if (!val) data.groupMembers = [];
    onSubmit(data);
    setTimeout(() => {
      router.push("/student-groups");
    }, 50);
  };

  const [parsedDefaultStudents, setParsedDefaultStudents] = useState<
    StudentProperties[]
  >([]);
  const [sessionId, setSessionId] = useState<string>("");
  const [val, setVal] = useState<StudentProperties[]>([]);

  useEffect(() => {
    if (defaultStudents) {
      const parsedStudents = JSON.parse(defaultStudents as any);
      setParsedDefaultStudents(parsedStudents);
    }
  }, [defaultStudents]);

  useEffect(() => {
    if (window !== undefined) {
      const userId = localStorage.getItem("userId");
      setSessionId(userId || "");
    }
  }, []);

  useEffect(() => {
    if (parsedDefaultStudents) {
      setVal(parsedDefaultStudents);
    }
  }, [parsedDefaultStudents]);

  useEffect(() => {
    if (parsedDefaultStudents) {
      parsedDefaultStudents.map((student, index) => {
        register(`groupMembers[${index}]`, { value: student });
      });
    }
  }, [parsedDefaultStudents, register]);

  const valHtml = val.map((option: StudentProperties, index) => {
    const label = option.username;
    return (
      <Chip
        key={label}
        label={label}
        deleteIcon={<RemoveIcon />}
        onDelete={() => {
          setVal(val.filter((entry) => entry !== option) || []);
        }}
      />
    );
  });

  return (
    <S.StyledProjectCardWrapper>
      <Typography variant="h2HeadlineBold" color="#D54949">
        Update Group
      </Typography>
      <S.StyledInputFieldsWrapper>
        <form onSubmit={handleSubmit(beforeSubmit)}>
          <Autocomplete
            multiple
            id="tags-standard"
            freeSolo
            filterSelectedOptions
            options={students}
            onChange={(e, newValue) => {
              setValue("groupMembers", newValue);
              setVal(newValue as StudentProperties[]);
            }}
            getOptionLabel={(option: string | StudentProperties) => {
              if (typeof option === "string") {
                return option;
              } else {
                return option.username;
              }
            }}
            value={val.filter(
              (option) => option.username !== currentStudentName
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
          <TextField
            id="groupName"
            label="Group Name"
            helperText="Enter group name"
            color="secondary"
            defaultValue={defaultGroupName}
            {...register("groupName", { required: true })}
          />
          <S.StyledButton type="submit" variant="contained">
            Submit
          </S.StyledButton>
        </form>
      </S.StyledInputFieldsWrapper>
    </S.StyledProjectCardWrapper>
  );
};

export default UpdateStudentGroup;
