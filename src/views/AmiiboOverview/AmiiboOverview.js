import React, {useEffect, useState} from "react";
import AmiiboGrid from "../../components/AmiiboGrid/AmiiboGrid";
import AmiiboList from "../../components/AmiiboList/AmiiboList";
import './AmiiboOverview.css'
import {createAmiibo} from "../../utilities/Utils";
import UnimiiboLoading from "../../components/UnimiiboLoading/UnimiiboLoading";

function getDate(release) {
    const dates = [];
    for (let dateKey in release) {
        let date = release[dateKey];
        if (date) {
            dates.push(new Date(date));
        }
    }

    return dates.reduce(minDate);
}

function minDate(dateA, dateB) {
    return dateA < dateB ? dateA : dateB;
}

function dateComparator(release1, release2) {
    return getDate(release1).getTime() - getDate(release2).getTime();
}

function stringComparator(str1, str2) {
    return str1.localeCompare(str2);
}

function countComparator(str1, str2, collection, key) {
    str1 = str1.toLowerCase();
    str2 = str2.toLowerCase();

    if (str1 === str2)
        return 0;

    const tot1 = collection.filter(amiibo => amiibo[key].toLowerCase() === str1).length;
    const tot2 = collection.filter(amiibo => amiibo[key].toLowerCase() === str2).length;

    if (tot1 === tot2)
        return -str1.localeCompare(str2);

    return tot1 - tot2;
}

function compareAmiibo(amiibos, a1, a2, {sortOrder, sortComparator}) {
    for (let sortRule of sortOrder) {
        const {key, orderASC} = sortRule;

        let comparison = sortComparator[key] ?
            sortComparator[key](a1[key], a2[key], amiibos, key) :
            a1[key] - a2[key];

        if (comparison !== 0)
            return orderASC ? comparison : -comparison;
    }

    return 0;
}

function AmiiboOverview() {

    const [amiibos, setAmiibos] = useState(null);
    const [displayGrid, setDisplayGrid] = useState(true);

    useEffect(() => {
        fetch("https://www.amiiboapi.com/api/amiibo/?type=Figure")
            .then(response => response.json())
            .then(data => data['amiibo'].map(amiibo => createAmiibo(amiibo, false)))
            .then(data => data.sort((a1, a2) => compareAmiibo(data, a1, a2, {
                sortOrder: [
                    {key: 'series', orderASC: false},
                    {key: 'character', orderASC: false},
                    {key: 'release', orderASC: true},
                    {key: 'name', orderASC: true},
                ],
                sortComparator: {
                    series: countComparator,
                    character: countComparator,
                    name: stringComparator,
                    release: dateComparator,
                }
            })))
            .then(data => setAmiibos(data));
    }, [])

    return (
        amiibos ?
            <div className="container">
                <div className="row my-4 pt-3">
                    <div className="col d-flex justify-content-center">
                        <div className="btn-group px-3 px-md-0" role="group" aria-label="Grid vs. List">
                            <button type="button"
                                    className={`pt-2 pb-1 btn ${displayGrid ? 'btn-dark' : 'btn-outline-dark fw-normal'}`}
                                    onClick={() => setDisplayGrid(true)}
                            ><span className="me-2"><i className="bi bi-person-badge"></i></span>Card
                            </button>
                            <button type="button"
                                    className={`pt-2 pb-1 btn ${!displayGrid ? 'btn-dark' : 'btn-outline-dark fw-normal'}`}
                                    onClick={() => setDisplayGrid(false)}
                            ><span className="me-2"><i className="bi bi-list-ul"></i></span>List
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row mb-4">
                    {displayGrid ? <AmiiboGrid amiibos={amiibos}/> : <AmiiboList amiibos={amiibos}/>}
                </div>
            </div>
            :
            <UnimiiboLoading text="Loading amiibo list..."/>
    );
}

export default AmiiboOverview;