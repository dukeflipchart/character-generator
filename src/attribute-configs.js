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
        label: 'mood' 
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
