import React, { Component, useState, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import {
    Container,
    Header,
    Item,
    Input,
    Icon,
    Button,
    Text,
} from "native-base";
import {
    View,
    StyleSheet,
    ImageBackground,
    Image,
    FlatList,
    SectionList,
    TouchableHighlight,
    TouchableOpacity,
} from "react-native";
import theme from "../../Theme";
import { useNavigation } from "@react-navigation/native";
import { groupBy } from "lodash";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Contacts from "expo-contacts";
import Actions from "../../actions/creator"

const ContactRow = (name, emailOrNumber, selected, onPress) => {
    return (
        <TouchableOpacity style={{ paddingHorizontal: 15 }} onPress={onPress}>
            <View
                style={{
                    paddingVertical: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    borderBottomWidth: 1,
                    borderBottomColor: "rgb(238,238,238)",
                }}
            >
                <View
                    style={{
                        width: 15,
                        height: 15,
                        borderRadius: 7,
                        backgroundColor: selected ? theme.primary : "rgb(238,238,238)",
                    }}
                ></View>
                <View style={{ flex: 1, marginLeft: 15 }}>
                    <Text>{name || emailOrNumber}</Text>
                    {name.length > 0 && (
                        <Text style={{ marginTop: 4, color: "#666" }}>{emailOrNumber}</Text>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
};


const addContact = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const authRed = useSelector((state) => state.auth);
    const appRed = useSelector((state) => state.app);


    const [search, setSearch] = useState("");
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [contacts, setContacts] = React.useState({
        loading: true,
        error: null,
        data: [],
    });

    useEffect(() => {
        (async () => {
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === "granted") {
                const { data } = await Contacts.getContactsAsync({
                    fields: [Contacts.Fields.Emails, Contacts.Fields.PhoneNumbers],
                });

                console.log("fetch contacts ======= ");
                if (data.length > 0) {
                    const contact = data[0];
                    setContacts((state) => ({
                        loading: false,
                        error: null,
                        data: state.data.concat(data),
                    }));
                }
            }
        })();
    }, []);

    let sections = [];
    let searchData = []
    let unSortsections = []
    if (contacts.data.length > 0) {
        let res = [];
        contacts.data.map((cur) => {
            if (cur.phoneNumbers != null) {
                for (const p of cur.phoneNumbers) {
                    res.push({
                        id: cur.id + p.number,
                        name: cur.name || "",
                        phoneNumber: p.number,
                    });

                    searchData.push({
                        id: cur.id + p.number,
                        name: cur.name || "",
                        phoneNumber: p.number,
                    })
                }
            }
        });

        res = groupBy(res, (c) => {
            const firstChar = (c.name.charAt(0) || "#").toLowerCase();
            return firstChar.match(/[a-z]/) ? firstChar : "#";
        });

        const orderedRes = {};
        Object.keys(res).sort().forEach(function (key) {
            orderedRes[key] = res[key];
        });


        for (let propt in orderedRes) {
            unSortsections.push({
                title: propt,
                data: orderedRes[propt].sort((a, b) =>
                    (a.name || a.name || "") < (b.name || b.name || "") ? -1 : 1
                ),
            });
        }
    }



    if (contacts.loading) {
        return <Text>Loading...</Text>;
    } else if (contacts.error != null) {
        return <Text>Oh no error :( {contacts.error.message}</Text>;
    } else {


        searchData = searchData.filter((cont) => {
            if (cont.name.startsWith(search)) {
                return true
            }
            else {
                return false
            }

        })

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                <Text style={{ color: "#666", alignSelf: "center" }}>Contacts</Text>
                <Header searchBar rounded>
                    <Item>
                        <Icon name="ios-search" />
                        <Input onChangeText={search => setSearch(search)}
                            placeholder="Search" />

                        <Icon name="ios-people" />
                    </Item>
                    <Button transparent
                        onPress={() => {

                           
                            console.log("search======", searchData)
                            if (selectedContacts.length == 0) {
                                alert("No contact selected")
                            } else {
                               let contactToSave = {
                                    contact_no:selectedContacts[0].phoneNumber,
                                    user_id: authRed.user_id,
                                    contact_name:selectedContacts[0].name
                                }

                                dispatch(Actions.addNewContact(contactToSave))
                                // setSelectedContacts([])
                                navigation.navigate("Contacts")

                            }
                        }}>
                        <Text>Add</Text>
                    </Button>
                </Header>

                {search == "" ?
                    <SectionList
                        sections={unSortsections}
                        renderSectionHeader={({ section }) => (
                            <Text
                                style={{
                                    backgroundColor: "#eee",
                                    paddingHorizontal: 16,
                                    paddingVertical: 4,
                                }}
                            >
                                {section.title.toUpperCase()}
                            </Text>
                        )}
                        renderItem={({ item }) => {
                            const selectedIndex = selectedContacts.findIndex(
                                (i) => i.id === item.id
                            );
                            const onPress = () => {
                                const newContacts = []
                                newContacts.push(item);
                                setSelectedContacts(newContacts);
                            };
                            return ContactRow(
                                item.name,
                                item.phoneNumber,
                                selectedIndex >= 0,
                                onPress
                            );
                        }}
                        extraData={selectedContacts}
                        contentContainerStyle={{ paddingBottom: 104 }}
                    />
                    :
                    <FlatList
                        data={searchData}
                        renderItem={({ item }) => {
                            const selectedIndex = selectedContacts.findIndex(
                                (i) => i.id === item.id
                            );
                            const onPress = () => {
                                const newContacts = []
                                newContacts.push(item);
                                setSelectedContacts(newContacts);
                            };
                            return ContactRow(
                                item.name,
                                item.phoneNumber,
                                selectedIndex >= 0,
                                onPress
                            );
                        }}
                        extraData={selectedContacts}
                        contentContainerStyle={{ paddingBottom: 104 }}
                    />
                }
            </SafeAreaView>
        );
    }
};
export default addContact;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === "ios" ? 24 : 0,
    },
    title: {
        fontSize: theme.large,
        color: theme.primary,
        fontFamily: theme.pop,
        paddingLeft: 10,
    },
    subtitle: {
        fontSize: theme.medium / 1.2,
        color: theme.secondary,
        fontFamily: theme.pop,
        paddingLeft: 10,
    },
});
