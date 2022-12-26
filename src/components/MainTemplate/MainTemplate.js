import React from 'react';
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

function MainTemplate({children, navLinks, footerCourseName, footerCourseLink})
{
    return (
        <div className="d-flex flex-column vh-100 ">
            <Header navLinks={navLinks.filter((navLink) => navLink.show)}/>
            <div className="flex-grow-1 position-relative">
                {children}
            </div>
            <Footer footerLinks={navLinks} courseName={footerCourseName} courseLink={footerCourseLink}/>
        </div>
    );
}

export default MainTemplate;