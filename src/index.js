import React from 'react';
import ReactDOM from 'react-dom';
import dedent from 'dedent';
import copy from 'clipboard-copy';
import './index.css';
import ClipboardSolid from './icons/ClipboardSolid.js';
import UserPlusSolid from './icons/UserPlusSolid.js';
import TrashSolid from './icons/TrashSolid.js';
import {
    AttributeGroup,
    AttributeGroupLabel,
    AttributeLabel,
    AttributeList,
    BoardContainer,
    ToolbarButton,
    CharacterCardContainer,
    CharacterCardToolbar,
    Column,
    NameWrapper,
    Row,
    AddCharacterButton
    } from './styles.js';
import {
    generateCharacter,
    reshuffle
} from './character';

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function Attribute(props) {
    return (
        <AttributeLabel onClick={props.onClick}>{props.value}</AttributeLabel>
    );
}

const CharacterCard = ({ deleteCharacter, reshuffle, character }) => {
    return (
        <CharacterCardContainer>
            <CharacterCardToolbar>
                <ToolbarButton onClick={() => copy(dedent(
                        `${character.givenName.value.text} ${character.familyName.value.text}
                        ${character.gender.value.text} ${character.age.value.text} ${character.sexuality.value.text} ${character.race.value.text} from ${character.ancestry.value.text} 
                        Mood: ${character.usualMood.value.text}
                        Life goal: ${character.motivation.value.text}`
                        ))}>
                    <ClipboardSolid />
                </ToolbarButton>
                <ToolbarButton onClick={() => deleteCharacter()}>
                    <TrashSolid />
                </ToolbarButton>
            </CharacterCardToolbar>
            <NameWrapper>
                <Attribute name='givenName' onClick={() => reshuffle('givenName')} value={character.givenName.value.text} />
                {' '}
                <Attribute name='familyName' onClick={() => reshuffle('familyName')} value={character.familyName.value.text} />
            </NameWrapper>
            <AttributeGroup>
                is {['adult', 'old'].includes(character.age.value.text) ? 'an ' : 'a '} 
                <Attribute name='age' onClick={() => reshuffle('age')} value={character.age.value.text} />
                {' '}
                <Attribute name='gender' onClick={() => reshuffle('gender')} value={character.gender.value.text} />
                {' '}
                {' '}
                <Attribute name='race' onClick={() => reshuffle('race')} value={character.race.value.text} />
                {' '}
                from <Attribute name='ancestry' onClick={() => reshuffle('ancestry')} value={character.ancestry.value.text} />
            </AttributeGroup>
            <Row>
                <Column>
                    <AttributeGroup>
                        <AttributeGroupLabel>Mood</AttributeGroupLabel>
                        <Attribute capitalized name='usualMood' onClick={() => reshuffle('usualMood')} value={character.usualMood.value.text} />
                    </AttributeGroup>
                </Column>
                <Column>
                    <AttributeGroup>
                        <AttributeGroupLabel>Relationships</AttributeGroupLabel>
                        <AttributeList>
                            <li><Attribute name='sexuality' onClick={() => reshuffle('sexuality')} value={capitalizeFirstLetter(character.sexuality.value.text)} /></li>
                            <li><Attribute name='relationship' onClick={() => reshuffle('relationship')} value={capitalizeFirstLetter(character.relationship.value.text)} /></li>
                        </AttributeList>
                    </AttributeGroup>
                    <AttributeGroup>
                        <AttributeGroupLabel>Life goal</AttributeGroupLabel>
                        <Attribute capitalized name='motivation' onClick={() => reshuffle('motivation')} value={character.motivation.value.text} />
                    </AttributeGroup>
                </Column>
            </Row>
        </CharacterCardContainer>
    )
}


class Board extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            characters: {}
        }
    }

    addCharacter() {
        this.setState({
            characters: {
                [Date.now()]: generateCharacter(),
                ...this.state.characters
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
            <BoardContainer>
                <AddCharacterButton onClick={() => this.addCharacter()}>
                    <UserPlusSolid /> Meet someone new
                </AddCharacterButton>
                {Object.entries(this.state.characters)
                    .map(([uid, character]) => <CharacterCard
                        key={uid}
                        character={character}
                        reshuffle={(attribute) => this.reshuffleAttribute(uid, attribute)}
                        deleteCharacter={() => this.deleteCharacter(uid)}
                    />)
                }
            </BoardContainer> 
        );
    }
}

// ========================================

ReactDOM.render(
    <Board />,
    document.getElementById('root')
);
