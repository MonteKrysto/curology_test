interface State {
    firstName: String;
    lastName: String;
    email: String;
    address: {
        street1: String;
        street2: String;
        city: String;
        state: String;
        zip: String;
    };
    phone: String;
    quantity: number;
    total: String;
    payment: {
        ccNum: String;
        exp: String;
    };
}

export const initialState: State = {
    firstName: "",
    lastName: "",
    email: "",
    address: {
        street1: "",
        street2: "",
        city: "",
        state: "",
        zip: ""
    },
    phone: "",
    quantity: 0,
    total: "",
    payment: {
        ccNum: "",
        exp: ""
    }
};

export const formReducer = (state, action) => {
    switch (action.type) {
        case "FIRST_LEVEL":
            return {
                ...state,
                [action.field]: action.value
            };
        case "SECOND_LEVEL":
            return {
                ...state,
                [action.parent]: {
                    ...state[action.parent],
                    [action.field]: action.value
                }
            };
        case "CLEAR_FORM":
            return initialState;
        default:
            throw new Error();
    }
};
