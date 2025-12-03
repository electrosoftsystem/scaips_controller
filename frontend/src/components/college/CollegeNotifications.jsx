import React from "react";

const CollegeNotifications = () => {
  return (
    <>
      <div className="bg-white rounded-lg shadow p-6 border border-blue-100 mb-10">
        <h3 className="font-semibold text-blue-800 mb-4 text-lg">Notifications</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-3">
          <li><span className="font-semibold">Admissions 2025:</span> Applications for B.Tech, M.Tech, and Ph.D. are open. <a href="https://www.iitk.ac.in/admissions" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">Apply Now</a></li>
          <li><span className="font-semibold">Convocation 2025:</span> The 57th Convocation will be held on July 15, 2025.</li>
          <li><span className="font-semibold">Placement Drive:</span> Phase 1 placements start from December 1, 2025.</li>
          <li><span className="font-semibold">Techkriti 2025:</span> Annual technical festival scheduled for March 2025.</li>
          <li><span className="font-semibold">New Research Grants:</span> Faculty and students awarded major national and international research grants.</li>
        </ul>
      </div>
      {/* News & Updates Section */}
      <div className="bg-white rounded-lg shadow p-6 border border-blue-100 mb-10">
        <h3 className="font-semibold text-blue-800 mb-4 text-lg">News & Updates</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-3">
          <li>MoU signed with global tech leader for AI research collaboration.</li>
          <li>IIT Kanpur launches new Center for Quantum Computing.</li>
          <li>Alumni startup raises $10M in Series A funding.</li>
          <li>Annual sports meet to be held in September 2025.</li>
        </ul>
      </div>
      {/* Contact Info Section */}
      <div className="bg-white rounded-lg shadow p-6 border border-blue-100 mb-2">
        <h3 className="font-semibold text-blue-800 mb-4 text-lg">Contact Info</h3>
        <div className="text-gray-700 text-sm space-y-3">
          <div><span className="font-semibold">Address:</span> IIT Kanpur, Kalyanpur, Kanpur, Uttar Pradesh 208016, India</div>
          <div><span className="font-semibold">Phone:</span> <a href="tel:+915122597000" className="text-blue-600 underline">+91 512 259 7000</a></div>
          <div><span className="font-semibold">Email:</span> <a href="mailto:infocell@iitk.ac.in" className="text-blue-600 underline">infocell@iitk.ac.in</a></div>
          <div><span className="font-semibold">Website:</span> <a href="https://www.iitk.ac.in/" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">www.iitk.ac.in</a></div>
        </div>
      </div>
    </>
  );
};

export default CollegeNotifications;
