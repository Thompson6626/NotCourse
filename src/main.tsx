import "./styles/global.css";
//import { StrictMode } from "react"; // Messes up Threejs
import { createRoot } from "react-dom/client";
import Landing from "./components/Landing.tsx";

createRoot(document.getElementById("root")!).render(
	//<StrictMode>
		<Landing />
	//</StrictMode>,
);
