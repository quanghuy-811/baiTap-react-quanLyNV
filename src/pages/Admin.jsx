import { Sidebar } from "flowbite-react";
import { NavLink, Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/6 max-h-full ">
        <Sidebar aria-label="Sidebar with logo branding example ">
          <Sidebar.Logo className="text-[#4505c7]">Dashboard</Sidebar.Logo>

          <Sidebar.Items>
            <NavLink className="font-medium" to="/admin">
              <Sidebar.ItemGroup>
                <Sidebar.Item className="hover:bg-gray-400 hover:text-white">
                  Quản lý nhân viên
                </Sidebar.Item>
              </Sidebar.ItemGroup>
            </NavLink>
          </Sidebar.Items>
        </Sidebar>
      </div>
      <div className="w-5/6 h-full bg-gray-300">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
