import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Nav";
import SidebarInstructor from "../Components/Sidebar/SidebarInstructor";

const LayoutInstructor = () => {
  return (
    <>
      <Navbar />
      <main>
        <div className="d-flex">
          <SidebarInstructor />
          <div className="flex-grow-1 p-4" style={{ marginLeft: "250px" }}>
            <Outlet /> {/* Aquí se renderizan las páginas */}
          </div>
        </div>
      </main>
    </>
  );
};

export default LayoutInstructor;
