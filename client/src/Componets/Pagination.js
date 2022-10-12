import { NavLink } from "react-router-dom";

import style from './Pagination.module.css';

function Pagination({ page, max, url }) {
    let a = ">"
    let b = "<"

    return (
        <div className={style.container}>
            {page - 2 > 0 ? <NavLink to={`${url}1`} className={style.flecha}>{b + b} </NavLink> : null}
            {page - 1 > 0 ? <NavLink to={`${url}${page - 1}`} className={style.flecha}>{b}</NavLink> : null}
            {page - 2 > 0 ? <NavLink to={`${url}${page - 2}`} className={style.flecha}>{page - 2}</NavLink> : null}
            {page - 1 > 0 ? <NavLink to={`${url}${page - 1}`} className={style.flecha}>{page - 1}</NavLink> : null}
            <NavLink to={`${url}${page}`} className={style.flecha}>{page}</NavLink>
            {page + 1 <= max ? <NavLink to={`${url}${page + 1}`} className={style.flecha}>{page + 1}</NavLink> : null}
            {page + 2 <= max ? <NavLink to={`${url}${page + 2}`} className={style.flecha}>{page + 2}</NavLink> : null}
            {page + 1 <= max ? <NavLink to={`${url}${page + 1}`} className={style.flecha}>{a}</NavLink> : null}
            {page + 2 <= max ? <NavLink to={`${url}${max}`} className={style.flecha}>{a + a} </NavLink> : null}
        </div>
    )

}


export default Pagination;