import React, {useCallback, useMemo} from 'react';
import styles from "./item.module.scss";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {IPropsItem} from "./item.types";
import {useDispatch, useSelector} from "react-redux";

import {useDrag} from "react-dnd";
import classNames from "classnames";
import {DRAG_AND_DROP_TYPE} from "../../burger-constructor/burger-constructor.types";
import {Link, useLocation, useNavigate} from "react-router-dom";


const Item = ({ingredient}: IPropsItem) => {
	const location = useLocation();

	// @ts-ignore
	const count = useSelector(store => store.burgerConstructor.itemsCountList[ingredient._id]);

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

	const compiledClassName = useMemo(() => {
		return classNames(
			styles.container,
			{
				[styles.dragged]: isDragging
			}
		)
	}, [isDragging])

	return (
		<Link
			to={`/ingredient/${ingredient._id}`}
			state={{...location?.state, backgroundLocation: location}}
			className={compiledClassName}
			ref={dragRef}
		>
			{count > 0 && <Counter count={count} size="default" extraClass="m-1"/>}

			<img className={styles.image} src={ingredient.image} alt={ingredient.name}/>
			<div className={styles.price}>
				<span>{ingredient.price}</span>
				<CurrencyIcon type="primary"/>
			</div>
			<p className={styles.title}>{ingredient.name}</p>
		</Link>
	);
};

export default Item;
