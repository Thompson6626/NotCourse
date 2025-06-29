import "./styles/global.css";
//import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Landing from "./components/Landing.tsx";

createRoot(document.getElementById("root")!).render(
	//<StrictMode>
		<Landing />
	//</StrictMode>,
);
