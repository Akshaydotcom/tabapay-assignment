import { useState } from 'react';
import { createPortal } from "react-dom";
import './App.css'
import {navData} from './assets/navData';
import TreeNode from './components/TreeNode';
import ModalContainer from "./helperComponents/ModalContainer";
function App() {
  const [openNodeIdsByLevel, setOpenNodeIdsByLevel] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");
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

  //render TreeNode if navData is present, added modal pop-up using createPortal 
  return (
    <>
      {navData && <TreeNode
            node={navData}
            level={0}
            showTitle={showTitle}
            toggleNode={toggleNode}
            isNodeOpen={isNodeOpen}
          />}
          {isModalOpen &&
        message.length > 0 &&
        createPortal(
          <ModalContainer
            message={message}
            onClose={() => {
              setIsModalOpen(false);
            }}
          />,
          document.body
        )}
    </>
  )
}

export default App
