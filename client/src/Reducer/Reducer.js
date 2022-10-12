const initialState = {
    totalDogs: [],
    filteredDogs: [],
    temperaments: [],
    details: [],
}

export default function rootReducer(state = initialState, { type, payload }) {
    switch (type) {
        case "GET_DOGS":
            if (payload.length > 60) {
                let ids = [];
                let all = payload.filter(elem => {
                    if (ids.find(e => e === elem.id)) { return false }
                    else { ids.push(elem.id); return true }
                });
                return {
                    ...state,
                    totalDogs: all,
                    filteredDogs: all,
                };
            }
            return {
                ...state,
                totalDogs: payload,
                filteredDogs: payload
            };

        case "GET_TEMPERAMENTS":
            return {
                ...state,
                temperaments: payload,

            }


        case "GET_BY_NAME":
            console.log(payload)
            if(payload.length===0) return alert('No hay coincidencias')
            return {
                ...state,
                filteredDogs: payload
            };

        case "GET_DETAIL":
            console.log(payload)
            return {
                ...state,
                details: [payload]
            };

        case "ORDER":
            if (payload === "AZ") {
                return {
                    ...state,
                    filteredDogs: state.filteredDogs.sort((prev, next) => {
                        return prev.name > next.name ? 1 : -1
                    }),
                };
            } else if (payload === "ZA") {
                return {
                    ...state,
                    filteredDogs: state.filteredDogs.sort((prev, next) => {
                        return prev.name > next.name ? -1 : 1
                    }),
                };
            } else if (payload === "MIN") {
                return {
                    ...state,
                    filteredDogs: state.filteredDogs.sort((prev, next) => {

                        let a = parseInt(prev.weight[0])
                        let b = parseInt(next.weight[0])

                        if (isNaN(a)) { a = parseInt(prev.weight[1]) }
                        if (isNaN(b)) { b = parseInt(next.weight[1]) }


                        return a > b ? 1 : -1
                    }),
                };
            } else if (payload === "MAX") {
                return {
                    ...state,
                    filteredDogs: state.filteredDogs.sort((prev, next) => {
                        let a = parseInt(prev.weight[1])
                        let b = parseInt(next.weight[1])

                        if (isNaN(a)) { a = parseInt(prev.weight[0]) }
                        if (isNaN(b)) { b = parseInt(next.weight[0]) }


                        return a > b ? -1 : 1
                    }),
                };
            } else {
                return state
            };

        // case "TEMP_FILTER":
        //     if (payload.temperaments === "ADD") {
        //         return {
        //             ...state,
        //             filteredTemps: state.filteredTemps.concat(payload.id)
        //         }
        //     } else if (payload.temperaments === "REMOVE") {
        //         return {
        //             ...state,
        //             filteredTemps: state.filteredTemps.filter(e => e.id !== payload.id[0])
        //         }
        //     } else return {
        //         state
        //     }

        case "GET_TEMPERAMENT_ID":
            let todos = state.totalDogs
            todos = todos.filter((e) => {

                let b = e.tempers ? e.tempers.map(ele => ele.toLowerCase()) : null;
                b = b ? b.find(ele => ele === payload) : null;

                if (b) {
                    return true
                } else {
                    return false
                }
            })
            return {
                ...state,
                filteredDogs: todos
            }

        // case "ORDER_TEMPERAMENT":
        //     if (payload === "AZ") {
        //         return {
        //             ...state,
        //             other: state.other.sort((prev, next) => {
        //                 return prev.name > next.name ? -1 : 1
        //             }),
        //         };
        //     } else if (payload === "ZA") {
        //         return {
        //             ...state,
        //             other: state.other.sort((prev, next) => {
        //                 return prev.name > next.name ? 1 : -1
        //             })
        //         };
        //     } else {
        //         return state
        //     }

        case "POST_DOG":
            return {
                ...state,
                totalDogs: payload,
                filteredDogs: payload
            };

        case "CLEAR":
            return {
                ...state,
                filteredDogs: state.totalDogs
            };

        default:
            return state
    }
}