function fcfs(processes) {
  const sorted = [...processes].sort((a, b) => a.arrival - b.arrival);
  let time = 0;
  let gantt = [];
  const table = sorted.map((p) => {
    time = Math.max(time, p.arrival);
    const start = time;
    time += p.burst;
    const completion = time;
    const tat = completion - p.arrival;
    const wt = tat - p.burst;
    gantt.push({ pid: p.pid, start, end: completion });
    return { ...p, completion, tat, wt };
  });
  return { gantt, table };
}

function sjf(processes) {
  const remaining = [...processes];
  let time = 0;
  let gantt = [];
  let table = [];

  while (remaining.length > 0) {
    const ready = remaining.filter(p => p.arrival <= time);
    if (ready.length === 0) {
      time = Math.min(...remaining.map(p => p.arrival));
      continue;
    }

    ready.sort((a, b) => a.burst - b.burst);
    const p = ready[0];

    const start = time;
    time += p.burst;
    const completion = time;
    const tat = completion - p.arrival;
    const wt = tat - p.burst;

    gantt.push({ pid: p.pid, start, end: completion });
    table.push({ ...p, completion, tat, wt });

    const idx = remaining.findIndex(proc => proc.pid === p.pid);
    remaining.splice(idx, 1);
  }
  return { gantt, table };
}

function priorityNP(processes) {
  const remaining = [...processes];
  let time = 0;
  let gantt = [];
  let table = [];

  while (remaining.length > 0) {
    const ready = remaining.filter(p => p.arrival <= time);
    if (ready.length === 0) {
      time = Math.min(...remaining.map(p => p.arrival));
      continue;
    }

    ready.sort((a, b) => a.priority - b.priority);
    const p = ready[0];

    const start = time;
    time += p.burst;
    const completion = time;
    const tat = completion - p.arrival;
    const wt = tat - p.burst;

    gantt.push({ pid: p.pid, start, end: completion });
    table.push({ ...p, completion, tat, wt });

    const idx = remaining.findIndex(proc => proc.pid === p.pid);
    remaining.splice(idx, 1);
  }
  return { gantt, table };
}

function rr(processes, quantum = 2) {
  const queue = [];
  const gantt = [];
  const table = processes.map(p => ({ ...p, remaining: p.burst, completion: 0 }));

  let time = 0;
  let arrived = [...processes].sort((a, b) => a.arrival - b.arrival);
  queue.push(...arrived.filter(p => p.arrival <= time));
  arrived = arrived.filter(p => p.arrival > time);

  while (queue.length > 0) {
    const p = queue.shift();

    if (p.remaining > quantum) {
      const start = time;
      time += quantum;
      p.remaining -= quantum;
      gantt.push({ pid: p.pid, start, end: time });
    } else {
      const start = time;
      time += p.remaining;
      p.remaining = 0;
      const completion = time;
      p.completion = completion;
      const tat = completion - p.arrival;
      const wt = tat - p.burst;
      gantt.push({ pid: p.pid, start, end: time });

      const procInTable = table.find(t => t.pid === p.pid);
      procInTable.completion = completion;
      procInTable.tat = tat;
      procInTable.wt = wt;
    }

    // Add new arrivals
    const newArrivals = arrived.filter(proc => proc.arrival <= time);
    queue.push(...newArrivals);
    arrived = arrived.filter(proc => proc.arrival > time);

    // Requeue if process not finished
    if (p.remaining > 0) {
      queue.push(p);
    }
    if (queue.length === 0 && arrived.length > 0) {
      time = arrived[0].arrival;
      queue.push(arrived.shift());
    }
  }

  return { gantt, table };
}
function priorityPreemptive(processes) {
  const n = processes.length;
  let time = 0;
  let completed = 0;
  let remaining = processes.map(p => p.burst);
  let isCompleted = Array(n).fill(false);
  let gantt = [];
  let prev = null;
  let table = processes.map(p => ({
    pid: p.pid,
    arrival: p.arrival,
    burst: p.burst,
    completion: 0,
    tat: 0,
    wt: 0,
  }));

  while (completed < n) {
    let idx = -1;
    let minPriority = Infinity;
    for (let i = 0; i < n; i++) {
      if (processes[i].arrival <= time && !isCompleted[i]) {
        if (processes[i].priority < minPriority && remaining[i] > 0) {
          minPriority = processes[i].priority;
          idx = i;
        }
      }
    }
    if (idx === -1) {
      time++;
    } else {
      if (prev !== processes[idx].pid) {
        gantt.push({ pid: processes[idx].pid, start: time });
      }
      remaining[idx]--;
      time++;
      if (remaining[idx] === 0) {
        isCompleted[idx] = true;
        completed++;
        table[idx].completion = time;
        table[idx].tat = time - processes[idx].arrival;
        table[idx].wt = table[idx].tat - processes[idx].burst;
      }
      prev = processes[idx].pid;
      gantt[gantt.length - 1].end = time;
    }
  }
  return { gantt, table };
}
function srjf(processes) {
  const n = processes.length;
  let time = 0;
  let completed = 0;
  let remaining = processes.map(p => p.burst);
  let isCompleted = Array(n).fill(false);
  let gantt = [];
  let prev = null;
  let table = processes.map(p => ({
    pid: p.pid,
    arrival: p.arrival,
    burst: p.burst,
    completion: 0,
    tat: 0,
    wt: 0,
  }));

  while (completed < n) {
    let idx = -1;
    let minBurst = Infinity;
    for (let i = 0; i < n; i++) {
      if (processes[i].arrival <= time && !isCompleted[i]) {
        if (remaining[i] < minBurst && remaining[i] > 0) {
          minBurst = remaining[i];
          idx = i;
        }
      }
    }
    if (idx === -1) {
      time++;
    } else {
      if (prev !== processes[idx].pid) {
        gantt.push({ pid: processes[idx].pid, start: time });
      }
      remaining[idx]--;
      time++;
      if (remaining[idx] === 0) {
        isCompleted[idx] = true;
        completed++;
        table[idx].completion = time;
        table[idx].tat = time - processes[idx].arrival;
        table[idx].wt = table[idx].tat - processes[idx].burst;
      }
      prev = processes[idx].pid;
      gantt[gantt.length - 1].end = time;
    }
  }
  return { gantt, table };
}

// Map algorithms
export function simulateAlgorithm(processes, algo) {
  if (algo === "FCFS") return fcfs(processes);
  if (algo === "SJF") return sjf(processes);
  if (algo === "Priority (Non-preemptive)") return priorityNP(processes);
  if (algo === "RR") return rr(processes);
  if(algo === "Priority (Preemptive)") return priorityPreemptive(processes);
    if(algo === "SRJF") return srjf(processes);
  // fallback
  return fcfs(processes);
}

export function allAlgorithmsSummary(processes) {
  const algos = ["FCFS", "SJF", "Priority (Non-preemptive)", "RR"];
  return algos.map((name) => {
    const { table } = simulateAlgorithm(processes, name);
    const avgTAT = table.reduce((a, b) => a + b.tat, 0) / table.length;
    const avgWT = table.reduce((a, b) => a + b.wt, 0) / table.length;
    return { name, avgTAT, avgWT };
  }).sort((a, b) => a.avgTAT + a.avgWT - (b.avgTAT + b.avgWT));
}
