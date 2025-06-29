"use client";

import Header from "./Header.tsx";
import Hero from "./Hero.tsx";
import Features from "./Features.tsx";
import Testimonials from "./Testimonials.tsx";
import Pricing from "./Pricing.tsx";
import Footer from "./Footer.tsx";

function Landing() {
	return (
		<div>
			<Header />
			<Hero />
			<Features />
			<Testimonials />
			<Pricing />
			<Footer />
		</div>
	);
}

export default Landing;
