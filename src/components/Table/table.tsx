import { useState, useEffect } from "react";
import jsonData from "../../data/semantic-segmentation.json";
import "./table.css";

// Define the type for your data
interface ModelPerformance {
  dataset: string;
  architecture: string;
  backbone: string;
  cropSize: string;
  trained: boolean;
  bestMiou: number;
  iterations: number;
}

const Table = () => {
  const [data, setData] = useState<ModelPerformance[]>([]);
  const [rowLimit, setRowLimit] = useState<number>(5); // State for row limit
  const [sortConfig, setSortConfig] = useState<{
    key: keyof ModelPerformance | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });

  useEffect(() => {
    setData(jsonData);
  }, []);

  const sortData = (key: keyof ModelPerformance) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setData(sortedData);
    setSortConfig({ key, direction });
  };

  const getHeaderClass = (key: keyof ModelPerformance) => {
    if (!sortConfig.key) return "";
    return sortConfig.key === key ? sortConfig.direction : "";
  };

  // Handle row limit change
  const handleRowLimitChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRowLimit(Number(event.target.value));
  };

  // Slice data based on row limit
  const visibleData = data.slice(0, rowLimit);

  return (
    <div>
      <div className="row-limit-selector">
        <label htmlFor="rowLimit">Show rows: </label>
        <select id="rowLimit" value={rowLimit} onChange={handleRowLimitChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>

      <table className="scientific-table">
        <caption>Leaderboard: Semantic-Segmentation</caption>
        <thead>
          <tr>
            <th
              onClick={() => sortData("dataset")}
              className={getHeaderClass("dataset")}
            >
              Dataset{" "}
              {sortConfig?.key === "dataset" &&
                (sortConfig.direction === "asc" ? "🔼" : "🔽")}
            </th>
            <th
              onClick={() => sortData("architecture")}
              className={getHeaderClass("architecture")}
            >
              Model{" "}
              {sortConfig?.key === "architecture" &&
                (sortConfig.direction === "asc" ? "🔼" : "🔽")}
            </th>
            <th
              onClick={() => sortData("backbone")}
              className={getHeaderClass("backbone")}
            >
              Backbone{" "}
              {sortConfig?.key === "backbone" &&
                (sortConfig.direction === "asc" ? "🔼" : "🔽")}
            </th>
            <th
              onClick={() => sortData("cropSize")}
              className={getHeaderClass("cropSize")}
            >
              Crop Size{" "}
              {sortConfig?.key === "cropSize" &&
                (sortConfig.direction === "asc" ? "🔼" : "🔽")}
            </th>
            <th
              onClick={() => sortData("trained")}
              className={getHeaderClass("trained")}
            >
              Trained{" "}
              {sortConfig?.key === "trained" &&
                (sortConfig.direction === "asc" ? "🔼" : "🔽")}
            </th>
            <th
              onClick={() => sortData("bestMiou")}
              className={getHeaderClass("bestMiou")}
            >
              mIoU{" "}
              {sortConfig?.key === "bestMiou" &&
                (sortConfig.direction === "asc" ? "🔼" : "🔽")}
            </th>
            <th
              onClick={() => sortData("iterations")}
              className={getHeaderClass("iterations")}
            >
              Iterations{" "}
              {sortConfig?.key === "iterations" &&
                (sortConfig.direction === "asc" ? "🔼" : "🔽")}
            </th>
          </tr>
        </thead>
        <tbody>
          {visibleData.map((item, index) => (
            <tr key={index}>
              <td>{item.dataset}</td>
              <td>{item.architecture}</td>
              <td>{item.backbone}</td>
              <td>{item.cropSize}</td>
              <td>{item.trained ? "Yes" : "No"}</td> <td>{item.bestMiou}</td>
              <td>{item.iterations}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
