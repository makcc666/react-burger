export const enum LOADING_STATUSES {
	// Компонент инициализирован, пошла загрузка данных
	START="prepare",

	// Прошло некоторое время, после инициализации, но загрузка не завершена
	LONG_WAIT="show",

	// Загрузка завершена
	FINISH="done"
}

export interface IPropsPreloader {
	status: LOADING_STATUSES
}