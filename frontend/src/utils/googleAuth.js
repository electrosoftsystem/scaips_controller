// Google Authentication utility using Google Identity Services (GIS)
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

class GoogleAuthService {
  constructor() {
    this.google = null;
    this.isInitialized = false;
  }

  // Initialize Google Identity Services
  async initializeGoogleAuth() {
    if (this.isInitialized) return;

    return new Promise((resolve, reject) => {
      // Load Google Identity Services script
      if (!window.google) {
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.onload = () => {
          this.loadGoogleIdentityServices().then(resolve).catch(reject);
        };
        script.onerror = () =>
          reject(new Error("Failed to load Google script"));
        document.head.appendChild(script);
      } else {
        this.loadGoogleIdentityServices().then(resolve).catch(reject);
      }
    });
  }

  async loadGoogleIdentityServices() {
    return new Promise((resolve, reject) => {
      try {
        // Initialize Google Identity Services with proper configuration
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          auto_select: false,
          cancel_on_tap_outside: true,
        });

        this.google = window.google;
        this.isInitialized = true;
        if (import.meta.env.NODE_ENV !== "production") {
          console.log("Google Identity Services initialized successfully");
        }
        resolve();
      } catch (error) {
        if (import.meta.env.NODE_ENV !== "production") {
          console.error(
            "Google Identity Services initialization error:",
            error
          );
        }
        reject(error);
      }
    });
  }

  // Handle credential response (for popup flow)
  handleCredentialResponse(response) {
    // This will be used for the popup flow
    if (import.meta.env.NODE_ENV !== "production") {
      console.log("Credential response:", response);
    }
  }

  // Sign in with Google using popup (no redirect URI needed)
  async signInWithGoogle() {
    if (!this.isInitialized) {
      await this.initializeGoogleAuth();
    }

    return new Promise((resolve, reject) => {
      try {
        // Use OAuth 2.0 popup flow (no redirect URI required)
        const tokenClient = window.google.accounts.oauth2.initTokenClient({
          client_id: GOOGLE_CLIENT_ID,
          scope: "email profile openid",
          prompt: "select_account",
          callback: async (response) => {
            if (response.error) {
              if (import.meta.env.NODE_ENV !== "production") {
                console.error("Google OAuth error:", response.error);
              }
              reject(new Error(response.error_description || response.error));
              return;
            }

            try {
              // Get user info using the access token
              const userInfo = await this.getUserInfo(response.access_token);
              // Ensure we have both id and googleId
              const userId = userInfo.sub || userInfo.id;

              if (!userId || !userInfo.email) {
                reject(
                  new Error(
                    "Google OAuth did not return required user ID and email"
                  )
                );
                return;
              }

              resolve({
                id: userId,
                name: userInfo.name,
                email: userInfo.email,
                firstName: userInfo.given_name,
                lastName: userInfo.family_name,
                imageUrl: userInfo.picture,
                accessToken: response.access_token,
                googleId: userId, // Ensure googleId is always set
              });
            } catch (error) {
              if (import.meta.env.NODE_ENV !== "production") {
                console.error("Failed to get user info:", error);
              }
              reject(error);
            }
          },
        });

        // Request access token
        tokenClient.requestAccessToken();
      } catch (error) {
        if (import.meta.env.NODE_ENV !== "production") {
          console.error("Google sign in initialization error:", error);
        }
        reject(error);
      }
    });
  }

  // Get user info using access token
  async getUserInfo(accessToken) {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`
    );
    if (!response.ok) {
      throw new Error("Failed to get user info");
    }
    return response.json();
  }

  // Sign out
  async signOut() {
    if (!this.isInitialized) return;

    try {
      window.google.accounts.id.disableAutoSelect();
      if (import.meta.env.NODE_ENV !== "production") {
        console.log("Signed out successfully");
      }
    } catch (error) {
      if (import.meta.env.NODE_ENV !== "production") {
        console.error("Sign out error:", error);
      }
    }
  }

  // Get current user (not directly available in GIS, need to store locally)
  getCurrentUser() {
    // In GIS, we don't have persistent user state
    // You might want to store user info in localStorage after sign in
    const storedUser = localStorage.getItem("googleUser");
    return storedUser ? JSON.parse(storedUser) : null;
  }
}

export default new GoogleAuthService();
