import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

export const CharacterSheetContainer = styled.div`
    max-width: 40em;
    margin: 0 auto;
`;

export const AttributeLabel = styled.span`

    :hover {
        color: #999;
        cursor: pointer;
        text-decoration: line-through;
    }
`;

export const NameWrapper = styled.h1`
`;