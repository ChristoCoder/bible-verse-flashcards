const backupVerses = [
    {"verse": "He who has the Son has the life; he who does not have the Son of God does not have the life.", "reference": "1 John 5:12"},
    {"verse": "When Christ our life is manifested, then you also will be manifested with Him in glory.", "reference": "Col. 3:4"},
    {"verse": "Jesus said to her, 'I am the resurrection and the life; he who believes into Me, even if he should die, shall live; and everyone who lives and believes into Me shall by no means die forever. Do you believe this?'", "reference": "John 11:25"},
    {"verse": "Jesus said to him, 'I am the way and the reality and the life; no one comes to the Father except through Me.'", "reference": "John 14:6"},
    {"verse": "The thief comes only to steal and kill and destroy; I have come that they may have life and have it abundantly.", "reference": "John 10:10"},
    {"verse": "But when it pleased God, who set me apart from my mother’s womb and called me through His grace, To reveal His Son in me that I might announce Him as the gospel among the Gentiles", "reference": "Gal. 1:15-16a"},
    {"verse": "I am crucified with Christ; and it is no longer I who live, but it is Christ who lives in me; and the life which I now live in the flesh I live in faith, the faith of the Son of God, who loved me and gave Himself up for me.", "reference": "Gal. 2:20"},
    {"verse": "My children, with whom I travail again in birth until Christ is formed in you,", "reference": "Gal. 4:19"},
    {"verse": "According to my earnest expectation and hope that in nothing I will be put to shame, but with all boldness, as always, even now Christ will be magnified in my body, whether through life or through death.", "reference": "Phil. 1:20"},
    {"verse": "Until we all arrive at the oneness of the faith and of the full knowledge of the Son of God, at a full-grown man, at the measure of the stature of the fullness of Christ,", "reference": "Eph. 4:13"},
    {"verse": "Jesus answered and said to him, 'Truly, truly, I say to you, Unless one is born anew, he cannot see the kingdom of God.'", "reference": "John 3:3"},
    {"verse": "Jesus answered, Truly, truly, I say to you, Unless one is born of water and the Spirit, he cannot enter into the kingdom of God.", "reference": "John 3:5-6"},
    {"verse": "If anyone thirsts, let him come to Me and drink.", "reference": "John 7:37b"},
    {"verse": "But as many as received Him, to them He gave the authority to become children of God, to those who believe into His name,", "reference": "John 1:12-13"},
    {"verse": "Therefore if anyone is in Christ, he is a new creation. The old things have passed away; behold, they have become new.", "reference": "2 Cor. 5:17"},
    {"verse": "I will also give you a new heart, and a new spirit I will put within you; and I will take away the heart of stone out of your flesh, and I will give you a heart of flesh.", "reference": "Ezek. 36:26"},
    {"verse": "For it is God who operates in you both the willing and the working for His good pleasure.", "reference": "Phil. 2:13"},
    {"verse": "I am crucified with Christ; and it is no longer I who live, but it is Christ who lives in me;", "reference": "Gal. 2:20a"},
    {"verse": "But the anointing which you have received from Him abides in you, and you have no need that anyone teach you; but as His anointing teaches you concerning all things and is true and is not a lie, and even as it has taught you, abide in Him.", "reference": "1 John 2:27"},
    {"verse": "For the law of the Spirit of life has freed me in Christ Jesus from the law of sin and of death.", "reference": "Rom. 8:2"},
    {"verse": "For to be fleshly minded is death, but to be spiritually minded is life and peace.", "reference": "Rom. 8:6"},
    {"verse": "The Spirit Himself witnesses with our spirit that we are children of God.", "reference": "Rom. 8:16"},
    {"verse": "For I know that in me, that is, in my flesh, nothing good dwells; for to will is present with me, but to work out the good is not.", "reference": "Rom. 7:18-21"},
    {"verse": "But now we have been discharged from the law, having died to that in which we were held, so that we serve in newness of spirit and not in oldness of letter.", "reference": "Rom. 7:6"},
    {"verse": "For the law of the Spirit of life has freed me in Christ Jesus from the law of sin and of death.", "reference": "Rom. 8:2"},
    {"verse": "For this is the covenant which I will make with the house of Israel after those days, says the Lord: I will impart My laws into their mind, and on their hearts I will inscribe them;", "reference": "Heb. 8:10"},
    {"verse": "This is the covenant which I will covenant with them after those days, says the Lord: I will impart My laws upon their hearts, and upon their minds I will inscribe them,", "reference": "Heb. 10:16"},
    {"verse": "That which was from the beginning, which we have heard, which we have seen with our eyes, which we have beheld and our hands have handled, concerning the Word of life", "reference": "1 John 1:1-3"},
    {"verse": "And this is the message which we have heard from Him and announce to you, that God is light and in Him is no darkness at all. If we say that we have fellowship with Him and yet walk in the darkness, we lie and are not practicing the truth; But if we walk in the light as He is in the light, we have fellowship with one another, and the blood of Jesus His Son cleanses us from every sin.", "reference": "1 John 1:5-7"}
];

let verses = [];
let currentVerse = {};
let score = 0;
const totalQuestions = 20;
let questionsAsked = 0;

// Load verses from a JSON file (assuming verses.json)
fetch('verses.json')
    .then(response => response.json())
    .then(data => {
        verses = data;
        showFlashcard();
    })
    .catch(error => {
        console.error('Error fetching verses:', error);
    });

function showFlashcard() {
    if (questionsAsked >= totalQuestions) {
        alert(`Quiz completed! Your score is ${score}/${totalQuestions}`);
        return;
    }

    if (verses.length === 0) {
        alert("You've exhausted all available verses. Starting over...");
        verses = JSON.parse(JSON.stringify(backupVerses));
    }

    currentVerse = getRandomVerse();
    document.getElementById('verse').textContent = currentVerse.verse;

    let options = [];
    options.push(currentVerse.reference);

    while (options.length < 4) {
        let randomVerse = getRandomVerse().reference;
        if (!options.includes(randomVerse)) {
            options.push(randomVerse);
        }
    }

    options = shuffle(options);

    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';
    options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => checkAnswer(button);
        optionsDiv.appendChild(button);
    });

    document.getElementById('next').style.display = 'none';
}

function getRandomVerse() {
    const randomIndex = Math.floor(Math.random() * verses.length);
    return verses[randomIndex];
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function checkAnswer(selectedButton) {
    const selectedReference = selectedButton.textContent;

    if (selectedReference === currentVerse.reference) {
        score++;
        document.getElementById('score').textContent = `Score: ${score}`;
        selectedButton.classList.add('correct');
    } else {
        const correctButton = Array.from(document.getElementById('options').children)
            .find(button => button.textContent === currentVerse.reference);
        correctButton.classList.add('correct');
        selectedButton.classList.add('wrong');
    }

    Array.from(document.getElementById('options').children)
        .forEach(button => button.disabled = true);

    document.getElementById('next').style.display = 'block';

    // Remove used verse from the array
    verses = verses.filter(verse => verse.reference !== currentVerse.reference);
}

document.getElementById('next').addEventListener('click', () => {
    questionsAsked++;
    showFlashcard();

    Array.from(document.getElementById('options').children)
        .forEach(button => {
            button.classList.remove('correct', 'wrong');
            button.disabled = false;
        });

    document.getElementById('next').style.display = 'none';
});

document.getElementById('replay').addEventListener('click', () => {
    score = 0;
    questionsAsked = 0;
    document.getElementById('score').textContent = 'Score: 0';
    verses = JSON.parse(JSON.stringify(backupVerses));
    showFlashcard();
    document.getElementById('flashcard').style.display = 'block';
    document.getElementById('versesList').style.display = 'none';
    document.getElementById('next').style.display = 'none';
    document.getElementById('replay').style.display = 'block';
});

document.getElementById('viewVerses').addEventListener('click', () => {
    const versesListDiv = document.getElementById('versesList');
    versesListDiv.innerHTML = '';

    verses.forEach(verse => {
        const verseItem = document.createElement('p');
        verseItem.textContent = `${verse.reference}: ${verse.verse}`;
        versesListDiv.appendChild(verseItem);
    });

    // Initialize the "Back" button
    const backButton = document.createElement('button');
    backButton.textContent = 'Back';
    backButton.id = 'backToGame';
    versesListDiv.appendChild(backButton);

    document.getElementById('flashcard').style.display = 'none';
    document.getElementById('versesList').style.display = 'block';
    document.getElementById('next').style.display = 'none';
    document.getElementById('replay').style.display = 'none';
});

// Add event listener for the "Back" button
document.addEventListener('click', (event) => {
    if (event.target && event.target.id === 'backToGame') {
        document.getElementById('flashcard').style.display = 'block';
        document.getElementById('versesList').style.display = 'none';
        document.getElementById('next').style.display = 'none';
        document.getElementById('replay').style.display = 'block';
    }
});