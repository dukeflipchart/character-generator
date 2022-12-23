import React, {
    Fragment
} from 'react';
import styled from 'styled-components';

import copy from 'clipboard-copy';

import ClipboardSolid from './icons/ClipboardSolid';
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

/**
 * A hackjob of a template parser, that knows a bit of grammar.
 * Converts templates into a format that can be rendered as text, html,
 * or anything else if the need arises.
 * Templates are plain strings.
 * Anything between %% delimiters will be replaced by the corresponding
 * value from the `values` object passed.
 * %INDEFINITE_ARTICLE% will be replaced with the proper article for the
 * word following it.
 * If any other grammar issues arise (pronouns, etc.) they can be solved here.
 * If the need for i18n arises, grammar rules should probably be pluggable,
 * and different for each language.
 */
const parseTemplate = ({
    template,
    values
}) => {

    const [first, ...rest] = template
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

    return typeof first === 'string'
        ? [capitalize(first), ...rest]
        : [[capitalize(first[0]), first[1]], ...rest]
}

/**
 * A react component that renders the output of `parseTemplate` as HTML.
 */
const GeneratedAttributes = ({
    template,
    values,
    reshuffleAttribute
}) =>
    parseTemplate({ template, values })
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

/**
 * A function that renders the output of `parseTemplate` as plain text.
 */        
const generatedAttributes = ({
    template,
    values
}) =>
    parseTemplate({ template, values })
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
                    : generatedAttributes({ template, values })
                return `${label ? `${capitalize(label)}: ` : ''}${description}`
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
    reshuffleAttribute
}) => {

    return (
        <AttributeGroupWrapper>
            {label &&
                <AttributeGroupLabel>
                    {label}
                </AttributeGroupLabel>
            }
            <GeneratedAttributes
				template={template}
				values={values}
				reshuffleAttribute={reshuffleAttribute}
			/>
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
