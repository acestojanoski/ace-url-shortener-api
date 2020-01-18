import mongoose from 'mongoose';

export const modelName = 'urls';

const schema = new mongoose.Schema(
	{
		longUrl: {
			type: String,
			unique: true,
			required: true,
		},
		shortUrlId: {
			type: String,
			unique: true,
			required: true,
		},
	},
	{collection: modelName}
);

export default schema;
