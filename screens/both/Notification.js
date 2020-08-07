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
import HeaderSmall from '../../components/both/HeaderSmall'
import NotificationCard from '../../components/both/NotificationCard'
//replace with your json data for order history
const notifications = [
    {
      id: '1',
      title: 'Ahmed Abdali',
      desc:'Lorem ipsum is a sample dummy text so that he can display custom here.',
      img: 'https://randomuser.me/api/portraits/men/11.jpg',
    },
    {
        id: '2',
        title: 'Ahmed Abdali',
        desc:'Lorem ipsum is a sample dummy text so that he can display custom here.',
        img: 'https://randomuser.me/api/portraits/men/11.jpg',
      },

      {
        id: '3',
        title: 'Ahmed Abdali',
        desc:'Lorem ipsum is a sample dummy text so that he can display custom here.',
        img: 'https://randomuser.me/api/portraits/men/11.jpg',
      },

      {
        id: '4',
        title: 'Ahmed Abdali',
        desc:'Lorem ipsum is a sample dummy text so that he can display custom here.',
        img: 'https://randomuser.me/api/portraits/men/11.jpg',
      },

      {
        id: '5',
        title: 'Ahmed Abdali',
        desc:'Lorem ipsum is a sample dummy text so that he can display custom here.',
        img: 'https://randomuser.me/api/portraits/men/11.jpg',
      },
  

  ];


const Notification = ()=> {
        return (
            <ImageBackground source={require('../../assets/bg.png')} style={styles.container}>
                <View style={styles.header}>
                    {/* this is the header component with 2 icons */}
                    <HeaderSmall leftIcon="menu" rightIcon="settings"/>
                </View>
                <View style={styles.titleSpace}>
                     {/* space for title */}
                 <Text style={styles.title}>Notification</Text>
                </View>
                <View style={styles.body}>
                    {/* flat list to render custom notifications, please use this component to filter out the list 
                    that you want to keep as "Now" and "Earlier" */}
                    <Text style={styles.justnowtext}>Just Now</Text>
                    <FlatList
                    data={notifications}
                    renderItem={({ item }) => 
                    <NotificationCard 
                    title={item.title} 
                    desc={item.desc} 
                    img={item.img}
                    />

                    }
                    keyExtractor={item => item.id}
                    />
                 
                </View>
                
            </ImageBackground>
        );
}
export default Notification;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:Platform.OS === 'ios' ? 24 : 0,
    },
    header:{
        flex:1,
    },
    titleSpace:{
        flex:1,
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
    },
    justnowtext:{
        paddingTop:hp(3),
        fontFamily:theme.pop,
        color:'#7c7c7c',
        fontSize:theme.small
    }
});