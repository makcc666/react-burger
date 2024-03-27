import React, {useCallback, useState} from 'react';
import styles from "./burger-constructor.module.scss";
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "./order-details/order-details";
import {useDispatch, useSelector} from "react-redux";
import StubItem from "./stub-item/stub-item";
import ScrolledIngredient from "./scrolled-ingredient/scrolled-ingredient";
import {useDrop} from "react-dnd";
import {burgerConstructorSlice} from "../../service/store/burger-constructor/burger-constructor.slice";
import {getClearIngredientsList} from "../../service/store/burger-constructor/burger-constructor.utils";
import {sendOrder} from "../../service/store/burger-offer-order/burger-offer-order.utils";
import ModalOfferOrder from "./modal-offer-order/modal-offer-order";
import {DRAG_AND_DROP_TYPE} from "./burger-constructor.types";
import store from "../../service/store";
import {Navigate} from "react-router-dom";
import {ProtectedRouteForUser} from "@components/protected-route-element/protected-route-element";
import {burgerOfferOrderSlice} from "@store/burger-offer-order/burger-offer-order.slice";


const BurgerConstructor = () => {
	const dispatch = useDispatch();
	const isAuth = useSelector(state => state.user.isAuth);
	const {isBlocked: modalIsBlocked, isDisplay: modalIsDisplay} = useSelector(store => store.offerOrder)
	const burgerConstructorStoreData = useSelector(store => store.burgerConstructor);
	const [pathForceRedirectToAuth, setForcedRedirectToAuth] = useState(null);
	
	const addIngredient = useCallback(
		({ingredient}) => {
			dispatch(burgerConstructorSlice.actions.addIngredient(ingredient));
			dispatch(burgerConstructorSlice.actions.calculateStats());
		},
		[dispatch,]
	);
	
	const [, drop] = useDrop(
		() => ({
			accept: DRAG_AND_DROP_TYPE,
			drop(_item) {
				addIngredient(_item)
			},
			collect: (monitor) => ({})
		}),
		[addIngredient],
	)
	
	
	const requestCreateOffer = async () => {
		if (!isAuth) {
			return setForcedRedirectToAuth(true);
		}
		
		const res = await dispatch(
			sendOrder(
				getClearIngredientsList(
					store.getState().burgerConstructor
				).map(ingredient => ingredient._id)
			)
		)
		if (res?.error) {
			dispatch(burgerConstructorSlice.actions.resetStore());
		}
		console.log("requestCreateOffer::ok", res)
	}
	
	const handlerCloseModal = useCallback(
		(orderNumber) => {
			setForcedRedirectToAuth(`/profile/orders/${orderNumber}`);
			dispatch(burgerOfferOrderSlice.actions.closeModal());
		},
		[setForcedRedirectToAuth],
	);
	
	
	switch (pathForceRedirectToAuth) {
		case null: {
			break
		}
		case true: {
			return (
				<ProtectedRouteForUser/>
			);
		}
		default: {
			return (
				<Navigate to={pathForceRedirectToAuth}/>
			)
			break;
		}
	}
	
	return (
		<>
			{modalIsDisplay && <ModalOfferOrder onClose={handlerCloseModal}/>}
			
			<section className={styles.burgerConstructor}>
				<ul ref={drop} className={styles.totalIngredients}>
					<li className={styles.lockedItem} key={"stubBunTop"}>
						{burgerConstructorStoreData.bun
							? <ConstructorElement
								type="top"
								isLocked={true}
								text={burgerConstructorStoreData.bun.name + " (верх)"}
								thumbnail={burgerConstructorStoreData.bun.image}
								price={burgerConstructorStoreData.bun.price}
							/>
							: <StubItem type="bunTop"/>
						}
					</li>
					<li className={styles.scrolledIngredients} key={"scrolled"}>
						<ul className={styles.content}>
							{burgerConstructorStoreData.ingredients.length > 0
								? burgerConstructorStoreData.ingredients.map((item, index) => (
									<li key={item.uid} className={styles.unlockedItem}>
										<ScrolledIngredient ingredient={item} itemIndex={index}/>
									</li>
								))
								: <li key="stubIngredient" className={styles.stubIngredient}>
									<StubItem type="ingredient"/>
								</li>
							}
						</ul>
					
					</li>
					<li className={styles.lockedItem} key={"stubBunBottom"}>
						{burgerConstructorStoreData.bun
							? <ConstructorElement
								type="bottom"
								isLocked={true}
								text={burgerConstructorStoreData.bun.name + " (низ)"}
								thumbnail={burgerConstructorStoreData.bun.image}
								price={burgerConstructorStoreData.bun.price}
							/>
							: <StubItem type="bunBottom"/>
						}
					</li>
				</ul>
				<div className={styles.orderContainer}>
					<div className={styles.orderContent}>
						<div className={styles.priceContainer}>
							<p className={styles.priceAmount}>{burgerConstructorStoreData.stats.totalPrice}</p>
							<CurrencyIcon type="primary"/>
						</div>
						<Button
							htmlType="button" type="primary" size="medium" onClick={requestCreateOffer}
							disabled={!burgerConstructorStoreData.stats.isFulfilled || modalIsBlocked}
						>
							Оформить заказ
						</Button>
					</div>
				</div>
			</section>
		</>
	);
};

export default BurgerConstructor;
