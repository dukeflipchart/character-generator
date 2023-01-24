import styled from 'styled-components';
import { darken } from 'polished';

export const colors = {
    red4: '#C34727',
    yellow4: '#8B7409',
    green4: '#208058',
    green5: '#3A9D74',
    blue4: '#456DC9',
    blue5: '#628AE6',
    purple4: '#984EC7',
    purple5: '#B56DE5',
	neutral9: `#FFFFFF`,
	neutral7: `#C4C4C4`,
    neutral4: '#707070',
	neutral1: `#1C1C1C`
}

export const breakpoints = {
	first: '40rem'
}

export const BoardContainer = styled.div`
    box-sizing: border-box;
    width: 100%;
    padding: 1rem;
    @media only screen and (min-width: ${breakpoints.first}) {
        padding: 2rem;
    }
`;

export const CharacterCardContainer = styled.div`
    max-width: 40rem;
    margin: 1rem auto;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 1rem;
    
    @media only screen and (min-width: ${breakpoints.first}) {
        margin: 2rem auto;
        padding: 2rem;
    }
`;

export const Button = styled.button`
	border-radius: 0.75rem;
	display: flex;
    margin: 0;
    padding: 0.75rem;
    background-color: ${colors.purple4};
    border: none;
    font-family: Montserrat, sans-serif;
    font-size: 1rem;
    line-height: 1.65rem;
    text-transform: uppercase;
    color: #fff;
    outline: none;
    cursor: pointer;
    svg {
		flex: 0 0 2rem;
        height: 2rem;
    }
    :hover,
    :focus {
        background-color: ${darken(0.1, colors.purple4)};
    }
    :active {
        background-color: ${colors.blue4};
    }
`;

export const ButtonLabel = styled.span`
	display: none;

	@media only screen and (min-width: ${breakpoints.first}) {
		display: inline;
		margin-left: 0.5rem;
	}
`;

export const PrimaryButton = styled(Button)`
	@media only screen and (min-width: ${breakpoints.first}) {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
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

export const TopToolbarButtonColumn = styled.div`
    flex: 0 0 0%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    box-sizing: border-box;
	padding-left: 1rem;
	@media only screen and (min-width: ${breakpoints.first}) {
		flex: 1 1 0;
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
        color: ${colors.purple4};
        width: 100%;
        height: 100%;
    }
    :hover,
    :focus {
        background-color: transparent;
        svg {
            color: ${colors.blue4};
        }
    }
    :active {
        background-color: transparent;
        svg {
            color: ${darken(0.1, colors.purple4)};
        }
    }
    @media only screen and (min-width: ${breakpoints.first}) {
        width: 2rem;
        height: 2rem;
        margin-top: 0;
    }
`;

export const ToolbarDeleteButton = styled.button``;

export const AttributeGroupLabel = styled.h4`
    display: block;
    font-family: 'Montserrat', sans-serif;
    font-size: 0.75rem;
    line-height: 2.2;
    text-transform: uppercase;
    margin-top: 0;
    margin-bottom: 0;
    padding: 0;
`;

export const NameWrapper = styled.h1`
    font-size: 2rem;
	font-family: Montserrat, serif;
    margin-top: 0;
    margin-bottom: 0.5rem;
    @media only screen and (min-width: ${breakpoints.first}) {
        font-size: 2.5rem;
        margin-top: -1rem;
        margin-bottom: 0.5rem;
    }
`;

export const CharacterCardRow = styled.div`
    @media only screen and (min-width: ${breakpoints.first}) {
        display: flex;
        flex-direction: row;
    }
`;

export const CharacterCardColumn = styled.div`
    flex: 1 1 50%;
    :not(:last-child) {
        margin-bottom: 1.65rem;
    }
    @media only screen and (min-width: ${breakpoints.first}) {
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