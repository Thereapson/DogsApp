import { NavLink } from "react-router-dom";
import style from './Home.module.css';
import { findTemperament } from '../../Reducer/Actions';
import { useDispatch } from "react-redux";


function Card(props) {

    const dispatch = useDispatch();
    var { name, id, img, tempers } = props.data;

    function Click(id) { findTemperament(id)(dispatch) }

    return (

        <div className={style.Card} >
            <NavLink className={style.link} to={`/dog/${id}`}>{name.toUpperCase()}</NavLink>
            <img className={style.img} src={img ? img : `https://cdn.shopify.com/s/files/1/0042/7563/4222/collections/snoopy-logo.png?v=1631603429`} alt="" ></img>
            <div className={style.temper}>
                {tempers ? tempers.map(e => <button className={style.butons} key={e} onClick={() => Click(e.toLowerCase())}>{e.toUpperCase()} </button>) : null}
            </div>
        </div >
    )
}

export default Card;