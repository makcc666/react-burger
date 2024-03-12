import React, {useCallback, useMemo} from 'react';
import styles from "./item.module.scss";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {IPropsItem} from "./item.types";
import {useDispatch, useSelector} from "react-redux";
import {ingredientDetailsModalSlice} from "../../../service/store/ingredient-details/ingredient-details-modal.slice";

import {useDrag} from "react-dnd";
import classNames from "classnames";
import {getCountOfIngredient} from "../../../service/store/burger-constructor/burger-constructor.utils";
import {DRAG_AND_DROP_TYPE} from "../../burger-constructor/burger-constructor.types";


const Item = ({ingredient}: IPropsItem) => {
	const dispatch = useDispatch();

	// Как оптимизировать, избавившись от ререндеринга при изменении числа других ингредиентов?
	// @ts-ignore
	const itemsCountList = useSelector(store => store.burgerConstructor.itemsCountList);

	const [{isDragging}, dragRef] = useDrag(
		() => ({
			type: DRAG_AND_DROP_TYPE,
			item: {ingredient},
			collect: (monitor) => ({
				isDragging: monitor.isDragging()
			})
		}),
		[]
	)
	// console.log("dnd::",{opacity})

	// Проба оптимизации
	const setActiveDetailsIngredient = useCallback(
		() => {
			dispatch(ingredientDetailsModalSlice.actions.setActive(ingredient));
		},
		[dispatch]
	);

	const count = useMemo(
		() => getCountOfIngredient(ingredient._id, itemsCountList),
		[itemsCountList]
	);

	const compiledClassName = useMemo(() => {
		return classNames(
			styles.container,
			{
				[styles.dragged]: isDragging
			}
		)
	}, [isDragging])

	return (
		<article
			className={compiledClassName}
			onClick={setActiveDetailsIngredient}
			ref={dragRef}
		>
			{count > 0 && <Counter count={count} size="default" extraClass="m-1"/>}

			<img className={styles.image} src={ingredient.image} alt={ingredient.name}/>
			<div className={styles.price}>
				<span>{ingredient.price}</span>
				<CurrencyIcon type="primary"/>
			</div>
			<p className={styles.title}>{ingredient.name}</p>
		</article>
	);
};

export default Item;
