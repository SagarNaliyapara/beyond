//Order history screen design from the both panel
import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    ImageBackground,
    ScrollView,
    FlatList
} from "react-native";
import theme from '../../Theme'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Footer from '../../components/both/Footer'
import HeaderLong from '../../components/both/HeaderLong'
import HistoryCard from '../../components/both/HistoryCard'
//replace with your json data for order history
const orderHistory = [
    {
      id: '1',
      titleOne: 'Ahmed Abdali',
      subtitleOne:'Request New Items',
      titleTwo: 'Social Life Events',
      subtitleTwo:'Lorem ipsum is a sample dummy text so that he can display custom here.',
    },
    {
        id: '2',
        titleOne: 'Ahmed Abdali',
        subtitleOne:'Request New Items',
        titleTwo: 'Social Life Events',
        subtitleTwo:'Lorem ipsum is a sample dummy text so that he can display custom here.',
      },
      {
        id: '3',
        titleOne: 'Ahmed Abdali',
        subtitleOne:'Request New Items',
        titleTwo: 'Social Life Events',
        subtitleTwo:'Lorem ipsum is a sample dummy text so that he can display custom here. ',
      },
      {
        id: '4',
        titleOne: 'Ahmed Abdali',
        subtitleOne:'Request New Items',
        titleTwo: 'Social Life Events',
        subtitleTwo:'Lorem ipsum is a sample dummy text so that he can display custom here.',
      },

  ];


const OrderHistory = ()=> {
        return (
            <ImageBackground source={require('../../assets/bg.png')} style={styles.container}>
                <View style={styles.header}>
                    {/* this is the header component with 3 icons */}
                    <HeaderLong/>
                </View>
                <View style={styles.titleSpace}>
                     {/* space for title */}
                 <Text style={styles.title}>Order History</Text>
                </View>
                <View style={styles.body}>
                 
                    <FlatList
                    data={orderHistory}
                    renderItem={({ item }) => 
                 
                    <HistoryCard 
                    titleOne={item.titleOne} 
                    titleTwo={item.titleTwo}  
                    subtitleOne={item.subtitleOne} 
                    subtitleTwo={item.subtitleTwo}/>

                    }
                    keyExtractor={item => item.id}
                    />
                 
                </View>
                
            </ImageBackground>
        );
}
export default OrderHistory;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:Platform.OS === 'ios' ? 20 : 0,
    },
    header:{
        flex:1,
    },
    titleSpace:{
        flex:0.7,
        justifyContent:'center',
        paddingLeft:wp(6)
    },
    body:{
        flex:8,
        borderTopLeftRadius:40,
        borderTopRightRadius:40,
        backgroundColor:'#fff',
        paddingHorizontal:25
    },
    footer:{
        flex:1,
    },
    title:{
        fontSize:theme.xxl / 1.2,
        color:theme.titleColor,
        fontFamily:theme.pop
    }
});