import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Sun, Moon, AlignJustify, X } from "lucide-react";
import "../styles/Header.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function Header() {
	const container = useRef<HTMLElement | null>(null);
	const [isLight, setIsLight] = useState(() => {
		const stored = localStorage.getItem("theme");
		if (stored) return stored === "light";
		return window.matchMedia("(prefers-color-scheme: light)").matches;
	});

	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		const body = document.body;
		const added = body.classList.toggle("light", isLight);
		localStorage.setItem("theme", added ? "light" : "dark");
	}, [isLight]);

	useGSAP(() => {
		const tl = gsap.timeline();
		tl.from(container.current, {
			y: -100,
			opacity: 0,
			duration: 1,
			ease: "power2.out",
		});

		const tl2 = gsap.timeline({
			scrollTrigger: {
				trigger: container.current,
				start: "bottom top",
			}
		});

		tl2.fromTo(
			container.current,
			{ backgroundColor: "transparent" },
			{
				backdropFilter: "blur(10px)",
				duration: 1,
				ease: "power1.inOut",
			}
		);
	}, { scope: container });

	const handleLinkClick = () => {
		setMenuOpen(false);
	};

	return (
		<header ref={container} className="header fast-background-transition">
			<div className="header-title">Master</div>

			<ul className="header-features">
				<a href="#home" className="feature-item">Home</a>
				<a href="#features" className="feature-item">Features</a>
				<a href="#testimonials" className="feature-item">Testimonials</a>
				<a href="#pricing" className="feature-item">Pricing</a>
			</ul>


			<div className="extra-buttons">
				<div
					className="theme-toggle"
					onClick={() => setIsLight(prev => !prev)}
					title="Toggle Theme"
				>
					{isLight ? <Moon className="icon" /> : <Sun className="icon" />}
				</div>

				<div className="login-button extra-button">
					<div className="inner-button fast-background-transition">
						Login
					</div>
				</div>

				<div className="signup-button extra-button">
					<div className="inner-button fast-background-transition">
						Get Started <span> &gt; </span>
					</div>
				</div>
			</div>

			{/* Hamburger Icon */}
			<div className="mobile-wrapper">
				{menuOpen ? (
					<X className="mobile-menu-icon" onClick={() => setMenuOpen(false)} />
				) : (
					<AlignJustify className="mobile-menu-icon" onClick={() => setMenuOpen(true)} />
				)}
			</div>

			{/* Mobile Menu */}
			{menuOpen && (
				<div className="mobile-menu show">
					<a href="#home" className="mobile-link" onClick={handleLinkClick}>Home</a>
					<a href="#features" className="mobile-link" onClick={handleLinkClick}>Features</a>
					<a href="#testimonials" className="mobile-link" onClick={handleLinkClick}>Testimonials</a>
					<a href="#pricing" className="mobile-link" onClick={handleLinkClick}>Pricing</a>
				</div>
			)}
		</header>
	);
}

export default Header;
