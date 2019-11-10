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
            attributes: {
                gender: {
                    name: 'gender',
                    value: this.generateSimpleAttributeValue(Asa.gender)
                },
                sexuality: {
                    name: 'sexuality',
                    value: this.generateSimpleAttributeValue(Asa.sexuality)
                },
                ancestry: {
                    name: 'ancestry',
                    value: this.generateSimpleAttributeValue(Asa.ancestry)
                },
                age: {
                    name: 'age',
                    value: this.generateSimpleAttributeValue(Asa.age)
                }
            }
        }
    }

    handleClick() {

    }

    generateSimpleAttributeValue(options, oldValue) {
        //console.log("oldValue: " + oldValue);
        //console.log("values: " + this.props.values);

        // taking the last value out of the pool so we get a new one every time
        let pool = options.filter(option => option !== oldValue);

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
                return pool[index].name;
            }
        }
    }

    renderAttributes() {
        let attributes = [];

        for (let attribute in this.state.attributes) {
            attributes.push(<Attribute name={attribute.name} onClick={this.handleClick(attribute.name)} value={attribute.value} />);
            console.log('attribute: ' + attribute);
        }

        return attributes;
    }

    render() {

        return (
            <div className="sheet">
                {this.renderAttributes()}
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <CharacterSheet />,
    document.getElementById('root')
);
