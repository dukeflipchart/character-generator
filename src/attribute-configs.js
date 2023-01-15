/**
 * Configs that describe how to turn character attributes into human-readable
 * sentences.
 * A js Map was used, because it's an iterable and a key-value store
 * at the same time.
 * If the need for i18n arises, create separate attributeConfigs for each
 * language.
 */

export const attributeConfigs = new Map([
    ['name', {
        template: '%givenName% %familyName%'
    }],
    ['description', {
        template: '%INDEFINITE_ARTICLE% %age% %race% %gender% of %ancestry% descent',
    }],
    ['job', {
        template: '%competency% %job%',
        label: 'job' 
    }],
    ['appearance', {
        template: '%appearance1%, %appearance2%',
        label: 'appearance' 
    }],
    ['mood', {
        template: '%mood%',
        label: 'current mood' 
    }],
    ['speechStyle', {
        template: '%speechStyle%',
        label: 'speech style' 
    }],
    ['personality', {
        template: '%personality1%, %personality2%',
        label: 'personality' 
    }],
    ['lifeGoal', {
        template: '%motivation%',
        label: 'life goal' 
    }],
    ['relationships', {
        template: '%sexuality%, %relationship%',
        label: 'relationships'
    }]
]);
