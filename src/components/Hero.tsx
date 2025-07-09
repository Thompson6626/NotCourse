import UndergroundText from "./UndergroundText.jsx";
import "../styles/Hero.css";
import Icons3D from "./Icons3D.tsx";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import { projectStats } from "../constants";

gsap.registerPlugin(useGSAP);


function Hero() {

	useGSAP(() => {
		const tl = gsap.timeline();
		const statEls = gsap.utils.toArray<HTMLElement>('.stat-value');

		tl.from(".hero-badge", {
			y: 100,
			opacity: 0,
			duration: 1,
			ease: "power2.out",
		});

		const fadeTargets: HTMLElement[] = [];
		statEls.forEach(el => {
			const postfix = el.nextElementSibling as HTMLElement;
			fadeTargets.push(el, postfix);
		});

		tl.from(fadeTargets, {
			opacity: 0,
			duration: 0.3,
			ease: "power2.out"
		});

		// Step 2: Animate all number counts in parallel
		statEls.forEach((el) => {
			const parent = el.closest(".stat-number");
			const finalVal = parseInt(parent?.getAttribute("data-number") ?? "0");
			const obj = { val: 0 };

			tl.to(obj, {
				val: finalVal,
				duration: 1.3,
				ease: "power1.out",
				snap: { val: 1 },
				onUpdate: () => {
					el.textContent = obj.val.toLocaleString();
				}
			}, "<");
		});
	});



	return (
		<section className="hero fast-background-transition" aria-label="Hero section" id="home">
			<div className="hero-left">
				<div className="hero-badge" role="note">
					<span aria-hidden="true">🚀</span> Featured by top creators
				</div>

				<UndergroundText animateOnScroll={false} delay={0.2}>
					<h1 className="hero-title">
						Learn faster. Fail better.
					</h1>

					<p className="hero-subtext">
						Our resources won’t stop you from breaking things, but they will help you understand why it broke.
					</p>
				</UndergroundText>

				<div className="cta-buttons" role="group" aria-label="Call to actions">
					<button className="cta-button btn-fade-up fast-background-transition">Try for free</button>
					<button className="cta-button btn-fade-up fast-background-transition">See Courses</button>
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
