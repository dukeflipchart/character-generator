import Asa from './asa';

const chooseAttribute = (pool, excludedValue) => {
    pool = pool.filter(option => option.text !== excludedValue);
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

const generateSexuality = (options, gender, oldValue) => {
    if (gender === 'cis male' || gender === 'trans male' || gender === 'cis female' || gender === 'trans female') { gender = 'MaleFemale'; }
    if (gender === 'genderfluid' || gender === 'agender') { gender = 'GenderfluidAgender'; }

    return chooseAttribute(options[gender], oldValue);
}

const generateRelationship = (options, age, oldValue) => {
    if (['adult', 'middle-aged', 'old', 'very old'].includes(age)) { age = 'older'; }

    return chooseAttribute(options[age], oldValue);
}

const generateGivenName = (options, ancestry, gender, oldValue) => {
    if (gender === 'cis male' || gender === 'trans male') { gender = 'Masculine'; }
    if (gender === 'cis female' || gender === 'trans female') { gender = 'Feminine'; }
    if (gender === 'genderfluid') { gender = (Math.random() >= 0.5) ? 'Masculine' : 'Feminine'; }

    return chooseAttribute(options[ancestry][gender], oldValue);
}

const generateFamilyName = (options, ancestry, oldValue) => chooseAttribute(options[ancestry], oldValue);
const generateRace = (options, ancestry, oldValue) => chooseAttribute(options[ancestry], oldValue);

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
        },
        outlook: {
            name: 'outlook',
            value: chooseAttribute(Asa.outlook)
        },
        integrity: {
            name: 'integrity',
            value: chooseAttribute(Asa.integrity)
        },
        impulsiveness: {
            name: 'impulsiveness',
            value: chooseAttribute(Asa.impulsiveness)
        },
        friendliness: {
            name: 'friendliness',
            value: chooseAttribute(Asa.friendliness)
        },
        conformity: {
            name: 'conformity',
            value: chooseAttribute(Asa.conformity)
        }
    }
    character.sexuality = {
        name: 'sexuality',
        value: generateSexuality(Asa.sexuality, character.gender.value)
    }
    character.givenName = {
        name: 'givenName',
        value: generateGivenName(Asa.givenName, character.ancestry.value, character.gender.value)
    }
    character.familyName = {
        name: 'familyName',
        value: generateFamilyName(Asa.familyName, character.ancestry.value)
    }
    character.race = {
        name: 'race',
        value: generateRace(Asa.race, character.ancestry.value)
    }
    character.relationship = {
        name: 'relationship',
        value: generateRelationship(Asa.relationship, character.age.value)
    }

    return character;
}

export const reshuffle = (oldAttributes, targetAttribute) => {
	let previousTargetAttributeValue = oldAttributes[targetAttribute].value;

	let newAttributes;
	switch(targetAttribute) {
        case 'givenName':
            newAttributes = {
                [targetAttribute]: {
                    name: 'givenName',
                    value: generateGivenName(Asa.givenName, oldAttributes.ancestry.value, oldAttributes.gender.value, previousTargetAttributeValue)
                }
            };
            break;
        case 'familyName':
            newAttributes = {
                [targetAttribute]: {
                    name: 'familyName',
                    value: generateFamilyName(Asa.familyName, oldAttributes.ancestry.value, previousTargetAttributeValue)
                }
            };
            break;
        case 'race':
            newAttributes = {
                [targetAttribute]: {
                    name: 'race',
                    value: generateRace(Asa.race, oldAttributes.ancestry.value, previousTargetAttributeValue)
                }
            };
            break;
        case 'ancestry':
            const newAncestry = chooseAttribute(Asa.ancestry, previousTargetAttributeValue);
            newAttributes = {
                ancestry: {
                    name: 'ancestry',
                    value: newAncestry
                },
				givenName: {
                    name: 'givenName',
                    value: generateGivenName(Asa.givenName, newAncestry, oldAttributes.gender.value)
                },
				familyName: {
                    name: 'familyName',
                    value: generateFamilyName(Asa.familyName, newAncestry, oldAttributes.gender.value)
                },
				race: {
                    name: 'race',
                    value: generateRace(Asa.race, newAncestry)
                }
            };
            break;
        case 'gender':
		    const newGender = chooseAttribute(Asa.gender, previousTargetAttributeValue);
			newAttributes = {
                gender: {
                    name: 'gender',
                    value: newGender
				},
				sexuality: {
                    name: 'sexuality',
                    value: generateSexuality(Asa.sexuality, newGender, oldAttributes.sexuality.value)
				},
				givenName: {
                    name: 'givenName',
                    value: generateGivenName(Asa.givenName, oldAttributes.ancestry.value, newGender, oldAttributes.givenName.value)
                }
            };
            break;
        case 'sexuality':
            newAttributes = {
                [targetAttribute]: {
                    name: 'sexuality',
                    value: generateSexuality(Asa.sexuality, oldAttributes.gender.value, previousTargetAttributeValue)
                }
            };
            break;
        case 'relationship':
            newAttributes = {
                [targetAttribute]: {
                    name: 'relationship',
                    value: generateRelationship(Asa.relationship, oldAttributes.age.value, previousTargetAttributeValue)
                }
            };
            break;
        case 'age':
            const newAge = chooseAttribute(Asa[targetAttribute], previousTargetAttributeValue);
            newAttributes = {
                age: {
                    name: 'age',
                    value: newAge
                },
                relationship: {
                    name: 'relationship',
                    value: generateRelationship(Asa.relationship, newAge, oldAttributes.relationship.value)
                }
            };
            break;
        default:
            newAttributes = {
                [targetAttribute]: {
                    name: targetAttribute,
                    value: chooseAttribute(Asa[targetAttribute], previousTargetAttributeValue)
                }
            };
    }

    return {
        ...oldAttributes,
        ...newAttributes
    }
}
