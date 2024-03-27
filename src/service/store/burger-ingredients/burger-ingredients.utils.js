import {createAsyncThunk} from "@reduxjs/toolkit";
import {sendApiRequest} from "@utils/api-requests";

export const ingredientsLoad = createAsyncThunk(
	'ingredients/ingredientsLoad',
	async () => {
		const {data:list} = await sendApiRequest("/api/ingredients");
		if (list.length === 0) throw new Error("Список ингредиентов пуст");
		
		// console.log("ingredientsLoad::FETCH::response list::", list);
		return list
	}
)


export const findIngredientFromList = (list, id) => list.find(item => item._id === id)
