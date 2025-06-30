"use client";

import UndergroundText from "./UndergroundText.tsx";
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
				duration: 1.5,
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
		<section className="hero" ref={container} aria-label="Hero section" id="home">
			<div className="hero-left">
				<div className="hero-badge" role="note">
					<span aria-hidden="true">🚀</span> Featured by top creators
				</div>

				<UndergroundText animateOnScroll={false} delay={0.2}>
					<h1 className="hero-title">
						Fewer bugs. More brags.
					</h1>

					<p className="hero-subtext">
						Whether you're launching a side project, battling semicolons, or chasing that sweet, sweet Stack Overflow upvote — we’ve got the tools, tutorials, and tech therapy you need to survive and thrive.
					</p>
				</UndergroundText>

				<div className="cta-buttons" role="group" aria-label="Call to actions">
					<button className="cta-button btn-fade-up">Try for free</button>
					<button className="cta-button btn-fade-up">See Courses</button>
				</div>

				<div className="hero-stats" aria-label="Project statistics">
					{projectStats.map((stat, index) => (
						<div className="stat" key={index}>
							<h3 className="stat-number" data-number={stat.number}>
								<span className="stat-value">0</span>
								<span className="stat-postfix"> {stat.postfix}</span>
							</h3>
							<UndergroundText animateOnScroll={false} delay={0.2}>
								<p className="stat-summary">{stat.description}</p>
							</UndergroundText>
						</div>
					))}
				</div>
			</div>

			<div className="hero-right" aria-hidden="true">
				<Icons3D />
			</div>
		</section>

	);
}

export default Hero;
