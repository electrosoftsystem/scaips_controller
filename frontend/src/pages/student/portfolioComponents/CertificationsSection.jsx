import { Award, Calendar, ExternalLink } from "lucide-react";
import React from "react";

function CertificationsSection({ certifications, formatDate, isDarkMode }) {
  const getGridClasses = () => {
    if (certifications.length === 1) return "max-w-2xl mx-auto";
    if (certifications.length === 2) return "md:grid-cols-2 max-w-4xl mx-auto";
    return "md:grid-cols-2 lg:grid-cols-3";
  };

  const bgClass = isDarkMode ? "bg-gray-900" : "bg-white";
  const cardBg = isDarkMode
    ? "bg-gray-800 border-gray-700"
    : "bg-gradient-to-br from-blue-50 to-purple-50 border-blue-100";

  const textHeading = isDarkMode ? "text-white" : "text-gray-800";
  const subText = isDarkMode ? "text-blue-400" : "text-blue-600";
  const lightText = isDarkMode ? "text-gray-300" : "text-gray-600";
  const emptyText = isDarkMode ? "text-gray-400" : "text-gray-500";

  return (
    <section
      id="certifications"
      className={`py-24 px-4 transition-colors ${bgClass}`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${textHeading}`}>
            Certifications
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
        </div>

        {certifications.length > 0 ? (
          <div className={`grid gap-8 ${getGridClasses()}`}>
            {certifications.map((cert, idx) => (
              <div
                key={idx}
                className={`rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all ${cardBg}`}
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Award className="text-white" size={32} />
                  </div>

                  <div className="flex-1">
                    <h3 className={`text-xl font-bold mb-2 ${textHeading}`}>
                      {cert.certificate_name}
                    </h3>

                    <p className={`font-semibold mb-2 ${subText}`}>
                      {cert.issuing_organization}
                    </p>

                    {cert.credential_id && (
                      <p
                        className={`text-sm font-mono mb-2 ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        ID: {cert.credential_id}
                      </p>
                    )}

                    <div
                      className={`flex flex-wrap items-center gap-2 text-sm ${lightText}`}
                    >
                      <span className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        Issued: {formatDate(cert.issue_date)}
                      </span>

                      {cert.expiry_date && (
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            isDarkMode
                              ? "bg-yellow-600 text-white"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          Expires: {formatDate(cert.expiry_date)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {cert.credential_url && (
                  <a
                    href={cert.credential_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center space-x-2 font-semibold text-sm ${
                      isDarkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"
                    }`}
                  >
                    <span>Verify Certificate</span>
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Award
              className={`mx-auto mb-4 ${
                isDarkMode ? "text-gray-700" : "text-gray-400"
              }`}
              size={48}
            />
            <p className={emptyText}>No certifications added yet</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default CertificationsSection;