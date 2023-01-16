import React, {useEffect, useState} from "react";
import AmiiboGrid from "../../components/AmiiboGrid/AmiiboGrid";
import AmiiboList from "../../components/AmiiboList/AmiiboList";
import './AmiiboOverview.css'
import {createAmiibo} from "../../utilities/Utils";
import UnimiiboLoading from "../../components/UnimiiboLoading/UnimiiboLoading";

function getDate(release)
{
    const dates = [];
    for(let dateKey in release)
    {
        let date = release[dateKey];
        if(date)
        {
            dates.push(new Date(date));
        }
    }

    return dates.reduce(minDate);
}

function minDate(dateA, dateB) {
    return dateA < dateB ? dateA : dateB;
}

function dateComparator(release1, release2)
{
    return getDate(release1).getTime() - getDate(release2).getTime();
}

function stringComparator(str1, str2)
{
    return str1.localeCompare(str2);
}

function compareAmiibo(a1, a2, {sortOrder, sortComparator})
{
    for(let sortRule of sortOrder)
    {
        const {key, orderASC} = sortRule;

        let comparison = sortComparator[key] ?
            sortComparator[key](a1[key], a2[key]) :
            a1[key] - a2[key];

        if(comparison !== 0)
            return orderASC ? comparison : -comparison;
    }
}

function AmiiboOverview() {

    const [amiibos, setAmiibos] = useState(null);
    const [displayGrid, setDisplayGrid] = useState(true);

    useEffect(() => {
        fetch("https://www.amiiboapi.com/api/amiibo/?type=Figure")
            .then(response => response.json())
            .then(data => data['amiibo'].map(amiibo => createAmiibo(amiibo, false)))
            .then(data => data.sort((a1,a2) => compareAmiibo(a1,a2,{
                sortOrder: [
                    { key: 'series', orderASC: false },
                    { key: 'character', orderASC: true },
                    { key: 'name', orderASC: true },
                    { key: 'release', orderASC: true },
                ],
                sortComparator: {
                    release: dateComparator,
                    series: stringComparator,
                    character: stringComparator,
                    name: stringComparator,
                }
            })))
            .then(data => setAmiibos(data));
    },[])

    return (
        amiibos ?
        <div className="container">
            <div className="row my-4 pt-3">
                <div className="col d-flex justify-content-center">
                    <div className="btn-group px-3 px-md-0" role="group" aria-label="Grid vs. List">
                        <button type="button"
                                className={`pt-2 btn ${displayGrid ? 'btn-dark' : 'btn-outline-dark'}`}
                                onClick={() => setDisplayGrid(true)}
                        ><span className="me-2"><i className="bi bi-grid-3x2-gap-fill"></i></span>Grid</button>
                        <button type="button"
                                className={`pt-2 btn ${!displayGrid ? 'btn-dark' : 'btn-outline-dark'}`}
                                onClick={() => setDisplayGrid(false)}
                        ><span className="me-2"><i className="bi bi-list-ul"></i></span>List</button>
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