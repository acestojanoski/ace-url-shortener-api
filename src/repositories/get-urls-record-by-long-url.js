import getConnectionModel from '../utils/get-connection-model';
import urlsSchema, {modelName} from '../schemas/urls-schema';

export default async longUrl => {
	const Urls = await getConnectionModel(modelName, urlsSchema);
	const record = await Urls.findOne({longUrl}).exec();
	return record && record._doc;
};
