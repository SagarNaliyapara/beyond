import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";

import theme from '../../Theme'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons, Feather, SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';


const ClientCard = (props) => {
    const navigation = useNavigation();
    return (
        <View style={styles.itemContainer}>
            <View style={{ justifyContent: 'center', marginLeft: wp(2) }}>
                <View style={{ flexDirection: 'row' }}>
                    <Ionicons name="md-airplane" size={24} color={theme.primary} />
                    <Text style={styles.firstText}>{props.name}</Text>
                </View>
                <Text style={styles.subText}>{props.title}</Text>
            </View>

            <View style={{ justifyContent: 'center', marginLeft: wp(2), paddingTop: 15 }}>
                <View style={{ flexDirection: 'row' }}>
                    <MaterialCommunityIcons name="email-outline" size={20} color={theme.primary} />
                    <Text style={styles.itemText}>{props.email}</Text>
                </View>
            </View>

            <View style={{ justifyContent: 'center', marginLeft: wp(2), paddingTop: 15 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Feather name="phone" size={20} color={theme.primary} />
                    <Text style={styles.itemText}>{props.mobile}</Text>
                </View>
            </View>

            <View style={{ justifyContent: 'center', marginLeft: wp(2), paddingTop: 15 }}>
                <View style={{ flexDirection: 'row' }}>
                    <SimpleLineIcons name="location-pin" size={20} color={theme.primary} />
                    <Text style={styles.itemText}>{props.location}</Text>
                </View>
            </View>


            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <TouchableOpacity onPress={() => navigation.navigate('ClientRequests')} style={styles.mainButton}>
                    <Text style={styles.btnText}>View Details</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.secondButton}>
                    <Feather name="message-circle" size={20} color={'#fff'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('RequestForm')} style={styles.secondButton}>
                    <Feather name="eye" size={20} color={'#fff'} />
                </TouchableOpacity>
            </View>
        </View>
    );
}
export default ClientCard;

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: theme.transparentColor,
        width: '100%',
        borderRadius: 10,
        marginTop: hp(2),
        padding: 25,
        marginBottom: hp(1),
    },
    featureText: {
        color: theme.secondary,
        fontFamily: theme.pop,
        fontSize: theme.medium,
        paddingLeft: wp(4),
        paddingTop: hp(1)
    },
    firstText: {
        fontSize: theme.large,
        color: theme.primary,
        fontFamily: theme.pop,
        paddingLeft: 10
    },
    mainButton: {
        backgroundColor: theme.primary,
        justifyContent: 'center',
        alignItems: 'center',
        height: hp(6),
        borderRadius: 3,
        width: '50%',
        marginTop: hp(1),
        marginLeft: wp(2)
    },
    secondButton: {
        backgroundColor: theme.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        height: hp(6),
        borderRadius: 3,
        width: '20%',
        marginTop: hp(1),
        marginLeft: wp(2)
    },
    btnText: {
        color: '#fff',
        fontFamily: theme.pop,
        fontSize: theme.large,
        paddingLeft: wp(2)
    },
    subText: {
        fontSize: theme.medium,
        color: theme.secondary,
        fontFamily: theme.pop,
        paddingLeft: 30
    },
    itemText: {
        fontSize: theme.medium,
        color: theme.secondary,
        fontFamily: theme.pop,
        paddingLeft: 10
    },
});