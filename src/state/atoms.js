import { atom } from "recoil";

export const processesAtom = atom({
  key: "processesAtom",
  default: [],
});

export const selectedAlgorithmAtom = atom({
  key: "selectedAlgorithmAtom",
  default: "FCFS",
});

export const timeQuantumAtom = atom({
  key: "timeQuantumAtom",
  default: "",
});