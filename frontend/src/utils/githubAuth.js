// GitHub Authentication utility
class GitHubAuthService {
  constructor() {
    this.clientId = "Ov23liJDM6B9xuTvVtBa";

    // IMPORTANT: This must EXACTLY match the callback URL registered in your GitHub OAuth app
    // Typically this should be your actual backend URL
    this.redirectUri =
      "https://scaips-backend.onrender.com/api/auth/github/callback";

    // Base API URL for other API calls
    this.apiBaseUrl = "https://scaips-backend.onrender.com";
  }

  // Initiate GitHub OAuth flow
  initiateGitHubAuth() {
    if (import.meta.env.NODE_ENV !== "production") {
      console.log("Initiating GitHub auth flow...");
      console.log("Redirect URI:", this.redirectUri);
    }

    // GitHub OAuth endpoint
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${
      this.clientId
    }&redirect_uri=${encodeURIComponent(this.redirectUri)}&scope=user:email`;

    // Redirect user to GitHub authorization page
    window.location.href = authUrl;
  }

  // Process the GitHub callback
  async handleCallback(code) {
    try {
      // Exchange the code for an access token via your backend
      const response = await fetch(
        `${this.apiBaseUrl}/api/auth/github/callback?code=${code}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        if (import.meta.env.NODE_ENV !== "production") {
          console.error("GitHub callback error:", errorText);
        }
        throw new Error(
          `Failed to exchange GitHub code for token: ${response.status} ${errorText}`
        );
      }

      return await response.json();
    } catch (error) {
      if (import.meta.env.NODE_ENV !== "production") {
        console.error("GitHub auth callback error:", error);
      }
      throw error;
    }
  }
}

const githubAuthService = new GitHubAuthService();
export default githubAuthService;
