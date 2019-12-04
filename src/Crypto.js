import React, {Component} from 'react';
import CryptoList from './Cryptolist';

import axios from 'axios';

class Crypto extends Component {

    constructor() {
        super();

        this.state = {
            currencyList: [],
            filteredCountries: []
        }
    };

    getCurrencyData = () => {
        console.log('pobieram');
        axios.get(`https://blockchain.info/pl/ticker`)
            .then(res => {
                const currencyList = res.data;

                let currentArray = [];
                let i = 0;

                    for( let key in currencyList) {

                        let newCurrency = currencyList[key];
                        let prevCurrency = this.state.currencyList[i];

                        if(prevCurrency !== undefined) {
                            if(prevCurrency.last>newCurrency.last) {
                                newCurrency.class = 'red';

                            } else if(prevCurrency.last<newCurrency.last) {
                                newCurrency.class = 'green';
                            } else {
                                newCurrency.class = 'blue';
                            }

                    } else {
                            newCurrency.class = 'blue';
                        }
                        
                        newCurrency.currency = key;
                        currentArray.push(currencyList[key]);
                        i++;
                    }
                    this.setState({currencyList: currentArray, filteredCountries: currentArray});
                    
                })
    }

    componentDidMount() {
        this.getCurrencyData();

        this.timer = setInterval(this.getCurrencyData, 1000);
        
    };

    inputChange = () => {
        
        let trimValue = this.inputFilter.value.trim().toUpperCase();
        console.log(trimValue)
        let currentCountry = this.state.currencyList;

        let filteredList = currentCountry.filter(currentPost => {
            return currentPost.currency.includes(trimValue)
        });

        this.setState({filteredCountries: filteredList})
        
        
    }

    render() {
        return(
        <div>
            <div className="input">
                <input className="input-element" type="text" placeholder="Wpisz kraj" onChange={this.inputChange} ref={input=>this.inputFilter = input}/>
            </div>
            <CryptoList cryptoArray={this.state.filteredCountries}/>
        </div>
        )}

    }

export default Crypto;