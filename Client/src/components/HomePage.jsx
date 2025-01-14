import React from 'react';
import { Link } from 'react-router-dom';
// import services from '../assets/services.';
import './home.css';

import {
    faSyringe,
    faClinicMedical,
    faUserNurse,
    faVials,
    faBriefcaseMedical,
    faDog,
    faHeartbeat,
    faStethoscope,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const services = [
    {
        icon: <FontAwesomeIcon icon={faSyringe} />,
        name: "Vaccine",
        body: "Stay protected with our comprehensive vaccination services, ensuring immunity against various diseases."
    },
    {
        icon: <FontAwesomeIcon icon={faClinicMedical} />,
        name: "Clinic",
        body: "Our clinic offers expert medical consultations and personalized care for all your health needs."
    },
    {
        icon: <FontAwesomeIcon icon={faUserNurse} />,
        name: "Self Care",
        body: "Empowering you to take charge of your health with our self-care resources and support."
    },
    {
        icon: <FontAwesomeIcon icon={faVials} />,
        name: "Laboratory",
        body: "State-of-the-art laboratory services providing accurate and timely test results."
    },
    {
        icon: <FontAwesomeIcon icon={faBriefcaseMedical} />,
        name: "Treatment",
        body: "Effective treatments tailored to your needs by our experienced healthcare professionals."
    },
    {
        icon: <FontAwesomeIcon icon={faDog} />,
        name: "Pet Health",
        body: "Dedicated care for your furry friends to keep them healthy and happy."
    },
    {
        icon: <FontAwesomeIcon icon={faHeartbeat} />,
        name: "Symptoms",
        body: "Comprehensive symptom analysis to identify and address your health concerns."
    },
    {
        icon: <FontAwesomeIcon icon={faStethoscope} />,
        name: "Check Up",
        body: "Regular check-ups to monitor and maintain your overall health."
    }
];

const Homepage = () => {
    return (
        <div className="homepage">
            <div className="navbar-container">

                <div className="logo">
                    <h3>M-Treat<i className="fas fa-hospital-symbol"></i></h3>
                </div>

                <div className="nav-items">
                    <h3>Medical Care</h3>
                    <h3>Medical Health</h3>
                    <h3>Medical Test</h3>
                    <h3>Medical Lab</h3>
                    <h3>Medical Contact</h3>
                </div>

                <div className="side-nav-items">
                    <h3>Login</h3>
                    <i className="fas fa-search"></i>
                </div>
            </div>
            <div className="banner-container">

                <div className="banner-content">

                    <div className="banner-heading">
                        <h2>Every good thing<br />starts with good<br />health</h2>
                    </div>

                    <div className="banner-subheading">
                        <p>We are here to serve people with patient centered-care to deliver outstanding healthcare for better lives.</p>
                    </div>

                    <div className="banner-buttons">
                        <button className="banner-appointment-button">
                            <Link to="/signup" className="btn btn-primary">Register</Link>
                        </button>
                        <button className="banner-learn-button">Learn More</button>
                    </div>

                </div>

                <div className="banner-graphic">
                    <img src='https://mcc.ca/wp-content/uploads/doctor-hero-1.png' alt="doctor" />
                </div>

            </div>
            <div className="services-container">
                <h3>Our Services</h3>
                <div className="services-wrapper">
                    {services.map((service, index) => (
                        <div className="service-container">

                            <div className="service-icon">
                                {service.icon}
                            </div>

                            <div className="service-head">
                                <h5>{service.name}</h5>
                            </div>

                            <div className="service-body">
                                <p>{service.body}</p>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
            <div className="partners-container">
                <h3>Our Health Partners</h3>
                <p>Research organizations that collaborate on medical research, healthcare innovation<br />and the development of new medical technologies and treatments.</p>
                <div className="partners-wrapper">
                    <div className="partner-logo">
                        <img src= 'https://kenyanwallstreet.com/wp-content/uploads/2024/07/Old-Mutual.jpeg' alt="partner1" />
                        <img src= 'https://kenyanwallstreet.com/wp-content/uploads/2022/05/Madison-Insurance-Company-Kenya-1024x513-1.png' alt="partner2" />
                        <img src= 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-Xi96j-PGXwciPhdSa_D_9NYLPclBhbRhtw&s' alt="partner3" />
                        <img src= 'https://kenyanalliance.co.ke/wp-content/uploads/2024/08/Blue-Logo.png' alt="partner4" />
                        <img src= 'https://www.atlas-mag.net/sites/default/files/images/AtlasMagazine_2019-04-No160/Images/MUA.gif' alt="partner5" />
                    </div>
                </div>
            </div>
            <footer className="footer">
                <div className="container">
                             <p>&copy; {new Date().getFullYear()} M-Treat. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Homepage;
