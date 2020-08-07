import React, { useState,useEffect } from "react";
import { 
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Image,
    FlatList,
    TouchableOpacity
} from "react-native";
import { connect, useSelector, useDispatch } from "react-redux";
import theme from '../../Theme'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Footer from '../../components/both/Footer'
import HeaderLong from '../../components/both/HeaderLong'
import {AntDesign,Feather,MaterialIcons} from '@expo/vector-icons'
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import { useNavigation } from '@react-navigation/native';
import Actions from "../../actions/creator"


const textpadding = 8
//replace with your json
const DATA = [
    {
      id: '1',
      service: 'Service',
      time:'5:00 PM',
      date:'30 Mar 2020',
      status:'{status_here}'

    },
    {
        id: '2',
        service: 'Service',
        time:'5:00 PM',
        date:'30 Mar 2020',
        status:'{status_here}'
  
      },
      {
        id: '3',
        service: 'Service',
        time:'5:00 PM',
        date:'30 Mar 2020',
        status:'{status_here}'
  
      },
      {
        id: '4',
        service: 'Service',
        time:'5:00 PM',
        date:'30 Mar 2020',
        status:'{status_here}'
  
      },
      {
        id: '5',
        service: 'Service',
        time:'5:00 PM',
        date:'30 Mar 2020',
        status:'{status_here}'
  
      },
      {
        id: '6',
        service: 'Service',
        time:'5:00 PM',
        date:'30 Mar 2020',
        status:'{status_here}'
  
      },
      
  ];
  

const SecondaryServices = ()=> {
    const [visible,setVisible] = useState(false);
    const [appRedData,setAppRedData] = useState(null)
    const [isCalled,setIsCalled] = useState("false");
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const authRed =  useSelector((state) => state.auth);
    const appRed =  useSelector((state) => state.app);

    const socialServiceData = {
        user_id:authRed.user_id,
        request_type:"social_services"
    }
   
   
    useEffect(() => {
      
       if(isCalled == "false"){
       dispatch(Actions.getSecondaryServiceAttempt(socialServiceData))
       }
       setIsCalled("true")
        
      })
    //   alert(JSON.stringify(appRed.requestData))
   









        return (
            <ImageBackground source={require('../../assets/bg.png')} style={styles.container}>
                <View style={styles.header}>
                    {/* this is the header component with 3 icons */}
                    <HeaderLong/>
                </View>



                <View style={styles.titleSpace}>
                     {/* space for title */}
                 <Text style={styles.title}>Secondary Services</Text>
                </View>



                <View style={styles.body}>

                    {/*  button starts here  */}
                    {authRed.userType == "secretary" ?

                        <TouchableOpacity onPress={()=>navigation.navigate('ServicesForm')} style={styles.topButton}>
                        <Text style={styles.btnText}>+ Add New Request</Text>
                       </TouchableOpacity>:null }

                    {/*  button ends here  */}


                <FlatList
                data={appRed.secondaryServiceData}
                renderItem={({ item }) =>


                <View style={styles.itemContainer}>
                     <View style={{flexDirection:'row',alignItems:'center',marginLeft:wp(2)}}>
                     <Feather name="globe" size={24} color={theme.primary} />
                     <Text style={styles.firstText}>{item.name}</Text>
                     </View>
                     
                    <View style={{flexDirection:'row'}}>
                         <View style={{width:'50%',paddingLeft:10,paddingTop:15}}>
                             <View style={{flexDirection:'row'}}>
                             <Feather name="clock" size={20} color={theme.primary} />
                             <Text style={styles.firstText}>Time</Text>
                             </View>
                             <Text style={styles.firstSubText}>{item.time}</Text>
                         </View>
                         <View style={{width:'50%',paddingLeft:10,paddingTop:15}}>
                             <View style={{flexDirection:'row'}}>
                              <MaterialIcons name="date-range" size={20} color={theme.primary} />
                              <Text style={styles.firstText}>Date</Text>
                             </View>
                             <Text style={styles.firstSubText}>{item.date}</Text>
                         </View>
                     </View>

                     <View style={{flexDirection:'row'}}>
                     <TouchableOpacity onPress={() => {setVisible(true),setAppRedData(item)}} style={styles.mainButton}>
                     <Text style={styles.btnText}>status_here</Text>
                     </TouchableOpacity>
                     <TouchableOpacity onPress={() => navigation.navigate("ChatTab")}
                     style={styles.secondButton}>
                      <Feather name="message-circle" size={20} color={'#fff'} />
                     </TouchableOpacity>
                     </View>    
                </View>



                }
                keyExtractor={item => item.id} />

                  
                            
                </View>






                     {/* POPUP CODE STARTS HERE, all with inline styling,so its easy to copy and paste */}
{appRedData ? 
                     <Dialog
                        visible={visible}
                        onTouchOutside={() => {
                        setVisible(false);
                        }}
                        >
                        <DialogContent style={{height:hp(60),width:wp('85%'),justifyContent:'space-evenly'}}>

                        <View style={{height:hp(10),flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                            <Text style={{fontFamily:theme.pop,color:theme.primary,fontSize:theme.xl,paddingLeft:wp(6),}}>Information</Text>
                            <TouchableOpacity onPress={()=> setVisible(false)}><AntDesign name="close" color={theme.primary} size={24} /></TouchableOpacity>
                        </View>


                         {/* Full container*/}

                         <View style={{marginTop:hp(1.5),marginLeft:wp(7),width:'80%',height:hp(7),borderBottomColor:'#e5e5e5',borderBottomWidth:1}}>
                                                
                             <View style={{flexDirection:'row'}}>
                             <Feather name="globe" size={15} color={theme.primary} />
                             <Text style={{paddingLeft:5,fontFamily:theme.pop,color:theme.primary,fontSize:theme.small}}>Service Name</Text>
                             </View>
                    <Text style={{paddingLeft:5,fontFamily:theme.pop,color:theme.secondary,fontSize:theme.medium,paddingTop: textpadding}}>{appRedData.name}</Text>
                         
                         </View>

                         {/* Full container*/}


                         {/* half container*/}

                       <View style={{flexDirection:'row',marginTop:hp(1.5)}}>
                         <View style={{marginLeft:wp(7),width:'40%',height:hp(7),borderBottomColor:'#e5e5e5',borderBottomWidth:1}}>
                             
                             <View style={{flexDirection:'row'}}>
                             <Feather name="clock" size={15} color={theme.primary} />
                             <Text style={{paddingLeft:5,fontFamily:theme.pop,color:theme.primary,fontSize:theme.small}}>Time</Text>
                             </View>
                    <Text style={{paddingLeft:5,fontFamily:theme.pop,color:theme.secondary,fontSize:theme.medium,paddingTop: textpadding}}>{appRedData.time}</Text>
                        
                         </View>
                         <View style={{marginLeft:wp(1),width:'40%',height:hp(7),borderBottomColor:'#e5e5e5',borderBottomWidth:1}}>
                             
                             <View style={{flexDirection:'row'}}>
                             <MaterialIcons name="date-range" size={15} color={theme.primary} />
                             <Text style={{paddingLeft:5,fontFamily:theme.pop,color:theme.primary,fontSize:theme.small}}>Date</Text>
                             </View>
                    <Text style={{paddingLeft:5,fontFamily:theme.pop,color:theme.secondary,fontSize:theme.medium,paddingTop: textpadding}}>{appRedData.date}</Text>
                        
                         </View>
                        </View>
                        {/* half container*/}





                            {/* Full container*/}

                            <View style={{paddingRight:5,marginTop:hp(1.5),marginLeft:wp(7),width:'80%',height:hp(12),borderBottomColor:'#e5e5e5',borderBottomWidth:1}}>
                             
                             <View style={{flexDirection:'row'}}>
                             <Feather name="file" size={15} color={theme.primary} />
                             <Text style={{paddingLeft:5,fontFamily:theme.pop,color:theme.primary,fontSize:theme.small}}>Information</Text>
                             </View>
                    <Text style={{paddingLeft:5,fontFamily:theme.pop,color:theme.secondary,fontSize:theme.small / 1,paddingTop: textpadding}}>{appRedData.description}</Text>
                         
                            </View>

                            {/* Full container*/}




                        {/* Full container*/}

                         {/* Button Done*/}

                         <TouchableOpacity
                         onPress={()=> setVisible(false)}
                         style={{
                             justifyContent:'center',
                             alignItems:'center',
                             width:'80%',
                             backgroundColor:theme.primary,
                             height:hp(7),
                             borderRadius:5,
                             marginLeft:wp(7),
                             marginTop:wp(2),
                        }}
                         >
                         <Text style={{color:'#fff',fontFamily:theme.pop}}>Done</Text>
                         </TouchableOpacity>

                        </DialogContent>
                    </Dialog> : null }


                    {/* POPUP CODE ENDS HERE */}





            </ImageBackground>
        );
}
export default SecondaryServices;

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
        paddingTop:25
    },
    footer:{
        flex:1,
    },
    title:{
        fontSize:theme.xxl / 1.2,
        color:theme.titleColor,
        fontFamily:theme.pop
    },
    itemContainer:{
        backgroundColor:theme.transparentColor,
        width:'100%',
        borderRadius:10,
        marginTop:hp(2),
        padding:25,
        marginBottom:hp(1)
    },
    topButton:{
        backgroundColor:theme.secondary,
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        height:hp(8),
        borderRadius:10,
        flexDirection:'row',
        marginBottom:hp(1)
    },
    featureText:{
        color:theme.secondary,
        fontFamily:theme.pop,
        fontSize:theme.medium,
        paddingLeft:wp(4),
        paddingTop:hp(1)
    },
    firstText:{
        fontSize:theme.large,
        color:theme.primary,
        fontFamily:theme.pop,
        paddingLeft:10
    },
    firstSubText:{
        fontSize:theme.xl,
        color:theme.secondary,
        fontFamily:theme.pop,
        top:hp(1)
    },
    secondSubText:{
        fontSize:theme.xl,
        color:theme.secondary,
        fontFamily:theme.pop,
        paddingLeft:wp(6),
        position:'absolute',
        right:wp(12),
        top:hp(13),
    },
    mainButton:{
        backgroundColor:theme.primary,
        justifyContent:'center',
        alignItems:'center',
        height:hp(6),
        borderRadius:3,
        width:'70%',
        marginTop:hp(1),
        marginLeft:wp(2)
    },
    secondButton:{
        backgroundColor:theme.secondary,
        justifyContent:'center',
        alignItems:'center',
        height:hp(6),
        borderRadius:3,
        width:'20%',
        marginTop:hp(1),
        marginLeft:wp(2)
    },
    btnText:{
        fontSize:theme.medium,
        color:'#fff',
        fontFamily:theme.pop,
    }
});