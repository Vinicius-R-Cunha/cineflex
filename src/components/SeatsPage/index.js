import './style.css';
import loading from '../../assets/loading.gif'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header';
import Footer from '../Footer';

export default function SeatsPage() {
    const { idSessao } = useParams();
    const [seats, setSeats] = useState();
    const [seatsArray, setSeatsArray] = useState([]);
    const subtitleArray = [
        { class: 'selected', text: 'Selecionado' },
        { class: 'available', text: 'Disponível' },
        { class: 'not-available', text: 'Indisponível' }
    ]

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v4/cineflex/showtimes/${idSessao}/seats`);
        promise.then(createSeatsArray);
    }, [idSessao])

    function createSeatsArray(answer) {
        setSeats(answer.data);
        setSeatsArray([...answer.data.seats.map(object => object = { ...object, selected: false })]);
    }

    function clickSeat(seat) {
        if (seat.isAvailable && !seat.selected) {
            setSeatsArray(() => toggleSeat('select', seat));
        } else if (seat.isAvailable && seat.selected) {
            setSeatsArray(() => toggleSeat('deselect', seat));
        } else if (!seat.isAvailable) {
            alert("Esse assento não está disponível");
            return;
        }
    }

    function toggleSeat(param, seat) {
        const newArray = [];
        let newObject = {};
        for (let i = 0; i < seatsArray.length; i++) {
            if (seatsArray[i].id === seat.id) {
                newObject = { ...seatsArray[i] };
                if (param === 'select') {
                    newObject.selected = true;
                } else if (param === 'deselect') {
                    newObject.selected = false;
                }
                newArray.push(newObject);

            } else {
                newArray.push(seatsArray[i]);
            }
        }
        return newArray;
    }

    if (!seats || seatsArray.length === 0) {
        return (
            <img src={loading} alt="" />
        )
    }

    return (
        <>
            <Header />
            <p className='select-seats'>Selecione o(s) assento(s)</p>

            <div className='seats-list'>

                {seatsArray.map(seat => {
                    return (
                        <div className={`seat ${seat.isAvailable ? '' : 'not-available'} ${seat.selected ? 'selected' : ''}`}
                            key={seat.id}
                            onClick={() => clickSeat(seat)}
                        >{parseInt(seat.name) < 10 ? `0${seat.name}` : seat.name}</div>
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