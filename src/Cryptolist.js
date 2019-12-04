import React from 'react';

const CryptoList = (props) => {
    const currencyList = props.cryptoArray.map((currency, index) => {

        let arrow = '';

        if(currency.class === 'green') {
            arrow = String.fromCharCode(8593);
        } else if(currency.class === 'red') {
            arrow = String.fromCharCode(8595);
        } else {
            arrow = String.fromCharCode(8596);
        }


        return (<li className="lists" key={index}>Country: {currency.currency} <span className="symbol-icon">{currency.symbol} {arrow}</span> || Last Rate: <span className={currency.class}>{currency.last}</span></li>)

    });
    
    return(
        <ul className="ul-list">{currencyList}</ul>
    )
}

export default CryptoList;