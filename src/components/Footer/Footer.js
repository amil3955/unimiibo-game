import React from 'react';
import style from './Footer.module.css';
import logoUnimib from '../../assets/LogoBicocca/logo_uni.png'
import logoDisco from '../../assets/LogoBicocca/logo_disco.png'

function Footer({courseName, courseLink}) {
    return (
        <div className={`container-fluid bg-dark text-light p-3 fs-6 position-relative ${style.myFooter}`}>

            <div className={style.waveFooter}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"
                     preserveAspectRatio="none">
                    <path
                        d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                        opacity=".5" className={style.shapeFill}></path>
                    <path
                        d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                        opacity=".5" className={style.shapeFill}></path>
                    <path
                        d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                        className={style.shapeFill}></path>
                </svg>
            </div>

            <div className="row text-center mt-3 mt-md-1">
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