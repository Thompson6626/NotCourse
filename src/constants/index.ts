import {
    BadgeCheck,
    Banana,
    Code, Coffee, Crown,
    Ghost,
    GraduationCap,
    Laptop2,
    Layers,
    PartyPopper,
    Rocket,
    SmilePlus,
    Users, Wallet,
    XCircle
} from "lucide-react";

export const projectStats = [
    {
        number: 10,
        postfix: "k+",
        description: "Active Users"
    },
    {
        number: 120,
        postfix: "+",
        description: "Expert Courses"
    },
    {
        number: 98,
        postfix: "%",
        description: "Completion Rate"
    }
];

export const reviews = [
    {
        rating: 5,
        profileImageUrl: "",
        name: "Sarah M.",
        position: "Professional Overthinker",
        testimonial: "I took one course and now I correct my professors. I may be insufferable, but I’m educated."
    },
    {
        rating: 4,
        profileImageUrl: "",
        name: "Brad T.",
        position: "Freelance Procrastinator",
        testimonial: "I signed up to avoid doing actual work... now I accidentally have a new career. 10/10, would avoid responsibility again."
    },
    {
        rating: 5,
        profileImageUrl: "",
        name: "Linda K.",
        position: "Junior Senior Mid-Level Intern",
        testimonial: "Thanks to this platform, I now speak 3 programming languages and 2 human ones. My plants are still dying, though."
    },
    {
        rating: 3,
        profileImageUrl: "",
        name: "Greg W.",
        position: "Aspiring Thought Leader",
        testimonial: "I enrolled in a leadership course. Now I give motivational speeches to my cat. She's unimpressed, but I feel empowered."
    },
    {
        rating: 5,
        profileImageUrl: "",
        name: "Tina Z.",
        position: "Part-Time Philosopher",
        testimonial: "After finishing 12 courses, I still don’t know what to do with my life. But at least I can explain it using machine learning."
    },
    {
        rating: 4,
        profileImageUrl: "",
        name: "Devon R.",
        position: "Spreadsheet Sorcerer",
        testimonial: "Before this, I thought Python was just a snake. Now I automate my life and mildly threaten my boss with scripts."
    },
    {
        rating: 5,
        profileImageUrl: "",
        name: "Nina J.",
        position: "Remote Ninja Consultant",
        testimonial: "Took a course on time management. Didn’t finish it. Irony? Yes. Regret? Also yes. But the course was amazing!"
    },
    {
        rating: 4,
        profileImageUrl: "",
        name: "Alex F.",
        position: "CEO of Side Projects",
        testimonial: "Now I have 5 unfinished Udemy clones, 3 half-built apps, and an ego the size of Silicon Valley. Thank you for the knowledge overload!"
    }
];

export const features = [
    {
        summary: "Keyboard-Fumbling Drills",
        description: "Break things spectacularly while pretending you're building something revolutionary.",
        icon: Code,
    },
    {
        summary: "Confusing Learning Paths",
        description: "Wander through an endless maze of tutorials until one sort of makes sense.",
        icon: Layers,
    },
    {
        summary: "Launch-Ready (ish) Skills",
        description: "Gain experience that'll *almost* get you past the first interview round.",
        icon: Rocket,
    },
    {
        summary: "Experts™ at Your Service",
        description: "Learn from folks who claim they were in startups. Probably. Once. Maybe.",
        icon: GraduationCap,
    },
    {
        summary: "Cutting-Edge-ish Stack",
        description: "Work with tools that were hot last year, but hey—they still work... mostly.",
        icon: Laptop2,
    },
    {
        summary: "Emotionally Supportive Community",
        description: "Cry together. Debug together. Pretend everything is going fine together.",
        icon: Users,
    },
];

export const plans = [
    {
        name: "Free™ (but you pay in dignity)",
        price: 0,
        features: [
            { feature: "Access to 3.5% of the content", icon: XCircle },
            { feature: "Laggy UI for character building", icon: Ghost },
            { feature: "Occasional motivational insults", icon: SmilePlus },
            { feature: "Unskippable welcome tour", icon: PartyPopper },
        ],
        cta: "I'm brave enough",
    },
    {
        name: "Procrastinator Plus",
        price: 4,
        features: [
            { feature: "Full access, but you'll never open it", icon: Wallet },
            { feature: "Weekly guilt-tripping emails", icon: Banana  },
            { feature: "Bonus: More things to avoid doing", icon: Ghost  },
            { feature: "One complimentary digital coffee", icon: Coffee  },
        ],
        cta: "Might as well try it",
    },
    {
        name: "Ultra Mega Overkill Premium Max+",
        price: 99,
        features: [
            { feature: "Everything from all past, present, and future plans", icon: Rocket  },
            { feature: "Gold-plated loading screen", icon: SmilePlus },
            { feature: "Complimentary existential crisis", icon: XCircle  },
            { feature: "Badge of questionable honor", icon: BadgeCheck  },
            { feature: "A crown (imaginary)", icon: Crown },
        ],
        cta: "Ascend now",
    },
];
