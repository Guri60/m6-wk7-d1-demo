import { hierarchy, tree } from "d3";
import { useState } from "react";

const initialData = {
  name: "T",
  children: [
    {
      name: "A",
      children: [{ name: "A1" }, { name: "A2" }]
    },
    {
      name: "B",
      children: [{ name: "B1" }]
    }
  ]
};

export default function TreeChart() {
  const [orientation, setOrientation] = useState("vertical");
  const [linkType, setLinkType] = useState("diagonal");
  const [collapsed, setCollapsed] = useState({});

  const toggle = name => {
    setCollapsed(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const buildTree = data => {
    const root = hierarchy(data, d =>
      collapsed[d.name] ? null : d.children
    );
    return tree().size([400, 300])(root);
  };

  const root = buildTree(initialData);

  const getPath = link => {
    if (linkType === "line") {
      return `M${link.source.y},${link.source.x} L${link.target.y},${link.target.x}`;
    }

    if (linkType === "step") {
      return `M${link.source.y},${link.source.x} 
              H${(link.source.y + link.target.y) / 2}
              V${link.target.x}
              H${link.target.y}`;
    }

    // diagonal
    return `M${link.source.y},${link.source.x}
            C${(link.source.y + link.target.y) / 2},${link.source.x}
             ${(link.source.y + link.target.y) / 2},${link.target.x}
             ${link.target.y},${link.target.x}`;
  };

  return (
    <div>
      {/* Controls (like your screenshot) */}
      <div style={{ marginBottom: 10 }}>
        orientation:
        <select
          value={orientation}
          onChange={e => setOrientation(e.target.value)}
        >
          <option value="vertical">vertical</option>
          <option value="horizontal">horizontal</option>
        </select>

        link:
        <select
          value={linkType}
          onChange={e => setLinkType(e.target.value)}
        >
          <option value="diagonal">diagonal</option>
          <option value="step">step</option>
          <option value="line">line</option>
        </select>
      </div>

      <svg width={600} height={400} style={{ background: "#888", borderRadius: 20 }}>
        {/* Links */}
        {root.links().map((link, i) => (
          <path
            key={i}
            d={getPath(link)}
            fill="none"
            stroke="white"
          />
        ))}

        {/* Nodes */}
        {root.descendants().map((node, i) => (
          <g
            key={i}
            transform={`translate(${node.y}, ${node.x})`}
            onClick={() => toggle(node.data.name)}
            style={{ cursor: "pointer" }}
          >
            <circle r={12} fill="lightgray" />
            <text textAnchor="middle" dy="5">
              {node.data.name}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
