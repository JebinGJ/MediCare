import React, { useState } from 'react'
import { Text, SafeAreaView, Pressable, StyleSheet, View } from "react-native"
import { routes } from "../service/routes"
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface userDataType {
    email: string
    password: string
}

export const HomeScreen = ({ navigation }: any) => {
    const [userData, setUserData] = useState('')
    const handleClick = async () => {
        const val = await AsyncStorage.getItem('currentUser')
        if (val) {
            setUserData(val)
        }
    }
    const handleLogout = async () => {
        await AsyncStorage.setItem('currentUser', '')
        navigation.replace(routes.AUTH_SCREEN)
    }

    const getUserTemplate = (val: string) => {
        const name = val.split('@')[0];
        const initial = name.charAt(0).toUpperCase();
        return (
            <View style={styles.profCont}>
                <View style={styles.profileImg}>
                    <Text style={styles.profileInitial}>{initial}</Text>
                </View>
                <Text style={styles.profileTxt}>{name}</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }} >
            <View style={styles.homeContainer}>
                <Pressable onPress={handleLogout}>
                    <Text style={styles.logoutTxt}>Logout</Text>
                </Pressable>
                {userData ? <View>
                    {getUserTemplate(userData)}
                    <View style={styles.mailCont}>
                        <Text style={styles.mailTxt}>Email:</Text>
                        <Text style={styles.mail}>{userData}</Text>
                    </View>
                </View> : null}

            </View>
            <View style={styles.fetchButtonCont}>
                <Pressable style={styles.fetchDataBtn} onPress={handleClick}>
                    <Text style={styles.fetchBtnTxt}>Get User Info</Text>
                </Pressable>
            </View>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    homeContainer: {
        paddingHorizontal: 20,
    },
    logoutTxt: {
        textAlign: 'right',
        fontSize: 18,
        color: '#000',
        fontWeight: 'bold',
    },
    fetchTxt: {
        fontSize: 15,
        color: '#000',
    },
    fetchButtonCont: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 10
    },
    fetchDataBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4285F4',
        borderRadius: 10,
        padding: 10,
    },
    fetchBtnTxt: {
        color: '#fff',
        fontWeight: 'bold'
    },
    mail: {
        color: '#000',
        fontSize: 15,
    },
    profCont: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImg: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'lightgray',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    profileInitial: {
        color: '#000',
        fontSize: 50,
        fontWeight: 'bold'
    },
    profileTxt: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 5,
    },
    mailCont: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    mailTxt: {
        color:'#000',
        fontWeight: 'bold'
    }

})