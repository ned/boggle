window.onload = () => {
	const root = document.getElementById("root");

	const weights = {
		  'a': 8
		, 'b': 3
		, 'c': 4
		, 'd': 4
		, 'e': 10
		, 'f': 3
		, 'g': 3
		, 'h': 4
		, 'i': 7
		, 'j': 2
		, 'k': 3
		, 'l': 3
		, 'm': 3
		, 'n': 3
		, 'o': 6
		, 'p': 4
		, 'qu': 4
		, 'r': 4
		, 's': 5
		, 't': 5
		, 'u': 4
		, 'v': 2
		, 'w': 2
		, 'x': 1
		, 'y': 2
		, 'z': 1
		};
	
	const distribution = makeDistribution(weights);
	
	const letters = [];
	for (let i = 0; i < 16; i++) {
		letters.push(randomElement(distribution));
	}

	console.log(letters);

	for (let letter of letters) {
		createLetter(root, letter);
	}
}

function randomElement(list) {
	const index = Math.floor(Math.random() * list.length);
	return list[index];
}

function makeDistribution(weights) {
	const distribution = []
	for (const [key, weight] of Object.entries(weights)) {
		for (let i = 0; i < weight; i++) {
			distribution.push(key);
		}
	}
	return distribution;
}

function createLetter(root, text) {
	const node = document.createElement("div");
	node.textContent = text
	root.appendChild(node);
}
