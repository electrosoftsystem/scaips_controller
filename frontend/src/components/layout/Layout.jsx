import React from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";

const Layout = ({ children }) => {
  const { username } = useParams();
  return (
    <div className="min-h-screen bg-gray-50">
      {!username && <Navbar />}
      <main className="w-full">{children}</main>
    </div>
  );
};

export default Layout;
