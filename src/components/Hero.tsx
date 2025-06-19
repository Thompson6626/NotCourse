"use client";

import Copy from "./Copy.tsx";
import '../styles/Hero.css';

function Hero(){


    return (
        <section className="hero">
            <div className="hero-left">
                <Copy animateOnScroll={false} delay={0.5}>
                    <h1 id="hero-title">Welcome to my Astro site</h1>
                    <p id="hero-subtext">This is the left content</p>
                </Copy>
            </div>

            <div className="hero-right">

            </div>
        </section>

    );
}

export default Hero;