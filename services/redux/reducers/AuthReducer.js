import { LOGIN } from "../actions/AuthAction"


const initialState={
    
}
const AuthReducer = function(state=initialState,action){
    switch (action.type) {
        case LOGIN: {
            return {
                ...state,
            }
        }
        default:
            return state
    }
}

export default AuthReducer