import {IGroupOfIngredients} from "../../../utils/types";
import {THandlerIngredientChose} from "../item/item.types";

export interface IPropsGroup extends IGroupOfIngredients {
	handlerChoseIngredient: THandlerIngredientChose
}