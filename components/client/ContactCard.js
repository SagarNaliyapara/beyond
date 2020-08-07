import React, { Component } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { 
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import theme from "../../Theme";
import Actions from "../../actions/creator"
import { AntDesign } from "@expo/vector-icons";
import {Feather,MaterialCommunityIcons} from '@expo/vector-icons'

const ContactCard = (props)=> {
    const dispatch = useDispatch();
        return (
            <View style={[styles.container,props.locale == "ar" && { flexDirection: "row-reverse" }]}>
                <View style={[styles.leftEntry,props.locale == "ar" && {alignItems:"flex-end"}]}>
                    <Text style={[styles.title]}>Name: {props.name}</Text>
                    <Text style={styles.subtitle}>Mobile: {props.mobile}</Text>
                    {/* <Text style={styles.subtitle}>Email : {props.email}</Text> */}
                </View>
                <View style={styles.rightEntry}>
                    <Image source={{uri:props.img}} style={styles.img} />
                </View>
                <View style ={{paddingLeft:10}}>
                <TouchableOpacity onPress={()=>{ dispatch(Actions.deleteContact(props.id,props.user_id))}}
                 style ={{height:20,width:30,}}>
                <AntDesign name="close" size={17} color="#CEB07C" />
                </TouchableOpacity>
                </View>
            </View>
        );
}
export default ContactCard;

const styles = StyleSheet.create({
    container: {
       width:'100%',
       height:hp(13),
       backgroundColor:theme.transparentColor,
       marginTop:hp(2),
       borderRadius:10,
       borderWidth:1,
       borderColor:theme.primary,
       flexDirection:'row',
       marginBottom:hp(1),
       paddingLeft:15,
    },
    leftEntry:{
        width:'70%',
        height:'100%',
        justifyContent:'center',
        paddingRight:wp(5),
       
       
    } ,
    rightEntry:{
        width:'20%',
        height:'100%',
        justifyContent:'center',

    },
    title:{
        fontSize:theme.large,
        color:theme.primary,
        fontFamily:theme.pop,
        paddingLeft:10,
        textAlign:"left"
    },
    subtitle:{
        fontSize:theme.medium / 1.2,
        color:theme.secondary,
        fontFamily:theme.pop,
        paddingLeft:10
    },
    img:{
        borderRadius:50,
        height:50,
        width:50
    }

});