import React, { useState, useEffect, useMemo, use } from "react";
import DefaultLayout from "@/layouts/DefaultLayouts";
import * as S from "@/components/submit-documents/document-cards/DocumentCards.styles";
import DocumentCard, {
  DocumentCardProps,
} from "@/components/submit-documents/document-card/DocumentCard";
import { Typography } from "@mui/material";
import { dummyDocuments } from "@/dummyData/dummyData";

function SubmitDocumentPage() {
  const [documentCards, setDocumentCards] = useState<DocumentCardProps[]>([]);

  useEffect(() => {
    setDocumentCards(dummyDocuments);
  }, []);

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
