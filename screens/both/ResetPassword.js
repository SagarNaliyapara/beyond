import React, { Component, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    StatusBar,
    TouchableOpacity,
    TextInput,
    Image,
    Platform,
    ActivityIndicator
} from "react-native";
import theme from '../../Theme'
import HeaderSmall from '../../components/both/HeaderSmall'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux'
import TransText from "../../components/both/transtext";
import Actions from "../../actions/creator"
import lang from "../../config/lang/index"
const { getText } = lang
const ResetPassword = (props) => {
    const navigation = useNavigation();
    const [password, setPassword] = useState("walk@123");
    const [c_password, setC_Password] = useState("walk@123");
    return (
        <ImageBackground source={require('../../assets/bg.png')} style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.buttonContainer}>
                    <HeaderSmall leftIcon="back" rightIcon="settings" noTitle />
                </View>
                <Text style={[styles.logo, props.locale == "ar" && { textAlign: 'right' }]}>BEYOND</Text>
                <TransText style={[styles.welcome, props.locale == "ar" && { textAlign: 'right' }]} transkey={"RESET_PASSWORD"} />
            </View>


            {/* This is entire white body container */}
            <View style={styles.signinContainerWhite}>

                {/* This is email container */}

                <View style={[styles.emailcontainer, props.locale == "ar" && { justifyContent: 'flex-end' }]}>
                    {props.locale == "ar" && <TransText style={[styles.placeholder, {
                        paddingRight: 10,
                    }]} transkey="PASSWORD" />}
                    <MaterialCommunityIcons name="lock-outline" size={20} color={'#CEB07C'} />
                    {props.locale == "en" && <TransText style={styles.placeholder} transkey="PASSWORD" />}
                </View>
                <View style={styles.inputfield}>
                    <TextInput
                        secureTextEntry={true}
                        maxLength={40}
                        style={styles.textinputstyle}
                        value={password}
                        onChangeText={(text) => setPassword(text)} />
                </View>

                {/* This is password container */}

                <View style={[styles.passwordContainer, props.locale == "ar" && { justifyContent: 'flex-end' }]}>
                    {props.locale == "ar" && <TransText style={[styles.placeholder, {
                        paddingRight: 10,
                    }]} transkey="CONFIRM_PASSWORD" />}
                    <MaterialCommunityIcons name="lock-outline" size={20} color={'#CEB07C'} />
                    {props.locale == "en" && <TransText style={styles.placeholder} transkey="CONFIRM_PASSWORD" />}
                </View>
                <View style={styles.inputfield}>
                    <TextInput
                        secureTextEntry={true}
                        maxLength={40}
                        style={styles.textinputstyle}
                        value={c_password}
                        onChangeText={(text) => setC_Password(text)} />
                </View>

                {/* Buttons start here */}

                {/* empty view for height */}

                <View style={{ height: hp(3.5) }}></View>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        // navigation.navigate('Home');
                        console.log("---------------", props.email, props.token)
                        let data = {
                            email: props.email,
                            token: props.token,
                            password: password,
                            password_confirmation: password
                        };
                        if (password == c_password)
                            props.dispatch(Actions.resetPasswordAttempt(data));
                        else
                            props.dispatch(Actions.setNotification("danger", getText("CONFIRM_PASSWORD_NOT_MATCH", props.locale)))
                    }}
                    disabled={!c_password || !password}
                    style={styles.loginBtn}>
                    {props.attempting ?
                        <ActivityIndicator size={theme.xxl} color={"#fff"} />
                        :
                        <TransText style={styles.btntext} transkey="CONFIRM" />}
                </TouchableOpacity>


            </View>
        </ImageBackground>
    );

}

const mapStateToProps = state => ({
    locale: state.app.locale,
    attempting: state.auth.attempting,
    email: state.auth.email,
    token: state.auth.passwordToken
})

export default connect(mapStateToProps, null)(ResetPassword)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 24 : 0
    },
    headerContainer: {
        flex: 1,

    },
    signinContainerWhite: {
        backgroundColor: '#fff',
        flex: 2,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingHorizontal: 35
    },
    buttonContainer: {
        width: '100%',
        height: '24%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    logo: {
        paddingLeft: '8%',
        paddingHorizontal: '8%',
        color: '#fff',
        fontSize: theme.xl,
        paddingTop: '9%',
        fontFamily: theme.copper
    },
    welcome: {
        paddingLeft: '8%',
        paddingHorizontal: '8%',
        color: '#fff',
        fontSize: theme.xxl,
        fontFamily: theme.pop
    },
    emailcontainer: { flexDirection: 'row', paddingTop: hp(3), paddingBottom: hp(1) },
    passwordContainer: { flexDirection: 'row', paddingTop: hp(1), paddingBottom: hp(1) },
    placeholder: {
        color: theme.primary,
        paddingLeft: 10,
        fontFamily: theme.pop
    },
    inputfield: {
        backgroundColor: '#F3F3F3',
        width: '100%',
        height: hp(6.5),
        borderRadius: 5,
        paddingLeft: 10,
        justifyContent: 'center'
    },
    textinputstyle: {
        width: '100%',
        height: '100%',
        fontSize: theme.large
    },
    loginBtn: {
        backgroundColor: theme.primary,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: hp(7.5),
        borderRadius: 5
    },
    btntext: {
        fontSize: theme.medium,
        color: '#fff',
        fontFamily: theme.pop
    },
    guestbtn: {
        backgroundColor: theme.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: hp(7.5),
        borderRadius: 5
    },
    forgotpass: {
        paddingTop: hp(2),
        fontFamily: theme.pop
    },
    donthaveaccnt: { width: '100%', justifyContent: 'center', flexDirection: 'row', paddingTop: hp(2) },
    signuptext: {
        color: theme.primary,
        textDecorationLine: 'underline',
        paddingLeft: 5,
        paddingRight: 5,
        fontFamily: theme.pop
    }
});