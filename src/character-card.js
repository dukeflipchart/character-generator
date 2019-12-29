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

const compileTemplate = ({
    template,
    values
}) =>
    template
        .split('%')
        .filter(string => string !== '')
        .reduceRight((acc, token) => {
            if (token === 'gender') {
                return [displayGender(values.age.text, values.gender.text), ...acc]
            } else if (values[token]) {
                return [[values[token].text, token], ...acc]
            } else if (token === 'INDEFINITE_ARTICLE') {
                const firstNonWhitespace = acc.find(e => e !== ' ')
                return Array.isArray(firstNonWhitespace)
                    ? [indefiniteArticleFor(firstNonWhitespace[0]), ...acc]
                    : [indefiniteArticleFor(firstNonWhitespace), ...acc]
            } else {
                return [token, ...acc]
            }
        }, [])

const AttributesFromTemplate = ({
    template,
    values,
    reshuffleAttribute
}) => 
    compileTemplate({template, values})
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
    compileTemplate({template, values})
        .map(e => Array.isArray(e) ? e[0] : e)
        .join('')

export const createTextDescription = ({
    templates,
    values
}) =>
    Array.from(templates.entries())
        .map(
            ([label, template]) => {
                const description = values.customAttributes[label]
                    ? values.customAttributes[label]
                    : attributesFromTemplate({ template, values })
                return `${capitalize(label)}: ${capitalize(description)}`
            }
        )
        .join('\n')

export const CharacterCard = ({
    deleteCharacter,
    reshuffleAttribute,
    setCustomAttribute,
    character,
}) => {

    const attributeTemplates = new Map([
        ['name', '%givenName% %familyName'],
        ['description', '%INDEFINITE_ARTICLE% %age% %race% %gender% of %ancestry% descent'],
        ['job', '%competency% %job%'],
        ['appearance', '%appearance1%, %appearance2'],
        ['mood', '%mood%'],
        ['personality', '%personality1% and %personality2%'],
        ['life goal', '%motivation%'],
        ['relationships', '%sexuality%, %relationship%']
    ]);

    // declared in CharacterCard scope, so it has access to `character` and `reshuffle` props
    const AttributeGroup = ({
        label,
        showLabel = true
    }) => {
        const template = attributeTemplates.get(label);

        const editableElement = useRef(null);
        const switchToCustomAttribute = () => setCustomAttribute(label, attributesFromTemplate({ template, values: character }));
        const switchToGeneratedAttributes = () => setCustomAttribute(label, false);
        const changeHandler = () => setCustomAttribute(label, editableElement.current.innerHTML);

        const customAttribute = character.customAttributes[label];
        const hasCustomAttribute = customAttribute === ''
            ? true
            : Boolean(customAttribute);

        return (
            <AttributeGroupWrapper>
                {showLabel &&
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
                    : <AttributesFromTemplate
                        template={template}
                        values={character}
                        reshuffleAttribute={reshuffleAttribute}
                    />
                }
            </AttributeGroupWrapper>
        );
    }

    return (
        <CharacterCardContainer>
            <CharacterCardToolbar>
                <ToolbarButton onClick={() => copy(createTextDescription({ templates: attributeTemplates, values: character }))}>
                    <ClipboardSolid />
                </ToolbarButton>
                <ToolbarButton onClick={() => deleteCharacter()}>
                    <TrashSolid />
                </ToolbarButton>
            </CharacterCardToolbar>
            <NameWrapper>
                <AttributeGroup label={'name'} showLabel={false}/>
            </NameWrapper>
            <AttributeGroup label={'description'} showLabel={false}/>
            <CharacterCardRow>
                <CharacterCardColumn>
                    <AttributeGroup label={'job'} />
                    <AttributeGroup label={'appearance'} />
                </CharacterCardColumn>
                <CharacterCardColumn>
                    <AttributeGroup label={'mood'} />
                    <AttributeGroup label={'personality'} />
                </CharacterCardColumn>
                <CharacterCardColumn>
                    <AttributeGroup label={'life goal'} />
                    <AttributeGroup label={'relationships'} />
                </CharacterCardColumn>
            </CharacterCardRow>
        </CharacterCardContainer>
    )
}
