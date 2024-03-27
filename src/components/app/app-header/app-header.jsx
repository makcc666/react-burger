import React, {useCallback, useState} from 'react';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from "./app-header.module.scss";
import classNames from "classnames";
import {Link, NavLink} from "react-router-dom";
import {useSelector} from "react-redux";


const LinkWithIcon = ({IconComponent, title, to}) => {
	const calcClassesForLink = useCallback(
		({isActive}) => classNames(
			{[styles.active]: isActive,},
			styles.link
		),
		[],
	);
	
	
	return (
		<NavLink
			to={to}
			className={calcClassesForLink}
		>
			{({isActive}) => (
				<div className={styles.linkContent}>
					<IconComponent type={isActive ? "primary" : "secondary"}/>
					<span className="text text_type_main-default">{title}</span>
				</div>
			)}
		
		</NavLink>
	)
}

const AppHeader = () => {
	const {profile} = useSelector(state=>state.user);
	return (
		<header className={styles.container}>
			<ul className={styles.content}>
				<li className={classNames(styles.side, styles.leftSide)}>
					<LinkWithIcon to="/" title="Конструктор" IconComponent={BurgerIcon}/>
					<LinkWithIcon to="/some" title="Лента заказов" IconComponent={ListIcon}/>
				</li>
				<li className={classNames(styles.side, styles.centerSide)}>
					<Link to="/">
						<Logo/>
					</Link>
				</li>
				<li className={classNames(styles.side, styles.rightSide)}>
					<LinkWithIcon to="/profile" title={profile ? profile.name : "Личный кабинет"} IconComponent={ProfileIcon}/>
				</li>
			</ul>
		</header>
	);
};

export default AppHeader;
