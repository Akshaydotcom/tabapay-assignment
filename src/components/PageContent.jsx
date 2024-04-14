import { pageData } from "../assets/pageData.js";

export default function PageContent({
  title,
  isSidePanelOpen,
  setIsSidePanelOpen,
}) {
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
        {pageData?.length > 0 &&
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
      </div>
    </div>
  );
}
