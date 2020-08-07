import React, { Component, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import theme from '../../Theme'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { Footer } from "native-base";
import Transtext from "./transtext";
import helpers from "../styles/helpers";
import { connect } from "react-redux"

import Home_icon from "../../assets/bottomTab/home.svg"
import Notification_icon from "../../assets/bottomTab/notification.svg"
import Profile_icon from "../../assets/bottomTab/profile.svg"
import Chat_icon from "../../assets/bottomTab/chat.svg"
import { select } from "redux-saga/effects";
const CustomizedBottomTabBar = (props) => {
    const navigation = useNavigation();
    const currentTab = props.state.index;
    const routes = props.state.routes[currentTab]
    const [selectedTab, selectTab] = useState(1);
    const newRouteIndex = routes.state == undefined ? 0 : routes.state.index;

    console.log(navigation)
    return (
        <Footer
            style={{
                backgroundColor: 'transparent',
                borderWidth: 0,
                borderTopWidth: 0,
                borderBottomWidth: 0,
                borderRightWidth: 0,
                borderLeftWidth: 0,
                shadowOffset: { height: 0, width: 0 },
                shadowOpacity: 0,
                elevation: 0
            }}>

            <View>
                <View style={styles.shadowBar}></View>
                <View style={[styles.container, props.locale == "ar" && { flexDirection: 'row-reverse' }]}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            selectTab(1)

                            navigation.navigate('Home')
                        }}
                        style={[styles.tabContainer,
                        selectedTab == 1 && styles.tabFocused,
                        props.locale == "ar" && { flexDirection: 'row-reverse' }]}
                        hitSlop={{ top: 15, left: 15, right: 15, bottom: 15 }}>
                        <Home_icon height={helpers.size(24)} width={helpers.size(24)} />
                        {selectedTab == 1 && (newRouteIndex == 0) && <Transtext
                            style={styles.tabText} transkey="BOTTOM_TAB_HOME" />}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        selectTab(2)
                        navigation.navigate('NotificationTab')
                    }}
                        style={[styles.tabContainer,
                        selectedTab == 2 && styles.tabFocused,
                        props.locale == "ar" && { flexDirection: 'row-reverse' }]}
                        hitSlop={{ top: 15, left: 15, right: 15, bottom: 15 }}>
                        <Notification_icon height={helpers.size(26)} width={helpers.size(26)} />
                        {selectedTab == 2 && newRouteIndex == 0 && <Transtext
                            style={styles.tabText} transkey="BOTTOM_TAB_NOTIFICATION" />}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        selectTab(3)
                        navigation.navigate('ProfileTab')
                    }}
                        style={[styles.tabContainer,
                        selectedTab == 3 && styles.tabFocused,
                        props.locale == "ar" && { flexDirection: 'row-reverse' }]}
                        hitSlop={{ top: 15, left: 15, right: 15, bottom: 15 }}>
                        <Profile_icon height={helpers.size(22)} width={helpers.size(22)} />
                        {selectedTab == 3 && newRouteIndex == 0 && <Transtext
                            style={styles.tabText} transkey="BOTTOM_TAB_PROFILE" />}
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            selectTab(4)

                            navigation.navigate('ChatTab')

                        }}
                        style={[styles.tabContainer,
                        selectedTab == 4 && styles.tabFocused,
                        props.locale == "ar" && { flexDirection: 'row-reverse' }]}
                        hitSlop={{ top: 15, left: 15, right: 15, bottom: 15 }}>
                        <Chat_icon height={helpers.size(24)} width={helpers.size(24)} />
                        {selectedTab == 4 && newRouteIndex == 0 && <Transtext
                            style={styles.tabText} transkey="BOTTOM_TAB_CHAT" />}
                    </TouchableOpacity>
                </View>
            </View>
        </Footer>
    );
}

const mapStateToProps = state => ({
    locale: state.app.locale,
})

export default connect(mapStateToProps, null)(CustomizedBottomTabBar)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        /* borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        elevation: 20,
        borderBottomWidth: 0,
        shadowOffset: {
            width: -2,
            height: 0,
        },
        shadowColor: 'rgba(0,0,0,0.3)',
        shadowOpacity: 1,
        shadowRadius: 2,*/
    },
    tabContainer: {
        flexDirection: 'row',
        padding: helpers.size(5),
        alignItems: 'center'
    },
    tabFocused: {
        backgroundColor: '#F6F0E6',
        borderRadius: 10
    },
    tabText: {
        color: theme.primary,
        fontSize: helpers.size(18),
        paddingHorizontal: helpers.size(5)
    },
    shadowBar: {
        width: '90%',
        marginLeft: '5%',
        height: 4,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        backgroundColor: '#eee'
    }
});