/**
 * This function filters user records based on a search key.
 * @param {string} searchKey - The search key to filter user records by.
 * @param {Object} user - The user object to check against the search key.
 * @param {string} user.name - The name of the user.
 * @param {string} user.email - The email of the user.
 * @param {string} user.role - The role of the user.
 * @returns {boolean} Returns true if the user's name, email, or role includes the search key (case-insensitive), and false otherwise.
 */

function userFilter(searchKey, user) {
  return (
    user.name.toLowerCase().includes(searchKey.toLowerCase()) ||
    user.email.toLowerCase().includes(searchKey.toLowerCase()) ||
    user.role.toLowerCase().includes(searchKey.toLowerCase())
  );
}

/**
 *
 * Returns an array of page numbers to display in pagination component.
 *
 * @param {number} currentPage - The current page number.
 * @param {number} totalPages - The total page number.
 * @param {number} pagesToDisplay - The maximum number of pages to display.
 * @returns {number[]} - An array of page numbers to display.
 */

function getPageNumbers(currentPage, totalPages, pagesToDisplay) {
  if (totalPages === 0) {
    return [];
  }
  let pageNumbers = [];

  let mid = Math.floor(pagesToDisplay / 2);

  let startPage, endPage;

  if (totalPages === pagesToDisplay) {
    startPage = 1;
    endPage = totalPages;
  } else {
    if (currentPage <= mid) {
      startPage = 1;
    } else {
      startPage = currentPage - mid;
    }

    if (totalPages <= pagesToDisplay) {
      endPage = totalPages;
    } else {
      endPage = startPage + pagesToDisplay - 1;
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return pageNumbers;
}

/**
 * This function returns a list of users for the current page based on the number of users to display per page.
 * @param {Array} userList - The list of all users.
 * @param {number} currentUserPage - The current page number.
 * @param {number} userPerPage - The number of users to display per page.
 * @returns {Array} Returns a list of users for the current page.
 */
function getCurrentListOfUsers(userList, currentUserPage, userPerPage) {
  const indexOfLastUser = currentUserPage * userPerPage;
  const indexOfFirstUser = indexOfLastUser - userPerPage;
  const currentListOfUsers = userList.slice(indexOfFirstUser, indexOfLastUser);

  return currentListOfUsers;
}

/**
 * This function calculates the total number of pages required to display all users based on the number of users to display per page.
 * @param {Array} userList - The list of all users.
 * @param {number} userPerPage - The number of users to display per page.
 * @returns {number} Returns the total number of pages required.
 */
function getTotalPages(userList, userPerPage) {
  return Math.ceil(userList.length / userPerPage);
}

/**
 * This function calculates the index of the first and last user to display on the current page based on the number of users to display per page.
 * @param {number} currentPage - The current page number.
 * @param {number} userPerPage - The number of users to display per page.
 * @returns {Object} Returns an object containing the index of the first and last user to display on the current page.
 */
function calculatePageIndex(currentPage, userPerPage) {
  const indexOfLastUser = currentPage * userPerPage;
  const indexOfFirstUser = indexOfLastUser - userPerPage;

  return {
    indexOfFirstUser: indexOfFirstUser,
    indexOfLastUser: indexOfLastUser,
  };
}

/**
 * This function returns the IDs of users that have been selected using a checkbox.
 * @param {Array} users - The list of all users.
 * @param {Object} user - A user object.
 * @param {number} user.id - The ID of the user.
 * @param {boolean} user.isSelected - Whether the user has been selected using a checkbox.
 * @returns {Array} Returns an array of user IDs for users that have been selected using a checkbox.
 */

function getCheckedUsers(users) {
  const userIds = users
    .filter((user) => user.isSelected)
    .map((user) => user.id);

  return userIds;
}

export {
  userFilter,
  getPageNumbers,
  getCurrentListOfUsers,
  getTotalPages,
  calculatePageIndex,
  getCheckedUsers,
};
