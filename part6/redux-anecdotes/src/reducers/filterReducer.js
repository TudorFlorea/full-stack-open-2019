const initState = {
    filterValue: ""
};

export const setFilter = value => {
    return {
        type: "SET_FILTER",
        data: {
            value
        }
    }
}

const filterReducer = (state = initState, action) => {
    switch(action.type) {
        case "SET_FILTER":
            return {
                ...state,
                filterValue: action.data.value
            };
        default:
            return state;
    }
}

export default filterReducer;