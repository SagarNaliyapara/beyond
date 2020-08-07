//Order history screen design from the both panel
import React, { useState, Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Image,
    TouchableOpacity
} from "react-native";
import theme from '../../Theme'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FooterSecretary from '../../components/secretary/FooterSecretary'
import HeaderLongSecretary from '../../components/secretary/HeaderLongSecretary'
import { useNavigation } from '@react-navigation/native';
import Trip_icon from "../../assets/trip.svg"
import Date_icon from "../../assets/date.svg"
import Social_icon from "../../assets/social.svg"
import Meeting_icon from "../../assets/meeting.svg"
import Hotel_icon from "../../assets/hotel.svg"
import Sec_service_icon from "../../assets/service.svg"
import Contact_icon from "../../assets/contact.svg"
import Order_History_icon from "../../assets/history.svg"
import helpers from "../../components/styles/helpers";

class ClientRequests extends Component {

    render() {
        const { navigation } = this.props;
        return (

            <ImageBackground source={require('../../assets/bg.png')} style={styles.container}>


                <View style={styles.header}>
                    {/* this is the header component with 2 icons */}
                    <HeaderLongSecretary />
                </View>

                <View style={styles.titleSpace}>
                    {/* space for title */}
                    <Text style={styles.title}>Client Requests</Text>
                </View>


                <View style={styles.body}>




                    {/* CARD */}
                    <TouchableOpacity onPress={() => navigation.navigate('Trips')} style={styles.containerCard}>
                        <Trip_icon height={helpers.size(65)} width={helpers.size(65)} />
                        <Text style={styles.menutext}>Trips</Text>
                    </TouchableOpacity>
                    {/* CARD */}

                    {/* CARD */}
                    <TouchableOpacity onPress={() => navigation.navigate('SocialLife')} style={styles.containerCard}>
                        <Social_icon height={helpers.size(50)} width={helpers.size(40)} />
                        <Text style={styles.menutext}>Social Life Event</Text>
                    </TouchableOpacity>
                    {/* CARD */}

                    {/* CARD */}
                    <TouchableOpacity onPress={() => navigation.navigate('Meetings')} style={styles.containerCard}>
                        <Meeting_icon height={helpers.size(45)} width={helpers.size(60)} />
                        <Text style={styles.menutext}>Meetings</Text>
                    </TouchableOpacity>
                    {/* CARD */}

                    {/* CARD */}
                    <TouchableOpacity onPress={() => navigation.navigate('Hotels')} style={styles.containerCard}>
                        <Hotel_icon height={helpers.size(45)} width={helpers.size(45)} />
                        <Text style={styles.menutext}>Hotel</Text>
                    </TouchableOpacity>
                    {/* CARD */}

                    {/* CARD */}
                    <TouchableOpacity onPress={() => navigation.navigate('SecondaryServices')} style={styles.containerCard}>
                        <Sec_service_icon height={helpers.size(55)} width={helpers.size(50)} />
                        <Text style={styles.menutext}>Secondary Services</Text>
                    </TouchableOpacity>
                    {/* CARD */}

                    {/* CARD */}
                    <TouchableOpacity onPress={() => navigation.navigate('Contacts')} style={styles.containerCard}>
                        <Contact_icon height={helpers.size(45)} width={helpers.size(60)} />
                        <Text style={styles.menutext}>Contacts</Text>
                    </TouchableOpacity>
                    {/* CARD */}



                </View>
            </ImageBackground>
        );
    }
}
export default ClientRequests;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 24 : 0,
    },
    header: {
        flex: 1.2,
    },
    body: {
        flex: 9,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: '#fff',
        paddingHorizontal: wp(7),
        paddingTop: hp(2),
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    },
    footer: {
        flex: 1,
    },
    titleSpace: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: wp(6)
    },
    title: {
        fontSize: theme.xxl / 1.25,
        color: theme.titleColor,
        fontFamily: theme.pop,
    },
    subtitle: {
        fontSize: theme.xxl / 2,
        color: theme.titleColor,
        fontFamily: theme.popbold,
    },
    justnowtext: {
        paddingTop: hp(3),
        fontFamily: theme.pop,
        color: '#7c7c7c',
        fontSize: theme.small
    },
    img: {
        borderRadius: 50,
        width: 80,
        height: 80
    },
    speakbutton: {
        backgroundColor: theme.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderRadius: 10,
        flexDirection: 'row',
        paddingVertical: 15,
        marginTop: 15
    },
    btnText: {
        color: '#fff',
        fontFamily: theme.pop,
        fontSize: theme.large,
        paddingLeft: wp(2)
    },
    heading: {
        color: theme.primary,
        fontFamily: theme.popbold,
        fontSize: theme.xxl / 1.2
    },
    containerCard: {
        alignItems: 'center',
        justifyContent: 'center',
        height: hp(20),
        width: wp(40),
        borderRadius: 10,
        marginTop: hp(2),
        backgroundColor: theme.transparentColor,
    },
    menutext: {
        color: theme.primary,
        fontSize: theme.large / 1.1,
        fontFamily: theme.popbold,
        textAlign: 'center'
    }
});