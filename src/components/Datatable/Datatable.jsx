import "./style.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userRows, userColumns } from "@/pages/admin/list/resource";

const Datatable = () => {
  console.log("Rendering Datatable component");
  console.log("Rows:", userRows);
  console.log("Columns:", userColumns);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: () => {
        return (
          <div className="cellAct">
            <div className="view">Edit</div>
            <div className="delete">Delete</div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      {console.log("Tesss")}
      <DataGrid
        rows={userRows}
        columns={userColumns.concat(actionColumn)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
