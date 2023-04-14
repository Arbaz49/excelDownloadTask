import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import * as XLSX from "xlsx";
import { Avatar } from "@mui/material";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 180 },
  { field: "email", headerName: "Email", width: 180 },
  {
    field: "password",
    headerName: "Password",
    width: 180,
  },
  {
    field: "role",
    headerName: "Role",
    width: 180,
  },
  {
    field: "avatar",
    headerName: "Avatar",
    width: 190,
    renderCell: (params) => <Avatar src={params.row.avatar} />
  },
  {
    field: "creationAt",
    headerName: "Created Date",
    width: 180,
  },
];

export default function TestingTable() {
  const [data, setdata] = React.useState([]);
  const [todeleteIds, setTodeleteIds] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);
  const [color, setColor] = React.useState({
    color: "#15a8cf",
  });
  const [colorArray, setColorArray] = React.useState([]);

  const rows = data
    .map((ele) => ele)
    .filter((ele) => {
      let date = new Date(ele.creationAt).toDateString();
      return (ele.creationAt = date);
    });
  // const rows = data.map((ele)=>ele)
  React.useEffect(() => {
    const getdata = async () => {
      try {
        let { data } = await axios("https://api.escuelajs.co/api/v1/users");
        setdata(data);
      } catch (err) {
        console.log(err.message);
      }
    };
    getdata();
  }, []);
  const habdleDeleteMultiple = () => {
    if (todeleteIds.length < 1) {
      toast.error("select multiple");
    } else {
      setdata(data.filter((ele) => !todeleteIds.includes(ele.id)));
      toast.success("deleted successfully");
    }
  };

  function generateExcelData() {
    const header = ["Date", "Name", "email", "Role", "Avatar"];

    const rows = [
      header,
      ...data
        .slice((page - 1) * limit, (page - 1) * limit + limit)
        .map((item) => [
          new Date(item.creationAt).toDateString(),
          item.name,
          item.email,
          item.role,
          item.avatar,
        ]),
    ];

    return rows;
  }

  function downloadExcel() {
    const Report = generateExcelData();

    const ws = XLSX.utils.aoa_to_sheet(Report);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "data.xlsx");
  }

  const handleColor = (e) => {
    setColor({ color: e.target.value});
  };
  const addColor = () => {
    if(colorArray.length >=3){
      toast.error("can select only 3 colors")
    }else{
      
      setColorArray([...colorArray, color]);
    }
  };
  console.log(colorArray);
  const [bgColor, setBgColor] = React.useState("");
  const handlebgColor = (selectedColor) => {
    setBgColor(selectedColor);
    console.log("color clicked", selectedColor);
    setColorArray(colorArray.filter((color) =>color.color!==selectedColor));
  };
  return (
    <>
      <div style={{ backgroundColor: bgColor, color: "white", height: "90vh",paddingTop:"10px" }}>
        <div style={{ height: 630, width: "80%", margin: "auto" }}>
          <div className="flex justify-around">
            <button
              onClick={habdleDeleteMultiple}
              className="bg-black text-white p-1 rounded"
            >
              Delete All
            </button>
            <button className={`text-${bgColor==""?"black":"white"}`} onClick={downloadExcel}>download</button>

            <div className="flex">
              {colorArray.map((color) => {
                return (
                  <div
                    onClick={() => handlebgColor(color.color)}
                    style={{
                      border: "1px solid black",
                      width: "30px",
                      height: "30px",
                      backgroundColor: color.color,
                    }}
                  ></div>
                );
              })}
              <input
              id="colorField"
              className="rounded"
                type="color"
                name="color"
                onChange={(e) => handleColor(e)}
                value={color.color}
              />
              <button className={`text-${bgColor==""?"black":"white"} bg-slate-400 rounded pr-1 pl-1`} onClick={addColor}>add color</button>
            </div>
          </div>
          <DataGrid
          style={{color:bgColor==""?"black":"white"}}
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={5}
            checkboxSelection
            pageSizeOptions={[5, 10, 25]}
            onRowSelectionModelChange={(data) => {
              setTodeleteIds(data);
            }}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10, page: 0 },
              },
            }}
            onPaginationModelChange={(a) => {
              console.log(a);
              setPage(a.page + 1);
              setLimit(a.pageSize);
            }}
          />
        </div>
        <ToastContainer
          position="top-center"
          autoClose={500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="light"
        />
      </div>
    </>
  );
}
