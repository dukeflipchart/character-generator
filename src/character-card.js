import React from 'react';

import dedent from 'dedent';
import copy from 'clipboard-copy';

import ClipboardSolid from './icons/ClipboardSolid';
import PenSolid from './icons/PenSolid';
import TrashSolid from './icons/TrashSolid';

import {
    AttributeGroup,
    AttributeGroupLabel,
    AttributeList,
    AttributeLabel,
    CharacterCardColumn,
    CharacterCardContainer,
    CharacterCardRow,
    CharacterCardToolbar,
    NameWrapper,
    ToolbarButton
} from './styles.js';

const uppercaseFirstLetter = (string) => {
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
    ${uppercaseFirstLetter(determinerBefore(character.age.text))} ${character.age.text} ${character.race.text} of ${character.ancestry.text} descent
    Job: ${character.competency.text} ${character.job.text}
    Appearance: ${character.appearance1.text}, ${character.appearance2.text}
    Mood: ${character.mood.text}
    Personality: ${character.personality1.text}, ${character.personality2.text}
    Life goal: ${character.motivation.text}
    Relationships: ${character.sexuality.text}, ${character.relationship.text}`
)

const Attribute = (props) => {
    return (
        <AttributeLabel onClick={props.onClick}>{props.value}</AttributeLabel>
    );
}

export const CharacterCard = ({
    deleteCharacter,
    reshuffle,
    character,
    isAttributeGroupBeingEdited,
    setAttributeGroupBeingEdited
}) => {
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
                <Attribute name='givenName' onClick={() => reshuffle('givenName')} value={character.givenName.text} />
                {' '}
                <Attribute name='familyName' onClick={() => reshuffle('familyName')} value={character.familyName.text} />
            </NameWrapper>
            <AttributeGroup>
                {uppercaseFirstLetter(determinerBefore(character.age.text))}
                {' '}
                <Attribute name='age' onClick={() => reshuffle('age')} value={character.age.text} />
                {' '}
                <Attribute name='race' onClick={() => reshuffle('race')} value={character.race.text} />
                {' '}
                <Attribute name='gender' onClick={() => reshuffle('gender')} value={displayGender(character.age.text, character.gender.text)} />
                {' '}
                of <Attribute name='ancestry' onClick={() => reshuffle('ancestry')} value={character.ancestry.text} /> descent
            </AttributeGroup>
            <CharacterCardRow>
                <CharacterCardColumn>
                    <AttributeGroup isBeingEdited={isAttributeGroupBeingEdited('job')}>
                        <AttributeGroupLabel onClick={() => setAttributeGroupBeingEdited('job')}>Job <PenSolid /></AttributeGroupLabel>
                        <Attribute name='competency' onClick={() => reshuffle('competency')} value={uppercaseFirstLetter(character.competency.text)} />
                        {' '}
                        <Attribute name='job' onClick={() => reshuffle('job')} value={character.job.text} />
                    </AttributeGroup>
                    <AttributeGroup isBeingEdited={isAttributeGroupBeingEdited('appearance')}>
                        <AttributeGroupLabel onClick={() => setAttributeGroupBeingEdited('appearance')}>Appearance <PenSolid /></AttributeGroupLabel>
                        <Attribute name='appearance1' onClick={() => reshuffle('appearance1')} value={uppercaseFirstLetter(character.appearance1.text)} />,
                        {' '}
                        <Attribute name='appearance2' onClick={() => reshuffle('appearance2')} value={character.appearance2.text} />
                    </AttributeGroup>
                </CharacterCardColumn>
                <CharacterCardColumn>
                    <AttributeGroup isBeingEdited={isAttributeGroupBeingEdited('mood')}>
                        <AttributeGroupLabel onClick={() => setAttributeGroupBeingEdited('mood')}>Mood <PenSolid /></AttributeGroupLabel>
                        <Attribute name='mood' onClick={() => reshuffle('mood')} value={character.mood.text} />
                    </AttributeGroup>
                    <AttributeGroup isBeingEdited={isAttributeGroupBeingEdited('personality')}>
                        <AttributeGroupLabel onClick={() => setAttributeGroupBeingEdited('personality')}>Personality <PenSolid /></AttributeGroupLabel>
                        <Attribute name='personality1' onClick={() => reshuffle('personality1')} value={uppercaseFirstLetter(character.personality1.text)} /> and
                        {' '}
                        <Attribute name='personality2' onClick={() => reshuffle('personality2')} value={character.personality2.text} />
                    </AttributeGroup>
                </CharacterCardColumn>
                <CharacterCardColumn>
                    <AttributeGroup isBeingEdited={isAttributeGroupBeingEdited('motivation')}>
                        <AttributeGroupLabel onClick={() => setAttributeGroupBeingEdited('motivation')}>Life goal <PenSolid /></AttributeGroupLabel>
                        <Attribute name='motivation' onClick={() => reshuffle('motivation')} value={character.motivation.text} />
                    </AttributeGroup>
                    <AttributeGroup isBeingEdited={isAttributeGroupBeingEdited('relationships')}>
                        <AttributeGroupLabel onClick={() => setAttributeGroupBeingEdited('relationships')}>Relationships <PenSolid /></AttributeGroupLabel>
                        <AttributeList>
                            <Attribute name='sexuality' onClick={() => reshuffle('sexuality')} value={uppercaseFirstLetter(character.sexuality.text)} />,
                            {' '}
                            <Attribute name='relationship' onClick={() => reshuffle('relationship')} value={character.relationship.text} />
                        </AttributeList>
                    </AttributeGroup>
                </CharacterCardColumn>
            </CharacterCardRow>
        </CharacterCardContainer>
    )
}
