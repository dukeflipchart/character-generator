import styled from 'styled-components';
import { darken } from 'polished';

export const colors = {
	red3: '#9C2F13',
    red4: '#C34727',
	red8: '#FFB199',
	red9: '#FFD9CD',
    yellow4: '#8B7409',
    green4: '#208058',
    green5: '#3A9D74',
    blue4: '#456DC9',
    blue5: '#628AE6',
	blue8: '#D2E2FE',
	purple3: '#7835A2',
    purple4: '#984EC7',
    purple5: '#B56DE5',
	purple8: '#E2B1FF',
	purple9: '#F3D8FF',
	neutral9: '#FFFFFF',
	neutral8: '#C4C4C4',
    neutral4: '#707070',
	neutral2: '#393939',
	neutral1: '#1C1C1C'
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
    border: 1px solid ${colors.neutral8};
    border-radius: 1rem;
    
    @media only screen and (min-width: ${breakpoints.first}) {
        margin: 2rem auto;
        padding: 2rem;
    }
`;

export const Button = styled.button`
	border-radius: 0.75rem;
	display: flex;
	align-items: center;
	justify-content: center;
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
		white-space: nowrap;
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
    border: 1px solid ${colors.neutral8};
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

	@media only screen and (min-width: ${breakpoints.first}) {
		:not(:last-child) {
			padding-right: 1rem;
			margin-bottom: 0;
		}

		:not(:first-child) {
			padding-left: 1rem;
		}
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
	display: flex;
    float: right;
	margin: -1rem;
	margin-left: 1rem;

	@media only screen and (min-width: ${breakpoints.first}) {
		margin: -2rem;
    }
`;

export const ToolbarButton = styled(Button)`
	background-color: transparent;
	border-top-left-radius: 0;
	border-top-right-radius: 0;
	display: flex;
	text-align: center;
	padding: 1.5rem 0.75rem;

    svg {
		width: 1.5rem;
		height: 1.5rem;
        color: ${colors.purple4};

		@media only screen and (min-width: ${breakpoints.first}) {
			width: 1.75rem;
			height: 1.75rem;
		}
    }

    :hover,
    :focus {
        background-color: ${colors.purple9};
        svg {
            color: ${colors.purple3};
        }
    }

    :active {
        background-color: ${colors.purple8};
        svg {
            color: ${darken(0.1, colors.purple3)};
        }
    }

	:last-child {
		padding-right: 1.5rem;
	}

    @media only screen and (min-width: ${breakpoints.first}) {
		padding: 1.85rem 1rem;

		:last-child {
			padding-right: 1.85rem;
		}
	}
`;

export const ToolbarDeleteButton = styled(ToolbarButton)`
	border-top-right-radius: 0.75rem;
	border-bottom-right-radius: 0;
	
    :hover,
    :focus {
        background-color: ${colors.red9};
        svg {
            color: ${colors.red3};
        }
    }
	
	:active {
        background-color: ${colors.red8};
        svg {
            color: ${darken(0.1, colors.red3)};
        }
    }
`;

export const ClickableAttribute = styled.span`
    :hover {
        color: ${colors.red4};
        cursor: pointer;
        text-decoration: line-through;
    }
`;

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

export const AttributeGroupWrapper = styled.div`
    :not(:last-child) {
        margin-bottom: 1.65rem;
    }
`;

export const MainInfoWrapper = styled.div`
    margin-bottom: 2.25rem;
`;

export const NameWrapper = styled.h1`
    font-size: 1.75rem;
	font-family: Montserrat, serif;
    margin-top: 0;
    margin-bottom: 0.75rem;
    @media only screen and (min-width: ${breakpoints.first}) {
        font-size: 2.25rem;
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