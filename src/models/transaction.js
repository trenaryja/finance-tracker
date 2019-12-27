import uuid from "uuid/v4";
import * as faker from "faker/locale/en_US";
import * as utils from "../utilities/utils";

export default class Transaction {
	static accountOptions() {
		return ["Discover", "Chase", "BBT"];
	}

	static flagOptions() {
		return ["Hold", "Paid", "Justin", "Rachel"];
	}

	static generateRandomTransaction() {
		let random = new Transaction();
		random.id = uuid();
		random.account = this.accountOptions()[Math.floor(Math.random() * this.accountOptions().length)];
		random.transactionDate = utils.randomDate();
		random.description = faker.lorem.words(10);
		random.amount = +faker.finance.amount(-1000, 1000, 2);
		random.flags = utils.getRandomSubarray(this.flagOptions());
		return random;
	}

	static generateDummyData = size => {
		return [...Array(size)].map(() => Transaction.generateRandomTransaction());
	};

	static transactionsObject2Array = transactionsObject => {
		return Object.keys(transactionsObject).map(id => transactionsObject[id]);
	};

	static transactionsArray2Object = transactionsArray => {
		return transactionsArray.reduce((obj, transaction) => ({ ...obj, [transaction.id]: transaction }), {});
	};
}
