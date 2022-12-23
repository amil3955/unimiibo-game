import React from "react";
import AmiiboCard from "../../components/AmiiboCard/AmiiboCard";
import './AmiiboList.css'

function AmiiboList() {

    let amiibos =
        [
            {
                id: "00000001",
                name: "Toad",
                series: "Super Mario Bros.",
                type: "Figure",
                img: images[0]
            },
            {
                id: "00000001",
                name: "Mario",
                series: "Super Mario Bros.",
                type: "Figure",
                img: images[1]
            },
            {
                id: "00000001",
                name: "Mario",
                series: "Super Mario Bros.",
                type: "Figure",
                img: images[2]
            },
            {
                id: "00000001",
                name: "Joker",
                series: "Persona 5",
                type: "Figure",
                img: images[3]
            },
            {
                id: "00000001",
                name: "Ryu",
                series: "Street Fighters",
                type: "Figure",
                img: images[4]
            },
            {
                id: "00000001",
                name: "Boh",
                series: "Others",
                type: "Figure",
                img: images[5]
            },
            {
                id: "00000001",
                name: "Bowser",
                series: "Super Mario Bros.",
                type: "Figure",
                img: images[6]
            },
            {
                id: "00000001",
                name: "Ink Girl",
                series: "Splatoon",
                type: "Figure",
                img: images[7]
            },
            {
                id: "00000001",
                name: "Cloud Strife",
                series: "Final Fantasy",
                type: "Figure",
                img: images[8]
            }
        ]


    return (
        <div className="container">
            <div className="row mb-4">
                {amiibos.map((amiibo, idx) => (
                    <div className="col-12 col-md-6 col-lg-4 mt-4" key={idx}>
                        <AmiiboCard {...amiibo}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

function importAll(r) {
    return r.keys().map(r);
}

const images = importAll(require.context('../../assets/Placeholder/tmp/', false, /\.(png|jpe?g|svg)$/));

export default AmiiboList;