import React from 'react';
import TestRenderer from 'react-test-renderer';

import { attributeConfigs } from './attribute-configs'

import {
    CharacterCard,
    createTextDescription
} from './character-card.js'

const character = {
    "gender": {
        "text": "cis male"
    },
    "ancestry": {
        "text": "Kitharan"
    },
    "age": {
        "text": "very old"
    },
    "motivation": {
        "text": "To teach others"
    },
    "mood": {
        "text": "Amused"
    },
    "appearance1": {
        "text": "athletic",
        "tags": [
            "build"
        ]
    },
    "personality1": {
        "text": "impulsive",
        "tags": [
            "impulsiveness"
        ]
    },
    "competency": {
        "text": "very talented"
    },
    "job": {
        "text": "paladin"
    },
    "sexuality": {
        "text": "heterosexual"
    },
    "givenName": {
        "text": "Jai"
    },
    "familyName": false,
    "race": {
        "text": "elf"
    },
    "relationship": {
        "text": "in a toxic relationship"
    },
    "appearance2": {
        "text": "has several piercings",
        "tags": [
            "jewelry"
        ]
    },
    "personality2": {
        "text": "progressive",
        "tags": [
            "progressiveness"
        ]
    },
    "customAttributes": {
    }
}

const props = {
    deleteCharacter: () => undefined,
    reshuffleAttribute: () => undefined,
    setCustomAttribute: () => undefined,
    character,
    attributeConfigs
}

it('renders correctly', () => {
    const tree = TestRenderer
        .create(<CharacterCard {...props} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
})

it('creates the text description correctly',  () => {
    const text = createTextDescription({ attributeConfigs, values: character });
    expect(text).toMatchSnapshot();
})
