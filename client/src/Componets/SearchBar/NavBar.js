import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import imagen from './menu.png'

import style from './NavBar.module.css'
import { findByName } from '../../Reducer/Actions'

function SearchBar(props) {
    const dispatch = useDispatch();
    const [value, setValue] = useState("");


    const Find = () => {
        if (value !== "") {
            console.log(findByName(value, dispatch))
            findByName(value, dispatch);
        }
    }

    function Panel() {
        let panel = document.getElementById("PANEL")
        if (panel) {
            panel.className === "Active_Panel" ? panel.className = "Not_Panel" : panel.className = "Active_Panel"
        }
    }

    const Changes = (e) => {
        setValue(e.target.value)
    }



    return (
        <div className={style.nav} >
            {props.other === "yes" ? <NavLink to='/' className={style.btn}> LANDING </NavLink> : <NavLink to='/home' className={style.btn}>HOME</NavLink>}
            <div className={style.sear}>
                <input placeholder="Find Dog" id="Find" onChange={(e) => Changes(e)} className={style.input} />
                <button onClick={() => Find()} className={style.btn2}><NavLink to='/Home' className={style.NavLink} >SEARCH</NavLink></button>
            </div>
            <NavLink to='/Create' className={style.btn}>CREATE NEW DOG</NavLink>
            {props.btn === "false" ? null : <button onClick={() => Panel()} className={style.btn3}><img className={style.img} alt="" src={imagen} /></button>}
        </div>
    )
}

export default SearchBar;