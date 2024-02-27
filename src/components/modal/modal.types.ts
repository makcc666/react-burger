import React from "react";

export enum MODAL_CONSTANTS {
	CONTAINER_SELECTOR="#modalContainer"
}

export interface IPropsModal {
	onClose: ()=>void,
	children: React.ReactNode,
	title?: string
}