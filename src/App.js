import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainMenu from "./components/MainMenu";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainMenu />}></Route>
                {/* <Route path="/filme" element={<SchedulePage />}></Route>
                <Route path="/sessao" element={<SeatsPage />}></Route>
                <Route path="/sucesso" element={<SuccessPage />}></Route> */}
            </Routes>
        </BrowserRouter>
    );
}