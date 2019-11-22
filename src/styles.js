import styled from 'styled-components';
import { darken } from 'polished';

const colors = {
    bard: '#E052E0',
    clericRed: '#EB4747',
    druid: '#60DF20',
    paladin: '#F5D63D',
    ranger: '#2EA02E',
    sorcerer: '#F2800D',
    warlockPurple: '#A852FF',
    wizardBlue: '#4C88FF'
}

export const BoardContainer = styled.div`
    box-sizing: border-box;
    width: 100%;
    padding: 1rem;

    @media only screen and (min-width: 35rem) {
        padding: 2rem;
    }
`;

export const CharacterCardContainer = styled.div`
    max-width: 40rem;
    margin: 1rem auto;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 1rem;
    
    @media only screen and (min-width: 35rem) {
        margin: 2rem auto;
        padding: 2rem;
    }
`;

export const Button = styled.button`
    margin: 0;
    padding: 0.5rem;
    background-color: ${colors.warlockPurple};
    border: none;
    font-family: Montserrat, sans-serif;
    font-size: 1rem;
    text-transform: uppercase;
    color: #fff;
    outline: none;
    cursor: pointer;

    svg {
        width: 2rem;
        height: 2rem;
        margin-bottom: 0.5rem;
    }

    :hover,
    :focus {
        background-color: ${darken(0.1, colors.warlockPurple)};
    }

    :active {
        background-color: ${darken(0.2, colors.warlockPurple)};
    }
`;

export const AddCharacterButton = styled(Button)`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto 1rem;
    width: 100%;
    max-width: 44rem;
    border-radius: 1rem;
    padding: 1rem;

    @media only screen and (min-width: 35rem) {
        margin-bottom: 2rem;
    }
`;

export const CharacterCardToolbar = styled.div`
    float: right;
`;

export const ToolbarButton = styled(Button)`
    width: 1.5rem;
    height: 1.5rem;
    padding: 0;
    background-color: transparent;
    border: none;
    margin-top: 0.45rem;

    :not(:last-of-type) {
        margin-right: 1em;
    }

    svg {
        color: ${colors.warlockPurple};
        width: 100%;
        height: 100%;
    }

    :hover,
    :focus {
        background-color: transparent;

        svg {
            color: ${darken(0.1, colors.warlockPurple)};
        }
    }

    :active {
        background-color: transparent;

        svg {
            color: ${darken(0.2, colors.warlockPurple)};;
        }
    }

    @media only screen and (min-width: 35rem) {
        width: 2rem;
        height: 2rem;
        margin-top: 0;
    }
`;

export const ToolbarDeleteButton = styled.button``;


export const AttributeGroup = styled.div`
    
    :not(:last-child) {
        margin-bottom: 1.65rem;
    }
`;

export const AttributeGroupLabel = styled.h4`
    font-family: Montserrat, sans-serif;
    font-size: 0.75rem;
    line-height: 2.2;
    text-transform: uppercase;
    margin-top: 0;
    margin-bottom: 0;
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
    font-size: 1.5rem;
    margin-top: 0;
    margin-bottom: 0.5rem;

    @media only screen and (min-width: 35rem) {
        font-size: 2.5rem;
        margin-top: -1rem;
        margin-bottom: 0.5rem;
    }
`;

export const Row = styled.div`

    @media only screen and (min-width: 35rem) {
        display: flex;
        flex-direction: row;
    }
`;

export const Column = styled.div`
    flex: 1 1 50%;

    :not(:last-child) {
        margin-bottom: 1.65rem;
    }

    @media only screen and (min-width: 35rem) {

        :not(:last-child) {
            border-right: 1px solid #ddd;
            padding-right: 2em;
            margin-bottom: 0;
        }
    
        :not(:first-child) {
            padding-left: 2em;
        }
    }
`;