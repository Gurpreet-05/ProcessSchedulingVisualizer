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
    setShowComparison(prev => !prev);
  };

  return (
    <div className="bg-gray-300 min-h-screen">
      <div className="p-4 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center text-blue-600 font-sans">Process Scheduling Visualizer</h1>
        <h2 className="text-center font-semibold font-mono">Visualize and compare CPU scheduling algorithms easily</h2>
        
        <ProcessInput />

        {processes.length > 0 && (
          <>
            <div className="flex justify-center my-4">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-sans text-xl"
                onClick={Toggle}
              >
                {showComparison ? "Show Visualization" : "Show Comparison"}
              </button>
            </div>

            {showComparison ? <Comparison /> : <Visualization />}
          </>
        )}

        {processes.length === 0 && (
          <p className="text-center text-gray-500 mt-6 font-mono">Please enter process data to start</p>
        )}


        <footer className="bg-gray-800 text-gray-300 py-6 mt-10 font-mono">
          <div className="max-w-5xl mx-auto text-center space-y-2">
            <p className="text-sm">Process Scheduling Visualizer · Built with React, Recoil, and TailwindCSS</p>
            <p className="text-sm">MIT License · © {new Date().getFullYear()} Gurpreet</p>
            <div className="text-xs">
              <a href="https://github.com/Gurpreet-05" target="_blank" className="underline hover:text-white mx-2">GitHub</a>
              <a href="https://www.linkedin.com/in/gurpreet-singh-096a7b286" target="_blank" className="underline hover:text-white mx-2">LinkedIn</a>
            </div>
          </div>
        </footer>
      </div>
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
