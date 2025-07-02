"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { questions } from "../constants"
import "../styles/FAQ.css"
import UndergroundText from "./UndergroundText.tsx";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";

function FAQ() {
    const [openItems, setOpenItems] = useState<Set<number>>(new Set())

    const toggleItem = (index: number) => {
        const newOpenItems = new Set(openItems)
        if (newOpenItems.has(index)) {
            newOpenItems.delete(index)
        } else {
            newOpenItems.add(index)
        }
        setOpenItems(newOpenItems)
    }

    useGSAP(() => {

        const items = gsap.utils.toArray(".faq-item") as HTMLElement[];

        items.forEach((item) => {
            gsap.from(item, {
                opacity: 0,
                y: 100,
                duration: 0.1,
                ease: "power2.in",
                scrollTrigger: {
                    trigger: item,
                    start: "top 90%",
                },
            });
        });



    });

    return (
        <section className="faq-section" id="faq">
            <div className="faq-container">
                <div className="faq-header">
                    <UndergroundText>
                        <h2 className="faq-title">Frequently Asked Questions</h2>
                        <p className="faq-subtitle">
                            Everything you need to know about our platform. Can't find the answer you're looking for?
                            <a href="#contact" className="faq-contact-link">
                                {" "}
                                Get in touch
                            </a>
                            .
                        </p>
                    </UndergroundText>
                </div>

                <div className="faq-list">
                    {questions.map((item, index) => (
                        <div key={index} className={`faq-item ${openItems.has(index) ? "faq-item-open" : ""}`}>
                            <button
                                className="faq-question"
                                onClick={() => toggleItem(index)}
                                aria-expanded={openItems.has(index)}
                                aria-controls={`faq-answer-${index}`}
                            >
                                <span className="faq-question-text">{item.question}</span>
                                <ChevronDown className="faq-chevron" aria-hidden="true" />
                            </button>

                            <div
                                id={`faq-answer-${index}`}
                                className="faq-answer-wrapper"
                                role="region"
                                aria-labelledby={`faq-question-${index}`}
                            >
                                <div className="faq-answer">{item.answer}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default FAQ
