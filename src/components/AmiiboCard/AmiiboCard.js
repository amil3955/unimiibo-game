import style from './AmiiboCard.module.css'
import {Link} from "react-router-dom";
import placeholder404 from '../../assets/Placeholder/amiibo_placeholder_404.png'
import React, {useState} from "react";
import {colors, seriesMapPalette} from "../../utilities/Colors";
import {strHashCode} from "../../utilities/Utils";

function indexSeries(series) {
    return strHashCode(series) % colors.length;
}

function AmiiboCard({amiibo, reactive = false}) {

    const {id, name, character, series, img} = amiibo;
    const [isLoading, setIsLoading] = useState(true);

    let index = indexSeries(series);
    let color = seriesMapPalette[series] ?? colors[index];

    const card = (
        <>
            <div className={`${style.bgCard} ${style.gradient} ${style[color]} hue-variance ${color}`}/>
            <div className={`${style.cardBorder} my-border ${color}`}/>
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
                    <div className={`${style.myCardTextName} text-truncate`}>{name}</div>
                    <div className={`${style.myCardTextSeries} text-truncate`}>{series}</div>
                </div>
            </div>
        </>
    );

    return (
        <div className="d-flex justify-content-center">
            {
                reactive ?
                <Link to={`/amiibo-details/${id}`} className={`${style.myCard}`}>
                    {card}
                </Link> :
                <div className={`${style.myCard}`}>
                    {card}
                </div>
            }
        </div>
    );
}

export default AmiiboCard;