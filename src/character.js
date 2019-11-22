import Asa from './asa';

const chooseAttribute = (pool, excludedText) => {
    //console.log(pool);
    pool = pool.filter(option => option.text !== excludedText);
    let sumWeights = 0;
    for (let index in pool) {
        sumWeights += pool[index].weight ? pool[index].weight : 1;
    }
    let winner = Math.floor(Math.random() * sumWeights);
    for (let index in pool) {
        winner -= pool[index].weight ? pool[index].weight : 1;
        if (winner < 0) {
            
            return pool[index];
        }
    }
}

const generateSexuality = (options, gender, excludedText) => {
    let sexualityGender = '';
    if (gender === 'cis male' || gender === 'trans male' || gender === 'cis female' || gender === 'trans female') { sexualityGender = 'MaleFemale'; }
    if (gender === 'genderfluid' || gender === 'agender') { sexualityGender = 'GenderfluidAgender'; }

    return chooseAttribute(options[sexualityGender], excludedText);
}

const generateRelationship = (options, age, excludedText) => {
    if (['adult', 'middle-aged', 'old', 'very old'].includes(age)) { age = 'older'; }

    return chooseAttribute(options[age], excludedText);
}

const generateGivenName = (options, ancestry, gender, excludedText) => {
    console.log(options);
    console.log(`ancestry: ${ancestry}, gender: ${gender}, excludedText: ${excludedText}`);
    let nameGender = '';
    if (gender === 'cis male' || gender === 'trans male') { nameGender = 'Masculine'; }
    if (gender === 'cis female' || gender === 'trans female') { nameGender = 'Feminine'; }
    if (gender === 'genderfluid') { nameGender = (Math.random() >= 0.5) ? 'Masculine' : 'Feminine'; }
    if (gender === 'agender') { nameGender = 'Agender'; }

    return chooseAttribute(options[ancestry][nameGender], excludedText);
}

const generateFamilyName = (options, ancestry, excludedText) => chooseAttribute(options[ancestry], excludedText);
const generateRace = (options, ancestry, excludedText) => chooseAttribute(options[ancestry], excludedText);

export const generateCharacter = () => {
    const character = {
        gender: {
            name: 'gender',
            value: chooseAttribute(Asa.gender)
        },
        ancestry: {
            name: 'ancestry',
            value: chooseAttribute(Asa.ancestry)
        },
        age: {
            name: 'age',
            value: chooseAttribute(Asa.age)
        },
        motivation: {
            name: 'motivation',
            value: chooseAttribute(Asa.motivation)
        },
        usualMood: {
            name: 'usualMood',
            value: chooseAttribute(Asa.usualMood)
        }
    }
    character.sexuality = {
        name: 'sexuality',
        value: generateSexuality(Asa.sexuality, character.gender.value.text)
    }
    character.givenName = {
        name: 'givenName',
        value: generateGivenName(Asa.givenName, character.ancestry.value.text, character.gender.value.text)
    }
    character.familyName = {
        name: 'familyName',
        value: generateFamilyName(Asa.familyName, character.ancestry.value.text)
    }
    character.race = {
        name: 'race',
        value: generateRace(Asa.race, character.ancestry.value.text)
    }
    character.relationship = {
        name: 'relationship',
        value: generateRelationship(Asa.relationship, character.age.value.text)
    }

    return character;
}

export const reshuffle = (oldAttributes, targetAttribute) => {
	let previousTargetAttributeValueText = oldAttributes[targetAttribute].value.text;

	let newAttributes;
	switch(targetAttribute) {
        case 'givenName':
            newAttributes = {
                [targetAttribute]: {
                    name: 'givenName',
                    value: generateGivenName(Asa.givenName, oldAttributes.ancestry.value.text, oldAttributes.gender.value.text, previousTargetAttributeValueText)
                }
            };
            break;
        case 'familyName':
            newAttributes = {
                [targetAttribute]: {
                    name: 'familyName',
                    value: generateFamilyName(Asa.familyName, oldAttributes.ancestry.value.text, previousTargetAttributeValueText)
                }
            };
            break;
        case 'race':
            newAttributes = {
                [targetAttribute]: {
                    name: 'race',
                    value: generateRace(Asa.race, oldAttributes.ancestry.value.text, previousTargetAttributeValueText)
                }
            };
            break;
        case 'ancestry':
            const newAncestry = chooseAttribute(Asa.ancestry, previousTargetAttributeValueText);
            newAttributes = {
                ancestry: {
                    name: 'ancestry',
                    value: newAncestry
                },
				givenName: {
                    name: 'givenName',
                    value: generateGivenName(Asa.givenName, newAncestry.text, oldAttributes.gender.value.text)
                },
				familyName: {
                    name: 'familyName',
                    value: generateFamilyName(Asa.familyName, newAncestry.text, oldAttributes.gender.value.text)
                },
				race: {
                    name: 'race',
                    value: generateRace(Asa.race, newAncestry.text)
                }
            };
            break;
        case 'gender':
		    const newGender = chooseAttribute(Asa.gender, previousTargetAttributeValueText);
			newAttributes = {
                gender: {
                    name: 'gender',
                    value: newGender
				},
				sexuality: {
                    name: 'sexuality',
                    value: generateSexuality(Asa.sexuality, newGender.text, oldAttributes.sexuality.value.text)
				},
				givenName: {
                    name: 'givenName',
                    value: generateGivenName(Asa.givenName, oldAttributes.ancestry.value.text, newGender.text)
                }
            };
            break;
        case 'sexuality':
            newAttributes = {
                [targetAttribute]: {
                    name: 'sexuality',
                    value: generateSexuality(Asa.sexuality, oldAttributes.gender.value.text, previousTargetAttributeValueText)
                }
            };
            break;
        case 'relationship':
            newAttributes = {
                [targetAttribute]: {
                    name: 'relationship',
                    value: generateRelationship(Asa.relationship, oldAttributes.age.value.text, previousTargetAttributeValueText)
                }
            };
            break;
        case 'age':
            const newAge = chooseAttribute(Asa[targetAttribute], previousTargetAttributeValueText);
            newAttributes = {
                age: {
                    name: 'age',
                    value: newAge
                },
                relationship: {
                    name: 'relationship',
                    value: generateRelationship(Asa.relationship, newAge.text)
                }
            };
            break;
        default:
            newAttributes = {
                [targetAttribute]: {
                    name: targetAttribute,
                    value: chooseAttribute(Asa[targetAttribute], previousTargetAttributeValueText)
                }
            };
    }

    return {
        ...oldAttributes,
        ...newAttributes
    }
}
