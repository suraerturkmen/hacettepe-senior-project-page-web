import * as S from "@/components/submit-documents/document-card/DocumentCard.styles";
import { Button, Typography } from "@mui/material";

export enum DocumentTypes {
  current = "current",
  passed = "passed",
  next = "next",
}

export interface DocumentCardProps {
  documentName: string;
  dueDate: string;
  projectName: string;
  type: DocumentTypes;
}

const DocumentCard = (props: DocumentCardProps): JSX.Element => {
  const { type, documentName, dueDate, projectName } = props;
  return (
    <S.StyledDocumentCard>
      <S.StyledDocumentCardHeader>
        <Typography variant="h6BodyTitleBold" color="#344767">
          {projectName}
        </Typography>
      </S.StyledDocumentCardHeader>
      <S.StyledDocumentCardBody>
        <S.StyledDocumentCardHeader>
          <Typography variant="h6BodyTitleBold" color="#344767">
            Document Name:
          </Typography>
          <Typography variant="bodySemiboldUnderline" color="#7B809A">
            {documentName}
          </Typography>
        </S.StyledDocumentCardHeader>
        <S.StyledDocumentCardHeader>
          <Typography variant="h6BodyTitleBold" color="#344767">
            Due Date:
          </Typography>
          <Typography variant="bodySemiboldUnderline" color="#7B809A">
            {dueDate}
          </Typography>
        </S.StyledDocumentCardHeader>
      </S.StyledDocumentCardBody>
      {type === DocumentTypes.current && (
        <S.StyledUploadButton variant="contained">
          Upload Document
        </S.StyledUploadButton>
      )}
      {type === DocumentTypes.passed && (
        <S.StyledDownloadButton variant="contained">
          Download PasT doCUMENT
        </S.StyledDownloadButton>
      )}
      {type === DocumentTypes.next && (
        <S.StyledDeliveryButton variant="contained">
          DELIVERY HAS NOT OPENED YET
        </S.StyledDeliveryButton>
      )}
    </S.StyledDocumentCard>
  );
};

export default DocumentCard;
