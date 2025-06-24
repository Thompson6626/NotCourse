"use client";

import Copy from "./Copy.tsx";
import "../styles/Hero.css";
import Icons3D from "./ThreeIcons.tsx";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import {useRef} from "react";
import { projectStats } from "../constants";

gsap.registerPlugin(useGSAP);


function Hero() {
	const container = useRef(null);

	useGSAP(() => {
		const tl = gsap.timeline();

		tl.from(".hero-badge", {
			y: 50,
			opacity: 0,
			duration: 1,
			ease: "power2.out",
		}, "<")
			.from(".cta-button", {
				y: 100,
				opacity: 0,
				duration: 0.6,
				ease: "power2.out",
			}, "<")
			.from(".stat-number",{
				opacity: 0,
				duration: 0.2,
				ease: "power2.out",
			})
			.to(".stat-value", {
				textContent: (_: never, target) => {
					const parent = target.parentNode;
					return +parent.getAttribute("data-number");
				},
				duration: 2,
				snap: { textContent: 1 },
				ease: "power1.out",
				onUpdate: function () {
					// Optional: Add thousands separators or custom formatting
					document.querySelectorAll('.stat-value').forEach(el => {
						const val = parseInt(el.textContent || '0');
						el.textContent = val.toLocaleString();
					});
				}
			}, "<0.5");
	}, { scope: container });


	return (
		<section className="hero" ref={container}>
			<div className="hero-left">
				<div className="hero-badge">🚀 Featured by top creators</div>
				<Copy animateOnScroll={false} delay={0.2}>
					<h1 className="hero-title">
						Less stress. More success.
					</h1>

					<p className="hero-subtext">
						Whether you're building a brand, a project, or a dream — we've got the tools to help you stay focused, move fast, and get results.
					</p>
				</Copy>

				<div className="cta">
					<button className="cta-button">Try for free</button>
					<button className="cta-button">See Courses</button>
				</div>

					<div className="hero-stats">
						{
							projectStats.map((stat, index) => (
								<div className="stat" key={index}>
									<h3 className="stat-number" data-number={stat.number}>
										<span className="stat-value">0</span> <span>{stat.postfix}</span>
									</h3>
									<Copy animateOnScroll={false} delay={0.2}>
										<p>{stat.description}</p>
									</Copy>
								</div>

							))
						}
					</div>
			</div>

			<div className="hero-right">
				<Icons3D />
			</div>
		</section>
	);
}

export default Hero;
