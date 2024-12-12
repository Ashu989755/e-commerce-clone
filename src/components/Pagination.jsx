const Pagination = ({ total, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(total / 10);

  // If total is less than or equal to 10, return null
  if (total <= 10) return null;

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  //  pagination algorithm
  if (!currentPage || !totalPages) return null;

  const prev = currentPage === 1 ? null : currentPage - 1;
  const next = currentPage === totalPages ? null : currentPage + 1;
  const visiblePages = [1];

  if (currentPage === 1 && totalPages === 1)x
    return { currentPage, prev, next, visiblePages };
  if (currentPage > 4) visiblePages.push("…");

  const r = 2;
  const r1 = currentPage - r;
  const r2 = currentPage + r;

  for (let i = r1 > 2 ? r1 : 2; i <= Math.min(totalPages, r2); i++)
    visiblePages.push(i);

  if (r2 + 1 < totalPages) visiblePages.push("…");
  if (r2 < totalPages) visiblePages.push(totalPages);

  // Calculate the start and end range based on the current page
  const startRange = (currentPage - 1) * 10 + 1;
  const endRange = Math.min(currentPage * 10, total);

  return (
    <section className="px-6 pb-10">
      <div className="container mx-auto">
        <div className="flex items-center  justify-between px-3 lg:px-0 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={handlePreviousPage}
              className="disabled:bg-gray-100 relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={handleNextPage}
              className="disabled:bg-gray-100 relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing
                <span className="font-medium"> {startRange} </span>
                to
                <span className="font-medium"> {endRange} </span>
                of
                <span className="font-medium"> {total} </span>
                results
              </p>
            </div>
            <div>
              <nav
                className="isolate gap-2 inline-flex -space-x-px rounded-md "
                aria-label="Pagination"
              >
                <button
                  type="button"
                  onClick={handlePreviousPage}
                  className="relative inline-flex rounded-md bg-white items-center shadow-md  px-2 py-2 text-gray-400 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {visiblePages.map((page) => (
                  <div key={page}>
                    {page === "…" ? (
                      <span className="cursor-not-allowed relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700  ring-inset focus:outline-offset-0">
                        ...
                      </span>
                    ) : (
                      <div
                        className={`relative inline-flex items-center  border-0 rounded-md px-4 py-2 text-sm font-semibold shadow-md ${
                          currentPage === page
                            ? "bg-black text-white"
                            : "text-gray-800 bg-white"
                        }  ring-inset cursor-pointer hover:text-white hover:bg-gray-800 focus:z-20 focus:outline-offset-0`}
                        onClick={() => onPageChange(page)}
                      >
                        {page}
                      </div>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleNextPage}
                  className="relative inline-flex items-center bg-white shadow-md rounded-md px-2 py-2 text-gray-800 ring-inset  hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pagination;
