import { useState, useEffect } from "react";
export default function PageContent({
  title,
  isSidePanelOpen,
  setIsSidePanelOpen,
}) {

  const [pageData, setPageData] = useState();
  const [error, setError]=useState();
  //Added useEffect and appropriate states to fetch data from API, and handle errors if any
  useEffect(() => {
    fetch("http://localhost:3000/page-data")
      .then((res) => res.json())
      .then((pageData) => {
        setPageData(pageData);
      }).catch((error)=>{
        setPageData([]);
        setError(error.message)
      });
  }, []);

  return (
    <div className={`panel ${isSidePanelOpen ? "open" : ""}`}>
      {isSidePanelOpen ? (
        <div className="sidePanel-header">
          <h1>{title}</h1>
          <button
            onClick={() => {
              setIsSidePanelOpen(false);
            }}
          >
            Close
          </button>
        </div>
      ) : (
        <h1>{title}</h1>
      )}
      <div className="different-category-content">
        {!error && pageData?.length > 0 &&
          pageData.map((object, index) => {
            return (
              <div key={index}>
                <details>
                  <summary>{object.title}</summary>
                  <span>{object.content}</span>
                </details>
              </div>
            );
          })}
          {error && <h1>Error Occurred: {error}</h1>}
      </div>
    </div>
  );
}
