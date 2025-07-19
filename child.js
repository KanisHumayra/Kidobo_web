// KIDOBO Child Interface JavaScript

class ChildInterface {
    constructor() {
        this.currentUser = null;
        this.currentStory = null;
        this.currentPage = 0;
        this.isMuted = false;
        this.isPlaying = false;
        this.userStats = {
            booksRead: 0,
            totalStars: 0,
            readingTime: 0,
            gamesPlayed: 0,
            achievements: []
        };
        
        // Sample Stories Data
        this.stories = [
            {
                id: 1,
                title: "The Brave Little Mouse",
                category: "animals",
                ageGroup: "4-6",
                description: "A tiny mouse learns that courage comes in all sizes!",
                image: "🐭",
                pages: [
                    {
                        text: "Once upon a time, there was a little mouse named Max who lived in a cozy hole under a big oak tree.",
                        image: "🐭"
                    },
                    {
                        text: "Max was very small, but he had a big heart. He loved to help his friends in the forest.",
                        image: "🌳"
                    },
                    {
                        text: "One day, Max heard a loud noise. It was a big cat chasing a baby bird!",
                        image: "🐱"
                    },
                    {
                        text: "Even though Max was scared, he knew he had to help. He ran as fast as he could!",
                        image: "🏃"
                    },
                    {
                        text: "Max made such a loud squeak that the cat got scared and ran away!",
                        image: "😱"
                    },
                    {
                        text: "The baby bird was safe, and Max learned that being brave means helping others, no matter how small you are.",
                        image: "🦅"
                    }
                ],
                quiz: [
                    {
                        question: "What was the mouse's name?",
                        options: ["Max", "Tom", "Jerry", "Mickey"],
                        correct: 0
                    },
                    {
                        question: "What did Max save?",
                        options: ["A cat", "A baby bird", "A tree", "A house"],
                        correct: 1
                    },
                    {
                        question: "What did Max learn?",
                        options: ["To be afraid", "To hide", "To be brave", "To run away"],
                        correct: 2
                    }
                ]
            },
            {
                id: 2,
                title: "The Magic Garden",
                category: "fantasy",
                ageGroup: "7-8",
                description: "A magical garden where flowers can talk and dreams come true!",
                image: "🌸",
                pages: [
                    {
                        text: "In a hidden corner of the world, there was a garden where magic grew like flowers.",
                        image: "🌸"
                    },
                    {
                        text: "The flowers could talk and sing, and they loved to share stories with children who visited.",
                        image: "🌺"
                    },
                    {
                        text: "One day, a sad little girl named Lily found the garden. She had lost her favorite toy.",
                        image: "👧"
                    },
                    {
                        text: "The flowers felt her sadness and decided to help. They used their magic to find her toy!",
                        image: "🧸"
                    },
                    {
                        text: "Lily was so happy! She promised to visit the garden every day and share her own stories.",
                        image: "😊"
                    }
                ],
                quiz: [
                    {
                        question: "What could the flowers do?",
                        options: ["Dance", "Talk and sing", "Fly", "Cook"],
                        correct: 1
                    },
                    {
                        question: "What was the girl's name?",
                        options: ["Rose", "Lily", "Daisy", "Tulip"],
                        correct: 1
                    },
                    {
                        question: "What did the flowers help her find?",
                        options: ["A book", "Her toy", "A flower", "A friend"],
                        correct: 1
                    }
                ]
            },
            {
                id: 3,
                title: "The Space Adventure",
                category: "science",
                ageGroup: "9-10",
                description: "Join Captain Star on an exciting journey through the solar system!",
                image: "🚀",
                pages: [
                    {
                        text: "Captain Star and her crew were on a mission to explore the planets of our solar system.",
                        image: "🚀"
                    },
                    {
                        text: "First, they visited Mercury, the closest planet to the Sun. It was very hot!",
                        image: "☀️"
                    },
                    {
                        text: "Next was Venus, covered in thick clouds. The crew had to be very careful.",
                        image: "🌫️"
                    },
                    {
                        text: "Then they reached Earth, our beautiful blue planet with oceans and continents.",
                        image: "🌍"
                    },
                    {
                        text: "Mars was red and dusty, with the biggest volcano in the solar system!",
                        image: "🔴"
                    },
                    {
                        text: "The crew learned that each planet is unique and special, just like every child on Earth.",
                        image: "⭐"
                    }
                ],
                quiz: [
                    {
                        question: "What was the captain's name?",
                        options: ["Captain Moon", "Captain Star", "Captain Sun", "Captain Planet"],
                        correct: 1
                    },
                    {
                        question: "Which planet is closest to the Sun?",
                        options: ["Venus", "Earth", "Mercury", "Mars"],
                        correct: 2
                    },
                    {
                        question: "What color is Mars?",
                        options: ["Blue", "Green", "Red", "Yellow"],
                        correct: 2
                    }
                ]
            }
        ];

        // Sample Games Data
        this.games = {
            'word-match': {
                title: 'Word Match',
                description: 'Match words with their meanings',
                words: [
                    { word: 'Brave', meaning: 'Not afraid' },
                    { word: 'Magic', meaning: 'Special powers' },
                    { word: 'Adventure', meaning: 'Exciting journey' },
                    { word: 'Friendship', meaning: 'Being good friends' },
                    { word: 'Courage', meaning: 'Being brave' },
                    { word: 'Wonder', meaning: 'Amazing feeling' }
                ]
            },
            'vocabulary-quiz': {
                title: 'Vocabulary Quiz',
                description: 'Test your word knowledge',
                questions: [
                    {
                        question: 'What does "courage" mean?',
                        options: ['Being afraid', 'Being brave', 'Being sad', 'Being happy'],
                        correct: 1
                    },
                    {
                        question: 'What is a "journey"?',
                        options: ['A book', 'A trip', 'A game', 'A song'],
                        correct: 1
                    },
                    {
                        question: 'What does "magical" mean?',
                        options: ['Very big', 'Very small', 'Like magic', 'Very fast'],
                        correct: 2
                    },
                    {
                        question: 'What is "friendship"?',
                        options: ['Being alone', 'Being friends', 'Being angry', 'Being tired'],
                        correct: 1
                    }
                ]
            },
            'story-completion': {
                title: 'Story Completion',
                description: 'Fill in the missing words',
                story: "Once upon a time, there was a little ___ named Max. He lived in a cozy ___ under a big oak tree. Max was very ___, but he had a big heart. He loved to help his ___ in the forest.",
                blanks: ['mouse', 'hole', 'small', 'friends']
            },
            'reading-challenge': {
                title: 'Reading Challenge',
                description: 'Speed reading with comprehension',
                text: "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet. Reading quickly helps you understand stories better. Practice makes perfect!",
                timeLimit: 30
            }
        };

        this.init();
    }

    init() {
        this.loadUserData();
        this.setupEventListeners();
        this.loadStories();
        this.updateUI();
        this.hideLoadingScreen();
    }

    loadUserData() {
        const savedUser = localStorage.getItem('kidoboCurrentUser');
        const savedStats = localStorage.getItem('kidoboChildStats');
        
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
        } else {
            // Redirect to main page if no user
            window.location.href = 'index.html';
            return;
        }
        
        if (savedStats) {
            this.userStats = JSON.parse(savedStats);
        }
    }

    saveUserData() {
        localStorage.setItem('kidoboChildStats', JSON.stringify(this.userStats));
    }

    setupEventListeners() {
        // Navigation
        document.getElementById('homeBtn').addEventListener('click', () => this.showPage('homePage'));
        document.getElementById('libraryBtn').addEventListener('click', () => this.showPage('libraryPage'));
        document.getElementById('gamesBtn').addEventListener('click', () => this.showPage('gamesPage'));
        document.getElementById('profileBtn').addEventListener('click', () => this.showPage('profilePage'));

        // Logout
        document.getElementById('logoutBtn').addEventListener('click', () => this.logout());
        
        // Back to Main
        document.getElementById('backToMainBtn').addEventListener('click', () => this.backToMain());

        // Avatar change
        document.getElementById('changeAvatarBtn').addEventListener('click', () => this.showModal('avatarModal'));

        // Quick games
        document.querySelectorAll('.game-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const gameType = e.currentTarget.dataset.game;
                this.startGame(gameType);
            });
        });

        // Library filters
        document.getElementById('ageFilter').addEventListener('change', () => this.filterStories());
        document.getElementById('categoryFilter').addEventListener('change', () => this.filterStories());
        document.getElementById('searchInput').addEventListener('input', () => this.filterStories());

        // Game cards
        document.querySelectorAll('.game-card .play-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const gameType = e.currentTarget.closest('.game-card').dataset.game;
                this.startGame(gameType);
            });
        });

        // Modal close buttons
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modal = e.currentTarget.closest('.modal');
                this.closeModal(modal.id);
            });
        });

        // Avatar selection
        document.querySelectorAll('.avatar-option').forEach(option => {
            option.addEventListener('click', (e) => {
                document.querySelectorAll('.avatar-option').forEach(opt => opt.classList.remove('selected'));
                e.currentTarget.classList.add('selected');
            });
        });

        // Save avatar
        document.getElementById('saveAvatarBtn').addEventListener('click', () => this.saveAvatar());
        document.getElementById('cancelAvatarBtn').addEventListener('click', () => this.closeModal('avatarModal'));

        // Story reader controls
        document.getElementById('prevPageBtn').addEventListener('click', () => this.previousPage());
        document.getElementById('nextPageBtn').addEventListener('click', () => this.nextPage());
        document.getElementById('playNarrationBtn').addEventListener('click', () => this.toggleNarration());
        document.getElementById('completeStoryBtn').addEventListener('click', () => this.completeStory());

        // Celebration close
        document.getElementById('closeCelebrationBtn').addEventListener('click', () => this.closeModal('celebrationModal'));
    }

    showPage(pageId) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
        
        // Show selected page
        document.getElementById(pageId).classList.add('active');
        
        // Update navigation
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        
        // Load page-specific content
        if (pageId === 'libraryPage') {
            this.loadStories();
        } else if (pageId === 'profilePage') {
            this.loadProfile();
        }
    }

    loadStories() {
        const storiesGrid = document.getElementById('storiesGrid');
        storiesGrid.innerHTML = '';

        this.stories.forEach(story => {
            const storyCard = document.createElement('div');
            storyCard.className = 'story-card';
            storyCard.innerHTML = `
                <div class="story-image">
                    <div class="story-placeholder">${story.image}</div>
                </div>
                <div class="story-content">
                    <h3>${story.title}</h3>
                    <p>${story.description}</p>
                    <div class="story-meta">
                        <span class="story-category">${story.category}</span>
                        <span class="story-age">Ages ${story.ageGroup}</span>
                    </div>
                    <button class="btn-primary read-story-btn" data-story-id="${story.id}">Read Story</button>
                </div>
            `;
            
            storyCard.querySelector('.read-story-btn').addEventListener('click', () => {
                this.openStory(story.id);
            });
            
            storiesGrid.appendChild(storyCard);
        });
    }

    filterStories() {
        const ageFilter = document.getElementById('ageFilter').value;
        const categoryFilter = document.getElementById('categoryFilter').value;
        const searchInput = document.getElementById('searchInput').value.toLowerCase();

        const storyCards = document.querySelectorAll('.story-card');
        
        storyCards.forEach(card => {
            const storyId = parseInt(card.querySelector('.read-story-btn').dataset.storyId);
            const story = this.stories.find(s => s.id === storyId);
            
            const ageMatch = ageFilter === 'all' || story.ageGroup === ageFilter;
            const categoryMatch = categoryFilter === 'all' || story.category === categoryFilter;
            const searchMatch = story.title.toLowerCase().includes(searchInput) || 
                              story.description.toLowerCase().includes(searchInput);
            
            if (ageMatch && categoryMatch && searchMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    openStory(storyId) {
        this.currentStory = this.stories.find(s => s.id === storyId);
        this.currentPage = 0;
        
        document.getElementById('storyReaderTitle').textContent = this.currentStory.title;
        this.showModal('storyReaderModal');
        this.loadStoryPage();
    }

    loadStoryPage() {
        const page = this.currentStory.pages[this.currentPage];
        document.getElementById('storyText').textContent = page.text;
        document.getElementById('currentPage').textContent = this.currentPage + 1;
        document.getElementById('totalPages').textContent = this.currentStory.pages.length;
        
        // Update navigation buttons
        document.getElementById('prevPageBtn').disabled = this.currentPage === 0;
        document.getElementById('nextPageBtn').disabled = this.currentPage === this.currentStory.pages.length - 1;
        
        // Show complete button on last page
        document.getElementById('completeStoryBtn').style.display = 
            this.currentPage === this.currentStory.pages.length - 1 ? 'block' : 'none';
    }

    nextPage() {
        if (this.currentPage < this.currentStory.pages.length - 1) {
            this.currentPage++;
            this.loadStoryPage();
        }
    }

    previousPage() {
        if (this.currentPage > 0) {
            this.currentPage--;
            this.loadStoryPage();
        }
    }

    toggleNarration() {
        if (this.isPlaying) {
            this.stopNarration();
        } else {
            this.playNarration();
        }
    }

    playNarration() {
        const page = this.currentStory.pages[this.currentPage];
        const utterance = new SpeechSynthesisUtterance(page.text);
        utterance.rate = 0.8;
        utterance.pitch = 1.2;
        
        speechSynthesis.speak(utterance);
        this.isPlaying = true;
        document.getElementById('playNarrationBtn').textContent = '⏸️';
    }

    stopNarration() {
        speechSynthesis.cancel();
        this.isPlaying = false;
        document.getElementById('playNarrationBtn').textContent = '🔊';
    }

    completeStory() {
        this.userStats.booksRead++;
        this.userStats.totalStars += 10;
        this.userStats.readingTime += 5;
        
        this.saveUserData();
        this.updateUI();
        
        this.closeModal('storyReaderModal');
        this.showCelebration('Story Completed!', 'You earned 10 stars! ⭐');
        
        // Check for achievements
        this.checkAchievements();
    }

    startGame(gameType) {
        const game = this.games[gameType];
        document.getElementById('gameTitle').textContent = game.title;
        
        const gameContainer = document.getElementById('gameContainer');
        gameContainer.innerHTML = this.createGameHTML(gameType, game);
        
        this.showModal('gameModal');
        this.setupGameEventListeners(gameType);
    }

    createGameHTML(gameType, game) {
        switch (gameType) {
            case 'word-match':
                return this.createWordMatchHTML(game);
            case 'vocabulary-quiz':
                return this.createVocabularyQuizHTML(game);
            case 'story-completion':
                return this.createStoryCompletionHTML(game);
            case 'reading-challenge':
                return this.createReadingChallengeHTML(game);
            default:
                return '<p>Game not found!</p>';
        }
    }

    createWordMatchHTML(game) {
        const shuffledWords = [...game.words].sort(() => Math.random() - 0.5);
        const shuffledMeanings = [...game.words].sort(() => Math.random() - 0.5);
        
        return `
            <div class="word-match-game">
                <p>Match each word with its meaning!</p>
                <div class="game-score">Score: <span id="wordMatchScore">0</span></div>
                <div class="words-container">
                    <div class="words-column">
                        <h4>Words</h4>
                        ${shuffledWords.map((item, index) => 
                            `<div class="word-item" data-word="${item.word}">${item.word}</div>`
                        ).join('')}
                    </div>
                    <div class="meanings-column">
                        <h4>Meanings</h4>
                        ${shuffledMeanings.map((item, index) => 
                            `<div class="meaning-item" data-meaning="${item.meaning}">${item.meaning}</div>`
                        ).join('')}
                    </div>
                </div>
                <button id="checkWordMatchBtn" class="btn-primary">Check Matches</button>
            </div>
        `;
    }

    createVocabularyQuizHTML(game) {
        return `
            <div class="vocabulary-quiz-game">
                <p>Answer the questions correctly!</p>
                <div class="game-score">Score: <span id="quizScore">0</span></div>
                <div id="quizQuestion" class="quiz-question">
                    <h4 id="questionText">${game.questions[0].question}</h4>
                    <div class="quiz-options">
                        ${game.questions[0].options.map((option, index) => 
                            `<button class="quiz-option" data-index="${index}">${option}</button>`
                        ).join('')}
                    </div>
                </div>
                <div id="quizResults" class="quiz-results" style="display: none;">
                    <h4>Quiz Complete!</h4>
                    <p>Your score: <span id="finalQuizScore">0</span>/${game.questions.length}</p>
                    <button id="playAgainBtn" class="btn-primary">Play Again</button>
                </div>
            </div>
        `;
    }

    createStoryCompletionHTML(game) {
        return `
            <div class="story-completion-game">
                <p>Fill in the missing words in the story!</p>
                <div class="game-score">Score: <span id="completionScore">0</span></div>
                <div class="story-text">
                    ${game.story.split('___').map((part, index) => 
                        index < game.blanks.length ? 
                        `${part}<input type="text" class="blank-input" data-correct="${game.blanks[index]}">` : 
                        part
                    ).join('')}
                </div>
                <button id="checkCompletionBtn" class="btn-primary">Check Answers</button>
            </div>
        `;
    }

    createReadingChallengeHTML(game) {
        return `
            <div class="reading-challenge-game">
                <p>Read the text quickly and answer questions!</p>
                <div class="game-score">Time: <span id="challengeTime">${game.timeLimit}</span>s</div>
                <div id="challengeText" class="challenge-text">
                    ${game.text}
                </div>
                <button id="startChallengeBtn" class="btn-primary">Start Challenge</button>
                <div id="challengeQuestions" class="challenge-questions" style="display: none;">
                    <h4>Answer these questions:</h4>
                    <div class="challenge-question">
                        <p>What does the sentence contain?</p>
                        <button class="challenge-option" data-correct="true">Every letter of the alphabet</button>
                        <button class="challenge-option" data-correct="false">Only vowels</button>
                        <button class="challenge-option" data-correct="false">Only consonants</button>
                    </div>
                </div>
            </div>
        `;
    }

    setupGameEventListeners(gameType) {
        switch (gameType) {
            case 'word-match':
                this.setupWordMatchListeners();
                break;
            case 'vocabulary-quiz':
                this.setupVocabularyQuizListeners();
                break;
            case 'story-completion':
                this.setupStoryCompletionListeners();
                break;
            case 'reading-challenge':
                this.setupReadingChallengeListeners();
                break;
        }
    }

    setupWordMatchListeners() {
        let selectedWord = null;
        let selectedMeaning = null;
        let score = 0;

        document.querySelectorAll('.word-item').forEach(item => {
            item.addEventListener('click', () => {
                document.querySelectorAll('.word-item').forEach(w => w.classList.remove('selected'));
                item.classList.add('selected');
                selectedWord = item.dataset.word;
            });
        });

        document.querySelectorAll('.meaning-item').forEach(item => {
            item.addEventListener('click', () => {
                document.querySelectorAll('.meaning-item').forEach(m => m.classList.remove('selected'));
                item.classList.add('selected');
                selectedMeaning = item.dataset.meaning;
            });
        });

        document.getElementById('checkWordMatchBtn').addEventListener('click', () => {
            if (selectedWord && selectedMeaning) {
                const wordObj = this.games['word-match'].words.find(w => w.word === selectedWord);
                if (wordObj && wordObj.meaning === selectedMeaning) {
                    score += 10;
                    document.getElementById('wordMatchScore').textContent = score;
                    this.showNotification('Correct match! +10 points', 'success');
                } else {
                    this.showNotification('Try again!', 'error');
                }
                selectedWord = null;
                selectedMeaning = null;
                document.querySelectorAll('.word-item, .meaning-item').forEach(item => 
                    item.classList.remove('selected')
                );
            }
        });
    }

    setupVocabularyQuizListeners() {
        let currentQuestion = 0;
        let score = 0;
        const questions = this.games['vocabulary-quiz'].questions;

        function showQuestion() {
            const question = questions[currentQuestion];
            document.getElementById('questionText').textContent = question.question;
            document.querySelectorAll('.quiz-option').forEach((option, index) => {
                option.textContent = question.options[index];
                option.classList.remove('correct', 'incorrect');
            });
        }

        document.querySelectorAll('.quiz-option').forEach(option => {
            option.addEventListener('click', () => {
                const selectedIndex = parseInt(option.dataset.index);
                const question = questions[currentQuestion];
                
                if (selectedIndex === question.correct) {
                    score++;
                    option.classList.add('correct');
                    this.showNotification('Correct! +1 point', 'success');
                } else {
                    option.classList.add('incorrect');
                    this.showNotification('Wrong answer!', 'error');
                }
                
                document.getElementById('quizScore').textContent = score;
                
                setTimeout(() => {
                    currentQuestion++;
                    if (currentQuestion < questions.length) {
                        showQuestion();
                    } else {
                        this.showQuizResults();
                    }
                }, 1000);
            });
        });

        document.getElementById('playAgainBtn').addEventListener('click', () => {
            currentQuestion = 0;
            score = 0;
            document.getElementById('quizScore').textContent = '0';
            document.getElementById('quizQuestion').style.display = 'block';
            document.getElementById('quizResults').style.display = 'none';
            showQuestion();
        });
    }

    showQuizResults() {
        const score = parseInt(document.getElementById('quizScore').textContent);
        document.getElementById('finalQuizScore').textContent = score;
        document.getElementById('quizQuestion').style.display = 'none';
        document.getElementById('quizResults').style.display = 'block';
        
        this.userStats.totalStars += score * 5;
        this.saveUserData();
        this.updateUI();
    }

    setupStoryCompletionListeners() {
        document.getElementById('checkCompletionBtn').addEventListener('click', () => {
            const inputs = document.querySelectorAll('.blank-input');
            let score = 0;
            
            inputs.forEach(input => {
                const correct = input.dataset.correct.toLowerCase();
                const answer = input.value.toLowerCase();
                
                if (answer === correct) {
                    input.classList.add('correct');
                    score += 10;
                } else {
                    input.classList.add('incorrect');
                }
            });
            
            document.getElementById('completionScore').textContent = score;
            this.userStats.totalStars += score;
            this.saveUserData();
            this.updateUI();
            
            this.showNotification(`Score: ${score} points!`, 'success');
        });
    }

    setupReadingChallengeListeners() {
        let timeLeft = this.games['reading-challenge'].timeLimit;
        let timer = null;

        document.getElementById('startChallengeBtn').addEventListener('click', () => {
            document.getElementById('startChallengeBtn').style.display = 'none';
            document.getElementById('challengeQuestions').style.display = 'block';
            
            timer = setInterval(() => {
                timeLeft--;
                document.getElementById('challengeTime').textContent = timeLeft;
                
                if (timeLeft <= 0) {
                    clearInterval(timer);
                    this.showNotification('Time\'s up!', 'error');
                }
            }, 1000);
        });

        document.querySelectorAll('.challenge-option').forEach(option => {
            option.addEventListener('click', () => {
                clearInterval(timer);
                const isCorrect = option.dataset.correct === 'true';
                
                if (isCorrect) {
                    const score = timeLeft * 2;
                    document.getElementById('challengeScore').textContent = score;
                    this.userStats.totalStars += score;
                    this.saveUserData();
                    this.updateUI();
                    this.showNotification(`Great job! Score: ${score}`, 'success');
                } else {
                    this.showNotification('Wrong answer!', 'error');
                }
            });
        });
    }

    loadProfile() {
        document.getElementById('profileName').textContent = this.currentUser.name;
        document.getElementById('profileAge').textContent = `Age: ${this.currentUser.age} years old`;
        document.getElementById('profileAvatar').textContent = this.currentUser.avatar;
        
        document.getElementById('profileBooksRead').textContent = this.userStats.booksRead;
        document.getElementById('profileTotalStars').textContent = this.userStats.totalStars;
        document.getElementById('profileReadingTime').textContent = `${this.userStats.readingTime} min`;
        document.getElementById('profileGamesPlayed').textContent = this.userStats.gamesPlayed;
    }

    saveAvatar() {
        const selectedAvatar = document.querySelector('.avatar-option.selected');
        if (selectedAvatar) {
            this.currentUser.avatar = selectedAvatar.dataset.avatar;
            localStorage.setItem('kidoboCurrentUser', JSON.stringify(this.currentUser));
            this.updateUI();
            this.closeModal('avatarModal');
            this.showNotification('Avatar updated!', 'success');
        }
    }

    checkAchievements() {
        const newAchievements = [];
        
        if (this.userStats.booksRead >= 1 && !this.userStats.achievements.includes('First Reader')) {
            newAchievements.push('First Reader');
        }
        if (this.userStats.booksRead >= 5 && !this.userStats.achievements.includes('Bookworm')) {
            newAchievements.push('Bookworm');
        }
        if (this.userStats.totalStars >= 100 && !this.userStats.achievements.includes('Star Collector')) {
            newAchievements.push('Star Collector');
        }
        if (this.userStats.readingTime >= 60 && !this.userStats.achievements.includes('Time Reader')) {
            newAchievements.push('Time Reader');
        }
        
        if (newAchievements.length > 0) {
            this.userStats.achievements.push(...newAchievements);
            this.saveUserData();
            this.showAchievementUnlocked(newAchievements);
        }
    }

    showAchievementUnlocked(achievements) {
        const achievementNames = achievements.join(', ');
        this.showCelebration('Achievement Unlocked!', `You earned: ${achievementNames} 🏆`);
    }

    updateUI() {
        // Update welcome section
        document.getElementById('welcomeName').textContent = this.currentUser.name;
        document.getElementById('welcomeAvatar').textContent = this.currentUser.avatar;
        
        // Update stats
        document.getElementById('booksRead').textContent = this.userStats.booksRead;
        document.getElementById('totalStarsHome').textContent = this.userStats.totalStars;
        document.getElementById('totalStars').textContent = this.userStats.totalStars;
        document.getElementById('readingTime').textContent = this.userStats.readingTime;
        document.getElementById('achievementsCount').textContent = this.userStats.achievements.length;
        
        // Update profile
        if (document.getElementById('profilePage').classList.contains('active')) {
            this.loadProfile();
        }
    }

    showModal(modalId) {
        document.getElementById(modalId).classList.add('show');
    }

    closeModal(modalId) {
        document.getElementById(modalId).classList.remove('show');
        
        // Stop narration if story reader is closed
        if (modalId === 'storyReaderModal') {
            this.stopNarration();
        }
    }

    showCelebration(title, message) {
        document.getElementById('celebrationTitle').textContent = title;
        document.getElementById('celebrationMessage').textContent = message;
        this.showModal('celebrationModal');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 5000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    logout() {
        localStorage.removeItem('kidoboCurrentUser');
        window.location.href = 'index.html';
    }

    backToMain() {
        window.location.href = 'index.html';
    }

    hideLoadingScreen() {
        setTimeout(() => {
            document.getElementById('loadingScreen').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('loadingScreen').style.display = 'none';
            }, 500);
        }, 1000);
    }
}

// Initialize the child interface
const childInterface = new ChildInterface(); 