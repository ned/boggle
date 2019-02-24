window.onload = () => {
	const root = document.getElementById("root");

	const weights = {
		  'A': 8
		, 'B': 3
		, 'C': 4
		, 'D': 4
		, 'E': 10
		, 'F': 3
		, 'G': 3
		, 'H': 4
		, 'I': 7
		, 'J': 2
		, 'K': 3
		, 'L': 3
		, 'M': 3
		, 'N': 3
		, 'O': 6
		, 'P': 4
		, 'Qu': 2
		, 'R': 4
		, 'S': 5
		, 'T': 5
		, 'U': 4
		, 'V': 2
		, 'W': 2
		, 'X': 1
		, 'Y': 2
		, 'Z': 1
		};
	
	const distribution = makeDistribution(weights);
	
	const letters = [];
	for (let i = 0; i < 16; i++) {
		letter = randomElement(distribution);
		rotation = randomElement([0, 90, 180, 270]);
		createLetter(root, letter, rotation);
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

function createLetter(root, letter, rotation) {
	const node = document.createElement("div");
	const textNode = document.createElement("span");

	textNode.textContent = letter;
	textNode.style.transform = `rotate(${rotation}deg)`;

	const shouldUnderline = ['W', 'M', 'Z']
	if (shouldUnderline.includes(letter)) {
		textNode.classList.add('underline');
	}

	node.appendChild(textNode);
	root.appendChild(node);
}
