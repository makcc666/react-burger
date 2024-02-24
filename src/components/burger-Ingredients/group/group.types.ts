import {IGroupOfIngredients} from "../../../utils/types";
import {THandlerChose} from "../details-popup/details-popup.types";

export interface IPropsGroup extends IGroupOfIngredients {
	handlerChoseIngredient: THandlerChose
}