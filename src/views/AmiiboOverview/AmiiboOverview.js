import React, {useEffect, useState} from "react";
import AmiiboGrid from "../../components/AmiiboGrid/AmiiboGrid";
import AmiiboList from "../../components/AmiiboList/AmiiboList";
import './AmiiboOverview.css'
import {createAmiibo} from "../../utilities/Utils";
import UnimiiboLoading from "../../components/UnimiiboLoading/UnimiiboLoading";

function AmiiboOverview() {

    const [amiibos, setAmiibos] = useState(null);
    const [displayGrid, setDisplayGrid] = useState(true);

    useEffect(() => {
        fetch("https://www.amiiboapi.com/api/amiibo/?type=Figure")
            .then(response => response.json())
            .then(data => setAmiibos(data['amiibo'].map(amiibo => {
                return createAmiibo(amiibo, false);
            })));
    },[])

    return (
        amiibos ?
        <div className="container">
            <div className="row my-4 pt-3">
                <div className="col d-flex justify-content-center">
                    <div className="btn-group px-3 px-md-0" role="group" aria-label="Grid vs. List">
                        <button type="button"
                                className={`pt-2 btn ${displayGrid ? 'btn-dark' : 'btn-outline-dark'}`}
                                onClick={() => setDisplayGrid(true)}
                        ><span className="me-2"><i className="bi bi-grid-3x2-gap-fill"></i></span>Grid</button>
                        <button type="button"
                                className={`pt-2 btn ${!displayGrid ? 'btn-dark' : 'btn-outline-dark'}`}
                                onClick={() => setDisplayGrid(false)}
                        ><span className="me-2"><i className="bi bi-list-ul"></i></span>List</button>
                    </div>
                </div>
            </div>
            <div className="row mb-4">
                {displayGrid ? <AmiiboGrid amiibos={amiibos}/> : <AmiiboList amiibos={amiibos}/>}
            </div>
        </div>
        :
        <UnimiiboLoading text="Loading amiibo list..."/>
    );
}

export default AmiiboOverview;