import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground
} from "react-native";
import theme from '../../Theme'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';
import TransText from "../../components/both/transtext"

//functional component

const Splash = () => {
    const navigation = useNavigation();
    return (
        <ImageBackground source={require('../../assets/splashbg.png')} style={styles.container}>
            <View style={{ flex: 2 }} />

            <View style={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'center' }}>
                <TransText style={styles.paragraph} transkey={"SPLASH_SLOGAN"} />
                <TouchableOpacity onPress={() => navigation.navigate('SignIn')} style={styles.mainBtn}>
                    <TransText style={styles.btntext} transkey={"GET_STARTED"} />
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}
export default Splash;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    paragraph: {
        fontFamily: theme.pop,
        fontSize: theme.medium,
        color: '#fff',
        textAlign: 'center',
        paddingLeft: 30,
        paddingRight: 30
    },
    mainBtn: {
        backgroundColor: theme.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        width: wp('90%'),
        height: hp(7.5),
        borderRadius: 5
    },
    btntext: {
        fontSize: theme.medium,
        color: '#fff',
        fontFamily: theme.pop
    },
});