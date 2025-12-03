import Portfolio from "./StudentPortfolioUI";
import { useParams } from "react-router-dom";

const StudentPortfolioPage = () => {
  const { username } = useParams();
  return (
    <div id="resume-content">
      <Portfolio username={username} />
    </div>
  );
};

export default StudentPortfolioPage;
