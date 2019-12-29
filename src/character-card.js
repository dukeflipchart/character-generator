import React, {
    Fragment,
    useState,
    useEffect,
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

export const EditableAttributes = styled.span``;

const compileTemplate = ({
    template,
    values
}) =>
    template
        .split('%')
        .filter(string => string !== '')
        .reduceRight((acc, token) => {
            // edge case
            if (token === 'gender') {
                return [displayGender(values.age.text, values.gender.text), ...acc]
                // a value exists
            } else if (values[token] && values[token].text) {
                return [[values[token].text, token], ...acc]
                // a value exists, but is empty
            } else if (values[token] === false) { // null would be a better choice
                return ['', ...acc]
                // other special cases
            } else if (token === 'INDEFINITE_ARTICLE') {
                const firstNonWhitespace = acc.find(e => e !== ' ')
                return Array.isArray(firstNonWhitespace)
                    ? [indefiniteArticleFor(firstNonWhitespace[0]), ...acc]
                    : [indefiniteArticleFor(firstNonWhitespace), ...acc]
                // plain text
            } else {
                return [token, ...acc]
            }
        }, [])

const GeneratedAttributes = ({
    template,
    values,
    reshuffleAttribute
}) =>
    compileTemplate({ template, values })
        .map(e => {
            if (Array.isArray(e)) {
                const [value, key] = e;
                return (
                    <Fragment key={key}>
                        <ClickableAttribute onClick={() => reshuffleAttribute(key)}>
                            {value}
                        </ClickableAttribute>
                    </Fragment>
                )
            } else if (typeof e === 'string') {
                return e
            } else {
                return 'ERR'
            }
        })

const attributesFromTemplate = ({
    template,
    values
}) =>
    compileTemplate({ template, values })
        .map(e => Array.isArray(e) ? e[0] : e)
        .join('')

export const createTextDescription = ({
    attributeConfigs,
    values
}) =>
    Array.from(attributeConfigs.entries())
        .map(
            ([id, { label, template }]) => {
                const description = values.customAttributes[id]
                    ? values.customAttributes[id]
                    : attributesFromTemplate({ template, values })
                return `${label ? `${capitalize(label)}: ` : ''}${capitalize(description)}`
            }
        )
        .join('\n')

const AttributeGroup = ({
    id,
    attributeConfig: {
        label,
        template
    },
    values,
    reshuffleAttribute,
    setCustomAttribute,
}) => {
    
    const editableElement = useRef(null);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        if (editMode && editableElement.current) {
            editableElement.current.focus();
        }
    })

    const switchToCustomAttributes = () => {
        setCustomAttribute(id, attributesFromTemplate({ template, values }));
        setEditMode(true);
    };

    const changeHandler = () => {
        setCustomAttribute(id, editableElement.current.innerHTML)
        setEditMode(false);
    };

    const customAttribute = values.customAttributes[id];
    const hasCustomAttribute = customAttribute === ''
        ? true
        : Boolean(customAttribute);

    return (
        <AttributeGroupWrapper>
            {label &&
                <AttributeGroupLabel>
                    {label} {!hasCustomAttribute &&<PenSolid onClick={switchToCustomAttributes} />}
                </AttributeGroupLabel>
            }
            {hasCustomAttribute
                ? <EditableAttributes
                    contentEditable={true}
                    onBlur={changeHandler} // TODO: better change handling
                    ref={editableElement}
                    dangerouslySetInnerHTML={{ __html: customAttribute }} // TODO: __SANITIZE__
                />
                : <GeneratedAttributes
                    template={template}
                    values={values}
                    reshuffleAttribute={reshuffleAttribute}
                />
            }
        </AttributeGroupWrapper>
    );
}

export const CharacterCard = ({
    deleteCharacter,
    reshuffleAttribute,
    setCustomAttribute,
    character,
    attributeConfigs
}) => {

    // helper function that passes props so you don't have to
    const attributeGroupProps = (id) => ({
        id,
        attributeConfig: attributeConfigs.get(id),
        values: character,
        reshuffleAttribute,
        setCustomAttribute,
    })

    return (
        <CharacterCardContainer>
            <CharacterCardToolbar>
                <ToolbarButton onClick={() => copy(createTextDescription({ attributeConfigs, values: character }))}>
                    <ClipboardSolid />
                </ToolbarButton>
                <ToolbarButton onClick={() => deleteCharacter()}>
                    <TrashSolid />
                </ToolbarButton>
            </CharacterCardToolbar>
            <NameWrapper>
                <AttributeGroup {...attributeGroupProps('name')} />
            </NameWrapper>
            <AttributeGroup {...attributeGroupProps('description')} />
            <CharacterCardRow>
                <CharacterCardColumn>
                    <AttributeGroup {...attributeGroupProps('job')} />
                    <AttributeGroup {...attributeGroupProps('appearance')} />
                </CharacterCardColumn>
                <CharacterCardColumn>
                    <AttributeGroup {...attributeGroupProps('mood')} />
                    <AttributeGroup {...attributeGroupProps('personality')} />
                </CharacterCardColumn>
                <CharacterCardColumn>
                    <AttributeGroup {...attributeGroupProps('lifeGoal')} />
                    <AttributeGroup {...attributeGroupProps('relationships')} />
                </CharacterCardColumn>
            </CharacterCardRow>
        </CharacterCardContainer>
    )
}
