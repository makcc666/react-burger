import {createAsyncThunk} from "@reduxjs/toolkit";
import {sendApiRequest} from "@utils/api-requests";
import {asleep} from "../../../utils/data";
import {getTokens} from "@store/user/user.utils";

export const sendOrder = createAsyncThunk(
	'offerOrder/sendOrder',
	async (items) => {
		if (Array.isArray(items) === false || items.length < 1) throw new Error("Invalid or empty items list");
		await asleep(600);
		const {order: orderRes} = await sendApiRequest(
			"/api/orders", {ingredients: items}, "POST",
			{
				"Authorization": getTokens().access
			}
		);
		return orderRes.number;
	}
)