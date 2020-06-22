import React from 'react';

export default function ItemComponent(props){

    const status = props.status;

    return <li>{ props.name }
        <p>Status: { status ? <div>Finalizado</div> : <div>Não Finalizado</div> } </p>
    
    </li>
}