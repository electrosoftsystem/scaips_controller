import React, { useState } from "react";
import { Send, Bell, Eye } from "lucide-react";

const BACKEND =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export default function AdminPushSender() {
  const [title, setTitle] = useState("New feature in our app");
  const [body, setBody] = useState(
    "We just added something awesome. Tap to check it out!"
  );
  const [url, setUrl] = useState("/");
  const [dataJson, setDataJson] = useState("{}");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState(null);

  const handleSend = async () => {
    setSending(true);
    setResult(null);

    let data = {};
    try {
      data = JSON.parse(dataJson || "{}");
    } catch (err) {
      if (import.meta.env.NODE_ENV === "development") {
        console.log(err);
      }
      alert("Extra data must be valid JSON");
      setSending(false);
      return;
    }

    const payload = {
      title,
      body,
      url,
      data,
      icon: "/public/logo223.png",
      badge: "/public/logo223.png",
    };

    try {
      const res = await fetch(`${BACKEND}/notifications/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      setResult(json);
    } catch (err) {
      console.error(err);
      setResult({ error: "Request failed" });
    }

    setSending(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl mb-4 shadow-lg">
            <Bell className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Push Notification Center
          </h1>
          <p className="text-gray-600">
            Send notifications to all subscribed users
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Form Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <Send className="w-5 h-5 text-purple-500" />
              Notification Details
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. New feature in PeriodCare"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="e.g. Track your mood and cramps with our new update."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Click URL
                </label>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="/updates"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Extra Data{" "}
                  <span className="text-gray-400 text-xs">
                    (JSON, optional)
                  </span>
                </label>
                <textarea
                  value={dataJson}
                  onChange={(e) => setDataJson(e.target.value)}
                  placeholder='{"type":"feature","id":"mood-tracker"}'
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none resize-none font-mono text-sm"
                />
              </div>

              <button
                onClick={handleSend}
                disabled={sending}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {sending ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Notification
                  </>
                )}
              </button>
            </div>

            {/* Result */}
            {result && (
              <div className="mt-6">
                <div
                  className={`rounded-lg p-4 ${
                    result.error
                      ? "bg-red-50 border border-red-200"
                      : "bg-green-50 border border-green-200"
                  }`}
                >
                  <p
                    className={`text-sm font-medium mb-2 ${
                      result.error ? "text-red-800" : "text-green-800"
                    }`}
                  >
                    {result.error ? "❌ Error" : "✅ Success"}
                  </p>
                  <pre className="text-xs overflow-x-auto">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Preview Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <Eye className="w-5 h-5 text-blue-500" />
              Live Preview
            </h2>

            {/* Phone mockup */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-4 shadow-2xl">
              <div className="bg-white rounded-2xl overflow-hidden">
                {/* Status bar */}
                <div className="bg-gray-100 px-6 py-2 flex items-center justify-between text-xs">
                  <span className="font-semibold">9:41</span>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-3 border border-gray-400 rounded-sm" />
                    <div className="w-1 h-3 bg-gray-400 rounded-sm" />
                  </div>
                </div>

                {/* Notification */}
                <div className="p-4 border-b border-gray-200">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <img src="/logo223.png" height={100} width={100} />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm mb-1">
                        {title || "(title)"}
                      </p>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {body || "(body)"}
                      </p>
                      <p className="text-gray-400 text-xs mt-2">now</p>
                    </div>
                  </div>
                </div>

                {/* Additional info */}
                <div className="p-4 bg-gray-50">
                  <div className="text-xs text-gray-500 space-y-1">
                    <div>
                      <span className="font-medium">URL:</span> {url || "/"}
                    </div>
                    {dataJson !== "{}" && (
                      <div>
                        <span className="font-medium">Data:</span>{" "}
                        <code className="bg-white px-1 rounded">
                          {dataJson.length > 30
                            ? dataJson.substring(0, 30) + "..."
                            : dataJson}
                        </code>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Info cards */}
            <div className="mt-6 space-y-3">
              <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                <p className="text-sm text-blue-900">
                  <span className="font-semibold">💡 Tip:</span> Keep your
                  message concise and actionable for better engagement.
                </p>
              </div>
              <div className="bg-purple-50 rounded-lg p-3 border border-purple-100">
                <p className="text-sm text-purple-900">
                  <span className="font-semibold">📊 Stats:</span> Notifications
                  will be sent to all active subscribers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
