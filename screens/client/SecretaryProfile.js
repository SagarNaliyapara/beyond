import React, { Component } from "react";
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
import Footer from '../../components/both/Footer'
import HeaderSmall from '../../components/both/HeaderSmall'
import {Feather} from '@expo/vector-icons'


const SecretaryProfile = ()=> {
    const sampleimg = 'https://randomuser.me/api/portraits/men/29.jpg'
        return (
            <ImageBackground source={require('../../assets/bg.png')} style={styles.container}>
                <View style={styles.header}>
                    {/* this is the header component with 2 icons */}
                    <HeaderSmall leftIcon="menu" rightIcon="settings"/>
                </View>
                <View style={styles.body}>
                


                    <View style={{flexDirection:'row',alignItems:'center',paddingBottom:hp(2)}}>
                    <Image source={{uri:sampleimg}} style={styles.img} />
                    <Text style={styles.name}>Secretary Name</Text>
                    </View>

                    {/* ENTRY CONTAINER STARTS*/}
                    <View>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Feather name="mail" size={15} color={theme.primary}/>
                    <Text style={styles.placeholder}>Email</Text>
                    </View>
                    <View style={styles.infoContainer}>
                    <Text style={styles.innerText}>Info@gmail.com</Text>
                    <Feather name="lock" size={15} color={'#7c7c7c'}/>
                    </View>
                    </View>
                    {/* ENTRY CONTAINER ENDS*/}

                    
                    {/* ENTRY CONTAINER STARTS*/}
                    <View>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Feather name="user" size={15} color={theme.primary}/>
                    <Text style={styles.placeholder}>Secretary Title</Text>
                    </View>
                    <View style={styles.infoContainer}>
                    <Text style={styles.innerText}>My Secretary Title</Text>
                    <Feather name="lock" size={15} color={'#7c7c7c'}/>
                    </View>
                    </View>
                    {/* ENTRY CONTAINER ENDS*/}


                    
                    {/* ENTRY CONTAINER STARTS*/}
                    <View>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Feather name="phone" size={15} color={theme.primary}/>
                    <Text style={styles.placeholder}>Phone number</Text>
                    </View>
                    <View style={styles.infoContainer}>
                    <Text style={styles.innerText}>+8571585959</Text>
                    <Feather name="lock" size={15} color={'#7c7c7c'}/>
                    </View>
                    </View>
                    {/* ENTRY CONTAINER ENDS*/}

                    
                    {/* ENTRY CONTAINER STARTS*/}
                    <View>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Feather name="message-circle" size={15} color={theme.primary}/>
                    <Text style={styles.placeholder}>Description</Text>
                    </View>
                    <View style={styles.infoContainerDescription}>
                    <View style={{width:'95%'}}>
                    <Text style={styles.innerText}>Lorem ipsum is just a dummy text which will get replaced with your original text</Text>
                    </View>
                    <Feather name="lock" size={15} color={'#7c7c7c'}/>
                    </View>
                    </View>
                    {/* ENTRY CONTAINER ENDS*/}


                     {/* WARNING MESSAGE */}

                     <View style={styles.warningContaienr}>
                        <Text style={styles.warningtext}>If you want to report your secretary, please contact us</Text>
                     </View>
                 
                </View>
            </ImageBackground>
        );
}
export default SecretaryProfile;


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
        paddingHorizontal:25,
        paddingTop:25,
        justifyContent:'space-around'
    },
    footer:{
        flex:0.8,
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
    },
    img:{
        borderRadius:50,
        width:56,
        height:56
    },
    name:{
        fontFamily:theme.pop,
        fontSize:theme.xl,
        color:theme.secondary,
        paddingLeft:wp(5)
    },
    inputFieldContainer:{
        width:'100%',
        height:hp(20),
        borderBottomColor:'#e5e5e5',
        borderBottomWidth:1
    },
    placeholder:{
        color:theme.primary,
        fontSize:theme.small,
        fontFamily:theme.pop,
        paddingLeft:wp(1.5)
    },
    infoContainer:{
        width:'100%',
        borderBottomWidth:1,
        borderBottomColor:'#e5e5e5',
        height:hp(5),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    infoContainerDescription:{
        width:'100%',
        borderBottomWidth:1,
        borderBottomColor:'#e5e5e5',
        height:hp(10),
        flexDirection:'row',
        justifyContent:'space-between'
    },
    innerText:{
        fontFamily:theme.pop,
        fontSize:theme.medium,
        textAlign:'left',
        flexWrap:'wrap'
    },
    warningContaienr:{
        marginBottom:hp(3),
        height:hp(10),
        width:'100%',
        backgroundColor:theme.transparentColor,
        borderRadius:5,
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:25
    },
    warningtext:{
        fontSize:theme.medium,
        fontFamily:theme.pop,
    }
});






