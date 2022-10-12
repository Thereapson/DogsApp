import { useSelector } from "react-redux";

import style from "./Create.module.css";

function CardB({ id }) {

    const { details } = useSelector((state) => state)
    let info = details[0];
    if (info === 404) { return <div>PERRO NO ENCONTRADO DE LA BASE DE DATOS</div> }

    if (!info) return (<div></div>)

    return (
        <div className={style.background}>
            <div className={style.cardB}>
                {info === 404 ? console.log("not found cardB") :
                    info.id !== id ? console.log("error detail . id") :
                        <div className={style.info}>
                            <h1 className={style.h1}>{info.name.toUpperCase()}</h1>
                            <img alt="" src={info.img ? info.img : `https://cdn.shopify.com/s/files/1/0042/7563/4222/collections/snoopy-logo.png?v=1631603429`} className={style.img} />
                            {info.height ? <p className={style.p1}>height:  <label className={style.label1}> {info.height + " cm"}</label> </p> : null}
                            {info.weight ? <p className={style.p1}>weight:  <label className={style.label1}> {info.weight[0] + " - " + info.weight[1] + " Kg"}</label> </p> : null}
                            {info.life_span ? <p className={style.p1}>life_span:  <label className={style.label1}> {info.life_span}</label> </p> : null}

                            {info.tempers.length > 0 ? <div className={style.tempers}>
                                {info.tempers.map((e, i) => <div className={style.buton} key={i} >{e.toUpperCase()}</div>)}
                            </div> : null}
                        </div>}
            </div>
        </div>
    )
}

export default CardB;