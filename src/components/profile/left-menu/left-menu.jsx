import React, {useCallback} from 'react';
import styles from "./left-menu.module.scss";
import {NavLink} from "react-router-dom";
import classNames from "classnames";


export const ButtonMenu = ({clickHandler, children}) => {
	return (
		<button
			onClick={clickHandler}
			className={classNames(styles.link, styles.buttonLink)}
		>
			{children}
		</button>
	)
}

export const LinkMenu = ({end,to, children, type = "link"}) => {
	const calcClassesForLink = useCallback(
		(args) => classNames(
			{[styles.active]: !!args.isActive,},
			styles.link
		)
		,
		[],
	);
	
	return (
		<NavLink
			to={to}
			className={calcClassesForLink}
			end={end}
		>
			{children}
		</NavLink>
	)
}

export const HelpBlock= ({children}) => {
	return (
		<span className={styles.helpBlock}>{children}</span>
	)
}

const LeftMenu = ({children}) => {
	return (
		<div className={classNames(styles.menu)}>
			{children}
		</div>
	);
};

export default LeftMenu;
