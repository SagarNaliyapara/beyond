import { NavigationActions } from '@react-navigation/compat';
const config = {};
export function setNavigator(nav) {
	if (nav) {
		config.navigator = nav;
	}
}
export function navigate(routeName, params) {
	// console.log(config.navigator.getRootState())
	if (config.navigator && routeName) {
		// let action = NavigationActions.navigate({ routeName: routeName, params });
		// config.navigator.dispatch(action);
		config.navigator.navigate(routeName)
	}
}
export function goBack() {
	if (config.navigator) {
		let action = NavigationActions.back({});
		config.navigator.dispatch(action);
	}
}
