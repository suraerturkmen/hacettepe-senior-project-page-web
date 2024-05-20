import * as S from "@/components/professor-student-home-page/TermTimeline/TermTimeline.styles";
import { Typography } from "@mui/material";
import {
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab";
import { Timeline } from "@/redux/features/TimelineSlice";

export interface TimelineProps {
  timelines: Timeline[];
  termName: string;
}

const TermTimeline = (props: TimelineProps): JSX.Element => {
  const { timelines, termName } = props;
  const todayDate = new Date();

  return (
    <S.StyledContainer>
      <Typography variant="h5TaglineBold" color="#344767">
        {`${termName} Timeline`}
      </Typography>
      <S.StyledAllProjects>
        <S.StyledProjectContainer>
          {timelines.map((timeline, index) => (
            <S.StyledTimelineItem key={index}>
              <TimelineContent color={""}>
                {timeline.deliveryName}
              </TimelineContent>
              <TimelineSeparator>
                <TimelineDot
                  variant={
                    new Date(timeline.deliveryDate) < todayDate
                      ? "filled"
                      : "outlined"
                  }
                />
                {index !== timelines.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineOppositeContent color="text.secondary">
                {new Date(timeline.deliveryDate)
                  .toUTCString()
                  .split(" ")
                  .slice(0, 4)
                  .join(" ")}
              </TimelineOppositeContent>
            </S.StyledTimelineItem>
          ))}
          {/* Use RouterLink to navigate to the documents page */}
        </S.StyledProjectContainer>
      </S.StyledAllProjects>
    </S.StyledContainer>
  );
};

export default TermTimeline;
