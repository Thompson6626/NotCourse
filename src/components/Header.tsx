import { useRef } from 'react';
import gsap from 'gsap';
import '../styles/Header.css';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

function Header() {
    const container = useRef<HTMLElement | null>(null);

    useGSAP(() => {
        gsap.from(container.current, {
            y: -100,
            opacity: 0,
            duration: 1,
            ease: 'power2.out',
        });
    });

    return (
        <header ref={container} className="header">
            <div className="header-title">Master</div>

            <div className="header-features">
                <div className="feature-item">Feature 1</div>
                <div className="feature-item">Feature 2</div>
                <div className="feature-item">Feature 3</div>
                <div className="feature-item">Feature 4</div>
                <div className="feature-item">Feature 5</div>
            </div>

            <div className="theme-toggle" id="toggle"></div>
        </header>
    );
}

export default Header;
