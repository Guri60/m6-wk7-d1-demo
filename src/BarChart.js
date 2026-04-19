import { useState } from "react";

const createData = () =>
  Array.from({ length: 10 }, (_, i) => ({
    name: `Item ${i + 1}`,
    value: Math.floor(Math.random() * 100)
  }));

export default function BarChart() {
  const [data, setData] = useState(createData());

  const addItem = () => {
    setData([
      ...data,
      {
        name: `Item ${data.length + 1}`,
        value: Math.floor(Math.random() * 100)
      }
    ]);
  };

  const removeItem = () => {
    if (data.length === 0) return;
    setData(data.slice(0, -1));
  };

  const updateValues = () => {
    setData(data.map(d => ({ ...d, value: Math.random() * 100 })));
  };

  return (
    <div>
      <button onClick={addItem}>Add item</button>
      <button onClick={removeItem}>Remove item</button>
      <button onClick={updateValues}>Update values</button>

      <div style={{ marginTop: 20 }}>
        {data.map((d, i) => (
          <div key={i} style={{ marginBottom: 12 }}>
            <span style={{ width: 80, display: "inline-block" }}>
              {d.name}
            </span>

            <div
              style={{
                display: "inline-block",
                height: 25,
                width: `${d.value * 5}px`,
                background: "#3b8ea5",
                borderRadius: 4,
                color: "white",
                textAlign: "right",
                paddingRight: 8,
                lineHeight: "25px",
                transition: "all 0.5s ease"
              }}
            >
              {Math.round(d.value)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
