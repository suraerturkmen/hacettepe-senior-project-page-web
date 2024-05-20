import * as S from "./AdminUpdateAnnouncement.styles";
import { TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

interface AdminUpdateAnnouncementProps {
  title: string;
  content: string;
  onSubmit: (data: any) => void;
}

function AdminUpdateAnnouncement(props: AdminUpdateAnnouncementProps) {
  const { title, content, onSubmit } = props || {};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const beforeSubmit = async (data: any) => {
    onSubmit(data);
  };

  return (
    <S.StyledProjectCardWrapper>
      <Typography variant="h4SubtitleBold" color="#7D2E41">
        Update Announcement
      </Typography>
      <S.StyledInputFieldsWrapper>
        <form onSubmit={handleSubmit(beforeSubmit)}>
          <Typography variant="h6BodyTitleBold" color="#7D2E41">
            Title
          </Typography>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            error={!!errors.term}
            defaultValue={title}
            {...register("title", { required: true })}
          />
          <Typography variant="h6BodyTitleBold" color="#7D2E41">
            Content
          </Typography>
          <TextField
            label="Content"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            defaultValue={content}
            {...register("content", { required: true })}
          />
          <S.StyledButton type="submit" variant="contained">
            Submit
          </S.StyledButton>
        </form>
      </S.StyledInputFieldsWrapper>
    </S.StyledProjectCardWrapper>
  );
}

export default AdminUpdateAnnouncement;
