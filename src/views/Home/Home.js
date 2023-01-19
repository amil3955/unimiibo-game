import React, {useState} from "react";
import {nintendoShopUrl} from "../../utilities/Utils";
import AmiiboBg from '../../assets/Background/amiibo_bg.jpg'
import LogoWhUnimiibo from '../../assets/LogoUnimiibo/unimiibo_logo_wh.png'
import ImgAC from '../../assets/Background/game_ac.jpg'
import ImgSM3DW from '../../assets/Background/game_sm3dw.jpg'
import ImgSMBU from '../../assets/Background/game_smbu.jpg'
import './Home.css'
import UnimiiboLoading from "../../components/UnimiiboLoading/UnimiiboLoading";

function clickableNintendoLink(game)
{
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
                Unlock power-ups and other in-game enhancements in the {clickableNintendoLink('Super Mario™ 3D World + Bowser’s Fury')} game.
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
            <div className="container-fluid bg-dark p-3 py-5">
                <div className="row">
                    <div className={`col-12 d-flex justify-content-center`}>
                        <img className="imgUnimiibo" src={LogoWhUnimiibo} alt="Logo Unimiibo"/>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-12 text-center text-light h4">
                        <p>A fun and original way to interact with your favorite characters and games.</p>
                        <p className='h3'>Touch, Connect and Collect!</p>
                    </div>
                </div>
            </div>
            <div className="container-fluid p-5">
                <div className="row text-center">
                    {
                        games.map((game, idx) => (
                            <div key={idx} className="col-12 col-md-4 py-4 pt-md-5 px-4">
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