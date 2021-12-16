import './style.css';
import loading from '../../assets/loading.gif'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header';
import Footer from '../Footer';

export default function SeatsPage() {
    const subtitleArray = [
        { class: 'selected', text: 'Selecionado' },
        { class: 'avaiable', text: 'Disponível' },
        { class: 'not-avaiable', text: 'Indisponível' }
    ]

    const { idSessao } = useParams();
    const [seats, setSeats] = useState();

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v4/cineflex/showtimes/${idSessao}/seats`);
        promise.then(answer => setSeats(answer.data))
    }, [idSessao])

    console.log(seats);

    if (!seats) {
        return (
            <img src={loading} alt="" />
        )
    }

    return (
        <>
            <Header />
            <p className='select-seats'>Selecione o(s) assento(s)</p>

            <div className='seats-list'>
                {seats.seats.map(seat => {
                    return (
                        <div className={`seat`} key={seat.id}>{parseInt(seat.name) < 10 ? `0${seat.name}` : seat.name}</div>
                    );
                })}

                <div className='subtitle'>
                    {subtitleArray.map(object =>
                        <div key={object.text}>
                            <div className={object.class}></div>
                            {object.text}
                        </div>)}
                </div>
            </div>

            <div className='inputs-div'>
                Nome do comprador:
                <input type="text" placeholder='Digite seu nome...' />
                CPF do comprador:
                <input type="text" placeholder='Digite seu CPF...' />
            </div>

            <div className='book-seats'>Reservar assento(s)</div>

            <Footer title={seats.movie.title} image={seats.movie.posterURL} time={seats.name} day={seats.day.weekday} />
        </>
    )
}