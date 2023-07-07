import React from "react";
import { ReactComponent as LeftArrow } from "../common/images/angle-left-solid.svg";
import { ReactComponent as RightArrow } from "../common/images/angle-right-solid.svg";
import { ReactComponent as LeftDoubleArrow } from "../common/images/Doubleangles-left-solid.svg";
import { ReactComponent as RightDoubleArrow } from "../common/images/Doubleangles-right-solid.svg";
import "./Pagination.css";

function NavButton({ number, active }) {
  return (
    <button
      className={`page-link rounded-btn ${
        active ? "active-page" : "inactive-page"
      }`}
    >
      <p className="page-number">{number}</p>
    </button>
  );
}

function PrevAndNextButton({ left, right, onClick, currentPage, pageNumbers }) {
  const handleClick = (typeOfAction) => {
    onClick(typeOfAction);
  };

  return (
    <>
      {left != null ? (
        <button
          className="rounded-btn"
          onClick={() => handleClick("left")}
          style={{
            backgroundColor:
              currentPage === 1
                ? "var( --secondary-color)"
                : "var(--secondary-button-color)",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
          }}
        >
          <LeftArrow fill="white" width="1.3rem" height="1.3rem" />
        </button>
      ) : (
        <button
          className="rounded-btn"
          onClick={() => handleClick("right")}
          style={{
            backgroundColor:
              currentPage === pageNumbers[pageNumbers.length - 1]
                ? "var( --secondary-color)"
                : "var(--secondary-button-color)",
            cursor:
              currentPage === pageNumbers[pageNumbers.length - 1]
                ? "not-allowed"
                : "pointer",
          }}
        >
          <RightArrow fill="white" width="1.3rem" height="1.3rem" />
        </button>
      )}
    </>
  );
}

function PrevAndNextSkipButton({
  left,
  right,
  onClick,
  currentPage,
  pageNumbers,
}) {
  const handleClick = (typeOfAction) => {
    onClick(typeOfAction);
  };
  return (
    <>
      {left != null ? (
        <button
          className="rounded-btn"
          onClick={() => handleClick("left")}
          style={{
            backgroundColor:
              currentPage === 1
                ? "var( --secondary-color)"
                : "var(--secondary-button-color)",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
          }}
        >
          <LeftDoubleArrow fill="white" width="1.3rem" height="1.3rem" />
        </button>
      ) : (
        <button
          className="rounded-btn"
          onClick={() => handleClick("right")}
          style={{
            backgroundColor:
              currentPage === pageNumbers[pageNumbers.length - 1]
                ? "var( --secondary-color)"
                : "var(--secondary-button-color)",
            cursor:
              currentPage === pageNumbers[pageNumbers.length - 1]
                ? "not-allowed"
                : "pointer",
          }}
        >
          <RightDoubleArrow fill="white" width="1.3rem" height="1.3rem" />
        </button>
      )}
    </>
  );
}

export default NavButton;
export { PrevAndNextButton, PrevAndNextSkipButton };
