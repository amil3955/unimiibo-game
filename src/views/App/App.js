import React from 'react';
import './App.css'
import MainTemplate from "../../components/MainTemplate/MainTemplate";
import Home from "../Home/Home";
import AmiiboOverview from "../AmiiboOverview/AmiiboOverview";
import {Route, Routes} from "react-router-dom";
import AmiiboDetails from "../AmiiboDetails/AmiiboDetails";

function App() {
    let courseName = "Applicazioni Web: Progettazione e Sviluppo";
    let courseLink = "https://www.disco.unimib.it/it";

    let navLinks = [
        {
            name: "Home",
            link: "/",
            show: true,
            jsx: <Home/>
        },
        {
            name: "Amiibo",
            link: "/amiibo",
            show: true,
            jsx: <AmiiboOverview/>
        },
        {
            name: "Amiibo Details",
            link: "/amiibo-details/:id",
            show: false,
            jsx: <AmiiboDetails/>
        },
        {
            name: "About",
            link: "/about",
            show: true,
            jsx: <Home/>
        }
    ];

    return (
        <div>
            <MainTemplate navLinks={navLinks} footerCourseName={courseName} footerCourseLink={courseLink}>
                <Routes>
                    {navLinks.map((navLink, idx) => (
                        <Route key={idx} path={navLink.link} element={navLink.jsx}/>
                    ))}
                </Routes>
            </MainTemplate>
        </div>
    );
}

export default App;