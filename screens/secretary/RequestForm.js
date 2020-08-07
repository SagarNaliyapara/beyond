import React, { useState } from "react";
import { 
    View,
    Text,
    StyleSheet,
    ImageBackground,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Picker,
    StatusBar,
    Image
} from "react-native";
import theme from '../../Theme'
import { useNavigation } from '@react-navigation/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import FooterSecretary from '../../components/secretary/FooterSecretary'
import HeaderLongSecretary from "../../components/secretary/HeaderLongSecretary";
import {Feather,MaterialCommunityIcons,EvilIcons,Entypo} from '@expo/vector-icons'


const CreateRequest = ()=> {

    const france = "https://pngimg.com/uploads/france/france_PNG89676.png"

        return (
            <ImageBackground source={require('../../assets/bg.png')} style={styles.container}>
                <View style={styles.header}>
                    {/* this is the header component with 2 icons */}
                    <HeaderLongSecretary/>
                </View>
                <View style={styles.titleSpace}>
                     {/* space for title */}
                 <Text style={styles.title}>Create Request</Text>
                </View>




                <View style={styles.body}>

                      {/* This is entire white body container */}

                        <ScrollView contentContainerStyle={styles.signinContainerWhite}>
                        
                        {/* This is email container */}

                        <View style={styles.emailcontainer}>
                        <MaterialCommunityIcons name="email-outline" size={20} color={theme.primary} />
                        <Text style={styles.placeholder}>Client Information</Text>
                        </View>
                        <View style={styles.inputfield}>
                        <Text style={styles.inputText}>Smithjoe@gmail.com</Text>
                        <Feather name="lock" style={{marginRight:5}} size={20} color={'#7c7c7c'} />
                        </View>


                        {/* This is name container */}

                        <View style={styles.nextcontainer}>
                        <Feather name="user" size={20} color={theme.primary} />
                        <Text style={styles.placeholder}>Name</Text>
                        </View>
                        <View style={styles.inputfield}>
                        <Text style={styles.inputText}>Smith Joe</Text>
                        <Feather name="lock" style={{marginRight:5}} size={20} color={'#7c7c7c'} />
                        </View>


                        {/* This is phone number container */}

                        <View style={styles.nextcontainer}>
                        <MaterialCommunityIcons name="phone" size={20} color={theme.primary} />
                        <Text style={styles.placeholder}>Phone number</Text>
                        </View>
                        <View style={styles.inputfield}>
                       <View style={{flexDirection:'row',alignItems:'center'}}>
                       <Image source={{uri:france}} style={{height:18,width:18,marginRight:4}} />
                        <Text style={styles.inputText}>+85 9259509250</Text>
                       </View>
                        <Feather name="lock" style={{marginRight:5}} size={20} color={'#7c7c7c'} />
                        </View>
                        
                        {/* This is city container, edit your list of cities here */}

                        <View style={styles.nextcontainer}>
                        <EvilIcons name="location" size={20} color={theme.primary} />
                        <Text style={styles.placeholder}>City</Text>
                        </View>
                        <View style={styles.inputfield}>
                       
                        <Text style={styles.inputText}>Jeddah</Text>
                        <Feather name="lock" style={{marginRight:5}} size={20} color={'#7c7c7c'} />
                        </View>


                        
                        {/* This is work field container */}

                        <View style={styles.nextcontainer}>
                        <Entypo name="suitcase" size={15} color={theme.primary} />
                        <Text style={styles.placeholder}>Work Field</Text>
                        </View>
                        <View style={styles.inputfield}>
                        <Text style={styles.inputText}></Text>
                        <Feather name="lock" size={20} color={'#7c7c7c'} />
                        </View>     
                        
                        {/* This is note container */}

                        <View style={styles.nextcontainer}>
                        <MaterialCommunityIcons name="note-outline" size={20} color={theme.primary} />
                        <Text style={styles.placeholder}>Note</Text>
                        </View>
                        <View style={styles.inputfield}>
                        <Text style={styles.inputText}></Text>
                        <Feather name="lock" size={20} color={'#7c7c7c'} />
                        </View>
                        
                        {/* This is title container */}

                        <View style={styles.nextcontainer}>
                        <Feather name="user" size={20} color={theme.primary} />
                        <Text style={styles.placeholder}>Title</Text>
                        </View>
                        <View style={styles.inputfield}>
                        <Text style={styles.inputText}></Text>
                        <Feather name="lock" size={20} color={'#7c7c7c'} />
                        </View>




                        {/*  accept terms container  */}


                        {/* Buttons start here */}

                        {/* empty view for height */}

                        <View style={{height:hp(4)}}></View>

                        <TouchableOpacity style={styles.backBtn}>
                        <Text style={styles.btntext}>BACK</Text>
                        </TouchableOpacity>

                        <View style={{height:hp(3)}}></View>


                        </ScrollView>

                </View>

            </ImageBackground>
        );
}
export default CreateRequest;

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
        paddingHorizontal:35,
        paddingVertical:35
    },
    footer:{
        flex:1,
    },
    title:{
        fontSize:theme.xxl / 1.2,
        color:theme.titleColor,
        fontFamily:theme.pop
    },
    nameTitle:{
        fontFamily:theme.popbold,
        color:theme.primary,
        fontSize:theme.large
    },
    caption:{
        fontFamily:theme.pop,
        color:theme.secondary,
        fontSize:theme.small
    },
    mainButton:{
        backgroundColor:theme.primary,
        justifyContent:'center',
        alignItems:'center',
        width:wp(30),
        height:hp(6),
        borderRadius:3,
        flexDirection:'row',
        marginTop:hp(2)
    },
    secondButton:{
        backgroundColor:theme.secondary,
        justifyContent:'center',
        alignItems:'center',
        width:wp(30),
        height:hp(6),
        borderRadius:3,
        flexDirection:'row',
        marginTop:hp(2)
    },
    btnText:{
        color:'#fff',
        fontFamily:theme.popbold,
        fontSize:theme.large,
    },
    backgroundContainer:{
        backgroundColor:theme.transparentColor,
        flex:1,
        borderRadius:10,
        padding:30
    },
    containerCard: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#ede5d8',
        height:hp(11),
        width:wp(20),
        borderRadius:10,
        marginTop:hp(1),
    },
    menutext:{
        color:theme.primary,
        fontSize:theme.small / 1.2,
        fontFamily:theme.pop,
        textAlign:'center'
    },
    buttonContainer:{
        width:'100%',
        height:'24%',
        marginTop:StatusBar.currentHeight,
        justifyContent:'space-between',
        paddingLeft:25,
        paddingRight:25,
        flexDirection:'row',
        alignItems:'center'
    },
    emailcontainer:{flexDirection:'row',paddingTop:hp(3),paddingBottom:hp(1)},
    nextcontainer:{flexDirection:'row',paddingTop:hp(3),paddingBottom:hp(1),alignItems:'center'},
    placeholder:{
        color:theme.primary,
        paddingLeft:10,
        fontFamily:theme.pop
    },
    inputfield:{
        backgroundColor:'#F3F3F3',
        width:'100%',
        height:hp(6.5),
        borderRadius:5,
        paddingLeft:10,
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingRight:10
    },
    btntext:{
        fontSize:theme.xl,
        color:'#fff',
        fontFamily:theme.popbold
    },
    inputText:{
        fontFamily:theme.pop,
        fontSize:theme.large
    },
    backBtn:{
        backgroundColor:theme.primary,
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        height:hp(7.5),
        borderRadius:5
    },
});