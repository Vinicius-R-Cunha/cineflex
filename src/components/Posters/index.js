import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

export default function Posters() {

    const [posters, setPosters] = useState([]);

    useEffect(() => {
        const promise = axios.get("https://mock-api.driven.com.br/api/v4/cineflex/movies");
        promise.then(answer => setPosters(answer.data));
    }, []);

    return (
        <>
            <p className='select-movie-title'>Selecione o filme</p>
            <div className='posters'>
                {posters.map(item =>
                    <Link to={`/sessoes/${item.id}`} key={item.id}>
                        <div className='poster' >
                            <img className='main-image' src={item.posterURL} alt="" />
                        </div>
                    </Link>
                )}
            </div>
        </>
    );
}