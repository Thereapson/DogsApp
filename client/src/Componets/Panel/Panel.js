import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";


import { orderByName, allDogs2, findTemperament, apiDb } from "../../Reducer/Actions";
import "./Panel.css"

function Panel() {
    const dispatch = useDispatch();
    const { temperaments } = useSelector((state) => state)

    function Click(e) {
        apiDb(e, dispatch)
    }

    function Click2(e) { if (e.target.value !== "1") { orderByName(e.target.value)(dispatch) } }

    function Click3() { allDogs2(dispatch) }

    function Click4(e) { if (e.target.value !== null) { findTemperament(e.target.value)(dispatch) } }


    return (
        <div id="PANEL" className="Active_Panel">
            <button name="CLEAR" className="boton" onClick={(() => Click3())}>Show all Dogs</button>
            <select name="nombre" className="boton" onChange={(e) => Click2(e)}>
                <option value="1">Select---</option>
                <option value="AZ">Order by name (A-Z)</option>
                <option value="ZA">Order by name (Z-A)</option>
                <option value="MIN">Order by weight(MIN-MAX)</option>
                <option value="MAX">Order by weight(MAX-MIN)</option>
            </select>
            {temperaments.length ? <select name="Temps" className="boton" onChange={(e) => Click4(e)}>
                <option value={null}>Select Temper---</option>
                {temperaments.map(e =>
                    <option value={e.id} key={e.id}>{e.name.toUpperCase()}</option>)}
            </select> : null}

            <div className="apidb">
                <NavLink to='/Home' id="API" className="boton" onClick={(e) => Click("api")}>API</NavLink>
                <NavLink to='/Home' id="DB" className="boton" onClick={(e) => Click("db")}>DATABASE</NavLink>
            </div>
        </div >
    )

}


export default Panel