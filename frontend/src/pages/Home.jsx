// src/pages/Home.js
// import React from 'react';

// const Home = () => {
//   return (
//     <div className="page">
//       <h1>Home Page</h1>
//       <p>Welcome to the application!</p>
//     </div>
//   );
// };

// export default Home;

// // Home.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Home.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faVideo, faImage, faNewspaper, faEllipsisH } from '@fortawesome/free-solid-svg-icons';

// const Home = () => {
//   const posts = [
//     {
//       id: 1,
//       user: 'SGR Knowledge Foundation',
//       followers: '287 followers',
//       time: '42m • 😊',
//       content: 'An Evening of Grace & Inner Awakening',
//       details: 'We are honoured to host Jaya Kishori Ji for the G H Raisoni Memorial Talk …more',
//       event: {
//         title: 'G H RAISONI MEMORIAL TALK',
//         description: 'Featuring the inspiring presence of Jaya Kishori Ji in "You Are Enough: Confidence. Character & the Quiet Revolution Within"'
//       }
//     },
//     {
//       id: 2,
//       user: 'riya',
//       content: 'Built a new portfolio in React',
//       image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFKMVsB3JItIUX-GQrUha5aq42mLal9vr5ag&s',
//       likes: 24,
//       comments: 5,
//       time: '2h ago'
//     },
//     {
//       id: 2,
//       user: 'aman',
//       content: 'CSS Grid is magical. Try it',
//       image: 'https://miro.medium.com/v2/resize:fit:3608/0*og90_m1gsg9iOY7i.png',
//       likes: 42,
//       comments: 12,
//       time: '5h ago'
//     }

//   ];

//   const newsItems = [
//     { title: 'ReactJS', time: '3h ago • 127,384 readers' },
//     { title: 'Private equity eyes tech deals', time: '16h ago • 696 readers' },
//     { title: 'Indian startups shine on global list', time: '16h ago • 652 readers' },
//     { title: 'More Indians tune into smart TVs', time: '16h ago • 313 readers' },
//     { title: 'Motorsports ready to rev up', time: '16h ago • 270 readers' }
//   ];

//   const puzzles = [
//     { name: 'Java', played: '12 connections played' },
//     { name: 'Tango #255', played: '6 connections played' },
//     { name: 'Queens #415', played: '5 connections played' }
//   ];

//   return (
//     <div className="linkedin-container">
//       <div className="main-content">
//         {/* Left Sidebar */}
//         <aside className="left-sidebar">
//           <div className="profile-card">
//             <div className="profile-banner"></div>
//             <div className="profile-info">
//               <div className="profile-pic">RW</div>
//               <h2>Rashmi Wankhede</h2>
//               <p>Fresher | Java full stack developer | SQL</p>
//               <p className="location">Mumbai, Maharashtra</p>
//             </div>
//             <div className="saved-items">
//               <h3></h3>
//               <ul>
//                 <li><Link to="/industry" className="sidebar-link">Industry</Link></li>
//                 <li><Link to="/industry/project" className="sidebar-link">Industry Project</Link></li>
//                 <li><Link to="/alumni" className="sidebar-link">Alumni</Link></li>
//                 <li><Link to="/startup" className="sidebar-link">Startup</Link></li>
//                 <li><Link to="/college" className="sidebar-link">College</Link></li>
//                 <li><Link to="/industryprofile" className="sidebar-link">Industry Profile</Link></li>
//                 <li><Link to="/CollegeProfile" className="sidebar-link">College Profile</Link></li>
//               </ul>
//             </div>
//           </div>
//         </aside>

//         {/* Main Feed */}
//         <main className="feed">
//           <div className="create-post">
//             <div className="post-input">
//               <div className="profile-pic-small">RW</div>
//               <input type="text" placeholder="Start a post" />
//             </div>
//             <div className="post-options">
//               <button><FontAwesomeIcon icon={faImage} /> Photo</button>
//               <button><FontAwesomeIcon icon={faVideo} /> Video</button>
//               <button><FontAwesomeIcon icon={faNewspaper} /> Write article</button>
//             </div>
//           </div>

//           {posts.map(post => (
//   <div className="post-card" key={post.id}>
//     <div className="post-header">
//       <div className="poster-info">
//         <div className="profile-pic-small">{post.user.charAt(0)}</div>
//         <div>
//           <h4>{post.user}</h4>
//           <p className="post-meta">{post.followers} • {post.time}</p>
//         </div>
//       </div>
//       <button className="more-options"><FontAwesomeIcon icon={faEllipsisH} /></button>
//     </div>
//     <div className="post-content">
//       <p>{post.content}</p>
//       <p className="post-details">{post.details}</p>
//       {post.image && (
//         <img
//           src={post.image}
//           alt="Post content"
//           style={{
//             width: '100%',
//             maxHeight: '400px',
//             objectFit: 'cover',
//             borderRadius: '8px',
//             marginTop: '12px'
//           }}
//         />
//       )}
//       {post.event && (
//         <div className="event-card">
//           <h4>{post.event.title}</h4>
//           <p>{post.event.description}</p>
//         </div>
//       )}
//     </div>
//   </div>
// ))}
//         </main>

//         {/* Right Sidebar */}
//         <aside className="right-sidebar">
//           <div className="news-card">
//             <h3>News Related to project</h3>
//             <ul className="news-list">
//               {newsItems.map((item, index) => (
//                 <li key={index}>
//                   <p>{item.title}</p>
//                   <span>{item.time}</span>
//                 </li>
//               ))}
//             </ul>
//             <button className="show-more">Show more ▼</button>
//           </div>

//           <div className="puzzles-card">
//             <h3>Today's puzzles</h3>
//             <ul className="puzzles-list">
//               {puzzles.map((puzzle, index) => (
//                 <li key={index}>
//                   <span className="puzzle-name">{puzzle.name}</span>
//                   <span className="puzzle-played">{puzzle.played}</span>
//                 </li>
//               ))}
//             </ul>
//             <button className="show-more">Show more ▼</button>
//           </div>

//           {/* <div className="premium-message">
//             <p>Rashmi, rescheek your Premium Message</p>
//           </div> */}
//         </aside>
//       </div>
//     </div>
//   );
// };

import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../contexts/AuthContext";
import apiService from "../services/apiService";
import PostCreator from "../components/student/PostCreator";
import AllPostsFeed from "../components/common/AllPostsFeed";

import {
  faIndustry,
  faUserGraduate,
  faRocket,
  faSchool,
  faUser,
  faCubes,
  faNewspaper,
  faHome,
  faUserFriends,
  faBriefcase,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import instustryapiService from "../services/industryapiservices";

const Home = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeTab, setActiveTab] = useState("home");
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { user, isAuthenticated } = useAuth();

  const refreshAllPostsRef = useRef(null);

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchUserProfile();
    } else {
      setIsLoading(false);
      setUserProfile({
        firstName: "Guest",
        lastName: "User",
        email: "",
        role: "guest",
        profilePicture: null,
      });
    }
  }, [isAuthenticated, user]);

  const fetchUserProfile = async () => {
    try {
      setIsLoading(true);
      let response;

      if (user?.role === "student" && user?.id) {
        response = await apiService.getStudentProfile(user.id);
      } else if (user?.role === "college" && user?.id) {
        response = await apiService.getCollegeProfile(user.id);
      } else if (user?.role === "alumni" && user?.id) {
        response = await apiService.getAlumniProfile(user.id);
      } else if (user?.role === "industry" && user?.id) {
        response = await instustryapiService.getIndustryProfile(user.id);
      } else if (user?.role === "startup" && user?.id) {
        response = await apiService.getStartupProfile(user.id);
      }

      if (response?.success && response?.data) {
        const data = response.data;

        const mappedData = {
          id: data.id,
          firstName: data.firstName || data.name || "",
          lastName: data.lastName || "",
          headline:
            data.headline ||
            (user.role === "college"
              ? "College Partner"
              : user.role.charAt(0).toUpperCase() + user.role.slice(1)),
          location:
            data.location || data.city || data.state || "Location not set",
          about: data.about || data.description || "",
          profilePicture: data.profilePicture || data.logo || null,
          role: user.role,
          email: data.email || user.email,
        };

        setUserProfile(mappedData);
      } else {
        setFallbackProfile();
      }
    } catch (error) {
      if (import.meta.env.NODE_ENV !== "production") {
        console.error("❌ fetchUserProfile error:", error);
      }
      setFallbackProfile();
    } finally {
      setIsLoading(false);
    }
  };

  const setFallbackProfile = () => {
    const fallback = {
      firstName: user?.first_name || user?.firstName || "Guest",
      lastName: user?.last_name || user?.lastName || "User",
      email: user?.email || "",
      role: user?.role || "guest",
      profilePicture: user?.avatar || user?.profile_picture || null,
      city: user?.city || "",
      country: user?.country || "",
      student_college_name: user?.college || user?.collegeName || "",
    };
    setUserProfile(fallback);
  };

  const handlePostCreated = () => {
    if (refreshAllPostsRef.current) {
      refreshAllPostsRef.current();
    } else {
      setRefreshTrigger((prev) => prev + 1);
    }
  };

  const handleRefreshReady = (refreshFunction) => {
    refreshAllPostsRef.current = refreshFunction;
  };

  const getUserDisplayName = () => {
    if (!userProfile) return "Guest User";
    const first = userProfile.firstName || "";
    const last = userProfile.lastName || "";
    const full = `${first} ${last}`.trim();
    return full || userProfile.email?.split("@")[0] || "Guest User";
  };

  const getUserBio = () => {
    if (!userProfile?.role) return "Welcome to the platform!";

    if (userProfile.headline) return userProfile.headline;

    const college = userProfile.student_college_name;
    const field = userProfile.interested_field;

    if (college && field) return `${field} at ${college}`;
    if (college) return `Student at ${college}`;
    if (field) return field;

    if (userProfile.about) {
      return (
        userProfile.about.substring(0, 100) +
        (userProfile.about.length > 100 ? "..." : "")
      );
    }

    if (userProfile.role === "student" && userProfile.skills?.length) {
      const skills = userProfile.skills
        .slice(0, 3)
        .map((s) => (typeof s === "object" ? s.skill_name : s))
        .join(" | ");
      return `Student | ${skills}`;
    }

    return userProfile.role.charAt(0).toUpperCase() + userProfile.role.slice(1);
  };

  const getUserLocation = () => {
    return user?.location || "Location not set";
  };

  const getUserAvatar = () => {
    if (userProfile?.profilePicture) {
      if (userProfile.profilePicture.startsWith("http")) {
        return userProfile.profilePicture;
      }
      const baseUrl = `${import.meta.env.VITE_API_BASE_URL}`;
      const path = userProfile.profilePicture.startsWith("/")
        ? userProfile.profilePicture
        : `${userProfile.profilePicture}`;
      return `${baseUrl}${path}`;
    }
    const name = getUserDisplayName();
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=0d8abc&color=fff&size=100`;
  };

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const newsItems = [
    { title: "ReactJS", time: "3h ago • 127,384 readers" },
    { title: "Private equity eyes tech deals", time: "16h ago • 696 readers" },
  ];

  const puzzles = [
    { name: "Java", played: "12 connections played" },
    { name: "Tango #255", played: "6 connections played" },
  ];

  if (isLoading) {
    return <div className="loading-screen">Loading user profile...</div>;
  }

  return (
    <div className="linkedin-container">
      {/* Mobile Search Header */}
      <div className="mobile-search-header">
        <input
          type="text"
          className="mobile-search-input"
          placeholder="Search"
        />
      </div>

      <div className="main-content">
        {/* Left Sidebar */}
        {showSidebar && (
          <nav>
            <aside className="left-nav-sidebar">
              <div className="quick-links">
                <div className="profile-banner-linkedin"></div>
                <div className="profile-img-circle">
                  <img
                    src={getUserAvatar()}
                    alt={getUserDisplayName()}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        getUserDisplayName()
                      )}&background=0d8abc&color=fff&size=100`;
                    }}
                  />
                </div>

                <div className="profile-details-text">
                  <h2>{getUserDisplayName()}</h2>
                  <p>{getUserBio()}</p>
                  <p className="location">{getUserLocation()}</p>

                  {isAuthenticated && userProfile?.role === "student" ? (
                    <Link to="/student/profile">
                      <button className="experience-dotted-btn">
                        + Update Profile
                      </button>
                    </Link>
                  ) : !isAuthenticated ? (
                    <Link to="/auth/login">
                      <button className="experience-dotted-btn">Login</button>
                    </Link>
                  ) : null}
                </div>

                <ul>
                  {isAuthenticated ? (
                    <>
                      {userProfile?.role === "student" && (
                        <li>
                          <Link to="/student/profile">
                            <FontAwesomeIcon icon={faUser} /> My Profile
                          </Link>
                        </li>
                      )}
                      <li>
                        <Link to="/college">
                          <FontAwesomeIcon icon={faSchool} /> College
                        </Link>
                      </li>
                      <li>
                        <Link to="/alumni">
                          <FontAwesomeIcon icon={faUserGraduate} /> Alumni
                        </Link>
                      </li>
                      <li>
                        <Link to="/industry">
                          <FontAwesomeIcon icon={faIndustry} /> Industry
                        </Link>
                      </li>
                      <li>
                        <Link to="/startup">
                          <FontAwesomeIcon icon={faRocket} /> Startup
                        </Link>
                      </li>
                      <li>
                        <Link to="/projects">
                          <FontAwesomeIcon icon={faCubes} /> Projects
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link to="/auth/login">
                          <FontAwesomeIcon icon={faUser} /> Login
                        </Link>
                      </li>
                      <li>
                        <Link to="/auth/register">
                          <FontAwesomeIcon icon={faUserGraduate} /> Register
                        </Link>
                      </li>
                      <li>
                        <Link to="/college">
                          <FontAwesomeIcon icon={faSchool} /> Browse Colleges
                        </Link>
                      </li>
                      <li>
                        <Link to="/industry">
                          <FontAwesomeIcon icon={faIndustry} /> Browse
                          Industries
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </aside>
          </nav>
        )}

        {/* Feed Section */}
        <main className="feed">
          <PostCreator onPostCreated={handlePostCreated} />
          <AllPostsFeed
            refreshTrigger={refreshTrigger}
            onRefreshReady={handleRefreshReady}
          />
        </main>

        {/* Right Sidebar */}
        <aside className="right-sidebar">
          <div className="news-card">
            <h3>News</h3>
            <ul className="news-list">
              {newsItems.map((item, i) => (
                <li key={i}>
                  <p>{item.title}</p>
                  <span>{item.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="puzzles-card">
            <h3>Puzzles</h3>
            <ul className="puzzles-list">
              {puzzles.map((p, i) => (
                <li key={i}>
                  <span className="puzzle-name">{p.name}</span>
                  <span className="puzzle-played">{p.played}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="mobile-nav">
        <div className="mobile-nav-items">
          <Link
            to="/"
            className={`mobile-nav-item ${
              activeTab === "home" ? "active" : ""
            }`}
            onClick={() => setActiveTab("home")}
          >
            <FontAwesomeIcon icon={faHome} className="mobile-nav-icon" />
            <span>Home</span>
          </Link>
          <Link
            to="/network"
            className={`mobile-nav-item ${
              activeTab === "network" ? "active" : ""
            }`}
            onClick={() => setActiveTab("network")}
          >
            <FontAwesomeIcon icon={faUserFriends} className="mobile-nav-icon" />
            <span>Network</span>
          </Link>
          <Link
            to="/post"
            className={`mobile-nav-item ${
              activeTab === "post" ? "active" : ""
            }`}
            onClick={() => setActiveTab("post")}
          >
            <FontAwesomeIcon icon={faNewspaper} className="mobile-nav-icon" />
            <span>Post</span>
          </Link>
          <Link
            to="/notifications"
            className={`mobile-nav-item ${
              activeTab === "notifications" ? "active" : ""
            }`}
            onClick={() => setActiveTab("notifications")}
          >
            <FontAwesomeIcon icon={faBell} className="mobile-nav-icon" />
            <span>Notifications</span>
          </Link>
          <Link
            to="/jobs"
            className={`mobile-nav-item ${
              activeTab === "jobs" ? "active" : ""
            }`}
            onClick={() => setActiveTab("jobs")}
          >
            <FontAwesomeIcon icon={faBriefcase} className="mobile-nav-icon" />
            <span>Jobs</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
