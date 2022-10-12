import { NavLink } from "react-router-dom";
import style from './Loading.module.css'

import Icon from './Paw.png';

function loading() {
    return (
        <div className={style.conteiner}>
            <NavLink to='/Home'>
                <img className={style.img} src={Icon} alt="" />
            </NavLink>
        </div>
    )
}

export default loading