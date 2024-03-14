import React, {memo} from 'react';
import preloader from "../../../images/preloader.svg"
import styles from "./preloader.module.scss";
import classNames from "classnames";
import {IPropsPreloader, LOADING_STATUSES} from "./preloader.types";

const Preloader = function ({status}:IPropsPreloader) {
	
	return (
		<div
			className={classNames(
				styles.container,
				{
					[styles.prepare]: status === LOADING_STATUSES.START || status === LOADING_STATUSES.LONG_WAIT,
					[styles.show]: status === LOADING_STATUSES.LONG_WAIT,
					[styles.done]: status === LOADING_STATUSES.FINISH,
				}
			)}>
			<img src={preloader} alt="Wait loading site"/>
		</div>
	);
}

export default memo(Preloader) as typeof Preloader;
