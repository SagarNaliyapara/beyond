import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    FlatList,
    TouchableOpacity
} from "react-native";
import theme from '../../Theme'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Footer from '../../components/both/Footer'
import HeaderLong from '../../components/both/HeaderLong'
import { Feather, MaterialIcons, AntDesign } from '@expo/vector-icons'
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import CalendarPicker from 'react-native-calendar-picker';
import { ScrollView } from "react-native-gesture-handler";
import Actions from "../../actions/creator";
import { connect } from "react-redux";



const textpadding = 8
//replace with your json
const DATA = [
    {
        id: '1',
        userName: 'Mohommad',
        time: '5:00 PM',
        date: '30 Mar 2020',
        status: '{status_here}',
        desc: 'Lorem ipsum is sample'

    },
    {
        id: '2',
        userName: 'Mohommad',
        time: '5:00 PM',
        date: '30 Mar 2020',
        status: '{status_here}',
        desc: 'Lorem ipsum is sample'


    },
    {
        id: '3',
        userName: 'Mohommad',
        time: '5:00 PM',
        date: '30 Mar 2020',
        status: '{status_here}',
        desc: 'Lorem ipsum is sample'

    },
    {
        id: '4',
        userName: 'Mohommad',
        time: '5:00 PM',
        date: '30 Mar 2020',
        status: '{status_here}',
        desc: 'Lorem ipsum is sample'

    },
    {
        id: '5',
        userName: 'Mohommad',
        time: '5:00 PM',
        date: '30 Mar 2020',
        status: '{status_here}',
        desc: 'Lorem ipsum is sample'

    },
    {
        id: '6',
        userName: 'Mohommad',
        time: '5:00 PM',
        date: '30 Mar 2020',
        status: '{status_here}',
        desc: 'Lorem ipsum is sample'

    },

];

//Calendar Library link :  https://www.npmjs.com/package/react-native-calendar-picker

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedStartDate: null,
            visible: false,
            itemData: null
        };
        this.onDateChange = this.onDateChange.bind(this);
    }



    async componentWillMount() {
        const { senderId } = this.props;
        const calenderData = {
            user_id: senderId,
            request_type: "appointments"
        }

        // this.props.dispatch(Actions.getCitiesAttempt());
        this.props.dispatch(Actions.getCalenderAttempt(calenderData));
        // alert(JSON.stringify(calenderData))

    }






    onDateChange(date) {
        this.setState({
            selectedStartDate: date,
        });
    }
    render() {
        const { selectedStartDate } = this.state;
        const { calendarData } = this.props;
        const startDate = selectedStartDate ? selectedStartDate.toString() : '';
        // alert(JSON.stringify(requestData))


        return (
            <ImageBackground source={require('../../assets/bg.png')} style={styles.container}>
                <View style={styles.header}>
                    {/* this is the header component with 3 icons */}
                    <HeaderLong />
                </View>
                <View style={styles.titleSpace}>
                    {/* space for title */}
                    <Text style={styles.title}>Calendar</Text>
                </View>
                <View style={styles.body}>
                    <ScrollView stle={{ flex: 1, padding: 5 }}>

                        {/* For props : https://www.npmjs.com/package/react-native-calendar-picker*/}
                        <CalendarPicker
                            selectedDayColor={theme.primary}
                            onDateChange={this.onDateChange}
                        />

                        <FlatList
                            data={calendarData}
                            renderItem={({ item }) =>
                                <View
                                    style={styles.itemContainer}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Feather name="user" size={24} color={theme.primary} />
                                        <Text style={styles.firstText}>{item.name}</Text>
                                    </View>
                                    <Text style={styles.firstSubText}>{item.desc}</Text>
                                    <View style={{alignSelf:'center',  width:"60%", flexDirection: "row", justifyContent: 'space-between', alignItems:'center' }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                                            <MaterialIcons name="date-range" size={20} color={theme.primary} />
                                            <Text style={styles.thirdSubText}>{item.date}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <MaterialIcons name="access-time" size={20} color={theme.primary} />
                                            <Text style={styles.secondSubText}>{item.time}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: "row", paddingTop: 10 }}>
                                        <TouchableOpacity onPress={() => {
                                            this.setState({ visible: true, itemData: item });
                                        }} style={styles.mainButton}>
                                            <Text style={styles.btnText}>status_here</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            }
                            keyExtractor={item => item.id} />

                    </ScrollView>






                    {/* POPUP CODE STARTS HERE, all with inline styling,so its easy to copy and paste */}

                    {this.state.itemData ?
                        <Dialog
                            visible={this.state.visible}
                            onTouchOutside={() => {
                                this.setState({ visible: false });
                            }}
                        >
                            <DialogContent style={{ height: hp(70), width: wp('85%') }}>

                                <View style={{ height: hp(10), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text style={{ fontFamily: theme.pop, color: theme.primary, fontSize: theme.xl, paddingLeft: wp(6), }}>Information</Text>
                                    <TouchableOpacity onPress={() => this.setState({ visible: false })}><AntDesign name="close" color={theme.primary} size={24} /></TouchableOpacity>
                                </View>




                                {/* Full container*/}

                                <View style={{ marginLeft: wp(7), width: '80%', height: hp(7), borderBottomColor: '#e5e5e5', borderBottomWidth: 1 }}>

                                    <View style={{ flexDirection: 'row' }}>
                                        <Feather name="user" size={15} color={theme.primary} />
                                        <Text style={{ paddingLeft: 5, fontFamily: theme.pop, color: theme.primary, fontSize: theme.small }}>Date Name</Text>
                                    </View>
                                    <Text style={{ paddingLeft: 5, fontFamily: theme.pop, color: theme.secondary, fontSize: theme.medium, paddingTop: textpadding }}>{this.state.itemData.name}</Text>

                                </View>

                                {/* Full container*/}



                                {/* half container*/}

                                <View style={{ flexDirection: 'row', marginTop: hp(1.5) }}>
                                    <View style={{ marginLeft: wp(7), width: '40%', height: hp(7), borderBottomColor: '#e5e5e5', borderBottomWidth: 1 }}>

                                        <View style={{ flexDirection: 'row' }}>
                                            <MaterialIcons name="date-range" size={15} color={theme.primary} />
                                            <Text style={{ paddingLeft: 5, fontFamily: theme.pop, color: theme.primary, fontSize: theme.small }}>Time</Text>
                                        </View>
                                        <Text style={{ paddingLeft: 5, fontFamily: theme.pop, color: theme.secondary, fontSize: theme.medium, paddingTop: textpadding }}>{this.state.itemData.time}</Text>

                                    </View>
                                    <View style={{ marginLeft: wp(1), width: '40%', height: hp(7), borderBottomColor: '#e5e5e5', borderBottomWidth: 1 }}>

                                        <View style={{ flexDirection: 'row' }}>
                                            <Feather name="clock" size={15} color={theme.primary} />
                                            <Text style={{ paddingLeft: 5, fontFamily: theme.pop, color: theme.primary, fontSize: theme.small }}>Date</Text>
                                        </View>
                                        <Text style={{ paddingLeft: 5, fontFamily: theme.pop, color: theme.secondary, fontSize: theme.medium, paddingTop: textpadding }}>{this.state.itemData.date}</Text>

                                    </View>
                                </View>
                                {/* half container*/}



                                {/* half container*/}

                                <View style={{ flexDirection: 'row', marginTop: hp(1.5) }}>
                                    <View style={{ marginLeft: wp(7), width: '40%', height: hp(7), borderBottomColor: '#e5e5e5', borderBottomWidth: 1 }}>

                                        <View style={{ flexDirection: 'row' }}>
                                            <Feather name="globe" size={15} color={theme.primary} />
                                            <Text style={{ paddingLeft: 5, fontFamily: theme.pop, color: theme.primary, fontSize: theme.small }}>City</Text>
                                        </View>
                                        <Text style={{ paddingLeft: 5, fontFamily: theme.pop, color: theme.secondary, fontSize: theme.medium, paddingTop: textpadding }}>{this.state.itemData.city}</Text>

                                    </View>
                                    <View style={{ marginLeft: wp(1), width: '40%', height: hp(7), borderBottomColor: '#e5e5e5', borderBottomWidth: 1 }}>

                                        <View style={{ flexDirection: 'row' }}>
                                            <MaterialIcons name="location-on" size={15} color={theme.primary} />
                                            <Text style={{ paddingLeft: 5, fontFamily: theme.pop, color: theme.primary, fontSize: theme.small }}>Location</Text>
                                        </View>
                                        <Text style={{ paddingLeft: 5, fontFamily: theme.pop, color: theme.secondary, fontSize: theme.medium, paddingTop: textpadding }}>{this.state.itemData.location}</Text>

                                    </View>
                                </View>
                                {/* half container*/}




                                {/* Full container*/}

                                <View style={{ paddingRight: 5, marginTop: hp(1.5), marginLeft: wp(7), width: '80%', height: hp(12), borderBottomColor: '#e5e5e5', borderBottomWidth: 1 }}>

                                    <View style={{ flexDirection: 'row' }}>
                                        <Feather name="file" size={15} color={theme.primary} />
                                        <Text style={{ paddingLeft: 5, fontFamily: theme.pop, color: theme.primary, fontSize: theme.small }}>Information</Text>
                                    </View>
                                    <Text style={{ paddingLeft: 5, fontFamily: theme.pop, color: theme.secondary, fontSize: theme.small / 1, paddingTop: textpadding }}>{this.state.itemData.note} </Text>

                                </View>

                                {/* Full container*/}




                                {/* Full container*/}

                                <View style={{ marginLeft: wp(7), width: '80%', marginTop: hp(1.5), height: hp(7), borderBottomColor: '#e5e5e5', borderBottomWidth: 1 }}>

                                    <View style={{ flexDirection: 'row' }}>
                                        <Feather name="settings" size={15} color={theme.primary} />
                                        <Text style={{ paddingLeft: 5, fontFamily: theme.pop, color: theme.primary, fontSize: theme.small }}>Status</Text>
                                    </View>
                                    <Text style={{ paddingLeft: 5, fontFamily: theme.pop, color: theme.secondary, fontSize: theme.medium, paddingTop: textpadding }}>In Process</Text>

                                </View>

                                {/* Full container*/}



                                {/* Button Done*/}

                                <TouchableOpacity
                                    onPress={() => this.setState({ visible: false })}
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: '80%',
                                        backgroundColor: theme.primary,
                                        height: hp(7),
                                        borderRadius: 5,
                                        marginLeft: wp(7),
                                        marginTop: wp(2),
                                    }}
                                >
                                    <Text style={{ color: '#fff', fontFamily: theme.pop }}>Done</Text>
                                </TouchableOpacity>

                            </DialogContent>
                        </Dialog> : null}


                    {/* POPUP CODE ENDS HERE */}
















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
        paddingHorizontal: 20,
        paddingTop: 25
    },
    footer: {
        flex: 1,
    },
    title: {
        fontSize: theme.xxl / 1.2,
        color: theme.titleColor,
        fontFamily: theme.pop
    },
    itemContainer: {
        backgroundColor: theme.transparentColor,
        height: hp(25),
        width: '100%',
        borderRadius: 10,
        marginTop: hp(2),
        padding: 25,
        marginBottom: hp(1)
    },
    featureText: {
        color: theme.secondary,
        fontFamily: theme.pop,
        fontSize: theme.medium,
        paddingLeft: wp(4),
        paddingTop: hp(1)
    },
    firstText: {
        fontSize: theme.xl,
        color: theme.primary,
        fontFamily: theme.pop,
        paddingLeft: 10,
    },
    firstSubText: {
        fontSize: theme.large,
        color: theme.secondary,
        fontFamily: theme.pop,
        paddingLeft: wp(9),

    },
    secondSubText: {
        fontSize: theme.medium,
        color: theme.secondary,
        fontFamily: theme.pop,
        paddingLeft: wp(1),
    },
    thirdSubText: {
        fontSize: theme.medium,
        color: theme.secondary,
        fontFamily: theme.pop,
        paddingLeft: wp(1),
    },
    mainButton: {
        backgroundColor: theme.primary,
        justifyContent: 'center',
        alignItems: 'center',
        height: hp(6),
        borderRadius: 3,
        width: '70%',
        marginTop: hp(1),
        marginLeft: wp(10)
    },
    btnText: {
        fontSize: theme.medium,
        color: '#fff',
        fontFamily: theme.pop,
    }

});

const mapStateToProps = (state) => {
    // alert(JSON.stringify(state.app.requestData))
    return {
        senderId: state.auth.user_id,
        calendarData: state.app.calendarData
    };
};

export default connect(mapStateToProps, null)(Calendar);