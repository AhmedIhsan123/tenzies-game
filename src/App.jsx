import { useState } from "react";
import Die from "./componenets/Die.jsx";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
	const [dice, setDice] = useState(generateAllNewDice());

	const gameWon =
		dice.every((die) => die.isHeld) &&
		dice.every((die) => die.value === dice[0].value);

	function generateAllNewDice() {
		return new Array(10).fill(0).map(() => ({
			value: Math.ceil(Math.random() * 6),
			isHeld: false,
			id: nanoid(),
		}));
	}

	function rollDice() {
		if (gameWon) {
			setDice(generateAllNewDice());
		}
		setDice((oldDice) =>
			oldDice.map((die) =>
				die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) },
			),
		);
	}

	function hold(id) {
		console.log(id);
		setDice((oldDice) =>
			oldDice.map((die) =>
				die.id == id ? { ...die, isHeld: !die.isHeld } : die,
			),
		);
	}

	const diceElements = dice.map((die) => (
		<Die
			key={die.id}
			value={die.value}
			isHeld={die.isHeld}
			hold={() => hold(die.id)}
		/>
	));

	return (
		<main>
			{gameWon && <Confetti />}
			<h1>Tenzies</h1>
			<p>
				Roll until all dice are the same. Click each die to freeze it at its
				current value between rolls
			</p>
			<div className="die-container">{diceElements}</div>
			<button className="roll-btn" onClick={rollDice}>
				{gameWon ? "New Game" : "Roll"}
			</button>
		</main>
	);
}
