import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { processesAtom, timeQuantumAtom } from "../state/atoms.js";
import { allAlgorithmsSummary } from "../utils/schedulers.js";

export default function Comparison() {
  const [tq, setTQ] = useRecoilState(timeQuantumAtom);
  const processes = useRecoilValue(processesAtom);
  const results = allAlgorithmsSummary(processes,tq);

  // Determine best algorithm by lowest average waiting time
  const best = results.reduce((min, curr) => (curr.avgWT < min.avgWT ? curr : min), results[0]);


  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4 text-center font-sans">Algorithm Comparison</h2>
      
      <div className="overflow-x-auto font-mono">
        <table className="min-w-full border text-center">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-2 py-1">Algorithm</th>
              <th className="border px-2 py-1">Avg TAT</th>
              <th className="border px-2 py-1">Avg WT</th>
            </tr>
          </thead>
          <tbody>
            {results.map((alg, idx) => (
              <tr key={idx} className="hover:bg-gray-100">
                <td className="border px-2 py-1">{alg.name}</td>
                <td className="border px-2 py-1">{alg.avgTAT.toFixed(2)}</td>
                <td className="border px-2 py-1">{alg.avgWT.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-lg font-semibold mt-6 text-center font-sans">Best Algorithm Verdict</h2>
      <p className="mt-2 text-center text-green-700 font-medium font-mono">
        {best.name} performs best overall in minimizing average waiting time and turnaround time.
      </p>
    </div>
  );
}
