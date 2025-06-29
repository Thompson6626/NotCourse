import { useRef, useState, useEffect } from "react";
import { reviews } from "../constants";
import { Star } from "lucide-react";
import gsap from "gsap";
import "../styles/Testimonials.css";
import Copy from "./Copy.tsx";

function Testimonials() {
    const [index, setIndex] = useState(0);
    const containerRef = useRef(null);
    const visibleCount = 4;

    const handlePrev = () => {
        const newIndex = (index - visibleCount + reviews.length) % reviews.length;
        animateSlide(newIndex);
    };

    const handleNext = () => {
        const newIndex = (index + visibleCount) % reviews.length;
        animateSlide(newIndex);
    };

    const animateSlide = (newIndex) => {
        const container = containerRef.current;
        const reviewWidth = container.children[0].offsetWidth;
        const gap = parseFloat(getComputedStyle(container).gap) || 24;
        const offset = (reviewWidth + gap) * newIndex;

        gsap.to(container, {
            x: -offset,
            duration: 0.010,
            ease: "power3.out",
        });

        setIndex(newIndex);
    };

    // Reset animation on resize (optional)
    useEffect(() => {
        const onResize = () => {
            animateSlide(index);
        };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [index]);

    return (
        <section className="testimonials-section" aria-labelledby="testimonials-title">
            <header className="testimonial-header">
                <Copy delay={0.1}>
                    <h2 id="testimonials-title" className="testimonial-reason">
                        Praise from People We Definitely Didn’t Pay
                    </h2>
                    <p className="testimonial-text">Because nothing says trustworthy like anonymous internet quotes</p>
                </Copy>
            </header>

            <div className="carousel-controls">
                <button onClick={handlePrev} aria-label="Previous reviews">‹</button>
                <button onClick={handleNext} aria-label="Next reviews">›</button>
            </div>

            <div className="carousel-viewport">
                <div className="cherrypicked-reviews" ref={containerRef}>
                    {reviews.map((review, i) => (
                        <article key={i} className="review">
                            <div className="rating" aria-label={`Rating: ${review.rating} out of 5 stars`}>
                                {Array.from({ length: 5 }, (_, i) => {
                                    const isFilled = i < review.rating;
                                    return (
                                        <Star
                                            key={i}
                                            fill={isFilled ? "currentColor" : "none"}
                                            stroke="currentColor"
                                            strokeWidth={isFilled ? 0 : 1.5}
                                        />
                                    );
                                })}
                            </div>

                            <blockquote className="review-text">{review.testimonial}</blockquote>

                            <footer className="review-author">
                                <img
                                    src={review.profileImageUrl}
                                    alt={`Profile of ${review.name}`}
                                    className="author-image"
                                />
                                <div>
                                    <div className="author-name">{review.name}</div>
                                    <div className="author-position">{review.position}</div>
                                </div>
                            </footer>
                        </article>
                    ))}
                </div>
            </div>
        </section>

    );
}

export default Testimonials;
