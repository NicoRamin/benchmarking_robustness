import "./App.css";
import Header from "./components/Header/header";
import Opticalflowtable from "./components/OpticalFlowTable/opticalflowtable";
import SegmentationChart from "./components/segmentationGraph/segmentationGraph";

function App() {
  return (
    <div className="App">
      <div className="header-section">
        <Header />
      </div>
      <div className="table-section">
        <Opticalflowtable />
      </div>
      <div>
        <SegmentationChart />
      </div>
    </div>
  );
}

export default App;
