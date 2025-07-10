import fcfs from "./fcfs.js";
import sjf from "./sjf.js";
import srjf from "./srjf.js";
import priorityNP from "./priorityNP.js";
import rr from "./rr.js";
import priorityPreemptive from "./priorityPreemptive.js";


// Map algorithms
export function simulateAlgorithm(processes, algo,tq) {
  if (algo === "FCFS") return fcfs(processes);
  if (algo === "SJF") return sjf(processes);
  if (algo === "Priority (Non-preemptive)") return priorityNP(processes);
  if (algo === "RR") return rr(processes,tq);
  if(algo === "Priority (Preemptive)") return priorityPreemptive(processes);
  if(algo === "SRJF") return srjf(processes);
  return fcfs(processes);
}

export function allAlgorithmsSummary(processes,tq) {
  const algos = ["FCFS", "SJF", "Priority (Non-preemptive)","RR", "Priority (Preemptive)", "SRJF"];
  return algos.map((name) => {
    const { table } = simulateAlgorithm(processes, name,tq);
    const avgTAT = table.reduce((a, b) => a + b.tat, 0) / table.length;
    const avgWT = table.reduce((a, b) => a + b.wt, 0) / table.length;
    return { name, avgTAT, avgWT };
  }).sort((a, b) => a.avgTAT + a.avgWT - (b.avgTAT + b.avgWT));
}

