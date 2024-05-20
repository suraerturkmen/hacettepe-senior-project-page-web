import React, { useState, useEffect, useMemo } from "react";
import DefaultLayout from "@/layouts/DefaultLayouts";
import * as S from "@/components/submit-documents/document-cards/DocumentCards.styles";
import DocumentCard, {
  DocumentCardProps,
  DocumentTypes,
} from "@/components/submit-documents/document-card/DocumentCard";
import { Typography } from "@mui/material";
import {
  ActiveSeniorProjectTermState,
  fetchActiveSeniorProjectTerm,
} from "@/redux/features/ActiveSeniorProjectTerm";
import { store } from "@/redux/store";
import {
  TimelineState,
  fetchTimelinesByProjectTypeId,
} from "@/redux/features/TimelineSlice";
import { GetServerSideProps } from "next";

interface Props {
  projectId: string;
  projectName: string;
}

function setDocumentType(deliveryDate: Date): DocumentTypes {
  const currentDate = new Date();

  if (
    deliveryDate.getTime() - 7 * 24 * 60 * 60 * 1000 >= currentDate.getTime() &&
    deliveryDate.getTime() >= currentDate.getTime()
  ) {
    return DocumentTypes.current;
  }
  if (deliveryDate > currentDate) {
    return DocumentTypes.next;
  }
  return DocumentTypes.passed;
}

function SubmitDocumentPage(props: Props) {
  const { projectId, projectName } = props;
  const [documentCards, setDocumentCards] = useState<DocumentCardProps[]>([]);
  const timelines = useTimeline();

  useEffect(() => {
    if (!timelines) return;
    const tempDocumentCards = timelines.timelineData.data.map((timeline) => ({
      timelineId: timeline.id,
      type: setDocumentType(new Date(timeline.deliveryDate)),
      documentName: timeline.deliveryName,
      dueDate: timeline.deliveryDate,
      projectName: projectName,
      projectId: projectId,
    }));
    setDocumentCards(tempDocumentCards);
  }, [projectId, projectName, timelines]);

  const currentDocumentCards = useMemo(() => {
    return documentCards.filter((card) => card.type === "current");
  }, [documentCards]);

  const passedDocumentCards = useMemo(() => {
    return documentCards.filter((card) => card.type === "passed");
  }, [documentCards]);

  const nextDocumentCards = useMemo(() => {
    return documentCards.filter((card) => card.type === "next");
  }, [documentCards]);

  return (
    <S.StyledWrapper>
      <Typography variant="h2HeadlineBold" color="#344767">
        {projectName}
      </Typography>
      <S.StyledDocumentCards>
        <S.StyledDocumentCardsHeader>
          <Typography variant="h4SubtitleBold" color="#344767">
            Current Documents
          </Typography>
        </S.StyledDocumentCardsHeader>
        {currentDocumentCards.map((card) => (
          <DocumentCard
            key={card.documentName}
            type={card.type}
            documentName={card.documentName}
            dueDate={card.dueDate}
            projectName={card.projectName}
            projectId={card.projectId}
            timelineId={card.timelineId}
          />
        ))}
      </S.StyledDocumentCards>
      <S.StyledDivider />
      <S.StyledDocumentCards>
        <S.StyledDocumentCardsHeader>
          <Typography variant="h4SubtitleBold" color="#344767">
            Next Documents
          </Typography>
        </S.StyledDocumentCardsHeader>
        {nextDocumentCards.map((card) => (
          <DocumentCard
            key={card.documentName}
            type={card.type}
            documentName={card.documentName}
            dueDate={card.dueDate}
            projectName={card.projectName}
            projectId={card.projectId}
            timelineId={card.timelineId}
          />
        ))}
      </S.StyledDocumentCards>
      <S.StyledDivider />
      <S.StyledDocumentCards>
        <S.StyledDocumentCardsHeader>
          <Typography variant="h4SubtitleBold" color="#344767">
            Passed Documents
          </Typography>
        </S.StyledDocumentCardsHeader>
        {passedDocumentCards.map((card) => (
          <DocumentCard
            key={card.documentName}
            type={card.type}
            documentName={card.documentName}
            dueDate={card.dueDate}
            projectName={card.projectName}
            projectId={card.projectId}
            timelineId={card.timelineId}
          />
        ))}
      </S.StyledDocumentCards>
    </S.StyledWrapper>
  );
}

export default SubmitDocumentPage;

SubmitDocumentPage.getLayout = (page: JSX.Element) => (
  <DefaultLayout>{page}</DefaultLayout>
);

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { projectId, projectName } = context.query;

  return {
    props: {
      projectId: projectId as string,
      projectName: projectName as string,
    },
  };
};

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
        console.error("Error fetching timelines:", error);
      }
    }
    getData();
  }, [projectTypeId]);

  return timelineStateData;
}

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
