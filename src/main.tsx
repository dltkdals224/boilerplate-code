import { createRoot } from "react-dom/client";
import { worker } from "./mocks/browser";

import App from "./App.tsx";

import "./index.css";

if (process.env.NODE_ENV === "development") {
  worker.start().then(() => {
    createRoot(document.getElementById("root")!).render(<App />);
  });
} else {
  createRoot(document.getElementById("root")!).render(<App />);
}
