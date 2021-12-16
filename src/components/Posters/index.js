import axios from 'axios';
import { useEffect, useState } from 'react';
import './style.css'

export default function Posters() {

    const [posters, setPosters] = useState([]);

    useEffect(() => {
        const promise = axios.get("https://mock-api.driven.com.br/api/v4/cineflex/movies");
        promise.then(resposta => setPosters(resposta.data));
    }, []);

    return (
        <>
            <p className='select-movie-title'>Selecione o filme</p>
            <div className='posters'>
                {posters.map(item =>
                    <div className='poster' key={item.id}>
                        <img className='main-image' src={item.posterURL} alt="" />
                    </div>
                )}
            </div>
        </>
    );
}