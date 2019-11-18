import styled from 'styled-components';
import ClipboardSolid from './icons/ClipboardSolid.js';
import ClipboardCheckSolid from './icons/ClipboardCheckSolid.js';

export const CharacterSheetContainer = styled.div`
    max-width: 35rem;
    margin: 0 auto;
    padding: 2rem;
    border: 1px solid #ddd;
    border-radius: 0.5rem;
`;

export const CopyButton = styled(ClipboardSolid)`
    float: right;
    width: 2rem;
    height: 2rem;
`;

export const AttributeGroup = styled.div`

    :not(:last-child) {
        margin-bottom: 1.6rem;
    }
`;

export const AttributeGroupLabel = styled.h4`
    font-family: Montserrat, sans-serif;
    font-size: 0.75rem;
    text-transform: uppercase;
    margin-top: 0;
    margin-bottom: 0.3rem;
`;

export const AttributeLabel = styled.span`

    :hover {
        color: #999;
        cursor: pointer;
        text-decoration: line-through;
    }
`;

export const AttributeList = styled.ul`
    margin-top: 0;
    margin-bottom: 0;
    padding-left: 0;
    list-style-type: none;
`;

export const NameWrapper = styled.h1`
    margin-top: -1rem;
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
`;

export const Row = styled.div`

    @media only screen and (min-width: 35rem) {
        display: flex;
        flex-direction: row;
    }
`;

export const Column = styled.div`
    flex: 1 1 50%;

    @media only screen and (min-width: 35rem) {

        :not(:last-child) {
            border-right: 1px solid #ddd;
            padding-right: 2em;
        }
    
        :not(:first-child) {
            padding-left: 2em;
        }
    }
`;