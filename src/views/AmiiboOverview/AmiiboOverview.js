import React, {useEffect, useState} from "react";
import AmiiboGrid from "../../components/AmiiboGrid/AmiiboGrid";
import AmiiboList from "../../components/AmiiboList/AmiiboList";
import './AmiiboOverview.css'

function AmiiboOverview() {

    const [amiibos, setAmiibos] = useState(null);
    const [displayGrid, setDisplayGrid] = useState(true);

    useEffect(() => {
        fetch("https://www.amiiboapi.com/api/amiibo/?type=Figure")
            .then(response => response.json())
            .then(data => setAmiibos(data['amiibo'].map(amiibo => {
                return {
                    id: amiibo.head + amiibo.tail,
                    name: amiibo.name,
                    character: amiibo.character,
                    series: amiibo.gameSeries,
                    type: amiibo.type,
                    img: amiibo.image
                }
            })));
    },[])

    if (amiibos !== null) {
        return (
            <div className="container">
                <div className="row my-4">
                    <div className="col d-flex justify-content-center">
                        <div className="btn-group px-3 px-md-0" role="group" aria-label="Grid vs. List">
                            <button type="button"
                                    className={`btn ${displayGrid ? 'btn-dark' : 'btn-outline-dark'}`}
                                    onClick={() => setDisplayGrid(true)}
                            ><span className="me-2"><i className="fa-solid fa-grip"></i></span>Grid</button>
                            <button type="button"
                                    className={`btn ${!displayGrid ? 'btn-dark' : 'btn-outline-dark'}`}
                                    onClick={() => setDisplayGrid(false)}
                            ><span className="me-2"><i className="fa-solid fa-list-ul"></i></span>List</button>
                        </div>
                    </div>
                </div>
                <div className="row mb-4">
                    {displayGrid ? <AmiiboGrid amiibos={amiibos}/> : <AmiiboList amiibos={amiibos}/>}
                </div>
            </div>
        );
    }
    else {
        return (
            <div className="container">
                <div className="row mt-5">
                    <div className="col-12 mt-5 d-flex justify-content-center">
                        <div>
                            <div className="text-center">
                                <div className="spinner-border text-secondary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                            <p className="text-center fs-1 fw-bold text-secondary">Loading amiibo data...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AmiiboOverview;