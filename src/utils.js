import moment from 'moment';

export const colors = {
	discoverOrange: '#ff5000',
	bbtRed: '#891635',
	chaseBlue: '#0f5ba7'
};

export const formatAsCurrency = (number) => {
	return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

export const getRandomSubarray = (arr) => {
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
