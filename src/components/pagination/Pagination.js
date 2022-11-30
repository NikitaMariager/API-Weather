import React from "react";
import "./pagination.scss";

function Pagination({ currentPage, setCurrentPage, itemPerPage, itemsTotal }) {
  //Beregn hvor mange 'sider' der skal være
  let numberOfPages = Math.ceil(itemsTotal / itemPerPage); //beregner antaler sider udfra antal items og runder op

  return (
    <div className="pagination">
      <button
        disabled={currentPage <= 0}
        onClick={() => {
          setCurrentPage(currentPage - 1);
        }}
      >
        &lt;&lt; Prev
      </button>
      {/* paginations side-buttons */}
      {[...Array(numberOfPages)].map((x, i) => (
        <button
          onClick={() => setCurrentPage(i)}
          className={i === currentPage ? "active" : null}
        >
          {i + 1}
        </button>
      ))}

      <button
        disabled={currentPage >= numberOfPages - 1}
        onClick={() => {
          setCurrentPage(currentPage + 1);
        }}
      >
        Next &gt;&gt;
      </button>
    </div>
  );
}

export default Pagination;
