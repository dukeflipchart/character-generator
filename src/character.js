import Asa from './asa';

const chooseAttribute = (pool, excludedTexts, excludedTags) => {
    if (excludedTexts) {
        pool = pool.filter(option => !excludedTexts.includes(option.text));
    }
    if (excludedTags) {
        pool = pool.filter(option => option.tags.filter(tag => !excludedTags.includes(tag)).length);
    }
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
    let relationshipAge = age;
    if (['adult', 'middle-aged', 'old', 'very old'].includes(age)) { relationshipAge = 'older'; }

    return chooseAttribute(options[relationshipAge], excludedText);
}

const generateGivenName = (options, ancestry, gender, excludedText) => {
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
        gender: chooseAttribute(Asa.gender),
        ancestry: chooseAttribute(Asa.ancestry),
        age: chooseAttribute(Asa.age),
        motivation: chooseAttribute(Asa.motivation),
        mood: chooseAttribute(Asa.mood),
        appearance1: chooseAttribute(Asa.appearance),
        personality1: chooseAttribute(Asa.personality),
        job: chooseAttribute(Asa.job)
    }
    character.sexuality = generateSexuality(Asa.sexuality, character.gender.text);
    character.givenName = generateGivenName(Asa.givenName, character.ancestry.text, character.gender.text);
    character.familyName = generateFamilyName(Asa.familyName, character.ancestry.text);
    character.race = generateRace(Asa.race, character.ancestry.text);
    character.relationship = generateRelationship(Asa.relationship, character.age.text);
    character.appearance2 = chooseAttribute(Asa.appearance, [character.appearance1.text], character.appearance1.tags);
    character.personality2 = chooseAttribute(Asa.personality, [character.personality1.text], character.personality1.tags);
    
    return character;
}

export const reshuffle = (oldAttributes, targetAttribute) => {
	let previousTargetAttribute = oldAttributes[targetAttribute];

	let newAttributes;
	switch(targetAttribute) {
        case 'givenName':
            newAttributes = {
                givenName: generateGivenName(Asa.givenName, oldAttributes.ancestry.text, oldAttributes.gender.text, [previousTargetAttribute.text])
            };
            break;
        case 'familyName':
            newAttributes = {
                familyName: generateFamilyName(Asa.familyName, oldAttributes.ancestry.text, [previousTargetAttribute.text])
            };
            break;
        case 'race':
            newAttributes = {
                race: generateRace(Asa.race, oldAttributes.ancestry.text, [previousTargetAttribute.text])
            };
            break;
        case 'ancestry':
            const newAncestry = chooseAttribute(Asa.ancestry, [previousTargetAttribute.text]);
            newAttributes = {
                ancestry: newAncestry,
				givenName: generateGivenName(Asa.givenName, newAncestry.text, oldAttributes.gender.text),
				familyName: generateFamilyName(Asa.familyName, newAncestry.text, oldAttributes.gender.text),
				race: generateRace(Asa.race, newAncestry.text)
            };
            break;
        case 'gender':
		    const newGender = chooseAttribute(Asa.gender, [previousTargetAttribute.text]);
			newAttributes = {
                gender: newGender,
				sexuality: generateSexuality(Asa.sexuality, newGender.text, oldAttributes.sexuality.text),
				givenName: generateGivenName(Asa.givenName, oldAttributes.ancestry.text, newGender.text)
            };
            break;
        case 'sexuality':
            newAttributes = {
                sexuality: generateSexuality(Asa.sexuality, oldAttributes.gender.text, [previousTargetAttribute.text])
            };
            break;
        case 'relationship':
            newAttributes = {
                relationship: generateRelationship(Asa.relationship, oldAttributes.age.text, [previousTargetAttribute.text])
            };
            break;
        case 'age':
            const newAge = chooseAttribute(Asa[targetAttribute], [previousTargetAttribute.text]);
            newAttributes = {
                age: newAge,
                relationship: generateRelationship(Asa.relationship, newAge.text)
            };
            break;
        case 'appearance1':
            newAttributes = {
                appearance1: chooseAttribute(Asa.appearance, [previousTargetAttribute.text, oldAttributes.appearance2.text], [...previousTargetAttribute.tags, ...oldAttributes.appearance2.tags])
            };
            break;
        case 'appearance2':
            newAttributes = {
                appearance2: chooseAttribute(Asa.appearance, [previousTargetAttribute.text, oldAttributes.appearance1.text], [...previousTargetAttribute.tags, ...oldAttributes.appearance1.tags])
            };
            break;
        case 'personality1':
            newAttributes = {
                personality1: chooseAttribute(Asa.personality, [previousTargetAttribute.text, oldAttributes.personality2.text], [...previousTargetAttribute.tags, ...oldAttributes.personality2.tags])
            };
            break;
        case 'personality2':
            newAttributes = {
                personality2: chooseAttribute(Asa.personality, [previousTargetAttribute.text, oldAttributes.personality1.text], [...previousTargetAttribute.tags, ...oldAttributes.personality1.tags])
            };
            break;
        default:
            newAttributes = {
                [targetAttribute]: chooseAttribute(Asa[targetAttribute], [previousTargetAttribute.text])
            };
    }

    return {
        ...oldAttributes,
        ...newAttributes
    }
}
