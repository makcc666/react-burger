import {createSlice} from '@reduxjs/toolkit';

const initialState = {
	item: null,
	isActive: false,
}

export const ingredientDetailsModalSlice = createSlice({
	name: 'ingredientDetailsModal',
	initialState: structuredClone(initialState),
	reducers: builder => ({
		setActive: builder.preparedReducer(
			ingredient => {
				return {payload: {item: ingredient}}
			},
			(state, action) => {
				state.isActive = true;
				state.item = action.payload.item;
				return state;
			}
		),
		clearActive: (state) => {
			state.isActive = false;
			state.item = null;
			return state
		},
	}),
});


export const {actions, reducer} = ingredientDetailsModalSlice;
export default reducer;