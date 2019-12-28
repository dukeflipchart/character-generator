import React, {
    Fragment,
    useState,
    useRef
} from 'react';
import styled from 'styled-components';

import dedent from 'dedent';
import copy from 'clipboard-copy';

import { colors } from './styles';

import ClipboardSolid from './icons/ClipboardSolid';
import PenSolid from './icons/PenSolid';
import TrashSolid from './icons/TrashSolid';

import {
    AttributeGroupLabel,
    CharacterCardColumn,
    CharacterCardContainer,
    CharacterCardRow,
    CharacterCardToolbar,
    NameWrapper,
    ToolbarButton
} from './styles.js';

const capitalize = string => string && string.charAt(0).toUpperCase() + string.slice(1);

const indefiniteArticleFor = string => {
    const VOWELS = ['a', 'e', 'i', 'o', 'u'];
    return VOWELS.includes(string.charAt(0)) ? 'an' : 'a';
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
    ${capitalize(indefiniteArticleFor(character.age.text))} ${character.age.text} ${character.race.text} of ${character.ancestry.text} descent
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

export const ClickableAttributeLabel = styled.span`
    :hover {
        color: #999;
        cursor: pointer;
        text-decoration: line-through;
    }
`;

export const EditableAttributeLabel = styled.span`

`;

const fetchAttributeValues = (character, attributes) => attributes.map(
    (attribute, index) => {
        // first element needs to be capitalized regardless of type, check here
        const first = index === 0;

        if (typeof attribute === 'string') {
            return first
                ? capitalize(attribute)
                : attribute

        } else if (Array.isArray(attribute) && attribute.length === 2) {

            const [attributeKey, separator] = attribute;

            // gender is an edge case, handle here
            const attributeValue = attributeKey === 'gender'
                ? displayGender(character.age.text, character.gender.text)
                : character[attributeKey].text

            const capitalizedAttributeValue = first
                ? capitalize(attributeValue)
                : attributeValue

            return [attributeKey, capitalizedAttributeValue, separator]

        // something got borked
        } else {
            return 'ERR'
        }
    })

const generatedAttributesAsString = ({
    character,
    attributes
}) => fetchAttributeValues(character, attributes)
    .reduce((string, attribute) => {
        console.log(attributes)
        if (typeof attribute === 'string') {
            return `${string}${attribute}`
        } else if (Array.isArray(attribute) && attribute.length === 3) {
            const [, value, separator] = attribute;
            return `${string}${value}${separator}`
        } else {
            return `${string}ERR `
        }
    }, '')

const GeneratedAttributes = ({
    character,
    reshuffle,
    attributes
}) => fetchAttributeValues(character, attributes)
    .map(attribute => {
        if (typeof attribute === 'string') {
            return attribute
        } else if (Array.isArray(attribute) && attribute.length === 3) {
            const [key, value, separator] = attribute;
            return (
                <Fragment key={key}>
                    <ClickableAttributeLabel onClick={() => reshuffle(key)}>
                        {value}
                    </ClickableAttributeLabel>
                    {separator}
                </Fragment>
            )
        } else {
            return <ClickableAttributeLabel>ERR</ClickableAttributeLabel>
        }
    })


export const CharacterCard = ({
    deleteCharacter,
    reshuffle,
    setCustomAttribute,
    character,
}) => {

    // declared in CharacterCard scope, so it has access to `character` and `reshuffle` props
    const AttributeGroup = ({
        label,
        attributes,
        customAttributeKey
    }) => {

        const editableElement = useRef(null);
        const switchToCustomAttribute = () => setCustomAttribute(customAttributeKey, generatedAttributesAsString({character, attributes}));
        const switchToGeneratedAttributes = () => setCustomAttribute(customAttributeKey, false);
        const changeHandler = () => setCustomAttribute(customAttributeKey, editableElement.current.innerHTML);

        const customAttribute = character.customAttributes[customAttributeKey];
        const hasCustomAttribute = customAttribute === ''
            ? true
            : Boolean(customAttribute);

        return (
            <AttributeGroupWrapper>
                {label &&
                    <AttributeGroupLabel>
                        {label} {hasCustomAttribute
                            ? <span onClick={switchToGeneratedAttributes}>R</span>
                            : <PenSolid onClick={switchToCustomAttribute}/>
                        }
                    </AttributeGroupLabel>
                }
                {hasCustomAttribute
                    ? <EditableAttributeLabel
                        contentEditable={true}
                        onBlur={changeHandler} // TODO: better change handling
                        ref={editableElement}
                        dangerouslySetInnerHTML={{__html: customAttribute}} // TODO: __SANITIZE__
                    />
                    : <GeneratedAttributes
                        character={character}
                        reshuffle={reshuffle}
                        attributes={attributes}
                    />
                }
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
                    customAttributeKey={'name'}
                    attributes={[
                        ['givenName', ' '],
                        ['familyName', '']
                    ]}
                />
            </NameWrapper>
            <AttributeGroup
                customAttributeKey={'description'}
                attributes={[
                    `${indefiniteArticleFor(character.age.text)} `,
                    ['age', ' '],
                    ['race', ' '],
                    ['gender', ' of '],
                    ['ancestry', ' descent'],
                ]}
            />
            <CharacterCardRow>
                <CharacterCardColumn>
                    <AttributeGroup
                        customAttributeKey={'job'}
                        label={'Job'}
                        attributes={[
                            ['competency', ' '],
                            ['job', '']
                        ]}
                    />
                    <AttributeGroup
                        customAttributeKey={'appearance'}
                        label={'Appearance'}
                        attributes={[
                            ['appearance1', ', '],
                            ['appearance2', '']
                        ]}
                    />
                </CharacterCardColumn>
                <CharacterCardColumn>
                    <AttributeGroup
                        customAttributeKey={'mood'}
                        label={'Mood'}
                        attributes={[
                            ['mood', '']
                        ]}
                    />
                    <AttributeGroup
                        customAttributeKey={'personality'}
                        label={'Personality'}
                        attributes={[
                            ['personality1', ' and '],
                            ['personality2', '']
                        ]}
                    />
                </CharacterCardColumn>
                <CharacterCardColumn>
                    <AttributeGroup
                        customAttributeKey={'lifegoal'}
                        label={'Life goal'}
                        attributes={[
                            ['motivation', '']
                        ]}
                    />
                    <AttributeGroup
                        customAttributeKey={'relationships'}
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
