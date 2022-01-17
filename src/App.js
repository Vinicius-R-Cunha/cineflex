import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainMenu from "./components/MainMenu";
import SchedulePage from "./components/SchedulePage";
import SeatsPage from "./components/SeatsPage";
import SuccessPage from "./components/SuccessPage";

export default function App() {
    const [seats, setSeats] = useState();
    const [seatsArray, setSeatsArray] = useState([]);
    const [name, setName] = useState([]);
    const [cpf, setCpf] = useState([]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainMenu />}></Route>
                <Route path="/sessoes/:idFilme" element={<SchedulePage />}></Route>
                <Route path="/assentos/:idSessao"
                    element={
                        <SeatsPage
                            seats={seats}
                            setSeats={setSeats}
                            name={name}
                            setName={setName}
                            cpf={cpf}
                            setCpf={setCpf}
                            seatsArray={seatsArray}
                            setSeatsArray={setSeatsArray}
                        />
                    }>
                </Route>
                <Route path="/sucesso"
                    element={
                        <SuccessPage
                            seats={seats}
                            setSeats={setSeats}
                            name={name}
                            setName={setName}
                            cpf={cpf}
                            setCpf={setCpf}
                            seatsArray={seatsArray}
                            setSeatsArray={setSeatsArray}
                        />
                    }>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
