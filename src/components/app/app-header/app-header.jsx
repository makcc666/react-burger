import React, {useState} from 'react';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from "./app-header.module.scss";
import classNames from "classnames";
import {NavLink} from "react-router-dom";


const AppHeader = () => {
	return (
		<header className={styles.container}>
			<ul className={styles.content}>
				<li className={classNames(styles.side, styles.leftSide)}>
					<NavLink
						to={`/`}
					>
						{({isActive,...args}) => {
							console.log("args::",args)
							return <span className={isActive ? styles.active : ""}>Some name</span>
						}}
					</NavLink>
					<a href="#" className={classNames(styles.link, styles.active)}>
						<div className={styles.linkContent}>
							<BurgerIcon type="primary"/>
							<span className="text text_type_main-default">Конструктор</span>
						</div>
					</a>
					<a href="#" className={styles.link}>
						<div className={styles.linkContent}>
							<ListIcon type="secondary"/>
							<span className="text text_type_main-default">Лента заказов</span>
						</div>
					</a>
				</li>
				<li className={classNames(styles.side, styles.centerSide)}>
					<a href="/public" >
						<Logo/>
					</a>
				</li>
				<li className={classNames(styles.side, styles.rightSide)}>
					<a href="#" className={styles.link}>
						<div className={styles.linkContent}>
							<ProfileIcon type="secondary"/>
							<span className="text text_type_main-default">Личный кабинет</span>
						</div>
					</a>
				</li>
			</ul>
		</header>
	);
};

export default AppHeader;
