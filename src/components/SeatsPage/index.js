import './style.css';
import loading from '../../assets/loading.gif'
import { useEffect, useState } from 'react';
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
    const [inputsDiv, setInputsDiv] = useState('');

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
            console.log(seatsArray);

            setInputsDiv('show');

        } else {
            alert("Esse assento não está disponível");
            return;
        }
    }

    function bookSeats() {
        if (name !== '' && cpf !== '') {
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

            {inputsDiv !== '' && <div className='inputs-div'>
                {seatsArray.map(obj => obj.selected &&
                    <div key={obj.id}>
                        Nome do cliente do assento {obj.name}:
                        <input type="text" placeholder='Digite o nome...' onChange={e => setName(e.target.value)} />
                        CPF do cliente do assento {obj.name}:
                        <input type="text" placeholder='Digite o CPF...' onChange={e => setCpf(e.target.value)} />
                    </div>
                )}
            </div>}

            <NavigationButton link={(name !== '' & cpf !== '') ? '/sucesso' : ''} text={'Reservar assento(s)'} margin={''} click={bookSeats} />

            <Footer title={seats.movie.title} image={seats.movie.posterURL} time={seats.name} day={seats.day.weekday} />
        </>
    )
}