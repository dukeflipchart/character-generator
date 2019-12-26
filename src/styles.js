import styled from 'styled-components';
import { darken } from 'polished';

export const colors = {
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
    line-height: 1.65rem;
    text-transform: uppercase;
    color: #fff;
    outline: none;
    cursor: pointer;

    svg {
        width: 2rem;
        height: 2rem;
    }

    :hover,
    :focus {
        background-color: ${darken(0.1, colors.warlockPurple)};
    }

    :active {
        background-color: ${colors.wizardBlue};
    }
`;

export const TopToolbarButton = styled(Button)`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 1rem;
    padding: 1rem;
    width: 100%;

    svg {
        width: 2rem;
        height: 2rem;
        margin: -0.5rem 1rem -0.5rem -0.5rem;
    }
`;

export const Label = styled.label`
    display: block;
    font-family: 'Montserrat', sans-serif;
    font-size: 0.75rem;
    line-height: 2.2;
    text-transform: uppercase;
`;

export const Select = styled.select`
    border: 1px solid #ddd;
    border-radius: 1rem;
    font-family: 'Montserrat', sans-serif;
    font-size: 1rem;
    height: 58px;
    padding: 1rem;
    outline: none;
    text-transform: uppercase;
    width: 100%;
`;

export const SelectContainer = styled.div``;

export const Option = styled.option`
    padding: 1rem;
`;

export const TopToolbar = styled.div`
    display: flex;
    margin: 0 auto 1rem;
    max-width: 44rem;
`;

export const TopToolbarColumn = styled.div`
    flex: 1 0 50%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    box-sizing: border-box;

    :not(:last-child) {
        padding-right: 1rem;
        margin-bottom: 0;
    }

    :not(:first-child) {
        padding-left: 1rem;
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
            color: ${colors.wizardBlue};
        }
    }

    :active {
        background-color: transparent;

        svg {
            color: ${darken(0.1, colors.wizardBlue)};
        }
    }

    @media only screen and (min-width: 35rem) {
        width: 2rem;
        height: 2rem;
        margin-top: 0;
    }
`;

export const ToolbarDeleteButton = styled.button``;

export const AttributeGroupLabel = styled.button`
    display: block;
    background-color: transparent;
    border: none;
    font-family: 'Montserrat', sans-serif;
    font-size: 0.75rem;
    line-height: 2.2;
    text-transform: uppercase;
    margin-top: 0;
    margin-bottom: 0;
    padding: 0;
    cursor: pointer;
    outline: none;

    svg {
        opacity: 0;
        width: 0.6rem;
        height: 0.6rem;
    }

    :hover,
    :focus {
        color: ${colors.wizardBlue}

        svg {
            opacity: 1;
        }
    }
    
    :active {
        color: ${darken(0.1, colors.wizardBlue)}

        svg {
            opacity: 1;
        }
    }
`;

export const AttributeLabel = styled.span`

    :hover {
        color: #999;
        cursor: pointer;
        text-decoration: line-through;
    }
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

export const CharacterCardRow = styled.div`

    @media only screen and (min-width: 35rem) {
        display: flex;
        flex-direction: row;
    }
`;

export const CharacterCardColumn = styled.div`
    flex: 1 1 50%;

    :not(:last-child) {
        margin-bottom: 1.65rem;
    }

    @media only screen and (min-width: 35rem) {

        :not(:last-child) {
            border-right: 1px solid #ddd;
            padding-right: 2rem;
            margin-bottom: 0;
        }
    
        :not(:first-child) {
            padding-left: 2rem;
        }
    }
`;