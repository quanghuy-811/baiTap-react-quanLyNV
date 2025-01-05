import axios from "axios";
import { Button, Label, Select, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import { useEffect } from "react";
import {
  useMatch,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";

const FormProfile = () => {
  const navigate = useNavigate();
  const match = useMatch("/admin/product/:id");
  //

  const isEdit = !!match;

  const getById = async () => {
    try {
      const reponse = await axios.get(
        `https://apitraining.cybersoft.edu.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien=${match.params.id}`
      );

      frmProfile.setValues(reponse.data);
    } catch (error) {}
  };

  const positionConfig = {
    0: "",
    "Nhân Viên": "1",
    "Quản Lý": "2",
    "Giám Đốc": "3",
  };

  // form Fokmik
  const frmProfile = useFormik({
    initialValues: {
      maNhanVien: "",
      tenNhanVien: "",
      chucVu: "0",
      heSoChucVu: "",
      luongCoBan: "",
      soGioLamTrongThang: "",
    },
    validationSchema: Yup.object().shape({
      maNhanVien: Yup.string().required("Nhập mã nhân viên"),
      tenNhanVien: Yup.string().required("Nhập tên"),
      chucVu: Yup.string().test(
        "Chọn chức vụ",
        "Chọn chức vụ",
        (value) => value !== "0"
      ),
      luongCoBan: Yup.string()
        .required("Nhập lương cơ bản")
        .matches(/^\d+$/, "Giá trị phải là một số nguyên"),
      soGioLamTrongThang: Yup.string()
        .required("Nhập số giờ làm ")
        .matches(/^\d+$/, "Giá trị phải là một số nguyên"),
    }),

    onSubmit: async (value) => {
      //

      let url =
        "https://apitraining.cybersoft.edu.vn/api/QuanLyNhanVienApi/ThemNhanVien";
      let method = "post";

      if (isEdit) {
        url = `https://apitraining.cybersoft.edu.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien=${match.params.id}`;
        method = "put";
      }

      try {
        const response = await axios[method](url, value);
        toast.success(response.data);
        navigate("../");
      } catch (error) {
        toast.warning(error.response.data);
      }
    },
  });

  useEffect(() => {
    // Nếu isEdit = true thì sẽ call api get by id
    if (isEdit) {
      getById();
    }
  }, [isEdit]);
  useEffect(() => {
    //
    const coefficient = positionConfig[frmProfile.values.chucVu] || "";
    frmProfile.setFieldValue("heSoChucVu", coefficient);
  }, [frmProfile.values.chucVu]);
  return (
    <div className="px-3 py-6">
      <div className="">
        <h1 className="text-center text-3xl font-bold my-4">
          {isEdit ? "Form Edit" : "Form Add"}
        </h1>

        <div>
          <form
            className="flex max-w-md flex-col gap-4 mx-auto"
            onSubmit={frmProfile.handleSubmit}
          >
            <div>
              <div className="mb-2 block">
                <Label htmlFor="id" value="Mã nhân viên" />
              </div>
              <TextInput
                id="id"
                type="text"
                name="maNhanVien"
                // disabled={isEdit}
                value={frmProfile.values.maNhanVien}
                onChange={frmProfile.handleChange}
              />

              {frmProfile.touched.maNhanVien &&
                frmProfile.errors.maNhanVien && (
                  <p className="text-red-400 font-semibold">
                    {frmProfile.errors.maNhanVien}
                  </p>
                )}
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name1" value="Tên nhân viên" />
              </div>
              <TextInput
                id="name1"
                type="text"
                name="tenNhanVien"
                data-type="name"
                value={frmProfile.values.tenNhanVien}
                onChange={frmProfile.handleChange}
              />
              {frmProfile.touched.tenNhanVien &&
                frmProfile.errors.tenNhanVien && (
                  <p className="text-red-400 font-semibold">
                    {frmProfile.errors.tenNhanVien}
                  </p>
                )}
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="type" value="Chức vụ" />
              </div>
              <Select
                id="type"
                name="chucVu"
                onChange={frmProfile.handleChange}
                value={frmProfile.values.chucVu}
              >
                <option value={0}>Chọn chức vụ</option>
                <option value={"Nhân Viên"}>Nhân Viên</option>
                <option value={"Quản Lý"}>Quản Lý</option>
                <option value={"Giám Đốc"}>Giám Đốc</option>
              </Select>
              {frmProfile.touched.chucVu && frmProfile.errors.chucVu && (
                <p className="text-red-400 font-semibold">
                  {frmProfile.errors.chucVu}
                </p>
              )}
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="img1" value="Hệ số chức vụ" />
              </div>
              <TextInput
                type="text"
                name="heSoChucVu"
                value={frmProfile.values.heSoChucVu}
                onChange={frmProfile.handleChange}
                readOnly
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="idescription1" value="Lương cơ bản" />
              </div>
              <TextInput
                type="text"
                name="luongCoBan"
                value={frmProfile.values.luongCoBan}
                onChange={frmProfile.handleChange}
              />
              {frmProfile.touched.luongCoBan &&
                frmProfile.errors.luongCoBan && (
                  <p className="text-red-400 font-semibold">
                    {frmProfile.errors.luongCoBan}
                  </p>
                )}
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="idescription1" value="Số giờ làm trong tháng" />
              </div>
              <TextInput
                type="text"
                name="soGioLamTrongThang"
                value={frmProfile.values.soGioLamTrongThang}
                onChange={frmProfile.handleChange}
              />
              {frmProfile.touched.soGioLamTrongThang &&
                frmProfile.errors.soGioLamTrongThang && (
                  <p className="text-red-400 font-semibold">
                    {frmProfile.errors.soGioLamTrongThang}
                  </p>
                )}
            </div>

            <Button type="submit">{isEdit ? "Edit" : "Add"}</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormProfile;
