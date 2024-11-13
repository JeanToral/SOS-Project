import React from "react";
import "./Footer.scss";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footerContainer">
                <p>&copy; {new Date().getFullYear()} SOS Saúde. Todos os direitos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;