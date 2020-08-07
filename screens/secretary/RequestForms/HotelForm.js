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
import theme from '../../../Theme'
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FooterSecretary from '../../../components/secretary/FooterSecretary'
import HeaderLongSecretary from "../../../components/secretary/HeaderLongSecretary";
import { Feather, SimpleLineIcons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
// Date picker Library : https://github.com/react-native-community/datetimepicker
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import helpers from "../../../components/styles/helpers";
import Actions from "../../../actions/creator";
import { connect } from "react-redux";
import Hotel_icon from "../../../assets/hotel.svg"
import Date_icon from "../../../assets/date.svg"
const textpadding = 8
class HotelForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDateTimePickerVisible: false,
            date: 'Pick Date',
            date2: 'Pick Date',
            hotel:"",
            city:"",
            notes:"",
            errorHotel:false,
            errorCity:false,
            errorInDate:false,
            errorOutDate:false,
            errorNotes:false



        };
    }

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = date => {
        this.hideDateTimePicker();
        this.formatDate(date)
    };

    formatDate = date => {
        var date = moment(date).utcOffset("+05:30").format("YYYY-MM-DD");
        console.log("date =====", date);
    
        // this.setState({time:`${time.getHours()}:${time.getMinutes()}`});
        return this.setState({
          date: date,
          errorInDate:false
        });
        
        // return this.setState({
        //     date: `${date.getDate()}/${date.getMonth() +
        //         1}/${date.getFullYear()}`
        // });
    };

    showDateTimePicker2 = () => {
        this.setState({ isDateTimePickerVisible2: true });
    };

    hideDateTimePicker2 = () => {
        this.setState({ isDateTimePickerVisible2: false });
    };

    handleDatePicked2 = date2 => {
        this.hideDateTimePicker2();
        this.formatDate2(date2)
    };

    formatDate2 = date => {
        var date = moment(date).utcOffset("+05:30").format("YYYY-MM-DD");
        console.log("date =====", date);
    
        // this.setState({time:`${time.getHours()}:${time.getMinutes()}`});
        return this.setState({
            date2: date,
            errorOutDate:false
        });

        // return this.setState({
        //     date2: `${date2.getDate()}/${date2.getMonth() +
        //         1}/${date2.getFullYear()}`
        // });
    };

    render() {


        const france = "https://pngimg.com/uploads/france/france_PNG89676.png"
        const { senderId } = this.props;

        return (
            <ImageBackground source={require('../../../assets/bg.png')} style={styles.container}>
                <View style={styles.header}>
                    {/* this is the header component with 2 icons */}
                    <HeaderLongSecretary />
                </View>
                <View style={styles.titleSpace}>
                    {/* space for title */}
                    <Text style={styles.title}>Request Form</Text>
                </View>




                <View style={styles.body}>

                    {/* This is entire white body container */}

                    <ScrollView>



                        <View style={styles.emailcontainer}>
                            <Hotel_icon height={helpers.size(17)} width={helpers.size(17)} />
                            <Text style={styles.placeholder}>Hotel</Text>
                        </View>
                        <View style={styles.inputfield}>
                            <TextInput maxLength={50}
                            onChangeText={(hotel) =>
                                this.setState({ hotel: hotel,errorHotel:false })
                              }
                             placeholder="Name here" style={styles.textinputstyle} />
                        </View>
                        {this.state.errorHotel == true ? (
              <View style={{ alignItems: "flex-end" }}>
                <Text style={{ color: "red" }}>please enter hotel name </Text>
              </View>
            ) : null}







                        <View style={styles.nextcontainer}>
                            <SimpleLineIcons name="location-pin" size={20} color={theme.primary} />
                            <Text style={styles.placeholder}>City</Text>
                        </View>
                        <View style={styles.inputfield}>
                            <TextInput maxLength={50}
                            onChangeText={(city) =>
                                this.setState({ city: city,errorCity:false })
                              }
                             placeholder="Doha,Qutor" style={styles.textinputstyle} />
                        </View>
                        {this.state.errorCity == true ? (
              <View style={{ alignItems: "flex-end" }}>
                <Text style={{ color: "red" }}>please enter city </Text>
              </View>
            ) : null}

                        




                        <View style={styles.nextcontainer}>
                            <Date_icon height={helpers.size(20)} width={helpers.size(20)} />
                            <Text style={styles.placeholder}>Check in date</Text>
                        </View>
                        <TouchableOpacity onPress={this.showDateTimePicker} style={styles.inputfield}>
                            <MaterialIcons style={{ paddingRight: 5 }} name="date-range" size={20} color={'#7c7c7c'} />
                            <Text style={styles.inputText}>{this.state.date}</Text>
                            <DateTimePicker
                                isVisible={this.state.isDateTimePickerVisible}
                                onConfirm={this.handleDatePicked}
                                onCancel={this.hideDateTimePicker}
                            />
                        </TouchableOpacity>
                        {this.state.errorInDate == true ? (
              <View style={{ alignItems: "flex-end" }}>
                <Text style={{ color: "red" }}>please pick date </Text>
              </View>
            ) : null}



                        <View style={styles.nextcontainer}>
                            <Date_icon height={helpers.size(20)} width={helpers.size(20)} />
                            <Text style={styles.placeholder}>Check out Date</Text>
                        </View>
                        <TouchableOpacity onPress={this.showDateTimePicker2} style={styles.inputfield}>
                            <MaterialIcons style={{ paddingRight: 5 }} name="date-range" size={20} color={'#7c7c7c'} />
                            <Text style={styles.inputText}>{this.state.date2}</Text>
                            <DateTimePicker
                                isVisible={this.state.isDateTimePickerVisible2}
                                onConfirm={this.handleDatePicked2}
                                onCancel={this.hideDateTimePicker2}
                            />
                        </TouchableOpacity>
                        {this.state.errorOutDate == true ? (
              <View style={{ alignItems: "flex-end" }}>
                <Text style={{ color: "red" }}>please pick date </Text>
              </View>
            ) : null}


                        <View style={styles.noteContainer}>
                            <MaterialCommunityIcons name="note-outline" size={20} color={theme.primary} />
                            <Text style={styles.placeholder}>Extra Note</Text>
                        </View>
                        <View style={styles.inputfield}>
                            <TextInput multiline={true}
                            onChangeText={(notes) =>
                                this.setState({ notes: notes,errorNotes:false })
                              }
                             maxLength={250} style={styles.textinputstyle} />
                        </View>
                        {this.state.errorNotes == true ? (
              <View style={{ alignItems: "flex-end" }}>
                <Text style={{ color: "red" }}>please enter extra notes </Text>
              </View>
            ) : null}





                        {/* Buttons start here */}

                        {/* empty view for height */}

                        <View style={{ height: hp(4) }}></View>

                        <TouchableOpacity onPress = {()=>{
                            if(this.state.hotel == ""){
                                this.setState({errorHotel:true})
                                return
                            }
                            else if(this.state.city == ""){
                                this.setState({errorCity:true})
                                return
                            }
                            else if(this.state.date == "Pick Date"){
                                this.setState({errorInDate:true})
                                return
                            }
                            else if(this.state.date2 == "Pick Date"){
                                this.setState({errorOutDate:true})
                                return
                            }
                            else if(this.state.notes == ""){
                                this.setState({errorNotes:true})
                                return
                            }
                           const  hotelData = {
                                sender_id:senderId,
                                name:this.state.hotel,
                                city:this.state.city,
                                check_in_date:this.state.date + " 00:00:00",
                                check_out_date:this.state.date2 + " 00:00:00",
                                note:this.state.notes
                            }
                            this.props.dispatch(Actions.hotelBookingCreateAttempt(hotelData));
                        }}
                        style={styles.backBtn}>
                            <Text style={styles.btntext}>Send request to Admin</Text>
                        </TouchableOpacity>

                        <View style={{ height: hp(3) }}></View>


                    </ScrollView>

                </View>


            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 24 : 0,
    },
    header: {
        flex: 1,
    },
    titleSpace: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: wp(6)
    },
    body: {
        flex: 8,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: '#fff',
        paddingHorizontal: 35,
        paddingVertical: 20
    },
    footer: {
        flex: 1,
    },
    title: {
        fontSize: theme.xxl / 1.2,
        color: theme.titleColor,
        fontFamily: theme.pop
    },
    nameTitle: {
        fontFamily: theme.popbold,
        color: theme.primary,
        fontSize: theme.large
    },
    caption: {
        fontFamily: theme.pop,
        color: theme.secondary,
        fontSize: theme.small
    },
    mainButton: {
        backgroundColor: theme.primary,
        justifyContent: 'center',
        alignItems: 'center',
        width: wp(30),
        height: hp(6),
        borderRadius: 3,
        flexDirection: 'row',
        marginTop: hp(2)
    },
    secondButton: {
        backgroundColor: theme.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        width: wp(30),
        height: hp(6),
        borderRadius: 3,
        flexDirection: 'row',
        marginTop: hp(2)
    },
    btnText: {
        color: '#fff',
        fontFamily: theme.popbold,
        fontSize: theme.large,
    },
    backgroundContainer: {
        backgroundColor: theme.transparentColor,
        flex: 1,
        borderRadius: 10,
        padding: 30
    },
    textinputstyle: {
        width: '100%',
        height: '100%',
        fontSize: theme.large
    },
    containerCard: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ede5d8',
        height: hp(11),
        width: wp(20),
        borderRadius: 10,
        marginTop: hp(1),
    },
    menutext: {
        color: theme.primary,
        fontSize: theme.small / 1.2,
        fontFamily: theme.pop,
        textAlign: 'center'
    },
    buttonContainer: {
        width: '100%',
        height: '24%',
        marginTop: StatusBar.currentHeight,
        justifyContent: 'space-between',
        paddingLeft: 25,
        paddingRight: 25,
        flexDirection: 'row',
        alignItems: 'center'
    },
    emailcontainer: { flexDirection: 'row', paddingTop: hp(3), paddingBottom: hp(1) },
    nextcontainer: { flexDirection: 'row', paddingTop: hp(3), paddingBottom: hp(1), alignItems: 'center' },
    noteContainer: { flexDirection: 'row', paddingTop: hp(3), paddingBottom: hp(1), alignItems: 'center' },
    placeholder: {
        color: theme.primary,
        paddingLeft: 10,
        fontFamily: theme.pop
    },
    inputfield: {
        backgroundColor: '#F3F3F3',
        width: '100%',
        paddingVertical: 15,
        borderRadius: 5,
        paddingLeft: 10,
        alignItems: 'center',
        flexDirection: 'row',
        paddingRight: 20
    },
    btntext: {
        fontSize: theme.large,
        color: '#fff',
        fontFamily: theme.pop
    },
    inputText: {
        fontFamily: theme.pop,
        fontSize: theme.medium
    },
    backBtn: {
        backgroundColor: theme.primary,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: hp(7.5),
        borderRadius: 5
    },
});
const mapStateToProps = (state) => {
    return {
      senderId: state.auth.user_id,
    };
  };
  
  export default connect(mapStateToProps, null)(HotelForm );