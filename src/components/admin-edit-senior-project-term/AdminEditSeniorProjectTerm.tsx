import * as S from "./AdminEditSeniorProjectTerm.styles";
import { Divider, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { format } from "date-fns";

interface mockTimeline {
  id: string;
  term: string;
  deliveryName: string;
  deliveryDate: Date;
}

interface AdminEditSeniorProjectTermProps {
  defaultName: string;
  defaultTimelines: string;
  onSubmit: (data: any) => void;
}

function AdminEditSeniorProjectTerm(props: AdminEditSeniorProjectTermProps) {
  const { defaultName, defaultTimelines, onSubmit } = props;

  const [parsedDefaultTimelines, setParsedDefaultTimelines] = useState<
    mockTimeline[] | null
  >(null);

  const [timelines, setTimelines] = useState<mockTimeline[]>([]);
  const [timeline, setTimeline] = useState<mockTimeline>({
    id: "",
    deliveryName: "",
    deliveryDate: new Date(),
    term: ""
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (defaultTimelines) {
      setParsedDefaultTimelines(JSON.parse(defaultTimelines));
    }
  }, [defaultTimelines]);

  useEffect(() => {
    if (parsedDefaultTimelines) {
      setTimelines(parsedDefaultTimelines);
    }
  }, [parsedDefaultTimelines]);

  const handleAddTimeline = () => {
    if (timeline.deliveryName === "" || timeline.deliveryDate === new Date())
      return;
    setTimelines((prevTimelines) => [...prevTimelines, timeline]);
  };

  const beforeSubmit = async (data: any) => {
    data.timelines = timelines;
    onSubmit(data);
  };

  const handleRemoveTimeline = (index: number) => {
    return () => {
      setTimelines(timelines.filter((_, i) => i !== index));
    };
  };

  const handleDateChange = (index: number) => (date: Date | null) => {
    if (!date) return;
    setTimelines((prevTimelines) =>
      prevTimelines.map((tl, i) => (i === index ? { ...tl, deliveryDate: date } : tl))
    );
  };

  console.log(timelines)
  return (
    <S.StyledProjectCardWrapper>
      <Typography variant="h4SubtitleBold" color="#7D2E41">
        Update Senior Project Term
      </Typography>
      <S.StyledInputFieldsWrapper>
        <form onSubmit={handleSubmit(beforeSubmit)}>
          <TextField
            label="Title"
            variant="outlined"
            defaultValue={defaultName}
            fullWidth
            {...register("name", { required: true })}
          />

          <S.StyledTimelineHeader>
            <Typography variant="h6" color={"#7D2E41"}>
              Timeline
            </Typography>
            <Divider />
          </S.StyledTimelineHeader>

          {timelines.map((timeline, index) => (
            <div key={index}>
              <S.StyledTimelinesContainer>
                <S.StyledOneTimeline>
                  <S.StyledTimelineWrapper>
                    <Typography variant="bodyMedium" color="#B1ACAC">
                      Delivery Name
                    </Typography>
                    <Typography variant="bodyMedium">
                      {timeline.deliveryName}
                    </Typography>
                    <Typography variant="bodyMedium" color="#B1ACAC">
                      Delivery Date
                    </Typography>
                    <DatePicker
                      value={new Date(timelines[index].deliveryDate)}
                      onChange={handleDateChange(index)}
                      maxDate={index < timelines.length - 1 ? new Date(timelines[index + 1].deliveryDate) : new Date}
                    />
                  </S.StyledTimelineWrapper>
                </S.StyledOneTimeline>
              </S.StyledTimelinesContainer>
              <S.StyledRemoveContainer onClick={() => handleRemoveTimeline(index)}>
                <RemoveIcon />
                <Typography variant="h7Bold" color={"#7D2E41"}>
                  Delete Timeline
                </Typography>
              </S.StyledRemoveContainer>
            </div>
          ))}

          <TextField
            label="Delivery Name"
            variant="outlined"
            fullWidth
            onChange={(e) =>
              setTimeline({ ...timeline, deliveryName: e.target.value || "" })
            }
          />
          <DatePicker
            value={timelines.length > 0 ? new Date(timelines[timelines.length - 1].deliveryDate) : new Date()}
            onChange={(value) =>
              setTimeline({ ...timeline, deliveryDate: value || new Date() })
            }
            minDate={timelines.length > 0 ? new Date(timelines[timelines.length - 1].deliveryDate) : new Date()}
          />
          <S.StyledAddContainer onClick={handleAddTimeline}>
            <AddIcon />
            <Typography variant="h7Bold" color={"#7D2E41"}>
              Add Timeline
            </Typography>
          </S.StyledAddContainer>
          <S.StyledButton type="submit" variant="contained">
            Update Senior Project Term
          </S.StyledButton>
        </form>
      </S.StyledInputFieldsWrapper>
    </S.StyledProjectCardWrapper >
  );
}

export default AdminEditSeniorProjectTerm;
