import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";

import theme from '../../Theme'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons, Feather, Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';


const StatusCardHold = (props) => {
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

            <View style={{ justifyContent: 'center', marginLeft: wp(2), marginTop: hp(1.5) }}>
                <View style={{ flexDirection: 'row' }}>
                    <Entypo name="cake" size={22} color={theme.primary} />
                    <Text style={styles.firstText}>Social Life Events</Text>
                </View>
                <Text style={styles.subText}>{props.desc}</Text>
            </View>



            <View style={{ flexDirection: 'row', marginTop: 5, justifyContent: 'space-evenly' }}>
                <TouchableOpacity style={styles.mainButton}>
                    <Text style={styles.btnText}>In Process</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.secondButton}>
                    <Feather name="trash" size={20} color={'#fff'} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.secondButton}>
                    <Feather name="message-circle" size={20} color={'#fff'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('MeetingForm')} style={styles.secondButton}>
                    <Feather name="eye" size={20} color={'#fff'} />
                </TouchableOpacity>
            </View>
        </View>
    );
}
export default StatusCardHold;

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
        marginTop: hp(1),
        marginLeft: wp(2),
        paddingHorizontal: 15
    },
    secondButton: {
        backgroundColor: theme.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        height: hp(6),
        borderRadius: 3,
        marginTop: hp(1),
        marginLeft: wp(2),
        paddingHorizontal: 15
    },
    btnText: {
        color: '#fff',
        fontFamily: theme.pop,
        fontSize: theme.large,
    },
    subText: {
        fontSize: theme.small,
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