"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function Copy({ children, animateOnScroll = true, delay = 0 }) {
	const containerRef = useRef(null);
	const splitInstances = useRef([]); // actual SplitText instances
	const lines = useRef([]); // collected lines from all splits

	useGSAP(
		() => {
			if (!containerRef.current) return;

			// Cleanup previous
			splitInstances.current = [];
			lines.current = [];

			const isWrapper = containerRef.current.hasAttribute("data-copy-wrapper");
			const elements = isWrapper
				? Array.from(containerRef.current.children)
				: [containerRef.current];

			elements.forEach((element) => {
				const split = SplitText.create(element, {
					type: "lines",
					mask: "lines",
					linesClass: "line++",
				});

				splitInstances.current.push(split);
				lines.current.push(...split.lines);

				// Preserve textIndent if present
				const textIndent = window.getComputedStyle(element).textIndent;
				if (textIndent && textIndent !== "0px" && split.lines.length > 0) {
					split.lines[0].style.paddingLeft = textIndent;
					element.style.textIndent = "0";
				}
			});

			// Set initial state
			gsap.set(lines.current, { y: "100%" });

			const animationProps = {
				y: "0%",
				duration: 1,
				stagger: 0.1,
				ease: "power4.out",
				delay,
			};

			if (animateOnScroll) {
				gsap.to(lines.current, {
					...animationProps,
					scrollTrigger: {
						trigger: containerRef.current,
						start: "top 75%",
						once: true,
					},
				});
			} else {
				gsap.to(lines.current, animationProps);
			}

			return () => {
				// Revert text splits
				splitInstances.current.forEach((split) => split?.revert());
			};
		},
		{ scope: containerRef, dependencies: [animateOnScroll, delay] },
	);

	// Clone the single child to apply ref
	if (React.Children.count(children) === 1) {
		return React.cloneElement(children, { ref: containerRef });
	}

	// Wrap multiple children in a container
	return (
		<div ref={containerRef} data-copy-wrapper="true">
			{children}
		</div>
	);
}
