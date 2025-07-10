
export default function rr(processes,tq) {
  const gantt = [];
  const table = [];

  // new state
  const state = processes.map(p => ({
    pid: p.pid,
    arrival: p.arrival,
    burst: p.burst,
    priority: p.priority,
    remaining: p.burst,
    completion: 0,
    tat: 0,
    wt: 0,
  }));

  let time = 0;
  let arrived = [...state].sort((a, b) => a.arrival - b.arrival);
  const queue = [];

  // Initially arrived
  queue.push(...arrived.filter(p => p.arrival <= time));
  arrived = arrived.filter(p => p.arrival > time);
  tq=parseInt(tq);
  if(!tq) tq=2;
  if (queue.length === 0 && arrived.length > 0) {
    gantt.push({ pid: -1, start:time, end: arrived[0].arrival });
    time = arrived[0].arrival;
    queue.push(arrived.shift());
  }

  while (queue.length > 0) {
    const p = queue.shift();

    const start = time;
    const execTime = Math.min(tq, parseInt(p.remaining));

    time += execTime;
    p.remaining -= execTime;
    gantt.push({ pid: p.pid, start, end: time });

    //  newly arrived
    const newArrivals = arrived.filter(proc => proc.arrival <= time);
    queue.push(...newArrivals);
    arrived = arrived.filter(proc => proc.arrival > time);

    if (p.remaining > 0) {
      queue.push(p);
    } else {
      p.completion = time;
      p.tat = p.completion - p.arrival;
      p.wt = p.tat - p.burst;
      table.push({
        pid:p.pid, 
        arrival: p.arrival,
        burst: p.burst,
        priority: p.priority,
        completion: p.completion,
        tat: p.tat,
        wt: p.wt, 
      });
    }

    if (queue.length === 0 && arrived.length > 0) {
      gantt.push({ pid: -1, start:time, end: arrived[0].arrival });
      time = arrived[0].arrival;
      queue.push(arrived.shift());
    }
  }


  return { gantt, table };
}
