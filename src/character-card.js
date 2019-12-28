import React, {
    Fragment,
    useRef
} from 'react';
import styled from 'styled-components';

import dedent from 'dedent';
import copy from 'clipboard-copy';

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

// this logic should moved to the character module
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
    :not(:last-child) {
        margin-bottom: 1.65rem;
    }
`;

export const ClickableAttribute = styled.span`
    :hover {
        color: #999;
        cursor: pointer;
        text-decoration: line-through;
    }
`;

export const EditableAttribute = styled.span``;

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
    reshuffleAttribute,
    attributes
}) => fetchAttributeValues(character, attributes)
    .map(attribute => {
        if (typeof attribute === 'string') {
            return attribute
        } else if (Array.isArray(attribute) && attribute.length === 3) {
            const [key, value, separator] = attribute;
            return (
                <Fragment key={key}>
                    <ClickableAttribute onClick={() => reshuffleAttribute(key)}>
                        {value}
                    </ClickableAttribute>
                    {separator}
                </Fragment>
            )
        } else {
            return <ClickableAttribute>ERR</ClickableAttribute>
        }
    })


export const CharacterCard = ({
    deleteCharacter,
    reshuffleAttribute,
    setCustomAttribute,
    character,
}) => {

    /**
     * The same data needs to be rendered as string (when a character desc. is copied to the clipboard),
     * and rendered as a string. To stay DRY, instead of recreating the same templates twice in JSX and
     * string templates, a simple config was created that describes attribute groups, in order.
     * This reduces flexibility, but makes maintanence easier and code nicer :D This approach will also
     * come in handy if characters need to be exported in other formats, too.
     */
    const attributeGroupConfigs = new Map([
        [
            'name',
            {
                attributes: [
                    ['givenName', ' '],
                    ['familyName', '']
                ]
            }
        ],
        [
            'description',
            {
                attributes: [
                    /**
                     * NOTE: this function call here is the only reason why attributeGroupConfigs need to be
                     * declared in the scope of CharacterCard.
                     * To fix this, one can get rid of the indefinite article (easy, clean), or pass a special
                     * string, e.g. 'INDEFINITE_ARTICLE', which will be parsed by fetchAttributeValues, replaced
                     * with an indefinite article. This is not ugly, but will add a tiny bit of complexity, and
                     * reduce flexibility.
                     */
                    `${indefiniteArticleFor(character.age.text)} `,
                    ['age', ' '],
                    ['race', ' '],
                    ['gender', ' of '],
                    ['ancestry', ' descent'],
                ]
            }
        ],
        [
            'job',
            {
                label: 'Job',
                attributes: [
                    ['competency', ' '],
                    ['job', '']
                ]
            }
        ],
        [
            'appearance',
            {
                label: 'Appearance',
                attributes: [
                    ['appearance1', ', '],
                    ['appearance2', '']
                ]
            }
        ],
        [
            'mood',
            {
                label: 'Mood',
                attributes: [
                    ['mood', '']
                ]
            }
        ],
        [
            'personality',
            {
                label: 'Personality',
                attributes: [
                    ['personality1', ' and '],
                    ['personality2', '']
                ]
            }
        ],
        [
            'lifegoal',
            {
                label: 'Life goal',
                attributes: [
                    ['motivation', '']
                ]
            }
        ],
        [
            'relationships',
            {
                label: 'Relationships',
                attributes: [
                    ['sexuality', ', '],
                    ['relationship', '']
                ]
            }
        ]
    ]);

    // declared in CharacterCard scope, so it has access to `character` and `reshuffle` props
    const AttributeGroup = ({
        id
    }) => {
        const { label, attributes } = attributeGroupConfigs.get(id);

        const editableElement = useRef(null);
        const switchToCustomAttribute = () => setCustomAttribute(id, generatedAttributesAsString({ character, attributes }));
        const switchToGeneratedAttributes = () => setCustomAttribute(id, false);
        const changeHandler = () => setCustomAttribute(id, editableElement.current.innerHTML);

        const customAttribute = character.customAttributes[id];
        const hasCustomAttribute = customAttribute === ''
            ? true
            : Boolean(customAttribute);

        return (
            <AttributeGroupWrapper>
                {label &&
                    <AttributeGroupLabel>
                        {label} {hasCustomAttribute
                            ? <span onClick={switchToGeneratedAttributes}>R</span> // TODO: UX change or an icon is needed
                            : <PenSolid onClick={switchToCustomAttribute} />
                        }
                    </AttributeGroupLabel>
                }
                {hasCustomAttribute
                    ? <EditableAttribute
                        contentEditable={true}
                        onBlur={changeHandler} // TODO: better change handling
                        ref={editableElement}
                        dangerouslySetInnerHTML={{ __html: customAttribute }} // TODO: __SANITIZE__
                    />
                    : <GeneratedAttributes
                        character={character}
                        reshuffleAttribute={reshuffleAttribute}
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
                <AttributeGroup id={'name'} />
            </NameWrapper>
            <AttributeGroup id={'description'} />
            <CharacterCardRow>
                <CharacterCardColumn>
                    <AttributeGroup id={'job'} />
                    <AttributeGroup id={'appearance'} />
                </CharacterCardColumn>
                <CharacterCardColumn>
                    <AttributeGroup id={'mood'} />
                    <AttributeGroup id={'personality'} />
                </CharacterCardColumn>
                <CharacterCardColumn>
                    <AttributeGroup id={'lifegoal'} />
                    <AttributeGroup id={'relationships'} />
                </CharacterCardColumn>
            </CharacterCardRow>
        </CharacterCardContainer>
    )
}
