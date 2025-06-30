import "../styles/Features.css";
import UndergroundText from "./UndergroundText.tsx";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import {features} from "../constants";



function Features(){

    useGSAP(() => {

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".features",
                start: "top 75%"
            },
        });

        tl.from(".feature", {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            stagger: 0.1,
        });

    });

    return (
        <section className="features-section" id="features">
            <UndergroundText>
                <h2 className="features-question">
                    Why Pretend to Choose Us
                </h2>
                <h4 className="features-reason">
                    No fluff. Just chaos, coffee, and a vague sense of progress.
                </h4>
            </UndergroundText>

            <div className="features">
                {
                    features.map(({ icon,summary,description }, index) => {
                        const Icon = icon;
                        return (
                            <div className="feature" key={index}>
                                <div className="feature-icon"><Icon /></div>
                                <h3>{summary}</h3>
                                <p>{description}</p>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    );
}


export default Features;