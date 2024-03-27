import React from 'react';
import {useSelector} from "react-redux";
import {Navigate, useLocation} from "react-router-dom";
import {authStageFlagsStore} from "@store/user/user.utils";

const ProtectedRouteElement = ({requirementAuthState = true, component}) => {
	const isAuth = useSelector(state => state.user.isAuth);
	
	const location = useLocation();
	
	if (requirementAuthState === false && isAuth === true) {
		const from = location.state?.from?.pathname ?? "/"
		return <Navigate to={from} replace={true}/>;
	}
	
	if (requirementAuthState === true && isAuth === false) {
		return <Navigate to="/login" state={{...location.state, from: location}} replace={true}/>
	}
	
	return (
		<>
			{component}
		</>
	);
};

export default ProtectedRouteElement;

export const ProtectedRouteForGuest = ({component,children}) => (
	<ProtectedRouteElement requirementAuthState={false} component={component || children}/>
)
export const ProtectedRouteForUser = ({component,children}) => (
	<ProtectedRouteElement requirementAuthState={true} component={component || children}/>
)

export const ProtectedRouteFlagBypass = ({type, flag, redirect = "/", component}) => {
	if (authStageFlagsStore.has(type, flag) === false) {
		return <Navigate to={redirect} />
	}
	
	return (
		<>
			{component}
		</>
	);
}