import "./styles/global.scss";
import Routes from "./routes";
import { BrowserRouter } from "react-router-dom";
import { DialogWindow } from "./components/DialogWindow/DialogWindow";
import AppContextProvider from "./components/AppContextProvider/AppContextProvider";

export function App() {
  return (
    <BrowserRouter>
      <AppContextProvider>
        <>
          <Routes />
          <DialogWindow />
        </>
      </AppContextProvider>
    </BrowserRouter>
  );
}
