import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "./context/ToastProvider";
import { AppRoutes } from "./routes";

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
