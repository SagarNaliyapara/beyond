import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground
} from "react-native";
import { connect } from "react-redux";
import theme from '../../Theme'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';
import Actions from "../../actions/creator"
import TransText from "../../components/both/transtext"
import reactotron from "reactotron-react-native";

//functional component




// const Splash = () => {
//     // this.props.dispatch(Actions.getHomeScreenTextRequest());
//     const navigation = useNavigation();
//     return (
//         <ImageBackground source={require('../../assets/splashbg.png')} style={styles.container}>
//             <View style={{ flex: 2 }} />

//             <View style={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'center' }}>
//                 <TransText style={styles.paragraph} transkey={"SPLASH_SLOGAN"} />
//                 <TouchableOpacity onPress={() => navigation.navigate('SignIn')} style={styles.mainBtn}>
//                     <TransText style={styles.btntext} transkey={"GET_STARTED"} />
//                 </TouchableOpacity>
//             </View>
//         </ImageBackground>
//     );
// }

class Splash extends Component {
    componentDidMount() {
        this.props.dispatch(Actions.getHomeScreenTextRequest());
    }
    render() {
        reactotron.log("aaa", this.props)
        return (
            <ImageBackground source={require('../../assets/splashbg.png')} style={styles.container}>
                <View style={{ flex: 2 }} />
                <View style={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <Text style={styles.paragraph}  >
                        {this.props.homeScreenMessage}
                    </Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('SignIn')} style={styles.mainBtn}>
                        <TransText style={styles.btntext} transkey={"GET_STARTED"} />
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        homeScreenMessage: state.app.homeScreenMessage
    }
};
export default connect(mapStateToProps, null)(Splash);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    paragraph: {
        fontFamily: theme.pop,
        fontSize: theme.medium,
        color: '#fff',
        textAlign: 'center',
        paddingLeft: 30,
        paddingRight: 30
    },
    mainBtn: {
        backgroundColor: theme.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        width: wp('90%'),
        height: hp(7.5),
        borderRadius: 5
    },
    btntext: {
        fontSize: theme.medium,
        color: '#fff',
        fontFamily: theme.pop
    },
});