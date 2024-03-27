import React, {useCallback} from 'react';
import ProfileContainer from "@components/profile/container/container";
import {ButtonMenu, HelpBlock, LinkMenu} from "@components/profile/left-menu/left-menu";
import {userSlice} from "@store/user/user.slice";
import {useDispatch} from "react-redux";
import {authFinisherHandler} from "@store/user/user.utils";
import {doReqAuthLogout} from "@utils/api-requests/user";

const Profile = () => {
	const dispatch = useDispatch();
	const logoutClickHandler = useCallback(
		async event => {
			console.log("logoutClickHandler::event::", event);
			await doReqAuthLogout();
			dispatch(userSlice.actions.clearUser());
		},
		[],
	);
	
	return (
		<ProfileContainer>
			<LinkMenu end={true} to=".">Профиль</LinkMenu>
			<LinkMenu to="orders">История заказов</LinkMenu>
			<ButtonMenu clickHandler={logoutClickHandler}>Выход</ButtonMenu>
			<HelpBlock>В этом разделе вы можете изменить свои персональные данные</HelpBlock>
		</ProfileContainer>
	);
};

export default Profile;
