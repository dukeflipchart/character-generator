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
                        `${character.givenName.text} ${character.familyName.text}
                        ${character.gender.text} ${character.age.text} ${character.sexuality.text} ${character.race.text} from ${character.ancestry.text} 
                        Mood: ${character.mood.text}
                        Life goal: ${character.motivation.text}`
                        ))}>
                    <ClipboardSolid />
                </ToolbarButton>
                <ToolbarButton onClick={() => deleteCharacter()}>
                    <TrashSolid />
                </ToolbarButton>
            </CharacterCardToolbar>
            <NameWrapper>
                <Attribute name='givenName' onClick={() => reshuffle('givenName')} value={character.givenName.text} />
                {' '}
                <Attribute name='familyName' onClick={() => reshuffle('familyName')} value={character.familyName.text} />
            </NameWrapper>
            <AttributeGroup>
                is {['adult', 'old'].includes(character.age.text) ? 'an ' : 'a '} 
                <Attribute name='age' onClick={() => reshuffle('age')} value={character.age.text} />
                {' '}
                <Attribute name='gender' onClick={() => reshuffle('gender')} value={character.gender.text} />
                {' '}
                <Attribute name='race' onClick={() => reshuffle('race')} value={character.race.text} />
                {' '}
                from <Attribute name='ancestry' onClick={() => reshuffle('ancestry')} value={character.ancestry.text} />
            </AttributeGroup>
            <Row>
                <Column>
                    <AttributeGroup>
                        <AttributeGroupLabel>Job</AttributeGroupLabel>
                        <Attribute name='competency' onClick={() => reshuffle('competency')} value={capitalizeFirstLetter(character.competency.text)} />
                        {' '}
                        <Attribute name='job' onClick={() => reshuffle('job')} value={character.job.text} />
                    </AttributeGroup>
                    <AttributeGroup>
                        <AttributeGroupLabel>Appearance</AttributeGroupLabel>
                        <Attribute name='appearance1' onClick={() => reshuffle('appearance1')} value={capitalizeFirstLetter(character.appearance1.text)} />,
                        {' '}
                        <Attribute name='appearance2' onClick={() => reshuffle('appearance2')} value={character.appearance2.text} />
                    </AttributeGroup>
                </Column>
                <Column>
                    <AttributeGroup>
                        <AttributeGroupLabel>Mood</AttributeGroupLabel>
                        <Attribute name='mood' onClick={() => reshuffle('mood')} value={character.mood.text} />
                    </AttributeGroup>
                    <AttributeGroup>
                        <AttributeGroupLabel>Personality</AttributeGroupLabel>
                        <Attribute name='personality1' onClick={() => reshuffle('personality1')} value={capitalizeFirstLetter(character.personality1.text)} /> and
                        {' '}
                        <Attribute name='personality2' onClick={() => reshuffle('personality2')} value={character.personality2.text} />
                    </AttributeGroup>
                </Column>
                <Column>
                    <AttributeGroup>
                        <AttributeGroupLabel>Life goal</AttributeGroupLabel>
                        <Attribute name='motivation' onClick={() => reshuffle('motivation')} value={character.motivation.text} />
                    </AttributeGroup>
                    <AttributeGroup>
                        <AttributeGroupLabel>Relationships</AttributeGroupLabel>
                        <AttributeList>
                            <Attribute name='sexuality' onClick={() => reshuffle('sexuality')} value={capitalizeFirstLetter(character.sexuality.text)} />,
                            {' '}
                            <Attribute name='relationship' onClick={() => reshuffle('relationship')} value={character.relationship.text} />
                        </AttributeList>
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
