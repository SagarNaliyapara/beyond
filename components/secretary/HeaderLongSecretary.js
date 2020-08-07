
//header long means with 3 icons and 1 title

import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform
} from "react-native";
import theme from '../../Theme'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { drawer } from "../../MainAppNavigation";


const onPressLeftIcon = (iconName, navigation) => {
    switch (iconName) {
        case "back":
            navigation.pop();
            break;
        case "menu":
            drawer.current.open();
            break;
        default:
            break;
    }

}

const HeaderLongSecretary = () => {

    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => onPressLeftIcon("menu", navigation)} ><Feather name="menu" size={24} color={theme.titleColor} /></TouchableOpacity>
            <Text style={styles.title}>Beyond</Text>
            <TouchableOpacity><Feather name="bell" size={24} color={theme.titleColor} /></TouchableOpacity>
            <TouchableOpacity><Feather name="message-circle" size={24} color={theme.titleColor} /></TouchableOpacity>
        </View>
    );
}
export default HeaderLongSecretary;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    title: {
        fontSize: Platform.OS === 'ios' ? theme.xxxl * 1.3 : theme.xxxl,
        fontFamily: theme.copper,
        color: theme.titleColor
    }
});