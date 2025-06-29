import { Banana, Ghost, Rocket, Wallet, XCircle, SmilePlus } from "lucide-react";
import "../styles/Pricing.css";

export const plans = [
    {
        name: "Free™ (but you pay in dignity)",
        price: 0,
        features: [
            {
                feature: "Access to 3.5% of the content",
                icon: <XCircle />,
            },
            {
                feature: "Laggy UI for character building",
                icon: <Ghost />,
            },
            {
                feature: "Occasional motivational insults",
                icon: <SmilePlus />,
            },
        ],
    },
    {
        name: "Procrastinator Plus",
        price: 4,
        features: [
            {
                feature: "Full access, but you'll never open it",
                icon: <Wallet />,
            },
            {
                feature: "Weekly guilt-tripping emails",
                icon: <Banana />,
            },
            {
                feature: "Bonus: More things to avoid doing",
                icon: <Ghost />,
            },
        ],
    },
    {
        name: "Ultra Mega Overkill Premium Max+",
        price: 99,
        features: [
            {
                feature: "Everything from all past, present, and future plans",
                icon: <Rocket />,
            },
            {
                feature: "Gold-plated loading screen",
                icon: <SmilePlus />,
            },
            {
                feature: "Complimentary existential crisis",
                icon: <XCircle />,
            },
        ],
    },
];


function Pricing() {


    return (
        <div className="pricing">
            <div>Best plan for you</div>
            <div className="plans">
                {plans.map((plan) => (
                    <div className="plan" key={plan.name}>
                        <div className="plan-header">
                            <h2 className="plan-title">{plan.name}</h2>
                            <p className="plan-price">${plan.price}</p>
                        </div>
                        <ul className="plan-features">
                            {plan.features.map((feature, index) => (
                                <li className="feature-item" key={index}>
                                    <span className="feature-icon">{feature.icon}</span>
                                    <span>{feature.feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default Pricing;