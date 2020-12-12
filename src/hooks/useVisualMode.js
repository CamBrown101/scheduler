import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replace = false) => {
    const newHistory = [...history];

    if (replace) {
      newHistory.pop();
    }

    newHistory.push(mode);
    setHistory(newHistory);
    setMode(mode);
  };

  const back = () => {
    if (history.length < 2) {
      return;
    }
    const newHistory = [...history];
    newHistory.pop();
    setHistory(newHistory);
    setMode(newHistory[newHistory.length - 1]);
  };

  return { mode, transition, back };
}
