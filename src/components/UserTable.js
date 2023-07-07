import React, { useState, useEffect, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  editUserData,
  deleteUserData,
} from "../features/users/userSlice";
import { selectUserError } from "../features/users/userSlice";
import {
  userFilter,
  calculatePageIndex,
  getCheckedUsers,
} from "../utils/utils";
import { Snackbar } from "@mui/material";
import { SnackbarAlert } from "../themes/snackbarCustomTheme";
import SearchBar from "./SearchBar";
import UserRow from "./UserRow";
import TableHeader from "./TableHeader";
import Pagination from "./Pagination";
import DeleteButton from "./DeleteButton";
import "./UserTable.css";

function UserTable() {
  const users = useSelector((state) => state.users.users);
  const error = useSelector(selectUserError);

  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [userPerPage, setUsertPerPage] = useState(10);
  const [pagesToDisplay, setPagesToDisplay] = useState(5);
  const [lastPage, setLastPage] = useState();
  const [totalUsers, setTotalUsers] = useState();
  const [currentListOfUsers, setCurrentListOfUsers] = useState([]);
  const [filteredUserData, setFilteredUserData] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);

  const dispatch = useDispatch();

  /**
   * Fetch user data on initial load
   * Filters inital 10 user data;
   * This effect runs only once when the component mounts
   **/
  useEffect(() => {
    // Dispatch the fetchUsers action to retrieve user data from the API

    dispatch(fetchUsers());
    updateCurrentListOfUsers(users);
  }, []);

  /**
   * This effect users when there is a issue when fetching data
   */
  useEffect(() => {
    if (error) {
      // If there is an error, open the snackbar
      setSnackbarOpen(true);
    } else {
      // If there is no error, close the snackbar
      setSnackbarOpen(false);
    }
  }, [error]);

  /**
   * Filter user data based on the entered search text
   * This effect runs whenever the searchText value changes
   */
  useEffect(() => {
    // Call the filterUserData function with the current searchText value
    filterUserData(searchText);
  }, [searchText]);

  /**
   * Update the current list of users and pagination data when the user changes the page or when the filtered user data or users data changes
   */
  useEffect(() => {
    if (filteredUserData.length === 0 && searchText !== "") {
      // To display user not found snackbar
      setUserNotFound(true);
      setSnackbarOpen(true);
      // To update page numbers
      setTotalUsers(filteredUserData.length);
      setCurrentListOfUsers([]);
    } else if (filteredUserData.length === 0 && searchText === "") {
      updateCurrentListOfUsers(users);
      setTotalUsers(users.length);
      setPagesToDisplay(Math.ceil(users.length / userPerPage));
    }
  }, [currentPage, users, filteredUserData, userPerPage]);

  /**
   * Updates the totalUsers when users are deleted on the table
   * Handles 2 cases
   * 1. When user is deleted without searching.
   * 2. When user is deleted on search.
   */
  useEffect(() => {
    if (filteredUserData.length !== 0) {
      filterUserData(searchText);
      setTotalUsers(filteredUserData.length);
    } else {
      setTotalUsers(users.length);
    }
  }, [users]);

  /**
   * Update the current list of users and pagination data when the user changes the page or when the filtered user data changes
   */
  useEffect(() => {
    if (filteredUserData.length > 0) {
      updateCurrentListOfUsers(filteredUserData);
      setPagesToDisplay(Math.ceil(filteredUserData.length / userPerPage));
      setTotalUsers(filteredUserData.length);
    }
  }, [currentPage, filteredUserData, userPerPage]);

  /**
   * This effect handles the special case when all user data is deleted from the last page.
   * It updates the current page to show data from the previous page.
   */
  useEffect(() => {
    if (
      currentListOfUsers.length === 0 &&
      currentPage === lastPage &&
      (filteredUserData.length !== 0 || searchText === "")
    ) {
      setCurrentPage(lastPage - 1);
    }
  }, [currentListOfUsers]);

  /**
   * Filter user data based on the entered search text
   * @param {string} searchText - The text entered by the user to filter the data
   */

  const filterUserData = (searchText) => {
    let filterdData;
    if (searchText !== "") {
      // Filter the users array using the userFilter function, passing in the searchText value
      filterdData = users.filter(userFilter.bind(null, searchText));
      setFilteredUserData(filterdData);
    } else {
      setFilteredUserData([]);
    }
  };

  /**
   * Updates the current list of users based on the current page, user per page, and the data source.
   * @param {Array} data - The data source to use for updating the current list of users.
   */

  const updateCurrentListOfUsers = (data) => {
    const pageIndex = calculatePageIndex(currentPage, userPerPage);
    setCurrentListOfUsers(
      data.slice(pageIndex.indexOfFirstUser, pageIndex.indexOfLastUser)
    );
  };
  /**
   * Update the user information in the filtered user data and dispatch an action to update the user data in the store
   * @param {Object} userInfo - The updated user information
   * @param {string} userInfo.id - The id of the user to update
   * @param {string} userInfo.name - The updated name of the user
   * @param {string} userInfo.email - The updated email of the user
   * @param {string} userInfo.role - The updated role of the user
   */

  const updateUserInfo = ({ id, name, email, role }) => {
    // If there is filtered user data, update the user information in the filtered data.
    if (filteredUserData.length > 0) {
      // Find the index of the user to update in the filtered user data
      const userIndex = filteredUserData.findIndex((user) => user.id === id);
      // If the user is found, update their information in the filtered data
      if (userIndex !== -1) {
        filteredUserData[userIndex] = {
          ...filteredUserData[userIndex],
          name,
          email,
          role,
        };
        // Update the current list of users with the updated filtered data
        setCurrentListOfUsers(filteredUserData);
      }
    }
    // Dispatch an action to update the user information in the store
    dispatch(
      editUserData({
        id: id,
        name: name,
        email: email,
        role: role,
      })
    );
  };

  /**
   * Delete users from the filtered user data and dispatch an action to delete the users from the store
   * @param {Array} userIds - An array of user ids to delete
   */

  const deleteUser = (userIds) => {
    // Dispatch an action to delete the users from the store and reset select all button.
    dispatch(deleteUserData(userIds));
    setSelectAll(false);
  };

  /**
   * Handle the select all button to select or deselect all users on the page
   * @param {boolean} checkedStatus - The checked status of the select all button
   */

  const handleSeleteAll = (checkedStatus) => {
    setSelectAll(!selectAll);
    const newList = currentListOfUsers.map((user) => {
      return {
        ...user,
        isSelected: checkedStatus,
      };
    });
    setCurrentListOfUsers(newList);
  };

  /**
   * Handles the closing of the snackbar.
   *
   * @param {Event} event - The event that triggered the snackbar to close.
   * @param {string} reason - The reason why the snackbar was closed.
   */
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      // If the snackbar was closed because the user clicked away, do nothing
      return;
    }
    // Otherwise, close the snackbar
    setSnackbarOpen(false);
  };

  return (
    <>
      <SearchBar onSearchTextChange={setSearchText} searchText={searchText} />
      <div className="user-table">
        <table className="myTable">
          <thead>
            <TableHeader
              handleSeleteAll={handleSeleteAll}
              selectStatus={selectAll}
            />
          </thead>
          {error !== "" ? (
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={4000}
              onClose={handleSnackbarClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
            >
              <SnackbarAlert onClose={handleSnackbarClose} severity="error">
                Failed to fetch user data please try again later!.
              </SnackbarAlert>
            </Snackbar>
          ) : (
            <tbody>
              {filteredUserData.length >= 0
                ? currentListOfUsers.map((user) => (
                    <UserRow
                      user={user}
                      updatedUserInfo={updateUserInfo}
                      deleteUser={deleteUser}
                    />
                  ))
                : currentListOfUsers.map((user) => (
                    <UserRow
                      user={user}
                      updatedUserInfo={updateUserInfo}
                      deleteUser={deleteUser}
                    />
                  ))}
            </tbody>
          )}
          {userNotFound && (
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={1000}
              onClose={handleSnackbarClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
            >
              <SnackbarAlert onClose={handleSnackbarClose} severity="error">
                User Doesn't Exisit
              </SnackbarAlert>
            </Snackbar>
          )}
        </table>
      </div>
      <div className="buttons-container">
        <div className="right-btn-section">
          <DeleteButton
            onClick={() => {
              const userIds = getCheckedUsers(currentListOfUsers);
              deleteUser(userIds, true);
            }}
          />
        </div>
        <Pagination
          userPerPage={userPerPage}
          totalUsers={totalUsers}
          pagesToDisplay={pagesToDisplay}
          setPageChange={(number) => {
            setCurrentPage(number);
          }}
          currentPage={currentPage}
          lastPage={setLastPage}
        />
      </div>
    </>
  );
}

export default UserTable;
