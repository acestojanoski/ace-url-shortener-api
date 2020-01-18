export const isString = value =>
	Object.prototype.toString.call(value) === '[object String]';

export const isObject = value =>
	Object.prototype.toString.call(value) === '[object Object]';

export const objectHasProperty = (obj, prop) =>
	Object.prototype.hasOwnProperty.call(obj, prop);
