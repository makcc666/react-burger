import React from 'react';
import {EItemType, IPropsStubItem} from "./stub-item.types";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./stub-item.module.scss";

const StubItem = ({type}: IPropsStubItem) => {
	switch (type) {
		default: {
			return (<></>);
		}
		case EItemType.BUN_TOP:
		case EItemType.BUN_BOTTOM: {
			return (
				<ConstructorElement
					type={type === EItemType.BUN_TOP ? "top" : "bottom"}
					isLocked={true}
					text="Выберите булку"
					thumbnail=""
					price={NaN}
					extraClass={styles.element}
				/>
			)
			break;
		}
		case EItemType.INGREDIENT:{
			return (
				<ConstructorElement
					isLocked={false}
					text="Выберите начинку"
					thumbnail=""
					price={NaN}
					extraClass={styles.element}
				/>
			)
			break;
		}
	}
};

export default StubItem;
