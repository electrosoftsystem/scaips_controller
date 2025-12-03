import React, { useState } from "react";
import {
  Search,
  MoreHorizontal,
  Paperclip,
  Image,
  Send,
  Smile,
  Phone,
  Video,
  Info,
  Star,
  Archive,
  Trash2,
  Circle,
  X,
  Edit3,
} from "lucide-react";

const MessagesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChat, setSelectedChat] = useState(1);
  const [messageInput, setMessageInput] = useState("");
  const [showChatList, setShowChatList] = useState(true);

  const conversations = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "SJ",
      lastMessage: "Thanks for connecting! Would love to discuss the project.",
      time: "10m",
      unread: 2,
      online: true,
      title: "Product Manager at Tech Corp",
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "MC",
      lastMessage: "The meeting is scheduled for tomorrow at 3 PM",
      time: "1h",
      unread: 0,
      online: true,
      title: "Senior Software Engineer",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      avatar: "ER",
      lastMessage: "I sent you the design files. Let me know what you think!",
      time: "3h",
      unread: 1,
      online: false,
      title: "UX Designer at Creative Studio",
    },
    {
      id: 4,
      name: "David Kim",
      avatar: "DK",
      lastMessage: "Great presentation today!",
      time: "1d",
      unread: 0,
      online: false,
      title: "Marketing Director",
    },
    {
      id: 5,
      name: "Jessica Williams",
      avatar: "JW",
      lastMessage: "Can we reschedule our call?",
      time: "2d",
      unread: 0,
      online: true,
      title: "Data Scientist at AI Research",
    },
    {
      id: 6,
      name: "Robert Taylor",
      avatar: "RT",
      lastMessage: "Looking forward to collaborating with you",
      time: "3d",
      unread: 0,
      online: false,
      title: "VP of Engineering",
    },
  ];

  const messages = [
    {
      id: 1,
      senderId: 1,
      text: "Hi! I saw your profile and was really impressed with your work at Innovation Labs.",
      time: "10:30 AM",
      isOwn: false,
    },
    {
      id: 2,
      senderId: "me",
      text: "Thank you so much! I appreciate you reaching out.",
      time: "10:32 AM",
      isOwn: true,
    },
    {
      id: 3,
      senderId: 1,
      text: "I wanted to discuss a potential collaboration opportunity. Do you have time for a quick call this week?",
      time: "10:33 AM",
      isOwn: false,
    },
    {
      id: 4,
      senderId: "me",
      text: "That sounds great! I'm available Thursday or Friday afternoon. What works best for you?",
      time: "10:35 AM",
      isOwn: true,
    },
    {
      id: 5,
      senderId: 1,
      text: "Thanks for connecting! Would love to discuss the project.",
      time: "10:40 AM",
      isOwn: false,
    },
  ];

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentConversation = conversations.find((c) => c.id === selectedChat);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      setMessageInput("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Messaging
            </h1>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Edit3 className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <MoreHorizontal className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div
          className="bg-white rounded-lg shadow overflow-hidden"
          style={{ height: "calc(100vh - 180px)" }}
        >
          <div className="flex h-full">
            {/* Conversations List */}
            <div
              className={`${
                showChatList ? "flex" : "hidden"
              } md:flex flex-col w-full md:w-80 lg:w-96 border-r`}
            >
              {/* Search Bar */}
              <div className="p-4 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search messages"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="flex border-b">
                <button className="flex-1 px-4 py-3 text-sm font-semibold text-green-600 border-b-2 border-green-600">
                  Focused
                </button>
                <button className="flex-1 px-4 py-3 text-sm text-gray-600 hover:bg-gray-50">
                  Other
                </button>
                <button className="flex-1 px-4 py-3 text-sm text-gray-600 hover:bg-gray-50">
                  Unread
                </button>
              </div>

              {/* Conversations */}
              <div className="flex-1 overflow-y-auto">
                {filteredConversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => {
                      setSelectedChat(conv.id);
                      setShowChatList(false);
                    }}
                    className={`flex items-start p-4 cursor-pointer hover:bg-gray-50 border-b ${
                      selectedChat === conv.id ? "bg-blue-50" : ""
                    }`}
                  >
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-400 flex items-center justify-center text-white font-semibold">
                        {conv.avatar}
                      </div>
                      {conv.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div className="ml-3 flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {conv.name}
                        </h3>
                        <span className="text-xs text-gray-500 ml-2">
                          {conv.time}
                        </span>
                      </div>
                      <p
                        className={`text-sm truncate ${
                          conv.unread > 0
                            ? "font-semibold text-gray-900"
                            : "text-gray-600"
                        }`}
                      >
                        {conv.lastMessage}
                      </p>
                    </div>
                    {conv.unread > 0 && (
                      <div className="ml-2 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                        {conv.unread}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div
              className={`${
                !showChatList ? "flex" : "hidden"
              } md:flex flex-col flex-1`}
            >
              {currentConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="border-b px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setShowChatList(true)}
                        className="md:hidden p-2 hover:bg-gray-100 rounded-full"
                      >
                        <X className="w-5 h-5 text-gray-600" />
                      </button>
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center text-white font-semibold">
                          {currentConversation.avatar}
                        </div>
                        {currentConversation.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <h2 className="font-semibold text-gray-900">
                          {currentConversation.name}
                        </h2>
                        <p className="text-xs text-gray-600">
                          {currentConversation.title}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 hover:bg-gray-100 rounded-full">
                        <Phone className="w-5 h-5 text-blue-400" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-full">
                        <Video className="w-5 h-5 text-blue-400" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-full hidden sm:block">
                        <Star className="w-5 h-5 text-blue-400" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-full hidden sm:block">
                        <Info className="w-5 h-5 text-blue-400" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-full">
                        <MoreHorizontal className="w-5 h-5 text-blue-400" />
                      </button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Today</p>
                    </div>
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.isOwn ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`flex items-end space-x-2 max-w-xs lg:max-w-md xl:max-w-lg ${
                            message.isOwn
                              ? "flex-row-reverse space-x-reverse"
                              : ""
                          }`}
                        >
                          {!message.isOwn && (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-400 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                              {currentConversation.avatar}
                            </div>
                          )}
                          <div>
                            <div
                              className={`px-4 py-2 rounded-2xl ${
                                message.isOwn
                                  ? "bg-blue-400 text-white"
                                  : "bg-white text-gray-900 border border-gray-200"
                              }`}
                            >
                              <p className="text-sm">{message.text}</p>
                            </div>
                            <p
                              className={`text-xs text-gray-500 mt-1 ${
                                message.isOwn ? "text-right" : "text-left"
                              }`}
                            >
                              {message.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="border-t p-4 bg-white">
                    <div className="flex items-end space-x-2">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <button className="p-2 hover:bg-gray-100 rounded-full">
                            <Paperclip className="w-5 h-5 text-gray-600" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded-full">
                            <Image className="w-5 h-5 text-gray-600" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded-full">
                            <Smile className="w-5 h-5 text-gray-600" />
                          </button>
                        </div>
                        <textarea
                          value={messageInput}
                          onChange={(e) => setMessageInput(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
                          placeholder="Write a message..."
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows="3"
                        />
                      </div>
                      <button
                        onClick={handleSendMessage}
                        disabled={!messageInput.trim()}
                        className={`p-3 rounded-full ${
                          messageInput.trim()
                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Circle className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Select a conversation
                    </h3>
                    <p className="text-sm text-gray-600">
                      Choose from your existing conversations or start a new one
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
