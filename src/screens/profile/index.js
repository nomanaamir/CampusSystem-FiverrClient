import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Style, Dimensions, TouchableOpacity, Image, ActivityIndicator, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { retrieveDataAssyncStorage, logOut, getUserSkills } from '../../Store/Middlewares/middlewares';
const { width, height, fontScale } = Dimensions.get('window')
import * as firebase from 'firebase';
import { RFPercentage } from 'react-native-responsive-fontsize';
// icons
import { Fontisto, EvilIcons, MaterialIcons } from '@expo/vector-icons';
const ProfileScreen = (props) => {
    const { navigation } = props

    const skills = [
        {
            type: 'faible',
            grip: '35%',
            name: 'plastie mammaire',
            color: '#f55f5f'
        },
        {
            type: 'moyen',
            grip: '70%',
            name: 'plastie mammaire',
            color: '#f5af5f'
        },
        {
            type: 'fort',
            grip: '100%',
            name: 'plastie mammaire',
            color: '#83b674'
        },
        {
            type: 'faible',
            grip: '35%',
            name: 'plastie mammaire',
            color: '#f55f5f'

        }
    ]

    const logout = () => {
        props.logOutAction()
    };
    useEffect(() => {
        props.retrieveDataAssyncStorageAction();
        props.getUserSkillsAction();

    }, []);


    return (
        <View style={styles.profileContainer}>
            <ScrollView style={{ flex: 1 }}>
                {
                    props.userData === undefined ?
                        <ActivityIndicator size={200} color="white" />
                        :
                        <>
                            <View style={styles.profileCard}>
                                <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
                                    <MaterialIcons name="logout" size={24} color="black" />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.profileImgFrame}>
                                    <Image style={styles.profileImgFrame_pic} source={{ uri: props.userData?.profileImg }} />
                                </TouchableOpacity>

                                <Text style={styles.profileCard_name}>
                                    {props.userData?.fullName}
                                </Text>
                                <Text style={styles.profileCard_profession}>
                                    Medicine assistent
                        </Text>

                                <View style={styles.profileCard_details}>
                                    <View style={[styles.profileCard_detailsInfo, styles.borderRight]}>
                                        <Fontisto name="email" size={15} color="black" />
                                        <Text style={{ color: '#404040', marginLeft: 3, fontSize: RFPercentage(2) }} numberOfLines={1}>
                                            {props.userData?.email}
                                        </Text>
                                    </View>

                                    <View style={styles.profileCard_detailsInfo}>
                                        <EvilIcons name="location" size={22} color="black" />
                                        <Text style={{ color: '#404040', fontSize: RFPercentage(2) }} numberOfLines={1}>
                                            adresse rui 58 n 18
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            {
                                props.userSkills.map((item, index) => {
                                    return (
                                        <View style={styles.skillBlock} key={index}>
                                            <Text style={styles.skillName}>{item.name}</Text>
                                            <View style={styles.skillContainer}>
                                                <View style={styles.skillContainer_bar}>
                                                    <View style={{ backgroundColor: item.color, width: item.grip, height: '100%', borderRadius: 100 }}>

                                                    </View>
                                                </View>
                                                <Text style={styles.skillContainer_type}>{item.type}</Text>
                                            </View>
                                        </View>
                                    )
                                })
                            }

                        </>

                }
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    profileContainer: {
        flex: 1,
        backgroundColor: '#e4e9ef',
        // justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        paddingTop: 30
    },
    profileCard: {
        height: height / 2.8,
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8

        // marginTop: 25
    },
    logoutBtn: {
        position: 'absolute',
        right: 15,
        top: 10
    },
    profileImgFrame: {
        height: height / 6,
        width: width / 3,
        backgroundColor: 'white',
        borderRadius: 100,
        elevation: 3
        // display: 'flex'
    },
    profileImgFrame_pic: {
        height: '100%',
        width: '100%',
        borderRadius: 100
    },
    profileCard_name: {
        color: '#555c93',
        fontSize: RFPercentage(3.5),
        fontWeight: 'bold'
    },
    profileCard_profession: {
        color: '#525252',
        fontSize: RFPercentage(2.1),
        fontWeight: 'bold'
    },
    profileCard_details: {
        flexDirection: 'row',
        // backgroundColor: 'red',
        height: 40,
        alignItems: 'center',
        width: '100%',
    },
    profileCard_detailsInfo: {
        // backgroundColor: 'silver',
        width: '50%',
        height: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    borderRight: {
        borderStyle: 'solid',
        borderRightWidth: 2,
        borderColor: '#eaeaea',
        // paddingLeft: 5
    },
    skillBlock: {
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 20,
        padding: 12,
        paddingRight: 14,
        marginBottom: 8
    },
    skillName: {
        textTransform: 'capitalize',
        color: '#313131',
        fontSize: RFPercentage(2.5)
    },
    skillContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    skillContainer_bar: {
        width: '80%',
        backgroundColor: '#e9e9e9',
        height: 10,
        borderRadius: 100
    },
    skillContainer_type: {
        textTransform: 'capitalize',
        color: '#313131',
        fontSize: RFPercentage(2)
    }
});
function mapStateToProps(state) {
    console.log('Profile Screen:', Object.values(state.root.user_skills))
    return {
        userData: state.root.async_storage_data.data?.user,
        userSkills: Object.values(state.root.user_skills)
    }
}
function mapDispatchToProps(dispatch) {
    return ({
        retrieveDataAssyncStorageAction: () => { dispatch(retrieveDataAssyncStorage()) },
        logOutAction: () => { dispatch(logOut()) },
        getUserSkillsAction: () => { dispatch(getUserSkills()) }
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

