import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Form() {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [minutes, setMinutes] = useState(5);

  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-2">
      <input
        type="text"
        value={player1}
        onChange={(e) => setPlayer1(e.target.value)}
        placeholder="Player 1"
        className="input"
      />
      <input
        type="text"
        value={player2}
        onChange={(e) => setPlayer2(e.target.value)}
        placeholder="Player 2"
        className="input"
      />
      <div className="flex items-center gap-2">
        <input
          type="number"
          min="1"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          className="text-xl py-2 px-2.5 text-center border-2 border-slate-900 outline-none rounded-2xl placeholder:text-slate-700 font-medium"
        />
        <span className="text-slate- text-xl font-semibold">min</span>
      </div>

      <button
        className="bg-green-400 text-white py-2.5 px-8.5 rounded-lg text-4xl font-bold cursor-pointer mt-5"
        onClick={() =>
          navigate("/game", {
            state: {
              player1: player1?.trim() || "Player 1",
              player2: player2?.trim() || "Player 2",
              minutes: Number(minutes) > 0 ? Number(minutes) : 5,
            },
          })
        }
      >
        Start
      </button>
    </div>
  );
}

export default Form;
