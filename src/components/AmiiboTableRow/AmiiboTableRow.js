import React, {useState} from "react";
import style from './AmiiboTableRow.module.css'
import {seriesMapPalette} from "../../utilities/Colors";
import {strHashCode} from "../../utilities/Utils";
import placeholder404 from "../../assets/Placeholder/amiibo_placeholder_404.png";

const palette = {
    pink: {
        border:   'pinkBorder'
    },
    red: {
        border:   'redBorder'
    },
    orange: {
        border:   'orangeBorder'
    },
    yellow: {
        border:   'yellowBorder'
    },
    green: {
        border:   'greenBorder'
    },
    blue: {
        border:   'blueBorder'
    },
    purple: {
        border:   'purpleBorder'
    },
    grey: {
        border:   'greyBorder'
    }
};

let paletteKeys = Object.keys(palette);

function indexSeries(series)
{
    return strHashCode(series) % paletteKeys.length;
}
function AmiiboTableRow({amiibo, fields})
{
    const [isLoading, setIsLoading] = useState(true);

    let series = amiibo['series'];
    let index = indexSeries(series);
    let color = palette[seriesMapPalette[series]] ? seriesMapPalette[series] : paletteKeys[index];
    let chosenPalette = palette[color];

    //
    // // let amiiboId = amiibo.id;
    // delete amiibo.id;

    return (
        <>
            {fields.map((key, idx) => (
                <React.Fragment key={idx}>
                    {
                        key !== 'img' ?
                            (
                                <td>{amiibo[key]}</td>
                            ) :
                            (
                                <td className={style.imgWrapper}>
                                    <div className={`${style.imgWrapperBg} ${chosenPalette.border}`}>
                                        {!isLoading ? '' : (
                                            <div className={`${style.loadingSpinner}`}>
                                                <div className="text-center">
                                                    <div className={`spinner-border ${color}`} role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        <img className={`${style.imgAmiibo} ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                                             src={amiibo[key]}
                                             loading="lazy"
                                             placeholder={placeholder404}
                                             alt={`[${amiibo.character}] - ${amiibo.name}`}
                                             onError={(e) => e.target.src = placeholder404}
                                             onLoad={() => setIsLoading(false)}
                                        />
                                    </div>
                                </td>
                            )
                    }
                </React.Fragment>
            ))}
        </>
    );
}

export default AmiiboTableRow;