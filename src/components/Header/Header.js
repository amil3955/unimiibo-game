import CompactLogo from '../../assets/LogoUnimiibo/unimiibo_logo_compact.png';
import FullLogo from '../../assets/LogoUnimiibo/unimiibo_logo_small.png';
import {Link, NavLink} from "react-router-dom";

function Header({navLinks}) {
    return (
        <nav className="navbar navbar-expand-md navbar-light bg-white">
            <div className="container-fluid">
                <Link className="navbar-brand ms-2 d-none d-md-block" to="/unimiibo/">
                    <img src={FullLogo} alt="Full logo Unimiibo" height="50"/>
                </Link>
                <Link className="navbar-brand d-md-none" to="/unimiibo/">
                    <img src={CompactLogo} alt="Icon logo Unimiibo" height="50"/>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse mt-2" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                        {navLinks.map((navLink, idx) => (
                            <li className="nav-item fs-5" key={idx}>
                                <NavLink
                                    to={navLink.link}
                                    className={({isActive}) =>
                                        (isActive ? 'active ' : '') + 'nav-link'
                                    }
                                >
                                    <i className={`bi ${navLink.icon} me-1`}></i>{navLink.name}
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