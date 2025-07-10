export default function fcfs(processes) {
  const sorted = [...processes].sort((a, b) => a.arrival - b.arrival);
  let time = 0;
  let gantt = [];

  const table = sorted.map((p) => {
    if (p.arrival > time) {
      gantt.push({
        pid: -1, // idle
        start: time,
        end: p.arrival,
      });
      time = p.arrival;
    }

    const start = time;
    time += p.burst;
    const completion = time;
    const tat = completion - p.arrival;
    const wt = tat - p.burst;

    gantt.push({ pid: p.pid, start, end: completion });
    return {
      pid: p.pid,
      priority: p.priority,
      arrival: p.arrival,
      burst: p.burst,
      completion,
      tat,
      wt
    };
  });

  return { gantt, table };
}
