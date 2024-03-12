import React, {memo, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import classNames from "classnames";
import styles from "./burger-ingredients.module.scss";
import TabsIngredients from "./tabs/tabs";
import GroupIngredients from "./group/group";
import {getGroupedItems} from "../../utils/data";
import Modal from "../modal/modal";
import IngredientDetails from "./ingredient-details/ingredient-details";
import {useDispatch, useSelector} from "react-redux";
import InfoBlock from "../info-block/info-block";
import {ingredientDetailsModalSlice} from "../../service/store/ingredient-details/ingredient-details-modal.slice";
import {ingredientsLoad} from "../../service/store/burger-ingredients/burger-ingredients.utils";
import {useInView} from "react-intersection-observer";
import {burgerIngredientsSlice} from "../../service/store/burger-ingredients/burger-ingredients.slice";

const BurgerIngredients = () => {
	const dispatch = useDispatch()
	const ingredientsStoreData = useSelector(store => store.ingredients);
	const detailsIngredientStoreData = useSelector(store => store.detailsIngredientModal);
	
	useEffect(() => {
		dispatch(ingredientsLoad());
	}, []);
	
	const [bunRef, inViewBun] = useInView({threshold: 0.3, initialInView: true});
	const [mainRef, inViewMain] = useInView({threshold: 0.3,});
	const [sauceRef, inViewSauce] = useInView({threshold: 0.3,});
	
	useEffect(() => {
		let newTabType = "bun";
		if (inViewSauce) newTabType = "sauce";
		else if (inViewBun) newTabType = "bun"
		else if (inViewMain) newTabType = "main";
		dispatch(burgerIngredientsSlice.actions.setCurrentTab(newTabType))
	}, [dispatch, inViewBun, inViewMain, inViewSauce]);
	
	
	const nativeBunRef = useRef(null);
	const nativeMainRef = useRef(null);
	const nativeSauceRef = useRef(null);
	
	const nativeListOfTabsRef = useMemo(
		() => {
			bunRef(nativeBunRef.current);
			mainRef(nativeMainRef.current);
			sauceRef(nativeSauceRef.current);
			
			return {bun: nativeBunRef, main: nativeMainRef, sauce: nativeSauceRef};
		},
		[nativeBunRef.current, nativeMainRef.current, nativeSauceRef.current]
	);
	/*
	useEffect(() => {
		console.log("newTabType useEff::0")
		
		let newTabType;
		if (inViewBun) newTabType = "bun";
		else if (inViewMain) newTabType = "main";
		else if (inViewSauce) newTabType = "sauce";
		
		dispatch(burgerIngredientsSlice.actions.setCurrentTab(newTabType))
	}, [inViewBun, inViewMain, inViewSauce,dispatch]);
	*/
	const handlerTabManualChoice = useCallback(
		(type) => {
			nativeListOfTabsRef[type].current.scrollIntoView({inline: "start", behavior: "smooth"});
		},
		[nativeListOfTabsRef],
	);
	
	const groupedIngredients = useMemo(() => {
		return [...getGroupedItems(ingredientsStoreData.list).values()]
	}, [ingredientsStoreData.list]);
	
	const handlerCloseModal = useCallback(
		() => dispatch(ingredientDetailsModalSlice.actions.clearActive()),
		[dispatch]
	)
	
	
	// Показываем заглушку во время загрузки данных с сервера или в случае ошибки получения данных
	switch (ingredientsStoreData.status) {
		
		case "pending": {
			return <InfoBlock
				message="Загружаем по квантовозапутанным каналам список ингредиентов"
				title={"Нужно немного подождать"}
			/>
		}
		case "error": {
			return <InfoBlock
				message={ingredientsStoreData.error}
				title={"Возникла ошибка"}
			/>
		}
		
		case "initiation": {
			return <InfoBlock
				message="Попробуйте перезагрузить страницу"
				title={"Возникла ошибка"}
			/>
		}
		
		default: {
			break;
		}
	}
	
	
	return (
		<>
			{detailsIngredientStoreData.isActive &&
				<Modal onClose={handlerCloseModal} title="Детали ингредиента">
					<IngredientDetails ingredient={detailsIngredientStoreData.item}/>
				</Modal>
			}
			
			<section className={classNames(styles.burgerIngredients)}>
				<h2 className={styles.title}>Соберите бургер</h2>
				<TabsIngredients handlerManualChoice={handlerTabManualChoice}/>
				<ul className={styles.ingredientsList}>
					{groupedIngredients.map(group => (
							<li key={group.type} ref={nativeListOfTabsRef[group.type]}>
								<GroupIngredients title={group.title} list={group.list} type={group.type}/>
							</li>
						)
					)}
				
				</ul>
			</section>
		</>
	
	);
};

export default BurgerIngredients;
