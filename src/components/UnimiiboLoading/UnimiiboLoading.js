import style from "./UnimiiboLoading.module.css"

function UnimiiboLoading({displayText = true, text = "Loading...", big = false, my = 5, py = 5, px = 3}) {
    return (
        <div className={`d-flex justify-content-center flex-column align-items-center my-${my} px-${py} py-${px}`}>
            <div className={`${style.loaderWrapper} ${big && style.big}`} data-size="3rem">
                <div className={`${style.loader}`}></div>
                <div className={`${style.loader}`}></div>
                <div className={`${style.loader}`}></div>
                <div className={`${style.loader}`}></div>
                <div className={`${style.loader}`}></div>
                <div className={`${style.loader}`}></div>
            </div>
            {
                displayText && <div className="mt-3 fs-4 text-secondary fw-light">{text}</div>
            }
        </div>
    );
}

export default UnimiiboLoading;