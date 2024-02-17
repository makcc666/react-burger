import React from "react";
import styles from "./tabs.module.scss";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";

const TabsIngredients = () => {
	const [current, setCurrent] = React.useState('bun')
	
	return (
		<nav className={styles.tabsIngredients}>
			<Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
				Булки
			</Tab>
			<Tab value="sauces" active={current === 'sauces'} onClick={setCurrent}>
				Соусы
			</Tab>
			<Tab value="filling" active={current === 'filling'} onClick={setCurrent}>
				Начинка
			</Tab>
		</nav>
	)
}

export default TabsIngredients