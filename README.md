# 🚀 Process Scheduling Visualizer

A responsive, interactive web app to simulate and compare CPU scheduling algorithms. Visualize Gantt charts, turnaround time, waiting time, and discover which algorithm performs best under your custom process load.

## ✨ Features

* **📊 Gantt Chart Visualization** — Displays execution timeline for each process.
* **📋 Process Table** — Shows completion, turnaround, and waiting times.
* **🔄 Algorithm Comparison** — Evaluates all implemented schedulers based on average metrics.
* **🧠 Dynamic Inputs** — Add processes with Arrival Time, Burst Time, and Priority.
* **⏱️ Time Quantum Control** — Customize quantum for RR and preemptive algorithms.

## 🧠 Algorithms Implemented

| Algorithm | Type |
| :--- | :--- |
| **FCFS** | Non-preemptive |
| **SJF** | Non-preemptive |
| **SRJF** | Preemptive |
| **Round Robin (RR)** | Preemptive |
| **Priority (Non-preemptive)** | Non-preemptive |
| **Priority (Preemptive)** | Preemptive |

*Idle times and accurate CPU gaps are visualized using labeled Gantt blocks.*

## 🛠️ Tech Stack

* **⚛️ React with Hooks**
* **🧪 Recoil** for state management
* **🎨 TailwindCSS** for styling
* **🧩 Process Scheduling algorithms** implementations in pure JavaScript

## 🧰 Installation

```bash
# Clone the repo
git clone [https://github.com/Gurpreet-05/ProcessSchedulingVisualizer.git](https://github.com/Gurpreet-05/ProcessSchedulingVisualizer.git)

# Navigate
cd process-scheduling-visualizer

# Install dependencies
npm install

# Start the dev server
npm run dev

```

#🔬 Usage


Add Processes: Use the Arrival, Burst, and Priority fields to input data.

Set Constraints: Adjust the Time Quantum if using Round Robin.

Select Algorithm: Choose a scheduler from the dropdown menu.

Visualize: View the generated Gantt chart and calculated metrics.

Compare: Use the Comparison View to see which algorithm performs best for your dataset.

#🤝 Contributing


Pull requests are welcome! If you'd like to suggest improvements, bug fixes, or new algorithms, feel free to fork the repository and open a PR.

#📜 License


MIT © Gurpreet
