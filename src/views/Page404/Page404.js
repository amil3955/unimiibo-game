import './Page404.css'
import img404 from '../../assets/Error/404.svg'
import {useNavigate} from "react-router-dom";

function Page404() {

    const navigator = useNavigate();

    return (
        <div className="container my-4">
            <div className="row">
                <div className="col d-flex justify-content-center">
                    <img src={img404} alt="Error 404" className="img404"/>
                </div>
            </div>
            <div className="row mb-5">
                <div className="col text-center">
                    <button className="btn btn-dark pt-2 fs-5" onClick={() => navigator('/unimiibo/')}>
                        <span className="me-2"><i className="bi bi-house"></i></span>Back to Home page</button>
                </div>
            </div>
        </div>
    );
}

export default Page404;