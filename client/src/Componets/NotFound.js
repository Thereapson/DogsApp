import style from "./NotFound.module.css";
import { NavLink } from "react-router-dom";


function NotFound() {
    return (
        <div className={style.not}>
            <img className={style.img}/>
            <NavLink to="/home" />
        </div> 
    )
}

export default NotFound;