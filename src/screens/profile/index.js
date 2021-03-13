import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, Style, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { retrieveDataAssyncStorage, logOut } from '../../Store/Middlewares/middlewares';
const { width, height, fontScale } = Dimensions.get('window')
const ProfileScreen = (props) => {
    const { navigation } = props

    const logout = () => {
        props.logOutAction()
    };
    useEffect(() => {
        props.retrieveDataAssyncStorageAction()
    }, []);
    return (
        <View style={styles.profileContainer}>
            <TouchableOpacity onPress={logout}>
                <Text>
                    HEllo, I'm profile page
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    profileContainer: {
        flex: 1,
        backgroundColor: '#e4e9ef',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
function mapStateToProps(state) {
    console.log('Redux State - Profile Screen', state.root.async_storage_data?.data)
    return {
        userData: state.root.async_storage_data.data?.user,
    }
}
function mapDispatchToProps(dispatch) {
    return ({
        retrieveDataAssyncStorageAction: () => { dispatch(retrieveDataAssyncStorage()) },
        logOutAction: () => { dispatch(logOut()) }
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

