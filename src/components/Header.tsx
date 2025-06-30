"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Sun, Moon } from "lucide-react";
import "../styles/Header.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function Header() {
	const container = useRef<HTMLElement | null>(null);

	const [isLight, setIsLight] = useState(() => {
		// Prefer saved theme
		const stored = localStorage.getItem("theme");
		if (stored) return stored === "light";

		// Fallback to system preference
		return window.matchMedia("(prefers-color-scheme: light)").matches;
	});

	// Theme toggle effect
	useEffect(() => {
		const body = document.body;
		if (isLight) {
			body.classList.add("light");
			localStorage.setItem("theme", "light");
		} else {
			body.classList.remove("light");
			localStorage.setItem("theme", "dark");
		}
	}, [isLight]);

	// Entrance animation
	useGSAP(() => {
		const tl = gsap.timeline();

		// Entrance
		tl.from(container.current, {
			y: -100,
			opacity: 0,
			duration: 1,
			ease: "power2.out",
		});

		const tl2 = gsap.timeline({
			scrollTrigger: {
				trigger: container.current,
				start: "bottom top"
			}
		});

		tl2.fromTo(container.current , { backgroundColor: "transparent" } , {
			backdropFilter: "blur(10px)",
			duration: 1,
			ease: "power1.inOut",
		}).call(() => console.log("Activating"))
	}, { scope: container });

	return (
		<header ref={container} className="header">
			<div className="header-title">Master</div>

			<ul className="header-features">
				<a href="#home" className="feature-item">Home</a>
				<a href="#features" className="feature-item">Features</a>
				<a href="#testimonials" className="feature-item">Testimonials</a>
				<a href="#pricing" className="feature-item">Pricing</a>
			</ul>

			<div
				className="theme-toggle"
				onClick={() => setIsLight(prev => !prev)}
				title="Toggle Theme"
			>
				{isLight ? <Moon className="icon" /> : <Sun className="icon" />}
			</div>
		</header>
	);
}

export default Header;