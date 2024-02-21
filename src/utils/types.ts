/*
export enum ETypeIngredient {
	BUN="bun",
	MAIN="main",
	SAUCE="sauce",
}
 */

// Т.к. в задаче не явно указан запрет на редактирование hardcode данных, то использую его вместо ENUM
export type TTypeIngredient = "bun" | "main" | "sauce"

export interface IIngredient {
	"_id": string,
	"name": string,
	"type": TTypeIngredient,
	"proteins": number,
	"fat": number,
	"carbohydrates": number,
	"calories": number,
	"price": number,
	"image": string,
	"image_mobile": string,
	"image_large": string,
	"__v": number
}

export interface IGroupOfIngredients {
	title:string,
	list:IIngredient[]
}