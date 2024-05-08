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

export type ScheduleDetail = {
  termPeriod: string;
  timelines: TimelineDetail[];
};

export interface TermScheduleProps {
  terms: ScheduleDetail[];
  termName: string;
}

const TermSchedule = (props: TermScheduleProps): JSX.Element => {
  const { terms, termName } = props;
  const todayDate = new Date();

  return (
    <S.StyledContainer>
      <Typography variant="h1DisplayBold" color="#9F4646">
        {`${termName}`}
      </Typography>
      <S.StyledTerms>
        {terms.map((term, index) => (
          <S.StyledTermsContainer key={index}>
            {terms.length > 1 && (
              <Typography variant="h5" color="#9F4646">
                {term.termPeriod}
              </Typography>
            )}
            <S.StyledAllTerms key={index}>
              <S.StyledTermContainer>
                {term.timelines.map((timeline, index) => (
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
                      {index !== term.timelines.length - 1 && (
                        <TimelineConnector />
                      )}
                    </TimelineSeparator>
                    <TimelineOppositeContent color="text.secondary">
                      {timeline.dueDate.toDateString()}
                    </TimelineOppositeContent>
                  </S.StyledTimelineItem>
                ))}
              </S.StyledTermContainer>
            </S.StyledAllTerms>
          </S.StyledTermsContainer>
        ))}
      </S.StyledTerms>
    </S.StyledContainer>
  );
};

export default TermSchedule;
