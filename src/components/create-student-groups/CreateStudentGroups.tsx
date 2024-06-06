import * as S from "@/components/create-student-groups/CreateStudentGroups.styles";
import { Typography, TextField, Autocomplete, Chip } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import RemoveIcon from "@mui/icons-material/RemoveCircleOutlineSharp";
import { StudentProperties } from "@/redux/features/CreateGroup";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

interface CreateStudentGroupsProps {
  students: StudentProperties[];
  currentStudentName: string;
  onSubmit: (data: any) => void;
}

const CreateStudentGroups = (props: CreateStudentGroupsProps): JSX.Element => {
  const { students, currentStudentName, onSubmit } = props;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [sessionId, setSessionId] = useState<string>("");

  useEffect(() => {
    if (window !== undefined) {
      const userId = Cookies.get("userId");
      setSessionId(userId ?? "");
    }
  }, []);

  const router = useRouter();

  const beforeSubmit = async (data: any) => {
    data.sessionId = sessionId;
    if (!val) data.students = [];
    onSubmit(data);
    setTimeout(() => {
      router.push("/student-groups");
    }, 100);
  };
  const [val, setVal] = useState<StudentProperties[]>([]);

  const valHtml = val.map((option: StudentProperties, index) => {
    const label = option.username;
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
        <form onSubmit={handleSubmit(beforeSubmit)}>
          <Autocomplete
            multiple
            id="tags-standard"
            freeSolo
            filterSelectedOptions
            options={students}
            onChange={(e, newValue) => {
              setVal(newValue as StudentProperties[]);
              setValue("groupMembers", newValue);
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

export default CreateStudentGroups;
