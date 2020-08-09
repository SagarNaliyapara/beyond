import React, { Component, useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Image, Modal ,Alert,StyleSheet} from "react-native";
import {Audio} from "expo-av";
import {AntDesign, Entypo, Feather, FontAwesome, FontAwesome5} from '@expo/vector-icons';
import theme from "../../Theme";
import Slider from 'react-native-slider';

const PAUSED = 0;
const PLAYING = 1;
const PAUSED_PLAY = 2;
const STOP = 3;

const AudioPlayer = (props) => {
    let audioUri='https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Comfort_Fit_-_03_-_Sorry.mp3';
    // let audioUri='https://beyond-ksa.com/uploads/voice_messages/5eadd0dd32831_1588449501.amr';
    const [playState, setPlayState] = useState(PAUSED);
    const [sound, setSound] = useState(new Audio.Sound());
    const [soundDuration, setSoundDuration] = useState(null);
    const [soundPosition, setSoundPosition] = useState(null);
    const [isSeeking, setIsSeeking] = useState(false);
    const [shouldPlayAtEndOfSeek, setShouldPlayAtEndOfSeek] = useState(false)
    const [shouldPlay, setShouldPlay] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const updateScreenForSoundStatus = (status) => {
        // console.log("status ==== ", status);
        if (status.didJustFinish) {
            setPlayState(PAUSED_PLAY);
        }
        if (status.isLoaded) {
            setSoundDuration(status.durationMillis);
            setSoundPosition(status.positionMillis);
            setShouldPlay(status.shouldPlay);
            setIsPlaying(status.isPlaying);
        } else {
            setSoundDuration(status.durationMillis);
            setSoundPosition(status.positionMillis);
            if (status.error) {
                console.log(`FATAL PLAYER ERROR: ${status.error}`);
            }
        }
    };


    const setAudioMode = async () => {
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            playsInSilentLockedModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        });
        let initialPlaybackStatus = {
            isLooping: false,
            isMuted: false,
            volume: 1.0,
            rate: 1.0,
            shouldCorrectPitch: true,
        };
        let uri =props.uri;
        try {
            await sound
                .loadAsync({uri}, initialPlaybackStatus)
                .then(playbackStatus => {
                    const {durationMillis} = playbackStatus;
                    setSoundDuration(durationMillis)
                }).catch((error) => {
                    console.log("error in load audio  ----> ", JSON.stringify(error));
                });
            await sound.setOnPlaybackStatusUpdate(updateScreenForSoundStatus);
        } catch (err) {
            // console.error(`Error loading audio::: ${err}`);
        }
    }
    const _getPlaybackStartTimestamp=()=> {
        if (
            sound != null &&
            soundPosition != null
        ) {
            return `${_getMMSSFromMillis(soundPosition)}`;
        }
        return '00:00';
    }

    const _getPlaybackEndTimestamp=()=> {
        if (
            sound != null &&
            soundDuration != null
        ) {
            return `${_getMMSSFromMillis(soundDuration)}`;
        }
        return '00:00';
    }

    const _getMMSSFromMillis=(millis)=> {
        const totalSeconds = millis / 1000;
        const seconds = Math.floor(totalSeconds % 60);
        const minutes = Math.floor(totalSeconds / 60);

        const padWithZero = number => {
            const string = number.toString();
            if (number < 10) {
                return '0' + string;
            }
            return string;
        };
        return padWithZero(minutes) + ':' + padWithZero(seconds);
    }

    const onPlayStopPressed = async () => {
        if (sound !== null) {
            if (isPlaying) {
                await sound.stopAsync();
                setPlayState(PAUSED_PLAY)
            } else {
                await sound.playAsync();
                setPlayState(PLAYING)
            }
        }
    }

    const onPausedPress = async () => {
        if (sound !== null && playState === PLAYING) {
            await sound.pauseAsync();
            setPlayState(PAUSED_PLAY)
        }
    }

    const _getSeekSliderPosition=()=> {
        if (
            sound != null &&
            soundPosition != null &&
            soundDuration != null
        ) {
            return soundPosition / soundDuration;
        }
        return 0;
    }


    const _onSeekSliderValueChange = (value) => {
        if (sound != null && !isSeeking) {
            setIsSeeking(true)
            setShouldPlayAtEndOfSeek(shouldPlay)
            sound.pauseAsync();
        }
    };

    const _onSeekSliderSlidingComplete = async (value) => {
        if (sound != null) {
            setIsSeeking(false)
            const seekPosition = value * soundDuration;
            if (shouldPlayAtEndOfSeek) {
                sound.playFromPositionAsync(seekPosition);
            } else {
                sound.setPositionAsync(seekPosition);
            }
        }
    };

    const _onForwardPressed =async () => {
        if (sound != null) {
            setShouldPlayAtEndOfSeek(shouldPlay)
            await sound.pauseAsync();
            const seekPosition = 0.1 * soundDuration;
            if (shouldPlayAtEndOfSeek) {
                await sound.playFromPositionAsync(seekPosition);
            } else {
                await sound.setPositionAsync(seekPosition);
            }
        }
    };

    const _onBackPressed = async () => {
        if (sound != null) {
           //todo:
        }
    };

    useEffect( () => {
        setAudioMode()
    },[]);

    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 40
            }}>
                <AntDesign name="fastbackward" size={20} color="black" style={{marginHorizontal: 20}}
                           onPress={_onBackPressed}/>
                <View style={{
                    margin: 20,
                    height: 33,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    {isPlaying ?
                        <FontAwesome name="stop" size={20} color={theme.primary} onPress={onPlayStopPressed}/> :
                        <Entypo name="controller-play" size={30} color={theme.primary}
                                onPress={onPlayStopPressed}/>}
                </View>
                <AntDesign name="fastforward" size={20} color="black" style={{marginHorizontal: 20}}
                           onPress={_onForwardPressed}/>
                <FontAwesome5 name="pause" size={24} color={theme.primary} style={{marginHorizontal: 20}}
                              onPress={onPausedPress}/>
            </View>
            <Slider
                style={{alignSelf: 'stretch',}}
                trackStyle={customStyles4.track}
                thumbStyle={customStyles4.thumb}
                value={_getSeekSliderPosition()}
                onValueChange={_onSeekSliderValueChange}
                onSlidingComplete={_onSeekSliderSlidingComplete}
                thumbTintColor={theme.primary}
                thumbTouchSize={{width: 50, height: 40}}
                minimumTrackTintColor={theme.primaryDark}
            />
            <View style={{ justifyContent: 'space-between', flexDirection: 'row'}}>
                <View style={{ justifyContent: 'flex-start', flexDirection: 'row'}}>
                    <Text style={{color: theme.primary, fontSize: 15, textAlign: 'left', alignSelf: 'flex-end'}}>
                        {_getPlaybackStartTimestamp()}
                    </Text>
                </View>
                <Text style={{paddingHorizontal:10,color: theme.primary}}>-</Text>
                <View style={{ justifyContent: 'flex-end', flexDirection: 'row'}}>
                    <Text style={{color: theme.primary, fontSize: 15, textAlign: 'right', alignSelf: 'flex-end'}}>
                        {_getPlaybackEndTimestamp()}
                    </Text>
                </View>
            </View>
        </View>
    );
}

export default AudioPlayer;

const customStyles4 = StyleSheet.create({
    track: {
        height: 10,
        borderRadius: 4,
        backgroundColor: theme.primaryLight,
    },
    thumb: {
        width: 20,
        height: 20,
        backgroundColor:theme.primaryDark,
        borderColor: theme.primaryLight,
        borderWidth: 5,
        borderRadius: 10,
    }
});
