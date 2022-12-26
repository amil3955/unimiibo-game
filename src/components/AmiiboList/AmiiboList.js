import React from "react";
import AmiiboTableRow from "../AmiiboTableRow/AmiiboTableRow";
import {useNavigate} from "react-router-dom";

const mapNameKeys = {
    'id': 'id',
    'name': 'Amiibo name',
    'character': 'Character',
    'series': 'Game series',
    'type': 'Amiibo type',
    'img': ' '
}

function AmiiboList({amiibos}) {

    const navigate = useNavigate();

    const keys = Object.keys(amiibos[0]) ?? [];
    let headers = [...keys];

    let idxID = headers.indexOf('id');
    if(idxID !== -1) headers.splice(idxID,1);
    let idxImg = headers.indexOf('img');
    if(idxImg !== -1) headers.splice(idxImg,1);

    headers = ['img', ...headers];

    return (
        <div className="table-responsive">
            <table className="table align-middle fs-5">
                <thead>
                <tr>
                    {headers.map((header) => (
                        <th key={header} scope="col" className="text-secondary text-opacity-75">{mapNameKeys[header]}</th>
                    ))}
                </tr>
                </thead>
                <tbody>

                {amiibos.map((amiibo, idx) => (
                    <tr key={idx} onClick={() => navigate(`/amiibo-details/${amiibo['id']}`)}>
                        <AmiiboTableRow amiibo={amiibo} fields={headers}/>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default AmiiboList;