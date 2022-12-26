import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

async function fetchDataByID(id)
{
    const amiiboData = await fetch(`https://www.amiiboapi.com/api/amiibo/?id=${id}`);
    const amiiboResponse = await amiiboData.json();
    const amiibo = amiiboResponse['amiibo'];

    return  {
        name: amiibo.name,
        tail: amiibo.tail
    };
}
async function fetchDataByNAME(name, tail)
{
    const amiiboData = await fetch(`https://www.amiiboapi.com/api/amiibo/?name=${name}&showusage`);
    const amiiboResponse = await amiiboData.json();
    return extractAmiibo(amiiboResponse, tail);
}

function extractAmiibo(amiiboData, tail)
{
    return amiiboData['amiibo'].filter((amiibo) => amiibo.tail === tail)[0];
}

async function fetchData(id)
{
    const amiiboNameTail = await fetchDataByID(id);
    return await fetchDataByNAME(amiiboNameTail.name, amiiboNameTail.tail);
}

function AmiiboDetails() {

    const params = useParams();
    const [currentAmiibo, setCurrentAmiibo] = useState(null);

    useEffect(() => {
        (async () => {
            let amiibo = await fetchData(params.id, setCurrentAmiibo);
            setCurrentAmiibo(amiibo);
            console.log(amiibo);
        })();
    },[params.id])

    return (
        <>{
            currentAmiibo ?
                (
                    <div className="container">
                        <div className="row mt-5">
                            <p>{currentAmiibo.name}</p>
                            <p>{currentAmiibo.character}</p>
                            <p>{currentAmiibo.gameSeries}</p>
                            <p>{currentAmiibo.image}</p>
                            <ul>
                                {
                                    Object.keys(currentAmiibo.release).map((key) => (
                                        <li key={key}>{key} - {currentAmiibo.release[key]}</li>
                                    ))
                                }
                            </ul>

                            <>
                                {
                                    ['games3DS', 'gamesSwitch', 'gamesWiiU'].map((gameConsole, i) => (
                                        <ul key={i}>
                                            {
                                                currentAmiibo[gameConsole].map((game, idx) => (
                                                    <li key={idx}>
                                                        <a href={`https://www.nintendo.com/search/?q=${game.gameName}&p=1&cat=gme&sort=df`}>{game.gameName}</a>
                                                        <ul>
                                                            <li>{game.amiiboUsage[0].Usage}</li>
                                                            <li>{game.amiiboUsage[0].write ? 'Lettura/Scrittura' : 'Scrittura'}</li>
                                                        </ul>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    ))
                                }
                            </>
                        </div>
                    </div>
                ) :
                (
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
                )
        }</>)
}

export default AmiiboDetails;