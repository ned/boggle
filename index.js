window.onload = () => {
	const root = document.getElementById("root");

	const weights = {
		  'a': 1
		, 'b': 1
		, 'c': 1
		, 'd': 1
		, 'e': 1
		, 'f': 1
		, 'g': 1
		, 'h': 1
		, 'i': 1
		, 'j': 1
		, 'k': 1
		, 'l': 1
		, 'm': 1
		, 'n': 1
		, 'o': 1
		, 'p': 1
		, 'q': 1
		, 'r': 1
		, 's': 1
		, 't': 1
		, 'u': 1
		, 'v': 1
		, 'w': 1
		, 'x': 1
		, 'y': 1
		, 'z': 1
		};
	
	const distribution = makeDistribution(weights);
	
	const letters = [];
	for (let i = 0; i < 16; i++) {
		letters.push(randomElement(distribution));
	}

	console.log(letters);

	for (let letter of letters) {
		createLetter(root, letter.toUpperCase())
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
