import React from 'react';
import style from './Footer.module.css';
import logoUnimib from '../../assets/LogoBicocca/logo_uni.png'
import logoDisco from '../../assets/LogoBicocca/logo_disco.png'

function Footer({footerLinks, courseName, courseLink}) {
    return (
        <div>
            <div className={`container-fluid p-3 m-0 ${style.footer}`}>
                <div className="row p-0 m-0">
                    <div className={`col-12 col-md-6 p-0 position-relative ${style.footerCol}`}>
                        <ul className={`m-0 ${style.footerUl}`}>
                            {footerLinks.map((course, index) => {
                                return (
                                    <li key={index}>
                                        <a className={style.textColorRed} href={course.link}>{course.name}</a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className={`col-12 col-md-6 p-0 mt-3 mt-md-0 position-relative d-flex ${style.footerCol}`}>
                        <ul className={`m-0 me-auto ${style.footerUl}`}>
                            <li>
                                <a className={style.textColorRed} href={courseLink}>{courseName}</a>
                            </li>
                        </ul>
                        <div className={`p-0 ps-3 d-flex justify-content-end align-items-center ${style.footerImgs}`}>
                            <img src={logoUnimib} alt=""/>
                            <img src={logoDisco} alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;