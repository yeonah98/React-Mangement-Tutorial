import React, {useState, useEffect} from 'react';

function CustomerDelete(props){
    
    const deleteCustomer = (id) => {
        const url = '/api/customers/' + id;
        fetch(url, {
            method: 'DELETE'
        });
        props.stateRefresh();
    }

    return(
        <button onClick={(e) => {deleteCustomer(props.id)}}>삭제</button>
    );
}

export default CustomerDelete;