let forCardsContainer = document.querySelector(".forCards");

// ~~~~~~~~
console.log();
// ~~~~~~~~
let cardsGrid = document.querySelector(".cardsGrid");
for (let i = 0; i < 100; i++) {
	let span = document.createElement("span");
	span.classList.add("square");
	cardsGrid.appendChild(span);
}
// ~~~~~~~~
let cardsIsHidden = document.querySelector(".cardsIsHidden");
// ~~~~~~~~


let sixNumbers = ["zero", "one", "two", "three", "four", "five", "six"];
let container = document.querySelector(".container");
let cardsContainer = document.querySelector(".cardsContainer");
let playerOneName = document.querySelector(".playerOne .pInfo .name");
let playerTwoName = document.querySelector(".playerTwo .pInfo .name");
let playerOneScore = document.querySelector(".playerOne .pInfo .score");
let playerTwoScore = document.querySelector(".playerTwo .pInfo .score");
let sideBox = document.querySelector(".sideBox");

// Chaining
let rightChain = [];
let leftChain = [];

// players and cards
let groundCards = [];
let sideBoxCards = [];
let playedOnGroundCards = [];
let playerOne = {
	name: "Player one",
	score: 0,
	cards: [],
	turn: true,
	bestCardNum: true,
	cardsContainer: document.querySelector(".players .player.playerOne .cards"),
	firstPlay: true,
};
let playerTwo = {
	name: "Player two",
	score: 0,
	cards: [],
	turn: false,
	bestCardNum: 0,
	cardsContainer: document.querySelector(".players .player.playerTwo .cards"),
	firstPlay: true,
};

// developer settings
let devSettings = {
	cardsIsHidden: false,
};

playerOneName.innerHTML = playerOne.name;
playerTwoName.innerHTML = playerTwo.name;
playerOneScore.innerHTML = playerOne.score;
playerTwoScore.innerHTML = playerTwo.score;

// Create cards
class Dominoes {
	static thisCards = [];
	// properties
	constructor(name, top, down) {
		this.name = name;
		this.top = top;
		this.down = down;
		Dominoes.thisCards.push(this);
	}
	// methods
	// this method create the card in html
	createElement(appendPlace) {
		// create element
		let card = document.createElement("div");
		card.classList.add("card");
		card.classList.add(this.name);
		appendPlace.appendChild(card);

		// if this.top equal this.down => make a new attr (special-num) and add him to (card.div)
		if (this.top == this.down) {
			let newAttr = document.createAttribute("special-num");
			card.setAttributeNode(newAttr);
			card.setAttribute("special-num", this.top);
		}

		let topPointsAttr = document.createAttribute("top-point");
		let downPointsAttr = document.createAttribute("down-point");
		card.setAttributeNode(topPointsAttr);
		card.setAttributeNode(downPointsAttr);
		card.setAttribute("top-point", this.top);
		card.setAttribute("down-point", this.down);

		let top = document.createElement("div");
		top.classList.add("top");
		top.classList.add(sixNumbers[this.top]);
		card.appendChild(top);

		let down = document.createElement("div");
		down.classList.add("down");
		down.classList.add(sixNumbers[this.down]);
		card.appendChild(down);

		let topUl = document.createElement("ul");
		top.appendChild(topUl);
		addCardPoints(topUl, this.top);
		
		let downUl = document.createElement("ul");
		down.appendChild(downUl);
		addCardPoints(downUl, this.down);
	}
	// this method hidden the card numbers
	isHidden(isHidden) {
		let card = document.querySelector(`.card.${this.name}`);
		let top = document.querySelector(".card .top");
		let down = document.querySelector(".card .down");
		let topUlEle = document.querySelector(".card .top ul");
		let downUlEle = document.querySelector(".card .down ul");
		// normal cards hidden
		// if isHidden is (true) => add new class (.flip) to (card.div)
		if (isHidden) {
			card.classList.add("flip");
		} else if (!isHidden) { // if isHidden is (false) => delete class (.flip) in (card.div)
			card.classList.remove("flip");
		}
		// *****save cards hidden not work want to fix*****
		// if (isHidden) {
		// 	topUlEle.remove();
		// 	downUlEle.remove();
		// 	let topUl = document.createElement("ul");
		// 	top.appendChild(topUl);
		// 	let downUl = document.createElement("ul");
		// 	down.appendChild(downUl);
		// 	card.classList.add("flip");
		// 	card.classList.remove(this.name);
		// 	top.classList.remove(sixNumbers[this.top]);
		// 	down.classList.remove(sixNumbers[this.down]);
		// } else {
		// 	addCardPoints(topUlEle, this.top);
		// 	addCardPoints(downUlEle, this.down);
		// 	card.classList.remove("flip");
		// 	card.classList.add(this.name);
		// 	top.classList.add(sixNumbers[this.top]);
		// 	down.classList.add(sixNumbers[this.down]);
		// }
	}
}

// create cards
// Zeroes
let zeroAndZero = new Dominoes("zeroAndZero", 0, 0);
let zeroAndOne = new Dominoes("zeroAndOne", 0, 1);
let zeroAndTwo = new Dominoes("zeroAndTwo", 0, 2);
let zeroAndThree = new Dominoes("zeroAndThree", 0, 3);
let zeroAndFour = new Dominoes("zeroAndFour", 0, 4);
let zeroAndFive = new Dominoes("zeroAndFive", 0, 5);
let zeroAndSix = new Dominoes("zeroAndSix", 0, 6);
// Ones
let oneAndOne = new Dominoes("oneAndOne", 1, 1);
let oneAndTwo = new Dominoes("oneAndTwo", 1, 2);
let oneAndThree = new Dominoes("oneAndThree", 1, 3);
let oneAndFour = new Dominoes("oneAndFour", 1, 4);
let oneAndFive = new Dominoes("oneAndFive", 1, 5);
let oneAndSix = new Dominoes("oneAndSix", 1, 6);
// Twos
let twoAndTwo = new Dominoes("twoAndTwo", 2, 2);
let twoAndThree = new Dominoes("twoAndThree", 2, 3);
let twoAndFour = new Dominoes("twoAndFour", 2, 4);
let twoAndFive = new Dominoes("twoAndFive", 2, 5);
let twoAndSix = new Dominoes("twoAndSix", 2, 6);
// Threes
let threeAndThree = new Dominoes("threeAndThree", 3, 3);
let threeAndFour = new Dominoes("threeAndFour", 3, 4);
let threeAndFive = new Dominoes("threeAndFive", 3, 5);
let threeAndSix = new Dominoes("threeAndSix", 3, 6);
// Fours
let fourAndFour = new Dominoes("fourAndFour", 4, 4);
let fourAndFive = new Dominoes("fourAndFive", 4, 5);
let fourAndSix = new Dominoes("fourAndSix", 4, 6);
// fives
let fiveAndFive = new Dominoes("fiveAndFive", 5, 5);
let fiveAndSix = new Dominoes("fiveAndSix", 5, 6);
// six
let sixAndSix = new Dominoes("sixAndSix", 6, 6);

// ========== Reusable Functions ==========
// this function generates specific numbers without repeat and add them to array
// understand??????
function ranNum(min, max, numCount) {
	let arr = [];
	for (let i = min; i <= max; i++) {
		arr.push(i);
	};

	let result = [];
	for (let i = min; i <= numCount; i++) {
		let ran = Math.floor(Math.random() * (max - i));
		result.push(arr[ran]);
		// this point*
		arr[ran] = arr[max - i];
	};
	return result;
};

// this function will delete one item from your array it give him array name and item index
function arrRem(array, index) {
	// if (index) bigger than (-1) => delete (index) from array and return it
	if (index > -1) {
	  array.splice(index, 1);
		return array;	
	};
};

function auto(player) {

	let sixAndSix = document.querySelector(".card.sixAndSix");
	let oneAndZero = document.querySelector(".card.zeroAndOne");

	if (player == undefined) {

		groundCards.forEach(card => {

			card.click();

		});

	} else if (player == 1) {

		sixAndSix.click();
		groundCards.forEach(card => {card.click();});

	} else if (player == 2) {

		oneAndZero.click();
		sixAndSix.click();
		groundCards.forEach(card => {card.click();});

	} else if (player > 2) {

		groundCards.forEach(card => {

			let topPoints = card.getAttribute("top-point");
			let downPoints = card.getAttribute("down-point");

			if (topPoints !== downPoints) {

				card.click();

			};

		});

	};

};
// ========== ^Reusable Functions^ ==========

// ========== Non Reusable Functions ==========
// this function add point to the card after append him to the page
function addCardPoints(parent, number) {
	// if (number) not equal (0) => do this for loop
	if (!number == 0) {
		for (let i = 1; i <= number; i++) {
			let li = document.createElement("li");
			parent.appendChild(li);
		};
	};
};

// this function distribution the cards to ground and add them to groundCards array
function distributionCardsOnGround() {

	let random = ranNum(0, 27, 27);

	for (let i = 0; i < Dominoes.thisCards.length; i++) {

		Dominoes.thisCards[random[i]].createElement(cardsContainer);
		Dominoes.thisCards[random[i]].isHidden(devSettings.cardsIsHidden);
		groundCards.push(document.querySelector(`.card.${Dominoes.thisCards[random[i]].name}`));

		groundCards.forEach(card => {

			card.classList.add("onGround");

		});

	};

};

// this function distribution cards to players and add last 14 card to side box
function distributionCardsToPlayersAndSideBox() {

	distributionCardsOnGround();

	let playerOneCardsContainer = document.querySelector(".players .player.playerOne .cards");
	let playerTwoCardsContainer = document.querySelector(".players .player.playerTwo .cards");
	let onGroundCards = document.querySelectorAll(".card.onGround");

	onGroundCards.forEach(e => {

		e.addEventListener("click", _ => {

			// if (e.classList) contains ("onGround") =>
			if (e.classList.contains("onGround")) {

				// if (playerTwoCards.length) not equal (7) =>
				if (!(document.querySelectorAll(".players .player.playerTwo .cards .card").length == 7)) {

					// if (playerOne.turn) equal (true) =>
					if (playerOne.turn) {

						ifPlayerTurn(playerOne, playerTwo, e);

						// if (e) has attr ("special-num") =>
						if (e.hasAttribute("special-num")) {

							specialNum(playerOne, e);

						}

						// else if (playerTwo.turn) equal (true) =>
					} else if (playerTwo.turn) {

						ifPlayerTurn(playerTwo, playerOne, e);

						// if (q) has attr ("special-num") =>
						if (e.hasAttribute("special-num")) {

							specialNum(playerTwo, e);

						}

					};

					// 1. if (playerTwoCards.length) equal (7) =>
					if (document.querySelectorAll(".players .player.playerTwo .cards .card").length == 7) {

						groundCardsForEach();

						sideBoxCardsForEach();

						checkBestPlayerCard();

						playingAndChaining();

					};

				};

			};

		});

	});

};

function specialNum(player, cardDiv) {

	if (cardDiv.getAttribute("special-num") > player.bestCardNum) {

		player.bestCardNum = cardDiv.getAttribute("special-num");

	};

};

// 1. make forEach on groundCards
// --1. remove ("onGround") class in (card.div)
// --2. add new class ("onSideBox") in (card.div)
// --3. push (card) to (sideBoxCards.array)
function groundCardsForEach() {

	groundCards.forEach(card => {

		card.classList.remove("onGround");
		card.classList.add("onSideBox");
		sideBoxCards.push(card);

	});

};

function checkBestPlayerCard() {
	// 
	if (playerOne.bestCardNum > playerTwo.bestCardNum) {

	 	playerOne.turn = true;
		playerTwo.turn = false;

	} else {

	 	playerOne.turn = false;
	 	playerTwo.turn = true;

	};

};

function sideBoxCardsForEach() {

	groundCards = [];

	sideBoxCards.forEach(card => {

		sideBox.appendChild(card);

	});

};

function playingAndChaining() { // ~~~~~~~~~~~~~~~~~~~~~~

	// local function
	function firstCardHasPlayed(playerObj, card) {

		let topPoints = card.getAttribute("top-point");
		let downPoints = card.getAttribute("down-point");

		console.log(playerObj.name);
		leftChain.push([topPoints, downPoints]);
		rightChain.push([topPoints, downPoints]);

		playedOnGroundCards.push(card);
		card.remove();
		arrRem(playerObj.cards, playerObj.cards.indexOf(card));

	}

	// if (playerOne.turn) equal (true) =>
	if (playerOne.turn) {

		let firstPlay = true;
		let firstMatch = true;

		playerOne.cards.forEach(card => {

			card.addEventListener("click", _ => {

				playerOne.cards.forEach(card => {card.classList.remove("selected");});

				card.classList.add("selected");

			});

		});

	};

	// if (playerTwo.turn) equal (true) =>
	if (playerTwo.turn) {

		playerTwo.cards.forEach(card => {

			card.addEventListener("click", _ => {
			});

		});

	};
};

function ifPlayerTurn(pOne, pTwo, cardDiv) {

	pOne.cards.push(cardDiv);
	cardDiv.classList.remove("onGround");
	arrRem(groundCards, groundCards.indexOf(cardDiv));
	cardDiv.remove();
	pOne.cardsContainer.appendChild(cardDiv);

	pOne.turn = !pOne.turn;
	pTwo.turn = !pTwo.turn;

};
// ========== ^Non Reusable Functions^ ==========



distributionCardsToPlayersAndSideBox();