import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { Pagination } from "@mui/material";
import * as XLSX from 'xlsx';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Tabel() {
  const [data, setdata] = useState([]);
  useEffect(() => {
    const getdata = async () => {
      try {
        let { data } = await axios(
          "https://api.coronavirus.data.gov.uk/v1/data"
        );
        setdata(data.data);
        console.log(data);
      } catch (err) {
        console.log(err.message);
      }
    };
    getdata();
  }, []);
  const [page, setpage] = useState(1);
  const handlePage = (e, value) => {
    setpage(value);
  };

  function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

function generateExcelData() {
   const header = ['Date', 'Area Name','Confirmed','Death', 'Death Rate'];

  const rows = [header, ...data.map(item => [item.date, item.areaName, item.confirmed, item.death, item.deathRate])];

  return rows;
}

function downloadExcel() {
  const Report = generateExcelData();

  const ws = XLSX.utils.aoa_to_sheet(Report);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, 'data.xlsx');
}




  return (
    <>
<div className="flex justify-end">

     <button className="p-1 bg-lime-500 text-white" onClick={downloadExcel}>download</button>
</div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell align="right">Area Name</StyledTableCell>
              <StyledTableCell align="right">Confirmed</StyledTableCell>
              <StyledTableCell align="right">Death</StyledTableCell>
              <StyledTableCell align="right">Death Rate</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice((page - 1) * 10, (page - 1) * 10 + 10).map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.date}
                </StyledTableCell>
                <StyledTableCell align="right">{row?.areaName}</StyledTableCell>
                <StyledTableCell align="right">
                  {numberWithCommas(row?.confirmed)}
                </StyledTableCell>
                <StyledTableCell align="right">{numberWithCommas(row?.death)}</StyledTableCell>
                <StyledTableCell align="right">
                  {numberWithCommas(row?.deathRate)}
                </StyledTableCell>
                

                <StyledTableCell align="right">
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{width:"100%",display:"flex",justifyContent:"center"}}>

      <Pagination
      style={{padding:"20px"}}
        onChange={(e, value) => handlePage(e, value)}
        count={(data?.length / 10).toFixed(0)}
        variant="outlined"
        />
        </div>
    </>
  );
}
