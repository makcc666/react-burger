import React from 'react';
import styles from "./container.module.scss";
import classNames from "classnames";
import {Outlet} from "react-router-dom";
import LeftMenu from "@components/profile/left-menu/left-menu";

const ProfileContainer = ({children}) => {
	return (
		<div className={styles.container}>
			<LeftMenu>
				{children}
			</LeftMenu>
			<div className={classNames(styles.content)}>
				<Outlet/>
			</div>
		</div>
	);
};

export default ProfileContainer;
