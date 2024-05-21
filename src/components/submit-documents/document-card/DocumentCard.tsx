import * as S from "@/components/submit-documents/document-card/DocumentCard.styles";
import { Button, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import axiosInstance from "@/Service/Instance";
import {
  UploadDocumentRequest,
  fetchUploadDocument,
} from "@/redux/features/UploadDocument";
import {
  FileData,
  fetchDownloadDocument,
} from "@/redux/features/DownloadDocument";
import { store } from "@/redux/store";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/rootReducer";
import { UserType } from "@/components/all-projects/project-list-card/ProjectListCard";

export enum DocumentTypes {
  current = "current",
  passed = "passed",
  next = "next",
}

export interface DocumentCardProps {
  documentName: string;
  dueDate: Date;
  projectName: string;
  projectId: string;
  timelineId: string;
  type: DocumentTypes;
  userType: UserType;
}

const DocumentCard = (props: DocumentCardProps): JSX.Element => {
  const {
    type,
    documentName,
    dueDate,
    projectName,
    projectId,
    timelineId,
    userType,
  } = props;

  const [uploadStatus, setUploadStatus] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const documentData = useSelector(
    (state: RootState) => state.downloadDocument.documentData
  );
  const [downloadResponse, setDownloadResponse] = useState<FileData | null>(
    null
  );

  useEffect(() => {
    const fetchDocument = async () => {
      const request = {
        documentName: `${projectId}_${timelineId}`,
      };
      const response = await store.dispatch(fetchDownloadDocument(request));
      setDownloadResponse(response.payload as FileData);
    };

    fetchDocument();
  }, [projectId, timelineId]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus("No file selected");
      return;
    }

    const uploadRequest: UploadDocumentRequest = {
      projectId,
      timelineId,
      file,
    };

    try {
      await store.dispatch(fetchUploadDocument(uploadRequest));
      setUploadStatus("Upload successful");
      if (typeof window !== "undefined") {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("Error uploading file");
    }
  };

  const handleDownload = async () => {
    try {
      if (!downloadResponse || !downloadResponse.data) {
        alert("No file to download");
        return;
      }

      const binaryData = atob(downloadResponse.data.file);
      const arrayBuffer = new ArrayBuffer(binaryData.length);
      const uint8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < binaryData.length; i++) {
        uint8Array[i] = binaryData.charCodeAt(i);
      }

      const pdfBlob = new Blob([arrayBuffer], { type: "application/pdf" });
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `${downloadResponse.data.deliveryName}.pdf`
      );
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
      alert("Error downloading file");
    }
  };

  const renderActionButton = () => {
    switch (type) {
      case DocumentTypes.current:
        return (
          <>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="contained-button-file"
            />
            {userType === UserType.Student && (
              <>
                <label htmlFor="contained-button-file">
                  <Button
                    variant="contained"
                    component="span"
                    style={{ margin: "10px 0" }}>
                    Select Document
                  </Button>
                </label>
                <S.StyledButtonContainer>
                  <S.StyledDownloadButton
                    variant="contained"
                    onClick={handleDownload}>
                    Download Document
                  </S.StyledDownloadButton>
                  <S.StyledUploadButtonArea>
                    <S.StyledUploadButton
                      variant="contained"
                      onClick={handleUpload}>
                      Upload Document
                    </S.StyledUploadButton>
                    <Typography variant="footnoteSmall">
                      Max Size: 512MB
                    </Typography>
                  </S.StyledUploadButtonArea>
                </S.StyledButtonContainer>
                {uploadStatus && (
                  <Typography color="error">{uploadStatus}</Typography>
                )}
              </>
            )}
          </>
        );
      case DocumentTypes.passed:
        return (
          <S.StyledDownloadButton variant="contained" onClick={handleDownload}>
            Download Past Document
          </S.StyledDownloadButton>
        );
      case DocumentTypes.next:
        return (
          <S.StyledDeliveryButton variant="contained" disabled>
            Delivery Has Not Opened Yet
          </S.StyledDeliveryButton>
        );
      default:
        return null;
    }
  };

  return (
    <S.StyledDocumentCard>
      <S.StyledDocumentCardHeader></S.StyledDocumentCardHeader>
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
            {new Date(dueDate).toISOString().split("T")[0]}
          </Typography>
        </S.StyledDocumentCardHeader>
      </S.StyledDocumentCardBody>
      {renderActionButton()}
    </S.StyledDocumentCard>
  );
};

export default DocumentCard;
