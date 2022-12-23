import CompactLogo from '../../assets/LogoUnimiibo/unimiibo_logo_compact.png';
import FullLogo from '../../assets/LogoUnimiibo/unimiibo_logo_small.png';

function Header({navLinks}) {
    return (
        <nav className="navbar navbar-expand-md navbar-light bg-white">
            <div className="container-fluid">
                <a className="navbar-brand d-none d-md-block" href="/">
                    <img src={FullLogo} alt="" height="40"/>
                </a>
                <a className="navbar-brand d-md-none" href="/">
                    <img src={CompactLogo} alt="" height="40"/>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                        {navLinks.map((navLink, idx) => (
                            <li className="nav-item" key={idx}>
                                <a className={`nav-link ${navLink.isActive ? 'active' : ''}`}
                                   aria-current={navLink.isActive ? 'page' : ''}
                                   href={navLink.link}>
                                    {navLink.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;