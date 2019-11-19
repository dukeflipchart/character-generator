import Asa from './asa';

const chooseValue = (pool, oldValue) => {
    // taking the last value out of the pool so we get a new one every time
    pool = pool.filter(option => option.name !== oldValue);
    let sumWeights = 0;
    for (let index in pool) {
        //console.log("option.weight: " + pool[index].weight);
        sumWeights += pool[index].weight ? pool[index].weight : 1;
    }
    //console.log("sumWeights: " + sumWeights);
    let winner = Math.floor(Math.random() * sumWeights);
    //console.log("winner: " + winner);
    for (let index in pool) {
        winner -= pool[index].weight ? pool[index].weight : 1;
        //console.log("weight: " + pool[index].weight + ", winner is reduced to: " + winner)
        if (winner < 0) {
            return pool[index].name;
        }
    }
}

const generateSexuality = (options, gender, oldValue) => {
    if (gender === 'Cis male' || gender === 'Trans male' || gender === 'Cis female' || gender === 'Trans female') { gender = 'MaleFemale'; }
    if (gender === 'Genderfluid' || gender === 'Agender') { gender = 'GenderfluidAgender'; }

    return chooseValue(options[gender], oldValue);
}

const generateGivenName = (options, ancestry, gender, oldValue) => {
    if (gender === 'Cis male' || gender === 'Trans male') { gender = 'Masculine'; }
    if (gender === 'Cis female' || gender === 'Trans female') { gender = 'Feminine'; }
    if (gender === 'Genderfluid') { gender = (Math.random() >= 0.5) ? 'Masculine' : 'Feminine'; }

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
        boldness: {
            name: 'boldness',
            value: chooseValue(Asa.boldness)
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
            newAttributes = {
                [targetAttribute]: {
                    name: 'ancestry',
                    value: chooseValue(Asa.ancestry, previousTargetAttributeValue)
                }
            }, () => {
                this.reshuffle('givenName');
                this.reshuffle('familyName');
                this.reshuffle('race');
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
