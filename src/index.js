import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Asa from './asa';
import './index.min.css';


/*class Attribute extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            value: this.generateValue()
        };
    }

    generateValue(oldValue) {
        //console.log("oldValue: " + oldValue);
        //console.log("values: " + this.props.values);

        // taking the last value out of the pool so we get a new one every time
        let pool = this.props.values.filter(option => option !== oldValue);

        //console.log("pool: " + pool);

        let sumWeights = 0;
        for (let index in pool) {
            //console.log("option.weight: " + pool[index].weight);
            sumWeights += pool[index].weight;
        }
        //console.log("sumWeights: " + sumWeights);
        let winner = Math.floor(Math.random() * sumWeights);
        //console.log("winner: " + winner);
        for (let index in pool) {
            winner -= pool[index].weight;
            //console.log("weight: " + pool[index].weight + ", winner is reduced to: " + winner)
            if (winner < 0) {
                return pool[index];
            }
        }
    }

    handleClick() {
        this.setState({
            value: this.generateValue(this.state.value),
        });
    }

    render() {
        return (
            <div className="attribute">
                <a href="#" onClick={() => this.handleClick()} className="attribute__name">
                    {this.props.name}
                </a>
                <div className="attribute__value">
                    {this.state.value.name}
                </div>
            </div>
        );
    }
}*/

function Attribute(props) {
    return (
        <div className="attribute">
            <a href="#" onClick={props.onClick} className="attribute__name">
                {props.name}
            </a>
            <div className="attribute__value">
                {props.value}
            </div>
        </div>
    )
}

class CharacterSheet extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            gender: {
                name: 'gender',
                value: this.chooseValue(Asa.gender)
            },
            sexuality: {
                name: 'sexuality',
                value: this.chooseValue(Asa.sexuality)
            },
            ancestry: {
                name: 'ancestry',
                value: this.chooseValue(Asa.ancestry)
            },
            age: {
                name: 'age',
                value: this.chooseValue(Asa.age)
            }
        }

        this.state.givenName = {
            name: 'givenName',
            value: this.generateGivenName(Asa.givenName, this.state.ancestry.value, this.state.gender.value)
        }

        this.state.familyName = {
            name: 'familyName',
            value: this.generateFamilyName(Asa.familyName, this.state.ancestry.value, this.state.gender.value)
        }
    }

    handleClick(attribute) {
        let previous = this.state[attribute].value;
        //console.log(`previous state is: ${previous}`)
        this.setState({
            [attribute]: {
                name: attribute,
                value: this.chooseValue(Asa[attribute], previous)
            }
        });
    }

    chooseValue(pool, oldValue) {
        // taking the last value out of the pool so we get a new one every time
        pool = pool.filter(option => option.name !== oldValue);
        let sumWeights = 0;
        for (let index in pool) {
            //console.log("option.weight: " + pool[index].weight);
            sumWeights += pool[index].weight ? pool[index].weight : 1;
        }
        //console.log("sumWeights: " + sumWeights);
        let winner = Math.floor(Math.random() * sumWeights);
        //console.log("winner: " + winner);
        for (let index in pool) {
            winner -= pool[index].weight ? pool[index].weight : 1;
            //console.log("weight: " + pool[index].weight + ", winner is reduced to: " + winner)
            if (winner < 0) {
                return pool[index].name;
            }
        }
    }

    generateGivenName(options, ancestry, gender, oldValue) {
        if (gender === 'Cis Male' || gender === 'Trans Male') { gender = 'Male'; }
        if (gender === 'Cis Female' || gender === 'Trans Female') { gender = 'Female'; }
        if (gender === 'Genderfluid') { gender = (Math.random() >= 0.5) ? 'Male' : 'Female'; }
        console.log(`name gender: ${gender}`);

        return this.chooseValue(options[ancestry][gender], oldValue);
    }

    generateFamilyName(options, ancestry, oldValue) {

        return this.chooseValue(options[ancestry], oldValue);
    }

    render() {
        return (
            <div className="sheet">
                {
                    Object.values(this.state).map(attribute => 
                            <Attribute name={attribute.name} onClick={() => this.handleClick(attribute.name)} value={attribute.value} />
                        )
                }
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <CharacterSheet />,
    document.getElementById('root')
);
