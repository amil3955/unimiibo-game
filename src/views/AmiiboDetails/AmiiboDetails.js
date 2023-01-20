import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {createAmiibo, nintendoShopUrl} from "../../utilities/Utils";
import AmiiboCard from "../../components/AmiiboCard/AmiiboCard";
import AUFlag from '../../assets/Flag/au.png';
import EUFlag from '../../assets/Flag/eu.png';
import JPFlag from '../../assets/Flag/jp.png';
import NAFlag from '../../assets/Flag/na.png';
import ReadOnlyIcon from '../../assets/ReadWrite/Amiibo_read-only_icon.jpg';
import ReadWriteIcon from '../../assets/ReadWrite/Amiibo_read-write_icon.jpg';
import './AmiiboDetails.css'
import UnimiiboLoading from "../../components/UnimiiboLoading/UnimiiboLoading";

function getCurrentAmiibo(amiiboData, tail) {
    return amiiboData['amiibo'].filter((amiibo) => amiibo.tail === tail)[0];
}

async function fetchAmiiboDataByID(id) {
    const amiiboData = await fetch(`https://www.amiiboapi.com/api/amiibo/?id=${id}`);
    const amiiboResponse = await amiiboData.json();
    const amiibo = amiiboResponse['amiibo'];

    return {
        name: amiibo.name,
        tail: amiibo.tail
    };
}

async function fetchAmiiboDataByNAME(name, tail) {
    const amiiboData = await fetch(`https://www.amiiboapi.com/api/amiibo/?name=${encodeURIComponent(name)}&showusage`);
    const amiiboResponse = await amiiboData.json();
    return getCurrentAmiibo(amiiboResponse, tail);
}

async function fetchData(id) {
    try {
        const amiiboNameTail = await fetchAmiiboDataByID(id);
        const currentAmiibo = await fetchAmiiboDataByNAME(amiiboNameTail.name, amiiboNameTail.tail);

        return createAmiibo(currentAmiibo, true);
    } catch (error) {
        return undefined;
    }
}

const mapReleaseZone = {
    'au': {name: 'Australia', flag: AUFlag},
    'eu': {name: 'Europe', flag: EUFlag},
    'jp': {name: 'Japan', flag: JPFlag},
    'na': {name: 'North America', flag: NAFlag}
}

const gameConsoles = ['gamesSwitch', 'gamesWiiU', 'games3DS'];

const mapGameConsoles = {
    'games3DS': 'Games for Nintendo 3DS platform',
    'gamesWiiU': 'Games for Nintendo WiiU platform',
    'gamesSwitch': 'Games for Nintendo Switch platform'
}


function getReadWriteIcon(write) {
    return write ? ReadWriteIcon : ReadOnlyIcon;
}

function formatDate(date) {
    return date ? new Date(date).toLocaleDateString(
        [],
        {
            month: '2-digit', day: '2-digit', year: 'numeric'
        }) : "Not available yet";
}

function AmiiboDetails() {

    const navigator = useNavigate();
    const params = useParams();
    const [currentAmiibo, setCurrentAmiibo] = useState(null);

    useEffect(() => {
        fetchData(params.id, setCurrentAmiibo)
            .then(fetchedAmiibo => {
                if (fetchedAmiibo) {
                    setCurrentAmiibo(fetchedAmiibo);
                } else {
                    navigator('/not-found');
                }
            });
    }, [navigator, params.id])

    return (
        <>
            {
                currentAmiibo ?
                    (
                        <div className="container">

                            <div className="row mt-5">
                                <div className="col-12 d-flex justify-content-center px-4">
                                    <div className="cardWrapper">
                                        <AmiiboCard amiibo={currentAmiibo} fixedSize={true} reactive={false}/>
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-3 mt-md-4 text-center">
                                <div className="col-12 col-md-6 mt-5">
                                    <p className="h3 fw-bold mb-3 d-inline-flex">
                                        <i className="bi bi-search me-2"></i>Amiibo details:
                                    </p>
                                    <div className="mt-3 mt-md-0">
                                        <p className="fs-6 mb-1 pb-1">
                                            <span>Official name: </span>
                                            <span className="text-secondary text-opacity-75">
                                                {currentAmiibo.name}
                                            </span>
                                        </p>
                                        <p className="fs-6 mb-1 pb-1">
                                            <span>Original character: </span>
                                            <span className="text-secondary text-opacity-75">
                                                {currentAmiibo.character}
                                            </span>
                                        </p>
                                        <p className="fs-6 mb-1 pb-1">
                                            <span>Game series: </span>
                                            <span className="text-secondary text-opacity-75">
                                                {currentAmiibo.series}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 mt-5">
                                    <p className="h3 fw-bold mb-3 d-inline-flex">
                                        <i className="bi bi-flag me-2"></i>Release dates:
                                    </p>
                                    {
                                        Object.keys(currentAmiibo.release).map((releaseZone) => (
                                            <p key={releaseZone}
                                               className="mb-1 pb-1 d-flex justify-content-center align-items-center flex-wrap">
                                                <img
                                                    src={mapReleaseZone[releaseZone].flag}
                                                    className="imgFlag"
                                                    alt={releaseZone + " flag"}/>
                                                <span className="ms-2">
                                                    {mapReleaseZone[releaseZone].name}:
                                                    <span
                                                        className="text-secondary text-opacity-75"> {formatDate(currentAmiibo.release[releaseZone])}</span>
                                                </span>
                                            </p>
                                        ))
                                    }
                                </div>
                            </div>

                            <div className="row mt-5 text-center">
                                <div className="col-12">
                                    <p className="h3 fw-bold d-inline-flex"><i className="bi bi-controller me-2"></i>Amiibo games usage:</p>
                                </div>
                            </div>

                            <div className="row mt-4 mb-5">
                                {
                                    gameConsoles.map((gameConsole, i) => (
                                        <div className="col-12 col-md-6 col-lg-4 px-3 mt-4 mt-lg-0" key={i}>
                                            <p className="fw-bold text-center">{mapGameConsoles[gameConsole]}</p>
                                            {
                                                currentAmiibo[gameConsole].length === 0 ?
                                                    <div className="ms-4 ps-2 mb-5">
                                                        <span
                                                            className="text-secondary text-opacity-75">No games for this platform...</span>
                                                    </div>
                                                    :
                                                    <ul>
                                                        {
                                                            currentAmiibo[gameConsole].map((game, idx) => {
                                                                const {gameName, amiiboUsage} = game;
                                                                const write = amiiboUsage[0].write;
                                                                const usage = amiiboUsage[0].Usage;

                                                                return (
                                                                    <li key={idx} className="mb-4">
                                                                        <p className="mb-2">
                                                                            <a href={nintendoShopUrl(gameName)}
                                                                               target="_blank"
                                                                               rel="noopener noreferrer">
                                                                                {gameName}
                                                                            </a>
                                                                        </p>
                                                                        <p className="mb-1 pb-1">
                                                                            <span>Usage: </span><span
                                                                            className="text-secondary text-opacity-75">{usage}</span>
                                                                        </p>
                                                                        <p className="d-flex mt-1 align-content-center">
                                                                            <span className="me-2">Read/Write:</span>
                                                                            <img
                                                                                title={write ? 'Lettura/Scrittura' : 'Scrittura'}
                                                                                src={getReadWriteIcon(write)}
                                                                                alt={write ? 'Lettura/Scrittura' : 'Scrittura'}
                                                                                className="imgReadWrite"
                                                                            />
                                                                        </p>
                                                                    </li>
                                                                )
                                                            })
                                                        }
                                                    </ul>
                                            }
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    )
                    :
                    (
                        <UnimiiboLoading text="Loading amiibo details..."/>
                    )
            }
        </>
    );
}

export default AmiiboDetails;