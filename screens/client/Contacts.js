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
import { connect, useSelector, useDispatch } from "react-redux";
import theme from '../../Theme'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Footer from '../../components/both/Footer'
import HeaderSmall from '../../components/both/HeaderSmall'
import ContactCard from '../../components/client/ContactCard'
import { useNavigation } from '@react-navigation/native';


//replace with your json data for contacts
const contacts = [
    {
      id: '1',
      name: 'Ahmed Abdali',
      mobile:'+9859349050',
      email: 'sampleemail@gmail.com',
      img: 'https://randomuser.me/api/portraits/men/11.jpg',
    },
    {
        id: '2',
        name: 'Ahmed Abdali',
        mobile:'+9859349050',
        email: 'sampleemail@gmail.com',
        img: 'https://randomuser.me/api/portraits/men/11.jpg',
      },

      {
        id: '3',
        name: 'Ahmed Abdali',
        mobile:'+9859349050',
        email: 'sampleemail@gmail.com',
        img: 'https://randomuser.me/api/portraits/men/11.jpg',
      },

      {
        id: '4',
        name: 'Ahmed Abdali',
        mobile:'+9859349050',
        email: 'sampleemail@gmail.com',
        img: 'https://randomuser.me/api/portraits/men/11.jpg',
      },

      {
        id: '5',
        name: 'Ahmed Abdali',
        mobile:'+9859349050',
        email: 'sampleemail@gmail.com',
        img: 'https://randomuser.me/api/portraits/men/11.jpg',
      },
  

  ];


const Contacts = ()=> {
    const navigation = useNavigation();
    const appRed = useSelector((state) => state.app);

        return (
            <ImageBackground source={require('../../assets/bg.png')} style={styles.container}>
                <View style={styles.header}>
                    {/* this is the header component with 2 icons */}
                    <HeaderSmall leftIcon="arrow-left" rightIcon="settings"/>
                </View>
                <View style={[styles.titleSpace,appRed.locale == "ar" && {alignItems:"flex-end",paddingRight:wp(6)}]}>
                     {/* space for title */}
                 <Text style={styles.title}>Contacts</Text>
                </View>
                <View style={styles.body}>
                

                    {/*  button starts here  */}

                       <TouchableOpacity 
                           onPress={() => navigation.navigate("addContact")}
                    
                       style={styles.mainButton}>
                        <Text style={styles.btnText}>+ Add new Contact Number</Text>
                       </TouchableOpacity>

                    {/*  button ends here  */}

                    {/* flat list to render contacts */}

                    <FlatList
                    data={appRed.contactsData}
                    renderItem={({ item }) => 
                    <ContactCard 
                    locale={appRed.locale}
                    id={item.id}
                    user_id={item.user_id}
                    name={item.contact_name} 
                    mobile={item.contact_no} 
                    email={""}
                    img={contacts[0].img}
                    />

                    }
                    keyExtractor={item => item.id}
                    />
                 
                </View>
                
            </ImageBackground>
        );
}
export default Contacts;

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