// Google OAuth Debug Helper
// Add this to your browser console to debug Google OAuth issues

window.debugGoogleAuth = {
  // Test Google Identity Services availability
  checkGoogleServices() {
    console.log("🔍 Checking Google Services...");
    console.log("window.google:", !!window.google);
    console.log("window.google.accounts:", !!window.google?.accounts);
    console.log("window.google.accounts.id:", !!window.google?.accounts?.id);
    console.log(
      "window.google.accounts.oauth2:",
      !!window.google?.accounts?.oauth2
    );

    const clientId = import.meta?.env?.VITE_GOOGLE_CLIENT_ID || "NOT_FOUND";
    console.log("Google Client ID:", clientId);

    return !!window.google?.accounts;
  },

  async simulateGoogleOAuth() {
    console.log("🧪 Simulating Google OAuth...");

    // Simulate what Google OAuth would return
    const mockGoogleResponse = {
      sub: "123456789012345678901",
      email: "debug.user@gmail.com",
      name: "Debug User",
      given_name: "Debug",
      family_name: "User",
      picture: "https://lh3.googleusercontent.com/a/debug",
    };

    console.log("📤 Mock Google response:", mockGoogleResponse);

    // Simulate frontend processing
    const processedUser = {
      id: mockGoogleResponse.sub,
      googleId: mockGoogleResponse.sub,
      email: mockGoogleResponse.email,
      name: mockGoogleResponse.name,
      firstName: mockGoogleResponse.given_name,
      lastName: mockGoogleResponse.family_name,
      imageUrl: mockGoogleResponse.picture,
      accessToken: "ya29.mock_token",
    };

    console.log("🔄 Processed user data:", processedUser);

    // Test API call format
    const apiRequest = {
      userData: processedUser,
      role: "student",
    };

    console.log("📡 API request format:", apiRequest);

    return processedUser;
  },

  // Test actual backend API call
  async testBackendCall(userData = null) {
    console.log("🌐 Testing backend API call...");

    const testData = userData || (await this.simulateGoogleOAuth());

    const requestPayload = {
      userData: testData,
      role: "student",
    };

    console.log("📤 Sending to backend:", requestPayload);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/google/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Origin: "https://www.scaips.in",
          },
          body: JSON.stringify(requestPayload),
        }
      );

      const result = await response.json();

      console.log("✅ Backend response status:", response.status);
      console.log("📥 Backend response data:", result);

      return { success: response.ok, data: result, status: response.status };
    } catch (error) {
      console.error("❌ Backend call failed:", error);
      return { success: false, error: error.message };
    }
  },

  // Monitor network requests
  monitorNetworkRequests() {
    console.log("👀 Monitoring network requests...");

    // Override fetch to log requests
    const originalFetch = window.fetch;
    window.fetch = function (...args) {
      if (args[0].includes("google") || args[0].includes("auth")) {
        console.log("🌐 Network request:", args[0], args[1]);
        if (args[1]?.body) {
          console.log("📤 Request body:", args[1].body);
        }
      }
      return originalFetch.apply(this, args);
    };

    console.log("✅ Network monitoring enabled");
  },

  // Check localStorage for Google user data
  // checkStoredData() {
  //   console.log("💾 Checking stored data...");
  //   const googleUser = localStorage.getItem("googleUser");
  //   const accessToken = localStorage.getItem("accessToken");

  //   console.log(
  //     "📦 Stored Google user:",
  //     googleUser ? JSON.parse(googleUser) : null
  //   );
  //   console.log("🔑 Stored access token:", accessToken ? "YES" : "NO");

  //   return {
  //     googleUser: googleUser ? JSON.parse(googleUser) : null,
  //     accessToken,
  //   };
  // },

  // Full debug test
  async fullDebugTest() {
    console.log("🔍 Starting full Google OAuth debug test...\n");

    // 1. Check services
    console.log("1️⃣ Checking Google services...");
    this.checkGoogleServices();

    // 2. Check stored data
    console.log("\n2️⃣ Checking stored data...");
    // this.checkStoredData();

    // 3. Test simulated OAuth
    console.log("\n3️⃣ Testing simulated OAuth...");
    const mockUser = await this.simulateGoogleOAuth();

    // 4. Test backend call
    console.log("\n4️⃣ Testing backend call...");
    const result = await this.testBackendCall(mockUser);

    console.log("\n🎉 Debug test complete!");
    console.log("📋 Summary:", result);

    return result;
  },
};

console.log("🛠️ Google OAuth Debug Helper loaded!");
console.log("📝 Available commands:");
console.log("  debugGoogleAuth.checkGoogleServices()");
console.log("  debugGoogleAuth.simulateGoogleOAuth()");
console.log("  debugGoogleAuth.testBackendCall()");
// console.log("  debugGoogleAuth.checkStoredData()");
console.log("  debugGoogleAuth.monitorNetworkRequests()");
console.log("  debugGoogleAuth.fullDebugTest()");
console.log("\n🚀 Run debugGoogleAuth.fullDebugTest() for a complete check!");
