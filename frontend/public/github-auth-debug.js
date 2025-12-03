// GitHub Auth Test Helper
// This script logs any GitHub authentication errors

// Check if we have an error param in the URL
window.addEventListener("DOMContentLoaded", () => {
  // Function to get URL parameters
  const getUrlParams = () => {
    const params = {};
    new URLSearchParams(window.location.search).forEach((value, key) => {
      params[key] = value;
    });
    return params;
  };

  // Check for GitHub auth error in URL
  const params = getUrlParams();
  if (params.error) {
    console.error("GitHub Auth Error:", params.error);

    // Show error on page if we're on a login or callback page
    if (window.location.pathname.includes("/auth/")) {
      // Create error element
      const errorDiv = document.createElement("div");
      errorDiv.style.cssText =
        "position:fixed; top:10px; left:10px; right:10px; padding:15px; background:#f8d7da; color:#721c24; border:1px solid #f5c6cb; border-radius:4px; z-index:9999; font-family:sans-serif;";

      // Add error message
      const errorMessage = document.createElement("p");
      errorMessage.textContent = `GitHub Auth Error: ${params.error}`;
      errorDiv.appendChild(errorMessage);

      // Add debug info
      const debugInfo = document.createElement("pre");
      debugInfo.style.cssText =
        "background:#f8f9fa; padding:10px; border-radius:4px; font-size:12px; overflow:auto; max-height:200px;";

      // Collect debug info
      const debug = {
        path: window.location.pathname,
        queryParams: params,
        localStorage: {
          hasToken: !!localStorage.getItem("authToken"),
          hasUserData: !!localStorage.getItem("userData"),
        },
        timestamp: new Date().toISOString(),
      };

      debugInfo.textContent = JSON.stringify(debug, null, 2);
      errorDiv.appendChild(debugInfo);

      // Add close button
      const closeButton = document.createElement("button");
      closeButton.textContent = "Close";
      closeButton.style.cssText =
        "background:#6c757d; border:none; color:white; padding:5px 10px; border-radius:4px; cursor:pointer; margin-top:10px;";
      closeButton.onclick = () => errorDiv.remove();
      errorDiv.appendChild(closeButton);

      document.body.appendChild(errorDiv);
    }
  }

  // Log auth status for debugging
  const authToken = localStorage.getItem("authToken");
  const userData = localStorage.getItem("userData");

  // console.log('Auth Status:', {
  //   hasAuthToken: !!authToken,
  //   hasUserData: !!userData,
  //   location: window.location.href,
  //   tokenLength: authToken?.length,
  // });
});
