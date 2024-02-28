import React, {useEffect, useState} from 'react';
import classNames from "classnames";
import styles from "./burger-ingredients.module.scss";
import TabsIngredients from "./tabs/tabs";
import GroupIngredients from "./group/group";
import {getGroupedItems} from "../../utils/data";
import Modal from "../modal/modal";
import IngredientDetails from "./ingredient-details/ingredient-details";


const BurgerIngredients = () => {
	// console.log(groupedIngredients)
	const [selectedDetailsIngredient, setSelectedDetailsIngredient] = useState(null);
	
	const handlerChoseIngredient = (ingredient) => setSelectedDetailsIngredient({...ingredient});
	const handlerCloseModal = () => {
		setSelectedDetailsIngredient(null)
	};
	
	const [groupedIngredients, setGroupedIngredients] = useState([]);
	
	useEffect(() => {
		
		const _fetchData = async () => {
			try {
				const res = await fetch("https://norma.nomoreparties.space/api/ingredients");
				if (!res.ok) throw new Error("Не удалось получить данные от сервера");
				const resJson = await res.json();
				// console.log("resJson::", resJson);
				if (resJson.success !== true) throw new Error(resJson.data || resJson.error || "Невалидные данный от сервера");
				const items = resJson.data;
				if (items.length === 0) throw new Error("Список ингредиентов пуст");
				setGroupedIngredients(
					[...getGroupedItems(items).values()]
				);
			} catch (e) {
				alert(`Ошибка загрузки ингредиентов: ${e.toString()}`)
				throw e;
			}
		};
		
		_fetchData();
	}, []);
	
	return (
		<>
			{selectedDetailsIngredient &&
				<Modal onClose={handlerCloseModal} title="Детали ингредиента">
					<IngredientDetails ingredient={selectedDetailsIngredient}/>
				</Modal>
			}
			
			<section className={classNames(styles.burgerIngredients)}>
				<h2 className={styles.title}>Соберите бургер</h2>
				<TabsIngredients/>
				<ul className={styles.ingredientsList}>
					{groupedIngredients.map(record => (
						<li key={record.title}>
							<GroupIngredients title={record.title} list={record.list}
								handlerChoseIngredient={handlerChoseIngredient}/>
						</li>
					))}
				
				</ul>
			</section>
		</>
	
	);
};

export default BurgerIngredients;
