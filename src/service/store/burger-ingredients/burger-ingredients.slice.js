import {ingredientsLoad} from "./burger-ingredients.utils";
import {createSlice} from "@reduxjs/toolkit";


const initialState = {
	list: [],
	status: "initiation",
	error: null,
	currentTab: "bun",
}

export const burgerIngredientsSlice = createSlice({
	name: 'ingredients',
	initialState: structuredClone(initialState),
	reducers: {
		ingredientsLoadError: {
			prepare: (errorMessage) => ({payload: {errorMessage}}),
			reducer: (state, action) => {
				// console.log("ingredientsLoadError::reducer::", {state, action});
				state.error = action.payload.errorMessage;
				state.list = [];
				state.status = "error";
				return state;
			},
		},
		ingredientsLoadPending: (state) => {
			// console.log("ingredientsLoadPending::", {state});
			state.error = null;
			state.status = "pending";
			return state;
		},
		ingredientsLoadSuccess: {
			prepare: (list) => ({payload: {list}}),
			reducer: (state, action) => {
				// console.log("ingredientsLoadSuccess::reducer::", {state, action});
				state.error = null;
				state.status = "ready";
				state.list = action.payload.list;
				return state;
			}
		},
		setCurrentTab: {
			prepare: name => ({payload: {name}}),
			reducer: (store, {payload}) => {
				if (store.currentTab !== payload.name) store.currentTab = payload.name;
				return store;
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(ingredientsLoad.fulfilled, (state, action) => {
				burgerIngredientsSlice.caseReducers.ingredientsLoadSuccess(
					state,
					burgerIngredientsSlice.actions.ingredientsLoadSuccess(action.payload)
				);
				
			})
			.addCase(ingredientsLoad.rejected, (state, action) => {
				burgerIngredientsSlice.caseReducers.ingredientsLoadError(
					state,
					burgerIngredientsSlice.actions.ingredientsLoadError(action.error.message.toString())
				);
			})
			.addCase(ingredientsLoad.pending, (state, action) => {
				burgerIngredientsSlice.caseReducers.ingredientsLoadPending(state);
			})
	},
});

export const {selectors:ingredientsSelectors,actions:ingredientsActions, reducer:ingredientsReducer} = burgerIngredientsSlice;
