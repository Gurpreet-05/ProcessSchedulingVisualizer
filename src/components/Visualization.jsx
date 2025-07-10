import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { processesAtom, selectedAlgorithmAtom, timeQuantumAtom } from "../state/atoms.js";
import { simulateAlgorithm } from "../utils/schedulers.js";

export default function Visualization() {
  const processes = useRecoilValue(processesAtom);
  const algorithm = useRecoilValue(selectedAlgorithmAtom);

  const [tq, setTQ] = useRecoilState(timeQuantumAtom);
  const { gantt, table } = simulateAlgorithm(processes, algorithm,tq);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-2 text-center font-sans">Gantt Chart ({algorithm})</h2>

      <div className="flex items-end justify-center overflow-x-auto font-mono text-xs">
        {gantt.map((block, idx) => {
          const isIdle = block.pid === -1;
          const isAlt = idx % 2 === 0;

          const blockColor = isAlt
              ? "bg-blue-400 text-white"
              : "bg-blue-500 text-white";

          return (
            <div key={idx} className="flex flex-col items-center">
              {/* Gantt Block */}
              <div className={`px-4 py-2 w-full text-center ${blockColor} border border-black`}>
                {isIdle ? "Idle" : `P${block.pid}`}
              </div>

              <div className="flex justify-between w-full text-black px-1 mt-1">
                {idx === 0 ? <span>{block.start}</span> : <span>    </span>}
                <span>{block.end}</span>
              </div>
            </div>
          );
        })}
      </div>




      <h2 className="text-xl font-bold mt-10 mb-2 text-center font-sans">Process Table</h2>
      <div className="overflow-x-auto font-mono text-sm">
        <table className="min-w-full text-center border">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-2 py-1">PID</th>
              <th className="border px-2 py-1">Priority</th>
              <th className="border px-2 py-1">Arrival</th>
              <th className="border px-2 py-1">Burst</th>
              <th className="border px-2 py-1">Completion</th>
              <th className="border px-2 py-1">Turnaround</th>
              <th className="border px-2 py-1">Waiting</th>
            </tr>
          </thead>
          <tbody>
            {table.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-100">
                <td className="border px-2 py-1">{row.pid}</td>
                <td className="border px-2 py-1">{row.priority}</td>
                <td className="border px-2 py-1">{row.arrival}</td>
                <td className="border px-2 py-1">{row.burst}</td>
                <td className="border px-2 py-1">{row.completion}</td>
                <td className="border px-2 py-1">{row.tat}</td>
                <td className="border px-2 py-1">{row.wt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
