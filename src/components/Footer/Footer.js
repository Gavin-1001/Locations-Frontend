import './Footer.css';

const Footer = () => {

    const currentYear = new Date().getFullYear();

    return (
        <footer>&copy; {currentYear} Gavin Shelley</footer>

)

};

export default Footer;