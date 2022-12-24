import style from './AmiiboCard.module.css'
import {Link} from "react-router-dom";
import placeholder404 from '../../assets/Placeholder/amiibo_placeholder_404.png'
import React, {useState} from "react";

const palette = {
    pink: {
        gradient: style.pinkGradient,
        border:   style.pinkBorder
    },
    red: {
        gradient: style.redGradient,
        border:   style.redBorder
    },
    orange: {
        gradient: style.orangeGradient,
        border:   style.orangeBorder
    },
    yellow: {
        gradient: style.yellowGradient,
        border:   style.yellowBorder
    },
    green: {
        gradient: style.greenGradient,
        border:   style.greenBorder
    },
    blue: {
        gradient: style.blueGradient,
        border:   style.blueBorder
    },
    purple: {
        gradient: style.purpleGradient,
        border:   style.purpleBorder
    },
    grey: {
        gradient: style.greyGradient,
        border:   style.greyBorder
    }
};

let paletteKeys = Object.keys(palette);

const seriesMapPalette = {
    "Super Mario": 'red',
    "Donkey Kong": 'orange',
    "The Legend of Zelda": 'green',
    "Breath of the Wild": 'green',
    "Animal Crossing": 'yellow',
    "Metroid": 'blue',
    "Wii Fit": 'blue',
    "Classic Nintendo": 'grey',
    "Splatoon": 'orange',
    "Pokemon": 'red',
    "Kirby": 'pink',
    "Fire Emblem": 'grey',
    "Sonic": 'blue',
    "Bayonetta": 'pink',
    "Pac-man": 'yellow',
    "Megaman": 'blue',
    "Final Fantasy": 'grey',
    "Castlevania": 'blue',
    "Persona": 'grey',
    "Banjo Kazooie": 'orange',
    "Minecraft": 'green',
};

function strHashCode(str)
{
    let hash = 0,
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
    return strHashCode(series) % paletteKeys.length;
}

function AmiiboCard({id, name, character, series, type, img}) {

    const [isLoading, setIsLoading] = useState(true);

    let index = indexSeries(series);
    let color = palette[seriesMapPalette[series]] ? seriesMapPalette[series] : paletteKeys[index];
    let chosenPalette = palette[color];

    return (
        <div className="d-flex justify-content-center">
            <Link to={`/amiibo-details/${id}`} className={`${style.myCard}`}>
                <div className={`${style.bgCard} ${chosenPalette.gradient}`}/>
                <div className={`${style.border} ${chosenPalette.border}`}/>
                {!isLoading ? '' : (
                    <div className={`${style.loadingSpinner}`}>
                        <div className="text-center">
                            <div className={`spinner-border ${style[color]}`} role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>
                )}
                <img className={`${style.amiiboImg} ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                     src={img}
                     loading="lazy"
                     placeholder={placeholder404}
                     alt={`[${character}] - ${name}`}
                     onError={(e) => e.target.src = placeholder404}
                     onLoad={() => setIsLoading(false)}
                />
                <div className={style.myCardTextPosition}>
                    <div className={`${style.myCardTextWrapper}`}>
                        <p className={`${style.myCardTextCharacter} text-truncate`}>{`[ ${character} ]`}</p>
                        <p className={`${style.myCardTextName} text-truncate`}>{name}</p>
                        <p className={`${style.myCardTextSeries} text-truncate`}>{series}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default AmiiboCard;