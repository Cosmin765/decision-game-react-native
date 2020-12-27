import { StackActions } from '@react-navigation/native';

export const goTo = (navigation, name) => navigation.navigate(name);
export const replace = (navigation, name) => navigation.dispatch(StackActions.replace(name));
export const push = (navigation, name) => navigation.push(StackActions.push(name));
export const popAction = (navigation, count) => navigation.dispatch(StackActions.pop(count));
export const popToTop = navigation => navigation.dispatch(StackActions.popToTop());