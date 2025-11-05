import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Game() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const initialMinutes = useMemo(() => {
    const mins = state?.minutes;
    return typeof mins === "number" && mins > 0 ? mins : 5;
  }, [state]);

  const player1Name = state?.player1 || "Player 1";
  const player2Name = state?.player2 || "Player 2";

  const initialMs = initialMinutes * 60 * 1000;

  const [p1Ms, setP1Ms] = useState(initialMs);
  const [p2Ms, setP2Ms] = useState(initialMs);
  const [activePlayer, setActivePlayer] = useState("p1");
  const [isOver, setIsOver] = useState(false);

  useEffect(() => {
    setP1Ms(initialMs);
    setP2Ms(initialMs);
    setActivePlayer("p1");
    setIsOver(false);
  }, [initialMs]);

  useEffect(() => {
    if (isOver) return;

    const tick = () => {
      if (activePlayer === "p1") {
        setP1Ms((prev) => {
          const next = Math.max(prev - 1000, 0);
          if (next === 0) setIsOver(true);
          return next;
        });
      } else {
        setP2Ms((prev) => {
          const next = Math.max(prev - 1000, 0);
          if (next === 0) setIsOver(true);
          return next;
        });
      }
    };

    const intervalId = setInterval(tick, 1000);
    return () => clearInterval(intervalId);
  }, [activePlayer, isOver]);

  const formatTime = (ms) => {
    const totalSeconds = Math.ceil(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handlePress = (playerKey) => {
    if (isOver) return;
    if (playerKey !== activePlayer) return; // Only active player can press to switch
    setActivePlayer((prev) => (prev === "p1" ? "p2" : "p1"));
  };

  const p1Expired = p1Ms === 0;
  const p2Expired = p2Ms === 0;

  return (
    <div className="flex flex-col w-screen h-screen">
      <div className="flex items-center justify-between px-4 py-2">
        <button
          className="text-slate-700 underline"
          onClick={() => navigate("/")}
        >
          ← Setup
        </button>
        <div className="text-slate-800 font-semibold">
          {initialMinutes} min each
        </div>
        <button
          className="text-slate-700 underline"
          onClick={() => {
            setP1Ms(initialMs);
            setP2Ms(initialMs);
            setActivePlayer("p1");
            setIsOver(false);
          }}
        >
          Reset
        </button>
      </div>

      <button
        className={
          "flex-1 w-full flex flex-col items-center justify-center transition-colors " +
          (p1Expired
            ? "bg-red-500 text-white"
            : activePlayer === "p1"
            ? "bg-emerald-400 text-white"
            : "bg-emerald-300 text-white")
        }
        onClick={() => handlePress("p1")}
        disabled={isOver}
      >
        <span className="text-2xl sm:text-3xl font-semibold">
          {player1Name}
        </span>
        <span className="text-5xl sm:text-7xl font-bold tracking-wider">
          {formatTime(p1Ms)}
        </span>
      </button>

      <button
        className={
          "flex-1 w-full flex flex-col items-center justify-center transition-colors " +
          (p2Expired
            ? "bg-red-500 text-white"
            : activePlayer === "p2"
            ? "bg-sky-500 text-white"
            : "bg-sky-400 text-white")
        }
        onClick={() => handlePress("p2")}
        disabled={isOver}
      >
        <span className="text-2xl sm:text-3xl font-semibold">
          {player2Name}
        </span>
        <span className="text-5xl sm:text-7xl font-bold tracking-wider">
          {formatTime(p2Ms)}
        </span>
      </button>
    </div>
  );
}
