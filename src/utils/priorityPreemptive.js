export default function priorityPreemptive(processes) {
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
    priority: p.priority,
    completion: 0,
    tat: 0,
    wt: 0,
  }));

  while (completed < n) {
    let idx = -1;
    let maxPriority = -Infinity;

    for (let i = 0; i < n; i++) {
      if (processes[i].arrival <= time && !isCompleted[i] && remaining[i] > 0) {
        if (processes[i].priority > maxPriority) {
          maxPriority = processes[i].priority;
          idx = i;
        }
      }
    }

    if (idx === -1) {
      // idle
      if (prev !== -1) {
        gantt.push({ pid: -1, start: time });
      }
      time++;
      gantt[gantt.length - 1].end = time;
      prev = -1;
    } else {
      if (prev !== processes[idx].pid) {
        gantt.push({ pid: processes[idx].pid, start: time });
      }

      remaining[idx]--;
      time++;
      gantt[gantt.length - 1].end = time;

      if (remaining[idx] === 0) {
        isCompleted[idx] = true;
        completed++;
        table[idx].completion = time;
        table[idx].tat = time - processes[idx].arrival;
        table[idx].wt = table[idx].tat - table[idx].burst;
      }

      prev = processes[idx].pid;
    }
  }

  return { gantt, table };
}
