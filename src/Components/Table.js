import React from "react";
import MUIDataTable from "mui-datatables";
import { TextField, TablePagination, createTheme, MuiThemeProvider } from "@mui/material";

// Create a custom theme for the data table
const theme = createTheme({
  overrides: {
    MUIDataTableToolbar: {
      root: {
        backgroundColor: "#e0e0e0", // Customize the toolbar background color
      },
    },
    MUIDataTableHeadCell: {
      fixedHeader: {
        backgroundColor: "#e0e0e0", // Customize the header cell background color
      },
    },
  },
});

const EmployeeTable = ({ data, columns }) => {
  const options = {
    filterType: "checkbox",
    customSearchRender: (searchText, handleSearch, hideSearch, options) => {
      return (
        <TextField
          variant="outlined"
          margin="normal"
          placeholder="Search"
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          InputProps={{
            endAdornment: (
              <button onClick={hideSearch}>Close</button>
            ),
          }}
        />
      );
    },
  };

  return (
      <MUIDataTable
        title={"Employee List"}
        data={data}
        columns={columns}
        options={options}
      />
  );
};

export default EmployeeTable;
