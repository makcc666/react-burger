import {HTMLAttributes} from "react";

export interface IPropsErrorBlock extends  HTMLAttributes<HTMLDivElement> {
	title:string;
	message:string;
}