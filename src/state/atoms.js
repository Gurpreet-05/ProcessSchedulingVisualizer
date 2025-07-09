import { atom } from "recoil";

export const processesAtom = atom({
  key: "processesAtom",
  default: [],
});

export const selectedAlgorithmAtom = atom({
  key: "selectedAlgorithmAtom",
  default: "FCFS",
});
