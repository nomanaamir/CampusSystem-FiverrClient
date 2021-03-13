import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, Style, Dimensions, TextInput, TouchableOpacity, Platform, Image, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { signUp } from '../../Store/Middlewares/middlewares';
const { width, height, fontScale } = Dimensions.get('window')
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
//icons
import { MaterialCommunityIcons, Fontisto, Feather, FontAwesome5 } from '@expo/vector-icons';
const SignUpScreen = (props) => {
    const { navigation } = props
    const [date, setDate] = useState(new Date());

    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    // user state

    const [image, setImage] = useState('')
    const [fullName, setFullName] = useState('');
    const [displayDate, setDisplayDate] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const onChange = (event, selectedDate) => {
        if (selectedDate) {
            const currentDate = selectedDate || date;
            setShow(Platform.OS === 'ios');
            setDate(currentDate);
            const datee = selectedDate.getDate();
            const month = selectedDate.getMonth() + 1;
            const year = selectedDate.getFullYear()
            const fullDate = (datee.toString().length === 2 ? datee : '0' + datee) + '/' + (month.toString().length === 2 ? month : '0' + month) + '/' + year
            setDisplayDate(fullDate)
            console.log('DATE', fullDate)
        }
        setShow(false);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    let selectImage = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        if (pickerResult?.uri !== undefined) {
            setImage(pickerResult.uri)
        }
        console.log('my image', pickerResult.uri);
    }
    const register = () => {
        const user = {
            fullName: fullName,
            dob: displayDate,
            email: email
        }
        if (image === '' || fullName === '' || displayDate === '' || email === '' || password === '') {
            alert('All fields required')
        } else {
            props.signUpAction(email, password, image, user)
            console.log('image: ', image)
            console.log('fullName: ', fullName)
            console.log('displayDate: ', displayDate)
            console.log('email: ', email)
            console.log('password: ', password)
        }
    };
    useEffect(() => {

    }, []);
    return (
        <KeyboardAwareScrollView
            style={{ backgroundColor: "#4c69a5" }}
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled={false}
            style={{ height: height }}
            automaticallyAdjustContentInsets={false}
        >
            <View style={styles.signUpContainer}>

                <View style={styles.col_1}>

                    <TouchableOpacity style={styles.imageSelectFrame} onPress={selectImage}>
                        {
                            image !== '' ?
                                <Image style={styles.imageSelectFrame_img} source={{ uri: image }} />
                                :
                                <MaterialCommunityIcons name="camera-plus" size={24} color="white" />
                        }
                    </TouchableOpacity>

                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldContainer_label}>Full Name</Text>
                        <View style={styles.iconSection}>
                            <Feather style={styles.iconSection_left} name="user" size={22} color="black" />
                            <TextInput
                                style={styles.fieldContainer_input}
                                placeholder='User Name'
                                onChangeText={(text) => setFullName(text)}
                            />
                        </View>
                    </View>

                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldContainer_label}>Date de Naissance</Text>
                        <TouchableOpacity style={styles.iconSection} onPress={showDatepicker}>
                            <Feather style={styles.iconSection_left} name="calendar" size={22} color="black" />
                            {
                                displayDate !== '' ?
                                    <Text style={{ color: 'black', fontSize: 15 }}>{displayDate}</Text>
                                    :
                                    <Text style={{ color: 'gray' }}>Select Date</Text>
                            }
                        </TouchableOpacity>
                    </View>


                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldContainer_label}>Email Address</Text>
                        <View style={styles.iconSection}>
                            <Fontisto style={styles.iconSection_left} name="email" size={22} color="black" />
                            <TextInput
                                style={styles.fieldContainer_input}
                                placeholder='username@gmail.com'
                                keyboardType='email-address'
                                onChangeText={(text) => setEmail(text)}
                            />
                        </View>
                    </View>

                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldContainer_label}>Password</Text>
                        <View style={styles.iconSection}>
                            <Feather style={styles.iconSection_left} name="lock" size={22} color="black" />
                            <TextInput
                                style={styles.fieldContainer_input}
                                placeholder='••••••••'
                                secureTextEntry={true}
                                onChangeText={(text) => setPassword(text)}
                            />
                            <Feather style={styles.iconSection_right} name="eye" size={20} color="black" />
                        </View>
                    </View>

                </View>

                <View style={styles.col_2}>
                    {
                        props.isLoading === false ?
                            <TouchableOpacity style={styles.loginButton} onPress={register}>
                                <Text style={styles.loginButton_text}>
                                    Next
                                </Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.loginButton} disabled={true}>
                                <ActivityIndicator size={25} color="white" />
                            </TouchableOpacity>
                    }

                    <View style={styles.signInActions}>
                        <TouchableOpacity onPress={() => navigation.navigate('signIn')}>
                            <Text style={styles.signInActions_links}>
                                Signin
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Text style={styles.signInActions_links}>
                                Forgot Password?
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>

            {/* date picker */}
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
        </KeyboardAwareScrollView>

    );
}

const styles = StyleSheet.create({
    signUpContainer: {
        alignItems: 'center',
        backgroundColor: '#f1f6fc',
        flex: 1,
        height: height,
        paddingTop: 35
    },
    col_1: {
        height: height / 1.4,
        width: '94%',
        borderRadius: 25,
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    col_2: {
        height: height / 2.4,
        width: width / 1,
        // backgroundColor: 'red'
    },
    imageSelectFrame: {
        height: height / 9,
        width: width / 4.5,
        backgroundColor: '#3e4685',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    imageSelectFrame_img: {
        height: '100%',
        width: '100%',
        borderRadius: 100
    },

    fieldContainer: {
        backgroundColor: 'white',
        // margin: 14,
        borderRadius: 10,
        height: height / 8,
        justifyContent: 'center',
        paddingLeft: 12,
        paddingRight: 12,
        shadowColor: "gray",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        },

    },
    fieldContainer_label: {
        fontSize: RFPercentage(2.4),
        color: '#939499'
    },
    fieldContainer_input: {
        fontSize: RFPercentage(2.2),
        // backgroundColor: 'red',
        width: '90%',
        paddingRight: 35
        // paddingLeft: 10
        // color: '#939499'
    },
    iconSection: {
        // flex: 1,
        alignItems: 'center',
        flexDirection: 'row'
    },
    iconSection_left: {
        paddingRight: 10
    },
    iconSection_right: {
        position: 'absolute',
        right: 10,
    },
    loginButton: {
        backgroundColor: '#3e4685',
        height: height / 10,
        borderRadius: 100,
        margin: 14,
        alignItems: 'center',
        justifyContent: 'center',
        //   shadowOffset: {
        //     width: 0,
        //     height: 2
        // },
        shadowOpacity: 0.25,
        // shadowRadius: 10,
        elevation: 3,
    },
    loginButton_text: {
        color: 'white',
        fontSize: RFPercentage(3),
        fontWeight: 'bold'
    },
    signInActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 10,
        paddingLeft: 10
    },
    signInActions_links: {
        color: '#707176',
        fontSize: RFPercentage(2)
    }
});
function mapStateToProps(state) {
    console.log('Redux State - SignUp Screen', state.root.signUp_success)
    return {
        isLoading: state.root.signUp_success
    }
}
function mapDispatchToProps(dispatch) {
    return ({
        signUpAction: (email, password, image, user) => { dispatch(signUp(email, password, image, user)) },
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);

