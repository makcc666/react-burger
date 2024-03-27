import React, {useCallback, useEffect, useMemo, useState} from 'react';
import ContentFormSlimBox from "@components/form-slim-box/content/content";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import useLockLoader from "@hooks/use-lock-loader/use-lock-loader.hook";
import {useDispatch, useSelector} from "react-redux";
import useInputObserver from "@hooks/use-input-observer/user-input-observer.hook";

import styles from "./view.module.scss";
import {doReqAuthLogin, doReqUserProfileUpdate} from "@utils/api-requests/user";
import {userActions} from "@store/user/user.slice";
import InfoBlock from "@components/info-block/info-block";

const ProfileView = () => {
	const dispatch = useDispatch();
	const {profile} = useSelector(state => state.user);
	
	const formLock = useLockLoader(false)
	
	const emailInputObserver = useInputObserver(profile.email);
	const nameInputObserver = useInputObserver(profile.name);
	const passwordInputObserver = useInputObserver("");
	
	
	useEffect(() => {
		emailInputObserver.updateInitValue(profile.email);
		nameInputObserver.updateInitValue(profile.name);
		passwordInputObserver.updateInitValue("");
	}, [profile]);
	
	const inputsRollBack = useCallback(() => {
			emailInputObserver.rollBack();
			nameInputObserver.rollBack();
			passwordInputObserver.rollBack();
		},
		[emailInputObserver, nameInputObserver, passwordInputObserver]
	)
	
	const isVisibleFormButtons = emailInputObserver.hasChanges || nameInputObserver.hasChanges || passwordInputObserver.hasChanges
	
	
	
	const handlerSubmit = async (event) => {
		event.preventDefault();
		const formData = Object.fromEntries(new FormData(event.target));
		
		if (!formLock.doTry(true)) return;
		try {
			formLock.clearMessage();
			const res = await doReqUserProfileUpdate(formData);
			dispatch(userActions.updateUser(res))
			formLock.clearMessage();
			
			passwordInputObserver.setValue("");
			
			formLock.unLock();
		} catch (e) {
			formLock.updateMessage(e);
			formLock.unLock();
		}
	}
	
	
	return (
			<form onSubmit={handlerSubmit}>
				<ContentFormSlimBox>
					<Input
						type={'text'}
						placeholder={'Имя'}
						onChange={nameInputObserver.handlerInputChange}
						icon={'EditIcon'}
						value={nameInputObserver.value}
						name={'name'}
						size={'default'}
						
						disabled={formLock.isLock}
					/>
					<Input
						type={'email'}
						placeholder={'Логин'}
						onChange={emailInputObserver.handlerInputChange}
						icon={'EditIcon'}
						value={emailInputObserver.value}
						name={'email'}
						size={'default'}
						
						disabled={formLock.isLock}
					/>
					<Input
						type={'password'}
						placeholder={'Пароль'}
						onChange={passwordInputObserver.handlerInputChange}
						icon={'EditIcon'}
						value={passwordInputObserver.value}
						name={'password'}
						size={'default'}
						
						disabled={formLock.isLock}
					/>
					
					{formLock.hasMessage && <InfoBlock type="error" title="Ошибка при сохранении данных" message={formLock.message}/>}
					
					{isVisibleFormButtons &&
						<div className={styles.buttonsContainer}>
							<Button
								onClick={inputsRollBack}
								htmlType="button" type="secondary" size="medium"
								disabled={formLock.isLock}
							>
								Отмена
							</Button>
							
							<Button
								htmlType="submit" type="primary" size="medium"
								disabled={formLock.isLock}
							>
								Сохранить
							</Button>
						</div>
					}
				</ContentFormSlimBox>
			</form>
	);
};

export default ProfileView;
