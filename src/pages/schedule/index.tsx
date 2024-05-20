import React, { useEffect, useState } from "react";
import DefaultLayout from "@/layouts/DefaultLayouts";
import * as S from "@/components/admin-home/AdminHome.styles";
import { dummySchedules } from "@/dummyData/dummyData";
import TermSchedules from "@/components/schedule/term-schedules/TermSchedules";
import {
  TimelineState,
  fetchTimelinesByProjectTypeId,
} from "@/redux/features/TimelineSlice";
import { store } from "@/redux/store";
import {
  ActiveSeniorProjectTermState,
  fetchActiveSeniorProjectTerm,
} from "@/redux/features/ActiveSeniorProjectTerm";
import { TermSchedulesProps } from "@/components/schedule/term-schedules/TermSchedules";
import {
  ScheduleDetail,
  TermScheduleProps,
} from "@/components/schedule/term-schedule/TermSchedule";

function SchedulePage() {
  const timelineData = useTimeline()?.timelineData;
  const activeSeniorProjectTermData = useActiveSeniorProjectTerm();
  const [termSchedule, setTermSchedule] = useState<TermScheduleProps[]>();

  useEffect(() => {
    const tempTermScheduleDetail: ScheduleDetail = {
      termPeriod:
        activeSeniorProjectTermData?.activeSeniorProjectTermData?.data?.name ??
        "",
      timelines:
        timelineData?.data?.map((timeline) => ({
          reportName: timeline.deliveryName,
          dueDate: new Date(timeline.deliveryDate),
        })) ?? [],
    };

    const tempTermSchedule: TermScheduleProps = {
      termName:
        activeSeniorProjectTermData?.activeSeniorProjectTermData?.data?.name ??
        "",
      terms: [tempTermScheduleDetail],
    };

    setTermSchedule([tempTermSchedule]);
  }, [timelineData, activeSeniorProjectTermData]);

  return (
    <S.StyledWrapper>
      <TermSchedules termSchedules={termSchedule} />
    </S.StyledWrapper>
  );
}

export default SchedulePage;

SchedulePage.getLayout = (page: JSX.Element) => (
  <DefaultLayout>{page}</DefaultLayout>
);

function useActiveSeniorProjectTerm():
  | ActiveSeniorProjectTermState
  | undefined {
  const [activeSeniorProjectTermData, setActiveSeniorProjectTermData] =
    useState<ActiveSeniorProjectTermState>();

  useEffect(() => {
    async function getData() {
      try {
        await store.dispatch(fetchActiveSeniorProjectTerm());
        const activeSeniorProjectTermState =
          store.getState().activeSeniorProjectTerm;
        setActiveSeniorProjectTermData(activeSeniorProjectTermState);
      } catch (error) {
        console.error("Error fetching active senior project term:", error);
      }
    }
    getData();
  }, []);

  return activeSeniorProjectTermData;
}

function useTimeline(): TimelineState | undefined {
  const [timelineStateData, setTimelineStateData] = useState<TimelineState>();

  const projectTypeId =
    useActiveSeniorProjectTerm()?.activeSeniorProjectTermData?.data?.id || "";

  useEffect(() => {
    async function getData() {
      try {
        if (!projectTypeId) return;
        const timelineRequest = {
          projectTypeId: projectTypeId,
        };
        await store.dispatch(fetchTimelinesByProjectTypeId(timelineRequest));
        const timelineState = store.getState().timelines;
        setTimelineStateData(timelineState);
      } catch (error) {
        // Handle error
        console.error("Error fetching timelines:", error);
      }
    }
    getData();
  }, [projectTypeId]);

  return timelineStateData;
}
