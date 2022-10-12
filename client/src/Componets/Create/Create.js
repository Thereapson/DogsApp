import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CreateNewDog } from "../../Reducer/Actions";
import SearchBar from '../SearchBar/NavBar';
import style from './Create.module.css';
import './Create.css'



function validate(input) {
    let errores = {};
    console.log(input)

    if (input.temperaments.length === 0) { errores.temperaments = "select at least one temperament for the dog" }

    if (input.weight1 === 0 && isNaN(input.weight2)) { errores.weight = "At least one value is required" }

    if (input.height1 === 0 && isNaN(input.height2)) { errores.height = "At least one value is required" }

    if (input.name === "") { errores.name = "Name is required" }

    if (input.name !== "" && input.temperaments.length > 0 && (input.height1 !== 0 || isNaN(input.height2))) {

        return null

    }

    return errores

}

function NewDog() {

    const { temperaments } = useSelector((state) => state)
    const dispatch = useDispatch();
    const [input, setInput] = React.useState({
        name: "",
        height1: 0,
        height2: NaN,
        weight1: 0,
        weight2: NaN,
        life_span1: 0,
        life_span2: NaN,
        temperaments: [],
        img: null,

    })

    const [errores, setErrores] = useState({})

    const submitar = async (e) => {
        e.preventDefault();
        let formulario = document.getElementById('formul')
        let errorFind = validate(input)

        if (!errorFind) {
            let x = await CreateNewDog(input, dispatch);
            console.log(x)

            setErrores({ good: x });
            setInput({ name: "", height1: 0, height2: NaN, weight1: 0, weight2: NaN, life_span1: 0, life_span2: NaN, temperaments: input.temperaments, img: null });
            formulario.reset()
        } else {
            setErrores(errorFind)
        }
    }

    const Changes = (e) => {
        if (e.target.name === "img" && e.target.value === "") { setInput({ ...input, img: null }); return }
        setInput({ ...input, [e.target.name]: e.target.value });
        if (e.target.value === "" && e.target.name === "name") {
            setErrores({ ...errores, name: "The name is required" })
        } else if (e.target.value !== "" && e.target.name === "name") {
            setErrores({ ...errores, name: null })
        }
        console.log(input)
    }

    const Tempers2 = (e) => {
        if (e.target.className === "botonot") {
            e.target.className = "botonselect";
            setInput({ ...input, temperaments: input.temperaments.concat((e.target.id)) })
        } else {
            e.target.className = "botonot";
            setInput({ ...input, temperaments: input.temperaments.filter(el => el !== e.target.id) })
        }
    }


    return (
        <div>
            <SearchBar btn="false" />
            <div className={style.background} >
                <form className={style.form} onSubmit={(e) => submitar(e)} id="formul">

                    <h1>CREATE A NEW DOG</h1>
                    <div className={style.divs}>
                        Name:<input name="name" className={style.text} placeholder="Insert a name" onChange={(e) => Changes(e)} />
                    </div>
                    {errores.name ? <label className={style.errors}>{errores.name}</label> : null}

                    <div className={style.divs}>
                        Height:<input name="height1" className={style.num} type="number" min="0" defaultValue={0} onChange={(e) => Changes(e)} /> -
                        <input name="height2" className={style.num} type="number" min={input.height1 ? parseInt(input.height1) + 1 : 1} onChange={(e) => Changes(e)} /> cm
                    </div>
                    {errores.height ? <label className={style.errors}>{errores.height}</label> : null}
                    <div className={style.divs}>
                        Weight:<input name="weight1" className={style.num} type="number" min="0" defaultValue={0} onChange={(e) => Changes(e)} /> -
                        <input name="weight2" className={style.num} type="number" min={input.weight1 ? parseInt(input.weight1) + 1 : 1} onChange={(e) => Changes(e)} /> Kg
                    </div>
                    {errores.weight ? <label className={style.errors}>{errores.weight}</label> : null}
                    <div className={style.divs}>
                        Life Span:<input name="life_span1" className={style.num} type="number" min="0" defaultValue={0} onChange={(e) => Changes(e)} /> -
                        <input name="life_span2" className={style.num} type="number" min={input.life_span1 ? parseInt(input.life_span1) + 1 : 1} onChange={(e) => Changes(e)} /> Years
                    </div>


                    <div className={style.divs}>Url Image : <input name="img" type="url" className={style.text} placeholder="Insert a URL..." onChange={(e) => Changes(e)} /></div>

                    <div className={style.tp}>
                        {temperaments ? temperaments.sort((prev, next) => {
                            return prev.name > next.name ? 1 : -1
                        }).map(e =>
                            <div id={e.id} className="botonot" onClick={(e) => Tempers2(e)} key={e.id}>{e.name}</div>
                        ) : null}
                    </div>
                    {errores.temperaments ? <label className={style.errors}>{errores.temperaments}</label> : null}

                    <input type="submit" value="send" className={style.send} ></input>
                    {errores.good ? <label className={style.good}>{errores.good}</label> : null}
                </form>

            </div>
        </div>
    )
}

export default NewDog;