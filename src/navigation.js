import { StackActions } from '@react-navigation/native';

export const goTo = (navigation, name, data = {}) => navigation.navigate(name, data);
export const replace = (navigation, name, data = {}) => navigation.dispatch(StackActions.replace(name, data));
export const push = (navigation, name, data = {}) => navigation.dispatch(StackActions.push(name, data));
export const pop = (navigation, count = 1) => navigation.dispatch(StackActions.pop(count));
export const popToTop = navigation => navigation.dispatch(StackActions.popToTop());