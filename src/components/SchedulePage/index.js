import './style.css';
import Header from '../Header';
import Footer from '../Footer';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function SchedulePage() {
    const { idFilme } = useParams();
    const [session, setSession] = useState();

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v4/cineflex/movies/${idFilme}/showtimes`);
        promise.then(answer => setSession(answer.data));
    }, [idFilme])

    if (!session) {
        return (
            <p>Carregando...</p>
        )
    }

    return (
        <>
            <Header />

            <p className='select-session-title'>Selecione o horário</p>
            <div className="sessions">
                {session.days.map(item => {
                    return (
                        <div key={item.id}>
                            <p className='day'>{item.weekday} - {item.date}</p>
                            <div className='times'>
                                {item.showtimes.map(time => <div className='time' key={time.id}>{time.name}</div>)}
                            </div>
                        </div>
                    )
                })}
            </div>

            <Footer title={session.title} />
        </>
    )
}