import getConnectionModel from '../utils/get-connection-model';
import urlsSchema, {modelName} from '../schemas/urls-schema';
import shortid from 'shortid';

export default async longUrl => {
	const Urls = await getConnectionModel(modelName, urlsSchema);
	const record = await Urls.create({
		longUrl,
		shortUrlId: shortid.generate(),
	});

	return record && record._doc;
};
