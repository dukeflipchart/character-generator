import Asa from './asa';

const chooseAttribute = (pool, excludedValue) => {
    pool = pool.filter(option => option.name !== excludedValue);
    let sumWeights = 0;
    for (let index in pool) {
        sumWeights += pool[index].weight ? pool[index].weight : 1;
    }
    let winner = Math.floor(Math.random() * sumWeights);
    for (let index in pool) {
        winner -= pool[index].weight ? pool[index].weight : 1;
        if (winner < 0) {

            return pool[index].name;
        }
    }
}

const generateSexuality = (options, gender, oldValue) => {
    if (gender === 'cis male' || gender === 'trans male' || gender === 'cis female' || gender === 'trans female') { gender = 'MaleFemale'; }
    if (gender === 'genderfluid' || gender === 'agender') { gender = 'GenderfluidAgender'; }

    return chooseValue(options[gender], oldValue);
}

const generateRelationship = (options, age, oldValue) => {
    if (['adult', 'middle-aged', 'old', 'very old'].includes(age)) { age = 'older'; }

    return chooseValue(options[age], oldValue);
}

const generateGivenName = (options, ancestry, gender, oldValue) => {
    if (gender === 'cis male' || gender === 'trans male') { gender = 'Masculine'; }
    if (gender === 'cis female' || gender === 'trans female') { gender = 'Feminine'; }
    if (gender === 'genderfluid') { gender = (Math.random() >= 0.5) ? 'Masculine' : 'Feminine'; }

    return chooseValue(options[ancestry][gender], oldValue);
}

const generateFamilyName = (options, ancestry, oldValue) => chooseValue(options[ancestry], oldValue);
const generateRace = (options, ancestry, oldValue) => chooseValue(options[ancestry], oldValue);

export const generateCharacter = () => {
    const character = {
        gender: {
            name: 'gender',
            value: chooseValue(Asa.gender)
        },
        ancestry: {
            name: 'ancestry',
            value: chooseValue(Asa.ancestry)
        },
        age: {
            name: 'age',
            value: chooseValue(Asa.age)
        },
        motivation: {
            name: 'motivation',
            value: chooseValue(Asa.motivation)
        },
        usualMood: {
            name: 'usualMood',
            value: chooseValue(Asa.usualMood)
        },
        outlook: {
            name: 'outlook',
            value: chooseValue(Asa.outlook)
        },
        integrity: {
            name: 'integrity',
            value: chooseValue(Asa.integrity)
        },
        impulsiveness: {
            name: 'impulsiveness',
            value: chooseValue(Asa.impulsiveness)
        },
        friendliness: {
            name: 'friendliness',
            value: chooseValue(Asa.friendliness)
        },
        conformity: {
            name: 'conformity',
            value: chooseValue(Asa.conformity)
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
            const newAncestry = chooseValue(Asa.ancestry, previousTargetAttributeValue);
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
		    const newGender = chooseValue(Asa.gender, previousTargetAttributeValue);
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
            const newAge = chooseValue(Asa[targetAttribute], previousTargetAttributeValue);
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
                    value: chooseValue(Asa[targetAttribute], previousTargetAttributeValue)
                }
            };
    }

    return {
        ...oldAttributes,
        ...newAttributes
    }
}
