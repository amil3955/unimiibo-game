import style from './AmiiboCard.module.css'
import {Link} from "react-router-dom";

function strHashCode (str)
{
    var hash = 0,
        i, chr;
    if (str.length === 0) return hash;
    for (i = 0; i < str.length; i++)
    {
        chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0;
    }
    return Math.abs(hash);
}

function indexSeries(series)
{
    return strHashCode(series) % gradients.length;
}

const seriesMapGradient =
    {
        "Super Smash Bros.": style.purpleGradient,
        "Super Mario Bros.": style.redGradient,
        "Chibi-Robo!": style.yellowGradient,
        "Yoshi's Woolly World": style.greenGradient,
        "Animal Crossing": style.greenGradient,
        "8-bit Mario": style.redGradient,
        "Skylanders": style.blueGradient,
        "Splatoon": style.orangeGradient,
        "Legend Of Zelda": style.greenGradient,
        "Shovel Knight": style.darkGradient,
        "Kirby": style.purpleGradient,
        "Pokemon": style.redGradient,
        "Mario Sports Superstars": style.redGradient,
        "Monster Hunter": style.blueGradient,
        "BoxBoy!": style.darkGradient,
        "Pikmin": style.yellowGradient,
        "Fire Emblem": style.darkGradient,
        "Metroid": style.blueGradient,
        "Others": style.darkGradient,
        "Mega Man": style.blueGradient,
        "Diablo": style.redGradient,
        "Power Pros": style.orangeGradient,
        "Monster Hunter Rise": style.blueGradient,
        "Yu-Gi-Oh!": style.purpleGradient,
        "Super Nintendo World": style.yellowGradient
    };

const gradients = [style.redGradient, style.blueGradient, style.yellowGradient, style.greenGradient, style.orangeGradient, style.purpleGradient, style.darkGradient];

function AmiiboCard({id, name, series, type, img}) {

    let index = indexSeries(series);
    let chosenGradient = seriesMapGradient[series]??gradients[index];

    return (
        <div className="d-flex justify-content-center">
            <Link to={`/amiibo-details/${id}`} className={`${style.myCard}`}>
                <div className={`${style.bgCard} ${chosenGradient}`}/>
                <img className={style.amiiboImg} src={img} alt=""/>
                <div className={style.myCardTextPosition}>
                    <div className={style.myCardTextWrapper}>
                        <p className={`${style.myCardTextName} text-truncate`}>{name}</p>
                        <p className={`${style.myCardTextSeries} text-truncate`}>{series}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default AmiiboCard;