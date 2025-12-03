import { Award, Calendar, ExternalLink } from "lucide-react";
import React from "react";

function CertificationsSection({ certifications = [], formatDate, isDarkMode = true }) {
  const textHeading = isDarkMode ? "text-white" : "text-gray-900";
  const subText = isDarkMode ? "text-blue-400" : "text-blue-600";
  const lightText = isDarkMode ? "text-gray-300" : "text-gray-600";
  const emptyText = isDarkMode ? "text-gray-400" : "text-gray-500";

  const getGridClasses = () => {
    if (!certifications || certifications.length === 0) return "";
    if (certifications.length === 1) return "max-w-3xl mx-auto";
    return "grid md:grid-cols-2 gap-4";
  };

  return (
    <section
      id="certifications"
      className={`py-6 px-4 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}
    >
      <div className="max-w-4xl mx-auto">

        {/* ====== SECTION TITLE ====== */}
        <hr className={`border-t-2 mb-2 ${isDarkMode ? "border-white/40" : "border-gray-400"}`} />
        <h2 className={`text-2xl font-bold mb-4 ${textHeading}`}>Certifications</h2>

        {certifications.length > 0 ? (
          <div className={getGridClasses()}>
            {certifications.map((cert, idx) => (
              <div
                key={idx}
                className={`p-4 rounded border ${
                  isDarkMode ? "bg-white/5 border-white/10" : "bg-white border-gray-200"
                }`}
              >
                <div className="flex items-start space-x-3">
                  
                  {/* Matching ICON STYLING */}
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded flex items-center justify-center flex-shrink-0">
                    <Award className="text-white" size={20} />
                  </div>

                  <div className="flex-1">
                    <h3 className={`font-semibold text-sm mb-1 ${textHeading}`}>
                      {cert.certificate_name}
                    </h3>

                    <p className={`text-xs font-medium mb-1 ${subText}`}>
                      {cert.issuing_organization}
                    </p>

                    {/* Credential ID */}
                    {cert.credential_id && (
                      <p className={`text-[10px] font-mono mb-1 ${lightText}`}>
                        ID: {cert.credential_id}
                      </p>
                    )}

                    {/* Dates */}
                    <div className={`flex flex-wrap items-center gap-2 text-[10px] ${lightText}`}>
                      <span className="flex items-center">
                        <Calendar size={12} className="mr-1" />
                        Issued: {formatDate(cert.issue_date)}
                      </span>

                      {cert.expiry_date && (
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                            isDarkMode
                              ? "bg-yellow-600 text-white"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          Expires: {formatDate(cert.expiry_date)}
                        </span>
                      )}
                    </div>

                    {/* Credential URL */}
                    {cert.credential_url && (
                      <a
                        href={cert.credential_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center space-x-1 text-[10px] font-semibold mt-1 ${
                          isDarkMode ? "text-blue-400" : "text-blue-600"
                        }`}
                      >
                        <span>Verify</span>
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>

                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Award
              className={`mx-auto mb-2 ${isDarkMode ? "text-gray-600" : "text-gray-400"}`}
              size={36}
            />
            <p className={`${emptyText} text-sm`}>No certifications added yet</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default CertificationsSection;
