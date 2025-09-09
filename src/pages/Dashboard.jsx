import React, { useState } from "react";
import {
  Home,
  BarChart,
  Users,
  Settings,
  Menu,
  LogOut,
} from "lucide-react";

const Dashboard = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed md:static z-20 inset-y-0 left-0 transform ${open ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition duration-200 ease-in-out w-64 bg-white shadow-lg`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-xl font-bold text-[#0061a1]">MyDashboard</h1>
          <button
            className="md:hidden"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
        </div>
        <nav className="p-4 space-y-2">
          <a
            href="#"
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-100"
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-100"
          >
            <BarChart className="w-5 h-5" />
            <span>Analytics</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-100"
          >
            <Users className="w-5 h-5" />
            <span>Users</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-100"
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </a>
        </nav>
        <div className="absolute bottom-0 w-full p-4 border-t">
          <button className="flex items-center space-x-2 p-2 w-full rounded-lg hover:bg-red-100 text-red-600">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="flex items-center justify-between p-4 bg-white shadow-md">
          <button
            className="md:hidden"
            onClick={() => setOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
          <h2 className="text-lg font-semibold">Dashboard</h2>
          <div className="w-10 h-10 rounded-full bg-[#0061a1] text-white flex items-center justify-center">
            U
          </div>
        </header>

        {/* Content Area */}
        <main className="p-6 overflow-y-auto">
          <h3 className="text-xl font-bold mb-4">Welcome back 👋</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 shadow rounded-lg">
              <h4 className="font-semibold">Card 1</h4>
              <p className="text-gray-500">Some stats here...</p>
            </div>
            <div className="bg-white p-4 shadow rounded-lg">
              <h4 className="font-semibold">Card 2</h4>
              <p className="text-gray-500">Some stats here...</p>
            </div>
            <div className="bg-white p-4 shadow rounded-lg">
              <h4 className="font-semibold">Card 3</h4>
              <p className="text-gray-500">Some stats here...</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard