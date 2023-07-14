/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;

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


const codeOfConduct = ['Anleitung für den Raum',
    'Schaut euch zuerst im Inneren um. Wenn ihr ins freie tretet findet ihr neben der Tür eine Einleitung und rechts unten eine Zusammenfassung.' +
    ' Weitere Elemente müsst ihr entdecken.', 'Es gibt einen Bereich, wo ihr eine zufällig ausgewählte Frage bekommt,' +
    ' die euch zur Reflektion dienen soll, bzw. wenn ihr mit mehreren den Jitsi-Raum im linken Außenbereich betretet, gemeinsam bearbeitet werden kann.','Der Jitsi Raum im unteren Außenbereich soll genutzt werden für Reflektionsgespräche über die Lernerfahrung, wenn man mehrere User auf der Map ist.\n',
    ,'Verhaltensregeln / Code of Conduct\n',
    '\n' +
    'Für die Etablierung einer produktiven Lernumgebung ist es uns wichtig, dass sich jeder Besucher in unserem Work Adventure-Raum wohl fühlt.',
    'Wir bitten euch um stets respektvollen und konstruktiven Umgang, wenn ihr euch hier begegnet. Die folgenden Regeln gelten uneingeschränkt für diesen Raum:\n',
    'Alle Menschen sind gleich und wir tolerieren keinen Rassismus, Sexismus, Klassismus, Antisemitismus oder andere Formen von Gruppen-bezogener Menschenfeindlichkeit.\n',
    'Wir heißen jeden Menschen in seiner Individualität willkommen, und tolerieren keine Beleidigungen, persönliche Anfeindungen, trans-feindliche Äußerungen wie z.B. Deadnaming.\n',
    'Wir begrüßen kritische Auseinandersetzungen um die Sache, wir tolerieren kein unsachliches Abgleiten von Debatten und bemühen uns solche Unterhaltungen auf den Kern zurückzuführen.\n',
    'Wir wollen, dass das Lernen positiv erfahren wird und möchten daher, dass ihr diesen Raum nur freiwillig in aufgeschlossener Stimmung erkundet und nicht zB weil ihr euch im Rahmen eines Seminars genötigt fühlt.\n',
    'Wir wünschen eine angenehme Lernerfahrung.\n'];

// Zufällige Frage auswählen
function getRandomQuestion() {
    const randomIndex = Math.floor(Math.random() * reflectionQuestions.length);
    return reflectionQuestions[randomIndex];
}



// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

    WA.room.area.onEnter('Reflektionsfragen').subscribe(() => {
        WA.chat.open();
        WA.chat.sendChatMessage(getRandomQuestion(), 'Sarah und Ingmar');
    });

    WA.room.area.onLeave('Reflektionsfragen').subscribe(() => WA.chat.close());


    WA.room.area.onEnter('codeOfConduct').subscribe(() => {
        WA.chat.open();
        codeOfConduct.forEach((message) => {
            if(message != null) WA.chat.sendChatMessage(message, 'Sarah und Ingmar');
        })

    });

    WA.room.area.onLeave('codeOfConduct').subscribe(() => WA.chat.close());

    WA.room.area.onEnter('clock').subscribe(() => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        currentPopup = WA.ui.openPopup("clockPopup", "It's " + time, []);
    })

    WA.room.area.onLeave('clock').subscribe(closePopup)

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
