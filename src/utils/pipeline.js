import {isString, isObject} from './common-functions';
import dotenv from 'dotenv';

const headers = {
	'Content-Type': 'application/json',
	'Access-Control-Allow-Methods': '*',
};

export default async (event, context, handler) => {
	console.debug('EVENT: ', JSON.stringify(event, null, '\t'));

	headers['Access-Control-Allow-Origin'] = process.env.CORS_ORIGINS
		? process.env.CORS_ORIGINS.split(';').join(', ')
		: '*';

	if (process.env.NODE_ENV === 'local') {
		dotenv.config({path: `config/.env.${process.env.NODE_ENV}`});
	}

	try {
		const result = await handler(event, context);

		const response = {
			statusCode: 200,
			body: '',
			headers,
		};

		if (isString(result)) {
			response.body = result;
		}

		if (isObject(result)) {
			const {statusCode, ...rest} = result;
			response.statusCode = statusCode || response.statusCode;
			response.body = JSON.stringify(rest);
		}

		console.debug('RESPONSE: ', JSON.stringify(response, null, '\t'));
		return response;
	} catch (err) {
		console.error('ERROR: ', err);

		return {
			statusCode: err.statusCode || 500,
			body: JSON.stringify({
				message: err.message || 'Internal server error.',
			}),
			headers,
		};
	}
};
