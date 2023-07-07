import React, { useCallback, useEffect, useState } from "react";
import { getPageNumbers } from "../utils/utils";
import NavButton from "./NavButton";
import "./Pagination.css";
import { PrevAndNextButton, PrevAndNextSkipButton } from "./NavButton";
function Pagination({
  userPerPage,
  totalUsers,
  pagesToDisplay,
  setPageChange,
  currentPage,
  lastPage,
}) {
  const [pageNumbers, setPageNumbers] = useState([]);
  const totalPages = Math.ceil(totalUsers / userPerPage);

  /**
   * Calculate and update the page numbers to display in the pagination component
   */
  useEffect(() => {
    const totalPages = Math.ceil(totalUsers / userPerPage);
    const pageNumbers = getPageNumbers(currentPage, totalPages, pagesToDisplay);
    setPageNumbers(pageNumbers);
    if (pageNumbers.length !== 0) {
      lastPage(pageNumbers[pageNumbers.length - 1]);
    }
  }, [totalUsers, currentPage]);

  /**
   * This function is a callback that updates the current page number.
   * It takes in a number as an argument and sets the page change state to that number.
   */
  const handlePageChange = useCallback((number) => {
    setPageChange(number);
  }, []);

  /**
   * This function handles the previous and next buttons for pagination.
   * It takes in a string argument, "typeOfAction", which specifies the type of action to perform.
   * If the typeOfAction is "left" and the currentPage is greater than the first page number, it decrements the currentPage by 1.
   * If the typeOfAction is "right" and the currentPage is less than the last page number, it increments the currentPage by 1.
   */
  const handlePrevAndNext = (typeOfAction) => {
    if (typeOfAction === "left" && currentPage > pageNumbers[0]) {
      setPageChange(currentPage - 1);
    } else if (
      typeOfAction === "right" &&
      currentPage < pageNumbers[pageNumbers.length - 1]
    ) {
      setPageChange(currentPage + 1);
    }
  };

  /**
   * This function handles the skip to first and last page buttons for pagination.
   * It takes in a string argument, "typeOfAction", which specifies the type of action to perform.
   * If the typeOfAction is "left" and the currentPage is greater than or equal to the first page number, it sets the currentPage to 1.
   * If the typeOfAction is "right" and the currentPage is less than or equal to the last page number, it sets the currentPage to totalPages.
   */
  const handlePrevAndNextSkipButton = (typeOfAction) => {
    if (typeOfAction === "left" && currentPage >= pageNumbers[0]) {
      setPageChange(1);
    } else if (
      typeOfAction === "right" &&
      currentPage <= pageNumbers[pageNumbers.length - 1]
    ) {
      setPageChange(totalPages);
    }
  };

  return (
    <>
      <div className="left-btn-container">
        <div className="left-btn-section">
          <PrevAndNextSkipButton
            left={true}
            right={null}
            onClick={handlePrevAndNextSkipButton}
            currentPage={currentPage}
            pageNumbers={pageNumbers}
          />
          <PrevAndNextButton
            left={true}
            right={null}
            onClick={handlePrevAndNext}
            currentPage={currentPage}
            pageNumbers={pageNumbers}
          />
          <ul className="pagination">
            {pageNumbers.map((number) => (
              <li key={number} onClick={() => handlePageChange(number)}>
                <NavButton number={number} active={number === currentPage} />
              </li>
            ))}
          </ul>
          <PrevAndNextButton
            left={null}
            right={true}
            onClick={handlePrevAndNext}
            currentPage={currentPage}
            pageNumbers={pageNumbers}
          />
          <PrevAndNextSkipButton
            left={null}
            right={true}
            onClick={handlePrevAndNextSkipButton}
            currentPage={currentPage}
            pageNumbers={pageNumbers}
          />
        </div>
      </div>
    </>
  );
}

export default Pagination;
