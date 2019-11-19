import React from 'react';
import ReactDOM from 'react-dom';
import {
    AttributeGroup,
    AttributeGroupLabel,
    AttributeLabel,
    AttributeList,
    CharacterSheetContainer,
    Column,
    CopyButton,
    NameWrapper,
    Row
    } from './styles.js';
import './index.css';
import dedent from 'dedent';
import copy from 'clipboard-copy';
import {
    generateCharacter,
    reshuffle
} from './character';

function Attribute(props) {
    return (
        <AttributeLabel onClick={props.onClick}>{props.value}</AttributeLabel>
    );
}

const CharacterCard = ({ deleteCharacter, reshuffle, character }) => {   
    console.log(deleteCharacter)
    return (
        <CharacterSheetContainer>
                
                <CopyButton 
                    onClick={() => copy(dedent(
                        `${character.givenName.value} ${character.familyName.value}
                        ${character.gender.value} ${character.age.value} ${character.race.value} from ${character.ancestry.value}, ${character.sexuality.value}
                        Mood: ${character.usualMood.value}
                        Life goal: ${character.motivation.value}
                        Personality traits: ${character.outlook.value}, ${character.integrity.value}, ${character.impulsiveness.value}, ${character.boldness.value}, ${character.friendliness.value}, ${character.conformity.value}`
                        ))}
                />
                <NameWrapper>
                    <Attribute name='givenName' onClick={() => reshuffle('givenName')} value={character.givenName.value} />
                    {' '}
                    <Attribute name='familyName' onClick={() => reshuffle('familyName')} value={character.familyName.value} />
                </NameWrapper>
                <AttributeGroup>
                    <Attribute name='gender' onClick={() => reshuffle('gender')} value={character.gender.value} />
                    {' '}
                    <Attribute name='age' onClick={() => reshuffle('age')} value={character.age.value} />
                    {' '}
                    <Attribute name='race' onClick={() => reshuffle('race')} value={character.race.value} />
                    {' '}
                    from <Attribute name='ancestry' onClick={() => reshuffle('ancestry')} value={character.ancestry.value} />,
                    {' '}
                    <Attribute name='sexuality' onClick={() => reshuffle('sexuality')} value={character.sexuality.value} />
                </AttributeGroup>
                <Row>
                <button onClick={() => deleteCharacter()}>DELETE</button>
                    <Column>
                        <AttributeGroup>
                            <AttributeGroupLabel>Personality traits</AttributeGroupLabel>
                            <AttributeList>
                                <li><Attribute name='friendliness' onClick={() => reshuffle('friendliness')} value={character.friendliness.value} /></li>
                                <li><Attribute name='integrity' onClick={() => reshuffle('integrity')} value={character.integrity.value} /></li>
                                <li><Attribute name='outlook' onClick={() => reshuffle('outlook')} value={character.outlook.value} /></li>
                                <li><Attribute name='impulsiveness' onClick={() => reshuffle('impulsiveness')} value={character.impulsiveness.value} /></li>
                                <li><Attribute name='boldness' onClick={() => reshuffle('boldness')} value={character.boldness.value} /></li>
                                <li><Attribute name='conformity' onClick={() => reshuffle('conformity')} value={character.conformity.value} /></li>
                            </AttributeList>
                        </AttributeGroup>
                    </Column>
                    <Column>
                        <AttributeGroup>
                            <AttributeGroupLabel>Mood</AttributeGroupLabel>
                            <Attribute name='usualMood' onClick={() => reshuffle('usualMood')} value={character.usualMood.value} />
                        </AttributeGroup>
                        <AttributeGroup>
                            <AttributeGroupLabel>Life goal</AttributeGroupLabel>
                            <Attribute name='motivation' onClick={() => reshuffle('motivation')} value={character.motivation.value} />
                        </AttributeGroup>
                    </Column>
                </Row>
            </CharacterSheetContainer>
    )
}


class CharacterSheet extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            characters: {}
        }
    }

    addCharacter() {
        this.setState({
            characters: {
                ...this.state.characters,
                [Date.now()]: generateCharacter()
            }
        });
    }

    deleteCharacter(uid) {
        const {
            [uid]: removedCharacter,
            ...newCharacters
        } = this.state.characters;

        this.setState({
            characters: newCharacters
        });
    }

    reshuffleAttribute(uid, attribute) {
        this.setState({
            characters: {
                ...this.state.characters,
                [uid]: reshuffle(this.state.characters[uid], attribute)
            }
        });
    }  

    render() {

        return (
            <div>
                <button onClick={() => this.addCharacter()}>+</button>
                {Object.entries(this.state.characters)
                    .map(([uid, character]) => <CharacterCard
                        key={uid}
                        character={character}
                        reshuffle={(attribute) => this.reshuffleAttribute(uid, attribute)}
                        deleteCharacter={() => this.deleteCharacter(uid)}
                    />)
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
