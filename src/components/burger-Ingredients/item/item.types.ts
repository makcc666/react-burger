import {IIngredient} from "../../../utils/types";
import {THandlerChose} from "../details-popup/details-popup.types";


export interface IPropsItem {
	ingredient: IIngredient,
	handlerChoseIngredient: THandlerChose
}