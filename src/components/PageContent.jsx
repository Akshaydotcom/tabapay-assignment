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
      </div>
    );
  }
  