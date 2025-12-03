import React from "react";
import NotifyToggle from "../NotifyToggle";
import AdminPushSender from "../AdminPushSender";

function NotifyAll() {
  return (
    <div>
      <AdminPushSender />
      <NotifyToggle />
    </div>
  );
}

export default NotifyAll;
