import React from 'react';
import {IPropsErrorBlock} from "./info-block.types";

const InfoBlock = ({title, message, ...props}: IPropsErrorBlock) => {
	return (
		<div>
			<h1>{title}</h1>
			<span>{message}</span>
		</div>
	);
};

export default InfoBlock;
