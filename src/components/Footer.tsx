import "../styles/Footer.css";
import { SiX, SiFacebook, SiInstagram} from "react-icons/si";

function Footer() {

    return (
        <footer className="footer-section">
            <div className="company-name">
                Master
            </div>
            <div className="company-tagline">
                We promise nothing and deliver occasionally.
            </div>

            <div className="socials">
                <SiInstagram className="social" />
                <SiFacebook className="social" />
                <SiX className="social" />
            </div>

            <div className="copyright">
                © 2024 Master. All rights occasionally respected.
            </div>
        </footer>

    )
}

export default Footer;