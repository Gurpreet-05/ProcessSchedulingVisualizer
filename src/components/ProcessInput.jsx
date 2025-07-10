import React, { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { processesAtom, selectedAlgorithmAtom, timeQuantumAtom } from "../state/atoms.js";

export default function ProcessInput() {
  const [arrival, setArrival] = useState("");
  const [burst, setBurst] = useState("");
  const [priority, setPriority] = useState("");
  const [TQ, setTQ] = useRecoilState(timeQuantumAtom);
  const [processes, setProcesses] = useRecoilState(processesAtom);
  const setAlgorithm = useSetRecoilState(selectedAlgorithmAtom);
  const addProcess = () => {
    if (arrival && burst) {
      const newProcess = {
        pid:processes.length + 1,
        priority: priority ? parseInt(priority) : 0,
        arrival: parseInt(arrival),
        burst: parseInt(burst),
      };
      const updated = [...processes, newProcess];
      setProcesses(updated);
      setArrival(""); setBurst(""); setPriority("");
    }
  };

  return (
    <div className="space-y-2 flex flex-col gap-3">
      <div className="flex gap-2 flex-wrap font-mono">
        <input className="border p-2" placeholder="Arrival" value={arrival} onChange={(e) => setArrival(e.target.value)} />
        <input className="border p-2" placeholder="Burst" value={burst} onChange={(e) => setBurst(e.target.value)} />
        <input className="border p-2" placeholder="Priority (optional)" value={priority} onChange={(e) => setPriority(e.target.value)} />
        <input className="border p-2" placeholder="TQ (Default : 2)" value={TQ} onChange={(e) => setTQ(e.target.value)} />
      </div>
      <div>
        <button className="bg-orange-400 text-white px-4 rounded text-xl" onClick={addProcess}>Add</button>
      </div>
      

      <div>
        <select
          className="border p-2 font-mono"
          onChange={(e) => setAlgorithm(e.target.value)}
        >
          <option value="FCFS">FCFS</option>
          <option value="SJF">SJF</option>
          <option value="SRJF">SRJF</option>
          <option value="RR">RR</option>
          <option value="Priority (Non-preemptive)">Priority (Non-preemptive)</option>
          <option value="Priority (Preemptive)">Priority (Preemptive)</option>
        </select>
      </div>
      

    </div>
  );
}
