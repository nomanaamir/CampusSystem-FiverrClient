import { ActionTypes } from '../Actions/actions';
import * as firebase from 'firebase';
// import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
let redirect = {};
let auth = firebase.auth();
let database = firebase.database().ref();
let storage = firebase.storage().ref();


async function storeData(data) {
    try {
        await AsyncStorage.setItem('user',
            JSON.stringify({
                'data': {
                    user: data,
                    isLoggedIn: true
                }
            })
        );
    } catch (error) {
        console.log('Cant store data in AsyncStorage: ', error)
        // Error saving data
    }
};
export function setNavigationProps(navigation) {
    console.log('navigation:', navigation)
    return dispatch => {
        redirect = navigation;
        dispatch({ type: ActionTypes.NAVIGATION_PROPS, payload: navigation })


    }
}
export const retrieveDataAssyncStorage = () => async dispatch => {
    const response = await AsyncStorage.getItem('user');
    console.log('userrr from async', response)
    if (response !== null) {

        setTimeout(() => {
            dispatch({ type: ActionTypes.GET_DATA_FROM_ASYNCSTORAGE, payload: JSON.parse(response) })
        });

    }
}
export function resetStoredData() {
    return dispatch => {

        dispatch({ type: ActionTypes.GET_DATA_FROM_ASYNCSTORAGE, payload: {} })


    }
}
export function logIn(email, password) {
    return dispatch => {
        dispatch({ type: ActionTypes.SIGN_IN_SUCCESS, payload: true })

        auth.signInWithEmailAndPassword(email, password).then(ev => {
            if (ev) {
                dispatch(getUserData(ev.user.uid))
                dispatch({ type: ActionTypes.SIGN_IN_SUCCESS, payload: false })

            }
        }).catch(error => {
            dispatch({ type: ActionTypes.SIGN_IN_SUCCESS, payload: false })
            alert(error.message)
        })


    }
}

export function signUp(email, password, image, user) {
    return dispatch => {
        dispatch({ type: ActionTypes.SIGN_UP_SUCCESS, payload: true })

        auth.createUserWithEmailAndPassword(email, password).then(ev => {
            // storeData(ev.user.email, ev.user.uid)
            // storeData(data)
            console.log('email:', ev.user.email)
            console.log('uid:', ev.user.uid)
            uploadImageAsync(image, ev.user.uid).then(url => {
                database.child(`users/${ev.user.uid}`).set(Object.assign({}, user, { profileImg: url, uid: ev.user.uid })).then(() => {
                    dispatch(getUserData(ev.user.uid))
                    dispatch({ type: ActionTypes.SIGN_UP_SUCCESS, payload: false })

                }).catch(error => {
                    dispatch({ type: ActionTypes.SIGN_UP_SUCCESS, payload: false })
                    console.log('database error', error)
                })

                console.log('uploadImageAsync(image, ev.user.uid)', url)
            }).catch(error => alert('Error on image uploading'))

            // storage.child(`profile-pictures/${ev.user.uid}`).put(image).then((snap) => {
            //     snap.ref.getDownloadURL()
            //         .then((url) => {
            //             console.log('DOWNLOAD_URL: ', url)
            //             database.child(`users/${ev.user.uid}`).set(Object.assign({}, user, { profileImg: url, uid: ev.user.uid })).then(() => {
            //                 dispatch(getUserData(ev.user.uid))
            //                 dispatch({ type: ActionTypes.SIGN_UP_SUCCESS, payload: false })

            //             }).catch(error => {
            //                 dispatch({ type: ActionTypes.SIGN_UP_SUCCESS, payload: false })
            //                 console.log('database error', error)
            //             })

            //         })
            // }).catch(error => {
            //     dispatch({ type: ActionTypes.SIGN_UP_SUCCESS, payload: false })
            //     console.log('picture upload error', error)
            // })

        }).catch(error => {
            alert(error.message)
            console.log('signUp error', error)
            dispatch({ type: ActionTypes.SIGN_UP_SUCCESS, payload: false })
        })


    }
}

export function getUserData(uid) {
    return dispatch => {
        console.log('UID GET DATA: ', uid)
        database.child(`users/${uid}`).on('value', ev => {
            console.log('ev.val()', ev.val())
            storeData(ev.val())
            dispatch(retrieveDataAssyncStorage())
            dispatch(getUserSkills())
            redirect.navigate('profile')
        })
    }
}

export function getUserSkills() {
    return dispatch => {
        database.child('skills').on('value', ev => {
            console.log('skills get', ev.val())
            dispatch({ type: ActionTypes.GET_SKILLS_SUCCESS, payload: ev.val() })
        })
    }
}

export function logOut() {
    return dispatch => {
        auth.signOut().then(() => {
            AsyncStorage.clear().then(() => {
                dispatch(resetStoredData())
                redirect.navigate('signIn')
            })
        })
    }
}
async function uploadImageAsync(uri, uid) {
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response); // when BlobModule finishes reading, resolve with the blob
        };
        xhr.onerror = function () {
            reject(new TypeError('Network request failed')); // error occurred, rejecting
        };
        xhr.responseType = 'blob'; // use BlobModule's UriHandler
        xhr.open('GET', uri, true); // fetch the blob from uri in async mode
        xhr.send(null); // no initial data
    });

    // do something with the blob, eg. upload it to firebase (API v5.6.0 below)
    const ref = firebase
        .storage()
        .ref()
        .child(`profile-pictures/${uid}`);
    const snapshot = await ref.put(blob);
    const remoteUri = await snapshot.ref.getDownloadURL();

    // when we're done sending it, close and release the blob
    blob.close();

    // return the result, eg. remote URI to the image
    return remoteUri;
}