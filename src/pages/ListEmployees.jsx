import axios from "axios";
import { Button, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const ListEmployees = () => {
  const [arrEmployees, setArrEmployees] = useState([]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://apitraining.cybersoft.edu.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien=${id}`
      );
      toast.success(response.data);
      getAll();
    } catch (error) {}
  };

  const getAll = async () => {
    try {
      const respone = await axios.get(
        "https://apitraining.cybersoft.edu.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien"
      );

      setArrEmployees(respone.data);
    } catch (error) {}
  };

  useEffect(() => {
    getAll();
  }, []);
  return (
    <div className="px-3 py-6">
      <div className="mt-14">
        <NavLink
          to="/admin/product"
          className="text-white px-4 py-2 rounded-lg inline-block bg-gray-500 mb-4 hover:bg-black"
        >
          Thêm nhân viên
        </NavLink>
        <div className="overflow-x-auto">
          <Table>
            <Table.Head>
              <Table.HeadCell>Mã nhân viên</Table.HeadCell>
              <Table.HeadCell>Tên nhân viên</Table.HeadCell>
              <Table.HeadCell>Chức vụ</Table.HeadCell>
              <Table.HeadCell>Hệ số lương</Table.HeadCell>
              <Table.HeadCell>Lương cơ bản</Table.HeadCell>
              <Table.HeadCell>Số giờ làm</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {arrEmployees.map((item) => {
                return (
                  <Table.Row key={item.maNhanVien} className="bg-white ">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 ">
                      {item.maNhanVien}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                      {item.tenNhanVien}
                    </Table.Cell>
                    <Table.Cell> {item.chucVu}</Table.Cell>
                    <Table.Cell> {item.heSoChucVu}</Table.Cell>
                    <Table.Cell> {item.luongCoBan}</Table.Cell>
                    <Table.Cell> {item.soGioLamTrongThang}</Table.Cell>

                    <Table.Cell className="flex space-x-2">
                      <NavLink
                        to={`/admin/product/${item.maNhanVien}`}
                        className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 "
                      >
                        Sửa
                      </NavLink>
                      <Button
                        onClick={() => {
                          handleDelete(item.maNhanVien);
                        }}
                        color="failure"
                      >
                        Xóa
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ListEmployees;
