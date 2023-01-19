import React from 'react';
import style from './Footer.module.css';
import logoUnimib from '../../assets/LogoBicocca/logo_uni.png'
import logoDisco from '../../assets/LogoBicocca/logo_disco.png'

function Footer({courseName, courseLink}) {
    return (
        <div className="container-fluid bg-dark text-light p-3 fs-6">
            <div className="row text-center mt-3">
                <div className="col-12">
                    <p>Developed by <span className="fw-bold">Roberto Di Stefano</span></p>
                </div>
            </div>
            <div className="row text-center">
                <div className="col-12">
                    <p>
                        Course of <a className="link-light" href={courseLink} target="_blank" rel="noopener noreferrer"><span className="fw-bold">{courseName}</span></a> 2022/2023, University of Milano-Bicocca (Milan, Italy)
                    </p>
                </div>
            </div>
            <div className="row">
                <div className={`col-12 d-flex justify-content-center`}>
                    <a className={style.footerImgs} href="https://en.unimib.it/" target="_blank" rel="noopener noreferrer">
                        <img src={logoUnimib} alt="Logo Unimib"/>
                    </a>
                    <a className={style.footerImgs} href="https://www.disco.unimib.it/en" target="_blank" rel="noopener noreferrer">
                        <img src={logoDisco} alt="Logo Disco"/>
                    </a>
                </div>
            </div>
            <div className="row text-center mt-5">
                <div className="col-12">
                    <p className="text-light text-opacity-75">
                        <span className="fw-bold">Disclaimer! </span>
                        This website has no affiliation with Nintendo or any other companies that own the rights to it.
                        The official Amiibo website is reachable <a className="link-light text-light text-opacity-75" href="https://www.nintendo.com/amiibo/" target="_blank" rel="noopener noreferrer"><span className="fw-bold">here</span></a>.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Footer;