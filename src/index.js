import React from 'react';
import ReactDOM from 'react-dom';
import './index.min.css';

class Attribute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.generateValue(),
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
        console.log("sumWeights: " + sumWeights);
        let winner = Math.floor(Math.random() * sumWeights);
        console.log("winner: " + winner);
        for (let index in pool) {
            winner -= pool[index].weight;
            console.log("weight: " + pool[index].weight + ", winner is reduced to: " + winner)
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
}

class CharacterSheet extends React.Component {
    renderAttribute(name, values) {
        return <Attribute name={name} values={values} />;
    }

    render() {

        return (
            <div className="sheet">
                {this.renderAttribute('Gender', [
                    {name: 'Cis Female', weight: 20},
                    {name: 'Cis Male', weight: 20},
                    {name: 'Trans Female', weight: 1},
                    {name: 'Trans Male', weight: 1},
                    {name: 'Agender', weight: 1}
                ])}
                {this.renderAttribute('Sexuality', [
                    {name: 'Heterosexual', weight: 10},
                    {name: 'Homosexual', weight: 1},
                    {name: 'Bisexual', weight: 1},
                    {name: 'Asexual', weight: 1}
                ])}
                {this.renderAttribute('Ancestry', [
                    {name: 'Mandarin', weight: 93},
                    {name: 'Spanish', weight: 39},
                    {name: 'English', weight: 36},
                    {name: 'Hindi', weight: 29},
                    {name: 'Arabic', weight: 28},
                    {name: 'Portuguese', weight: 20},
                    {name: 'Bengali', weight: 20},
                    {name: 'Russian', weight: 16},
                    {name: 'Japanese', weight: 12},
                    {name: 'Punjabi', weight: 9},
                    {name: 'German', weight: 9},
                    {name: 'Javanese', weight: 8},
                    {name: 'Wu', weight: 8},
                    {name: 'Malay', weight: 7},
                    {name: 'Telugu', weight: 7},
                    {name: 'Vietnamese', weight: 7},
                    {name: 'Korean', weight: 7},
                    {name: 'French', weight: 7},
                    {name: 'Marathi', weight: 7},
                    {name: 'Tamil', weight: 7},
                    {name: 'Urdu', weight: 6},
                    {name: 'Turkish', weight: 6},
                    {name: 'Italian', weight: 5},
                    {name: 'Yue', weight: 5},
                    {name: 'Thai', weight: 5}
                ])}
                {this.renderAttribute('Age', [
                    {name: '10', weight: 1},
                    {name: '20', weight: 20},
                    {name: '30', weight: 30},
                    {name: '40', weight: 20},
                    {name: '50', weight: 10},
                    {name: '60', weight: 10},
                    {name: '80', weight: 5},
                    {name: '90', weight: 1},
                    {name: '100', weight: 1},
                    {name: '110', weight: 1},
                    {name: '120', weight: 1}
                ])}
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <CharacterSheet />,
    document.getElementById('root')
);
