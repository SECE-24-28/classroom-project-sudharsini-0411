import { useState } from "react";

function GuessGame() {

  const [secretNumber] = useState(() => Math.floor(Math.random() * 100) + 1);

  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");

  const checkNumber = () => {
    const num = Number(guess);

    if (isNaN(num)) {
      setMessage("Please enter a valid number!");
      return;
    }

    if (num === secretNumber) {
      setMessage("Matched! 🎉");
    } else if (num < secretNumber) {
      setMessage(" small!");
    } else {
      setMessage("Too large!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center align-items-center">
      <div className="bg-white p-8 w-80 rounded-2xl border-2 border-pink-400 shadow-lg text-center">

        <h2 className="text-2xl font-bold mb-4">Guess the Number</h2>

        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Enter a number"
          className="w-full p-2 border rounded-lg mb-3 outline-none"
        />

        <button
          onClick={checkNumber}
          className="w-full bg-pink-200 hover:bg-pink-600 text-white px-4 py-2 rounded-md"
        >
          Submit
        </button>

        <p className="mt-4 text-lg font-semibold text-gray-700">
          {message}
        </p>

      </div>
    </div>
  );
}

export default GuessGame;
