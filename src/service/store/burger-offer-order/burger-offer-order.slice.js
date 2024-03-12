import {createSlice} from '@reduxjs/toolkit';
import {sendOrder} from "./burger-offer-order.utils";

const initialState = {
	isBlocked: false,
	isDisplay: false,
	orderNumber: null,
	status: "initiation",
	error: null,
}


export const burgerOfferOrderSlice = createSlice({
	name: 'offerOrder',
	initialState: structuredClone(initialState),
	reducers: {
		sendOrderError: {
			prepare: (errorMessage) => {
				// console.log("errorMessage::",errorMessage);
				return {payload: {errorMessage}}
			},
			reducer: (state, action) => {
				// console.log("ingredientsLoadError::reducer::", {state, action});
				state.error = action.payload.errorMessage;
				state.status = "error";
				state.isBlocked = false;
				state.isDisplay = true;
				state.orderNumber = initialState.orderNumber;
				
				return state;
			},
		},
		sendOrderPending: (state) => {
			// console.log("ingredientsLoadPending::", {state});
			state.error = null;
			state.status = "pending";
			state.isBlocked = true;
			
			return state;
		},
		sendOrderSuccess: {
			prepare: (orderNumber) => ({payload: {orderNumber}}),
			reducer: (state, action) => {
				// console.log("ingredientsLoadSuccess::reducer::", {state, action});
				state.error = null;
				state.status = "ready";
				state.isBlocked = false;
				state.isDisplay = true;
				state.orderNumber = action.payload.orderNumber;
				
				return state;
			}
		},
		closeModal: state => {
			if (state.isBlocked === true) return state;
			return structuredClone(initialState)
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(sendOrder.fulfilled, (state, action) => {
				burgerOfferOrderSlice.caseReducers.sendOrderSuccess(
					state,
					burgerOfferOrderSlice.actions.sendOrderSuccess(action.payload)
				);
				
			})
			.addCase(sendOrder.rejected, (state, action) => {
				burgerOfferOrderSlice.caseReducers.sendOrderError(
					state,
					burgerOfferOrderSlice.actions.sendOrderError(action.error.message.toString())
				);
			})
			.addCase(sendOrder.pending, (state, action) => {
				burgerOfferOrderSlice.caseReducers.sendOrderPending(state);
			})
	},
});


export const {actions, reducer} = burgerOfferOrderSlice;
export default reducer;