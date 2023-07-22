/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
console.log('Script started successfully');

// Array mit den 10 Reflektionsfragen
const reflectionQuestions = [
    "Wie könnten OER dazu beitragen, den Zugang zu Bildung in benachteiligten Gemeinschaften oder Regionen zu verbessern?",
    "Welche Möglichkeiten bieten OER, um individuelles und personalisiertes Lernen zu fördern?",
    "Wie könnten Lehrende die Qualität von OER sicherstellen und sicherstellen, dass die Materialien den Bedürfnissen der Lernenden entsprechen?",
    "Welche Auswirkungen könnten OER auf traditionelle Verlage und die Art und Weise haben, wie Lehrbücher erstellt und verbreitet werden?",
    "Inwiefern können OER dazu beitragen, kulturelle Vielfalt und lokale Inhalte in die Bildung einzubeziehen?",
    "Wie könnten OER genutzt werden, um die Zusammenarbeit und den Austausch von bewährten Praktiken zwischen Lehrenden auf globaler Ebene zu fördern?",
    "Welche Rolle spielt die digitale Kompetenz bei der effektiven Nutzung und Anpassung von OER?",
    "Wie könnten OER dazu beitragen, die Schülerbeteiligung und das Engagement in verschiedenen Bildungsbereichen zu steigern?",
    "Welche Herausforderungen und Chancen ergeben sich durch die Verwendung von OER im Bereich der beruflichen Aus- und Weiterbildung?",
    "Wie könnten Bildungsinstitutionen und Regierungen die Integration von OER in Bildungssysteme fördern und unterstützen?"
];


let currentPopup: any = undefined;

function getRandomQuestion() {
    const randomIndex = Math.floor(Math.random() * reflectionQuestions.length);
    return reflectionQuestions[randomIndex];
}

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ', WA.player.tags)

    WA.room.area.onEnter('Reflektionsfragen').subscribe(() => {
        currentPopup = WA.ui.openPopup("reflectionPopUp", getRandomQuestion(), [{
            label: 'Close', // Button label
            className: 'primary', // Button class (primary, secondary, etc.)
            callback: closePopup // Button callback function
        }]);
    });

    WA.room.area.onLeave('Reflektionsfragen').subscribe(() => {
        closePopup();
    });



    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

function closePopup(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

export {};
