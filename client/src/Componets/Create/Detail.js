import SearchBar from "../SearchBar/NavBar";
import { findById } from "../../Reducer/Actions";
import CardB from "./CardB";



import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";;



function Detail() {
    const dispatch = useDispatch();
    let id = useParams().id;
    console.log(id)

    findById(id, dispatch)

    return (
        <div>
            <SearchBar btn="false" />
            <CardB id={parseInt(id)} dispatch={dispatch} />
        </div>
    );
}

export default Detail;