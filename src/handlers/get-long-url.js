import pipeline from '../utils/pipeline';
import errorResponse from '../utils/error-response';
import getUrlsRecordByShortUrlId from '../repositories/get-urls-record-by-short-url-id';

const getLongUrl = async (event, context) => {
	if (event.httpMethod !== 'GET') {
		throw errorResponse(405, 'Method Not Allowed');
	}

	const record = await getUrlsRecordByShortUrlId(
		event.queryStringParameters.shortUrlId
	);

	if (!record) {
		throw errorResponse(404, 'Not Found.');
	}

	return {
		longUrl: record.longUrl,
	};
};

export const handler = async (event, context) => {
	const result = await pipeline(event, context, getLongUrl);
	return result;
};
