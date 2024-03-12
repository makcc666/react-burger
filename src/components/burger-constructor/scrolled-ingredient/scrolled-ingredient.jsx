import React, {useRef, useState} from 'react';
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch} from "react-redux";
import {burgerConstructorSlice} from "../../../service/store/burger-constructor/burger-constructor.slice";
import {useDrag, useDrop} from "react-dnd";
import {DROP_TYPE} from "./scrolled-ingredient.types";
import classNames from "classnames";
import styles from "./scrolled-ingredient.module.scss";

const ScrolledIngredient = ({ingredient, itemIndex}) => {
	const dispatch = useDispatch()
	
	const deleteItem = () => {
		dispatch(burgerConstructorSlice.actions.deleteIngredient(ingredient));
		dispatch(burgerConstructorSlice.actions.calculateStats());
	};
	const moveItem = (from, to) => {
		dispatch(burgerConstructorSlice.actions.swapIngredientPosition(from, to))
	}
	
	const ref = useRef(null)
	const [{handlerId}, drop] = useDrop({
		accept: DROP_TYPE,
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
			}
		},
		hover(item, monitor) {
			if (!ref.current) {
				return
			}
			
			const dragIndex = item.itemCurrentIndex
			const hoverIndex = itemIndex
			// Don't replace items with themselves
			if (dragIndex === hoverIndex) {
				return
			}
			// Determine rectangle on screen
			const hoverBoundingRect = ref.current?.getBoundingClientRect()
			// Get vertical middle
			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
			// Determine mouse position
			const clientOffset = monitor.getClientOffset()
			// Get pixels to the top
			const hoverClientY = clientOffset.y - hoverBoundingRect.top
			// Only perform the move when the mouse has crossed half of the items height
			// When dragging downwards, only move when the cursor is below 50%
			// When dragging upwards, only move when the cursor is above 50%
			// Dragging downwards
			
			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return
			}
			// Dragging upwards
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return
			}
			moveItem(dragIndex, hoverIndex)
			
			// Time to actually perform the action
			// Note: we're mutating the monitor item here!
			// Generally it's better to avoid mutations,
			// but it's good here for the sake of performance
			// to avoid expensive index searches.
			item.itemCurrentIndex = hoverIndex
		},
	})
	const [{isDragging}, drag, ] = useDrag({
		type: DROP_TYPE,
		item: () => {
			return {itemCurrentIndex: itemIndex}
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});
	drag(drop(ref))
	
	return (
		<div
			ref={ref}
			data-handler-id={handlerId}
			className={classNames(
				{
					[styles.dragged]: isDragging
				}
			)}
		>
			<DragIcon type="primary"/>
			<ConstructorElement
				text={ingredient.name}
				thumbnail={ingredient.image}
				price={ingredient.price}
				handleClose={deleteItem}
			/>
		</div>
	);
};

export default ScrolledIngredient;
