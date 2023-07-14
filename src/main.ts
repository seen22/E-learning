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

// Zufällige Frage auswählen
function getRandomQuestion() {
    const randomIndex = Math.floor(Math.random() * reflectionQuestions.length);
    return reflectionQuestions[randomIndex];
}

// Popup anzeigen
function showRandomQuestion() {
    const question = getRandomQuestion();
    currentPopup = WA.ui.openPopup("reflectionPopup", question, []);
}

function showCodeOfConductPopup() {
    const popupContent = `
    <div>
      <h2>Anleitung für den Raum</h2>
      <p>Schaut euch zuerst im inneren um, wenn ihr ins freie tretet findet ihr neben der Tür eine Einleitung und rechts unten eine Zusammenfassung. Weitere Elemente müsst ihr entdecken. Es gibt einen Bereich, wo ihr eine zufällig ausgewählte Frage bekommt, die euch zur Reflektion dienen soll, bzw. wenn ihr mit mehreren den Jitsi-Raum im linken Außenbereich betretet, gemeinsam bearbeitet werden kann. Der Jitsi Raum im unteren Außenbereich soll genutzt werden für Reflektionsgespräche über die Lernerfahrung, wenn man mehrere User auf der Map ist.</p>
    
      <h2>Verhaltensregeln / Code of Conduct</h2>
      <p>Für die Etablierung einer produktiven Lernumgebung ist es uns wichtig, dass sich jeder Besucher in unserem Work Adventure-Raum wohl fühlt. Wir bitten euch um stets respektvollen und konstruktiven Umgang, wenn ihr euch hier begegnet. Die folgenden Regeln gelten uneingeschränkt für diesen Raum:</p>
      
      <ul>
        <li>Alle Menschen sind gleich und wir tolerieren keinen Rassismus, Sexismus, Klassismus, Antisemitismus oder andere Formen von Gruppen-bezogener Menschenfeindlichkeit.</li>
        <li>Wir heißen jeden Menschen in seiner Individualität willkommen und tolerieren keine Beleidigungen, persönliche Anfeindungen, trans-feindliche Äußerungen wie z.B. Deadnaming.</li>
        <li>Wir begrüßen kritische Auseinandersetzungen um die Sache, wir tolerieren kein unsachliches Abgleiten von Debatten und bemühen uns solche Unterhaltungen auf den Kern zurückzuführen.</li>
        <li>Wir wollen, dass das Lernen positiv erfahren wird und möchten daher, dass ihr diesen Raum nur freiwillig in aufgeschlossener Stimmung erkundet und nicht zB weil ihr euch im Rahmen eines Seminars genötigt fühlt.</li>
      </ul>
      
      <p>Wir wünschen eine angenehme Lernerfahrung.</p>
    </div>
  `;

    currentPopup = WA.ui.openPopup("codeOfConductPopup", popupContent, []);
}

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

    WA.room.area.onEnter('Reflektionsfragen').subscribe(() => {
        showRandomQuestion();
    });

    WA.room.area.onLeave('Reflektionsfragen').subscribe(closePopup);


    WA.room.area.onEnter('codeOfConduct').subscribe(() => {
        showCodeOfConductPopup();
    });

    WA.room.area.onLeave('codeOfConduct').subscribe(closePopup);

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
