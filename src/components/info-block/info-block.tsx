import React, {memo} from 'react';
import {EType, IPropsErrorBlock} from "./info-block.types";
import classNames from "classnames";
import styles from "./info-block.module.scss";

const InfoBlock = ({title, message, type = EType.DEFAULT, children}: IPropsErrorBlock) => {
	return (
		<div className={classNames(
			styles.infoBlock,
			{
				[styles.default]: type === EType.DEFAULT,
				[styles.mode]: type !== EType.DEFAULT,
				[styles.debug]: type === EType.DEBUG,
			}
		)}>
			<h1 className={styles.title}>{title}</h1>
			<span className={styles.message}>{message}</span>
			{children && <div className={styles.childrenContainer}>{children}</div>}
		</div>
	);
};

export default memo(InfoBlock);