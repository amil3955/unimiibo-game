import AmiiboCard from "../AmiiboCard/AmiiboCard";
import React from "react";

function AmiiboGrid({amiibos}) {
    return (
        <>
        {
            amiibos.map((amiibo, idx) => (
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xxl-2 mt-4 mt-sm-2 px-5 px-sm-2 px-md-3 pb-4 pb-sm-2" key={idx}>
                    <AmiiboCard {...amiibo}/>
                </div>
            ))
        }
        </>
    )
}

export default AmiiboGrid;