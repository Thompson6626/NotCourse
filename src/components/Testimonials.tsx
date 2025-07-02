import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import { reviews } from "../constants";
import { Star } from "lucide-react";
import "../styles/Testimonials.css";
import UndergroundText from "./UndergroundText";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";

function Testimonials() {

    useGSAP(() => {
        gsap.from(".review", {
            opacity: 0,
            y: 200,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".testimonials-swiper",
                start: "top 90%"
            },
            stagger: 0.1
        });
    });

    return (
        <section className="testimonials-section" id="testimonials" aria-labelledby="testimonials-title">
            <header className="testimonial-header">
                <UndergroundText delay={0.1}>
                    <h2 id="testimonials-title" className="testimonial-reason">
                        Praise from People We Definitely Didn’t Pay
                    </h2>
                    <p className="testimonial-text">
                        Because nothing says trustworthy like anonymous internet quotes
                    </p>
                </UndergroundText>
            </header>

            <Swiper
                modules={[Navigation, Pagination, A11y]}
                pagination={{ clickable: true }}
                spaceBetween={24}
                slidesPerView={3}
                breakpoints={{
                    320: { slidesPerView: 1 },
                    640: { slidesPerView: 1.25 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1280: { slidesPerView: 4 },
                }}
                className="testimonials-swiper"
                aria-roledescription="carousel"
            >
                {reviews.map((review, i) => (
                    <SwiperSlide  key={i}>
                        <article className="review fast-background-transition" role="group" aria-label={`Testimonial by ${review.name}`}>
                            <div className="rating" aria-hidden="true">
                                {Array.from({ length: 5 }, (_, j) => {
                                    const filled = j < review.rating;
                                    return (
                                        <Star
                                            key={j}
                                            fill={filled ? "currentColor" : "none"}
                                            stroke="currentColor"
                                            strokeWidth={filled ? 0 : 1.5}
                                        />
                                    );
                                })}
                            </div>

                            <blockquote className="review-text">
                                “{review.testimonial}”
                            </blockquote>

                            <footer className="review-author">
                                <img
                                    src={review.profileImageUrl}
                                    alt={`Photo of ${review.name}`}
                                    className="author-image"
                                    loading="lazy"
                                />
                                <div>
                                    <div className="author-name">{review.name}</div>
                                    <div className="author-position">{review.position}</div>
                                </div>
                            </footer>
                        </article>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}

export default Testimonials;
