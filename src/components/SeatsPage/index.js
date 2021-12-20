import './style.css';
import loading from '../../assets/loading.gif'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header';
import Footer from '../Footer';
import NavigationButton from '../NavigationButton';

export default function SeatsPage({ seats, setSeats, name, setName, cpf, setCpf, seatsArray, setSeatsArray }) {
    const { idSessao } = useParams();
    localStorage.setItem('idSessao', idSessao);
    const idFilme = localStorage.getItem('idFilme');
    const subtitleArray = [
        { class: 'selected', text: 'Selecionado' },
        { class: 'available', text: 'Disponível' },
        { class: 'not-available', text: 'Indisponível' }
    ]

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v4/cineflex/showtimes/${idSessao}/seats`);
        promise.then(answer => {
            setSeats(answer.data);
            setSeatsArray([...answer.data.seats.map(object => object = { ...object, selected: false })]);
        });
    }, [idSessao, setSeats, setSeatsArray])

    function clickSeat(seat) {
        if (seat.isAvailable) {
            setSeatsArray(() => {
                for (let i = 0; i < seatsArray.length; i++) {
                    if (seatsArray[i].id === seat.id) {
                        seatsArray[i].selected = !seatsArray[i].selected;
                    }
                }
                return [...seatsArray];
            });
        } else {
            alert("Esse assento não está disponível");
            return;
        }
    }

    function bookSeats() {
        const ids = [];
        for (let i = 0; i < seatsArray.length; i++) {
            if (seatsArray[i].selected) {
                ids.push(seatsArray[i].id);
            }
        }

        const book = axios.post("https://mock-api.driven.com.br/api/v4/cineflex/seats/book-many", { ids, name, cpf });
        book.then(answer => console.log(answer));
        book.catch(answer => console.log(answer));
    }

    if (!seats || seatsArray.length === 0) {
        return (
            <img className='loading-gif' src={loading} alt="" />
        )
    }

    return (
        <>
            <Header previousPage={`/sessoes/${idFilme}`} />

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
                <input type="text" placeholder='Digite seu nome...' onChange={e => setName(e.target.value)} value={name} />
                CPF do comprador:
                <input type="text" placeholder='Digite seu CPF...' onChange={e => setCpf(e.target.value)} value={cpf} />
            </div>

            <NavigationButton link={'/sucesso'} text={'Reservar assento(s)'} margin={''} click={bookSeats} />

            <Footer title={seats.movie.title} image={seats.movie.posterURL} time={seats.name} day={seats.day.weekday} />
        </>
    )
}