import {createAsyncThunk} from "@reduxjs/toolkit";
import {sendApiRequest} from "../../../utils/api-requests/api-requests";
import {asleep} from "../../../utils/data";

export const sendOrder = createAsyncThunk(
	'offerOrder/sendOrder',
	async (items) => {
		if (Array.isArray(items) === false || items.length < 1) throw new Error("Invalid or empty items list");
		await asleep(600);
		const {order: orderRes} = await sendApiRequest("/api/orders", {ingredients: items}, "POST");
		return orderRes.number;
	}
)