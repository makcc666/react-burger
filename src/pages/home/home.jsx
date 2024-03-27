import React, {useEffect} from 'react';
import classNames from "classnames";
import styles from "@components/app/app-main/app-main.module.scss";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import BurgerIngredients from "@components/burger-Ingredients/burger-ingredients";
import BurgerConstructor from "@components/burger-constructor/burger-constructor";

const Home = () => {
	return (
		<div className={classNames(styles.container, styles.assembler)}>
			<DndProvider backend={HTML5Backend}>
				<BurgerIngredients/>
				<BurgerConstructor/>
			</DndProvider>
		</div>
	);
};

export default Home;
