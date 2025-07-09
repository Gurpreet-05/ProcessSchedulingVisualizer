import React from "react";
import { useRecoilValue } from "recoil";
import { processesAtom, selectedAlgorithmAtom } from "../state/atoms.js";
import { simulateAlgorithm } from "../utils/schedulers.js";

export default function Visualization() {
  const processes = useRecoilValue(processesAtom);
  const algorithm = useRecoilValue(selectedAlgorithmAtom);

  const { gantt, table } = simulateAlgorithm(processes, algorithm);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-2 text-center">Gantt Chart ({algorithm})</h2>

      {/* Gantt Chart */}
      <div className="flex items-end justify-center overflow-x-auto">
        {gantt.map((block, idx) => (
          <div key={idx} className="flex flex-col items-center relative mx-1">
            <div className="bg-blue-400 text-white px-4 py-2 rounded">
              {block.pid}
            </div>
            <div className="flex justify-between w-full text-xs absolute -bottom-5">
              <span>{block.start}</span>
              <span>{block.end}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <h2 className="text-xl font-bold mt-10 mb-2 text-center">Process Table</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-center border">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-2 py-1">PID</th>
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
