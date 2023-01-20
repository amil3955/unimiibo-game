import React, {useState} from "react";
import {nintendoShopUrl} from "../../utilities/Utils";
import AmiiboBg from '../../assets/Background/amiibo_bg.jpg'
import LogoWhUnimiibo from '../../assets/LogoUnimiibo/unimiibo_logo_wh.png'
import ImgAC from '../../assets/Background/game_ac.jpg'
import ImgSM3DW from '../../assets/Background/game_sm3dw.jpg'
import ImgSMBU from '../../assets/Background/game_smbu.jpg'
import './Home.css'
import UnimiiboLoading from "../../components/UnimiiboLoading/UnimiiboLoading";

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
                <img className={`imgAmiibos h-100 position-absolute ${isLoadingImg ? 'opacity-0' : 'opacity-100'}`}
                     src={AmiiboBg}
                     alt="Home background"
                     onError={(e) => console.log(e)}
                     onLoad={() => setIsLoadingImg(false)}
                />
            </div>
            <div className="position-relative">
                <div className="wave-unimiibo">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"
                         preserveAspectRatio="none">
                        <path
                            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                            opacity=".25" className="shapeFill"></path>
                        <path
                            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                            opacity=".25" className="shapeFill"></path>
                        <path
                            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                            className="shapeFill"></path>
                    </svg>
                </div>

                <div className="container-fluid bg-dark px-3 py-5">
                    <div className="row">
                        <div className={`col-12 d-flex justify-content-center`}>
                            <img className="imgUnimiibo" src={LogoWhUnimiibo} alt="Logo Unimiibo"/>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-12 text-center text-light h3">
                            <p className="fw-light">A fun and original way to interact with your favorite characters and games</p>
                            <p className='h1 mt-5 py-3 py-md-5 px-3 lh-base fw-normal'>Connect, Touch and Collect!</p>
                        </div>
                    </div>
                </div>

                <div className="wave-unimiibo bottom-wave">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"
                         preserveAspectRatio="none">
                        <path
                            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                            opacity=".25" className="shapeFill"></path>
                        <path
                            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                            opacity=".25" className="shapeFill"></path>
                        <path
                            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                            className="shapeFill"></path>
                    </svg>
                </div>

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