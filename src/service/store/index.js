import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {burgerIngredientsSlice} from "@store/burger-ingredients/burger-ingredients.slice";
import {burgerConstructorSlice} from "@store/burger-constructor/burger-constructor.slice";
import {burgerOfferOrderSlice} from "@store/burger-offer-order/burger-offer-order.slice";
import {userSlice} from "@store/user/user.slice";


export const rootReducer = combineReducers({
	ingredients: burgerIngredientsSlice.reducer,
	burgerConstructor: burgerConstructorSlice.reducer,
	offerOrder: burgerOfferOrderSlice.reducer,
	user: userSlice.reducer,
})


export const store = configureStore({
	reducer: rootReducer,
	devTools: true,
});

export default store;


