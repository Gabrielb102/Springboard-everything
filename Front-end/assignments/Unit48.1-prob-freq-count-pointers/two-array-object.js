// add whatever parameters you deem necessary
function twoArrayObject(keys, values) {
    const result = {};
    for (let i in keys) {
        result[keys[i]] = values[i] || null;
    }
    return result;
}
