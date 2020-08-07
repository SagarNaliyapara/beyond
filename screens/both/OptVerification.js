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
import helpers from "../../components/styles/helpers";
import lang from "../../config/lang/index"
import { prop } from "ramda";
const { locales, getText } = lang
const OptVerification = (props) => {
    const navigation = useNavigation();
    console.log("navigation: ", props.screenBeforeOptScreen)
    const [num_1, setNum_1] = useState("");
    const [num_2, setNum_2] = useState("");
    const [num_3, setNum_3] = useState("");
    const [num_4, setNum_4] = useState("");
    console.log(props.code)
    return (
        <ImageBackground source={require('../../assets/bg.png')} style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.buttonContainer}>
                    <HeaderSmall leftIcon="back" rightIcon="settings" noTitle />
                </View>
                <Text style={[styles.logo, props.locale == "ar" && { textAlign: 'right' }]}>BEYOND</Text>
                <TransText style={[styles.welcome, props.locale == "ar" && { textAlign: 'right' }]} transkey={"PHONE_VERIFICATION"} />
            </View>


            {/* This is entire white body container */}
            <View style={styles.signinContainerWhite}>

                {/* This is email container */}

                <TransText style={[styles.placeholder, {
                    marginTop: 50
                }, props.locale == "ar" && { textAlign: 'right' }]} transkey="ENTER_VERIFICATION_CODE" />
                <Text style={[styles.placeholder, {
                    fontSize: helpers.size(25),
                    marginTop: 10,
                    marginBottom: 10
                }, props.locale == "ar" && { textAlign: 'right' }]}>+{props.phoneNumber}</Text>
                <View style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between',
                    // paddingHorizontal: 10,
                }}>
                    <View style={styles.inputfield}>
                        <TextInput KeyboardAvoidingView=""
                            maxLength={1}
                            keyboardType={"numeric"}
                            style={styles.textinputfield}
                            value={num_1}
                            onChangeText={(text) => setNum_1(text)} />
                    </View>
                    <View style={styles.inputfield}>
                        <TextInput KeyboardAvoidingView=""
                            maxLength={1}
                            keyboardType={"numeric"}
                            style={styles.textinputfield}
                            value={num_2}
                            onChangeText={(text) => setNum_2(text)} />
                    </View>
                    <View style={styles.inputfield}>
                        <TextInput KeyboardAvoidingView=""
                            maxLength={1}
                            keyboardType={"numeric"}
                            style={styles.textinputfield}
                            value={num_3}
                            onChangeText={(text) => setNum_3(text)} />
                    </View>
                    <View style={styles.inputfield}>
                        <TextInput KeyboardAvoidingView=""
                            maxLength={1}
                            keyboardType={"numeric"}
                            style={styles.textinputfield}
                            value={num_4}
                            onChangeText={(text) => setNum_4(text)} />
                    </View>
                </View>




                {/* Buttons start here */}

                {/* empty view for height */}

                <View style={{ height: hp(3.5) }}></View>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        // navigation.navigate('Home');
                        let num = num_1 + num_2 + num_3 + num_4;
                        if (props.code == num) {
                            if (props.screenBeforeOptScreen == "signup")
                                props.dispatch(Actions.registerAttempt())
                            else
                                navigation.navigate("ResetPassword")
                        } else {
                            props.dispatch(Actions.setNotification("danger", getText("INVALID_CODE", props.locale)))
                        }
                    }}
                    disabled={!num_1 || !num_2 || !num_3 || !num_4 || props.attempting}
                    style={styles.loginBtn}>
                    {props.attempting ?
                        <ActivityIndicator size={theme.xxl} color={"#fff"} />
                        :
                        <TransText style={styles.btntext} transkey="VERIFY" />}
                </TouchableOpacity>


                {/* login as guest */}

                {/* empty view for height */}

                <View style={{ height: hp(1.5) }}></View>

                <TransText style={styles.forgotpass} transkey="DIDNT_RECEIVE_CODE" />

                {/* Forgot password text */}
                <TouchableOpacity
                    onPress={() => {
                        let code = "0000" + Math.floor(Math.random() * 10000)
                        code = (code).substring(code.length - 4, code.length)
                        props.dispatch(Actions.sendPhoneVerificationNumberAttempt(props.phoneNumber, code))
                    }}
                    disabled={props.attempting}
                    style={{ width: '100%', alignItems: 'center' }}>
                    <TransText style={[styles.forgotpass, {
                        paddingTop: hp(1),
                        color: theme.primary
                    }]} transkey="RESEND_CODE" />
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const mapStateToProps = state => ({
    locale: state.app.locale,
    phoneNumber: state.auth.phoneNumber,
    attempting: state.auth.attempting,
    code: state.auth.code,
    screenBeforeOptScreen: state.auth.screenBeforeOptScreen,
    email: state.auth.email,
    password: state.auth.password,
    name: state.auth.name,
    city: state.auth.city,
    workField: state.auth.workField,
    note: state.auth.note,
    title: state.auth.title
})

export default connect(mapStateToProps, null)(OptVerification)

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
        fontSize: helpers.size(30),
        fontFamily: theme.pop
    },
    emailcontainer: { flexDirection: 'row', paddingTop: hp(3), paddingBottom: hp(1) },
    passwordContainer: { flexDirection: 'row', paddingTop: hp(1), paddingBottom: hp(1) },
    placeholder: {
        color: theme.primary,
        paddingLeft: 10,
        fontFamily: theme.pop,
        paddingRight: 10,
    },
    inputfield: {
        backgroundColor: '#F3F3F3',
        width: wp(15),
        height: wp(15),
        borderRadius: 5,
        justifyContent: 'center',
        // marginHorizontal: 10
    },
    textinputfield: {
        textAlign: 'center',
        fontSize: helpers.size(20)
    },
    textinputstyle: {
        width: '100%',
        height: '100%',
        fontSize: theme.large,
        textAlign: 'center',
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
        paddingTop: hp(3),
        fontFamily: theme.pop,
        width: '100%',
        textAlign: 'center',
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