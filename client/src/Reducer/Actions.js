import axios from "axios";
import { useDispatch } from "react-redux";

export async function AllDogs() {
    const dispatch = useDispatch();
    await axios.get(`/dogs`)
        .then((resp) => {
            console.log("ya tengo las razas")
            dispatch({ type: "GET_DOGS", payload: resp.data })
        })
        .catch((err) => {
            console.log(err)
            alert("Algo salio mal!")
        });
};

export async function AllTempers() {
    const dispatch = useDispatch();
    await axios.get(`/temperaments`)
        .then((resp) => {
            console.log("ya tengo los tempermanetos")
            dispatch({ type: "GET_TEMPERAMENTS", payload: resp.data })
        })
        .catch((err) => {
            console.log(err)
            alert("Algo salio mal!")
        });
};

export async function allDogs2(dispatch) {
    await axios.get(`/dogs`)
        .then((resp) => {
            dispatch({ type: "GET_DOGS", payload: resp.data })
        })
        .catch((err) => {
            console.log(err)
            alert("Algo salio mal!")
        })
};

export async function findByName(name, dispatch, only = null) {
    await axios.get(`/dogs?name=${name}`)
        .then((resp) => {
            dispatch({ type: "GET_BY_NAME", payload: resp.data });
        })
        .catch((err) => {
            dispatch({ type: "GET_BY_NAME", payload: [err.response.statusText] });
        });
};

export async function CreateNewDog(input, dispatch) {

    input.name = input.name.toLowerCase();
    input.height1 = input.height1 === 0 ? NaN : input.height1
    input.height = input.height1 + " - " + input.height2
    input.weight1 = input.weight1 === 0 ? NaN : input.weight1
    input.weight = input.weight1 + " - " + input.weight2
    input.temperament = input.temperaments

    return await axios.post(`/dogs`, input)
        .then(res => {
            if (res.data.successful) { allDogs2(dispatch) } return res.data.message
        })
        .catch((err) => {
            console.log(err);
            alert("Algo salio mal!")
        });


};

export async function apiDb(dc, dispatch) {

    await axios.get(`/dogs/${dc}`)
        .then((resp) => {
            dispatch({ type: "GET_BY_NAME", payload: resp.data });
        })
        .catch((err) => {
            dispatch({ type: "GET_BY_NAME", payload: [err.response.statusText] });
        });
}

export async function clear(dispatch) {
    dispatch({ type: "CLEAR" })
};

export async function findById(id, dispatch) {
    await axios.get(`/dogs/${id}`)
        .then((resp) => {
            console.log(resp.data)
            dispatch({ type: "GET_DETAIL", payload: resp.data })
        })
        .catch((err) => {
            dispatch({ type: "GET_DETAIL", payload: 404 })
            console.log(err)
        })

};

export function orderByName(payload) {
    return async function (dispatch) {
        dispatch({ type: "ORDER", payload: payload })
    }
};



export function findTemperament(id) {
    return async function (dispatch) {
        dispatch({ type: "GET_TEMPERAMENT_ID", payload: id })
    }
};

export function order(temperament) {
    return async function (dispatch) {
        dispatch({ type: "ORDER_TEMPERAMENT", payload: temperament })
    }
};