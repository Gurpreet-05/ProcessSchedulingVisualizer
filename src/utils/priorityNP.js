export default function priorityNP(processes) {
  const remaining = [...processes];
  let time = 0;
  let gantt = [];
  let table = [];

  while (remaining.length > 0) {
    const ready = remaining.filter(p => p.arrival <= time);

    // If no process is ready, CPU is idle
    if (ready.length === 0) {
      const nextArrival = Math.min(...remaining.map(p => p.arrival));
      gantt.push({
        pid: -1, // Indicates idle time
        start: time,
        end: nextArrival,
      });
      time = nextArrival;
      continue;
    }

    // Pick highest priority process (higher number = higher priority)
    ready.sort((a, b) => b.priority - a.priority);
    const p = ready[0];

    const start = time;
    time += p.burst;
    const completion = time;
    const tat = completion - p.arrival;
    const wt = tat - p.burst;

    gantt.push({ pid: p.pid, start, end: completion });
    table.push({
      pid: p.pid,
      arrival: p.arrival,
      burst: p.burst,
      priority: p.priority,
      completion,
      tat,
      wt,
    });

    const idx = remaining.findIndex(proc => proc.pid === p.pid);
    remaining.splice(idx, 1);
  }

  return { gantt, table };
}
