import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    ImageBackground,
    ScrollView,
    FlatList,
    TouchableOpacity
} from "react-native";
import theme from '../../Theme'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import FooterSecretary from '../../components/secretary/FooterSecretary'
import HeaderLongSecretary from '../../components/secretary/HeaderLongSecretary'
import ClientCard from "../../components/secretary/ClientCard";


//replace with your json data for contacts
const clients = [
    {
      id: '1',
      name: 'Ahmed Abdali',
      title:'Development Here',
      mobile:'+9859349050',
      email: 'sampleemail@gmail.com',
      location:'Saudi Arabia'
    },
    {
        id: '2',
        name: 'Ahmed Abdali',
        title:'Development Here',
        mobile:'+9859349050',
        email: 'sampleemail@gmail.com',
        location:'Saudi Arabia'
      },
      {
        id: '3',
        name: 'Ahmed Abdali',
        title:'Development Here',
        mobile:'+9859349050',
        email: 'sampleemail@gmail.com',
        location:'Saudi Arabia'
      },

      {
        id: '4',
        name: 'Ahmed Abdali',
        title:'Development Here',
        mobile:'+9859349050',
        email: 'sampleemail@gmail.com',
        location:'Saudi Arabia'
      },

      {
        id: '5',
        name: 'Ahmed Abdali',
        title:'Development Here',
        mobile:'+9859349050',
        email: 'sampleemail@gmail.com',
        location:'Saudi Arabia'
      },

      {
        id: '6',
        name: 'Ahmed Abdali',
        title:'Development Here',
        mobile:'+9859349050',
        email: 'sampleemail@gmail.com',
        location:'Saudi Arabia'
      },
  

  ];


const Clients = ()=> {
        return (
            <ImageBackground source={require('../../assets/bg.png')} style={styles.container}>
                <View style={styles.header}>
                    {/* this is the header component with 2 icons */}
                    <HeaderLongSecretary />
                </View>
                <View style={styles.titleSpace}>
                     {/* space for title */}
                 <Text style={styles.title}>Clients</Text>
                </View>
                <View style={styles.body}>
                
                    {/* flat list to render contacts */}

                    <FlatList
                    data={clients}
                    renderItem={({ item }) => 
                    <ClientCard 
                    name={item.name} 
                    title={item.title}
                    mobile={item.mobile} 
                    email={item.email}
                    location={item.location}
                    />

                    }
                    keyExtractor={item => item.id}
                    />
                 
                </View>
            </ImageBackground>
        );
}
export default Clients;

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
        paddingHorizontal:25,
        paddingTop:10,
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
    },
    mainButton:{
        backgroundColor:theme.secondary,
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        height:hp(8),
        borderRadius:10,
        flexDirection:'row',
        marginTop:hp(4)
    },
    btnText:{
        color:'#fff',
        fontFamily:theme.pop,
        fontSize:theme.large,
        paddingLeft:wp(2)
    }
});