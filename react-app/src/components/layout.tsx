// components/Layout.tsx
import { Outlet } from "react-router-dom";
import Navbar from "./navbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="content">
        <Outlet /> {/* This renders the page content dynamically */}
      </div>
    </>
  );
};

export default Layout;
