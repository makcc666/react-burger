import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {burgerIngredientsSlice} from "./burger-ingredients/burger-ingredients.slice";
import {ingredientDetailsModalSlice} from "./ingredient-details/ingredient-details-modal.slice";
import {burgerConstructorSlice} from "./burger-constructor/burger-constructor.slice";
import {burgerOfferOrderSlice} from "./burger-offer-order/burger-offer-order.slice";


export const rootReducer = combineReducers({
	ingredients: burgerIngredientsSlice.reducer,
	detailsIngredientModal: ingredientDetailsModalSlice.reducer,
	burgerConstructor: burgerConstructorSlice.reducer,
	offerOrder: burgerOfferOrderSlice.reducer,
	
})


export const store = configureStore({
	reducer: rootReducer,
	devTools: true,
});

export default store;


