import React, {useState} from "react";
import {nintendoShopUrl} from "../../utilities/Utils";
import AmiiboBg from '../../assets/Background/amiibo_bg.jpg'
import LogoWhUnimiibo from '../../assets/LogoUnimiibo/unimiibo_logo_wh.png'
import ImgAC from '../../assets/Background/game_ac.jpg'
import ImgSM3DW from '../../assets/Background/game_sm3dw.jpg'
import ImgSMBU from '../../assets/Background/game_smbu.jpg'
import UnimiiboLoading from "../../components/UnimiiboLoading/UnimiiboLoading";
import './Home.css'

function clickableNintendoLink(game) {
    const URL = nintendoShopUrl(game);
    return (
        <a href={URL} target="_blank" rel="noopener noreferrer">
            {game}
        </a>
    )
}

const games = [
    {
        title: 'Add a character to the game',
        name: 'Animal Crossing: New Horizons',
        text: (
            <>
                Invite characters to your island in the {clickableNintendoLink('Animal Crossing™: New Horizons')} game.
            </>
        ),
        img: ImgAC
    },
    {
        title: 'Get bonuses or special items',
        name: 'Super Mario 3D World + Bowser’s Fury',
        text: (
            <>
                Unlock power-ups and other in-game enhancements in
                the {clickableNintendoLink('Super Mario™ 3D World + Bowser’s Fury')} game.
            </>
        ),
        img: ImgSM3DW
    },
    {
        title: 'Level up or customize your character',
        name: 'Super Smash Bros. Ultimate',
        text: (
            <>
                Train and fight Figure Players in the {clickableNintendoLink('Super Smash Bros.™ Ultimate')} game.
            </>
        ),
        img: ImgSMBU
    },
];

function Home() {

    const [isLoadingImg, setIsLoadingImg] = useState(true);

    return (
        <div className="flex-grow-1 position-relative">
            <div className="imgAmiibosWrapper position-relative">
                {isLoadingImg && (
                    <div className="h-100 d-flex flex-column justify-content-center position-absolute start-0 end-0">
                        <UnimiiboLoading displayText={false} big={true} my={0} py={0}/>
                    </div>
                )}
                <img className={`imgAmiibos h-100 position-absolute ${isLoadingImg ? 'opacity-0 imgLoading' : 'opacity-100'}`}
                     src={AmiiboBg}
                     alt="Home background"
                     onError={(e) => console.error(e)}
                     onLoad={() => setIsLoadingImg(false)}
                />
            </div>

            <div className="position-relative">

                {/*<div className="wave-unimiibo top-wave">*/}
                {/*    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"*/}
                {/*         preserveAspectRatio="none">*/}
                {/*        <path d="M892.25 114.72L0 0 0 120 1200 120 1200 0 892.25 114.72z" className="shape-fill"></path>*/}
                {/*    </svg>*/}
                {/*</div>*/}

                <div className="container-fluid bg-dark shapes-star px-3 pt-5">
                    <div className="row">
                        <div className={`col-12 d-flex justify-content-center pt-md-5`}>
                            <img className="imgUnimiibo" src={LogoWhUnimiibo} alt="Logo Unimiibo"/>
                        </div>
                    </div>
                    <div className="row my-md-3">
                        <div className="col-12 text-center text-light h3">
                            <p className="fw-light pt-3 pt-md-0">A fun and original way to interact with your favorite characters and games</p>
                            <p className='h1 mt-5 mb-4 py-5 lh-base text-uppercase font-acme'>Connect, Touch and Collect!</p>
                        </div>
                    </div>
                </div>

                {/*<div className="wave-unimiibo bottom-wave">*/}
                {/*    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"*/}
                {/*         preserveAspectRatio="none">*/}
                {/*        <path d="M892.25 114.72L0 0 0 120 1200 120 1200 0 892.25 114.72z" className="shape-fill"></path>*/}
                {/*    </svg>*/}
                {/*</div>*/}

            </div>

            <div className="container-fluid py-5 px-4 px-md-5 position-relative">
                <div className="row text-center gx-sm-5">
                    {
                        games.map((game, idx) => (
                            <div key={idx} className="col-12 col-md-4 py-4 pt-md-5">
                                <div className="ratio ratio-16x9">
                                    <img className="rounded rounded-3 img-fluid imgGames"
                                         src={game.img}
                                         alt={`Game wallpaper (${game.name})`}/>
                                </div>
                                <p className="text-uppercase h5 mt-4 mt-md-5 mb-3">{game.title}</p>
                                <p>{game.text}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Home;