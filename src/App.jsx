import React, { useState } from "react";
import { RecoilRoot, useRecoilValue } from "recoil";
import ProcessInput from "./components/ProcessInput.jsx";
import Visualization from "./components/Visualization.jsx";
import Comparison from "./components/Comparison.jsx";
import { processesAtom } from "./state/atoms.js";

function MainApp() {
  const processes = useRecoilValue(processesAtom);
  const [showComparison, setShowComparison] = useState(false);

  const Toggle = () => {
    setShowComparison((prev) => !prev);
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Process Scheduling Visualizer</h1>
      <h2 className="text-center">Visualize and compare CPU scheduling algorithms easily.</h2>
      
      <ProcessInput />

      {processes.length > 0 && (
        <div className="flex justify-center my-4">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={Toggle}
          >
            {showComparison ? "Show Visualization" : "Show Comparison"}
          </button>
        </div>
      )}

      {processes.length > 0 ? (
        showComparison ? <Comparison /> : <Visualization />
      ) : (
        <p className="text-center text-gray-500 mt-6">Please enter process data to start.</p>
      )}
    </div>
  );
}

function App() {
  return (
    <RecoilRoot>
      <MainApp />
    </RecoilRoot>
  );
}

export default App;
