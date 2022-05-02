import { useState, useEffect } from "react";
import SingleCard from "./components/SingleCard";
import "./App.css";

/* Revision :

- sort() method
- map () method
- setTimeout() method */

const cardImages = [
	{ src: "/img/helmet-1.png", matched: false },
	{ src: "/img/potion-1.png", matched: false },
	{ src: "/img/ring-1.png", matched: false },
	{ src: "/img/scroll-1.png", matched: false },
	{ src: "/img/shield-1.png", matched: false },
	{ src: "/img/sword-1.png", matched: false },
];

function App() {
	// States
	const [cards, setCards] = useState([]);
	const [turns, setTurns] = useState(0);
	const [choiceOne, setChoiceOne] = useState(null);
	const [choiceTwo, setChoiceTwo] = useState(null);
	const [disabled, setDisabled] = useState(false);

	// shuffle cards for new game
	const shuffleCards = () => {
		// I take cardImages array and i put it inside a new array i make them multiply. I sorted by shuffling them up using the sort method. Then, i add ID to each card by using the map method and used card as the argument so that i cant apply a fuction to each card (function to add ID to each card). We then put the shuffled cards to a state named cards so that we can use it later in another function call.
		const shuffledCards = [...cardImages, ...cardImages]
			.sort(() => Math.random() - 0.5)
			.map((card) => ({ ...card, id: Math.random() }));

		setChoiceOne(null);
		setChoiceTwo(null);
		setCards(shuffledCards);
		setTurns(0);
	};

	// handle a choice. This is where I determine where the first click to a card is the first choice and the second click of another card is the second choice. This function is related to another function such as handleClick in SingleCard component. How this function works > If choice one is null, then we make the card that we choose at set it to a variable state named choiceOne. but if choiceOne already true (which means that it is no longer null due to the first click, then we set the card object to a state variable named choiceTwo)
	const handleChoice = (card) => {
		choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
	};

	//compare 2 selected cards. We compare the two cards here while checking the src of the selected cards. If the conditions are met, we want to run several things/functions or in other words, we want several things to happen. Such as we want to make an arry where the matching cards have 2 similiar values (matched:true) and differentiate themselves to the other cards. We then apply a css styling (flipped) to two cards or one card that has the matched prop. If the conditions are not met, we return back the cards to their original states. (flipped back and the matched prop equals back to false)
	useEffect(() => {
		if (choiceOne && choiceTwo) {
			setDisabled(true);
			if (choiceOne.src === choiceTwo.src) {
				setCards((prevCards) => {
					return prevCards.map((card) => {
						if (card.src === choiceOne.src) {
							return { ...card, matched: true };
						} else {
							return card;
						}
					});
				});
				resetTurn();
			} else {
				setTimeout(() => resetTurn(), 1000);
			}
		}
	}, [choiceOne, choiceTwo]);

	// reset choices & increase turn
	const resetTurn = () => {
		setChoiceOne(null);
		setChoiceTwo(null);
		setTurns((prevTurns) => prevTurns + 1);
		setDisabled(false);
	};

	// start a new game automatically at the beginning of the game
	useEffect(() => {
		shuffleCards();
	}, []);

	return (
		<div className="App">
			<h1>Magic Match</h1>
			<button onClick={shuffleCards}>New Game</button>

			<div className="card-grid">
				{cards.map((card) => (
					<SingleCard
						key={card.id}
						card={card}
						handleChoice={handleChoice}
						flipped={card === choiceOne || card === choiceTwo || card.matched}
						disabled={disabled}
					/>
				))}
			</div>
			<p>Turns : {turns}</p>
		</div>
	);
}

export default App;
