import { Sidebar } from "flowbite-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Admin = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen">
      <ToastContainer autoClose={2000} />
      <div className="w-1/6 max-h-full ">
        <Sidebar aria-label="Sidebar with logo branding example ">
          <Sidebar.Logo className="text-[#4505c7]">Dashboard</Sidebar.Logo>

          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                className="hover:bg-gray-400 hover:text-white"
                onClick={() => navigate("/admin")}
              >
                Quản lý nhân viên
              </Sidebar.Item>
            </Sidebar.ItemGroup>
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
