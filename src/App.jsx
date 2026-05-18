import { useState } from "react";
import Die from "./componenets/Die.jsx";
import { nanoid } from "nanoid";

export default function App() {
	const [dice, setDice] = useState(generateAllNewDice());

	function generateAllNewDice() {
		return new Array(10).fill(0).map(() => ({
			value: Math.ceil(Math.random() * 6),
			isHeld: false,
			id: nanoid(),
		}));
	}

	function rollDice() {
		setDice(generateAllNewDice);
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
			<div className="die-container">{diceElements}</div>
			<button className="roll-btn" onClick={rollDice}>
				Roll
			</button>
		</main>
	);
}
