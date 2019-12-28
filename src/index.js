import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import UserPlusSolid from './icons/UserPlusSolid';
import {
    BoardContainer,
    Label,
    Option,
    TopToolbar,
    TopToolbarButton,
    TopToolbarColumn,
    Select,
    SelectContainer
} from './styles.js';
import { CharacterCard } from './character-card';

import {
    generateCharacter,
    reshuffle,
    setCustomAttribute
} from './character';

class Board extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            characters: {},
            worldName: 'Asa',
            characterBeingEdited: false,
            attributeGroupBeingEdited: false
        }

        this.handleWorldChange = this.handleWorldChange.bind(this);
    }

    addCharacter() {
        let newCharacter = generateCharacter(this.state.worldName);
        this.setState({
            characters: {
                [Date.now()]: newCharacter,
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
                [uid]: reshuffle(this.state.worldName, this.state.characters[uid], attribute)
            }
        });
    }

    setCustomAttribute(uid, customAttributeKey, customAttributeValue) {
        this.setState({
            characters: {
                ...this.state.characters,
                [uid]: setCustomAttribute(this.state.characters[uid], customAttributeKey, customAttributeValue)
            }
        })
        console.log(arguments)
    }

    handleWorldChange(event) {
        switch (event.target.value) {
            case 'Cyberpunk / Near Future':
                this.setState({ worldName: 'Cyberpunk' });
                break;
            default:
                this.setState({ worldName: 'Asa' });
                break;
        }
    }

    getWorldDescriptiveName() {
        switch (this.state.worldName) {
            case 'Cyberpunk':

                return 'Cyberpunk / Near Future';
            default:
                
                return 'Asa (Homebrew Fantasy)';
        }
    }

    render() {

        return (
            <BoardContainer>
                <TopToolbar>
                    <TopToolbarColumn>
                        <SelectContainer>
                            <Label>World</Label>
                            <Select value={this.getWorldDescriptiveName()} onChange={this.handleWorldChange}>
                                <Option>Asa (Homebrew Fantasy)</Option>
                                <Option>Cyberpunk / Near Future</Option>
                            </Select>
                        </SelectContainer>
                    </TopToolbarColumn>
                    <TopToolbarColumn>
                        <TopToolbarButton onClick={() => this.addCharacter()}>
                            <UserPlusSolid /> Meet someone new
                        </TopToolbarButton>
                    </TopToolbarColumn>
                </TopToolbar>
                {Object.entries(this.state.characters)
                    .map(([uid, character]) => <CharacterCard
                        key={uid}
                        character={character}
                        reshuffle={attribute => this.reshuffleAttribute(uid, attribute)}
                        setCustomAttribute={(customAttributeKey, customAttributeValue) => this.setCustomAttribute(uid, customAttributeKey, customAttributeValue)}
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
