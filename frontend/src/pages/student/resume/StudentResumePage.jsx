import StudentResumeUi from "./resumeComponents/StudentResumeUi";

import { useParams } from "react-router-dom";

const StudentResumePage = () => {
  const { username } = useParams();
  return (
    <div id="resume-content">
      <StudentResumeUi username={username} />
    </div>
  );
};

export default StudentResumePage;
