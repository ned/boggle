let time = 180;
const timer = setInterval(tickTimer, 1000);
var endgame = new Audio('endgame.mp3');

const weights = {
		  'A': 0.08167
		, 'B': 0.01492
		, 'C': 0.02782
		, 'D': 0.04253
		, 'E': 0.12702
		, 'F': 0.02228
		, 'G': 0.02015
		, 'H': 0.06094
		, 'I': 0.06966
		, 'J': 0.00153
		, 'K': 0.00772
		, 'L': 0.04025
		, 'M': 0.02406
		, 'N': 0.06749
		, 'O': 0.07507
		, 'P': 0.01929
		, 'Q': 0.00095
		, 'R': 0.05987
		, 'S': 0.06327
		, 'T': 0.09056
		, 'U': 0.02758 - 0.00095 // freq(u) - freq(q)
		, 'V': 0.00978
		, 'W': 0.02360
		, 'X': 0.00150
		, 'Y': 0.01974
		, 'Z': 0.00074
		};

window.onload = () => {
	setTimer(time);
	const root = document.getElementById("board");
	const vowels = ["A", "E", "I", "O", "U"];


	for (const [key, weight] of Object.entries(weights)) {
		weights[key] = Math.cbrt(weights[key]);
		if (!vowels.includes(key)) {
			weights[key] = weights[key] / 2;
		}
	}
	console.log(weights);
	
	const letters = [];
	for (let i = 0; i < 16; i++) {
		distribution = makeDistribution(weights);
		letter = randomElement(distribution);
		weights[letter] = weights[letter] * 0.6;
		if (vowels.includes(letter)) {
			for (const [key, weight] of Object.entries(weights)) {
				if (vowels.includes(key)) {
					weights[key] = weights[key] * 0.8;
				}
			}
		}
		rotation = randomElement([0, 90, 180, 270]);
		createLetter(root, letter, rotation, i);
	}

	for (let i = 0; i < 16; i++) {
		tile = document.getElementById(`letter ${i}`);
		letter = tile.textContent;
		if (letter == "Q") {
			qcolumn = i % 4;
			qrow = Math.floor(i / 4);
			console.log(qcolumn);
			console.log(qrow);
			console.log(letter);
			validtiles = [];
			for (let column = 0; column < 4; column++) {
				for (let row = 0; row < 4; row++) {
					columndiff = Math.abs(column - qcolumn)
					rowdiff = Math.abs(row - qrow)
					if (columndiff <= 1 && rowdiff <= 1 && columndiff + rowdiff > 0) {
						validid = row * 4 + column;
						validtiles.push(validid);
					}

				}
			}
			uid = randomElement(validtiles);
			utile = document.getElementById(`letter ${uid}`);
			utile.textContent = "U";
		}
	}

}

function randomElement(list) {
	const index = Math.floor(Math.random() * list.length);	
	return list[index];
}

function makeDistribution(weights) {
	const distribution = []
	for (const [key, weight] of Object.entries(weights)) {
		const resolution = 10;
		const frequency = Math.floor(weight * resolution);
		for (let i = 0; i < frequency; i++) {
			distribution.push(key);
		}
	}
	return distribution;
}

function createLetter(root, letter, rotation, id) {
	const node = document.createElement("div");
	const textNode = document.createElement("span");
	node.setAttribute("id",`tile ${id}`)
	textNode.setAttribute("id",`letter ${id}`)
	textNode.textContent = letter;
	textNode.style.transform = `rotate(${rotation}deg)`;

	const shouldUnderline = ['W', 'M', 'Z']
	if (shouldUnderline.includes(letter)) {
		textNode.classList.add('underline');
	}

	node.appendChild(textNode);
	root.appendChild(node);
}

function pad(padding, n) {
	let result = "";
	for (let i = 0; i < padding; i++) {
		result = n % 10 + result;
		n = Math.floor(n / 10);
	}
	return result;
}

function setTimer(time) {
	const timeNode = document.getElementById("timer");
	const minutes = Math.floor(time / 60);
	const seconds = time % 60;
	timeNode.textContent = `${minutes}:${pad(2, seconds)}`;
}

function tickTimer() {
	time = time - 1;
	setTimer(time);
	if (time <= 0) {
		for (let i = 0; i < 16; i++) {
			const tileNode = document.getElementById(`tile ${i}`);
			tileNode.classList.add('greytile');
		}
		const timeNode = document.getElementById("timer");
		clearInterval(timer);
		timeNode.textContent = `End!`;
		endgame.play();
	}
	return;
}
