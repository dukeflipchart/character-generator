import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { 
    AttributeLabel,
    CharacterSheetContainer,
    NameWrapper
    } from './styles.js';
import Asa from './asa';
import './index.css';

function DefaultAttribute(props) {

    return (
        <div className="attribute">
            <a href="#" onClick={props.onClick} className="attribute__name">
                {props.name}
            </a>
            <div className="attribute__value">
                {props.value}
            </div>
        </div>
    );
}

function Attribute(props) {
    
    return (
        <AttributeLabel onClick={props.onClick}>{props.value}</AttributeLabel>
    );
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
            value: this.generateFamilyName(Asa.familyName, this.state.ancestry.value)
        }
    }

    handleClick(attribute) {
        this.reshuffle(attribute);
    }

    reshuffle(attribute) {
        let previous = this.state[attribute].value;
        switch(attribute) {
            case 'givenName':
                this.setState({
                    [attribute]: {
                        name: 'givenName',
                        value: this.generateGivenName(Asa.givenName, this.state.ancestry.value, this.state.gender.value, previous)
                    }
                });
                break;
            case 'familyName':
                this.setState({
                    [attribute]: {
                        name: 'familyName',
                        value: this.generateFamilyName(Asa.familyName, this.state.ancestry.value, previous)
                    }
                });
                break;
            case 'ancestry':
                this.setState({
                    [attribute]: {
                        name: 'ancestry',
                        value: this.chooseValue(Asa.ancestry, previous)
                    }
                }, () => {
                    this.reshuffle('givenName');
                    this.reshuffle('familyName');
                });
                break;
            case 'gender':
                this.setState({
                    [attribute]: {
                        name: 'gender',
                        value: this.chooseValue(Asa.gender, previous)
                    }
                }, () => {
                    this.reshuffle('givenName');
                    this.reshuffle('familyName');
                });
                break;
            default:
                this.setState({
                    [attribute]: {
                        name: attribute,
                        value: this.chooseValue(Asa[attribute], previous)
                    }
                });
        }
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
        if (gender === 'Cis Man' || gender === 'Trans Man') { gender = 'Man'; }
        if (gender === 'Cis Woman' || gender === 'Trans Woman') { gender = 'Woman'; }
        if (gender === 'Genderfluid') { gender = (Math.random() >= 0.5) ? 'Man' : 'Woman'; }
        console.log(`name gender: ${gender}`);

        return this.chooseValue(options[ancestry][gender], oldValue);
    }

    generateFamilyName(options, ancestry, oldValue) {

        return this.chooseValue(options[ancestry], oldValue);
    }

    render() {

        return (
            <CharacterSheetContainer>
                <NameWrapper>
                    <Attribute name='givenName' onClick={() => this.handleClick('givenName')} value={this.state.givenName.value} />
                    {' '}
                    <Attribute name='familyName' onClick={() => this.handleClick('familyName')} value={this.state.familyName.value} />
                </NameWrapper>
                <div>
                    <Attribute name='gender' onClick={() => this.handleClick('gender')} value={this.state.gender.value} />,
                    {' '}
                    <Attribute name='age' onClick={() => this.handleClick('age')} value={this.state.age.value} />,
                    {' '}
                    <Attribute name='sexuality' onClick={() => this.handleClick('sexuality')} value={this.state.sexuality.value} />
                </div>
                <div>
                    From <Attribute name='ancestry' onClick={() => this.handleClick('ancestry')} value={this.state.ancestry.value} />
                </div>
            </CharacterSheetContainer>
        );
    }
}

// ========================================

ReactDOM.render(
    <CharacterSheet />,
    document.getElementById('root')
);
