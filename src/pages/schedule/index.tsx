import React, { useState, useEffect, useMemo, use } from "react";
import DefaultLayout from "@/layouts/DefaultLayouts";
import * as S from "@/components/admin-home/AdminHome.styles";
import { dummySchedules } from "@/dummyData/dummyData";
import TermSchedules from "@/components/schedule/term-schedules/TermSchedules";

function SchedulePage() {
  return (
    <S.StyledWrapper>
      <TermSchedules termSchedules={dummySchedules} />
    </S.StyledWrapper>
  );
}

export default SchedulePage;

SchedulePage.getLayout = (page: JSX.Element) => (
  <DefaultLayout>{page}</DefaultLayout>
);
