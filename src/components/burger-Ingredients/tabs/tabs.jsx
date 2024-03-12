import React, {useCallback, useMemo, useState} from "react";
import styles from "./tabs.module.scss";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {burgerIngredientsSlice} from "../../../service/store/burger-ingredients/burger-ingredients.slice";
import {getRandomInt} from "../../../utils/data";

const TabsIngredients = ({handlerManualChoice}) => {
	const {currentTab} = useSelector(store => store.ingredients);
	return (
		<nav className={styles.tabsIngredients} >
			<Tab value="bun" active={currentTab === 'bun'} onClick={handlerManualChoice}>
				Булки
			</Tab>
			<Tab value="main" active={currentTab === 'main'} onClick={handlerManualChoice}>
				Начинка
			</Tab>
			<Tab value="sauce" active={currentTab === 'sauce'} onClick={handlerManualChoice}>
				Соусы
			</Tab>
		</nav>
	)
}

export default TabsIngredients