import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import theme from '../../Theme'
import {Feather} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';

const Footer = (props)=> {
    const navigation = useNavigation();
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={()=>navigation.navigate('Home')} hitSlop={{top:15,left:15,right:15,bottom:15}}>
                    <Feather name="home" size={24} color={theme.primary} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate('Notification')} hitSlop={{top:15,left:15,right:15,bottom:15}}>
                    <Feather name="bell" size={24} color={theme.primary} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate('SecretaryProfile')} hitSlop={{top:15,left:15,right:15,bottom:15}}>
                    <Feather name="user" size={24} color={theme.primary} />
                </TouchableOpacity>
                <TouchableOpacity hitSlop={{top:15,left:15,right:15,bottom:15}}>
                    <Feather name="message-circle" size={24} color={theme.primary} />
                </TouchableOpacity>
            </View>
        );
}
export default Footer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff',
        // elevation:20,
        // borderTopWidth:0.5,
        // borderTopColor:'#e5e5e5',
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-around'
    }
});