import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";

import theme from '../../Theme'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons, Feather, Entypo, FontAwesome5, AntDesign, MaterialIcons } from '@expo/vector-icons'
import Dialog, { DialogContent } from 'react-native-popup-dialog';

const StatusCardProcess = (props) => {
    const [visible, setVisible] = useState(false);

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










            {/* POPUP CODE STARTS HERE, all with inline styling,so its easy to copy and paste */}


            <Dialog
                visible={visible}
                onTouchOutside={() => {
                    setVisible(false);
                }}
            >
                <DialogContent style={{ height: hp(25), width: wp('85%'), justifyContent: 'center', alignItems: 'center' }}>


                    <TouchableOpacity
                        onPress={() => setVisible(false)}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '80%',
                            backgroundColor: theme.primary,
                            height: hp(7),
                            borderRadius: 5,

                            marginTop: wp(4),
                        }}
                    >
                        <Text style={{ color: '#fff', fontFamily: theme.pop }}>Delete</Text>
                    </TouchableOpacity>



                    <TouchableOpacity
                        onPress={() => setVisible(false)}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '80%',
                            backgroundColor: theme.secondary,
                            height: hp(7),
                            borderRadius: 5,
                            marginTop: wp(2),
                        }}
                    >
                        <Text style={{ color: '#fff', fontFamily: theme.pop }}>Cancel</Text>
                    </TouchableOpacity>


                </DialogContent>
            </Dialog>


            {/* POPUP CODE ENDS HERE */}























            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <TouchableOpacity style={styles.mainButton}>
                    <Text style={styles.btnText}>Completed</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.secondButton}>
                    <FontAwesome5 name="hourglass" size={20} color={'#fff'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setVisible(true)} style={styles.secondButton}>
                    <Feather name="trash" size={20} color={'#fff'} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.secondButton}>
                    <Feather name="eye" size={20} color={'#fff'} />
                </TouchableOpacity>
            </View>
        </View>
    );
}
export default StatusCardProcess;

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