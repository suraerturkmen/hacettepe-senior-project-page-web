import * as S from "@/components/schedule/term-schedules/TermSchedules.styles";
import TermSchedule, {
  TermScheduleProps,
} from "@/components/schedule/term-schedule/TermSchedule";

export interface TermSchedulesProps {
  termSchedules?: TermScheduleProps[];
}

const TermSchedules = (props: TermSchedulesProps): JSX.Element => {
  const { termSchedules } = props;
  return (
    <S.StyledTermSchedulesContainer>
      {termSchedules &&
        termSchedules.map((termSchedule, index) => (
          <>
            <TermSchedule key={index} {...termSchedule} />
            {index !== termSchedules.length - 1 && <S.StyledHorizontalLine />}
          </>
        ))}
    </S.StyledTermSchedulesContainer>
  );
};

export default TermSchedules;
