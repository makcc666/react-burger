import React from 'react';
import styles from "./app-main.module.scss";
import classNames from "classnames";
import BurgerIngredients from "../../burger-Ingredients/burger-ingredients";
import BurgerConstructor from "../../burger-constructor/burger-constructor";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

const AppMain = () => {
	return (
		<main className={styles.main}>
			<div className={classNames(styles.container, styles.assembler)}>
				<DndProvider backend={HTML5Backend}>
					<BurgerIngredients/>
					<BurgerConstructor/>
				</DndProvider>
			</div>
		</main>
	);
};

export default AppMain;
