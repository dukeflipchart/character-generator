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
    let relationshipAge = age;
    if (['adult', 'middle-aged', 'old', 'very old'].includes(age)) { relationshipAge = 'older'; }

    return chooseAttribute(options[relationshipAge], excludedText);
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
        gender: chooseAttribute(Asa.gender),
        ancestry: chooseAttribute(Asa.ancestry),
        age: chooseAttribute(Asa.age),
        motivation: chooseAttribute(Asa.motivation),
        usualMood: chooseAttribute(Asa.usualMood)
    }
    character.sexuality = generateSexuality(Asa.sexuality, character.gender.text);
    character.givenName = generateGivenName(Asa.givenName, character.ancestry.text, character.gender.text);
    character.familyName = generateFamilyName(Asa.familyName, character.ancestry.text);
    character.race = generateRace(Asa.race, character.ancestry.text);
    character.relationship = generateRelationship(Asa.relationship, character.age.text);
    
    return character;
}

export const reshuffle = (oldAttributes, targetAttribute) => {
	let previousTargetAttributeText = oldAttributes[targetAttribute].text;

	let newAttributes;
	switch(targetAttribute) {
        case 'givenName':
            newAttributes = {
                givenName: generateGivenName(Asa.givenName, oldAttributes.ancestry.text, oldAttributes.gender.text, previousTargetAttributeText)
            };
            break;
        case 'familyName':
            newAttributes = {
                familyName: generateFamilyName(Asa.familyName, oldAttributes.ancestry.text, previousTargetAttributeText)
            };
            break;
        case 'race':
            newAttributes = {
                race: generateRace(Asa.race, oldAttributes.ancestry.text, previousTargetAttributeText)
            };
            break;
        case 'ancestry':
            const newAncestry = chooseAttribute(Asa.ancestry, previousTargetAttributeText);
            newAttributes = {
                ancestry: newAncestry,
				givenName: generateGivenName(Asa.givenName, newAncestry.text, oldAttributes.gender.text),
				familyName: generateFamilyName(Asa.familyName, newAncestry.text, oldAttributes.gender.text),
				race: generateRace(Asa.race, newAncestry.text)
            };
            break;
        case 'gender':
		    const newGender = chooseAttribute(Asa.gender, previousTargetAttributeText);
			newAttributes = {
                gender: newGender,
				sexuality: generateSexuality(Asa.sexuality, newGender.text, oldAttributes.sexuality.text),
				givenName: generateGivenName(Asa.givenName, oldAttributes.ancestry.text, newGender.text)
            };
            break;
        case 'sexuality':
            newAttributes = {
                sexuality: generateSexuality(Asa.sexuality, oldAttributes.gender.text, previousTargetAttributeText)
            };
            break;
        case 'relationship':
            newAttributes = {
                relationship: generateRelationship(Asa.relationship, oldAttributes.age.text, previousTargetAttributeText)
            };
            break;
        case 'age':
            const newAge = chooseAttribute(Asa[targetAttribute], previousTargetAttributeText);
            newAttributes = {
                age: newAge,
                relationship: generateRelationship(Asa.relationship, newAge.text)
            };
            break;
        default:
            newAttributes = {
                [targetAttribute]: chooseAttribute(Asa[targetAttribute], previousTargetAttributeText)
            };
    }

    return {
        ...oldAttributes,
        ...newAttributes
    }
}
