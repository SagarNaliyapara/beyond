
//HeaderSmall means with 2 icons and 1 title

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

const HeaderSmallSecretary = (props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity><Feather name={props.leftIcon} size={25} color={theme.titleColor} /></TouchableOpacity>
            <Text style={styles.title}>Beyond</Text>
            <TouchableOpacity>
                <Image source={require('../../assets/languageicon.png')} style={{ height: 25, width: 25 }} />
            </TouchableOpacity>

        </View>
    );
}
export default HeaderSmallSecretary;

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