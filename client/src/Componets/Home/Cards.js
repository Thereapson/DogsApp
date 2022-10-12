import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Card from "./Card";
import style from "./Home.module.css";
import Pagination from "../Pagination";

function Cards() {

    const maxDogs = 8;

    const { filteredDogs, totalDogs } = useSelector((state) => state);
    let b = parseInt(useParams().page);

    const maxPage = filteredDogs.length > 1 ? Math.ceil(filteredDogs.length / maxDogs) : 1;

    let page = b > 0 ? b : 1;

    var lastIndex = maxDogs * page;
    var firstIndex = maxDogs * (page - 1);
    const list = maxPage > 1 ? filteredDogs.slice(firstIndex, lastIndex) : filteredDogs;


    return (
        <div className={style.info}>
            {totalDogs.length === 0 ? console.log("Hay un problema!") :
                filteredDogs[0] === "Not found" ? alert('No existe esta raza') :
                    page > maxPage ? alert("no existe la raza.") :
                        <div className={style.cards}>
                            {list.map(e => <Card key={e.id} data={e} />)}
                        </div>}
            {maxPage >= 1 && page <= maxPage && totalDogs.length !== 0 && filteredDogs[0] !== "Not Found" ?
                <Pagination page={page} max={maxPage} url="/home/"></Pagination> : null}
        </div>
    )
}

export default Cards;