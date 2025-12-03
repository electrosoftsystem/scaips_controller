import { useEffect, useState } from "react";
import axios from "axios";
import { requestNotificationPermission, subscribeUser } from "../../push";

const NotificationPermission = ({ studentId }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkStatus = async () => {
    try {
      // 1️⃣ Browser permission always has the highest priority
      const browserPermission = Notification.permission;

      // If browser is blocked → force DB to false and show popup
      if (browserPermission === "denied") {
        console.log("Browser blocked notifications → syncing DB");

        await axios.put(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/students/${studentId}/notification`,
          { notification: false, deniedAt: new Date().toISOString() }
        );

        setShowPopup(true);
        setLoading(false);
        return;
      }

      // 2️⃣ Get DB status
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/students/${studentId}/notification`
      );

      if (!res.data) {
        setShowPopup(true);
        setLoading(false);
        return;
      }

      const { notification, deniedAt } = res.data;

      // If DB says allowed → and browser also allows → no popup
      if (notification === true && browserPermission === "granted") {
        setShowPopup(false);
        setLoading(false);
        return;
      }

      // If user allowed earlier but browser is now "default" (not denied),
      // still show popup to reconfirm
      if (notification === true && browserPermission !== "granted") {
        setShowPopup(true);
        setLoading(false);
        return;
      }

      // If denied earlier → check cooldown of 2 minutes
      if (deniedAt) {
        const lastDenied = new Date(deniedAt);
        const now = new Date();
        const diffMinutes = (now - lastDenied) / 1000 / 60;

        if (diffMinutes >= 2) {
          setShowPopup(true);
        } else {
          setShowPopup(false);
        }

        setLoading(false);
        return;
      }

      // Default → show popup
      setShowPopup(true);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching notification:", err);
      setShowPopup(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    checkStatus();
  }, [studentId]);

  // 3️⃣ Handle Allow
  const allowNotification = async () => {
    const result = await Notification.requestPermission();

    if (result !== "granted") {
      alert("Please enable browser notifications manually.");
      return;
    }

    try {
      // Try to subscribe
      const sub = await subscribeUser({ studentId });

      // If subscription works → save true
      await axios.put(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/students/${studentId}/notification`,
        { notification: true, deniedAt: null }
      );

      setShowPopup(false);
    } catch (e) {
      console.error("Subscription failed:", e);

      // If push fails → force false in DB
      await axios.put(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/students/${studentId}/notification`,
        { notification: false, deniedAt: new Date().toISOString() }
      );

      alert(
        "Notification setup failed. Please enable notifications in browser settings."
      );
    }
  };

  // 4️⃣ Handle Deny
  const denyNotification = async () => {
    setShowPopup(false);

    await axios.put(
      `${import.meta.env.VITE_API_BASE_URL}/students/${studentId}/notification`,
      { notification: false, deniedAt: new Date().toISOString() }
    );
  };

  if (loading || !showPopup) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <div className="bg-white shadow-lg border border-gray-300 p-4 rounded-lg w-[260px]">
        <h2 className="text-base font-semibold mb-1">Allow Notifications?</h2>
        <p className="text-gray-600 text-sm mb-3">
          Receive daily updates and reminders.
        </p>

        <button
          onClick={allowNotification}
          className="bg-blue-600 text-white px-3 py-1.5 rounded-md w-full mb-2 text-sm"
        >
          Allow
        </button>

        <button
          onClick={denyNotification}
          className="bg-gray-300 text-black px-3 py-1.5 rounded-md w-full text-sm"
        >
          Not now
        </button>
      </div>
    </div>
  );
};

export default NotificationPermission;

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { requestNotificationPermission, subscribeUser } from "../../push";

// const NotificationPermission = ({ studentId }) => {
//   const [showPopup, setShowPopup] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const checkStatus = async () => {
//     try {
//       const res = await axios.get(
//         `${
//           import.meta.env.VITE_API_BASE_URL
//         }/students/${studentId}/notification`
//       );

//       // If no data exists yet → first visit → show popup
//       if (!res.data) {
//         setShowPopup(true);
//         setLoading(false);
//         return;
//       }

//       const { notification, deniedAt } = res.data;

//       // If allowed → never show again
//       if (notification === true) {
//         setShowPopup(false);
//         setLoading(false);
//         return;
//       }

//       // If denied → check if 2 minutes passed
//       if (deniedAt) {
//         const lastDenied = new Date(deniedAt);
//         const now = new Date();
//         const diffMinutes = (now - lastDenied) / 1000 / 60;

//         if (diffMinutes >= 2) {
//           setShowPopup(true);
//         } else {
//           setShowPopup(false);
//         }

//         setLoading(false);
//         return;
//       }

//       // Record exists but not allowed and no deniedAt → show popup
//       setShowPopup(true);
//       setLoading(false);
//     } catch (err) {
//       console.error("Error fetching notification:", err);
//       setShowPopup(false);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     checkStatus();
//   }, [studentId]);

//   const allowNotification = async () => {
//     const result = await Notification.requestPermission();

//     if (result === "granted") {
//       setShowPopup(false);

//       try {
//         await axios.put(
//           `${
//             import.meta.env.VITE_API_BASE_URL
//           }/students/${studentId}/notification`,
//           { notification: true, deniedAt: null }
//         );

//         await requestNotificationPermission();
//         await subscribeUser({ studentId });
//       } catch (e) {
//         console.error("DB update error:", e);
//       }
//     }
//   };

//   const denyNotification = async () => {
//     setShowPopup(false);

//     try {
//       await axios.put(
//         `${
//           import.meta.env.VITE_API_BASE_URL
//         }/students/${studentId}/notification`,
//         { notification: false, deniedAt: new Date().toISOString() }
//       );
//     } catch (e) {
//       console.error("DB update error:", e);
//     }
//   };

//   if (loading || !showPopup) return null;

//   return (
//     <div className="fixed bottom-6 left-6 z-50">
//       <div className="bg-white shadow-lg border border-gray-300 p-4 rounded-lg w-[260px]">
//         <h2 className="text-base font-semibold mb-1">Allow Notifications?</h2>
//         <p className="text-gray-600 text-sm mb-3">
//           Receive daily updates and reminders.
//         </p>

//         <button
//           onClick={allowNotification}
//           className="bg-blue-600 text-white px-3 py-1.5 rounded-md w-full mb-2 text-sm"
//         >
//           Allow
//         </button>

//         <button
//           onClick={denyNotification}
//           className="bg-gray-300 text-black px-3 py-1.5 rounded-md w-full text-sm"
//         >
//           Not now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default NotificationPermission;
