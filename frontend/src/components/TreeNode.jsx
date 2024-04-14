export default function TreeNode({
  node,
  level,
  showTitle,
  toggleNode,
  isNodeOpen,
}) {
  //created unique IDs for each node using level and label
  const nodeId = `${level}-${node.label}`;
  const isOpen = isNodeOpen(nodeId, level);

  //function to toggle open and closing of node, added label as parameter to show label on Modal Pop-up
  function handleClick(label) {
    toggleNode(nodeId, level);
    showTitle(label);
  }

  //Using recursive BFS to render TreeNodes once each node has been opened
  //Added showTitle to the recursive call
  return (
    <>
      <div
        onClick={() => {
          handleClick(node.label);
        }}
        style={{ paddingLeft: level * 20 + "px" }}
        id={`${level}-${node.label}`}
      >
        {node.children && (
          <span className="toggle-icon">{isOpen ? "▼" : "▶"}</span>
        )}
        {!node.children && <span>&bull;</span>}
        {node.label}
      </div>

      {isOpen && Array.isArray(node.children) && (
        <>
          {node.children.map((childNode, index) => {
            return (
              <TreeNode
                key={index}
                node={childNode}
                showTitle={showTitle}
                level={level + 1}
                toggleNode={toggleNode}
                isNodeOpen={isNodeOpen}
              />
            );
          })}
        </>
      )}
    </>
  );
}
