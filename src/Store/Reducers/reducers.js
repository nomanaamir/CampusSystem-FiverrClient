import { ActionTypes } from '../Actions/actions';

const InitialState = {

    signIn_success: false,
    signIn_error: '',

    navigation_props: {},
    async_storage_data: {},

    user_skills: {},

    signUp_success: false
}
export default (state = InitialState, action) => {
    switch (action.type) {
        case ActionTypes.SIGN_IN_SUCCESS:
            return ({ ...state, signIn_success: action.payload });
        case ActionTypes.SIGN_IN_ERROR:
            return ({ ...state, signIn_error: action.payload });
        case ActionTypes.NAVIGATION_PROPS:
            return ({ ...state, navigation_props: action.payload });
        case ActionTypes.GET_DATA_FROM_ASYNCSTORAGE:
            return ({ ...state, async_storage_data: action.payload });
        case ActionTypes.SIGN_UP_SUCCESS:
            return ({ ...state, signUp_success: action.payload });
        case ActionTypes.GET_SKILLS_SUCCESS:
            return ({ ...state, user_skills: action.payload });


        default:
            return state;
    }
}