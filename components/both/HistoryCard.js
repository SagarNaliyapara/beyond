

import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import theme from "../../Theme";
import {Feather,MaterialCommunityIcons} from '@expo/vector-icons'
const HistoryCard = (props)=> {
        return (
            <View style={styles.container}>
                <View style={styles.upperEntry}>
                    <Feather name="user" size={20} color ={theme.primary}/>
                    <View>
                    <Text style={styles.title}>{props.titleOne}</Text>
                    <Text style={styles.subtitle}>{props.subtitleOne}</Text>
                    </View>
                </View>
                <View style={styles.lowerEntry}>
                    <MaterialCommunityIcons name="cupcake" size={20} color ={theme.primary}/>
                    <View>
                    <Text style={styles.title}>{props.titleTwo}</Text>
                    <Text style={styles.subtitle}>{props.subtitleTwo}</Text>
                    </View>
                </View>
            </View>
        );
}
export default HistoryCard;

const styles = StyleSheet.create({
    container: {
       width:'100%',
       backgroundColor:'#f5efe5',
       marginTop:hp(2),
       borderRadius:5,
       paddingBottom:15
    },
    upperEntry:{
        width:'100%',
        flexDirection:'row',
        paddingLeft:20,
        paddingTop:hp(3),
        paddingRight:20
    } ,
    lowerEntry:{
        width:'100%',
        flexDirection:'row',
        paddingLeft:20,
        paddingTop:hp(1.5),
        paddingRight:20
    },
    title:{
        fontSize:theme.large,
        color:theme.primary,
        fontFamily:theme.pop,
        paddingLeft:10
    },
    subtitle:{
        fontSize:theme.small,
        color:theme.secondary,
        fontFamily:theme.pop,
        paddingLeft:10
    }

});