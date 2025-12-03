import React from "react";
import IndustryOverview from "./sections/IndustryOverview";
import SectorCategory from "./sections/SectorCategory";
import JobCareerOpportunities from "./sections/JobCareerOpportunities";
import Technology from "./sections/Technology";
import ChallengesSolutions from "./sections/ChallengesSolutions";
import SuccessStories from "./sections/SuccessStories";
import PostNewsJobs from "./sections/PostNewsJobs";
import ExpertOpinionsInterview from "./sections/ExpertOpinionsInterview";
import PollCommentSection from "./sections/PollCommentSection";
import InternshipTrainingRequests from "./sections/InternshipTrainingRequests";
import LiveProjects from "./sections/LiveProjects";
import StudentLogin from "./sections/StudentLogin";
import ProjectSuccessStories from "./sections/ProjectSuccessStories";
import UploadProject from "./sections/UploadProject";
import AddUniversityProject from "./sections/AddUniversityProject";

const ContentRenderer = ({
  activeContent,
  activeContentName,
  isOwner,
  industryData,
}) => {
  const renderContent = () => {
    switch (activeContent) {
      case "industry-overview":
        return (
          <IndustryOverview isOwner={isOwner} industryData={industryData} />
        );
      case "sector-category":
        return <SectorCategory isOwner={isOwner} industryData={industryData} />;
      case "job-career-opportunities":
        return (
          <JobCareerOpportunities
            isOwner={isOwner}
            industryData={industryData}
          />
        );
      case "technology":
        return <Technology isOwner={isOwner} industryData={industryData} />;
      case "challenges-solutions":
        return (
          <ChallengesSolutions isOwner={isOwner} industryData={industryData} />
        );
      case "success-stories":
        return <SuccessStories isOwner={isOwner} industryData={industryData} />;
      case "post-news-jobs":
        return <PostNewsJobs isOwner={isOwner} industryData={industryData} />;
      case "expert-opinions-interview":
        return (
          <ExpertOpinionsInterview
            isOwner={isOwner}
            industryData={industryData}
          />
        );
      case "poll-comment-section":
        return (
          <PollCommentSection isOwner={isOwner} industryData={industryData} />
        );
      case "internship-training-requests":
        return (
          <InternshipTrainingRequests
            isOwner={isOwner}
            industryData={industryData}
          />
        );
      case "live-projects":
        return <LiveProjects isOwner={isOwner} industryData={industryData} />;
      case "student-login":
        return <StudentLogin isOwner={isOwner} industryData={industryData} />;
      case "project-success-stories":
        return (
          <ProjectSuccessStories
            isOwner={isOwner}
            industryData={industryData}
          />
        );
      case "upload-project":
        return isOwner ? (
          <UploadProject isOwner={isOwner} industryData={industryData} />
        ) : (
          <p>You do not have permission to upload projects.</p>
        );
      case "add-university-project":
        return isOwner ? (
          <AddUniversityProject isOwner={isOwner} industryData={industryData} />
        ) : (
          <p>You do not have permission to add university projects.</p>
        );
      default:
        return (
          <div className="p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {activeContentName}
            </h2>
            <p className="text-gray-600">
              Content for {activeContentName} is coming soon!
            </p>
          </div>
        );
    }
  };

  return <div className="min-h-[400px]">{renderContent()}</div>;
};

export default ContentRenderer;
