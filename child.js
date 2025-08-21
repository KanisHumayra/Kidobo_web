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
        
        // Sample Stories Data - 5 Complete Stories with Varied Images
        this.stories = [
            {
                id: 1,
                title: "The Brave Little Mouse",
                category: "animals",
                ageGroup: "4-6",
                description: "A tiny mouse learns that courage comes in all sizes!",
                coverUrl: "https://www.storybooks.app/_image?href=https%3A%2F%2Fstory-cdn.storybooks.app%2FcwRWGDeXgU-0.webp&w=800&h=800&f=webp",
                pages: [
                    {
                        text: "Once upon a time, there was a little mouse named Max who lived in a cozy hole under a big oak tree.",
                        imageUrl: "https://www.storybooks.app/_image?href=https%3A%2F%2Fstory-cdn.storybooks.app%2FcwRWGDeXgU-1.webp&w=800&h=800&f=webp"
                    },
                    {
                        text: "Max was very small, but he had a big heart. He loved to help his friends in the forest.",
                        imageUrl: "https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
                    },
                    {
                        text: "One day, Max heard a loud noise. It was a big cat chasing a baby bird!",
                        imageUrl: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
                    },
                    {
                        text: "Even though Max was scared, he knew he had to help. He ran as fast as he could!",
                        imageUrl: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
                    },
                    {
                        text: "Max made such a loud squeak that the cat got scared and ran away!",
                        imageUrl: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
                    },
                    {
                        text: "The baby bird was safe, and Max learned that being brave means helping others, no matter how small you are.",
                        imageUrl: "https://images.pexels.com/photos/349758/hummingbird-bird-birds-349758.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
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
                coverUrl: "https://www.storybooks.app/_image?href=https%3A%2F%2Fstory-cdn.storybooks.app%2FcHbxngjcTV-0.webp&w=800&h=800&f=webp",
                pages: [
                    {
                        text: "In a hidden corner of the world, there was a garden where magic grew like flowers.",
                        imageUrl: "https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
                    },
                    {
                        text: "The flowers could talk and sing, and they loved to share stories with children who visited.",
                        imageUrl: "https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
                    },
                    {
                        text: "One day, a sad little girl named Lily found the garden. She had lost her favorite toy.",
                        imageUrl: "https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
                    },
                    {
                        text: "The flowers felt her sadness and decided to help. They used their magic to find her toy!",
                        imageUrl: "https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
                    },
                    {
                        text: "Lily was so happy! She promised to visit the garden every day and share her own stories.",
                        imageUrl: "https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
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
                coverUrl: "https://www.storybooks.app/_image?href=https%3A%2F%2Fstory-cdn.storybooks.app%2FpQqeMrnrBd-0.webp&w=800&h=800&f=webp",
                pages: [
                    {
                        text: "Captain Star and her crew were on a mission to explore the planets of our solar system.",
                        imageUrl: "https://images.pexels.com/photos/2150/sky-space-dark-galaxy-2150.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
                    },
                    {
                        text: "First, they visited Mercury, the closest planet to the Sun. It was very hot!",
                        imageUrl: "https://images.pexels.com/photos/2150/sky-space-dark-galaxy-2150.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
                    },
                    {
                        text: "Next was Venus, covered in thick clouds. The crew had to be very careful.",
                        imageUrl: "https://images.pexels.com/photos/2150/sky-space-dark-galaxy-2150.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
                    },
                    {
                        text: "Then they reached Earth, our beautiful blue planet with oceans and continents.",
                        imageUrl: "https://images.pexels.com/photos/2150/sky-space-dark-galaxy-2150.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
                    },
                    {
                        text: "Mars was red and dusty, with the biggest volcano in the solar system!",
                        imageUrl: "https://images.pexels.com/photos/2150/sky-space-dark-galaxy-2150.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
                    },
                    {
                        text: "The crew learned that each planet is unique and special, just like every child on Earth.",
                        imageUrl: "https://images.pexels.com/photos/2150/sky-space-dark-galaxy-2150.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
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
            },
            {
                id: 4,
                title: "The Rainbow Fish",
                category: "ocean",
                ageGroup: "5-7",
                description: "A beautiful fish learns the joy of sharing with friends!",
                coverUrl: "https://bedtimestorieskd.com/wp-content/uploads/2024/02/The-rainbow-fish-story.webp",
                pages: [
                    {
                        text: "Deep in the ocean lived a beautiful fish with rainbow scales that sparkled like jewels.",
                        imageUrl: "https://images.pexels.com/photos/2156311/pexels-photo-2156311.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
                    },
                    {
                        text: "All the other fish admired his beautiful scales, but he never shared them with anyone.",
                        imageUrl: "https://images.pexels.com/photos/2156311/pexels-photo-2156311.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
                    },
                    {
                        text: "One day, a little blue fish asked for just one tiny scale. The rainbow fish refused.",
                        imageUrl: "https://images.pexels.com/photos/2156311/pexels-photo-2156311.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
                    },
                    {
                        text: "Soon, no fish wanted to play with him. He felt lonely and sad.",
                        imageUrl: "https://images.pexels.com/photos/2156311/pexels-photo-2156311.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
                    },
                    {
                        text: "The rainbow fish decided to share his scales with all the other fish.",
                        imageUrl: "https://images.pexels.com/photos/2156311/pexels-photo-2156311.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
                    },
                    {
                        text: "Now everyone was happy, and the rainbow fish had many friends to play with!",
                        imageUrl: "https://images.pexels.com/photos/2156311/pexels-photo-2156311.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
                    }
                ],
                quiz: [
                    {
                        question: "What made the rainbow fish special?",
                        options: ["His size", "His rainbow scales", "His speed", "His voice"],
                        correct: 1
                    },
                    {
                        question: "What did the rainbow fish learn?",
                        options: ["To swim fast", "To hide", "To share", "To be quiet"],
                        correct: 2
                    }
                ]
            },
            {
                id: 5,
                title: "The Little Red Hen",
                category: "farm",
                ageGroup: "6-8",
                description: "A hardworking hen teaches her friends about helping and responsibility!",
                coverUrl: "https://www.plato-philosophy.org/wp-content/uploads/littleredhen.jpg",
                pages: [
                    {
                        text: "Once upon a time, there was a little red hen who lived on a farm with her friends.",
                        imageUrl: "https://images.pexels.com/photos/735968/pexels-photo-735968.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
                    },
                    {
                        text: "One day, she found some wheat seeds and wanted to plant them to make bread.",
                        imageUrl: "https://images.pexels.com/photos/735968/pexels-photo-735968.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
                    },
                    {
                        text: "She asked her friends, 'Who will help me plant the wheat?' 'Not I!' they all said.",
                        imageUrl: "https://images.pexels.com/photos/735968/pexels-photo-735968.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
                    },
                    {
                        text: "So the little red hen planted the wheat all by herself. She watered it and cared for it.",
                        imageUrl: "https://images.pexels.com/photos/735968/pexels-photo-735968.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
                    },
                    {
                        text: "When the wheat was ready, she harvested it and took it to the mill to make flour.",
                        imageUrl: "https://images.pexels.com/photos/735968/pexels-photo-735968.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
                    },
                    {
                        text: "She baked delicious bread and enjoyed it with her family. Her friends learned that helping brings rewards!",
                        imageUrl: "https://images.pexels.com/photos/735968/pexels-photo-735968.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
                    }
                ],
                quiz: [
                    {
                        question: "What did the little red hen want to make?",
                        options: ["A house", "Bread", "A garden", "A nest"],
                        correct: 1
                    },
                    {
                        question: "What did her friends learn?",
                        options: ["To fly", "To help others", "To sing", "To sleep"],
                        correct: 1
                    }
                ]
            },
            {
                id: 6,
                title: "Jungle Adventure",
                category: "adventure",
                ageGroup: "4-6",
                description: "A group of friends explores a friendly jungle full of surprises!",
                coverUrl: "https://m.media-amazon.com/images/I/91g5qMqosYL._SY425_.jpg",
                pages: [
                    { text: "Mia and Leo entered the jungle and heard birds singing all around.", imageUrl: "https://images.pexels.com/photos/349758/hummingbird-bird-birds-349758.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop" },
                    { text: "They followed a path where butterflies danced in the sunlight.", imageUrl: "https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop" },
                    { text: "A friendly monkey waved from a tree and tossed them a banana.", imageUrl: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop" },
                    { text: "They crossed a tiny stream and saw colorful fish swimming.", imageUrl: "https://images.pexels.com/photos/2156311/pexels-photo-2156311.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop" },
                    { text: "At sunset, the jungle glowed golden, and they headed home smiling.", imageUrl: "https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop" }
                ],
                quiz: [
                    { question: "Who explored the jungle?", options: ["Max and Tom", "Mia and Leo", "Sam and Sue", "Lily and Ben"], correct: 1 },
                    { question: "What did the monkey toss?", options: ["An apple", "A banana", "A coconut", "A mango"], correct: 1 }
                ]
            },
            {
                id: 7,
                title: "Princess and the Dragon",
                category: "fantasy",
                ageGroup: "7-8",
                description: "A brave princess makes friends with a gentle dragon.",
                coverUrl: "https://as1.ftcdn.net/jpg/14/22/11/48/1000_F_1422114835_gQfJfA15SrUOpKvruPRxjcyTxlDYQAYp.jpg",
                pages: [
                    { text: "Princess Aria heard a roar from the mountain and went to see.", imageUrl: "https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop" },
                    { text: "She found a dragon with a hurt wing hiding behind flowers.", imageUrl: "https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop" },
                    { text: "Aria bandaged the wing and told a funny story to cheer it up.", imageUrl: "https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop" },
                    { text: "The dragon smiled and promised to guard the kingdom kindly.", imageUrl: "https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop" },
                    { text: "They became best friends and watched the stars together.", imageUrl: "https://images.pexels.com/photos/2150/sky-space-dark-galaxy-2150.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop" }
                ],
                quiz: [
                    { question: "What was hurt?", options: ["Tail", "Wing", "Foot", "Ear"], correct: 1 },
                    { question: "What did the dragon promise?", options: ["To leave", "To guard the kingdom", "To fly away", "To sleep"], correct: 1 }
                ]
            },
            {
                id: 8,
                title: "Pirate Treasure Hunt",
                category: "adventure",
                ageGroup: "7-8",
                description: "Two pirates follow a map to find a friendly surprise.",
                coverUrl: "https://m.media-amazon.com/images/I/91r7m3lUhDL._SY425_.jpg",
                pages: [
                    { text: "Captain Pip and matey Dot found an old map in a bottle.", imageUrl: "https://images.pexels.com/photos/2156311/pexels-photo-2156311.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop" },
                    { text: "They sailed to an island and climbed a sandy hill.", imageUrl: "https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop" },
                    { text: "X marked a spot near a funny-shaped rock.", imageUrl: "https://images.pexels.com/photos/735968/pexels-photo-735968.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop" },
                    { text: "They dug and found a chest full of shiny friendship bracelets!", imageUrl: "https://images.pexels.com/photos/349758/hummingbird-bird-birds-349758.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop" },
                    { text: "They shared the treasure with island kids and danced.", imageUrl: "https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop" }
                ],
                quiz: [
                    { question: "What was inside the chest?", options: ["Gold", "Shells", "Bracelets", "Books"], correct: 2 },
                    { question: "Where was the X?", options: ["On a tree", "Near a rock", "Under a boat", "In the water"], correct: 1 }
                ]
            },
            {
                id: 9,
                title: "Robot's First Day",
                category: "science",
                ageGroup: "6-8",
                description: "A shy robot learns to make friends at school.",
                coverUrl: "https://www.storybooks.app/_image?href=https%3A%2F%2Fstory-cdn.storybooks.app%2FPmXXmLiTqi-3.webp&w=800&h=800&f=webp",
                pages: [
                    { text: "Robo-3 beeped nervously as school began.", imageUrl: "https://images.pexels.com/photos/2150/sky-space-dark-galaxy-2150.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop" },
                    { text: "He helped carry books with his little metal arms.", imageUrl: "https://images.pexels.com/photos/735968/pexels-photo-735968.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop" },
                    { text: "At lunch, he shared his extra apple batteries (just pretend!).", imageUrl: "https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop" },
                    { text: "He fixed a toy and made the class cheer.", imageUrl: "https://images.pexels.com/photos/349758/hummingbird-bird-birds-349758.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop" },
                    { text: "Robo-3 smiled: making friends was easy after all!", imageUrl: "https://images.pexels.com/photos/2156311/pexels-photo-2156311.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop" }
                ],
                quiz: [
                    { question: "What did Robo-3 fix?", options: ["A car", "A toy", "A door", "A bike"], correct: 1 },
                    { question: "How did the class react?", options: ["They slept", "They cheered", "They left", "They cried"], correct: 1 }
                ]
            },
            {
                id: 10,
                title: "Winter Wonderland",
                category: "adventure",
                ageGroup: "4-6",
                description: "A snowy day of building, sledding, and warm surprises.",
                coverUrl: "https://ik.imagekit.io/storybird/images/6d42575d-09a9-4ddd-b517-4b4323e5a92b/0_73418309.png?tr=q-80",
                pages: [
                    { text: "Snowflakes fell as Nora ran outside to play.", imageUrl: "https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop" },
                    { text: "She built a snow-friend with a carrot nose.", imageUrl: "https://images.pexels.com/photos/735968/pexels-photo-735968.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop" },
                    { text: "Her sled whooshed down the happy little hill.", imageUrl: "https://images.pexels.com/photos/2156311/pexels-photo-2156311.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop" },
                    { text: "They sipped cocoa and watched the twinkling sky.", imageUrl: "https://images.pexels.com/photos/349758/hummingbird-bird-birds-349758.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop" },
                    { text: "It was the coziest winter day ever!", imageUrl: "https://images.pexels.com/photos/2150/sky-space-dark-galaxy-2150.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop" }
                ],
                quiz: [
                    { question: "What did Nora build?", options: ["A castle", "A snow-friend", "A robot", "A car"], correct: 1 },
                    { question: "What did they drink?", options: ["Juice", "Cocoa", "Tea", "Milk"], correct: 1 }
                ]
            }
        ];

        // Sample Games Data - Expanded with more games
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
                    { word: 'Wonder', meaning: 'Amazing feeling' },
                    { word: 'Kindness', meaning: 'Being nice to others' },
                    { word: 'Imagination', meaning: 'Creative thinking' }
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
                    },
                    {
                        question: 'What does "kindness" mean?',
                        options: ['Being mean', 'Being nice', 'Being loud', 'Being quiet'],
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
            },
            'picture-story': {
                title: 'Picture Story',
                description: 'Create a story from pictures',
                images: [
                    { url: 'https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop', prompt: 'A magical forest' },
                    { url: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop', prompt: 'A friendly cat' },
                    { url: 'https://images.pexels.com/photos/2150/sky-space-dark-galaxy-2150.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop', prompt: 'Space adventure' }
                ]
            },
            'rhyme-time': {
                title: 'Rhyme Time',
                description: 'Find words that rhyme',
                words: [
                    { word: 'Cat', rhymes: ['Hat', 'Bat', 'Rat', 'Sat'] },
                    { word: 'Tree', rhymes: ['Bee', 'See', 'Free', 'Key'] },
                    { word: 'Star', rhymes: ['Car', 'Far', 'Jar', 'Bar'] },
                    { word: 'Moon', rhymes: ['Spoon', 'Soon', 'Tune', 'June'] }
                ]
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

    // applyCartoonImages function removed - now using proper themed images

    loadUserData() {
        const savedUser = localStorage.getItem('kidoboCurrentUser');
        const savedStats = localStorage.getItem('kidoboChildStats');
        
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
        } else {
            // Create dummy user data for demo
            this.currentUser = {
                id: 1,
                name: "Alex Johnson",
                age: 7,
                avatar: "👦",
                level: "Reader",
                joinDate: "2024-01-15"
            };
        }
        
        if (savedStats) {
            this.userStats = JSON.parse(savedStats);
        } else {
            // Create dummy stats for demo
            this.userStats = {
                booksRead: 12,
                totalStars: 85,
                readingTime: 45,
                gamesPlayed: 8,
                achievements: [
                    { id: 1, name: "First Book", description: "Read your first story", icon: "📚", earned: "2024-01-20" },
                    { id: 2, name: "Speed Reader", description: "Read 5 books in one day", icon: "⚡", earned: "2024-01-25" },
                    { id: 3, name: "Word Master", description: "Score 100% in vocabulary quiz", icon: "🎯", earned: "2024-02-01" },
                    { id: 4, name: "Story Explorer", description: "Read stories from all categories", icon: "🗺️", earned: "2024-02-05" }
                ]
            };
        }
        
        // Add dummy favorites
        this.favorites = [
            { id: 1, title: "The Brave Little Mouse", category: "animals", reason: "Love the brave mouse!" },
            { id: 2, title: "The Magic Garden", category: "fantasy", reason: "Beautiful garden story" },
            { id: 3, title: "The Space Adventure", category: "science", reason: "Space is awesome!" }
        ];
        
        // Add dummy reading goals
        this.readingGoals = [
            { id: 1, title: "Read 20 books this month", target: 20, current: 12, deadline: "2024-02-29" },
            { id: 2, title: "Learn 50 new words", target: 50, current: 35, deadline: "2024-02-15" },
            { id: 3, title: "Complete all animal stories", target: 5, current: 3, deadline: "2024-02-20" }
        ];
        
        // Add dummy recent activity
        this.recentActivity = [
            { id: 1, action: "Completed 'The Brave Little Mouse'", time: "2 hours ago", stars: 5 },
            { id: 2, action: "Played Word Match game", time: "1 day ago", score: "8/10" },
            { id: 3, action: "Earned 'First Book' achievement", time: "2 days ago", icon: "🏆" },
            { id: 4, action: "Read 'The Magic Garden'", time: "3 days ago", stars: 4 },
            { id: 5, action: "Completed vocabulary quiz", time: "4 days ago", score: "9/10" }
        ];
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
            console.log('Creating story card for:', story.title, 'Cover URL:', story.coverUrl);
            const cover = story.coverUrl ? `<img src="${story.coverUrl}" alt="${story.title} cover"/>` : '';
            storyCard.innerHTML = `
                <div class="story-image">
                    ${cover}
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
        try { if ('speechSynthesis' in window) speechSynthesis.cancel(); } catch(e){}
        
        console.log('Loading story page:', this.currentPage, 'Image URL:', page.imageUrl);
        
        const imgEl = document.getElementById('storyImage');
        if (imgEl) {
            if (page.imageUrl) { 
                console.log('Setting image src to:', page.imageUrl);
                imgEl.src = page.imageUrl; 
                imgEl.style.display = 'block'; 
                
                // Add error handling for images
                imgEl.onerror = function() {
                    console.log('Image failed to load');
                };
                
                imgEl.onload = function() {
                    console.log('Image loaded successfully');
                };
            } else { 
                console.log('No image URL, hiding image');
                imgEl.removeAttribute('src'); 
                imgEl.style.display = 'none'; 
            }
        } else {
            console.log('Story image element not found');
        }
        
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