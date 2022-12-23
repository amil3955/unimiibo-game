import React from "react";
import AmiiboBg from '../../assets/Background/amiibo_bg.jpg'
import AmiiboBgMobile from '../../assets/Background/amiibo_bg_mobile.jpg'
// import LogoWhUnimiibo from '../../assets/LogoUnimiibo/'
import './Home.css'

function Home() {
    return (
        <div className="flex-grow-1 position-relative ">
            <div className="d-none d-md-block mt-4">
                <img className="img-fluid w-100" src={AmiiboBg} alt="Home background (pc)"/>
            </div>
            <div className="d-md-none">
                <img className="img-fluid w-100" src={AmiiboBgMobile} alt="Home background (mobile)"/>
            </div>
            <div className="container">

            </div>
        </div>
    );
}

export default Home;