import {URL} from 'url';
import pipeline from '../utils/pipeline';
import errorResponse from '../utils/error-response';
import requestWithRetry from '../utils/request-with-retry';
import insertUrlsRecord from '../repositories/insert-urls-record';
import getUrlsRecordByLongUrl from '../repositories/get-urls-record-by-long-url';

const generateShortUrl = async (event, context) => {
	if (event.httpMethod !== 'POST') {
		throw errorResponse(405, 'Method Not Allowed');
	}

	let request = {};

	try {
		request = JSON.parse(event.body);
		new URL(request.longUrl);
	} catch (err) {
		throw errorResponse(400, 'Invalid longUrl provided.');
	}

	const existingUrlsRecord = await getUrlsRecordByLongUrl(request.longUrl);

	if (existingUrlsRecord) {
		return {
			shortUrlId: existingUrlsRecord.shortUrlId,
		};
	}

	const newUrlsRecord = await requestWithRetry(insertUrlsRecord, 2, [
		request.longUrl,
	]);

	return {
		statusCode: 201,
		shortUrlId: newUrlsRecord.shortUrlId,
	};
};

export const handler = async (event, context) => {
	const result = await pipeline(event, context, generateShortUrl);
	return result;
};
