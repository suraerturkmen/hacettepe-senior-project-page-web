import * as S from "@/components/submit-documents/document-card/DocumentCard.styles";
import { Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  UploadDocumentRequest,
  fetchUploadDocument,
} from "@/redux/features/UploadDocument";
import {
  FileData,
  fetchDownloadDocument,
} from "@/redux/features/DownloadDocument";
import { store } from "@/redux/store";
import { UserType } from "@/components/all-projects/project-list-card/ProjectListCard";
import { useForm } from "react-hook-form";
import DrawerWithButton from "@/components/drawers/drawer-with-button/DrawerWithButton";
import ErrorDrawer from "@/components/drawers/error-drawer/ErrorDrawer";

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
  handleGradeChange?: (data: any) => void;
}

const DocumentCard = ({
  type,
  documentName,
  dueDate,
  projectId,
  timelineId,
  userType,
  handleGradeChange,
}: DocumentCardProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [file, setFile] = useState<File | null>(null);
  const [downloadResponse, setDownloadResponse] = useState<FileData | null>(
    null
  );
  const [updateGrade, setUpdateGrade] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isError, setIsError] = useState(false);
  const [grade, setGrade] = useState<number | null>(null);

  useEffect(() => {
    const fetchDocument = async () => {
      const request = { documentName: `${projectId}_${timelineId}` };
      const response = await store.dispatch(fetchDownloadDocument(request));
      setDownloadResponse(response.payload as FileData);
      setGrade(downloadResponse?.data?.grade || null);
    };
    fetchDocument();
  }, [downloadResponse?.data?.grade, projectId, timelineId]);

  const handleUpload = async () => {
    if (!file) {
      setErrorMessage("No file selected");
      setIsError(true);
      return;
    }
    const uploadRequest: UploadDocumentRequest = {
      projectId,
      timelineId,
      file,
    };
    try {
      await store.dispatch(fetchUploadDocument(uploadRequest));
      window.location.reload();
    } catch (error) {
      console.error("Error uploading file:", error);
      setErrorMessage("Error uploading file");
      setIsError(true);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
      setIsOpen(true);
    }
  };

  const handleDownload = async () => {
    try {
      if (!downloadResponse || !downloadResponse.data?.file) {
        setErrorMessage("No file to open");
        setIsError(true);
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
      const newTab = window.open(url, "_blank");
      if (!newTab) {
        alert("Unable to open new tab. Please allow popups for this website.");
      }
      setTimeout(() => window.URL.revokeObjectURL(url), 100);
    } catch (error) {
      console.error("Error opening file:", error);
      setErrorMessage("Error opening file");
      setIsError(true);
    }
  };

  const onGradeSubmit = (data: any) => {
    const grade = JSON.stringify(data.grade);
    setGrade(data.grade);
    const gradeRequest = {
      documentName: `${projectId}_${timelineId}`,
      grade,
      projectId,
      timelineId,
    };
    if (handleGradeChange) {
      setUpdateGrade(false);
      handleGradeChange(gradeRequest);
    }
  };

  const renderActionButton = () => {
    switch (type) {
      case DocumentTypes.current:
        return userType === UserType.Student ? (
          <>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="contained-button-file"
            />
            <S.StyledButtonContainer>
              <S.StyledDownloadButton
                variant="contained"
                onClick={handleDownload}>
                Open Document
              </S.StyledDownloadButton>
              <S.StyledUploadButtonArea>
                <label htmlFor="contained-button-file">
                  <S.StyledUploadButton
                    variant="contained"
                    onClick={() =>
                      document.getElementById("contained-button-file")?.click()
                    }>
                    Select and Upload Document
                  </S.StyledUploadButton>
                </label>
                <Typography variant="footnoteSmall">Max Size: 10MB</Typography>
              </S.StyledUploadButtonArea>
            </S.StyledButtonContainer>
          </>
        ) : null;
      case DocumentTypes.passed:
        return userType === UserType.Teacher ? (
          <form onSubmit={handleSubmit(onGradeSubmit)}>
            <S.StyledButtonAndGrade>
              <S.StyledDownloadButton
                variant="contained"
                onClick={handleDownload}>
                Open Past Document
              </S.StyledDownloadButton>
              {grade && !updateGrade ? (
                <Typography variant="h6BodyTitleBold">
                  Grade: {grade}
                </Typography>
              ) : (
                <S.StyledGradeArea>
                  <TextField
                    id="grade"
                    type="number"
                    label="Grade"
                    helperText="Enter grade"
                    color="secondary"
                    inputProps={{ max: 100 }}
                    {...register("grade", {
                      valueAsNumber: true,
                      min: -1,
                      max: 100,
                      validate: (value) =>
                        value <= 100 || "Grade must be 100 or less",
                    })}
                  />
                  <S.StyledSubmitButton type="submit" variant="contained">
                    Submit
                  </S.StyledSubmitButton>
                </S.StyledGradeArea>
              )}
              {grade && !updateGrade && (
                <S.StyledUpdateGradeButton onClick={() => setUpdateGrade(true)}>
                  Update Grade
                </S.StyledUpdateGradeButton>
              )}
            </S.StyledButtonAndGrade>
          </form>
        ) : (
          <>
            <S.StyledDownloadButton
              variant="contained"
              onClick={handleDownload}>
              Open Past Document
            </S.StyledDownloadButton>
            {downloadResponse?.data?.grade && (
              <Typography variant="h6BodyTitleBold">
                Grade: {downloadResponse.data.grade}
              </Typography>
            )}
          </>
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
      <ErrorDrawer
        errorMessage={errorMessage || ""}
        isError={isError}
        handleErrorMessageClose={() => setIsError(false)}
      />
      <DrawerWithButton
        message="Are you sure you want to upload this document?"
        isOpen={isOpen}
        buttonName="Confirm Upload Document"
        handleClose={() => setIsOpen(false)}
        onClick={handleUpload}
      />
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
