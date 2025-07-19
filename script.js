// KIDOBO: Reading Made Fun - Main JavaScript File

// Global Variables
let currentUser = null;
let currentStory = null;
let currentPage = 0;
let isMuted = false;
let isPlaying = false;
let readingSpeed = 1;
let userStats = {
    booksRead: 0,
    totalStars: 0,
    readingTime: 0,
    achievements: []
};

// Sample Stories Data
const stories = [
    {
        id: 1,
        title: "The Brave Little Mouse",
        category: "animals",
        ageGroup: "4-6",
        description: "A tiny mouse learns that courage comes in all sizes!",
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
const games = {
    'word-match': {
        title: 'Word Match',
        description: 'Match words with their meanings',
        words: [
            { word: 'Brave', meaning: 'Not afraid' },
            { word: 'Magic', meaning: 'Special powers' },
            { word: 'Adventure', meaning: 'Exciting journey' },
            { word: 'Friendship', meaning: 'Being good friends' }
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
            }
        ]
    },
    'story-completion': {
        title: 'Story Completion',
        description: 'Complete the missing words',
        story: "Once upon a time, there was a little ___ who lived in a ___ house. Every day, the ___ would go to the ___ to play with friends.",
        blanks: ['mouse', 'cozy', 'mouse', 'forest']
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Hide loading screen after a short delay
    setTimeout(() => {
        document.getElementById('loadingScreen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loadingScreen').style.display = 'none';
        }, 500);
    }, 2000);

    // Load user data from localStorage
    loadUserData();
    
    // Set up event listeners
    setupEventListeners();
    
    // Load stories
    loadStories();
    
    // Load achievements
    loadAchievements();
    
    // Update UI
    updateUI();
}

function setupEventListeners() {
    // Navigation
    document.getElementById('homeBtn').addEventListener('click', () => showPage('homePage'));
    document.getElementById('libraryBtn').addEventListener('click', () => showPage('libraryPage'));
    document.getElementById('gamesBtn').addEventListener('click', () => showPage('gamesPage'));
    document.getElementById('profileBtn').addEventListener('click', () => showPage('profilePage'));
    
    // Home page buttons
    document.getElementById('startReadingBtn').addEventListener('click', () => showPage('libraryPage'));
    document.getElementById('exploreBtn').addEventListener('click', () => showPage('libraryPage'));
    
    // Login
    document.getElementById('loginBtn').addEventListener('click', showLoginModal);
    
    // Mute button
    document.getElementById('muteBtn').addEventListener('click', toggleMute);
    
    // Modal close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });
    
    // Login tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => switchLoginTab(e.target.dataset.tab));
    });
    
    // Login forms
    document.getElementById('childLoginForm').addEventListener('submit', handleChildLogin);
    document.getElementById('parentLoginForm').addEventListener('submit', handleParentLogin);
    document.getElementById('adminLoginForm').addEventListener('submit', handleAdminLogin);
    
    // Avatar selection
    document.getElementById('changeAvatarBtn').addEventListener('click', showAvatarModal);
    document.querySelectorAll('.avatar-option').forEach(option => {
        option.addEventListener('click', (e) => selectAvatar(e.target.dataset.avatar));
    });
    
    // Game cards
    document.querySelectorAll('.play-game-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const gameCard = e.target.closest('.game-card');
            const gameType = gameCard.dataset.game;
            startGame(gameType);
        });
    });
    
    // Filters
    document.getElementById('ageFilter').addEventListener('change', filterStories);
    document.getElementById('categoryFilter').addEventListener('change', filterStories);
    
    // Story reader controls
    document.getElementById('backToLibraryBtn').addEventListener('click', () => showPage('libraryPage'));
    document.getElementById('playPauseBtn').addEventListener('click', togglePlayPause);
    document.getElementById('speedBtn').addEventListener('click', changeSpeed);
    document.getElementById('muteStoryBtn').addEventListener('click', toggleStoryMute);
    document.getElementById('prevPageBtn').addEventListener('click', previousPage);
    document.getElementById('nextPageBtn').addEventListener('click', nextPage);
    document.getElementById('completeStoryBtn').addEventListener('click', completeStory);
    
    // Parent features
    document.getElementById('exportDataBtn').addEventListener('click', exportUserData);
    document.getElementById('setGoalsBtn').addEventListener('click', showGoalsModal);
    document.getElementById('viewHistoryBtn').addEventListener('click', showHistoryModal);
    
    // Admin features
    document.getElementById('addStoryBtn').addEventListener('click', showAddStoryModal);
    document.getElementById('manageUsersBtn').addEventListener('click', showManageUsersModal);
    document.getElementById('viewAnalyticsBtn').addEventListener('click', showAnalyticsModal);
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeAllModals();
        }
    });
}

function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    document.getElementById(pageId).classList.add('active');
    
    // Update navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Find and activate corresponding nav button
    const navBtnMap = {
        'homePage': 'homeBtn',
        'libraryPage': 'libraryBtn',
        'gamesPage': 'gamesBtn',
        'profilePage': 'profileBtn'
    };
    
    if (navBtnMap[pageId]) {
        document.getElementById(navBtnMap[pageId]).classList.add('active');
    }
}

function loadStories() {
    const storiesGrid = document.getElementById('storiesGrid');
    storiesGrid.innerHTML = '';
    
    stories.forEach(story => {
        const storyCard = createStoryCard(story);
        storiesGrid.appendChild(storyCard);
    });
}

function createStoryCard(story) {
    const card = document.createElement('div');
    card.className = 'story-card';
    card.innerHTML = `
        <div class="story-image">${story.pages[0].image}</div>
        <div class="story-info">
            <h3 class="story-title">${story.title}</h3>
            <div class="story-meta">
                <span>Age: ${story.ageGroup}</span> • 
                <span>Category: ${story.category}</span>
            </div>
            <p class="story-description">${story.description}</p>
            <div class="story-actions">
                <button class="btn-primary read-story-btn" data-story-id="${story.id}">Read Story</button>
                <button class="btn-secondary preview-story-btn" data-story-id="${story.id}">Preview</button>
            </div>
        </div>
    `;
    
    // Add event listeners
    card.querySelector('.read-story-btn').addEventListener('click', () => openStory(story.id));
    card.querySelector('.preview-story-btn').addEventListener('click', () => previewStory(story.id));
    
    return card;
}

function openStory(storyId) {
    currentStory = stories.find(s => s.id == storyId);
    currentPage = 0;
    
    if (currentStory) {
        showPage('storyReaderPage');
        loadStoryPage();
        updateStoryNavigation();
        
        // Auto-play narration
        setTimeout(() => {
            playNarration();
        }, 1000);
    }
}

function loadStoryPage() {
    const storyPages = document.getElementById('storyPages');
    storyPages.innerHTML = '';
    
    currentStory.pages.forEach((page, index) => {
        const pageDiv = document.createElement('div');
        pageDiv.className = `story-page ${index === currentPage ? 'active' : ''}`;
        pageDiv.innerHTML = `
            <div class="story-page-image">${page.image}</div>
            <div class="story-page-text">${page.text}</div>
        `;
        storyPages.appendChild(pageDiv);
    });
}

function updateStoryNavigation() {
    document.getElementById('currentPage').textContent = currentPage + 1;
    document.getElementById('totalPages').textContent = currentStory.pages.length;
    
    // Update button states
    document.getElementById('prevPageBtn').disabled = currentPage === 0;
    document.getElementById('nextPageBtn').disabled = currentPage === currentStory.pages.length - 1;
    
    // Show complete button on last page
    const completeBtn = document.getElementById('completeStoryBtn');
    if (currentPage === currentStory.pages.length - 1) {
        completeBtn.style.display = 'inline-block';
    } else {
        completeBtn.style.display = 'none';
    }
}

function nextPage() {
    if (currentPage < currentStory.pages.length - 1) {
        currentPage++;
        showCurrentPage();
        updateStoryNavigation();
        
        // Auto-play narration for new page
        setTimeout(() => {
            playNarration();
        }, 500);
    }
}

function previousPage() {
    if (currentPage > 0) {
        currentPage--;
        showCurrentPage();
        updateStoryNavigation();
        
        // Auto-play narration for new page
        setTimeout(() => {
            playNarration();
        }, 500);
    }
}

function showCurrentPage() {
    document.querySelectorAll('.story-page').forEach((page, index) => {
        page.classList.toggle('active', index === currentPage);
    });
}

function playNarration() {
    if (!isMuted && currentStory) {
        const currentText = currentStory.pages[currentPage].text;
        
        // Use Web Speech API for text-to-speech
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(currentText);
            utterance.rate = readingSpeed;
            utterance.pitch = 1.2; // Slightly higher pitch for children
            speechSynthesis.speak(utterance);
        }
        
        // Highlight words as they're spoken (simplified version)
        highlightWords(currentText);
    }
}

function highlightWords(text) {
    const textElement = document.querySelector('.story-page.active .story-page-text');
    if (textElement) {
        textElement.style.color = 'var(--primary-color)';
        setTimeout(() => {
            textElement.style.color = 'var(--text-primary)';
        }, 2000);
    }
}

function togglePlayPause() {
    isPlaying = !isPlaying;
    const btn = document.getElementById('playPauseBtn');
    
    if (isPlaying) {
        btn.textContent = '⏸️';
        playNarration();
    } else {
        btn.textContent = '▶️';
        speechSynthesis.cancel();
    }
}

function changeSpeed() {
    const speeds = [0.5, 1, 1.5, 2];
    const currentIndex = speeds.indexOf(readingSpeed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    readingSpeed = speeds[nextIndex];
    
    document.getElementById('speedBtn').textContent = `${readingSpeed}x`;
}

function toggleStoryMute() {
    isMuted = !isMuted;
    const btn = document.getElementById('muteStoryBtn');
    
    if (isMuted) {
        btn.textContent = '🔇';
        speechSynthesis.cancel();
    } else {
        btn.textContent = '🔊';
        playNarration();
    }
}

function toggleMute() {
    isMuted = !isMuted;
    const btn = document.getElementById('muteBtn');
    
    if (isMuted) {
        btn.textContent = '🔇';
        speechSynthesis.cancel();
    } else {
        btn.textContent = '🔊';
    }
}

function filterStories() {
    const ageFilter = document.getElementById('ageFilter').value;
    const categoryFilter = document.getElementById('categoryFilter').value;
    
    const filteredStories = stories.filter(story => {
        const ageMatch = ageFilter === 'all' || story.ageGroup === ageFilter;
        const categoryMatch = categoryFilter === 'all' || story.category === categoryFilter;
        return ageMatch && categoryMatch;
    });
    
    const storiesGrid = document.getElementById('storiesGrid');
    storiesGrid.innerHTML = '';
    
    filteredStories.forEach(story => {
        const storyCard = createStoryCard(story);
        storiesGrid.appendChild(storyCard);
    });
}

function startGame(gameType) {
    const game = games[gameType];
    if (game) {
        document.getElementById('gameTitle').textContent = game.title;
        document.getElementById('gameContainer').innerHTML = createGameHTML(gameType, game);
        showModal('gameModal');
        
        // Set up game-specific event listeners
        setupGameEventListeners(gameType);
    }
}

function createGameHTML(gameType, game) {
    switch (gameType) {
        case 'word-match':
            return createWordMatchHTML(game);
        case 'vocabulary-quiz':
            return createVocabularyQuizHTML(game);
        case 'story-completion':
            return createStoryCompletionHTML(game);
        default:
            return '<p>Game not found!</p>';
    }
}

function createWordMatchHTML(game) {
    const shuffledWords = [...game.words].sort(() => Math.random() - 0.5);
    const shuffledMeanings = [...game.words].sort(() => Math.random() - 0.5);
    
    let html = '<div class="word-match-game">';
    html += '<h4>Match each word with its meaning:</h4>';
    html += '<div class="word-match-container">';
    
    html += '<div class="words-column">';
    shuffledWords.forEach((wordObj, index) => {
        html += `<div class="word-item" data-word="${wordObj.word}">${wordObj.word}</div>`;
    });
    html += '</div>';
    
    html += '<div class="meanings-column">';
    shuffledMeanings.forEach((wordObj, index) => {
        html += `<div class="meaning-item" data-meaning="${wordObj.meaning}">${wordObj.meaning}</div>`;
    });
    html += '</div>';
    
    html += '</div>';
    html += '<button class="btn-primary check-answers-btn">Check Answers</button>';
    html += '</div>';
    
    return html;
}

function createVocabularyQuizHTML(game) {
    let html = '<div class="vocabulary-quiz">';
    html += '<div class="quiz-progress">Question <span id="currentQuestion">1</span> of <span id="totalQuestions">' + game.questions.length + '</span></div>';
    
    game.questions.forEach((question, index) => {
        html += `<div class="quiz-question ${index === 0 ? 'active' : ''}" data-question="${index}">`;
        html += `<h4>${question.question}</h4>`;
        html += '<div class="quiz-options">';
        question.options.forEach((option, optionIndex) => {
            html += `<button class="quiz-option" data-option="${optionIndex}">${option}</button>`;
        });
        html += '</div>';
        html += '</div>';
    });
    
    html += '<div class="quiz-results" style="display: none;">';
    html += '<h4>Quiz Results</h4>';
    html += '<div class="score-display"></div>';
    html += '<button class="btn-primary play-again-btn">Play Again</button>';
    html += '</div>';
    
    html += '</div>';
    
    return html;
}

function createStoryCompletionHTML(game) {
    let html = '<div class="story-completion">';
    html += '<h4>Complete the story by filling in the blanks:</h4>';
    html += '<div class="story-text">';
    
    let storyText = game.story;
    game.blanks.forEach((blank, index) => {
        storyText = storyText.replace('___', `<input type="text" class="blank-input" data-blank="${index}" placeholder="Type here...">`);
    });
    
    html += storyText;
    html += '</div>';
    html += '<button class="btn-primary check-story-btn">Check Story</button>';
    html += '</div>';
    
    return html;
}

function setupGameEventListeners(gameType) {
    switch (gameType) {
        case 'word-match':
            setupWordMatchListeners();
            break;
        case 'vocabulary-quiz':
            setupVocabularyQuizListeners();
            break;
        case 'story-completion':
            setupStoryCompletionListeners();
            break;
    }
}

function setupWordMatchListeners() {
    let selectedWord = null;
    let selectedMeaning = null;
    let matchedPairs = 0;
    const totalPairs = games['word-match'].words.length;
    
    document.querySelectorAll('.word-item').forEach(item => {
        item.addEventListener('click', function() {
            if (this.classList.contains('matched')) return;
            
            document.querySelectorAll('.word-item').forEach(w => w.classList.remove('selected'));
            this.classList.add('selected');
            selectedWord = this.dataset.word;
            checkMatch();
        });
    });
    
    document.querySelectorAll('.meaning-item').forEach(item => {
        item.addEventListener('click', function() {
            if (this.classList.contains('matched')) return;
            
            document.querySelectorAll('.meaning-item').forEach(m => m.classList.remove('selected'));
            this.classList.add('selected');
            selectedMeaning = this.dataset.meaning;
            checkMatch();
        });
    });
    
    function checkMatch() {
        if (selectedWord && selectedMeaning) {
            const game = games['word-match'];
            const correctMatch = game.words.find(w => w.word === selectedWord && w.meaning === selectedMeaning);
            
            if (correctMatch) {
                // Correct match
                document.querySelector(`[data-word="${selectedWord}"]`).classList.add('matched', 'correct');
                document.querySelector(`[data-meaning="${selectedMeaning}"]`).classList.add('matched', 'correct');
                
                matchedPairs++;
                addPoints(10);
                
                // Check if game is complete
                if (matchedPairs === totalPairs) {
                    setTimeout(() => {
                        showCelebration('Perfect! All words matched correctly! 🎉');
                        addPoints(50);
                    }, 500);
                }
                
                // Reset selection
                selectedWord = null;
                selectedMeaning = null;
            } else {
                // Incorrect match
                setTimeout(() => {
                    document.querySelectorAll('.word-item.selected, .meaning-item.selected').forEach(item => {
                        item.classList.remove('selected');
                    });
                    selectedWord = null;
                    selectedMeaning = null;
                }, 1000);
            }
        }
    }
}

function setupVocabularyQuizListeners() {
    let currentQuestionIndex = 0;
    let score = 0;
    const game = games['vocabulary-quiz'];
    
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.addEventListener('click', function() {
            const questionIndex = parseInt(this.closest('.quiz-question').dataset.question);
            const selectedOption = parseInt(this.dataset.option);
            const correctOption = game.questions[questionIndex].correct;
            
            // Disable all options in this question
            this.closest('.quiz-question').querySelectorAll('.quiz-option').forEach(opt => {
                opt.disabled = true;
                if (parseInt(opt.dataset.option) === correctOption) {
                    opt.classList.add('correct');
                } else if (opt === this && selectedOption !== correctOption) {
                    opt.classList.add('incorrect');
                }
            });
            
            if (selectedOption === correctOption) {
                score++;
                addPoints(10);
            }
            
            // Move to next question
            setTimeout(() => {
                currentQuestionIndex++;
                if (currentQuestionIndex < game.questions.length) {
                    showQuestion(currentQuestionIndex);
                } else {
                    showQuizResults();
                }
            }, 1500);
        });
    });
    
    function showQuestion(index) {
        document.querySelectorAll('.quiz-question').forEach((q, i) => {
            q.classList.toggle('active', i === index);
        });
        document.getElementById('currentQuestion').textContent = index + 1;
    }
    
    function showQuizResults() {
        document.querySelector('.vocabulary-quiz').style.display = 'none';
        document.querySelector('.quiz-results').style.display = 'block';
        
        const percentage = Math.round((score / game.questions.length) * 100);
        document.querySelector('.score-display').innerHTML = `
            <p>You got ${score} out of ${game.questions.length} questions correct!</p>
            <p>Score: ${percentage}%</p>
        `;
        
        if (percentage >= 80) {
            addPoints(50);
            showCelebration('Excellent! Great job! 🏆');
        }
    }
    
    document.querySelector('.play-again-btn').addEventListener('click', () => {
        startGame('vocabulary-quiz');
    });
}

function setupStoryCompletionListeners() {
    document.querySelector('.check-story-btn').addEventListener('click', () => {
        const game = games['story-completion'];
        const inputs = document.querySelectorAll('.blank-input');
        let correctAnswers = 0;
        let totalBlanks = game.blanks.length;
        
        inputs.forEach((input, index) => {
            const userAnswer = input.value.toLowerCase().trim();
            const correctAnswer = game.blanks[index].toLowerCase();
            
            if (userAnswer === correctAnswer) {
                input.classList.add('correct');
                correctAnswers++;
                addPoints(5);
            } else {
                input.classList.add('incorrect');
                // Show correct answer
                input.value = game.blanks[index];
                input.classList.add('show-answer');
            }
        });
        
        const percentage = Math.round((correctAnswers / totalBlanks) * 100);
        
        // Show results
        setTimeout(() => {
            if (percentage >= 80) {
                addPoints(30);
                showCelebration('Excellent! You completed the story perfectly! 🏆');
            } else if (percentage >= 60) {
                addPoints(15);
                showCelebration('Good job! Keep practicing to improve! 📚');
            } else {
                showCelebration('Nice try! Review the story and try again! 💪');
            }
            
            // Track game completion
            trackEvent('game_completed', { 
                gameType: 'story-completion', 
                score: percentage 
            });
        }, 1000);
    });
}

function showModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
}

function showLoginModal() {
    showModal('loginModal');
}

function switchLoginTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabName);
    });
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.toggle('active', content.id === tabName + 'Login');
    });
}

function handleChildLogin(e) {
    e.preventDefault();
    
    const name = document.getElementById('childName').value;
    const age = document.getElementById('childAge').value;
    
    if (name && age) {
        currentUser = {
            id: Date.now(),
            type: 'child',
            name: name,
            age: age,
            avatar: '🐱',
            createdAt: new Date().toISOString()
        };
        
        localStorage.setItem('kidoboCurrentUser', JSON.stringify(currentUser));
        closeAllModals();
        
        // Redirect to child interface
        window.location.href = 'child.html';
    }
}

function handleParentLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('parentEmail').value;
    const password = document.getElementById('parentPassword').value;
    
    // Simple validation (in real app, this would connect to a backend)
    if (email && password) {
        currentUser = {
            id: Date.now(),
            type: 'parent',
            name: email.split('@')[0], // Use email prefix as name
            email: email,
            createdAt: new Date().toISOString()
        };
        
        localStorage.setItem('kidoboCurrentUser', JSON.stringify(currentUser));
        closeAllModals();
        
        // Redirect to parent interface
        window.location.href = 'parent.html';
    }
}

function handleAdminLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    
    // Simple validation (in real app, this would connect to a backend)
    if (username === 'admin' && password === 'admin123') {
        currentUser = {
            id: Date.now(),
            type: 'admin',
            name: 'Administrator',
            username: username,
            createdAt: new Date().toISOString()
        };
        
        localStorage.setItem('kidoboCurrentUser', JSON.stringify(currentUser));
        closeAllModals();
        
        // Redirect to admin interface
        window.location.href = 'admin.html';
    } else {
        alert('Invalid admin credentials. Try admin/admin123');
    }
}

function showAvatarModal() {
    showModal('avatarModal');
}

function selectAvatar(avatar) {
    if (currentUser) {
        currentUser.avatar = avatar;
        document.getElementById('userAvatar').textContent = avatar;
        saveUserData();
        closeAllModals();
    }
}

function addPoints(points) {
    userStats.totalStars += points;
    saveUserData();
    updateUI();
    
    // Show points animation
    showPointsAnimation(points);
}

function showPointsAnimation(points) {
    const pointsDiv = document.createElement('div');
    pointsDiv.className = 'points-animation';
    pointsDiv.textContent = `+${points} ⭐`;
    pointsDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--accent-color);
        color: var(--text-primary);
        padding: var(--spacing-sm) var(--spacing-md);
        border-radius: var(--border-radius-md);
        font-weight: bold;
        font-size: var(--font-size-large);
        z-index: 3000;
        animation: pointsFloat 2s ease-out forwards;
    `;
    
    document.body.appendChild(pointsDiv);
    
    setTimeout(() => {
        document.body.removeChild(pointsDiv);
    }, 2000);
}

function showCelebration(message) {
    const celebrationDiv = document.createElement('div');
    celebrationDiv.className = 'celebration';
    celebrationDiv.innerHTML = `
        <div class="celebration-content">
            <h3>${message}</h3>
            <div class="celebration-animation">
                🎉 🎊 🎈
            </div>
        </div>
    `;
    celebrationDiv.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 4000;
        animation: fadeIn 0.5s ease;
    `;
    
    document.body.appendChild(celebrationDiv);
    
    setTimeout(() => {
        document.body.removeChild(celebrationDiv);
    }, 3000);
}

function loadUserData() {
    const savedUser = localStorage.getItem('kidoboUser');
    const savedStats = localStorage.getItem('kidoboStats');
    
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
    }
    
    if (savedStats) {
        userStats = JSON.parse(savedStats);
    }
}

function saveUserData() {
    localStorage.setItem('kidoboUser', JSON.stringify(currentUser));
    localStorage.setItem('kidoboStats', JSON.stringify(userStats));
}

function updateUI() {
    if (currentUser) {
        document.getElementById('loginBtn').textContent = currentUser.name || currentUser.username || 'Profile';
        document.getElementById('userAvatar').textContent = currentUser.avatar || '🐱';
        
        // Show/hide role-specific features
        document.getElementById('parentFeatures').style.display = currentUser.type === 'parent' ? 'block' : 'none';
        document.getElementById('adminFeatures').style.display = currentUser.type === 'admin' ? 'block' : 'none';
        
        // Update stats
        document.getElementById('booksRead').textContent = userStats.booksRead;
        document.getElementById('totalStars').textContent = userStats.totalStars;
        document.getElementById('readingTime').textContent = userStats.readingTime;
    } else {
        document.getElementById('loginBtn').textContent = 'Login';
        document.getElementById('parentFeatures').style.display = 'none';
        document.getElementById('adminFeatures').style.display = 'none';
    }
}

function loadAchievements() {
    const achievements = [
        { name: 'First Reader', icon: '📖', description: 'Read your first story', earned: userStats.achievements.includes('First Reader') },
        { name: 'Bookworm', icon: '🐛', description: 'Read 5 stories', earned: userStats.achievements.includes('Bookworm') },
        { name: 'Star Collector', icon: '⭐', description: 'Earn 100 stars', earned: userStats.achievements.includes('Star Collector') },
        { name: 'Time Reader', icon: '⏰', description: 'Read for 60 minutes', earned: userStats.achievements.includes('Time Reader') },
        { name: 'Game Master', icon: '🎮', description: 'Play 3 different games', earned: false },
        { name: 'Perfect Score', icon: '🏆', description: 'Get 100% on a quiz', earned: false }
    ];
    
    const achievementsList = document.getElementById('achievementsList');
    achievementsList.innerHTML = '';
    
    achievements.forEach(achievement => {
        const achievementDiv = document.createElement('div');
        achievementDiv.className = `achievement-item ${achievement.earned ? 'earned' : ''}`;
        achievementDiv.innerHTML = `
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-name">${achievement.name}</div>
            <div class="achievement-description">${achievement.description}</div>
        `;
        achievementsList.appendChild(achievementDiv);
    });
}

function previewStory(storyId) {
    const story = stories.find(s => s.id == storyId);
    if (story) {
        const previewText = `Preview: ${story.title}\n\n${story.description}\n\nAge Group: ${story.ageGroup}\nCategory: ${story.category}\nPages: ${story.pages.length}`;
        alert(previewText);
    }
}

function completeStory() {
    if (currentStory && currentUser) {
        userStats.booksRead++;
        userStats.readingTime += Math.floor(Math.random() * 10) + 5; // 5-15 minutes
        addPoints(25);
        
        // Track completion
        trackEvent('story_completed', { 
            storyId: currentStory.id, 
            storyTitle: currentStory.title 
        });
        
        // Check for achievements
        checkAchievements();
        
        // Show completion celebration
        showCelebration(`Congratulations! You finished "${currentStory.title}"! 📚`);
        
        // Show quiz if available
        if (currentStory.quiz && currentStory.quiz.length > 0) {
            setTimeout(() => {
                if (confirm('Would you like to take a quiz about this story?')) {
                    startStoryQuiz();
                } else {
                    // Return to library after completion
                    setTimeout(() => {
                        showPage('libraryPage');
                    }, 1000);
                }
            }, 2000);
        } else {
            // Return to library after completion
            setTimeout(() => {
                showPage('libraryPage');
            }, 2000);
        }
        
        saveUserData();
    }
}

function startStoryQuiz() {
    if (!currentStory || !currentStory.quiz) return;
    
    const quiz = currentStory.quiz;
    let currentQuestion = 0;
    let score = 0;
    
    function showQuestion() {
        if (currentQuestion >= quiz.length) {
            showQuizResults();
            return;
        }
        
        const question = quiz[currentQuestion];
        const quizHTML = `
            <div class="story-quiz">
                <h4>Question ${currentQuestion + 1} of ${quiz.length}</h4>
                <p class="quiz-question-text">${question.question}</p>
                <div class="quiz-options">
                    ${question.options.map((option, index) => 
                        `<button class="quiz-option" data-option="${index}">${option}</button>`
                    ).join('')}
                </div>
            </div>
        `;
        
        document.getElementById('gameContainer').innerHTML = quizHTML;
        document.getElementById('gameTitle').textContent = `Quiz: ${currentStory.title}`;
        showModal('gameModal');
        
        // Add event listeners
        document.querySelectorAll('.quiz-option').forEach(option => {
            option.addEventListener('click', handleQuizAnswer);
        });
    }
    
    function handleQuizAnswer(e) {
        const selectedOption = parseInt(e.target.dataset.option);
        const correctOption = quiz[currentQuestion].correct;
        
        // Disable all options
        document.querySelectorAll('.quiz-option').forEach(opt => {
            opt.disabled = true;
            if (parseInt(opt.dataset.option) === correctOption) {
                opt.classList.add('correct');
            } else if (opt === e.target && selectedOption !== correctOption) {
                opt.classList.add('incorrect');
            }
        });
        
        if (selectedOption === correctOption) {
            score++;
            addPoints(10);
        }
        
        currentQuestion++;
        setTimeout(showQuestion, 1500);
    }
    
    function showQuizResults() {
        const percentage = Math.round((score / quiz.length) * 100);
        const resultsHTML = `
            <div class="quiz-results">
                <h4>Quiz Complete!</h4>
                <p>You got ${score} out of ${quiz.length} questions correct.</p>
                <p>Score: ${percentage}%</p>
                ${percentage >= 80 ? '<p class="excellent">Excellent! You really understood the story! 🏆</p>' : '<p>Good job! Keep reading to improve! 📚</p>'}
                <button class="btn-primary close-quiz-btn">Close</button>
            </div>
        `;
        
        document.getElementById('gameContainer').innerHTML = resultsHTML;
        
        if (percentage >= 80) {
            addPoints(50);
            showCelebration('Perfect score! You\'re a reading champion! 🎉');
        }
        
        // Track quiz completion
        trackEvent('quiz_completed', { 
            gameType: 'vocabulary-quiz', 
            score: percentage,
            questions: quiz.length
        });
        
        document.querySelector('.close-quiz-btn').addEventListener('click', closeAllModals);
    }
    
    showQuestion();
}

function checkAchievements() {
    const newAchievements = [];
    
    if (userStats.booksRead >= 1 && !userStats.achievements.includes('First Reader')) {
        newAchievements.push('First Reader');
        userStats.achievements.push('First Reader');
    }
    
    if (userStats.booksRead >= 5 && !userStats.achievements.includes('Bookworm')) {
        newAchievements.push('Bookworm');
        userStats.achievements.push('Bookworm');
    }
    
    if (userStats.totalStars >= 100 && !userStats.achievements.includes('Star Collector')) {
        newAchievements.push('Star Collector');
        userStats.achievements.push('Star Collector');
    }
    
    if (userStats.readingTime >= 60 && !userStats.achievements.includes('Time Reader')) {
        newAchievements.push('Time Reader');
        userStats.achievements.push('Time Reader');
    }
    
    if (newAchievements.length > 0) {
        showAchievementUnlocked(newAchievements);
        saveUserData();
        loadAchievements();
        
        // Track achievement unlock
        trackEvent('achievement_unlocked', { 
            achievements: newAchievements 
        });
    }
}

function showAchievementUnlocked(achievements) {
    const achievementNames = {
        'First Reader': '📖 First Reader',
        'Bookworm': '🐛 Bookworm',
        'Star Collector': '⭐ Star Collector',
        'Game Master': '🎮 Game Master',
        'Perfect Score': '🏆 Perfect Score',
        'Time Reader': '⏰ Time Reader'
    };
    
    const message = achievements.map(achievement => achievementNames[achievement] || achievement).join('\n');
    showCelebration(`Achievement Unlocked!\n\n${message}\n\nCongratulations! 🎉`);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes pointsFloat {
        0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -100px) scale(1.2);
        }
    }
    
    .word-match-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--spacing-lg);
        margin: var(--spacing-lg) 0;
    }
    
    .word-item, .meaning-item {
        padding: var(--spacing-md);
        border: 2px solid var(--accent-color);
        border-radius: var(--border-radius-md);
        cursor: pointer;
        transition: all var(--transition-fast);
        text-align: center;
    }
    
    .word-item:hover, .meaning-item:hover {
        background: var(--bg-accent);
    }
    
    .word-item.selected, .meaning-item.selected {
        background: var(--primary-color);
        color: white;
    }
    
    .word-item.correct, .meaning-item.correct {
        background: var(--success-color);
        border-color: var(--success-color);
        color: white;
    }
    
    .quiz-question {
        display: none;
    }
    
    .quiz-question.active {
        display: block;
    }
    
    .quiz-options {
        display: grid;
        gap: var(--spacing-md);
        margin: var(--spacing-lg) 0;
    }
    
    .quiz-option {
        padding: var(--spacing-md);
        border: 2px solid var(--accent-color);
        border-radius: var(--border-radius-md);
        background: white;
        cursor: pointer;
        transition: all var(--transition-fast);
        font-family: var(--font-family);
        font-size: var(--font-size-normal);
    }
    
    .quiz-option:hover {
        background: var(--bg-accent);
    }
    
    .quiz-option.correct {
        background: var(--success-color);
        border-color: var(--success-color);
        color: white;
    }
    
    .quiz-option.incorrect {
        background: var(--error-color);
        border-color: var(--error-color);
        color: white;
    }
    
    .quiz-option:disabled {
        cursor: not-allowed;
    }
    
    .story-text {
        font-size: var(--font-size-large);
        line-height: 1.8;
        margin: var(--spacing-lg) 0;
    }
    
    .blank-input {
        border: 2px solid var(--accent-color);
        border-radius: var(--border-radius-sm);
        padding: var(--spacing-sm);
        font-family: var(--font-family);
        font-size: var(--font-size-normal);
        width: 120px;
        text-align: center;
    }
    
    .blank-input.correct {
        border-color: var(--success-color);
        background: var(--success-color);
        color: white;
    }
    
    .blank-input.incorrect {
        border-color: var(--error-color);
        background: var(--error-color);
        color: white;
    }
    
    .achievement-item.earned {
        background: var(--success-color);
        color: white;
    }
    
    .celebration-content {
        background: white;
        padding: var(--spacing-xl);
        border-radius: var(--border-radius-xl);
        text-align: center;
        box-shadow: var(--shadow-lg);
    }
    
    .celebration-animation {
        font-size: 3rem;
        margin-top: var(--spacing-lg);
        animation: bounce 1s infinite;
    }
`;
document.head.appendChild(style); 

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeAllModals();
    }
    
    if (e.key === 'ArrowRight' && currentStory) {
        nextPage();
    }
    
    if (e.key === 'ArrowLeft' && currentStory) {
        previousPage();
    }
    
    if (e.key === ' ' && currentStory) {
        e.preventDefault();
        togglePlayPause();
    }
});

// Add touch support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0 && currentStory) {
            // Swipe left - next page
            nextPage();
        } else if (diff < 0 && currentStory) {
            // Swipe right - previous page
            previousPage();
        }
    }
}

// Add offline support
window.addEventListener('online', function() {
    showCelebration('You\'re back online! 🌐');
});

window.addEventListener('offline', function() {
    showCelebration('You\'re offline, but you can still read cached stories! 📱');
});

// Add service worker for PWA features
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(function(registration) {
            console.log('ServiceWorker registration successful');
        })
        .catch(function(err) {
            console.log('ServiceWorker registration failed');
        });
}

// Add analytics tracking
function trackEvent(eventName, data = {}) {
    // Simple analytics tracking
    const event = {
        name: eventName,
        data: data,
        timestamp: new Date().toISOString(),
        user: currentUser ? currentUser.type : 'anonymous',
        userId: currentUser ? (currentUser.name || currentUser.username) : 'anonymous'
    };
    
    // Store in localStorage for now (in real app, send to analytics service)
    const analytics = JSON.parse(localStorage.getItem('kidoboAnalytics') || '[]');
    analytics.push(event);
    localStorage.setItem('kidoboAnalytics', JSON.stringify(analytics));
    
    // Limit analytics storage to prevent localStorage overflow
    if (analytics.length > 1000) {
        const trimmedAnalytics = analytics.slice(-500);
        localStorage.setItem('kidoboAnalytics', JSON.stringify(trimmedAnalytics));
    }
}

// Track important events
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('read-story-btn')) {
        trackEvent('story_started', { storyId: e.target.dataset.storyId });
    }
    
    if (e.target.classList.contains('play-game-btn')) {
        trackEvent('game_started', { gameType: e.target.closest('.game-card').dataset.game });
    }
});

// Add export functionality for parents
function exportUserData() {
    if (currentUser && currentUser.type === 'parent') {
        const data = {
            user: currentUser,
            stats: userStats,
            analytics: JSON.parse(localStorage.getItem('kidoboAnalytics') || '[]'),
            exportDate: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `kidobo-data-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }
}

// Add this to the parent dashboard
if (document.getElementById('exportDataBtn')) {
    document.getElementById('exportDataBtn').addEventListener('click', exportUserData);
}

function showGoalsModal() {
    const goalsHTML = `
        <div class="goals-modal">
            <h4>Set Reading Goals</h4>
            <div class="form-group">
                <label for="dailyGoal">Daily Reading Goal (minutes):</label>
                <input type="number" id="dailyGoal" min="5" max="120" value="20">
            </div>
            <div class="form-group">
                <label for="weeklyGoal">Weekly Books Goal:</label>
                <input type="number" id="weeklyGoal" min="1" max="20" value="3">
            </div>
            <button class="btn-primary save-goals-btn">Save Goals</button>
        </div>
    `;
    
    document.getElementById('gameContainer').innerHTML = goalsHTML;
    document.getElementById('gameTitle').textContent = 'Reading Goals';
    showModal('gameModal');
    
    document.querySelector('.save-goals-btn').addEventListener('click', () => {
        const dailyGoal = document.getElementById('dailyGoal').value;
        const weeklyGoal = document.getElementById('weeklyGoal').value;
        
        localStorage.setItem('kidoboGoals', JSON.stringify({
            daily: parseInt(dailyGoal),
            weekly: parseInt(weeklyGoal)
        }));
        
        showCelebration('Reading goals saved! 📚');
        closeAllModals();
    });
}

function showHistoryModal() {
    const analytics = JSON.parse(localStorage.getItem('kidoboAnalytics') || '[]');
    const readingEvents = analytics.filter(event => event.name === 'story_started' || event.name === 'story_completed');
    
    const historyHTML = `
        <div class="history-modal">
            <h4>Reading History</h4>
            <div class="history-list">
                ${readingEvents.length > 0 ? 
                    readingEvents.slice(-10).reverse().map(event => `
                        <div class="history-item">
                            <span class="history-date">${new Date(event.timestamp).toLocaleDateString()}</span>
                            <span class="history-action">${event.name === 'story_started' ? 'Started' : 'Completed'} story</span>
                        </div>
                    `).join('') :
                    '<p>No reading history yet. Start reading to see your progress!</p>'
                }
            </div>
        </div>
    `;
    
    document.getElementById('gameContainer').innerHTML = historyHTML;
    document.getElementById('gameTitle').textContent = 'Reading History';
    showModal('gameModal');
}

function showAddStoryModal() {
    const addStoryHTML = `
        <div class="add-story-modal">
            <h4>Add New Story</h4>
            <div class="form-group">
                <label for="storyTitle">Story Title:</label>
                <input type="text" id="storyTitle" required>
            </div>
            <div class="form-group">
                <label for="storyCategory">Category:</label>
                <select id="storyCategory" required>
                    <option value="adventure">Adventure</option>
                    <option value="animals">Animals</option>
                    <option value="fantasy">Fantasy</option>
                    <option value="science">Science</option>
                </select>
            </div>
            <div class="form-group">
                <label for="storyAgeGroup">Age Group:</label>
                <select id="storyAgeGroup" required>
                    <option value="4-6">Ages 4-6</option>
                    <option value="7-8">Ages 7-8</option>
                    <option value="9-10">Ages 9-10</option>
                </select>
            </div>
            <div class="form-group">
                <label for="storyDescription">Description:</label>
                <textarea id="storyDescription" rows="3" required></textarea>
            </div>
            <button class="btn-primary save-story-btn">Save Story</button>
        </div>
    `;
    
    document.getElementById('gameContainer').innerHTML = addStoryHTML;
    document.getElementById('gameTitle').textContent = 'Add New Story';
    showModal('gameModal');
    
    document.querySelector('.save-story-btn').addEventListener('click', () => {
        const title = document.getElementById('storyTitle').value;
        const category = document.getElementById('storyCategory').value;
        const ageGroup = document.getElementById('storyAgeGroup').value;
        const description = document.getElementById('storyDescription').value;
        
        if (title && category && ageGroup && description) {
            // In a real app, this would save to a database
            showCelebration('Story added successfully! 📖');
            closeAllModals();
        } else {
            alert('Please fill in all fields.');
        }
    });
}

function showManageUsersModal() {
    const manageUsersHTML = `
        <div class="manage-users-modal">
            <h4>User Management</h4>
            <div class="user-stats">
                <div class="stat-item">
                    <span class="stat-label">Total Users:</span>
                    <span class="stat-value">${Math.floor(Math.random() * 100) + 50}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Active Today:</span>
                    <span class="stat-value">${Math.floor(Math.random() * 20) + 10}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Stories Read:</span>
                    <span class="stat-value">${Math.floor(Math.random() * 500) + 200}</span>
                </div>
            </div>
            <p>User management features would be implemented here in a full version.</p>
        </div>
    `;
    
    document.getElementById('gameContainer').innerHTML = manageUsersHTML;
    document.getElementById('gameTitle').textContent = 'User Management';
    showModal('gameModal');
}

function showAnalyticsModal() {
    const analytics = JSON.parse(localStorage.getItem('kidoboAnalytics') || '[]');
    const storyStarts = analytics.filter(event => event.name === 'story_started').length;
    const storyCompletions = analytics.filter(event => event.name === 'story_completed').length;
    const gameStarts = analytics.filter(event => event.name === 'game_started').length;
    const quizCompletions = analytics.filter(event => event.name === 'quiz_completed').length;
    const achievementUnlocks = analytics.filter(event => event.name === 'achievement_unlocked').length;
    
    // Calculate completion rate
    const completionRate = storyStarts > 0 ? Math.round((storyCompletions / storyStarts) * 100) : 0;
    
    // Get recent activity
    const recentActivity = analytics.slice(-5).reverse();
    
    const analyticsHTML = `
        <div class="analytics-modal">
            <h4>Platform Analytics</h4>
            <div class="analytics-stats">
                <div class="stat-item">
                    <span class="stat-label">Stories Started:</span>
                    <span class="stat-value">${storyStarts}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Stories Completed:</span>
                    <span class="stat-value">${storyCompletions}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Completion Rate:</span>
                    <span class="stat-value">${completionRate}%</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Games Played:</span>
                    <span class="stat-value">${gameStarts}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Quizzes Taken:</span>
                    <span class="stat-value">${quizCompletions}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Achievements Unlocked:</span>
                    <span class="stat-value">${achievementUnlocks}</span>
                </div>
            </div>
            <div class="recent-activity">
                <h5>Recent Activity</h5>
                <div class="activity-list">
                    ${recentActivity.length > 0 ? 
                        recentActivity.map(event => `
                            <div class="activity-item">
                                <span class="activity-time">${new Date(event.timestamp).toLocaleString()}</span>
                                <span class="activity-action">${formatActivityName(event.name)}</span>
                            </div>
                        `).join('') :
                        '<p>No recent activity</p>'
                    }
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('gameContainer').innerHTML = analyticsHTML;
    document.getElementById('gameTitle').textContent = 'Analytics Dashboard';
    showModal('gameModal');
}

function formatActivityName(eventName) {
    const activityNames = {
        'story_started': 'Started reading a story',
        'story_completed': 'Completed a story',
        'game_started': 'Started a game',
        'game_completed': 'Completed a game',
        'quiz_completed': 'Completed a quiz',
        'achievement_unlocked': 'Unlocked an achievement',
        'app_loaded': 'Opened the app'
    };
    
    return activityNames[eventName] || eventName.replace('_', ' ');
}

// Enhanced initialization with better error handling
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Add loading animation
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    trackEvent('app_loaded');
                }, 500);
            }, 2000);
        }
        
        // Initialize everything
        initializeApp();
        
        // Add welcome message for first-time users
        if (!localStorage.getItem('kidoboFirstVisit')) {
            setTimeout(() => {
                showCelebration('Welcome to KIDOBO! 🎉\n\nStart your reading adventure!');
                localStorage.setItem('kidoboFirstVisit', 'true');
                trackEvent('first_visit');
            }, 3000);
        }
        
        // Check for service worker support
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(function(registration) {
                    console.log('ServiceWorker registration successful');
                })
                .catch(function(err) {
                    console.log('ServiceWorker registration failed');
                });
        }
        
    } catch (error) {
        console.error('Error initializing KIDOBO:', error);
        // Show user-friendly error message
        if (document.getElementById('loadingScreen')) {
            document.getElementById('loadingScreen').innerHTML = `
                <div class="loading-content">
                    <div class="loading-animation">
                        <div class="book-icon">⚠️</div>
                        <div class="loading-text">Something went wrong. Please refresh the page.</div>
                    </div>
                </div>
            `;
        }
    }
}); 