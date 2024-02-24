import React, {useEffect, useState} from 'react';
import {getRandomBurgerConstructor} from "../../utils/data";
import styles from "./burger-constructor.module.scss";
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Popup from "../popup/popup";
import OrderPopup from "./order-popup/order-popup";

const randomBurgerConstructor = getRandomBurgerConstructor(12);


const groupedRandomBurgerConstructor = randomBurgerConstructor.reduce((res, item) => {
	res[item.type === "bun" ? "bun" : "another"].push(item);
	return res;
}, {
	bun: [],
	another: []
})

const totalPrice = randomBurgerConstructor.reduce((sum, item) => sum + item.price, 0)

const BurgerConstructor = () => {
	const popupControls = {
		open: null,
		close: null,
	}
	const handlerPopupController = ({close, open}) => {
		popupControls.open = open;
		popupControls.close = close;
	}
	const handlerCreateOrder = () => {
		if (typeof popupControls.open !== "function") return;
		popupControls.open();
	}
	
	return (
		<>
			<OrderPopup className={styles.popupTest} switchController={handlerPopupController}/>
			
			<section className={styles.burgerConstructor}>
				<ul className={styles.totalIngredients}>
					<li className={styles.lockedItem} key={groupedRandomBurgerConstructor.bun[0]._id + "_top"}>
						<ConstructorElement
							type="top"
							isLocked={true}
							text={groupedRandomBurgerConstructor.bun[0].name + " (верх)"}
							thumbnail={groupedRandomBurgerConstructor.bun[0].image}
							price={groupedRandomBurgerConstructor.bun[0].price}
						/>
					</li>
					<li className={styles.scrolledIngredients} key={"scrolled"}>
						<ul className={styles.content}>
							{groupedRandomBurgerConstructor.another.map(item => (
								<li key={item._id} className={styles.unlockedItem}>
									<DragIcon type="primary"/>
									<ConstructorElement
										text={item.name}
										thumbnail={item.image}
										price={item.price}
									/>
								</li>
							))}
						</ul>
					
					</li>
					<li className={styles.lockedItem} key={groupedRandomBurgerConstructor.bun[0]._id + "_bottom"}>
						<ConstructorElement
							type="bottom"
							isLocked={true}
							text={groupedRandomBurgerConstructor.bun[0].name + " (низ)"}
							thumbnail={groupedRandomBurgerConstructor.bun[0].image}
							price={groupedRandomBurgerConstructor.bun[0].price}
						/>
					</li>
				</ul>
				<div className={styles.orderContainer}>
					<div className={styles.orderContent}>
						<div className={styles.priceContainer}>
							<p className={styles.priceAmount}>{totalPrice}</p>
							<CurrencyIcon type="primary"/>
						</div>
						<Button htmlType="button" type="primary" size="medium" onClick={handlerCreateOrder}>Оформить заказ</Button>
					</div>
				</div>
			</section>
		</>
	);
};

export default BurgerConstructor;
