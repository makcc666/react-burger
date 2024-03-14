export const getClearIngredientsList = ({bun, ingredients} ) => {
	let res = [...ingredients];
	if (bun) {
		res.unshift(bun);
		res.push(bun);
	}
	
	res = structuredClone(res);
	for (const item of res) {
		delete item.uid;
	}
	
	return res;
};


export const getCountOfIngredient = (ingredientOrID, itemsCountList) => {
	const id = ingredientOrID?._id ?? ingredientOrID;
	return itemsCountList[id] || 0;
}
