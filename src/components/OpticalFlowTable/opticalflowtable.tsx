import { useState, useEffect } from "react";
import jsonData from "../../data/optical-flow.json";
import "./opticalflowtable.css";

// Define the type for your data
interface ModelPerformance {
  rank: number;
  architecture: string;
  venue: string;
  cosPgdEpe: number;
  pcfaEpe: number;
  pgdEpe: number;
  checkpoint: string;
}

const Opticalflowtable = () => {
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
        <caption>Leaderboard: Optical Flow Estimation</caption>
        <thead>
          <tr>
            <th
              onClick={() => sortData("rank")}
              className={getHeaderClass("rank")}
            >
              Rank{" "}
              {sortConfig?.key === "rank" &&
                (sortConfig.direction === "asc" ? "🔼" : "🔽")}
            </th>
            <th
              onClick={() => sortData("architecture")}
              className={getHeaderClass("architecture")}
            >
              Architecture{" "}
              {sortConfig?.key === "architecture" &&
                (sortConfig.direction === "asc" ? "🔼" : "🔽")}
            </th>
            <th
              onClick={() => sortData("venue")}
              className={getHeaderClass("venue")}
            >
              Venue{" "}
              {sortConfig?.key === "venue" &&
                (sortConfig.direction === "asc" ? "🔼" : "🔽")}
            </th>
            <th
              onClick={() => sortData("cosPgdEpe")}
              className={getHeaderClass("cosPgdEpe")}
            >
              CosPgdEpe{" "}
              {sortConfig?.key === "cosPgdEpe" &&
                (sortConfig.direction === "asc" ? "🔼" : "🔽")}
            </th>
            <th
              onClick={() => sortData("pcfaEpe")}
              className={getHeaderClass("pcfaEpe")}
            >
              PcfaEpe{" "}
              {sortConfig?.key === "pcfaEpe" &&
                (sortConfig.direction === "asc" ? "🔼" : "🔽")}
            </th>
            <th
              onClick={() => sortData("pgdEpe")}
              className={getHeaderClass("pgdEpe")}
            >
              PgdEpe{" "}
              {sortConfig?.key === "pgdEpe" &&
                (sortConfig.direction === "asc" ? "🔼" : "🔽")}
            </th>
            <th
              onClick={() => sortData("checkpoint")}
              className={getHeaderClass("checkpoint")}
            >
              Checkpoint{" "}
              {sortConfig?.key === "checkpoint" &&
                (sortConfig.direction === "asc" ? "🔼" : "🔽")}
            </th>
          </tr>
        </thead>
        <tbody>
          {visibleData.map((item, index) => (
            <tr key={index}>
              <td>{item.rank}</td>
              <td>{item.architecture}</td>
              <td>{item.venue}</td>
              <td>{item.cosPgdEpe}</td>
              <td>{item.pcfaEpe}</td>
              <td>{item.pgdEpe}</td>
              <td>{item.checkpoint}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Opticalflowtable;
