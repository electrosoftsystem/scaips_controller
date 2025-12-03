// src/pages/Profile.js
// import React from 'react';

// const Profile = () => {
//   return (
//     <div className="page">
//       <h1>Profile</h1>
//       <p>This is your profile page.</p>
//     </div>
//   );
// };

// export default Profile;

// import React, { useState } from 'react';
// import './ProfilePage.css';

// const ProfilePage = () => {
//   // Profile picture URL
//   const profilePicUrl = "https://static.vecteezy.com/system/resources/thumbnails/007/209/020/small_2x/close-up-shot-of-happy-dark-skinned-afro-american-woman-laughs-positively-being-in-good-mood-dressed-in-black-casual-clothes-isolated-on-grey-background-human-emotions-and-feeligs-concept-photo.jpg";

//   // State for education modal
//   const [showEducationModal, setShowEducationModal] = useState(false);
//   const [educationData, setEducationData] = useState({
//     school: 'Government Polytechnic',
//     degree: 'Diploma',
//     field: 'Computer Engineering',
//     grade: '',
//     activities: '',
//     description: '',
//     startMonth: '',
//     startYear: '',
//     endMonth: '',
//     endYear: '',
//     notifyNetwork: true
//   });

//   const months = [
//     'January', 'February', 'March', 'April', 'May', 'June',
//     'July', 'August', 'September', 'October', 'November', 'December'
//   ];
//   const currentYear = new Date().getFullYear();
//   const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEducationData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleCheckboxChange = (e) => {
//     const { name, checked } = e.target;
//     setEducationData(prev => ({ ...prev, [name]: checked }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setShowEducationModal(false);
//     // Save education data here
//   };

//   return (
//     <div className="profile-container">
//       {/* Header Section */}
//       <div className="profile-header">
//         <div className="cover-photo"></div>
//         <div className="profile-info">
//           <div className="profile-pic">
//             <img
//               src={profilePicUrl}
//               alt="Priya P"
//               className="profile-image"
//               onError={(e) => {
//                 e.target.onerror = null;
//                 e.target.src = 'https://via.placeholder.com/150'; // Fallback image
//               }}
//             />
//           </div>
//           <div className="profile-details">
//             <h1>Priya P</h1>
//             <p className="headline">Computer Engineering</p>
//             <p className="location">Jalgaon, Maharashtra, India • Contact info</p>
//             <button className="open-to-btn">Open to</button>
//           </div>
//         </div>
//       </div>

//       {/* Navigation */}
//       <nav className="profile-nav">
//         <button className="active">About</button>
//         <button>Activity</button>
//         <button>Experience</button>
//         <button onClick={() => setShowEducationModal(true)}>Education</button>
//         <button>Skills</button>
//         <button>Recommendations</button>
//       </nav>

//       {/* Main Content */}
//       <div className="profile-content">
//         {/* Left Column */}
//         <div className="left-column">
//           {/* About Section */}
//           <div className="card about-section">
//             <h2>About</h2>
//             <p>Aboard/industrial organization</p>
//             <button className="show-btn">Show more</button>
//           </div>

//           {/* Education Section */}
//           <div className="card education-section" onClick={() => setShowEducationModal(true)} style={{ cursor: 'pointer' }}>
//             <h2>Education</h2>
//             <div className="education-item">
//               <h3>{educationData.school}</h3>
//               <p>{educationData.degree} in {educationData.field}</p>
//               <p>Jalgaon, Maharashtra, India</p>
//             </div>
//           </div>

//           {/* Skills Section */}
//           <div className="card skills-section">
//             <h2>Skills</h2>
//             <div className="skills-list">
//               <span className="skill-tag">Web Development</span>
//               <span className="skill-tag">JavaScript</span>
//               <span className="skill-tag">React</span>
//               <span className="skill-tag">HTML/CSS</span>
//             </div>
//           </div>

//           {/* Languages Section */}
//           <div className="card languages-section">
//             <h2>Languages</h2>
//             <p>English</p>
//           </div>
//         </div>

//         {/* Right Column */}
//         <div className="right-column">
//           {/* Open To Section */}
//           <div className="card open-to-section">
//             <div className="section-header">
//               <h3>Open to</h3>
//               <button className="edit-btn">Edit</button>
//             </div>
//             <p>Web Developer roles</p>
//             <div className="action-buttons">
//               <button className="action-btn">Add profile section</button>
//               <button className="action-btn">Enhance profile</button>
//             </div>
//           </div>

//           {/* Analytics Section */}
//           <div className="card analytics-section">
//             <div className="section-header">
//               <h3>Analytics</h3>
//               <span className="private">Private to you</span>
//             </div>
//             <p>80 profile views</p>
//             <p>Discover who's viewed your profile</p>
//           </div>

//           {/* Resources Section */}
//           <div className="card resources-section">
//             <h3>Resources</h3>
//             <p>Tell non-profits you're interested in getting involved with your time and skills</p>
//             <button className="get-started-btn">Get started</button>
//           </div>

//           {/* Premium Section */}
//           <div className="card premium-section">
//             <h3>Invest in your future</h3>
//             <p>Enjoy 50% off 2 months of LinkedIn Premium!</p>
//             <button className="premium-btn">Get 50% off today</button>
//           </div>
//         </div>
//       </div>

//       {/* Education Modal */}
//       {showEducationModal && (
//         <div className="modal-overlay">
//           <div className="education-modal">
//             <div className="modal-header">
//               <h2>Add education</h2>
//               <button className="close-btn" onClick={() => setShowEducationModal(false)}>
//                 &times;
//               </button>
//             </div>

//             <form onSubmit={handleSubmit}>
//               <div className="form-section">
//                 <div className="checkbox-group">
//                   <input
//                     type="checkbox"
//                     id="notifyNetwork"
//                     name="notifyNetwork"
//                     checked={educationData.notifyNetwork}
//                     onChange={handleCheckboxChange}
//                   />
//                   <label htmlFor="notifyNetwork">
//                     Turn on to notify your network of key profile changes (such as new education) and work anniversaries.
//                     <span className="learn-more"> Learn more about sharing profile changes.</span>
//                   </label>
//                 </div>
//                 <p className="required-note">* Indicates required</p>
//               </div>

//               <div className="form-section">
//                 <div className="form-group">
//                   <label htmlFor="school">School*</label>
//                   <input
//                     type="text"
//                     id="school"
//                     name="school"
//                     value={educationData.school}
//                     onChange={handleInputChange}
//                     placeholder="Ex: Government Polytechnic"
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="degree">Degree</label>
//                   <input
//                     type="text"
//                     id="degree"
//                     name="degree"
//                     value={educationData.degree}
//                     onChange={handleInputChange}
//                     placeholder="Ex: Diploma"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="field">Field of study</label>
//                   <input
//                     type="text"
//                     id="field"
//                     name="field"
//                     value={educationData.field}
//                     onChange={handleInputChange}
//                     placeholder="Ex: Computer Engineering"
//                   />
//                 </div>

//                 <div className="form-row">
//                   <div className="form-group">
//                     <label>Start date</label>
//                     <div className="date-inputs">
//                       <select
//                         name="startMonth"
//                         value={educationData.startMonth}
//                         onChange={handleInputChange}
//                       >
//                         <option value="">Month</option>
//                         {months.map((month, i) => (
//                           <option key={i} value={month}>{month}</option>
//                         ))}
//                       </select>
//                       <select
//                         name="startYear"
//                         value={educationData.startYear}
//                         onChange={handleInputChange}
//                       >
//                         <option value="">Year</option>
//                         {years.map(year => (
//                           <option key={year} value={year}>{year}</option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>

//                   <div className="form-group">
//                     <label>End date (or expected)</label>
//                     <div className="date-inputs">
//                       <select
//                         name="endMonth"
//                         value={educationData.endMonth}
//                         onChange={handleInputChange}
//                       >
//                         <option value="">Month</option>
//                         {months.map((month, i) => (
//                           <option key={i} value={month}>{month}</option>
//                         ))}
//                       </select>
//                       <select
//                         name="endYear"
//                         value={educationData.endYear}
//                         onChange={handleInputChange}
//                       >
//                         <option value="">Year</option>
//                         {years.map(year => (
//                           <option key={year} value={year}>{year}</option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="form-section">
//                 <h3>Grade</h3>
//                 <div className="form-group">
//                   <input
//                     type="text"
//                     name="grade"
//                     value={educationData.grade}
//                     onChange={handleInputChange}
//                     placeholder="Ex: 8.5 CGPA"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label>Activities and societies</label>
//                   <textarea
//                     name="activities"
//                     value={educationData.activities}
//                     onChange={handleInputChange}
//                     placeholder="Ex: Coding Club, Sports Team"
//                   />
//                 </div>
//               </div>

//               <div className="form-section">
//                 <h3>Description</h3>
//                 <p className="hint-text">We recommend adding your top 5 used in this experience. They'll also appear in your Skills section.</p>
//                 <div className="form-group">
//                   <textarea
//                     name="description"
//                     value={educationData.description}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//                 <button type="button" className="add-skill-btn">
//                   + Add skill
//                 </button>
//               </div>

//               <div className="modal-actions">
//                 <button type="button" className="cancel-btn" onClick={() => setShowEducationModal(false)}>
//                   Cancel
//                 </button>
//                 <button type="submit" className="save-btn">
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfilePage;

// import React, { useState } from 'react';
// import './ProfilePage.css';

// const ProfilePage = () => {
//   // Profile picture URL
//   const profilePicUrl = "https://static.vecteezy.com/system/resources/thumbnails/007/209/020/small_2x/close-up-shot-of-happy-dark-skinned-afro-american-woman-laughs-positively-being-in-good-mood-dressed-in-black-casual-clothes-isolated-on-grey-background-human-emotions-and-feeligs-concept-photo.jpg";

//   // State for education modal
//   const [showEducationModal, setShowEducationModal] = useState(false);
//   const [educationData, setEducationData] = useState({
//     school: 'Government Polytechnic',
//     degree: 'Diploma',
//     field: 'Computer Engineering',
//     grade: '',
//     activities: '',
//     description: '',
//     startMonth: '',
//     startYear: '',
//     endMonth: '',
//     endYear: '',
//     notifyNetwork: true
//   });

//   // State for experience modal
//   const [showExperienceModal, setShowExperienceModal] = useState(false);
//   const [experienceData, setExperienceData] = useState({
//     title: '',
//     company: '',
//     employmentType: 'Full-time',
//     currentlyWorking: false,
//     startMonth: '',
//     startYear: '',
//     endMonth: '',
//     endYear: '',
//     location: '',
//     description: '',
//     notifyNetwork: true
//   });

//   // State for skill modal
//   const [showSkillModal, setShowSkillModal] = useState(false);
//   const [skillInput, setSkillInput] = useState('');
//   const [skills, setSkills] = useState(['Web Development', 'JavaScript', 'React', 'HTML/CSS']);

//   // State for project modal
//   const [showProjectModal, setShowProjectModal] = useState(false);
//   const [projects, setProjects] = useState([
//     {
//       id: 1,
//       title: 'E-commerce Website',
//       description: 'Developed a full-stack e-commerce platform with React and Node.js',
//       date: 'May 2024',
//       url: 'https://github.com/username/ecommerce'
//     }
//   ]);
//   const [newProject, setNewProject] = useState({
//     title: '',
//     description: '',
//     date: '',
//     url: ''
//   });

//   // State for course modal
//   const [showCourseModal, setShowCourseModal] = useState(false);
//   const [courses, setCourses] = useState([
//     {
//       id: 1,
//       name: 'Advanced React',
//       institution: 'Udemy',
//       completionDate: 'April 2024'
//     }
//   ]);
//   const [newCourse, setNewCourse] = useState({
//     name: '',
//     institution: '',
//     completionDate: ''
//   });

//   // State for certification modal
//   const [showCertificationModal, setShowCertificationModal] = useState(false);
//   const [certifications, setCertifications] = useState([
//     {
//       id: 1,
//       name: 'AWS Certified Developer',
//       issuer: 'Amazon Web Services',
//       date: 'March 2024',
//       credentialId: 'AWS123456'
//     }
//   ]);
//   const [newCertification, setNewCertification] = useState({
//     name: '',
//     issuer: '',
//     date: '',
//     credentialId: ''
//   });

//   // State for recommendation modal
//   const [showRecommendationModal, setShowRecommendationModal] = useState(false);
//   const [recommendations, setRecommendations] = useState([
//     {
//       id: 1,
//       text: 'Priya is an excellent developer with strong problem-solving skills.',
//       name: 'Rajesh Kumar',
//       position: 'Senior Developer at Tech Solutions',
//       relation: 'Worked together on multiple projects',
//       date: 'June 2024'
//     }
//   ]);

//   const months = [
//     'January', 'February', 'March', 'April', 'May', 'June',
//     'July', 'August', 'September', 'October', 'November', 'December'
//   ];
//   const currentYear = new Date().getFullYear();
//   const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

//   // Suggested skills based on profile
//   const suggestedSkills = [
//     { category: 'Frontend', skills: ['React.js', 'Git', 'AngularJS', 'Databases', 'Software Development'] },
//     { category: 'Programming', skills: ['Data Structures', 'C#', 'Object-Oriented Programming (OOP)'] },
//     { category: 'Web', skills: ['Responsive Web Design', 'Web Development'] }
//   ];

//   // Common input change handler
//   const handleInputChange = (e, setter) => {
//     const { name, value, type, checked } = e.target;
//     setter(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleEducationSubmit = (e) => {
//     e.preventDefault();
//     console.log("Education data saved:", educationData);
//     setShowEducationModal(false);
//   };

//   const handleExperienceSubmit = (e) => {
//     e.preventDefault();
//     console.log("Experience data saved:", experienceData);
//     setShowExperienceModal(false);
//   };

//   const handleSkillSubmit = (e) => {
//     e.preventDefault();
//     if (skillInput.trim() && !skills.includes(skillInput)) {
//       setSkills([...skills, skillInput]);
//     }
//     setShowSkillModal(false);
//     setSkillInput('');
//   };

//   const handleProjectSubmit = (e) => {
//     e.preventDefault();
//     setProjects([...projects, {
//       ...newProject,
//       id: projects.length + 1
//     }]);
//     setNewProject({
//       title: '',
//       description: '',
//       date: '',
//       url: ''
//     });
//     setShowProjectModal(false);
//   };

//   const handleCourseSubmit = (e) => {
//     e.preventDefault();
//     setCourses([...courses, {
//       ...newCourse,
//       id: courses.length + 1
//     }]);
//     setNewCourse({
//       name: '',
//       institution: '',
//       completionDate: ''
//     });
//     setShowCourseModal(false);
//   };

//   const handleCertificationSubmit = (e) => {
//     e.preventDefault();
//     setCertifications([...certifications, {
//       ...newCertification,
//       id: certifications.length + 1
//     }]);
//     setNewCertification({
//       name: '',
//       issuer: '',
//       date: '',
//       credentialId: ''
//     });
//     setShowCertificationModal(false);
//   };

//   return (
//     <div className="profile-container">
//       {/* Header Section */}
//       <div className="profile-header">
//         <div className="cover-photo"></div>
//         <div className="profile-info">
//           <div className="profile-pic">
//             <img
//               src={profilePicUrl}
//               alt="Profile"
//               className="profile-image"
//               onError={(e) => {
//                 e.target.onerror = null;
//                 e.target.src = 'https://via.placeholder.com/150';
//               }}
//             />
//           </div>
//           <div className="profile-details">
//             <h1>Priya P</h1>
//             <p className="headline">Computer Engineering</p>
//             <p className="location">Jalgaon, Maharashtra, India • Contact info</p>
//             <button className="open-to-btn">Open to</button>
//           </div>
//         </div>
//       </div>

//       {/* Navigation */}
//       <nav className="profile-nav">
//         <button className="active">About</button>
//         <button>Activity</button>
//         <button onClick={() => {
//           setExperienceData({
//             title: '',
//             company: '',
//             employmentType: 'Full-time',
//             currentlyWorking: false,
//             startMonth: '',
//             startYear: '',
//             endMonth: '',
//             endYear: '',
//             location: '',
//             description: '',
//             notifyNetwork: true
//           });
//           setShowExperienceModal(true);
//         }}>Experience</button>
//         <button onClick={() => setShowEducationModal(true)}>Education</button>
//         <button onClick={() => setShowSkillModal(true)}>Skills</button>
//         <button>Recommendations</button>
//       </nav>

//       {/* Main Content */}
//       <div className="profile-content">
//         {/* Left Column */}
//         <div className="left-column">
//           {/* About Section */}
//           <div className="card about-section">
//             <h2>About</h2>
//             <p>Aboard/industrial organization</p>
//             <button className="show-btn">Show more</button>
//           </div>

//           {/* Experience Section */}
//           <div
//             className="card experience-section"
//             onClick={() => {
//               setExperienceData({
//                 title: 'Web Developer',
//                 company: 'Passion Software Solutions',
//                 employmentType: 'Internship',
//                 currentlyWorking: false,
//                 startMonth: 'June',
//                 startYear: '2024',
//                 endMonth: '',
//                 endYear: '',
//                 location: 'Jalgaon, Maharashtra, India',
//                 description: 'During my 6-week internship at Passion Software, I had the opportunity to contribute to various web development projects.',
//                 notifyNetwork: true
//               });
//               setShowExperienceModal(true);
//             }}
//           >
//             <h2>Experience</h2>
//             <div className="experience-item">
//               <h3>Web Developer</h3>
//               <p>Passion Software Solutions • Internship</p>
//               <p>June 2024 - Present</p>
//               <p>Jalgaon, Maharashtra, India</p>
//             </div>
//           </div>

//           {/* Education Section */}
//           <div
//             className="card education-section"
//             onClick={() => setShowEducationModal(true)}
//           >
//             <h2>Education</h2>
//             <div className="education-item">
//               <h3>{educationData.school}</h3>
//               <p>{educationData.degree} in {educationData.field}</p>
//               <p>Jalgaon, Maharashtra, India</p>
//             </div>
//           </div>

//           {/* Projects Section */}
//           <div className="card projects-section">
//             <div className="section-header">
//               <h2>Projects</h2>
//               <button
//                 className="edit-btn"
//                 onClick={() => setShowProjectModal(true)}
//               >
//                 Add Project
//               </button>
//             </div>

//             {projects.length > 0 ? (
//               projects.map(project => (
//                 <div key={project.id} className="project-item">
//                   <h3>{project.title}</h3>
//                   <p className="project-date">{project.date}</p>
//                   <p className="project-description">{project.description}</p>
//                   {project.url && (
//                     <a href={project.url} target="_blank" rel="noopener noreferrer" className="project-link">
//                       View Project
//                     </a>
//                   )}
//                 </div>
//               ))
//             ) : (
//               <p>No projects added yet.</p>
//             )}
//           </div>

//           {/* Skills Section */}
//           <div
//             className="card skills-section"
//             onClick={() => setShowSkillModal(true)}
//           >
//             <div className="section-header">
//               <h2>Skills</h2>
//               <button className="edit-btn">Edit</button>
//             </div>
//             <div className="skills-list">
//               {skills.map((skill, index) => (
//                 <span key={index} className="skill-tag">{skill}</span>
//               ))}
//             </div>
//           </div>

//           {/* Courses Section */}
//           <div className="card courses-section">
//             <div className="section-header">
//               <h2>Courses</h2>
//               <button
//                 className="edit-btn"
//                 onClick={() => setShowCourseModal(true)}
//               >
//                 Add Course
//               </button>
//             </div>

//             {courses.length > 0 ? (
//               <ul className="courses-list">
//                 {courses.map(course => (
//                   <li key={course.id} className="course-item">
//                     <h3>{course.name}</h3>
//                     <p>{course.institution} • {course.completionDate}</p>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>No courses added yet.</p>
//             )}
//           </div>

//           {/* Certifications Section */}
//           <div className="card certifications-section">
//             <div className="section-header">
//               <h2>Licenses & Certifications</h2>
//               <button
//                 className="edit-btn"
//                 onClick={() => setShowCertificationModal(true)}
//               >
//                 Add Certification
//               </button>
//             </div>

//             {certifications.length > 0 ? (
//               certifications.map(cert => (
//                 <div key={cert.id} className="certification-item">
//                   <h3>{cert.name}</h3>
//                   <p>{cert.issuer} • Issued {cert.date}</p>
//                   {cert.credentialId && (
//                     <p className="certification-id">Credential ID: {cert.credentialId}</p>
//                   )}
//                 </div>
//               ))
//             ) : (
//               <p>No certifications added yet.</p>
//             )}
//           </div>

//           {/* Languages Section */}
//           <div className="card languages-section">
//             <h2>Languages</h2>
//             <p>English</p>
//           </div>

//           {/* Recommendations Section */}
//           <div className="card recommendations-section">
//             <div className="section-header">
//               <h2>Recommendations</h2>
//               <button
//                 className="edit-btn"
//                 onClick={() => setShowRecommendationModal(true)}
//               >
//                 Ask for a recommendation
//               </button>
//             </div>

//             {recommendations.length > 0 ? (
//               recommendations.map(rec => (
//                 <div key={rec.id} className="recommendation-item">
//                   <div className="recommendation-text">"{rec.text}"</div>
//                   <div className="recommendation-author">
//                     <strong>{rec.name}</strong> - {rec.position}
//                   </div>
//                   <div className="recommendation-details">
//                     {rec.relation} • {rec.date}
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p>No recommendations yet. Ask colleagues to write you a recommendation!</p>
//             )}
//           </div>
//         </div>

//         {/* Right Column */}
//         <div className="right-column">
//           {/* Open To Section */}
//           <div className="card open-to-section">
//             <div className="section-header">
//               <h3>Open to</h3>
//               <button className="edit-btn">Edit</button>
//             </div>
//             <p>Web Developer roles</p>
//             <div className="action-buttons">
//               <button className="action-btn">Add profile section</button>
//               <button className="action-btn">Enhance profile</button>
//             </div>
//           </div>

//           {/* Analytics Section */}
//           <div className="card analytics-section">
//             <div className="section-header">
//               <h3>Analytics</h3>
//               <span className="private">Private to you</span>
//             </div>
//             <p>80 profile views</p>
//             <p>Discover who's viewed your profile</p>
//           </div>

//           {/* Resources Section */}
//           <div className="card resources-section">
//             <h3>Resources</h3>
//             <p>Tell non-profits you're interested in getting involved with your time and skills</p>
//             <button className="get-started-btn">Get started</button>
//           </div>

//           {/* Premium Section */}
//           <div className="card premium-section">
//             <h3>Invest in your future</h3>
//             <p>Enjoy 50% off 2 months of LinkedIn Premium!</p>
//             <button className="premium-btn">Get 50% off today</button>
//           </div>
//         </div>
//       </div>

//       {/* Education Modal */}
//       {showEducationModal && (
//         <div className="modal-overlay">
//           <div className="education-modal">
//             <div className="modal-header">
//               <h2>Add education</h2>
//               <button
//                 className="close-btn"
//                 onClick={() => setShowEducationModal(false)}
//               >
//                 &times;
//               </button>
//             </div>

//             <form onSubmit={handleEducationSubmit}>
//               <div className="form-section">
//                 <div className="checkbox-group">
//                   <input
//                     type="checkbox"
//                     id="notifyNetwork"
//                     name="notifyNetwork"
//                     checked={educationData.notifyNetwork}
//                     onChange={(e) => handleInputChange(e, setEducationData)}
//                   />
//                   <label htmlFor="notifyNetwork">
//                     Turn on to notify your network of key profile changes (such as new education) and work anniversaries.
//                     <span className="learn-more"> Learn more about sharing profile changes.</span>
//                   </label>
//                 </div>
//                 <p className="required-note">* Indicates required</p>
//               </div>

//               <div className="form-section">
//                 <div className="form-group">
//                   <label htmlFor="school">School*</label>
//                   <input
//                     type="text"
//                     id="school"
//                     name="school"
//                     value={educationData.school}
//                     onChange={(e) => handleInputChange(e, setEducationData)}
//                     placeholder="Ex: Government Polytechnic"
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="degree">Degree</label>
//                   <input
//                     type="text"
//                     id="degree"
//                     name="degree"
//                     value={educationData.degree}
//                     onChange={(e) => handleInputChange(e, setEducationData)}
//                     placeholder="Ex: Diploma"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="field">Field of study</label>
//                   <input
//                     type="text"
//                     id="field"
//                     name="field"
//                     value={educationData.field}
//                     onChange={(e) => handleInputChange(e, setEducationData)}
//                     placeholder="Ex: Computer Engineering"
//                   />
//                 </div>

//                 <div className="form-row">
//                   <div className="form-group">
//                     <label>Start date</label>
//                     <div className="date-inputs">
//                       <select
//                         name="startMonth"
//                         value={educationData.startMonth}
//                         onChange={(e) => handleInputChange(e, setEducationData)}
//                       >
//                         <option value="">Month</option>
//                         {months.map((month, i) => (
//                           <option key={i} value={month}>{month}</option>
//                         ))}
//                       </select>
//                       <select
//                         name="startYear"
//                         value={educationData.startYear}
//                         onChange={(e) => handleInputChange(e, setEducationData)}
//                       >
//                         <option value="">Year</option>
//                         {years.map(year => (
//                           <option key={year} value={year}>{year}</option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>

//                   <div className="form-group">
//                     <label>End date (or expected)</label>
//                     <div className="date-inputs">
//                       <select
//                         name="endMonth"
//                         value={educationData.endMonth}
//                         onChange={(e) => handleInputChange(e, setEducationData)}
//                       >
//                         <option value="">Month</option>
//                         {months.map((month, i) => (
//                           <option key={i} value={month}>{month}</option>
//                         ))}
//                       </select>
//                       <select
//                         name="endYear"
//                         value={educationData.endYear}
//                         onChange={(e) => handleInputChange(e, setEducationData)}
//                       >
//                         <option value="">Year</option>
//                         {years.map(year => (
//                           <option key={year} value={year}>{year}</option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="form-section">
//                 <h3>Grade</h3>
//                 <div className="form-group">
//                   <input
//                     type="text"
//                     name="grade"
//                     value={educationData.grade}
//                     onChange={(e) => handleInputChange(e, setEducationData)}
//                     placeholder="Ex: 8.5 CGPA"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label>Activities and societies</label>
//                   <textarea
//                     name="activities"
//                     value={educationData.activities}
//                     onChange={(e) => handleInputChange(e, setEducationData)}
//                     placeholder="Ex: Coding Club, Sports Team"
//                   />
//                 </div>
//               </div>

//               <div className="form-section">
//                 <h3>Description</h3>
//                 <p className="hint-text">We recommend adding your top 5 used in this experience. They'll also appear in your Skills section.</p>
//                 <div className="form-group">
//                   <textarea
//                     name="description"
//                     value={educationData.description}
//                     onChange={(e) => handleInputChange(e, setEducationData)}
//                   />
//                 </div>
//                 <button type="button" className="add-skill-btn">
//                   + Add skill
//                 </button>
//               </div>

//               <div className="modal-actions">
//                 <button
//                   type="button"
//                   className="cancel-btn"
//                   onClick={() => setShowEducationModal(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button type="submit" className="save-btn">
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Experience Modal */}
//       {showExperienceModal && (
//         <div className="modal-overlay">
//           <div className="experience-modal">
//             <div className="modal-header">
//               <h2>Add experience</h2>
//               <button
//                 className="close-btn"
//                 onClick={() => setShowExperienceModal(false)}
//               >
//                 &times;
//               </button>
//             </div>

//             <form onSubmit={handleExperienceSubmit}>
//               <div className="form-section">
//                 <div className="checkbox-group">
//                   <input
//                     type="checkbox"
//                     id="exp-notifyNetwork"
//                     name="notifyNetwork"
//                     checked={experienceData.notifyNetwork}
//                     onChange={(e) => handleInputChange(e, setExperienceData)}
//                   />
//                   <label htmlFor="exp-notifyNetwork">
//                     Turn on to notify your network of key profile changes (such as new job) and work anniversaries.
//                     <span className="learn-more"> Learn more about sharing profile changes.</span>
//                   </label>
//                 </div>
//                 <p className="required-note">* Indicates required</p>
//               </div>

//               <div className="form-section">
//                 <div className="form-group">
//                   <label htmlFor="title">Title*</label>
//                   <input
//                     type="text"
//                     id="title"
//                     name="title"
//                     value={experienceData.title}
//                     onChange={(e) => handleInputChange(e, setExperienceData)}
//                     placeholder="Ex: Web Developer"
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="company">Company*</label>
//                   <input
//                     type="text"
//                     id="company"
//                     name="company"
//                     value={experienceData.company}
//                     onChange={(e) => handleInputChange(e, setExperienceData)}
//                     placeholder="Ex: Passion Software Solutions"
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="employmentType">Employment type</label>
//                   <select
//                     id="employmentType"
//                     name="employmentType"
//                     value={experienceData.employmentType}
//                     onChange={(e) => handleInputChange(e, setExperienceData)}
//                   >
//                     <option value="Full-time">Full-time</option>
//                     <option value="Part-time">Part-time</option>
//                     <option value="Internship">Internship</option>
//                     <option value="Contract">Contract</option>
//                   </select>
//                 </div>

//                 <div className="form-row">
//                   <div className="form-group">
//                     <label>Start date*</label>
//                     <div className="date-inputs">
//                       <select
//                         name="startMonth"
//                         value={experienceData.startMonth}
//                         onChange={(e) => handleInputChange(e, setExperienceData)}
//                       >
//                         <option value="">Month</option>
//                         {months.map((month, i) => (
//                           <option key={i} value={month}>{month}</option>
//                         ))}
//                       </select>
//                       <select
//                         name="startYear"
//                         value={experienceData.startYear}
//                         onChange={(e) => handleInputChange(e, setExperienceData)}
//                       >
//                         <option value="">Year</option>
//                         {years.map(year => (
//                           <option key={year} value={year}>{year}</option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>

//                   <div className="form-group">
//                     <label>End date (or expected)</label>
//                     <div className="date-inputs">
//                       <select
//                         name="endMonth"
//                         value={experienceData.endMonth}
//                         onChange={(e) => handleInputChange(e, setExperienceData)}
//                         disabled={experienceData.currentlyWorking}
//                       >
//                         <option value="">Month</option>
//                         {months.map((month, i) => (
//                           <option key={i} value={month}>{month}</option>
//                         ))}
//                       </select>
//                       <select
//                         name="endYear"
//                         value={experienceData.endYear}
//                         onChange={(e) => handleInputChange(e, setExperienceData)}
//                         disabled={experienceData.currentlyWorking}
//                       >
//                         <option value="">Year</option>
//                         {years.map(year => (
//                           <option key={year} value={year}>{year}</option>
//                         ))}
//                       </select>
//                     </div>
//                     <label className="checkbox-label">
//                       <input
//                         type="checkbox"
//                         name="currentlyWorking"
//                         checked={experienceData.currentlyWorking}
//                         onChange={(e) => handleInputChange(e, setExperienceData)}
//                       />
//                       I currently work here
//                     </label>
//                   </div>
//                 </div>
//               </div>

//               <div className="form-section">
//                 <div className="form-group">
//                   <label htmlFor="location">Location</label>
//                   <input
//                     type="text"
//                     id="location"
//                     name="location"
//                     value={experienceData.location}
//                     onChange={(e) => handleInputChange(e, setExperienceData)}
//                     placeholder="Ex: Jalgaon, Maharashtra, India"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="exp-description">Description</label>
//                   <textarea
//                     id="exp-description"
//                     name="description"
//                     value={experienceData.description}
//                     onChange={(e) => handleInputChange(e, setExperienceData)}
//                     placeholder="Describe your responsibilities and achievements"
//                   />
//                 </div>
//               </div>

//               <div className="modal-actions">
//                 <button
//                   type="button"
//                   className="cancel-btn"
//                   onClick={() => setShowExperienceModal(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button type="submit" className="save-btn">
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Skill Modal */}
//       {showSkillModal && (
//         <div className="modal-overlay">
//           <div className="skill-modal">
//             <div className="modal-header">
//               <h2>Add skill</h2>
//               <button
//                 className="close-btn"
//                 onClick={() => setShowSkillModal(false)}
//               >
//                 &times;
//               </button>
//             </div>

//             <form onSubmit={handleSkillSubmit}>
//               <div className="form-section">
//                 <p className="required-note">* Indicates required</p>
//                 <div className="form-group">
//                   <label htmlFor="skill">Skill*</label>
//                   <input
//                     type="text"
//                     id="skill"
//                     name="skill"
//                     value={skillInput}
//                     onChange={(e) => setSkillInput(e.target.value)}
//                     placeholder="Skill (ex: Project Management)"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="form-section">
//                 <h3>Suggested based on your profile</h3>
//                 <div className="suggested-skills">
//                   {suggestedSkills.map((category, index) => (
//                     <div key={index} className="skill-category">
//                       <div className="skill-category-name">{category.category}</div>
//                       <div className="skill-tags">
//                         {category.skills.map((skill, skillIndex) => (
//                           <span
//                             key={skillIndex}
//                             className="suggested-skill-tag"
//                             onClick={() => setSkillInput(skill)}
//                           >
//                             {skill}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="modal-actions">
//                 <button
//                   type="button"
//                   className="cancel-btn"
//                   onClick={() => setShowSkillModal(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button type="submit" className="save-btn">
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Project Modal */}
//       {showProjectModal && (
//         <div className="modal-overlay">
//           <div className="project-modal">
//             <div className="modal-header">
//               <h2>Add Project</h2>
//               <button
//                 className="close-btn"
//                 onClick={() => setShowProjectModal(false)}
//               >
//                 &times;
//               </button>
//             </div>

//             <form onSubmit={handleProjectSubmit}>
//               <div className="form-section">
//                 <div className="form-group">
//                   <label htmlFor="project-title">Project Name*</label>
//                   <input
//                     type="text"
//                     id="project-title"
//                     name="title"
//                     value={newProject.title}
//                     onChange={(e) => setNewProject({...newProject, title: e.target.value})}
//                     placeholder="Ex: E-commerce Website"
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="project-description">Description*</label>
//                   <textarea
//                     id="project-description"
//                     name="description"
//                     value={newProject.description}
//                     onChange={(e) => setNewProject({...newProject, description: e.target.value})}
//                     placeholder="Describe your project and your contributions"
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="project-date">Date Completed</label>
//                   <input
//                     type="text"
//                     id="project-date"
//                     name="date"
//                     value={newProject.date}
//                     onChange={(e) => setNewProject({...newProject, date: e.target.value})}
//                     placeholder="Ex: May 2024"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="project-url">Project URL</label>
//                   <input
//                     type="url"
//                     id="project-url"
//                     name="url"
//                     value={newProject.url}
//                     onChange={(e) => setNewProject({...newProject, url: e.target.value})}
//                     placeholder="Ex: https://github.com/username/project"
//                   />
//                 </div>
//               </div>

//               <div className="modal-actions">
//                 <button
//                   type="button"
//                   className="cancel-btn"
//                   onClick={() => setShowProjectModal(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button type="submit" className="save-btn">
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Course Modal */}
//       {showCourseModal && (
//         <div className="modal-overlay">
//           <div className="course-modal">
//             <div className="modal-header">
//               <h2>Add Course</h2>
//               <button
//                 className="close-btn"
//                 onClick={() => setShowCourseModal(false)}
//               >
//                 &times;
//               </button>
//             </div>

//             <form onSubmit={handleCourseSubmit}>
//               <div className="form-section">
//                 <div className="form-group">
//                   <label htmlFor="course-name">Course Name*</label>
//                   <input
//                     type="text"
//                     id="course-name"
//                     name="name"
//                     value={newCourse.name}
//                     onChange={(e) => setNewCourse({...newCourse, name: e.target.value})}
//                     placeholder="Ex: Advanced React"
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="course-institution">Institution*</label>
//                   <input
//                     type="text"
//                     id="course-institution"
//                     name="institution"
//                     value={newCourse.institution}
//                     onChange={(e) => setNewCourse({...newCourse, institution: e.target.value})}
//                     placeholder="Ex: Udemy, Coursera"
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="course-date">Completion Date</label>
//                   <input
//                     type="text"
//                     id="course-date"
//                     name="completionDate"
//                     value={newCourse.completionDate}
//                     onChange={(e) => setNewCourse({...newCourse, completionDate: e.target.value})}
//                     placeholder="Ex: April 2024"
//                   />
//                 </div>
//               </div>

//               <div className="modal-actions">
//                 <button
//                   type="button"
//                   className="cancel-btn"
//                   onClick={() => setShowCourseModal(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button type="submit" className="save-btn">
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Certification Modal */}
//       {showCertificationModal && (
//         <div className="modal-overlay">
//           <div className="certification-modal">
//             <div className="modal-header">
//               <h2>Add Certification</h2>
//               <button
//                 className="close-btn"
//                 onClick={() => setShowCertificationModal(false)}
//               >
//                 &times;
//               </button>
//             </div>

//             <form onSubmit={handleCertificationSubmit}>
//               <div className="form-section">
//                 <div className="form-group">
//                   <label htmlFor="cert-name">Certification Name*</label>
//                   <input
//                     type="text"
//                     id="cert-name"
//                     name="name"
//                     value={newCertification.name}
//                     onChange={(e) => setNewCertification({...newCertification, name: e.target.value})}
//                     placeholder="Ex: AWS Certified Developer"
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="cert-issuer">Issuing Organization*</label>
//                   <input
//                     type="text"
//                     id="cert-issuer"
//                     name="issuer"
//                     value={newCertification.issuer}
//                     onChange={(e) => setNewCertification({...newCertification, issuer: e.target.value})}
//                     placeholder="Ex: Amazon Web Services"
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="cert-date">Issue Date*</label>
//                   <input
//                     type="text"
//                     id="cert-date"
//                     name="date"
//                     value={newCertification.date}
//                     onChange={(e) => setNewCertification({...newCertification, date: e.target.value})}
//                     placeholder="Ex: March 2024"
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="cert-id">Credential ID</label>
//                   <input
//                     type="text"
//                     id="cert-id"
//                     name="credentialId"
//                     value={newCertification.credentialId}
//                     onChange={(e) => setNewCertification({...newCertification, credentialId: e.target.value})}
//                     placeholder="Ex: AWS123456"
//                   />
//                 </div>
//               </div>

//               <div className="modal-actions">
//                 <button
//                   type="button"
//                   className="cancel-btn"
//                   onClick={() => setShowCertificationModal(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button type="submit" className="save-btn">
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfilePage;