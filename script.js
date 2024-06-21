const backupVerses = [
    {
        "verse": "For the word of God is living and operative and sharper than any two-edged sword, and piercing even to the dividing of soul and spirit and of joints and marrow, and able to discern the thoughts and intentions of the heart.",
        "reference": "Heb. 4:12"
    },
    {
        "verse": "Then Jesus said to His disciples, If anyone wants to come after Me, let him deny himself and take up his cross and follow Me. For whoever wants to save his soul-life shall lose it; but whoever loses his soul-life for My sake shall find it.",
        "reference": "Matt. 16:24-25"
    },
    {
        "verse": "But a soulish man does not receive the things of the Spirit of God, for they are foolishness to him and he is not able to know [them] because they are discerned spiritually. But the spiritual man discerns all things, but he himself is discerned by no one.",
        "reference": "1 Cor. 2:14-15"
    },
    {
        "verse": "And He said to [them] all, If anyone wants to come after Me, let him deny himself and take up his cross daily and follow Me. For whoever wants to save his soul-life shall lose it; but whoever loses his soul-life for My sake, this one shall save it. For what is a man profited if he gains the whole world but loses or forfeits himself?",
        "reference": "Luke 9:23-25"
    },
    {
        "verse": "For who among men knows the things of man, except the spirit of man which is in him? In the same way, the things of God also no one has known except the Spirit of God.",
        "reference": "1 Cor. 2:11"
    },
    {
        "verse": "Because of this we have been comforted. And in addition to our comfort, we rejoiced more abundantly over the joy of Titus, because his spirit has been refreshed by all of you.",
        "reference": "2 Cor. 7:13"
    },
    {
        "verse": "And when these things were fulfilled, Paul purposed in his spirit to pass through Macedonia and Achaia and go to Jerusalem, saying, After I have been there, I must also see Rome.",
        "reference": "Acts 19:21"
    },
    {
        "verse": "For I know that in me, that is, in my flesh, nothing good dwells; for to will is present with me, but to work out the good is not.",
        "reference": "Rom. 7:18"
    },
    {
        "verse": "For the mind set on the flesh is death, but the mind set on the spirit is life and peace. Because the mind set on the flesh is enmity against God; for it is not subject to the law of God, for neither can it be.",
        "reference": "Rom. 8:6-7"
    },
    {
        "verse": "And Jehovah said, My Spirit will not strive with man forever, for he indeed is flesh; so his days will be one hundred twenty years.",
        "reference": "Gen. 6:3"
    },
    {
        "verse": "Knowing this, that our old man has been crucified with [Him] in order that the body of sin might be annulled, that we should no longer serve sin as slaves;",
        "reference": "Rom. 6:6"
    },
    {
        "verse": "But they who are of Christ Jesus have crucified the flesh with its passions and its lusts.",
        "reference": "Gal. 5:24"
    },
    {
        "verse": "For if you live according to the flesh, you must die, but if by the Spirit you put to death the practices of the body, you will live.",
        "reference": "Rom. 8:13"
    },
    {
        "verse": "Knowing this, that our old man has been crucified with [Him] in order that the body of sin might be annulled, that we should no longer serve sin as slaves;",
        "reference": "Rom. 6:6"
    },
    {
        "verse": "I am crucified with Christ; and [it is] no longer I [who] live, but [it is] Christ [who] lives in me; and the [life] which I now live in the flesh I live in faith, the [faith] of the Son of God, who loved me and gave Himself up for me.",
        "reference": "Gal. 2:20"
    },
    {
        "verse": "But they who are of Christ Jesus have crucified the flesh with its passions and its lusts.",
        "reference": "Gal. 5:24"
    },
    {
        "verse": "So also you, reckon yourselves to be dead to sin, but living to God in Christ Jesus.",
        "reference": "Rom. 6:11"
    },
    {
        "verse": "From that time Jesus began to show to His disciples that He must go to Jerusalem and suffer many things from the elders and chief priests and scribes and be killed and on the third day be raised. And Peter took Him aside and began to rebuke Him, saying, [God] be merciful to You, Lord! This shall by no means happen to You! But He turned and said to Peter, Get behind Me, Satan! You are a stumbling block to Me, for you are not setting your mind on the things of God, but on the things of men. Then Jesus said to His disciples, If anyone wants to come after Me, let him deny himself and take up his cross and follow Me. For whoever wants to save his soul-life shall lose it; but whoever loses his soul-life for My sake shall find it. For what shall a man be profited if he gains the whole world, but forfeits his soul-life? Or what shall a man give in exchange for his soul-life?",
        "reference": "Matt. 16:21-26"
    },
    {
        "verse": "For what is a man profited if he gains the whole world but loses or forfeits himself?",
        "reference": "Luke 9:25"
    },
    {
        "verse": "But their eyes were kept from recognizing Him.",
        "reference": "Luke 24:16"
    }
]
;

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