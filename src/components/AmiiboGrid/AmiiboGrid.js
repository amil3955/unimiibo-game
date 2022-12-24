import AmiiboCard from "../AmiiboCard/AmiiboCard";
import React from "react";

function AmiiboGrid({amiibos}) {
    return (
        <>
        {
            amiibos.map((amiibo, idx) => (
                <div className="col-12 col-md-6 col-lg-4 col-xxl-3 mt-4 px-5 px-md-3 pb-4 pb-md-2" key={idx}>
                    <AmiiboCard {...amiibo}/>
                </div>
            ))
        }
        </>
    )
}

export default AmiiboGrid;