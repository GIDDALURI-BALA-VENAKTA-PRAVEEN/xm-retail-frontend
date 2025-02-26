import { FiHome, FiLogOut, FiMenu, FiTag, FiX } from "react-icons/fi";
import { JSX, useState } from "react";

import Admin from "./Admin";
import CardAdmin from "./CardAdmin";
import { useNavigate } from "react-router-dom";

export default function DashBoard(): JSX.Element {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<"home" | "coupons">("home");
  const navigate = useNavigate();

  const handleLogout = (): void => {
    navigate("/admin/login");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar - Fixed */}
      <div className="bg-gray-800 text-white w-64 p-5 space-y-4 h-screen fixed top-0 left-0">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => setActiveSection("home")}
              className="flex items-center space-x-2 w-full text-left p-2 hover:bg-gray-700 rounded"
            >
              <FiHome /> <span>Carousel</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection("coupons")}
              className="flex items-center space-x-2 w-full text-left p-2 hover:bg-gray-700 rounded"
            >
              <FiTag /> <span>Cards</span>
            </button>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 w-full text-left p-2 hover:bg-red-600 rounded"
            >
              <FiLogOut /> <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content Area - Scrollable */}
      <div className="flex-1 bg-gray-100 p-5 ml-64 overflow-y-auto h-screen">
        {/* Toggle Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-2xl md:hidden fixed top-5 left-5 bg-gray-800 text-white p-2 rounded"
        >
          {isSidebarOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Content Based on Selection */}
        {activeSection === "home" ? (
          <div>
            <Admin />
          </div>
        ) : (
          <div>
            <CardAdmin />
          </div>
        )}
      </div>
    </div>
  );
}
