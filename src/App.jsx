import { useState } from 'react';
import './App.css'
import {navData} from './assets/navData';
import TreeNode from './components/TreeNode';
function App() {
  const [openNodeIdsByLevel, setOpenNodeIdsByLevel] = useState({});

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

  //render TreeNode if navData is present
  return (
    <>
      {navData && <TreeNode
            node={navData}
            level={0}
            toggleNode={toggleNode}
            isNodeOpen={isNodeOpen}
          />}
    </>
  )
}

export default App
