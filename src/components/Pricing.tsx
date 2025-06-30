import "../styles/Pricing.css";
import {plans} from "../constants";
import UndergroundText from "./UndergroundText.tsx";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useGSAP} from "@gsap/react";


gsap.registerPlugin(ScrollTrigger);

function Pricing() {

    useGSAP(() => {

        gsap.from(
            ".pricing-card",
            {
                opacity: 0,
                y: 200,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".pricing-card",
                    start: "top 90%"
                },
            }
        );

    });

    return (
        <section className="pricing-section" id="pricing">
            <header className="pricing-context">
                <UndergroundText>
                    <h2 className="pricing-heading">
                        Choose your plan
                    </h2>
                    <p className="pricing-subheading">
                        From “I just peeked in” to “take my money,” we’ve got you covered.
                    </p>
                </UndergroundText>
            </header>
            <div className="plans">
                {plans.map(({ name, price, features, cta }, index) => (
                    <article className={`pricing-card ${index === 1 ? "highlighted" : ""}`} key={index}>
                        <h3 className="pricing-title">{name}</h3>
                        <div className="pricing-price">${price}</div>
                        <ul className="pricing-features">
                            {features.map(({ icon, feature }, i) => {
                                const Icon = icon;
                                return (
                                    <li className="pricing-feature" key={i}>
                                        <span className="pricing-icon"><Icon /></span>
                                        {feature}
                                    </li>
                                );
                            })}
                        </ul>
                        <button className={`pricing-cta ${index === 1 ? "highlighted-button" : ""}`}>{cta}</button>
                    </article>
                ))}
            </div>
        </section>

    );
}

export default Pricing;
