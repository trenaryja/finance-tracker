import uuid from 'uuid/v4';
import * as faker from 'faker/locale/en_US';
import * as utils from '../utils';

export default class Transaction {
	static accountOptions() {
		return ['Discover', 'Chase', 'BBT'];
	}

	static flagOptions() {
		return ['Hold', 'Paid', 'Rachel', 'Justin'];
	}

	static generateRandomTransaction() {
		let random = new Transaction();
		random.id = uuid();
		random.account = this.accountOptions()[Math.floor(Math.random() * this.accountOptions().length)];
		random.transactionDate = +utils.randomMoment();
		random.postDate = +utils.randomMoment();
		random.description = faker.lorem.words(10);
		random.amount = +faker.finance.amount(-1000, 1000, 2);
		random.flags = utils.getRandomSubarray(this.flagOptions());
		return random;
	}

	static generateDummyData(size) {
		return [...Array(size)].map(() => Transaction.generateRandomTransaction());
	}
}
