import {HTMLAttributes} from "react";

export enum EType {
	DEFAULT="default",
	DEBUG="debug",
}

export interface IPropsErrorBlock extends  HTMLAttributes<HTMLDivElement> {
	title:string;
	message:string;
	type?:EType;
}