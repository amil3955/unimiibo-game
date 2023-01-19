import React, {useState} from "react";
import style from './AmiiboTableRow.module.css'
import {colors, seriesMapPalette} from "../../utilities/Colors";
import {strHashCode} from "../../utilities/Utils";
import placeholder404 from "../../assets/Placeholder/amiibo_placeholder_404.png";

function indexSeries(series) {
    return strHashCode(series) % colors.length;
}

function AmiiboTableRow({amiibo, fields}) {
    const {series} = amiibo;
    const [isLoading, setIsLoading] = useState(true);

    let index = indexSeries(series);
    let color = seriesMapPalette[series] ?? colors[index];

    return (
        <>
            {fields.map((key, idx) => (
                <React.Fragment key={idx}>
                    {
                        key !== 'img' ?
                            (
                                <td className={`${key !== 'name' ? style.textAmiiboName : ''}`}>{amiibo[key]}</td>
                            ) :
                            (
                                <td className={`${style.imgWrapper}`}>
                                    <div className={`${style.imgWrapperBg}`}>
                                        <div className={`hue-variance ${color} my-border ${color} ${style.borderRadius}`}>
                                            {isLoading && (
                                                <div className={`${style.loadingSpinner}`}>
                                                    <div className="text-center">
                                                        <div className={`spinner-border ${color}`} role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            <img
                                                className={`${style.imgAmiibo} ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                                                src={amiibo[key]}
                                                loading="lazy"
                                                placeholder={placeholder404}
                                                alt={`[${amiibo.character}] - ${amiibo.name}`}
                                                onError={(e) => e.target.src = placeholder404}
                                                onLoad={() => setIsLoading(false)}
                                            />
                                        </div>
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