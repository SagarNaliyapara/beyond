import React, {Component, useEffect} from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    ScrollView,
    FlatList,
    TouchableOpacity,
    Image
} from "react-native";
import theme from '../../Theme'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import FooterSecretary from '../../components/secretary/FooterSecretary'
import HeaderLongSecretary from '../../components/secretary/HeaderLongSecretary'
import HeaderSmall from '../../components/both/HeaderSmall'
import {Feather} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import * as Permissions from "expo-permissions";
import {Notifications} from "expo";
import {useSelector} from "react-redux";


const Profile = ()=> {
    const navigation = useNavigation();
    const authRed = useSelector((state) => state.auth);
    const registerForPushNotificationsAsync = async () => {
        const {status: existingStatus} = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            return null;
        }
        return await Notifications.getExpoPushTokenAsync();
    }

    const tokenApiCall = (token) => {
        const options = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json",
                Authorization: "Bearer " + authRed.token,
                body: {
                    token: token
                }
            },
        };
        fetch("https://beyond-ksa.com/api/token/" + authRed.user_id, options)
            .then(red => red.json())
            .then(res => {
                toastRef.close();
                if (res.success) {
                    alert(res.success);
                }
            })
    }
    useEffect(() => {
        console.log("Profile  ----> ");
        registerForPushNotificationsAsync().then((token) => {
            if (token) {
                tokenApiCall(token)
            }
        });
    }, []);
    const sampleimg = 'https://randomuser.me/api/portraits/men/29.jpg'
        return (
            <ImageBackground source={require('../../assets/bg.png')} style={styles.container}>
                <View style={styles.header}>
                    {/* this is the header component with 2 icons */}
                    <HeaderLongSecretary leftIcon="menu" rightIcon="settings"/>
                </View>
                <View style={styles.body}>

                <ScrollView>

                    <View>
                        <View style={{flexDirection:'row',alignItems:'center',paddingBottom:hp(2)}}>
                        <Image source={{uri:sampleimg}} style={styles.img} />
                         <View>
                         <Text style={styles.name}>Secretary Name</Text>
                         </View>
                        </View>

                    </View>


                    {/* EMAIL and PHONE*/}
                    <View style={{padding:10,borderTopWidth:1,borderColor:'#e5e5e5',borderBottomWidth:1}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Feather name="mail" size={15} color={theme.primary}/>
                    <Text style={styles.placeholder}>devhere17@gmail.com</Text>
                    </View>
                    <View style={{height:20}}></View>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Feather name="phone" size={15} color={theme.primary}/>
                    <Text style={styles.placeholder}>+95849859458</Text>
                    </View>
                    </View>

                    {/* MENU ITEM*/}
                    <View style={{flexWrap:'wrap',flexDirection:'row',justifyContent:'space-between'}}>
                <TouchableOpacity onPress={()=>navigation.navigate('Clients')} style={styles.menuContainer}>
                     <Image source={require('../../assets/secretary_profile_icons/1.png')} style={{height:45,width:52}} />
                     <Text style={styles.menuTitle}>Clients</Text>
                     <Text style={styles.valueText}>2 Items</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate('RequestList')} style={styles.menuContainer}>
                     <Image source={require('../../assets/secretary_profile_icons/2.png')} style={{height:45,width:35}} />
                     <Text style={styles.menuTitle}>Requests</Text>
                     <Text style={styles.valueText}>2 Items</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate('Completed')} style={styles.menuContainer}>
                     <Image source={require('../../assets/secretary_profile_icons/3.png')} style={{height:45,width:45}} />
                     <Text style={styles.menuTitle}>Completed</Text>
                     <Text style={styles.valueText}>2 Items</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate('InProcess')} style={styles.menuContainer}>
                     <Image source={require('../../assets/secretary_profile_icons/4.png')} style={{height:45,width:55}} />
                     <Text style={styles.menuTitle}>In Process</Text>
                     <Text style={styles.valueText}>2 Items</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate('OrderHistory')} style={styles.menuContainer}>
                     <Image source={require('../../assets/secretary_profile_icons/5.png')} style={{height:45,width:45}} />
                     <Text style={styles.menuTitle}>Order History</Text>
                     <Text style={styles.valueText}>2 Items</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate('OnHold')} style={styles.menuContainer}>
                     <Image source={require('../../assets/secretary_profile_icons/6.png')} style={{height:45,width:52}} />
                     <Text style={styles.menuTitle}>On Hold</Text>
                     <Text style={styles.valueText}>2 Items</Text>
                    </TouchableOpacity>
                    </View>
                    {/* EMPTY VIEW FOR PADDING SPACE AT BELOW */}
                    <View style={{height:10}}></View>
                    </ScrollView>
                </View>
            </ImageBackground>
        );
}
export default Profile;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:Platform.OS === 'ios' ? 24 : 0,
    },
    header:{
        flex:1,
    },
    body:{
        flex:7.5,
        borderTopLeftRadius:40,
        borderTopRightRadius:40,
        backgroundColor:'#fff',
        paddingHorizontal:40,
        paddingTop:25,
    },
    footer:{
        flex:0.8,
    },

    img:{
        borderRadius:50,
        width:75,
        height:75
    },
    name:{
        fontFamily:theme.pop,
        fontSize:theme.xl,
        color:theme.primary,
        paddingLeft:wp(5)
    },
    title:{
        fontFamily:theme.pop,
        fontSize:theme.medium,
        color:theme.secondary,
        paddingLeft:wp(5)
    },
    placeholder:{
        fontFamily:theme.pop,
        fontSize:theme.medium,
        paddingLeft:10
    },
    menuContainer:{
        height:hp(18),
        backgroundColor:theme.transparentColor,
        width:wp(38),
        padding:15,
        marginTop:10,
        borderRadius:10,
    },
    menuTitle:{
        fontSize:theme.medium,
        color:theme.primary,
        fontFamily:theme.popbold,
        paddingTop:10
    },
    valueText:{
        fontSize:theme.small,
        color:theme.primary,
        fontFamily:theme.pop
    }

});






