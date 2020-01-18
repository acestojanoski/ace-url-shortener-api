import mongoose from 'mongoose';
import decryptValue from './decrypt-value';
import {ENCRYPTED_IDENTIFIER} from '../constants/identifiers';

let connection = null;

export default async (modelName, schema) => {
	let connectionString = process.env.CONNECTION_STRING || '';

	connectionString = decryptValue(
		process.env.MASTER_KEY,
		connectionString.split(ENCRYPTED_IDENTIFIER)[1]
	);

	if (!connection) {
		connection = await mongoose.createConnection(connectionString, {
			bufferCommands: false,
			bufferMaxEntries: 0,
		});
		connection.model(modelName, schema);
	}

	return connection.model(modelName);
};
