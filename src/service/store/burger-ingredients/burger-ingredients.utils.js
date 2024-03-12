import {createAsyncThunk} from "@reduxjs/toolkit";
import {sendApiRequest} from "../../../utils/api-requests/api-requests";

export const ingredientsLoad = createAsyncThunk(
	'ingredients/ingredientsLoad',
	async () => {
		const {data:list} = await sendApiRequest("/api/ingredients");
		if (list.length === 0) throw new Error("Список ингредиентов пуст");
		
		// console.log("ingredientsLoad::FETCH::response list::", list);
		return list
	}
)