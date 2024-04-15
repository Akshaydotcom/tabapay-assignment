import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import "./App.css";
import logo from "../public/p2.png";
import TreeNode from "./components/TreeNode";
import PageContent from "./components/PageContent";
import ModalContainer from "./helperComponents/ModalContainer";
function App() {
  const [openNodeIdsByLevel, setOpenNodeIdsByLevel] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [mobile, setMobile] = useState(window.innerWidth <= 500);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [navData, setNavData] = useState();
  const [error,setError]=useState();
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
  //Updated useEffect to fetch Data from API and handle errors if any
  useEffect(() => {

    fetch("http://localhost:3000/nav-data")
      .then((res) => res.json())
      .then((navData) => {
        setNavData(navData);
      }).catch((error)=>{
        setError(error.message);
      });

    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  /*
  render TreeNode if navData is present, added modal pop-up using createPortal, added newly created
  component to show the title/label of the node clicked by the user. 
  Added header and footers, changed html semantics 
  Added error handling code.
  */
  return (
    <>
      <header>
        <img src={logo} alt="logo" className="logo" />
        <h1>Developers UI Project</h1>
      </header>
      <div className="main-content">
        <aside>
          {!error && navData && (
            <TreeNode
              node={navData}
              level={0}
              showTitle={showTitle}
              toggleNode={toggleNode}
              isNodeOpen={isNodeOpen}
            />
          )}
          {error && <h1>Error Occurred: {error}</h1>}
        </aside>
        <main>
          <article>
            {!mobile && <PageContent title={message} />}
            {mobile && isSidePanelOpen && (
              <PageContent
                title={message}
                isSidePanelOpen={isSidePanelOpen}
                setIsSidePanelOpen={setIsSidePanelOpen}
              />
            )}
          </article>
        </main>
      </div>

      <footer>
        <img src={logo} alt="logo" className="logo" />
        <pre>@ 2023-2024 Personal Made with React.js</pre>
      </footer>
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
