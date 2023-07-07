import React from "react";
// import "./UserTable.css";

function TableHeader({ handleSeleteAll, selectStatus }) {
  return (
    <tr className="table-headers">
      <td>
        <input
          type="checkbox"
          onClick={(e) => {
            handleSeleteAll(e.target.checked);
          }}
          checked={selectStatus}
        />
      </td>
      <th>Name</th>
      <th>Email</th>
      <th>Role</th>
      <th>Actions</th>
    </tr>
  );
}

export default TableHeader;
