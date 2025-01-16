import "@/styles/index.scss";

enum CardState {
  FLIPPED = "flipped",
  MATCHED = "matched",
  UNFLIPPED = "unflipped",
}

interface Card {
  id: number;
  value: string;
  state: CardState;
}

let cards: Card[] = [];
let flippedCards: Card[] = [];
let attemptsLeft: number = 3;

function generateShuffledCards(): Card[] {
  const values = ["A", "B", "C"];
  const cards: Card[] = [];

  values.forEach((value, index) => {
    cards.push({ id: index * 2, value, state: CardState.UNFLIPPED });
    cards.push({
      id: index * 2 + 1,
      value,
      state: CardState.UNFLIPPED,
    });
  });

  return cards.sort(() => Math.random() - 0.5);
}

function startGame(): void {
  cards = generateShuffledCards();
  flippedCards = [];
  attemptsLeft = 3;
  renderCards();
}

function handleCardClick(cardId: number): void {
  const clickedCard = cards.find((card) => card.id === cardId);

  if (
    !clickedCard ||
    clickedCard.state === CardState.FLIPPED ||
    clickedCard.state === CardState.MATCHED ||
    flippedCards.length === 2
  ) {
    return;
  }

  clickedCard.state = CardState.FLIPPED;
  flippedCards.push(clickedCard);
  renderCards();

  if (flippedCards.length === 2) {
    setTimeout(checkForMatch, 1000);
  }
}

function checkForMatch(): void {
  const [card1, card2] = flippedCards;

  if (card1.value === card2.value) {
    card1.state = CardState.MATCHED;
    card2.state = CardState.MATCHED;
  } else {
    card1.state = CardState.UNFLIPPED;
    card2.state = CardState.UNFLIPPED;
    attemptsLeft--;
  }

  flippedCards = [];
  renderCards();
  checkGameOver();
}

function checkGameOver(): void {
  const allMatched = cards.every((card) => card.state === CardState.MATCHED);

  if (allMatched) {
    alert("Winner");
    startGame();
  } else if (attemptsLeft === 0) {
    alert("Game over! Try again.");
    startGame();
  }
}

function renderCards(): void {
  const gameBoard = document.getElementById("game-board") as HTMLElement;
  if (!gameBoard) return;

  gameBoard.innerHTML = "";

  cards.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.className = `card ${
      card.state === CardState.FLIPPED || card.state === CardState.MATCHED
        ? "flipped"
        : ""
    }`;
    cardElement.innerText =
      card.state === CardState.FLIPPED || card.state === CardState.MATCHED
        ? card.value
        : "";
    cardElement.onclick = () => handleCardClick(card.id);
    gameBoard.appendChild(cardElement);
  });

  const attemptsDisplay = document.getElementById("attempts") as HTMLElement;
  if (attemptsDisplay) {
    attemptsDisplay.innerText = `Attempts Left: ${attemptsLeft}`;
  }
}

const restartButton = document.getElementById(
  "restart-btn"
) as HTMLButtonElement;
if (restartButton) {
  restartButton.onclick = startGame;
}

window.onload = startGame;
