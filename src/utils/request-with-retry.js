import retry from 'async-retry';

export default (requestFunction, retries, args) =>
	retry(
		async bail => {
			const result = await requestFunction(...args);
			return result;
		},
		{retries}
	);
