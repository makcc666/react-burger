import React from 'react';
import styles from "./app-main.module.scss";
import classNames from "classnames";
import BurgerIngredients from "../burger-Ingredients/burger-ingredients";
import {getRandomBurgerConstructor} from "../../utils/data";
import BurgerConstructor from "../burger-constructor/burger-constructor";

const AppMain = () => {
	return (
		<main className={styles.main}>
			<div className={classNames(styles.container, styles.assembler)}>
				<BurgerIngredients/>
				<BurgerConstructor/>
			</div>
		</main>
	);
};

export default AppMain;
