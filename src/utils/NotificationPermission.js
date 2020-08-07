import {Notifications, Linking} from 'expo';
import * as Permissions from 'expo-permissions';
import * as IntentLauncher from 'expo-intent-launcher';

async function getPushNotificationToken() {
    if (await askNotificationPermission()) {
        return Notifications.getExpoPushTokenAsync();
    } else {
        Alert.alert('Notification Permission',
            'Please grant permission to receive notifications', [
                {
                    text: 'Cancel', onPress: () => null, style: 'cancel',
                }, {
                    text: __('OK'), onPress: openSettings,
                },
            ], {cancelable: false});
    }
    return null;
}

async function askNotificationPermission() {
    const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    return status === 'granted';
}

async function getNotificationPermission() {
    const {status} = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    return status === 'granted';
}

function openSettings() {
    if (Platform.OS === 'ios') {
        Linking.openURL('app-settings:{3}');
    } else {
        IntentLauncher.startActivityAsync(
            IntentLauncher.ACTION_APPLICATION_SETTINGS);
    }
}
