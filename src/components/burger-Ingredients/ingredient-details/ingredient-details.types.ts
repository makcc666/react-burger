import {IIngredient} from "@utils/types";

export interface IPropsDetailsPopup {
	ingredient: IIngredient
}


export interface IStoreMock  {
	ingredients: {
		list: IIngredient[]
	}
}
export enum INGREDIENT_DETAILS_ERROR {
	INVALID_ID="ID ингредиента не указан или невалидный",
	NOT_FOUND_BY_ID="Ингредиент с таким ID не найден"
}