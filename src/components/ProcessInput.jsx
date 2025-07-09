import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { processesAtom, selectedAlgorithmAtom } from "../state/atoms.js";

export default function ProcessInput() {
  const [processes, setProcesses] = useState([]);
  const [pid, setPid] = useState("");
  const [arrival, setArrival] = useState("");
  const [burst, setBurst] = useState("");
  const [priority, setPriority] = useState("");

  const setGlobalProcesses = useSetRecoilState(processesAtom);
  const setAlgorithm = useSetRecoilState(selectedAlgorithmAtom);

  const addProcess = () => {
    if (pid && arrival && burst) {
      const newProcess = {
        pid,
        arrival: parseInt(arrival),
        burst: parseInt(burst),
        priority: priority ? parseInt(priority) : 0,
      };
      const updated = [...processes, newProcess];
      setProcesses(updated);
      setGlobalProcesses(updated);
      setPid(""); setArrival(""); setBurst(""); setPriority("");
    }
  };

  return (
    <div className="space-y-2 mb-6">
      <div className="flex gap-2 flex-wrap">
        <input className="border p-2" placeholder="PID" value={pid} onChange={(e) => setPid(e.target.value)} />
        <input className="border p-2" placeholder="Arrival" value={arrival} onChange={(e) => setArrival(e.target.value)} />
        <input className="border p-2" placeholder="Burst" value={burst} onChange={(e) => setBurst(e.target.value)} />
        <input className="border p-2" placeholder="Priority (optional)" value={priority} onChange={(e) => setPriority(e.target.value)} />
        <button className="bg-green-500 text-white px-4 rounded" onClick={addProcess}>Add</button>
      </div>

      <select
        className="border p-2"
        onChange={(e) => setAlgorithm(e.target.value)}
      >
        <option value="FCFS">FCFS</option>
        <option value="SJF">SJF</option>
        <option value="SRJF">SRJF</option>
        <option value="RR">RR</option>
        <option value="Priority (Non-preemptive)">Priority (Non-preemptive)</option>
        <option value="Priority (Preemptive)">Priority (Preemptive)</option>
        <option value="MLQ">MLQ</option>
        <option value="MLFQ">MLFQ</option>
      </select>
    </div>
  );
}
