import pipeline from '../utils/pipeline';

const ping = async (event, context) => {
	if (
		event.queryStringParameters &&
		event.queryStringParameters.simulateError === 'true'
	) {
		throw new Error();
	}

	return {
		message: 'pong',
	};
};

export const handler = async (event, context) => {
	const result = await pipeline(event, context, ping);
	return result;
};
