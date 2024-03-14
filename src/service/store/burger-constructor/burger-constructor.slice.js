import {createSlice} from '@reduxjs/toolkit';
import {generateUniqID} from "../../../utils/data";
import {getCountOfIngredient} from "./burger-constructor.utils";

const initialState = {
	bun: null,
	ingredients: [],
	itemsCountList: {},
	stats: {
		totalPrice: 0,
		isFulfilled: false,
	},
}


export const burgerConstructorSlice = createSlice({
	name: 'burgerConstructor',
	initialState: structuredClone(initialState),
	reducers: builder => ({
		addIngredient: builder.preparedReducer(
			ingredient => {
				return {payload: {ingredient, uid: generateUniqID()}}
			},
			(state, action) => {
				let addCount = 0;
				
				const item = {
					...action.payload.ingredient,
					uid: action.payload.uid,
				}
				switch (item.type) {
					case "bun": {
						if (state.bun !== null) {
							if (state.bun._id === item._id) break;
							delete state.itemsCountList[state.bun._id];
						}
						
						state.bun = item;
						addCount = 2
						break;
					}
					default: {
						state.ingredients.push(item);
						addCount = 1;
						break;
					}
				}
				
				state.itemsCountList[item._id] = getCountOfIngredient(item._id, state.itemsCountList) + addCount;
				return state;
			}
		),
		deleteIngredient: builder.preparedReducer(
			ingredientOrUID => ({
				payload: {
					uid: ingredientOrUID?.uid ?? ingredientOrUID
				}
			}),
			(state, {payload}) => {
				const findItem = {
					index: null,
					ingredient: null
				}
				findItem.index = state.ingredients.findIndex(ingredient => ingredient.uid === payload.uid);
				if (findItem.index === -1) {
					console.warn("burgerConstructorSlice::reducer::deleteIngredient", "Нет предмета под таким UID");
					return state;
				}
				findItem.ingredient = state.ingredients[findItem.index];
				
				const newCountValue = getCountOfIngredient(findItem.ingredient._id, state.itemsCountList) - 1;
				if (newCountValue < 1) delete state.itemsCountList[findItem.ingredient._id]
				else state.itemsCountList[findItem.ingredient._id] = newCountValue;
				
				state.ingredients.splice(findItem.index, 1);
				return state;
			}
		),
		calculateStats: (state) => {
			state.stats.isFulfilled = state.bun && state.ingredients.length > 0
			
			let amount = 0;
			
			const ingredients = [...state.ingredients];
			if (state.bun) ingredients.push(state.bun);
			for (const ingredient of ingredients) {
				amount += ingredient.price
			}
			state.stats.totalPrice = amount;
			
			return state;
		},
		resetStore: (state) => structuredClone(initialState),
		swapIngredientPosition: builder.preparedReducer(
			(from, to) => ({
				payload: {
					from, to
				}
			}),
			(store, {payload}) => {
				payload.from = Math.min(
					store.ingredients.length,
					Math.max(payload.from, 0)
				);
				payload.to = Math.min(
					store.ingredients.length,
					Math.max(payload.to, 0)
				);
				if (payload.from === payload.to) return store;
				
				const newIngredients = [...store.ingredients];
				const swapItems = {
					from: newIngredients[payload.from],
					to: newIngredients[payload.to],
				}
				newIngredients[payload.from] = swapItems.to;
				newIngredients[payload.to] = swapItems.from;
				
				store.ingredients = newIngredients;
				return store;
			}
		),
	}),
});
export const {actions:burgerActions, reducer:burgerReducer} = burgerConstructorSlice;
export default burgerReducer;