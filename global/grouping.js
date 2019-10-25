/**
 * Function to group elements in an array
 * Provide the key by which grouping to be done
 * Pass second arguement as array on which grouping need to be done
 * @param {grouping(key, array)} key
 * @param {array} array
 * @param {key} string
 */
const grouping = (key, array) =>
	array.reduce((objectsByKeyValue, obj) => {
		const value = obj[key];
		objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
		return objectsByKeyValue;
	}, {});

module.exports = grouping;
