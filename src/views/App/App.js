import React from 'react';
import MainTemplate from "../../components/MainTemplate/MainTemplate";
import Home from "../Home/Home";

function App() {
    let courseName = "Applicazioni Web: Progettazione e Sviluppo";
    let courseLink = "https://www.disco.unimib.it/it";

    return (
        <div>
            <MainTemplate footerCourseName={courseName} footerCourseLink={courseLink}>
                <Home/>
            </MainTemplate>
        </div>
    );
}

export default App;