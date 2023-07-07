import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { ReactComponent as TrashIcon } from "../common/images/trash-solid.svg";
import { ReactComponent as EditIcon } from "../common/images/edit-icon.svg";
import { userDataSelect } from "../features/users/userSlice";
import { useDispatch } from "react-redux";
import "./UserRow.css";

export default function UserRow({ user, updatedUserInfo, deleteUser }) {
  const dispatch = useDispatch();
  const [isEditing, setisEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const handleEdit = () => {
    setisEditing(!isEditing);
  };

  const handleDelte = () => {
    deleteUser([user.id]);
  };

  const handleSelectChange = (e) => {
    dispatch(userDataSelect({ id: user.id, checkedStatus: e.target.checked }));
  };

  return isEditing ? (
    <EditedRow
      userName={user.name}
      userEmail={user.email}
      userRole={user.role}
      userId={user.id}
      onChange={updatedUserInfo}
      finishedEditing={handleEdit}
    />
  ) : (
    <tr className="table-headers" key={user.id}>
      <td>
        <input
          type="checkbox"
          checked={user.isSelected}
          onChange={handleSelectChange}
        />
      </td>
      <>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.role}</td>
        <td>
          <span
            style={{ cursor: "pointer" }}
            onClick={(event) => {
              event.preventDefault();
              handleEdit();
            }}
          >
            <EditIcon fill="#ff5070" height="1rem" width="1rem" />
          </span>
          <span className="action-button" style={{ cursor: "pointer" }}>
            <TrashIcon onClick={handleDelte} height="1rem" width="1rem" />
          </span>
        </td>
      </>
    </tr>
  );
}

function EditedRow({
  userName,
  userEmail,
  userRole,
  userId,
  onChange,
  finishedEditing,
}) {
  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [role, setRole] = useState(userRole);

  const handleUpdate = () => {
    onChange({
      id: userId,
      name: name,
      email: email,
      role: role,
    });
    finishedEditing();
  };

  return (
    <>
      <td>
        <input type="checkbox" style={{ display: "none" }} />
      </td>
      <td>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          className="edit-input-field"
        />
      </td>
      <td>
        <input
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="edit-input-field"
        />
      </td>
      <td>
        <input
          type="text"
          value={role}
          onChange={(e) => {
            setRole(e.target.value);
          }}
          className="edit-input-field"
        />
      </td>
      <td>
        <button
          onClick={() => {
            handleUpdate(userId);
          }}
          className="update-btn"
        >
          {" "}
          Update
        </button>
      </td>
    </>
  );
}

UserRow.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
};
