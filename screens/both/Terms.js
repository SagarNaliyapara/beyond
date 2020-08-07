import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    StatusBar,
    TouchableOpacity,
    TextInput,
    Image,
    Platform
} from "react-native";
import theme from '../../Theme'
import { connect } from "react-redux"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from "react-native-gesture-handler";
import TransText from "../../components/both/transtext";
const Terms = (props) => {
    const navigation = useNavigation();
    return (
        <ImageBackground source={require('../../assets/bg.png')} style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={[styles.buttonContainer, props.locale == "ar" && { justifyContent: 'flex-end' }]}>
                    <TouchableOpacity onPress={() => navigation.pop()}>
                        {props.locale == "en" ?
                            <Ionicons name="ios-arrow-back" size={27} color={'#fff'} />
                            :
                            <Ionicons name="ios-arrow-forward" size={27} color={'#fff'} />}
                    </TouchableOpacity>
                </View>
                <Text style={[styles.logo, props.locale == "ar" && { textAlign: 'right' }]}>BEYOND</Text>
                <TransText style={[styles.welcome, props.locale == "ar" && { textAlign: 'right' }]} transkey="TERMS_CONDITIONS" />
            </View>


            {/* This is entire white body container */}
            <View style={styles.signinContainerWhite}>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <TransText style={[styles.termsText, props.locale == "ar" && { textAlign: 'right' }]} transkey="TERMS_DESC" />
                </ScrollView>

            </View>
        </ImageBackground>
    );

}

const mapStateToProps = state => ({
    locale: state.app.locale,
    attempting: state.auth.attempting
})

export default connect(mapStateToProps, null)(Terms)

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
        marginTop: StatusBar.currentHeight,
        justifyContent: 'flex-start',
        paddingLeft: 25,
        paddingRight: 25,
        flexDirection: 'row',
        alignItems: 'center'
    },
    logo: {
        paddingLeft: '8%',
        paddingRight: '8%',
        color: '#fff',
        fontSize: theme.xxl,
        paddingTop: '9%',
        fontFamily: theme.copper
    },
    welcome: {
        paddingLeft: '8%',
        paddingRight: '8%',
        color: '#fff',
        fontSize: theme.xxl,
        fontFamily: theme.pop
    },
    termsText: {
        fontFamily: theme.pop,
        color: theme.secondary,
        fontSize: theme.medium,
        paddingHorizontal: 10,
        textAlign: 'justify',
        paddingVertical: 30
    }
});