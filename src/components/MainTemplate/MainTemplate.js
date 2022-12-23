import React from 'react';
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

function MainTemplate({children, footerCourseName, footerCourseLink})
{
    let footerLinks = [
        {
            name: "Home",
            link: "#"
        },
        {
            name: "Pokédex",
            link: "#"
        },
        {
            name: "Info",
            link: "#"
        }
    ];

    return (
        <div className="d-flex flex-column vh-100">
            <Header/>
            {children}
            <Footer footerLinks={footerLinks} courseName={footerCourseName} courseLink={footerCourseLink}/>
        </div>
    );
}

export default MainTemplate;