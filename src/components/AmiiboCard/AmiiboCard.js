import style from './AmiiboCard.module.css'
import {Link} from "react-router-dom";
import placeholder404 from '../../assets/Placeholder/amiibo_placeholder_404.png'
import React, {useState} from "react";
import {seriesMapPalette} from "../../utilities/Colors";
import {strHashCode} from "../../utilities/Utils";

const palette = {
    pink: {
        gradient: style.pinkGradient,
        border:   'pinkBorder'
    },
    red: {
        gradient: style.redGradient,
        border:   'redBorder'
    },
    orange: {
        gradient: style.orangeGradient,
        border:   'orangeBorder'
    },
    yellow: {
        gradient: style.yellowGradient,
        border:   'yellowBorder'
    },
    green: {
        gradient: style.greenGradient,
        border:   'greenBorder'
    },
    blue: {
        gradient: style.blueGradient,
        border:   'blueBorder'
    },
    purple: {
        gradient: style.purpleGradient,
        border:   'purpleBorder'
    },
    grey: {
        gradient: style.greyGradient,
        border:   'greyBorder'
    }
};

let paletteKeys = Object.keys(palette);

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
                            <div className={`spinner-border ${color}`} role="status">
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
                        <p className={`${style.myCardTextName} text-truncate`}>{name}</p>
                        <p className={`${style.myCardTextSeries} text-truncate`}>{series}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default AmiiboCard;