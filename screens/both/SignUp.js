import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    TextInput,
    Platform,
    ScrollView,
    Image,
    ActivityIndicator
} from "react-native";
import theme from '../../Theme'
import CheckBox from 'react-native-check-box'
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons, Feather, MaterialCommunityIcons, EvilIcons, Entypo } from '@expo/vector-icons'
//https://www.npmjs.com/package/react-native-country-picker-modal   for docs of flag picker
import CountryPicker, { getCallingCode, FlagButton } from 'react-native-country-picker-modal'
// import { CountryCode, Country } from '../../src/types'
//Material Drop down to fix the issue of picker : https://github.com/n4kz/react-native-material-dropdown
import { Dropdown } from 'react-native-material-dropdown';
import HeaderSmall from '../../components/both/HeaderSmall'
import { connect, useSelector, useDispatch } from "react-redux"
import TransText from "../../components/both/transtext";
import Actions from "../../actions/creator"
import flag from "../../assets/flag.png"
import helpers from "../../components/styles/helpers";
import reactotron from "reactotron-react-native";
//edit the values for the picker(dropdown) component here
let cityList = [{
    value: 'City1',
}, {
    value: 'City2',
}, {
    value: 'City3',
}];


// let titleList = [];


// let titleListAr = [];



//EDIT THEM!



const SignUp = (props) => {
    const [selectedValue, setSelectedValue] = useState("Pick");
    const [isChecked, setIsChecked] = useState(isChecked)
    const [country, setCountry] = useState({
        callingCode: ['1'],
        cca2: 'US',
        currency: ['USD'],
        flag: 'flag-us',
        name: 'United States',
        region: 'Americas',
        subregion: 'North America'
    })

    const [email, setEmail] = useState('Devhere17@gmail.com')
    const [password, setPassword] = useState('12345678')
    const [name, setName] = useState('Mohammad Baobaid')
    const [phoneNumber, setPhoneNumber] = useState('555644047')
    const [city, setCity] = useState('')
    const [workField, setWorkField] = useState('')
    const [title, setTitle] = useState('')
    const [note, setNote] = useState('')
    const [getcities, setGetCities] = useState(false)

    const [titleList, onChangeTitleList] = useState([])
    const [titleListAr, onChangeTitleListAr] = useState([])


    // const [country, setCountry] = useState({ callingCode: [966] })
    // const [withCallingCode, setWithCallingCode] = useState(true)
    const navigation = useNavigation();




    const onSelect = (country) => {
        setCountry(country)
    }


    useEffect(() => {
        fetch("http://beyond-pa.com/api/titles-list")
            .then(red => red.json())
            .then(res => {
                let titleListData = []
                let titleListArData = []
                res.titles.map((title) => {
                    titleListData.push({ value: title.name })
                    titleListArData.push({ value: title.ar_name })
                })
                onChangeTitleList(titleListData)
                onChangeTitleListAr(titleListArData)
                reactotron.log("ayu", res)
            })
    }, [])

    useEffect(() => {
        props.dispatch(Actions.getCitiesAttempt())
        setGetCities[true]
    }, [getcities])


    const authRed = useSelector(state => state.auth);

    return (
        <ImageBackground source={require('../../assets/bg.png')} style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.buttonContainer}>
                    <HeaderSmall leftIcon="back" rightIcon="settings" noTitle />
                </View>
            </View>

            <View style={{ flex: 2, paddingHorizontal: 25 }}>
                <Text style={[styles.logo, props.locale == "ar" && { textAlign: 'right' }]}>BEYOND</Text>
                <TransText style={[styles.welcome, props.locale == "ar" && { textAlign: 'right' }]} transkey={"WELCOME_BACK"} />
            </View>

            {/* This is entire white body container */}
            <View style={{ flex: 10 }}>

                <ScrollView contentContainerStyle={styles.signinContainerWhite}>



                    {/* This is email container */}

                    <View style={[styles.emailcontainer, props.locale == "ar" && { justifyContent: 'flex-end' }]}>
                        {props.locale == "ar" && <TransText style={[styles.placeholder, { paddingRight: 10 }]} transkey="EMAIL_ADDRESS_REQUIRED" />}
                        <MaterialCommunityIcons name="email-outline" size={20} color={theme.primary} />
                        {props.locale == "en" && <TransText style={styles.placeholder} transkey="EMAIL_ADDRESS_REQUIRED" />}
                    </View>
                    <View style={styles.inputfield}>
                        <TextInput
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            maxLength={40}
                            keyboardType={"email-address"}
                            style={[styles.textinputstyle, props.locale == "ar" && { textAlign: 'right' }]} />
                    </View>

                    {/* This is password container */}

                    <View style={[styles.nextcontainer, props.locale == "ar" && { justifyContent: 'flex-end' }]}>
                        {props.locale == "ar" && <TransText style={[styles.placeholder, { paddingRight: 10 }]} transkey="PASSWORD_REQUIRED" />}
                        <MaterialCommunityIcons name="lock-outline" size={20} color={theme.primary} />
                        {props.locale == "en" && <TransText style={styles.placeholder} transkey="PASSWORD_REQUIRED" />}
                    </View>
                    <View style={styles.inputfield}>
                        <TextInput
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry={true} maxLength={40} style={[styles.textinputstyle, props.locale == "ar" && { textAlign: 'right' }]} />
                    </View>



                    {/* This is name container */}

                    <View style={[styles.nextcontainer, props.locale == "ar" && { justifyContent: 'flex-end' }]}>
                        {props.locale == "ar" && <TransText style={[styles.placeholder, { paddingRight: 10 }]} transkey="NAME_REQUIRED" />}
                        <Feather name="user" size={20} color={theme.primary} />
                        {props.locale == "en" && <TransText style={styles.placeholder} transkey="NAME_REQUIRED" />}
                    </View>
                    <View style={styles.inputfield}>
                        <TextInput
                            value={name}
                            onChangeText={(text) => setName(text)}
                            maxLength={40} style={[styles.textinputstyle, props.locale == "ar" && { textAlign: 'right' }]} />
                    </View>


                    {/* This is phone number container */}

                    <View style={[styles.nextcontainer, props.locale == "ar" && { justifyContent: 'flex-end' }]}>
                        {props.locale == "ar" && <TransText style={[styles.placeholder, { paddingRight: 10 }]} transkey="PHONE_NUMBER_REQUIRED" />}
                        <MaterialCommunityIcons name="phone" size={20} color={theme.primary} />
                        {props.locale == "en" && <TransText style={styles.placeholder} transkey="PHONE_NUMBER_REQUIRED" />}
                    </View>
                    <View style={[styles.inputfield, props.locale == "ar" && { flexDirection: "row-reverse" }]}>
                        {/* {props.locale == "en" && <CountryPicker {...{ countryCode, withCallingCode, country, onSelect }} />}
                        {props.locale == "en" && <View style={{ width: 2, height: '100%', backgroundColor: '#e5e5e5', marginRight: 5 }}></View>}
                        <TextInput keyboardType={"numeric"} value={phoneNumber} onChangeText={(text) => setPhoneNumber(text)}
                            maxLength={40} style={[styles.textinputstyle, props.locale == "ar" && { textAlign: 'right' }]} />
                        {props.locale == "ar" && <View style={{ width: 2, height: '100%', backgroundColor: '#e5e5e5', marginRight: 5 }}></View>}
                        {props.locale == "ar" && <CountryPicker {...{ countryCode, withCallingCode, country, onSelect }} />} */}


                        {/* <Image source={flag}
                            style={{
                                width: helpers.size(40),
                                height: helpers.size(30),
                                resizeMode: 'contain'
                            }} />
                        <Text style={{
                            fontSize: theme.large,
                            marginLeft: 5
                        }}>(+966)</Text> */}
                        <CountryPicker withFilter withCallingCode countryCode={country.cca2} onSelect={onSelect} />
                        <Text style={{ textAlign: 'left', color: "black" }}>{"+" + country.callingCode[0]}</Text>
                        <View style={{ width: 2, height: '100%', backgroundColor: '#e5e5e5', marginRight: 5, marginLeft: 5 }}></View>
                        <TextInput keyboardType={"numeric"} value={phoneNumber} onChangeText={(text) => setPhoneNumber(text)}
                            maxLength={40} style={[styles.textinputstyle, props.locale == "ar" && { textAlign: 'right' }]} />

                        {/* {props.locale == "en" && <Image source={flag}
                            style={{
                                width: helpers.size(40),
                                height: helpers.size(30),
                                resizeMode: 'contain'
                            }} />}
                        {props.locale == "en" && <Text style={{
                            fontSize: theme.large
                        }}>(+966)</Text>}
                        {props.locale == "en" && <View style={{ width: 2, height: '100%', backgroundColor: '#e5e5e5', marginRight: 5, marginLeft: 5 }}></View>}
                        <TextInput keyboardType={"numeric"} value={phoneNumber} onChangeText={(text) => setPhoneNumber(text)}
                            maxLength={40} style={[styles.textinputstyle, props.locale == "ar" && { textAlign: 'right' }]} />
                        {props.locale == "ar" && <View style={{ width: 2, height: '100%', backgroundColor: '#e5e5e5', marginRight: 5 }}></View>}
                        {props.locale == "ar" && <Flag_Icon />}
 */}
                    </View>

                    {/* This is city container, edit your list of cities here */}
                    <View style={[styles.nextcontainer, props.locale == "ar" && { justifyContent: 'flex-end' }]}>
                        {props.locale == "ar" && <TransText style={[styles.placeholder, { paddingRight: 10 }]} transkey="CITY" />}
                        <EvilIcons name="location" size={20} color={theme.primary} />
                        {props.locale == "en" && <TransText style={styles.placeholder} transkey="CITY" />}
                    </View>
                    <View style={styles.inputfield}>
                        <Dropdown
                            inputContainerStyle={{ borderBottomColor: 'transparent' }}
                            fontSize={14}
                            onChangeText={(value) => setCity(value)}
                            containerStyle={{ height: '100%', width: '95%', justifyContent: 'center', paddingBottom: 20 }}
                            placeholder="City1"
                            data={props.locale == "ar" ? authRed.arCities : authRed.cities}
                        />
                    </View>



                    {/* This is work field container */}

                    <View style={[styles.nextcontainer, props.locale == "ar" && { justifyContent: 'flex-end' }]}>
                        {props.locale == "ar" && <TransText style={[styles.placeholder, { paddingRight: 10 }]} transkey="WORK_FIELD" />}
                        <Entypo name="suitcase" size={15} color={theme.primary} />
                        {props.locale == "en" && <TransText style={styles.placeholder} transkey="WORK_FIELD" />}
                    </View>
                    <View style={styles.inputfield}>
                        <TextInput
                            onChangeText={(text) => setWorkField(text)}
                            maxLength={40} style={[styles.textinputstyle, props.locale == "ar" && { textAlign: 'right' }]} />
                    </View>

                    {/* This is title container */}

                    <View style={[styles.nextcontainer, props.locale == "ar" && { justifyContent: 'flex-end' }]}>
                        {props.locale == "ar" && <TransText style={[styles.placeholder, { paddingRight: 10 }]} transkey="TITLE" />}
                        <Feather name="user" size={20} color={theme.primary} />
                        {props.locale == "en" && <TransText style={styles.placeholder} transkey="TITLE" />}
                    </View>
                    <View style={styles.inputfield}>
                        <Dropdown
                            inputContainerStyle={{ borderBottomColor: 'transparent' }}
                            fontSize={14}
                            onChangeText={(value) => { setTitle(value) }}
                            containerStyle={{ height: '100%', width: '95%', justifyContent: 'center', paddingBottom: 20 }}
                            placeholder="Title"
                            data={props.locale == "en" ? titleList : titleListAr}
                        />


                    </View>


                    {/* This is note container */}

                    <View style={[styles.nextcontainer, props.locale == "ar" && { justifyContent: 'flex-end' }]}>
                        {props.locale == "ar" && <TransText style={[styles.placeholder, { paddingRight: 10 }]} transkey="NOTE" />}
                        <MaterialCommunityIcons name="note-outline" size={20} color={theme.primary} />
                        {props.locale == "en" && <TransText style={styles.placeholder} transkey="NOTE" />}
                    </View>
                    <View style={styles.inputfield}>
                        <TextInput
                            onChangeText={(text) => setNote(text)}
                            maxLength={40} style={[styles.textinputstyle, props.locale == "ar" && { textAlign: 'right' }]} />
                    </View>


                    {/*  accept terms container  */}

                    <View style={[styles.termscontainer, props.locale == "ar" && { justifyContent: 'flex-end' }]}>
                        {props.locale == "en" && <CheckBox
                            style={{ paddingRight: 5 }}
                            onValueChange
                            onClick={() => {
                                setIsChecked({
                                    isChecked: !isChecked
                                })
                            }}
                            isChecked={isChecked}
                            right
                            rightTextStyle={{ fontFamily: theme.pop }}
                        />}
                        {props.locale == "en" && <TransText style={{ fontFamily: theme.pop }} transkey="I_AGREE_TO" />}
                        <TouchableOpacity onPress={() => navigation.navigate('Terms')}>
                            <TransText style={{
                                textDecorationLine: 'underline',
                                fontFamily: theme.pop,
                                color: theme.primary,
                                paddingLeft: 5
                            }} transkey="TERMS_CONDITIONS" />
                        </TouchableOpacity>
                        {props.locale == "ar" && <TransText style={{ fontFamily: theme.pop, paddingLeft: 10 }} transkey="I_AGREE_TO" />}
                        {props.locale == "ar" && <CheckBox
                            style={{ paddingLeft: 5 }}
                            onValueChange
                            onClick={() => {
                                setIsChecked({
                                    isChecked: !isChecked
                                })
                            }}
                            isChecked={isChecked}
                            right
                            rightTextStyle={{ fontFamily: theme.pop }}
                        />}
                    </View>

                    {/* Buttons start here */}

                    {/* empty view for height */}

                    <View style={{ height: hp(1.5) }}></View>

                    <TouchableOpacity style={styles.guestbtn}
                        disabled={props.attempting || !isChecked || !email || !password || !name || !phoneNumber}
                        onPress={() => {

                            let user = {
                                email: email,
                                password: password,
                                name: name,
                                phoneNumber: country.callingCode[0] + phoneNumber,
                                city: city,
                                workField: workField,
                                title: title,
                                note: note
                            }
                            props.dispatch(Actions.setRegisterInfo(user))
                            // navigation.navigate("OptVerification");
                        }}>
                        {props.attempting ?
                            <ActivityIndicator size={theme.xxl} color={"#fff"} />
                            :
                            <TransText style={styles.btntext} transkey={"CREAT_AN_ACCOUNT"} />
                        }
                    </TouchableOpacity>




                    {/* dont have account */}

                    <TouchableOpacity onPress={() => navigation.navigate('SignIn')} style={styles.donthaveaccnt}>
                        {props.locale == "ar" && <TransText style={styles.signuptext} transkey="SIGN_IN" />}
                        <TransText style={{ fontFamily: theme.pop }} transkey="ALREADY_HAVE_AN_ACCOUNT" />
                        {props.locale == "en" && <TransText style={styles.signuptext} transkey="SIGN_IN" />}
                    </TouchableOpacity>


                    <View style={{ height: hp(10) }}></View>


                </ScrollView>
            </View>
        </ImageBackground>

    );

}
const mapStateToProps = state => ({
    locale: state.app.locale,
    attempting: state.auth.attempting
})

export default connect(mapStateToProps, null)(SignUp)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 24 : 0,
    },
    headerContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    signinContainerWhite: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingHorizontal: 35,
    },
    buttonContainer: {
        width: '100%',
        justifyContent: 'space-between',
        // paddingLeft: 25,
        // paddingRight: 25,
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        color: '#fff',
        fontSize: theme.xl * 1.5,
        fontFamily: theme.copper
    },
    welcome: {
        color: '#fff',
        fontSize: theme.xxl * 1.3,
        fontFamily: theme.pop
    },
    emailcontainer: { flexDirection: 'row', paddingTop: hp(3), paddingBottom: hp(1) },
    nextcontainer: { flexDirection: 'row', paddingTop: hp(3), paddingBottom: hp(1), alignItems: 'center' },
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
        // paddingRight: 10,
        alignItems: 'center',
        flexDirection: 'row'
    },
    textinputstyle: {
        width: '100%',
        height: '100%',
        paddingRight: 10,
        fontSize: theme.large
    },
    termscontainer: {
        alignItems: 'center',
        width: '100%',
        height: hp(8),
        borderRadius: 5,
        marginTop: 25,
        flexDirection: 'row'
    },
    btntext: {
        fontSize: theme.medium,
        color: '#fff',
        fontFamily: theme.pop
    },
    guestbtn: {
        backgroundColor: theme.primary,
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
    donthaveaccnt: { width: '100%', justifyContent: 'center', flexDirection: 'row', paddingTop: hp(10) },
    signuptext: {
        color: theme.primary,
        textDecorationLine: 'underline',
        paddingLeft: 5,
        paddingRight: 5,
        fontFamily: theme.pop
    }
});