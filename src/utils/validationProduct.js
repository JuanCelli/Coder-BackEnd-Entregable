export const validationProduct = product => !Object.keys(product).find(key => product[key] === undefined || product[key] === null || product[key] === "") ? true : false;
