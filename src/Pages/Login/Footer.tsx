import React from "react";
const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white p-4 w-full">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} SunBridge. Todos os direitos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;