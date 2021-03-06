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
    reshuffleAttribute,
    setCustomAttribute
} from './character';

import { attributeConfigs } from './attribute-configs';

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

    deleteCharacterHandler(uid) {
        return () => {
            const {
                [uid]: removedCharacter,
                ...newCharacters
            } = this.state.characters;
    
            this.setState({
                characters: newCharacters
            });
        }
    }

    reshuffleAttributeHandler(uid) {
        return attribute => {
            this.setState({
                characters: {
                    ...this.state.characters,
                    [uid]: reshuffleAttribute(this.state.worldName, this.state.characters[uid], attribute)
                }
            });
        }
    }

    setCustomAttributeHandler(uid) {
        return (customAttributeKey, customAttributeValue) => {
            this.setState({
                characters: {
                    ...this.state.characters,
                    [uid]: setCustomAttribute(this.state.characters[uid], customAttributeKey, customAttributeValue)
                }
            })
        }
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
                        attributeConfigs={attributeConfigs}
                        reshuffleAttribute={this.reshuffleAttributeHandler(uid)}
                        setCustomAttribute={this.setCustomAttributeHandler(uid)}
                        deleteCharacter={this.deleteCharacterHandler(uid)}
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
