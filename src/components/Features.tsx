import {
    Code,
    Layers,
    Rocket,
    GraduationCap,
    Laptop2,
    Users,
} from "lucide-react";
import "../styles/Features.css";
import Copy from "./Copy.tsx";

const features = [
    {
        summary: "Hands-on Coding",
        description: "Learn by building real projects that mirror actual industry challenges.",
        icon: <Code />,
    },
    {
        summary: "Structured Learning Path",
        description: "Progress through a well-defined curriculum that builds knowledge step-by-step.",
        icon: <Layers />,
    },
    {
        summary: "Launch-Ready Skills",
        description: "Gain practical experience that prepares you for job interviews and freelancing.",
        icon: <Rocket />,
    },
    {
        summary: "Expert Instruction",
        description: "Learn from experienced mentors who've worked in startups, agencies, and big tech.",
        icon: <GraduationCap />,
    },
    {
        summary: "Modern Tech Stack",
        description: "Stay ahead of the curve with training in today's most in-demand tools and frameworks.",
        icon: <Laptop2 />,
    },
    {
        summary: "Supportive Community",
        description: "Get help, feedback, and accountability from peers and mentors as you learn.",
        icon: <Users />,
    },
];


function Features(){


    return (
        <section className="features-section">
            <Copy delay={0.1}>
                <h2 className="features-question">
                    Why Choose Our Platform
                </h2>
                <h4 className="features-reason">
                    No fluff. Just the tools, techniques, and support you need to thrive
                </h4>
            </Copy>

            <div className="features">
                {
                    features.map((feature, index) => {
                        return (
                            <div className="feature" key={index}>
                                <Copy>
                                    <div className="feature-icon">{feature.icon}</div>
                                    <h3>{feature.summary}</h3>
                                    <p>{feature.description}</p>
                                </Copy>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    );
}


export default Features;