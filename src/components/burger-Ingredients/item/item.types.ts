import {IIngredient} from "../../../utils/types";

export type THandlerIngredientChose = (ingredient: IIngredient) => void;

export interface IPropsItem {
	ingredient: IIngredient,
	handlerChoseIngredient: THandlerIngredientChose
}