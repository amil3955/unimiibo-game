import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import AUFlag from '../../assets/Flags/au.png';
import EUFlag from '../../assets/Flags/eu.png';
import JPFlag from '../../assets/Flags/jp.png';
import NAFlag from '../../assets/Flags/na.png';
import ReadOnlyIcon from '../../assets/ReadWrite/Amiibo_read-only_icon.jpg';
import ReadWriteIcon from '../../assets/ReadWrite/Amiibo_read-write_icon.jpg';
import AmiiboCard from "../../components/AmiiboCard/AmiiboCard";
import {createAmiibo} from "../../utilities/Utils";

function getCurrentAmiibo(amiiboData, tail)
{
    return amiiboData['amiibo'].filter((amiibo) => amiibo.tail === tail)[0];
}

async function fetchAmiiboDataByID(id)
{
    const amiiboData = await fetch(`https://www.amiiboapi.com/api/amiibo/?id=${id}`);
    const amiiboResponse = await amiiboData.json();
    const amiibo = amiiboResponse['amiibo'];

    return  {
        name: amiibo.name,
        tail: amiibo.tail
    };
}

async function fetchAmiiboDataByNAME(name, tail)
{
    const amiiboData = await fetch(`https://www.amiiboapi.com/api/amiibo/?name=${name}&showusage`);
    const amiiboResponse = await amiiboData.json();
    return getCurrentAmiibo(amiiboResponse, tail);
}

async function fetchData(id)
{
    const amiiboNameTail = await fetchAmiiboDataByID(id);
    const currentAmiibo = await fetchAmiiboDataByNAME(amiiboNameTail.name, amiiboNameTail.tail);

    return {
        current: createAmiibo(currentAmiibo, true),
    }
}

const mapReleaseZone = {
    'au' : {name:'Australia', flag: AUFlag},
    'eu' : {name:'Europe', flag: EUFlag},
    'jp': {name:'Japan', flag: JPFlag},
    'na': {name:'North America', flag: NAFlag}
}

const mapGameConsoles = {
    'games3DS' : 'Games for Nintendo 3Ds platform',
    'gamesWiiU' : 'Games for Nintendo WiiU platform',
    'gamesSwitch' : 'Games for Nintendo Switch platform'
}

const gameConsoles = ['gamesSwitch', 'gamesWiiU', 'games3DS'];

function getReadWriteIcon(write)
{
    return write ? ReadWriteIcon : ReadOnlyIcon;
}

function formatDate(date)
{
    return new Date(date).toLocaleDateString();
}

function AmiiboDetails() {

    const params = useParams();
    const [currentAmiibo, setCurrentAmiibo] = useState(null);

    useEffect(() => {
        (async () => {
            const amiibos = await fetchData(params.id, setCurrentAmiibo);
            setCurrentAmiibo(amiibos.current);
        })();
    },[params.id])

    return (
        <>{
            currentAmiibo ?
                (
                    <div className="container">

                        <div className="row mt-4 mt-lg-5 mb-2 mb-lg-3 pt-0 pt-md-3">
                            <div className="col ps-3 ms-1 ps-md-0 ms-md-0">
                                <p className="h1 fw-bold">Amiibo details:</p>
                            </div>
                        </div>

                        <div className="row mt-3 mt-md-4">
                            <div className="col-12 col-md-6 col-lg-3 col-xl-3 ps-4 pe-4 ps-md-0">
                                <AmiiboCard amiibo={currentAmiibo}/>
                            </div>
                            <div className="col-12 col-md-6 col-lg-9 col-xl-9 p-4 pt-5 pt-md-0 px-lg-5">
                                <div className="mt-3 mt-md-0">
                                    <p className="fs-5 mb-1 pb-1">
                                        <span className="fw-bold">Amiibo name: </span>
                                        <span className="text-secondary">{currentAmiibo.name}</span>
                                    </p>
                                    <p className="fs-5 mb-1 pb-1">
                                        <span className="fw-bold">Amiibo character: </span>
                                        <span className="text-secondary">{currentAmiibo.character}</span>
                                    </p>
                                    <p className="fs-5 mb-1 pb-1">
                                        <span className="fw-bold">Game series: </span>
                                        <span className="text-secondary">{currentAmiibo.series}</span>
                                    </p>
                                </div>
                                <div className="mt-4 mt-lg-5">
                                    <p className="fs-5">
                                        <span className="fw-bold">Release dates: </span>
                                    </p>
                                    <ul>
                                        {Object.keys(currentAmiibo.release).map((releaseZone) => (
                                            <li key={releaseZone} className="d-flex mt-1 align-content-center">
                                                <img
                                                    src={mapReleaseZone[releaseZone].flag}
                                                    alt={releaseZone + " tag"}
                                                    width="25" height="25"/>
                                                <span className="ms-3">
                                                    {mapReleaseZone[releaseZone].name}: <span className="text-secondary">{formatDate(currentAmiibo.release[releaseZone])}</span>
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="row mt-4 mt-lg-5 mb-2 mb-lg-3 pt-0 pt-md-3">
                            <div className="col ps-3 ms-1 ps-md-0 ms-md-0">
                                <p className="h3 fw-bold">Amiibo games usage:</p>
                            </div>
                        </div>
                        <div className="row mt-4 mb-5">
                            {
                                gameConsoles.map((gameConsole, i) => (
                                    <div className="col-12 col-md-6 col-lg-4 ps-4 ms-2 ms-md-0 pe-4" key={i}>
                                        <p className="fw-bold">{mapGameConsoles[gameConsole]}</p>
                                        {
                                            currentAmiibo[gameConsole].length === 0 ?
                                                <div className="ms-4 ps-2 mb-5">
                                                    <span className="text-secondary">No games for this platform...</span>
                                                </div>
                                                :
                                                <ul>
                                                    {
                                                        currentAmiibo[gameConsole].map((game, idx) => (
                                                            <li key={idx} className="mb-4">
                                                                <p className="mb-2">
                                                                    <a href={`https://www.nintendo.com/search/?q=${game.gameName}&p=1&cat=gme&sort=df`}>{game.gameName}</a>
                                                                </p>
                                                                <p className="mb-1 pb-1">
                                                                    <span>Usage: </span><span
                                                                    className="text-secondary">{game.amiiboUsage[0].Usage}</span>
                                                                </p>
                                                                <p className="d-flex mt-1 align-content-center">
                                                                    <span className="me-2">Read/Write:</span>
                                                                    <img
                                                                        src={getReadWriteIcon(game.amiiboUsage[0].write)}
                                                                        alt={game.amiiboUsage[0].write ? 'Lettura/Scrittura' : 'Scrittura'}
                                                                        width="20" height="20"
                                                                    />
                                                                </p>
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                        }
                                    </div>
                                ))
                            }
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