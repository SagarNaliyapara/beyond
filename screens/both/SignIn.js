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
const SignIn = (props) => {
    const navigation = useNavigation();
    // const [email, setEmail] = useState('club.akash@gmail.com');
    // const [password, setPassword] = useState("walk@123");
    const [email, setEmail] = useState('club.akash3248@gmail.com');
    const [password, setPassword] = useState("12345678");
    return (
        <ImageBackground source={require('../../assets/bg.png')} style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.buttonContainer}>
                    <HeaderSmall leftIcon="back" rightIcon="settings" noTitle />
                </View>
                <Text style={[styles.logo, props.locale == "ar" && { textAlign: 'right' }]}>BEYOND</Text>
                <TransText style={[styles.welcome, props.locale == "ar" && { textAlign: 'right' }]} transkey={"WELCOME_BACK"} />
            </View>


            {/* This is entire white body container */}
            <View style={styles.signinContainerWhite}>

                {/* This is email container */}

                <View style={[styles.emailcontainer, props.locale == "ar" && { justifyContent: 'flex-end' }]}>
                    {props.locale == "ar" && <TransText style={[styles.placeholder, {
                        paddingRight: 10,
                    }]} transkey="EMAIL_ADDRESS" />}
                    <MaterialCommunityIcons name="email-outline" size={20} color={'#CEB07C'} />
                    {props.locale == "en" && <TransText style={styles.placeholder} transkey="EMAIL_ADDRESS" />}
                </View>
                <View style={styles.inputfield}>
                    <TextInput KeyboardAvoidingView=""
                        maxLength={40}
                        keyboardType={"email-address"}
                        style={styles.textinputfield}
                        value={email}
                        onChangeText={(text) => setEmail(text)} />
                </View>

                {/* This is password container */}

                <View style={[styles.passwordContainer, props.locale == "ar" && { justifyContent: 'flex-end' }]}>
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

                {/* Buttons start here */}

                {/* empty view for height */}

                <View style={{ height: hp(3.5) }}></View>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        // navigation.navigate('Home');
                        let user = {
                            email: email,
                            password: password
                        };
                        props.dispatch(Actions.loginAttempt(user));
                    }}
                    disabled={!email || !password}
                    style={styles.loginBtn}>
                    {props.attempting ?
                        <ActivityIndicator size={theme.xxl} color={"#fff"} />
                        :
                        <TransText style={styles.btntext} transkey="LOGIN" />}
                </TouchableOpacity>


                {/* login as guest */}

                {/* empty view for height */}

                <View style={{ height: hp(1.5) }}></View>

                <TouchableOpacity onPress={() => navigation.navigate('main')} style={styles.guestbtn}>
                    <TransText style={styles.btntext} transkey="LOGIN_AS_GUEST" />
                </TouchableOpacity>

                {/* Forgot password text */}
                <TouchableOpacity
                    onPress={() => navigation.navigate("ForgotPassword")}
                    style={{ width: '100%', alignItems: 'center' }}>
                    <TransText style={styles.forgotpass} transkey="FORGOT_PASSWORD" />
                </TouchableOpacity>

                {/* <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={{ width: '100%', alignItems: 'center' }}>
                    <TransText style={styles.forgotpass} transkey="CLICK_TO_TEST" />
                </TouchableOpacity> */}
                {/* dont have account */}

                <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={styles.donthaveaccnt}>
                    {props.locale == "ar" && <TransText style={styles.signuptext} transkey="SIGN_UP" />}
                    <TransText style={{ fontFamily: theme.pop }} transkey="DONT_HAVE_AN_ACCOUNT" />
                    {props.locale == "en" && <TransText style={styles.signuptext} transkey="SIGN_UP" />}
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );

}

const mapStateToProps = state => ({
    locale: state.app.locale,
    attempting: state.auth.attempting
})

export default connect(mapStateToProps, null)(SignIn)

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
