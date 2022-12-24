import React from 'react';
import MainTemplate from "../../components/MainTemplate/MainTemplate";
import Home from "../Home/Home";
import AmiiboOverview from "../AmiiboOverview/AmiiboOverview";
import {Route, Routes} from "react-router-dom";

function App() {
    let courseName = "Applicazioni Web: Progettazione e Sviluppo";
    let courseLink = "https://www.disco.unimib.it/it";

    let navLinks = [
        {
            name: "Home",
            link: "/",
            isActive: true,
            jsx: <Home/>
        },
        {
            name: "Amiibo",
            link: "/amiibo",
            isActive: false,
            jsx: <AmiiboOverview/>
        },
        {
            name: "About",
            link: "/about",
            isActive: false,
            jsx: <Home/>
        }
    ];

    return (
        <div>
            <MainTemplate footerCourseName={courseName} footerCourseLink={courseLink}>
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