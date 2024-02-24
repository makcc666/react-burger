export interface IArgsSwitchController {
	open: Function,
	close: Function
}

export type TSwitchController = (args: IArgsSwitchController) => void;

export interface IPropsOrderPopup {
	switchController?: TSwitchController
}

