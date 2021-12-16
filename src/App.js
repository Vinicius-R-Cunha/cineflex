import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainMenu from "./components/MainMenu";
import SchedulePage from "./components/SchedulePage";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainMenu />}></Route>
                <Route path="/sessoes/:idFilme" element={<SchedulePage />}></Route>
                {/* <Route path="/assentos/:idSessao" element={<SeatsPage />}></Route>
                <Route path="/sucesso" element={<SuccessPage />}></Route> */}
            </Routes>
        </BrowserRouter>
    );
}