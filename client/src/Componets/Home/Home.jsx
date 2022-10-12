import Panel from "../Panel/Panel";
import SearchBar from "../SearchBar/NavBar";
import style from './Home.module.css';

import Cards from './Cards';


function home() {
    return (
        <div >
            <SearchBar other="yes" />
            <div className={style.home} >
                <Cards />
                <Panel />
            </div>
        </div>

    )
}


export default home;