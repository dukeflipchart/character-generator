import Asa from './asa';
import Cyberpunk from './cyberpunk';

const chooseAttribute = (options, excludedTexts, excludedTags) => {
    if (!options || !options.length) { return false; }
    if (excludedTexts) { options = options.filter(option => !excludedTexts.includes(option.text)); }
    if (excludedTags) { options = options.filter(option => option.tags.filter(tag => !excludedTags.includes(tag)).length); }

    let sumWeights = 0;
    for (let index in options) {
        sumWeights += options[index].weight ? options[index].weight : 1;
    }

    let winner = Math.floor(Math.random() * sumWeights);
    for (let index in options) {
        winner -= options[index].weight ? options[index].weight : 1;
        if (winner < 0) {
            
            return options[index];
        }
    }
}

const generateSexuality = (options, gender, excludedText) => {
    if (!options) { return false; }
    let sexualityGender = '';
    if (gender === 'cis male' || gender === 'trans male' || gender === 'cis female' || gender === 'trans female') { sexualityGender = 'MaleFemale'; }
    if (gender === 'genderfluid' || gender === 'agender') { sexualityGender = 'GenderfluidAgender'; }

    return options[sexualityGender].length
        ? chooseAttribute(options[sexualityGender], excludedText)
        : false;
}

const generateRelationship = (options, age, excludedText) => {
    if (!options) { return false; }
    let relationshipAge = age;
    if (['adult', 'middle-aged', 'old', 'very old'].includes(age)) { relationshipAge = 'older'; }

    return options[relationshipAge].length
        ? chooseAttribute(options[relationshipAge], excludedText)
        : false;
}

const generateGivenName = (options, ancestry, gender, excludedText) => {
    if (!options || !options[ancestry]) { return false; }
    let nameGender = '';
    if (gender === 'cis male' || gender === 'trans male') { nameGender = 'Masculine'; }
    if (gender === 'cis female' || gender === 'trans female') { nameGender = 'Feminine'; }
    if (gender === 'genderfluid') { nameGender = (Math.random() >= 0.5) ? 'Masculine' : 'Feminine'; }
    if (gender === 'agender') { nameGender = 'Agender'; }

    return options[ancestry][nameGender].length
        ? chooseAttribute(options[ancestry][nameGender], excludedText)
        : false;
}

const generateFamilyName = (options, ancestry, excludedText) => {
    if (!options || !options[ancestry]) { return false; }
    
    return options[ancestry].length
        ? chooseAttribute(options[ancestry], excludedText)
        : false;
}

const generateRace = (options, ancestry, excludedText) => {
    if (!options || !options[ancestry]) { return false; }
    
    return options[ancestry].length
        ? chooseAttribute(options[ancestry], excludedText)
        : false;
}

export const generateCharacter = (worldName) => {
    let world = {};
    switch (worldName) {
        case 'Cyberpunk':
            world = Cyberpunk;
            break;
        default:
            world = Asa;
    }
    const character = {
        customAttributes: {},
        gender: chooseAttribute(world.gender),
        ancestry: chooseAttribute(world.ancestry),
        age: chooseAttribute(world.age),
        motivation: chooseAttribute(world.motivation),
        mood: chooseAttribute(world.mood),
        appearance1: chooseAttribute(world.appearance),
        personality1: chooseAttribute(world.personality),
        competency: chooseAttribute(world.competency),
        job: chooseAttribute(world.job)
    }
    character.sexuality = generateSexuality(world.sexuality, character.gender.text);
    character.givenName = generateGivenName(world.givenName, character.ancestry.text, character.gender.text);
    character.familyName = generateFamilyName(world.familyName, character.ancestry.text);
    character.race = generateRace(world.race, character.ancestry.text);
    character.relationship = generateRelationship(world.relationship, character.age.text);
    character.appearance2 = chooseAttribute(world.appearance, [character.appearance1.text], character.appearance1.tags);
    character.personality2 = chooseAttribute(world.personality, [character.personality1.text], character.personality1.tags);

    return character;
}

export const setCustomAttribute = (character, customAttributeKey, customAttributeValue) => {
    return {
        ...character,
        customAttributes: {
            ...character.customAttributes,
            [customAttributeKey]: customAttributeValue
        }
    }
}

export const reshuffle = (worldName, oldAttributes, targetAttribute) => {
    let world = {};
    switch (worldName) {
        case 'Cyberpunk':
            world = Cyberpunk;
            break;
        default:
            world = Asa;
    }
    let previousTargetAttribute = oldAttributes[targetAttribute];

	let newAttributes;
	switch (targetAttribute) {
        case 'givenName':
            newAttributes = {
                givenName: generateGivenName(world.givenName, oldAttributes.ancestry.text, oldAttributes.gender.text, [previousTargetAttribute.text])
            };
            break;
        case 'familyName':
            newAttributes = {
                familyName: generateFamilyName(world.familyName, oldAttributes.ancestry.text, [previousTargetAttribute.text])
            };
            break;
        case 'race':
            newAttributes = {
                race: generateRace(world.race, oldAttributes.ancestry.text, [previousTargetAttribute.text])
            };
            break;
        case 'ancestry':
            const newAncestry = chooseAttribute(world.ancestry, [previousTargetAttribute.text]);
            newAttributes = {
                ancestry: newAncestry,
				givenName: generateGivenName(world.givenName, newAncestry.text, oldAttributes.gender.text),
				familyName: generateFamilyName(world.familyName, newAncestry.text, oldAttributes.gender.text),
				race: generateRace(world.race, newAncestry.text)
            };
            break;
        case 'gender':
		    const newGender = chooseAttribute(world.gender, [previousTargetAttribute.text]);
			newAttributes = {
                gender: newGender,
				sexuality: generateSexuality(world.sexuality, newGender.text, oldAttributes.sexuality.text),
				givenName: generateGivenName(world.givenName, oldAttributes.ancestry.text, newGender.text)
            };
            break;
        case 'sexuality':
            newAttributes = {
                sexuality: generateSexuality(world.sexuality, oldAttributes.gender.text, [previousTargetAttribute.text])
            };
            break;
        case 'relationship':
            newAttributes = {
                relationship: generateRelationship(world.relationship, oldAttributes.age.text, [previousTargetAttribute.text])
            };
            break;
        case 'age':
            const newAge = chooseAttribute(world[targetAttribute], [previousTargetAttribute.text]);
            newAttributes = {
                age: newAge,
                relationship: generateRelationship(world.relationship, newAge.text)
            };
            break;
        case 'appearance1':
            newAttributes = {
                appearance1: chooseAttribute(world.appearance, [previousTargetAttribute.text, oldAttributes.appearance2.text], [...previousTargetAttribute.tags, ...oldAttributes.appearance2.tags])
            };
            break;
        case 'appearance2':
            newAttributes = {
                appearance2: chooseAttribute(world.appearance, [previousTargetAttribute.text, oldAttributes.appearance1.text], [...previousTargetAttribute.tags, ...oldAttributes.appearance1.tags])
            };
            break;
        case 'personality1':
            newAttributes = {
                personality1: chooseAttribute(world.personality, [previousTargetAttribute.text, oldAttributes.personality2.text], [...previousTargetAttribute.tags, ...oldAttributes.personality2.tags])
            };
            break;
        case 'personality2':
            newAttributes = {
                personality2: chooseAttribute(world.personality, [previousTargetAttribute.text, oldAttributes.personality1.text], [...previousTargetAttribute.tags, ...oldAttributes.personality1.tags])
            };
            break;
        default:
            newAttributes = {
                [targetAttribute]: chooseAttribute(world[targetAttribute], [previousTargetAttribute.text])
            };
    }

    return {
        ...oldAttributes,
        ...newAttributes
    }
}
