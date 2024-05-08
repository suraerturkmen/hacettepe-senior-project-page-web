import * as S from "@/components/submit-documents/document-cards/DocumentCards.styles";
import DocumentCard, {
  DocumentCardProps,
  DocumentTypes,
} from "@/components/submit-documents/document-card/DocumentCard";
import { Typography } from "@mui/material";

interface DocumentCardsProps {
  documentCards: DocumentCardProps[];
  type: DocumentTypes;
}

const DocumentCards = (props: DocumentCardsProps): JSX.Element => {
  const { documentCards, type } = props;
  return (
    <S.StyledDocumentCards>
      {type === DocumentTypes.current && (
        <S.StyledDocumentCardsHeader>
          <Typography variant="h5">Current Documents</Typography>
        </S.StyledDocumentCardsHeader>
      )}

      {type === DocumentTypes.passed && (
        <S.StyledDocumentCardsHeader>
          <Typography variant="h5">Passed Documents</Typography>
        </S.StyledDocumentCardsHeader>
      )}

      {type === DocumentTypes.next && (
        <S.StyledDocumentCardsHeader>
          <Typography variant="h5">Next Documents</Typography>
        </S.StyledDocumentCardsHeader>
      )}
      {documentCards.map((card) => (
        <DocumentCard
          key={card.documentName}
          type={card.type}
          documentName={card.documentName}
          dueDate={card.dueDate}
          projectName={card.projectName}
        />
      ))}
    </S.StyledDocumentCards>
  );
};

export default DocumentCards;
