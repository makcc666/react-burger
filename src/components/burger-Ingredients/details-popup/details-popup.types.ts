import {IIngredient} from "../../../utils/types";
import {MouseEventHandler} from "react";

export interface IPropsDetailsPopup {
	ingredient?: IIngredient
}

export type THandlerChose = (ingredient:IIngredient)=>void;