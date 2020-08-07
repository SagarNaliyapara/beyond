import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    ScrollView,
    Image,
    TouchableOpacity
} from "react-native";
import theme from '../../Theme'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FooterSecretary from '../../components/secretary/FooterSecretary'
import HeaderLongSecretary from "../../components/secretary/HeaderLongSecretary";
import { Entypo, MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import Trip_icon from "../../assets/trip.svg"
import Date_icon from "../../assets/date.svg"
import Social_icon from "../../assets/social.svg"
import Meeting_icon from "../../assets/meeting.svg"
import Hotel_icon from "../../assets/hotel.svg"
import Sec_service_icon from "../../assets/service.svg"
import Contact_icon from "../../assets/contact.svg"
import Order_History_icon from "../../assets/history.svg"
import helpers from "../../components/styles/helpers";
const CreateRequest = () => {
    const user = "https://randomuser.me/api/portraits/women/8.jpg"
    const navigation = useNavigation();

    return (
        <ImageBackground source={require('../../assets/bg.png')} style={styles.container}>
            <View style={styles.header}>
                {/* this is the header component with 2 icons */}
                <HeaderLongSecretary />
            </View>
            <View style={styles.titleSpace}>
                {/* space for title */}
                <Text style={styles.title}>Create Request</Text>
            </View>




            <View style={styles.body}>
                {/* background gold transparent color container */}
                <View style={styles.backgroundContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }}>
                        <Image source={{ uri: user }} style={{ height: 80, width: 80, borderRadius: 50 }} />
                        <View style={{ paddingLeft: wp(3) }}>
                            <Text style={styles.nameTitle}>Mohommad</Text>
                            <Text style={styles.caption}>Development Here</Text>
                        </View>
                    </View>

                    {/* city and work field view */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <View>
                            <View style={{ alignItems: 'center', flexDirection: 'row', paddingTop: hp(3) }}>
                                <MaterialIcons name="location-on" size={17} color={theme.primary} />
                                <Text style={{ fontFamily: theme.pop, color: theme.primary }}>City</Text>
                            </View>
                            <Text style={{ fontSize: theme.xl, fontFamily: theme.pop, color: theme.secondary }}>Jeddah</Text>
                        </View>
                        <View style={{ paddingLeft: 30 }}></View>
                        <View>
                            <View style={{ alignItems: 'center', flexDirection: 'row', paddingTop: hp(3) }}>
                                <Entypo name="suitcase" size={17} color={theme.primary} />
                                <Text style={{ fontFamily: theme.pop, color: theme.primary, paddingLeft: 5 }}>Work Field</Text>
                            </View>
                            <Text style={{ fontSize: theme.xl, fontFamily: theme.pop, color: theme.secondary }}>Business</Text>
                        </View>
                    </View>


                    {/* request type starts here */}
                    <Text style={{ fontFamily: theme.pop, color: theme.primary, paddingTop: hp(3), paddingLeft: 20 }}>Request Type</Text>

                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>


                        {/* CARD */}
                        <TouchableOpacity onPress={() => navigation.navigate('TripForm')} style={styles.containerCard}>
                            <Trip_icon height={helpers.size(35)} width={helpers.size(35)} />
                            <Text style={styles.menutext}>Trips</Text>
                        </TouchableOpacity>
                        {/* CARD */}


                        {/* CARD */}
                        <TouchableOpacity onPress={() => navigation.navigate('ImportantDates')} style={styles.containerCard}>
                            <Date_icon height={helpers.size(30)} width={helpers.size(30)} />
                            <Text style={styles.menutext}>Imp. date</Text>
                        </TouchableOpacity>
                        {/* CARD */}



                        {/* CARD */}
                        <TouchableOpacity onPress={() => navigation.navigate('SocialLiveForm')} style={styles.containerCard}>
                            <Social_icon height={helpers.size(30)} width={helpers.size(25)} />
                            <Text style={styles.menutext}>Social Event</Text>
                        </TouchableOpacity>
                        {/* CARD */}



                        {/* CARD */}
                        <TouchableOpacity onPress={() => navigation.navigate('MeetingForm')} style={styles.containerCard}>
                            <Meeting_icon height={helpers.size(25)} width={helpers.size(30)} />
                            <Text style={styles.menutext}>Meeting</Text>
                        </TouchableOpacity>
                        {/* CARD */}

                        {/* CARD */}
                        <TouchableOpacity onPress={() => navigation.navigate('ServicesForm')} style={styles.containerCard}>
                            <Sec_service_icon height={helpers.size(35)} width={helpers.size(30)} />
                            <Text style={styles.menutext}>Sec.Service</Text>
                        </TouchableOpacity>
                        {/* CARD */}

                        {/* CARD */}
                        <TouchableOpacity onPress={() => navigation.navigate('HotelForm')} style={styles.containerCard}>
                            <Hotel_icon height={helpers.size(30)} width={helpers.size(30)} />
                            <Text style={styles.menutext}>Hotel</Text>
                        </TouchableOpacity>
                        {/* CARD */}



                    </View>



                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

                        <TouchableOpacity style={styles.mainButton}>
                            <Text style={styles.btnText}>Create</Text>
                        </TouchableOpacity>


                        <TouchableOpacity style={styles.secondButton}>
                            <Text style={styles.btnText}>Cancel</Text>
                        </TouchableOpacity>


                    </View>





                </View>

            </View>



        </ImageBackground>
    );
}
export default CreateRequest;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 24 : 0,
    },
    header: {
        flex: 1,
    },
    titleSpace: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: wp(6)
    },
    body: {
        flex: 8,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 25,
        paddingBottom: 10
    },
    footer: {
        flex: 1,
    },
    title: {
        fontSize: theme.xxl / 1.2,
        color: theme.titleColor,
        fontFamily: theme.pop
    },
    nameTitle: {
        fontFamily: theme.popbold,
        color: theme.primary,
        fontSize: theme.xl
    },
    caption: {
        fontFamily: theme.pop,
        color: theme.secondary,
        fontSize: theme.medium
    },
    mainButton: {
        backgroundColor: theme.primary,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 35,
        borderRadius: 3,
        flexDirection: 'row',
        marginTop: hp(2),
        paddingVertical: 10
    },
    secondButton: {
        backgroundColor: theme.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 35,
        borderRadius: 3,
        flexDirection: 'row',
        marginTop: hp(2),
        paddingVertical: 10
    },
    btnText: {
        color: '#fff',
        fontFamily: theme.popbold,
        fontSize: theme.large,
    },
    backgroundContainer: {
        backgroundColor: theme.transparentColor,
        flex: 1,
        borderRadius: 10,
        paddingHorizontal: 25,
        paddingTop: 10,
        justifyContent: 'center'
    },
    containerCard: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ede5d8',
        height: hp(11),
        width: wp(20),
        borderRadius: 10,
        marginTop: hp(1),
    },
    menutext: {
        color: theme.primary,
        fontSize: theme.small / 1.2,
        fontFamily: theme.pop,
        textAlign: 'center'
    }
});