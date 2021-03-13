import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, Style, Dimensions, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { logIn, setNavigationProps } from '../../Store/Middlewares/middlewares';
const { width, height, fontScale } = Dimensions.get('window')
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
//icons
import { Fontisto, Feather, FontAwesome5 } from '@expo/vector-icons';
const SignInScreen = (props) => {
  const { navigation } = props
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const login = () => {

    if (email === '' || password === '') {
      alert('All fields required')
    } else {
      props.logInAction(email, password)

      setEmail('')
      setPassword('')
      console.log('email: ', email)
      console.log('password: ', password)
    }
  };

  useEffect(() => {
    // Update the document title using the browser API
    // props.setNavigationPropsAction(navigation)
    // props.loginAction()
  }, []);
  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: "#4c69a5" }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={false}
      style={{ height: height }}
      automaticallyAdjustContentInsets={false}
    >

      <View style={styles.signInContainer}>
        <View style={styles.col_1}>

          <View style={styles.signInIconFrame}>
            <FontAwesome5 name="briefcase-medical" size={75} color="white" />
          </View>

        </View>

        <View style={styles.col_2}>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldContainer_label}>Email Address</Text>
            <View style={styles.iconSection}>
              <Fontisto style={styles.iconSection_left} name="email" size={22} color="black" />
              <TextInput
                style={styles.fieldContainer_input}
                placeholder='username@gmail.com'
                keyboardType='email-address'
                onChangeText={(text) => setEmail(text)}
                value={email}
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
                value={password}

              />
              <Feather style={styles.iconSection_right} name="eye" size={20} color="black" />
            </View>
          </View>


          {
            props.isLoading === false ?
              <TouchableOpacity style={styles.loginButton} onPress={login}>
                <Text style={styles.loginButton_text}>
                  Login
              </Text>
              </TouchableOpacity>
              :

              <TouchableOpacity style={styles.loginButton} disabled={true}>
                <ActivityIndicator size={25} color="white" />
              </TouchableOpacity>
          }



          <View style={styles.signInActions}>
            <TouchableOpacity onPress={() => navigation.navigate('signUp')}>
              <Text style={styles.signInActions_links}>
                Signup
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
    </KeyboardAwareScrollView>

  );
}

const styles = StyleSheet.create({
  signInContainer: {
    alignItems: 'center',
    // justifyContent: 'center',
    // height: StatusBar.currentHeight,
    backgroundColor: '#f3f8fe',
    flex: 1,
  },
  col_1: {
    height: height / 2.4,
    width: width / 1,
    // backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  },
  signInIconFrame: {
    height: height / 4.5,
    width: width / 2.3,
    backgroundColor: '#3e4685',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  col_2: {
    height: height / 1.7,
    width: width / 1,
    // backgroundColor: 'purple'
  },
  fieldContainer: {
    backgroundColor: 'white',
    margin: 14,
    borderRadius: 10,
    height: height / 7,
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
  console.log('Redux State - SignIn Screen', state.root.signIn_success)
  return {
    isLoading: state.root.signIn_success
  }
}
function mapDispatchToProps(dispatch) {
  return ({
    logInAction: (email, password) => { dispatch(logIn(email, password)) },
    // setNavigationPropsAction: (navigation) => { dispatch(setNavigationProps(navigation)) }
  })
}
export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);

