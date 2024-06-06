import React, { useState, useEffect } from "react";
import DefaultLayout from "@/layouts/DefaultLayouts";
import ProjectListCards from "@/components/all-projects/project-list-cards/ProjectListCards";
import * as S from "@/components/all-projects/project-list-cards/ProjectListCards.styles";
import { UserType } from "@/components/all-projects/project-list-card/ProjectListCard";
import { useRouter } from "next/router";
import {
    ProjectState,
    fetchActiveSeniorProjects,
} from "@/redux/features/AllProjectsInActiveTerm";
import { store } from "@/redux/store";
import ErrorDrawer from "@/components/drawers/error-drawer/ErrorDrawer";
import Cookies from "js-cookie";

function AdminAllProjectsPage() {
    const itemCountPerPage = 6;
    const [currentPageProject, setCurrentPageProject] = useState(1);
    const [errorMessage, setErrorMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [term, setTerm] = useState("");
    const [projectNoError, setProjectNoError] = useState(false);

    const handlePageChangeProject = (page: number) => {
        setCurrentPageProject(page);
    };

    const handleErrorMessageClose = () => {
        setIsError(false);
    };

    const router = useRouter();

    let sessionId = "";

    if (typeof window !== "undefined") {
        sessionId = Cookies.get("userId") ?? "";
    }

    const currentProjects = useFetchActiveSeniorProjects(
        sessionId,
        currentPageProject,
        itemCountPerPage
    );

    useEffect(() => {
        if (currentProjects?.projectData.success === false) {
            setIsError(true);
            setProjectNoError(true);
            setErrorMessage(currentProjects?.projectData.message || "");
        } else {
            setTerm(currentProjects?.projectData?.message ?? "");
            if (currentProjects?.projectData.data.length === 0) {
                setErrorMessage("No projects found");
                setIsError(true);
                setProjectNoError(true);
            }
        }
    }, [currentProjects, router]);

    const totalPages = currentProjects?.projectData.totalElements;

    const modifiedProjects = currentProjects?.projectData?.data?.map(
        (project) => ({
            id: project.id,
            title: project.title,
            description: project.description,
            students: project.students,
            projectType: project.projectStatus,
            userType: UserType.Admin,
            studentLimit: project.studentLimit,
            isMyProject: project.myProject,
            poster: project.poster,
            term: project.term,
            professors: project.professors,
        })
    );


    return (
        <S.StyledProjectCardListContainer>
            <ErrorDrawer
                errorMessage={errorMessage}
                isError={isError}
                handleErrorMessageClose={handleErrorMessageClose}
            />
            <ProjectListCards
                projects={modifiedProjects || []}
                title={`${term} Term Projects`}
                itemCountPerPage={itemCountPerPage}
                currentPage={currentPageProject}
                totalPages={totalPages ?? 0}
                handlePageChange={handlePageChangeProject}
                userType={UserType.Teacher}
                isError={projectNoError}
            />
        </S.StyledProjectCardListContainer >
    );
}

export default AdminAllProjectsPage;

AdminAllProjectsPage.getLayout = (page: JSX.Element) => (
    <DefaultLayout>{page}</DefaultLayout>
);

function useFetchActiveSeniorProjects(
    sessionId: string,
    pageNumber: number,
    pageSize: number
): ProjectState | undefined {
    const [projectStateData, setProjectStateData] = useState<ProjectState>();
    useEffect(() => {
        async function fetchData() {
            try {
                const myProjectRequest = { sessionId, pageNumber, pageSize };
                await store.dispatch(fetchActiveSeniorProjects(myProjectRequest));
                const projectState = store.getState().activeSeniorProjects;
                setProjectStateData(projectState);
            } catch (error) {
                console.error("Error fetching professor projects:", error);
            }
        }
        fetchData();
    }, [sessionId, pageNumber, pageSize]);

    return projectStateData;
}
