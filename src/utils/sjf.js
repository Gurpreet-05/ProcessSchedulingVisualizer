export default function sjf(processes) {
  const remaining = [...processes];
  let time = 0;
  let gantt = [];
  let table = [];

  while (remaining.length > 0) {
    const ready = remaining.filter(p => p.arrival <= time);

    // Insert idle block if CPU is waiting
    if (ready.length === 0) {
      const nextArrival = Math.min(...remaining.map(p => p.arrival));
      gantt.push({
        pid: -1, // Indicates idle time
        start: time,
        end: nextArrival
      });
      time = nextArrival;
      continue;
    }

    // Select process with shortest burst time
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
