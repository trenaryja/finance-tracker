export const formatAsCurrency = number => {
	return number.toLocaleString("en-US", {
		style: "currency",
		currency: "USD",
	});
};

export const getRandomSubarray = arr => {
	const shuffled = arr.slice(0);
	const size = Math.floor(Math.random() * arr.length);
	let temp,
		index,
		i = arr.length;
	while (i--) {
		index = Math.floor((i + 1) * Math.random());
		temp = shuffled[index];
		shuffled[index] = shuffled[i];
		shuffled[i] = temp;
	}
	return shuffled.slice(0, size);
};

export const randomDate = () => {
	return new Date(Math.floor(Math.random() * new Date()));
};

export const intersection = (...args) => {
	let result = [];
	let lists;

	if (args.length === 1) {
		lists = args[0];
	} else {
		lists = args;
	}

	for (let i = 0; i < lists.length; i++) {
		let currentList = lists[i];
		for (let y = 0; y < currentList.length; y++) {
			let currentValue = currentList[y];
			if (result.indexOf(currentValue) === -1) {
				let existsInAll = true;
				for (let x = 0; x < lists.length; x++) {
					if (lists[x].indexOf(currentValue) === -1) {
						existsInAll = false;
						break;
					}
				}
				if (existsInAll) {
					result.push(currentValue);
				}
			}
		}
	}
	return result;
};

export const convertToCsv = (array, filename) => {
	const replacer = (_key, value) => (value === null ? "" : value);
	const header = Object.keys(array[0]);
	let csv = array.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(";"));
	csv.unshift(header.join(","));
	csv = csv.join("\r\n");
	filename = filename + ".csv" || "export.csv";
	const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
	const link = document.createElement("a");
	const url = URL.createObjectURL(blob);
	link.setAttribute("href", url);
	link.setAttribute("download", filename);
	link.style.visibility = "hidden";
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};
