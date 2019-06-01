import moment from 'moment';

export const colors = {
	discoverOrange: '#ff5000',
	bbtRed: '#891635',
	chaseBlue: '#0f5ba7'
};

export const formatAsCurrency = number => {
	return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
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

export const randomMoment = () => {
	return moment(Math.floor(Math.random() * +moment()));
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
