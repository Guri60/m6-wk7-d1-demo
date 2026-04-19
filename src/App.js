import BarChart from "./BarChart";
import TreeChart from "./TreeChart";

export default function App() {
  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h2>Animated Bar Chart</h2>
      <BarChart />

      <h2 style={{ marginTop: 60 }}>Collapsible Tree</h2>
      <TreeChart />
    </div>
  );
}