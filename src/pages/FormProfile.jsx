import axios from "axios";
import { Button, Label, Select, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useMatch, useParams, useSearchParams } from "react-router-dom";
import * as Yup from "yup";

const FormProfile = () => {
  const match = useMatch("/admin/product/:id");
  // console.log("match: ", match);

  const isEdit = !!match;

  const getById = async () => {
    try {
      const reponse = await axios.get(
        `https://apitraining.cybersoft.edu.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien=${match.params.id}`
      );
      console.log(reponse.data);
      frmProfile.setValues(reponse.data);
    } catch (error) {
      console.log("error: ", error);
    }
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
      console.log("submit");
      // console.log(value);

      let url =
        "https://apitraining.cybersoft.edu.vn/api/QuanLyNhanVienApi/ThemNhanVien";
      let method = "post";

      if (isEdit) {
        url = `https://apitraining.cybersoft.edu.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien=${match.params.id}`;
        method = "put";
      }

      try {
        console.log("value", value);

        const respone = await axios[method](url, value);

        console.log(respone.data);
      } catch (error) {
        console.log("error: ", error);
      }
    },
  });

  useEffect(() => {
    //
    const coefficient = positionConfig[frmProfile.values.chucVu] || "";
    frmProfile.setFieldValue("heSoChucVu", coefficient);

    // Nếu isEdit = true thì sẽ call api get by id
    if (isEdit) {
      getById();
    }
  }, [frmProfile.values.chucVu, isEdit]);

  return (
    <div className="px-3 py-6">
      <div className="">
        {/* <h1 className="title">{isEdit ? "Edit product" : "Add product"}</h1> */}

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

            <Button type="submit">edit</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormProfile;
