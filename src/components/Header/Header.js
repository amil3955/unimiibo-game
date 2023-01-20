import CompactLogo from '../../assets/LogoUnimiibo/unimiibo_logo_compact.png';
import FullLogo from '../../assets/LogoUnimiibo/unimiibo_logo_small.png';
import {Link, NavLink, useLocation} from "react-router-dom";
import {useEffect} from "react";
import style from './Header.module.css';

function Header({navLinks}) {

    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <nav className="navbar navbar-expand-md navbar-light bg-white">
            <div className="container-fluid">
                <Link className="navbar-brand ms-2 d-none d-md-block" to="/">
                    <img src={FullLogo} alt="Full logo Unimiibo" height="50"/>
                </Link>
                <Link className="navbar-brand d-md-none" to="/">
                    <img src={CompactLogo} alt="Icon logo Unimiibo" height="50"/>
                </Link>
                <button className={`navbar-toggler ${style.navButton}`} type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav navbar-nav-scroll me-auto mb-2 mb-md-0">
                        {navLinks.map((navLink, idx) => (
                            <li className="nav-item fs-5" key={idx}>
                                <NavLink
                                    to={navLink.link}
                                    className={({isActive}) => (isActive ? 'active' : '') + ' nav-link me-2'}
                                >
                                    <span className="d-inline-flex"><i className={`bi ${navLink.icon} me-2`}></i>{navLink.name}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;