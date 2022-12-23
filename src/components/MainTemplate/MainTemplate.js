import React from 'react';
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

function MainTemplate({children, footerCourseName, footerCourseLink})
{
    let navLinks = [
        {
            name: "Home",
            link: "/",
            isActive: true
        },
        {
            name: "Amiibo",
            link: "/amiibo",
            isActive: false
        },
        {
            name: "About",
            link: "/about",
            isActive: false
        }
    ];

    return (
        <div className="d-flex flex-column vh-100">
            <Header navLinks={navLinks}/>
            {children}
            <Footer footerLinks={navLinks} courseName={footerCourseName} courseLink={footerCourseLink}/>
        </div>
    );
}

export default MainTemplate;