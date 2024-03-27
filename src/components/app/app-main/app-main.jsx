import React from 'react';
import styles from "./app-main.module.scss";
import {Route, Routes, useLocation} from "react-router-dom";
import Home from "@pages/home/home";
import NotFound from "@pages/not-found/not-found";
import {IngredientDetailsFromLocation} from "@components/burger-Ingredients/ingredient-details/ingredient-details";
import ModalIngredientDetails from "@components/burger-Ingredients/modal-ingredient-details/modal-ingredient-details";
import AuthLogin from "@pages/login/login";
import {
	ProtectedRouteFlagBypass,
	ProtectedRouteForGuest,
	ProtectedRouteForUser
} from "@components/protected-route-element/protected-route-element";
import AuthRegister from "@pages/register/register";
import AuthForgotPassword from "@pages/forgot-password/forgot-password";
import AuthResetPassword from "@pages/reset-password/reset-password";
import ProfileView from "@pages/profile/view/view";
import Profile from "@pages/profile/profile";
import ProfileOrders from "@pages/profile/orders/orders";

const AppMain = () => {
	const location = useLocation();
	return (
		<main className={styles.main}>
			<Routes location={location.state?.backgroundLocation || location}>
				<Route path="/" Component={Home}/>
				<Route path="/ingredient/:id" Component={IngredientDetailsFromLocation}/>
				
				<Route path="/login" element={<ProtectedRouteForGuest component={<AuthLogin/>}/>}/>
				<Route path="/register" element={<ProtectedRouteForGuest component={<AuthRegister/>}/>}/>
				<Route path="/forgot-password" element={<ProtectedRouteForGuest component={<AuthForgotPassword/>}/>}/>
				<Route path="/reset-password" element={
					<ProtectedRouteForGuest>
						<ProtectedRouteFlagBypass type="logout" flag="reset-password" redirect="/login">
							<AuthResetPassword/>
						</ProtectedRouteFlagBypass>
					</ProtectedRouteForGuest>
				}/>
				
				<Route path="/profile/*" element={<ProtectedRouteForUser component={<Profile/>}/>}>
					<Route index Component={ProfileView}/>
					<Route path="orders" Component={NotFound}/>
					<Route path="*" Component={NotFound}/>
				</Route>
				
				<Route path="*" Component={NotFound}/>
			</Routes>
			
			{location.state?.backgroundLocation && (
				<Routes>
					<Route path="/ingredient/:id" Component={ModalIngredientDetails}/>
				</Routes>
			)}
		
		</main>
	);
};

export default AppMain;
