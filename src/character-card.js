import React, { Fragment } from 'react';
import styled from 'styled-components';

import dedent from 'dedent';
import copy from 'clipboard-copy';

import { colors } from './styles';

import ClipboardSolid from './icons/ClipboardSolid';
import PenSolid from './icons/PenSolid';
import TrashSolid from './icons/TrashSolid';

import {
    AttributeGroupLabel,
    AttributeLabel,
    CharacterCardColumn,
    CharacterCardContainer,
    CharacterCardRow,
    CharacterCardToolbar,
    NameWrapper,
    ToolbarButton
} from './styles.js';

const capitalize = (string) => {
    return string
        ? string.charAt(0).toUpperCase() + string.slice(1)
        : false;
}

const determinerBefore = (string) => {
    return ['a', 'e', 'i', 'o', 'u'].includes(string.charAt(0)) ? 'an' : 'a';
}

const displayGender = (age, gender) => {
    switch (gender) {
        case 'cis male': return ['young', 'teenage'].includes(age) ? 'boy' : 'man';
        case 'cis female': return ['young', 'teenage'].includes(age) ? 'girl' : 'woman';
        case 'trans male': return ['young', 'teenage'].includes(age) ? 'trans boy' : 'trans man';
        case 'trans female': return ['young', 'teenage'].includes(age) ? 'trans girl' : 'trans woman';
        case 'genderfluid': return ['young', 'teenage'].includes(age) ? 'genderfluid child' : 'genderfluid person';
        case 'agender': return ['young', 'teenage'].includes(age) ? 'agender child' : 'agender person';
        default: return 'person';
    }
}

export const createTextDescription = (character) => dedent(
    `${character.givenName.text} ${character.familyName.text}
    ${capitalize(determinerBefore(character.age.text))} ${character.age.text} ${character.race.text} of ${character.ancestry.text} descent
    Job: ${character.competency.text} ${character.job.text}
    Appearance: ${character.appearance1.text}, ${character.appearance2.text}
    Mood: ${character.mood.text}
    Personality: ${character.personality1.text}, ${character.personality2.text}
    Life goal: ${character.motivation.text}
    Relationships: ${character.sexuality.text}, ${character.relationship.text}`
)

const AttributeGroupWrapper = styled.div`
    ${props => props.isBeingEdited && `color: ${colors.clericRed};`}
    
    :not(:last-child) {
        margin-bottom: 1.65rem;
    }
`;

export const CharacterCard = ({
    deleteCharacter,
    reshuffle,
    character,
}) => {

    // declared in CharacterCard scope, so it has access to `character` and `reshuffle` props
    const AttributeGroup = ({
        label,
        attributes
    }) => {
        return (
            <AttributeGroupWrapper>
                {label && <AttributeGroupLabel>{label} <PenSolid/></AttributeGroupLabel>}
                {attributes.map((attribute, index) => {
                    // first element needs to be capitalized regardless of type, check here
                    const first = index === 0;
                    
                    // a string was passed
                    if (typeof attribute === 'string') {
                        return first
                            ? capitalize(attribute)
                            : attribute

                    // an attribute key and separator pair was passed, render as interactive AttributeLabel
                    } else if (Array.isArray(attribute) && attribute.length === 2) {

                        const [key, separator] = attribute;
                        
                        // gender is an edge case, handle here
                        const text = key === 'gender'
                            ? displayGender(character.age.text, character.gender.text)
                            : character[key].text

                        return (
                            <Fragment key={key}>
                                <AttributeLabel
                                    onClick={() => reshuffle(key)}
                                >
                                    {first
                                        ? capitalize(text)
                                        : text}
                                </AttributeLabel>
                                {separator}
                            </Fragment>
                        )

                    // something got borked
                    } else {
                        return (<Fragment>ERR </Fragment>)
                    }
                })}

            </AttributeGroupWrapper>
        );
    }

    return (
        <CharacterCardContainer>
            <CharacterCardToolbar>
                <ToolbarButton onClick={() => copy(createTextDescription(character))}>
                    <ClipboardSolid />
                </ToolbarButton>
                <ToolbarButton onClick={() => deleteCharacter()}>
                    <TrashSolid />
                </ToolbarButton>
            </CharacterCardToolbar>
            <NameWrapper>
                <AttributeGroup
                    attributes={[
                        ['givenName', ' '],
                        ['familyName', '']
                    ]}
                />
            </NameWrapper>
            <AttributeGroup
                attributes={[
                    `${determinerBefore(character.age.text)} `,
                    ['age', ' '],
                    ['race', ' '],
                    ['gender', ' of '],
                    ['ancestry', ' descent'],
                ]}
            />
            <CharacterCardRow>
                <CharacterCardColumn>
                    <AttributeGroup
                        label={'Job'}
                        attributes={[
                           ['competency', ' '],
                           ['job', '']
                        ]}
                    />
                    <AttributeGroup
                        label={'Appearance'}
                        attributes={[
                           ['appearance1', ', '],
                           ['appearance2', '']
                        ]}
                    />
                </CharacterCardColumn>
                <CharacterCardColumn>
                    <AttributeGroup
                        label={'Mood'}
                        attributes={[
                           ['mood', '']
                        ]}
                    />
                    <AttributeGroup
                        label={'Personality'}
                        attributes={[
                           ['personality1', ' and '],
                           ['personality2', '']
                        ]}
                    />
                </CharacterCardColumn>
                <CharacterCardColumn>
                    <AttributeGroup
                        label={'Life goal'}
                        attributes={[
                           ['motivation', '']
                        ]}
                    />
                    <AttributeGroup
                        label={'Relationships'}
                        attributes={[
                           ['sexuality', ', '],
                           ['relationship', '']
                        ]}
                    />  
                </CharacterCardColumn>
            </CharacterCardRow>
        </CharacterCardContainer>
    )
}
