
//HeaderSmall means with 2 icons and 1 title
import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Image,
    StatusBar
} from "react-native";
import theme from '../../Theme'
import { Feather, AntDesign, MaterialIcons, Ionicons } from '@expo/vector-icons'
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux'
import Actions from "../../actions/creator"
import lang from '../../config/lang'
import { drawer } from "../../MainAppNavigation";
const { locales, getText } = lang
const getLeftIcon = (iconName, locale) => {
    switch (iconName) {
        case "back":
            if (locale == "en")
                return (<Ionicons name="ios-arrow-back" size={27} color={'#fff'} />);
            else
                return (<Ionicons name="ios-arrow-forward" size={27} color={'#fff'} />);
            break;
        case "menu":
            return (<Feather name="menu" size={25} color={theme.titleColor} />);
            break;
        default:
            return null;
            break;
    }
}

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

const HeaderSmall = (props) => {
    const [visible, setVisible] = useState(false);
    const [locale, setLocale] = useState(props.locale);

    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            {props.locale == "en" ?
                <TouchableOpacity style={{ paddingRight: 20 }} onPress={() => onPressLeftIcon(props.leftIcon, navigation)}>
                    {/* <Feather name={props.leftIcon} size={25} color={theme.titleColor} /> */}
                    {getLeftIcon(props.leftIcon, props.locale)}
                </TouchableOpacity> :
                <TouchableOpacity onPress={() => {
                    setVisible(true);
                    setLocale(props.locale)
                }} >
                    <Image source={require('../../assets/languageicon.png')} style={{ height: 25, width: 25 }} />
                </TouchableOpacity>}
            {!props.noTitle && <Text style={styles.title}>Beyond</Text>}
            {props.locale == "en" ?
                <TouchableOpacity onPress={() => {
                    setVisible(true);
                    setLocale(props.locale)
                }} >
                    <Image source={require('../../assets/languageicon.png')} style={{ height: 25, width: 25 }} />
                </TouchableOpacity>
                :
                <TouchableOpacity style={{ paddingLeft: 20 }} onPress={() => onPressLeftIcon(props.leftIcon, navigation)}>
                    {/* <Feather name={props.leftIcon} size={25} color={theme.titleColor} /> */}
                    {getLeftIcon(props.leftIcon, props.locale)}
                </TouchableOpacity>
            }

            {/* POPUP CODE STARTS HERE, all with inline styling,so its easy to copy and paste */}

            <Dialog
                visible={visible}
                onTouchOutside={() => {
                    setVisible(false);
                }}
            >
                <DialogContent style={{ paddingTop: 10, paddingBottom: 20, width: wp('85%'), justifyContent: 'space-evenly' }}>

                    <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
                        {props.locale == "ar" && <TouchableOpacity onPress={() => setVisible(false)}><AntDesign name="close" color={theme.primary} size={24} /></TouchableOpacity>}
                        <Text style={{ fontFamily: theme.popbold, color: theme.primary, fontSize: theme.xl }}>{getText("SELECT_LANGUAGE", props.locale)}</Text>
                        {props.locale == "en" && <TouchableOpacity onPress={() => setVisible(false)}><AntDesign name="close" color={theme.primary} size={24} /></TouchableOpacity>}
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity activeOpacity={0.8}
                            onPress={() => {
                                setLocale("en");
                                props.dispatch(Actions.setLanguage("en"));
                            }}
                            style={{
                                backgroundColor: locale == "en" ? theme.primary : theme.transparentColor,
                                padding: 10,
                                justifyContent: 'center',
                                width: wp(35),
                                borderRadius: 15,
                                height: hp(15),
                                alignItems: 'center'
                            }}>
                            <Image source={locale == "en" ? require('../../assets/secretary_profile_icons/3white.png') : require('../../assets/secretary_profile_icons/3.png')}
                                style={{ height: 55, width: 55 }} />
                            <Text style={{
                                fontFamily: theme.popbold,
                                fontSize: theme.large,
                                paddingTop: 10,
                                color: locale == "en" ? '#fff' : theme.primary
                            }}>English</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8}
                            onPress={() => {
                                setLocale("ar");
                                props.dispatch(Actions.setLanguage("ar"));
                            }}
                            style={{
                                backgroundColor: locale == "en" ? theme.transparentColor : theme.primary,
                                padding: 10,
                                justifyContent: 'center',
                                width: wp(35),
                                borderRadius: 15,
                                height: hp(15),
                                alignItems: 'center'
                            }}>
                            <Image source={locale == "en" ? require('../../assets/secretary_profile_icons/3.png') : require('../../assets/secretary_profile_icons/3white.png')}
                                style={{ height: 55, width: 55 }} />
                            <Text style={{
                                fontFamily: theme.popbold,
                                paddingTop: 10,
                                fontSize: theme.large,
                                color: locale == "en" ? theme.primary : '#fff'
                            }}>العربية</Text>
                        </TouchableOpacity>

                    </View>

                    {/* Button Done*/}

                    {/* <TouchableOpacity
                        onPress={() => {
                            setVisible(false)
                            props.dispatch(Actions.setLanguage(locale))
                        }}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '80%',
                            backgroundColor: theme.primary,
                            height: hp(7),
                            borderRadius: 5,
                            marginTop: wp(2),
                            width: '100%'
                        }}
                    >
                        <Text style={{ color: '#fff', fontFamily: theme.pop }}>Done</Text>
                    </TouchableOpacity> */}

                </DialogContent>
            </Dialog>


            {/* POPUP CODE ENDS HERE */}

        </View>
    );
}

const mapStateToProps = state => ({
    locale: state.app.locale
})

export default connect(mapStateToProps, null)(HeaderSmall)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: Platform.OS === 'ios' ? 15 : 10,
        paddingHorizontal: 25
    },
    title: {
        fontSize: Platform.OS === 'ios' ? theme.xxxl * 1.3 : theme.xxxl,
        fontFamily: theme.copper,
        color: theme.titleColor
    }
});