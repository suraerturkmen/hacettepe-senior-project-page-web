import * as S from "@/components/professor-student-home-page/TermTimeline/TermTimeline.styles";
import { Typography } from "@mui/material";
import {
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab";

export type TimelineDetail = {
  reportName: string;
  dueDate: Date;
};

export interface TimelineProps {
  timelines: TimelineDetail[];
  termName: string;
}

const Timeline = (props: TimelineProps): JSX.Element => {
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
                {timeline.reportName}
              </TimelineContent>
              <TimelineSeparator>
                <TimelineDot
                  variant={
                    timeline.dueDate.getTime() < todayDate.getTime()
                      ? "filled"
                      : "outlined"
                  }
                />
                {index !== timelines.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineOppositeContent color="text.secondary">
                {timeline.dueDate.toDateString()}
              </TimelineOppositeContent>
            </S.StyledTimelineItem>
          ))}
          {/* Use RouterLink to navigate to the documents page */}
        </S.StyledProjectContainer>
      </S.StyledAllProjects>
    </S.StyledContainer>
  );
};

export default Timeline;
