import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import "./App.css";
import { navData } from "./assets/navData";
import TreeNode from "./components/TreeNode";
import PageContent from "./components/PageContent";
import ModalContainer from "./helperComponents/ModalContainer";
function App() {
  const [openNodeIdsByLevel, setOpenNodeIdsByLevel] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [mobile, setMobile] = useState(window.innerWidth <= 500);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  //lifted state up from TreeNode component to keep track of Open Nodes by Levels in the Tree
  const toggleNode = (nodeId, level) => {
    setOpenNodeIdsByLevel((prevState) => ({
      ...prevState,
      [level]: prevState[level] === nodeId ? null : nodeId,
    }));
  };

  /*function to check if the correct node is open using the state 
  variable to check which node was open previously*/
  const isNodeOpen = (nodeId, level) => {
    return openNodeIdsByLevel[level] === nodeId;
  };

  //function to set the message/title of the modal pop up
  function showTitle(message) {
    setMessage(message);
    setIsModalOpen(true);
  }

  //function to check inner width to check if device type is mobile
  function handleWindowSizeChange() {
    setMobile(window.innerWidth <= 500);
  }

  //Added useEffect to add and remove eventlistener on resizing to check the device type
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  /*
  render TreeNode if navData is present, added modal pop-up using createPortal, added newly created
  component to show the title/label of the node clicked by the user. 
  */
  return (
    <>
      <div className="main-content">
        <div>
          {navData && (
            <TreeNode
              node={navData}
              level={0}
              showTitle={showTitle}
              toggleNode={toggleNode}
              isNodeOpen={isNodeOpen}
            />
          )}
        </div>
        <div className="page-content">
          {!mobile && <PageContent title={message} />}
          {mobile && isSidePanelOpen && (
            <PageContent
              title={message}
              isSidePanelOpen={isSidePanelOpen}
              setIsSidePanelOpen={setIsSidePanelOpen}
            />
          )}
        </div>
      </div>
      {isModalOpen &&
        message.length > 0 &&
        createPortal(
          <ModalContainer
            message={message}
            onClose={() => {
              setIsModalOpen(false);
              setIsSidePanelOpen(true);
            }}
          />,
          document.body
        )}
    </>
  );
}

export default App;
