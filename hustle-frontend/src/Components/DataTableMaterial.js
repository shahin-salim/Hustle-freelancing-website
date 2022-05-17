import React, { useState } from 'react';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TextField from '@mui/material/TextField';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Pagination from '@mui/material/Pagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableContainer from '@mui/material/TableContainer';
import SkeltonLoadinAnimation from './SkeltonLoadinAnimation';




const DataTableMaterial = ({ tableHeading, title, datas, RowComponent, selectTagFileringItems, filterFunc }) => {


  const [orderDirection, setOrderDirection] = useState("asc");

  const [selected, setSelected] = React.useState(selectTagFileringItems[0]);

  const handleChange = (event) => {
    console.log(event.target.value);
    setSelected(event.target.value);
  };


  return (
    <>
      <h1 style={{ textAlign: "center" }}>{title}</h1>
      <div style={{ display: "flex", justifyContent: "end", padding: "0px 4px 0px 4px" }}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selected}
          label="field"
          onChange={handleChange}
        >

          {selectTagFileringItems.map((data, index) => <MenuItem key={index} value={data}>{data}</MenuItem>)}

        </Select>
        <TextField
          onChange={(e) => filterFunc(selected, e.target.value)}
          style={{ marginLeft: "10px" }}
          id="outlined-basic"
          label="Search"
          variant="outlined"
        />
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">

          {/* table heading */}
          <TableHead>
            <TableRow>
              {tableHeading && tableHeading.map((data, index) => <TableCell key={index} align="center">{data}</TableCell>)}
            </TableRow>
          </TableHead>

          <TableBody>

            {/* ============ Rows ============ */}
            {datas.map((data) => (
              <TableRow key={data.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <RowComponent data={data} />
              </TableRow>
            ))}

          </TableBody>

        </Table>

        {datas.length == 0 && (<SkeltonLoadinAnimation />)}

        <div style={{ display: "flex", justifyContent: "center", padding: "19px" }}>
          <Pagination count={5} color="secondary" />
        </div>
      </TableContainer>
    </>
  );
}

export default DataTableMaterial;