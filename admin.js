// KIDOBO Admin Dashboard JavaScript

console.log('Admin.js loaded successfully!');

class AdminDashboard {
    constructor() {
        console.log('AdminDashboard constructor called');
        this.currentUser = null;
        this.stories = [];
        this.users = [];
        this.analytics = {};
        this.settings = {};
        
        this.init();
    }

    init() {
        console.log('AdminDashboard init called');
        this.loadUserData();
        this.setupEventListeners();
        this.loadSampleData();
        this.updateUI();
        this.initDatabaseAndCharts();
        this.hideLoadingScreen();
    }

    async initDatabaseAndCharts() {
        try {
            if (!window.initSqlJs) {
                this.renderChartsFromState();
                return;
            }
            const SQL = await initSqlJs({ locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}` });
            const existing = localStorage.getItem('kidoboAnalyticsDb');
            this.db = new SQL.Database(existing ? Uint8Array.from(atob(existing), c => c.charCodeAt(0)) : undefined);
            this.createTablesIfNeeded();
            this.seedAnalyticsIfNeeded();
            this.renderCharts();
            this.saveDb();
        } catch (e) {
            console.warn('SQL.js unavailable, falling back to in-memory charts', e);
            this.renderChartsFromState();
        }
    }

    saveDb() {
        if (!this.db) return;
        const data = this.db.export();
        const b64 = btoa(Array.from(data).map(c => String.fromCharCode(c)).join(''));
        localStorage.setItem('kidoboAnalyticsDb', b64);
    }

    createTablesIfNeeded() {
        this.db.run(`
            CREATE TABLE IF NOT EXISTS user_growth (label TEXT, value INTEGER);
            CREATE TABLE IF NOT EXISTS story_popularity (title TEXT, reads INTEGER);
            CREATE TABLE IF NOT EXISTS reading_time (label TEXT, minutes INTEGER);
            CREATE TABLE IF NOT EXISTS engagement (label TEXT, value INTEGER);
        `);
    }

    seedAnalyticsIfNeeded() {
        const check = this.db.exec('SELECT COUNT(*) as c FROM user_growth');
        const count = check.length ? check[0].values[0][0] : 0;
        if (count > 0) return;
        const growth = [['Week 1', 120], ['Week 2', 135], ['Week 3', 142], ['Week 4', 156]];
        const story = [['The Brave Little Mouse', 156], ['The Magic Garden', 89], ['The Space Adventure', 67]];
        const rtime = [['Mon', 220], ['Tue', 240], ['Wed', 210], ['Thu', 260], ['Fri', 280], ['Sat', 320], ['Sun', 300]];
        const engage = [['Likes', 820], ['Shares', 120], ['Comments', 240], ['Completions', 430]];
        const stmt1 = this.db.prepare('INSERT INTO user_growth VALUES (?, ?)');
        growth.forEach(([l,v]) => stmt1.run([l,v])); stmt1.free();
        const stmt2 = this.db.prepare('INSERT INTO story_popularity VALUES (?, ?)');
        story.forEach(([t,r]) => stmt2.run([t,r])); stmt2.free();
        const stmt3 = this.db.prepare('INSERT INTO reading_time VALUES (?, ?)');
        rtime.forEach(([l,m]) => stmt3.run([l,m])); stmt3.free();
        const stmt4 = this.db.prepare('INSERT INTO engagement VALUES (?, ?)');
        engage.forEach(([l,v]) => stmt4.run([l,v])); stmt4.free();
    }

    queryAll(sql) {
        const res = this.db.exec(sql);
        if (!res.length) return { columns: [], values: [] };
        return res[0];
    }

    renderCharts() {
        const ug = this.queryAll('SELECT label, value FROM user_growth');
        const sp = this.queryAll('SELECT title, reads FROM story_popularity');
        const rt = this.queryAll('SELECT label, minutes FROM reading_time');
        const en = this.queryAll('SELECT label, value FROM engagement');
        
        // Render existing charts
        this.drawChart('userGrowthChart', ug.values.map(v=>v[0]), ug.values.map(v=>v[1]), 'line', '#4e79a7');
        this.drawChart('storyPopularityChart', sp.values.map(v=>v[0]), sp.values.map(v=>v[1]), 'bar', '#f28e2c');
        this.drawChart('readingTimeChart', rt.values.map(v=>v[0]), rt.values.map(v=>v[1]), 'line', '#59a14f');
        this.drawChart('engagementChart', en.values.map(v=>v[0]), en.values.map(v=>v[1]), 'bar', '#e15759');
        
        // Render new dashboard charts
        this.renderPlatformActivityChart();
        this.renderUserDemographicsChart();
    }

    renderChartsFromState() {
        const ug = { labels: ['W1','W2','W3','W4'], data: this.analytics.userGrowth };
        const sp = { labels: this.analytics.storyPerformance.map(s => s.title), data: this.analytics.storyPerformance.map(s => s.reads) };
        const rt = { labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], data: [220,240,210,260,280,320,300] };
        const en = { labels: ['Likes','Shares','Comments','Completions'], data: [820,120,240,430] };
        
        // Render existing charts
        this.drawChart('userGrowthChart', ug.labels, ug.data, 'line', '#4e79a7');
        this.drawChart('storyPopularityChart', sp.labels, sp.data, 'bar', '#f28e2c');
        this.drawChart('readingTimeChart', rt.labels, rt.data, 'line', '#59a14f');
        this.drawChart('engagementChart', en.labels, en.data, 'bar', '#e15759');
        
        // Render new dashboard charts
        this.renderPlatformActivityChart();
        this.renderUserDemographicsChart();
    }

    drawChart(canvasId, labels, data, type, color) {
        const el = document.getElementById(canvasId);
        if (!el || !window.Chart) return;
        new Chart(el, {
            type,
            data: {
                labels,
                datasets: [{
                    label: 'Value',
                    data,
                    borderColor: color,
                    backgroundColor: type === 'line' ? color : color + '80',
                    fill: type === 'line',
                    tension: 0.35
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } }
            }
        });
    }

    renderPlatformActivityChart() {
        const canvas = document.getElementById('platformActivityChart');
        if (!canvas || !window.Chart) return;
        
        // Use real analytics data for platform activity
        const data = {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
                {
                    label: 'Active Users',
                    data: this.analytics.platformActivity.dailyActiveUsers,
                    borderColor: '#4e79a7',
                    backgroundColor: '#4e79a780',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Stories Read',
                    data: this.analytics.platformActivity.dailyStoriesRead,
                    borderColor: '#f28e2c',
                    backgroundColor: '#f28e2c80',
                    fill: true,
                    tension: 0.4
                }
            ]
        };
        
        new Chart(canvas, {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 15
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#f0f0f0'
                        }
                    },
                    x: {
                        grid: {
                            color: '#f0f0f0'
                        }
                    }
                },
                elements: {
                    point: {
                        radius: 4,
                        hoverRadius: 6
                    }
                }
            }
        });
    }

    renderUserDemographicsChart() {
        const canvas = document.getElementById('userDemographicsChart');
        if (!canvas || !window.Chart) return;
        
        // Use real analytics data for user demographics
        const data = {
            labels: this.analytics.userDemographics.categories,
            datasets: [{
                data: this.analytics.userDemographics.ageGroups,
                backgroundColor: [
                    '#FF6B6B',  // Red for young children
                    '#4ECDC4',  // Teal for middle children
                    '#45B7D1',  // Blue for older children
                    '#96CEB4',  // Green for mixed ages
                    '#FFEAA7'   // Yellow for older mixed ages
                ],
                borderColor: '#ffffff',
                borderWidth: 2
            }]
        };
        
        new Chart(canvas, {
            type: 'doughnut',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'right',
                        labels: {
                            usePointStyle: true,
                            padding: 15,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((context.parsed / total) * 100).toFixed(1);
                                return `${context.label}: ${context.parsed} (${percentage}%)`;
                            }
                        }
                    }
                },
                elements: {
                    arc: {
                        borderWidth: 2
                    }
                }
            }
        });
    }

    loadUserData() {
        const savedUser = localStorage.getItem('kidoboCurrentUser');
        const savedStories = localStorage.getItem('kidoboStories');
        const savedUsers = localStorage.getItem('kidoboUsers');
        const savedSettings = localStorage.getItem('kidoboSettings');
        
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
        } else {
            // Create demo admin user for testing
            this.currentUser = {
                id: 1,
                name: 'Administrator',
                type: 'admin',
                email: 'admin@kidobo.com'
            };
            localStorage.setItem('kidoboCurrentUser', JSON.stringify(this.currentUser));
        }
        
        if (savedStories) {
            this.stories = JSON.parse(savedStories);
        }
        
        if (savedUsers) {
            this.users = JSON.parse(savedUsers);
        }
        
        if (savedSettings) {
            this.settings = JSON.parse(savedSettings);
        }
    }

    saveUserData() {
        localStorage.setItem('kidoboStories', JSON.stringify(this.stories));
        localStorage.setItem('kidoboUsers', JSON.stringify(this.users));
        localStorage.setItem('kidoboSettings', JSON.stringify(this.settings));
    }

    loadSampleData() {
        // Sample stories data
        if (this.stories.length === 0) {
            this.stories = [
                {
                    id: 1,
                    title: 'The Brave Little Mouse',
                    category: 'animals',
                    ageGroup: '4-6',
                    description: 'A tiny mouse learns that courage comes in all sizes!',
                    image: '🐭',
                    reads: 156,
                    rating: 4.8,
                    status: 'published',
                    publishDate: '2024-01-10',
                    author: 'Story Team',
                    wordCount: 120
                },
                {
                    id: 2,
                    title: 'The Magic Garden',
                    category: 'fantasy',
                    ageGroup: '7-8',
                    description: 'A magical garden where flowers can talk and dreams come true!',
                    image: '🌸',
                    reads: 89,
                    rating: 4.6,
                    status: 'published',
                    publishDate: '2024-01-15',
                    author: 'Story Team',
                    wordCount: 95
                },
                {
                    id: 3,
                    title: 'The Space Adventure',
                    category: 'science',
                    ageGroup: '9-10',
                    description: 'Join Captain Star on an exciting journey through the solar system!',
                    image: '🚀',
                    reads: 67,
                    rating: 4.9,
                    status: 'published',
                    publishDate: '2024-01-20',
                    author: 'Story Team',
                    wordCount: 150
                },
                {
                    id: 4,
                    title: 'The Rainbow Fish',
                    category: 'ocean',
                    ageGroup: '5-7',
                    description: 'A beautiful fish learns the joy of sharing with friends!',
                    image: '🐠',
                    reads: 134,
                    rating: 4.9,
                    status: 'published',
                    publishDate: '2024-01-25',
                    author: 'Story Team',
                    wordCount: 110
                },
                {
                    id: 5,
                    title: 'The Little Red Hen',
                    category: 'farm',
                    ageGroup: '6-8',
                    description: 'A hardworking hen teaches her friends about helping and responsibility!',
                    image: '🐔',
                    reads: 98,
                    rating: 4.5,
                    status: 'published',
                    publishDate: '2024-01-30',
                    author: 'Story Team',
                    wordCount: 130
                },
                {
                    id: 6,
                    title: 'The Lost Puppy',
                    category: 'animals',
                    ageGroup: '4-6',
                    description: 'A lost puppy finds its way home with the help of forest friends.',
                    image: '🐕',
                    reads: 45,
                    rating: 4.3,
                    status: 'draft',
                    publishDate: null,
                    author: 'Story Team',
                    wordCount: 85
                },
                {
                    id: 7,
                    title: 'The Enchanted Castle',
                    category: 'fantasy',
                    ageGroup: '8-10',
                    description: 'A magical castle holds secrets waiting to be discovered.',
                    image: '🏰',
                    reads: 0,
                    rating: 0,
                    status: 'draft',
                    publishDate: null,
                    author: 'Story Team',
                    wordCount: 180
                },
                {
                    id: 8,
                    title: 'Jungle Adventure',
                    category: 'adventure',
                    ageGroup: '4-6',
                    description: 'A group of friends explores a friendly jungle full of surprises!',
                    image: '🌿',
                    reads: 78,
                    rating: 4.7,
                    status: 'published',
                    publishDate: '2024-02-05',
                    author: 'Story Team',
                    wordCount: 95
                },
                {
                    id: 9,
                    title: 'Princess and the Dragon',
                    category: 'fantasy',
                    ageGroup: '7-8',
                    description: 'A brave princess makes friends with a gentle dragon.',
                    image: '👸',
                    reads: 92,
                    rating: 4.8,
                    status: 'published',
                    publishDate: '2024-02-10',
                    author: 'Story Team',
                    wordCount: 110
                },
                {
                    id: 10,
                    title: 'Pirate Treasure Hunt',
                    category: 'adventure',
                    ageGroup: '7-8',
                    description: 'Two pirates follow a map to find a friendly surprise.',
                    image: '🏴‍☠️',
                    reads: 65,
                    rating: 4.6,
                    status: 'published',
                    publishDate: '2024-02-12',
                    author: 'Story Team',
                    wordCount: 105
                },
                {
                    id: 11,
                    title: 'Robot\'s First Day',
                    category: 'science',
                    ageGroup: '6-8',
                    description: 'A shy robot learns to make friends at school.',
                    image: '🤖',
                    reads: 58,
                    rating: 4.5,
                    status: 'published',
                    publishDate: '2024-02-15',
                    author: 'Story Team',
                    wordCount: 100
                },
                {
                    id: 12,
                    title: 'Winter Wonderland',
                    category: 'adventure',
                    ageGroup: '4-6',
                    description: 'A snowy day of building, sledding, and warm surprises.',
                    image: '❄️',
                    reads: 72,
                    rating: 4.7,
                    status: 'published',
                    publishDate: '2024-02-18',
                    author: 'Story Team',
                    wordCount: 90
                }
            ];
        }

        // Sample users data
        if (this.users.length === 0) {
            this.users = [
                {
                    id: 1,
                    name: 'Emma Johnson',
                    type: 'child',
                    age: 7,
                    booksRead: 12,
                    stars: 180,
                    status: 'active',
                    createdAt: '2024-01-15',
                    lastActive: '2024-02-10',
                    email: 'emma@example.com'
                },
                {
                    id: 2,
                    name: 'Liam Johnson',
                    type: 'child',
                    age: 5,
                    booksRead: 8,
                    stars: 120,
                    status: 'active',
                    createdAt: '2024-02-01',
                    lastActive: '2024-02-09',
                    email: 'liam@example.com'
                },
                {
                    id: 3,
                    name: 'Sarah Johnson',
                    type: 'parent',
                    age: null,
                    booksRead: null,
                    stars: null,
                    status: 'active',
                    createdAt: '2024-01-10',
                    lastActive: '2024-02-10',
                    email: 'sarah@example.com',
                    childrenCount: 2
                },
                {
                    id: 4,
                    name: 'Mike Davis',
                    type: 'child',
                    age: 9,
                    booksRead: 15,
                    stars: 220,
                    status: 'active',
                    createdAt: '2024-01-20',
                    lastActive: '2024-02-08',
                    email: 'mike@example.com'
                },
                {
                    id: 5,
                    name: 'Sophie Wilson',
                    type: 'child',
                    age: 6,
                    booksRead: 6,
                    stars: 90,
                    status: 'active',
                    createdAt: '2024-02-05',
                    lastActive: '2024-02-10',
                    email: 'sophie@example.com'
                },
                {
                    id: 6,
                    name: 'David Brown',
                    type: 'parent',
                    age: null,
                    booksRead: null,
                    stars: null,
                    status: 'active',
                    createdAt: '2024-01-25',
                    lastActive: '2024-02-09',
                    email: 'david@example.com',
                    childrenCount: 1
                }
            ];
        }

        // Sample analytics data
        this.analytics = {
            totalUsers: 1250,
            totalStories: 52,
            totalReads: 9200,
            totalStars: 46800,
            monthlyGrowth: 12.5,
            userRetention: 87.3,
            userGrowth: [120, 135, 142, 156, 168, 175, 182, 190],
            storyPerformance: [
                { title: 'The Brave Little Mouse', reads: 156, rating: 4.8, category: 'animals' },
                { title: 'The Magic Garden', reads: 89, rating: 4.6, category: 'fantasy' },
                { title: 'The Space Adventure', reads: 67, rating: 4.9, category: 'science' },
                { title: 'The Rainbow Fish', reads: 134, rating: 4.9, category: 'ocean' },
                { title: 'The Little Red Hen', reads: 98, rating: 4.5, category: 'farm' },
                { title: 'Jungle Adventure', reads: 78, rating: 4.7, category: 'adventure' },
                { title: 'Princess and the Dragon', reads: 92, rating: 4.8, category: 'fantasy' }
            ],
            demographics: {
                '4-6': 450,
                '7-8': 380,
                '9-10': 320,
                '5-7': 100,
                '6-8': 150
            },
            categoryStats: [
                { category: 'animals', count: 16, reads: 2385, avgRating: 4.7 },
                { category: 'fantasy', count: 13, reads: 1982, avgRating: 4.7 },
                { category: 'science', count: 9, reads: 1288, avgRating: 4.6 },
                { category: 'ocean', count: 6, reads: 980, avgRating: 4.8 },
                { category: 'farm', count: 4, reads: 460, avgRating: 4.4 },
                { category: 'adventure', count: 4, reads: 215, avgRating: 4.7 }
            ],
            ageGroupStats: [
                { ageGroup: '4-6', users: 450, reads: 3350, avgRating: 4.8 },
                { ageGroup: '7-8', users: 380, reads: 2892, avgRating: 4.7 },
                { ageGroup: '9-10', users: 320, reads: 2400, avgRating: 4.5 },
                { ageGroup: '5-7', users: 100, reads: 500, avgRating: 4.9 },
                { ageGroup: '6-8', users: 150, reads: 158, avgRating: 4.5 }
            ],
            // New data for dashboard charts
            platformActivity: {
                dailyActiveUsers: [45, 52, 48, 61, 58, 73, 68],
                dailyStoriesRead: [120, 145, 132, 168, 156, 189, 175],
                dailyNewUsers: [8, 12, 6, 15, 11, 18, 14]
            },
            userDemographics: {
                ageGroups: [450, 380, 320, 100, 150],
                userTypes: [1050, 80, 20], // Children, Parents, Admins
                categories: ['Ages 4-6', 'Ages 7-8', 'Ages 9-10', 'Ages 5-7', 'Ages 6-8']
            }
        };

        // Sample settings
        this.settings = {
            platformName: 'KIDOBO',
            maxUsers: 1000,
            maintenanceMode: false,
            smtpServer: 'smtp.gmail.com',
            smtpPort: 587,
            emailFrom: 'noreply@kidobo.com',
            autoBackup: 'weekly',
            backupRetention: 30,
            backupLocation: '/backups',
            sessionTimeout: 30,
            maxLoginAttempts: 5,
            passwordPolicy: 'medium',
            brandColor: '#4CAF50', // Added for new settings
            accentColor: '#2196F3', // Added for new settings
            logoUrl: 'https://via.placeholder.com/150', // Added for new settings
            heroUrl: 'https://via.placeholder.com/1200x400', // Added for new settings
            currency: 'USD', // Added for new settings
            taxRate: 0.05, // Added for new settings
            paymentProvider: 'Stripe', // Added for new settings
            shippingSpeed: 'Standard', // Added for new settings
            freeShip: 100 // Added for new settings
        };
    }

    setupEventListeners() {
        console.log('Setting up admin event listeners');
        
        // Navigation
        const dashboardBtn = document.getElementById('dashboardBtn');
        const contentBtn = document.getElementById('contentBtn');
        const usersBtn = document.getElementById('usersBtn');
        const analyticsBtn = document.getElementById('analyticsBtn');
        const settingsBtn = document.getElementById('settingsBtn');
        
        if (dashboardBtn) dashboardBtn.addEventListener('click', () => this.showPage('dashboardPage'));
        if (contentBtn) contentBtn.addEventListener('click', () => this.showPage('contentPage'));
        if (usersBtn) usersBtn.addEventListener('click', () => this.showPage('usersPage'));
        if (analyticsBtn) analyticsBtn.addEventListener('click', () => this.showPage('analyticsPage'));
        if (settingsBtn) settingsBtn.addEventListener('click', () => this.showPage('settingsPage'));

        // Logout
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) logoutBtn.addEventListener('click', () => this.logout());
        
        // Back to Main
        const backToMainBtn = document.getElementById('backToMainBtn');
        if (backToMainBtn) backToMainBtn.addEventListener('click', () => this.backToMain());

        // Quick actions
        const addStoryBtn = document.getElementById('addStoryBtn');
        const addStoryBtn2 = document.getElementById('addStoryBtn2');
        const addUserBtn = document.getElementById('addUserBtn');
        const addUserBtn2 = document.getElementById('addUserBtn2');
        const backupBtn = document.getElementById('backupBtn');
        const exportBtn = document.getElementById('exportBtn');
        
        if (addStoryBtn) addStoryBtn.addEventListener('click', () => this.showModal('addStoryModal'));
        if (addStoryBtn2) addStoryBtn2.addEventListener('click', () => this.showModal('addStoryModal'));
        if (addUserBtn) addUserBtn.addEventListener('click', () => this.showModal('addUserModal'));
        if (addUserBtn2) addUserBtn2.addEventListener('click', () => this.showModal('addUserModal'));
        if (backupBtn) backupBtn.addEventListener('click', () => this.createBackup());
        if (exportBtn) exportBtn.addEventListener('click', () => this.exportData());

        // Modal close buttons
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modal = e.currentTarget.closest('.modal');
                this.closeModal(modal.id);
            });
        });

        // Forms
        const addStoryForm = document.getElementById('addStoryForm');
        const addUserForm = document.getElementById('addUserForm');
        
        if (addStoryForm) addStoryForm.addEventListener('submit', (e) => this.addStory(e));
        if (addUserForm) addUserForm.addEventListener('submit', (e) => this.addUser(e));

        // Settings forms
        const generalSettingsForm = document.getElementById('generalSettingsForm');
        const emailSettingsForm = document.getElementById('emailSettingsForm');
        const backupSettingsForm = document.getElementById('backupSettingsForm');
        const securitySettingsForm = document.getElementById('securitySettingsForm');
        
        if (generalSettingsForm) generalSettingsForm.addEventListener('submit', (e) => this.saveGeneralSettings(e));
        if (emailSettingsForm) emailSettingsForm.addEventListener('submit', (e) => this.saveEmailSettings(e));
        if (backupSettingsForm) backupSettingsForm.addEventListener('submit', (e) => this.saveBackupSettings(e));
        if (securitySettingsForm) securitySettingsForm.addEventListener('submit', (e) => this.saveSecuritySettings(e));

        // E-commerce style settings
        const saveAppearanceBtn = document.getElementById('saveAppearanceBtn');
        const savePaymentBtn = document.getElementById('savePaymentBtn');
        const saveFulfillmentBtn = document.getElementById('saveFulfillmentBtn');
        if (saveAppearanceBtn) saveAppearanceBtn.addEventListener('click', () => {
            this.settings.brandColor = document.getElementById('brandColor').value;
            this.settings.accentColor = document.getElementById('accentColor').value;
            this.settings.logoUrl = document.getElementById('logoUrl').value;
            this.settings.heroUrl = document.getElementById('heroUrl').value;
            this.saveUserData();
            this.showNotification('Appearance settings saved', 'success');
        });
        if (savePaymentBtn) savePaymentBtn.addEventListener('click', () => {
            this.settings.currency = document.getElementById('currency').value;
            this.settings.taxRate = parseFloat(document.getElementById('taxRate').value) || 0;
            this.settings.paymentProvider = document.getElementById('paymentProvider').value;
            this.saveUserData();
            this.showNotification('Content settings saved', 'success');
        });
        if (saveFulfillmentBtn) saveFulfillmentBtn.addEventListener('click', () => {
            this.settings.shippingSpeed = document.getElementById('shippingSpeed').value;
            this.settings.freeShip = parseFloat(document.getElementById('freeShip').value) || 0;
            this.saveUserData();
            this.showNotification('Privacy settings saved', 'success');
        });

        // Settings sidebar nav
        document.querySelectorAll('.settings-nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.settings-nav-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const sectionId = btn.getAttribute('data-section');
                document.querySelectorAll('.settings-section').forEach(sec => sec.classList.remove('active'));
                const target = document.getElementById(sectionId);
                if (target) target.classList.add('active');
            });
        });

        // Analytics actions
        document.getElementById('exportAnalyticsBtn').addEventListener('click', () => this.exportAnalytics());

        // Content filters
        document.getElementById('categoryFilter').addEventListener('change', () => this.filterStories());
        document.getElementById('ageFilter').addEventListener('change', () => this.filterStories());
        document.getElementById('searchStories').addEventListener('input', () => this.filterStories());

        // User filters
        document.getElementById('userTypeFilter').addEventListener('change', () => this.filterUsers());
        document.getElementById('userStatusFilter').addEventListener('change', () => this.filterUsers());
        document.getElementById('searchUsers').addEventListener('input', () => this.filterUsers());
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
        if (pageId === 'contentPage') {
            this.loadStoriesTable();
        } else if (pageId === 'usersPage') {
            this.loadUsersTable();
        } else if (pageId === 'analyticsPage') {
            this.loadAnalytics();
        } else if (pageId === 'settingsPage') {
            this.loadSettings();
        }
    }

    loadStoriesTable() {
        const tbody = document.getElementById('storiesTableBody');
        if (!tbody) return;
        
        tbody.innerHTML = '';
        
        this.stories.forEach(story => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${story.title}</td>
                <td><span class="category-badge ${story.category}">${story.category}</span></td>
                <td>${story.ageGroup}</td>
                <td>${story.reads}</td>
                <td>⭐ ${story.rating}</td>
                <td>
                    <button class="btn-small" onclick="adminDashboard.editStory(${story.id})">Edit</button>
                    <button class="btn-small danger" onclick="adminDashboard.deleteStory(${story.id})">Delete</button>
                </td>
            `;
            
            tbody.appendChild(row);
        });
    }

    loadUsersTable() {
        const tbody = document.getElementById('usersTableBody');
        if (!tbody) return;
        
        tbody.innerHTML = '';
        
        this.users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.name}</td>
                <td><span class="user-type ${user.type}">${user.type}</span></td>
                <td>${user.age || '-'}</td>
                <td>${user.booksRead || '-'}</td>
                <td>${user.stars || '-'}</td>
                <td><span class="status-badge ${user.status}">${user.status}</span></td>
                <td>
                    <button class="btn-small" onclick="adminDashboard.editUser(${user.id})">Edit</button>
                    <button class="btn-small danger" onclick="adminDashboard.deleteUser(${user.id})">Delete</button>
                </td>
            `;
            
            tbody.appendChild(row);
        });
    }

    loadAnalytics() {
        // Analytics charts would be implemented here
        // For now, just update the metrics
        this.updateAnalyticsMetrics();
    }

    loadSettings() {
        // Populate settings forms with current values
        document.getElementById('platformName').value = this.settings.platformName;
        document.getElementById('maxUsers').value = this.settings.maxUsers;
        document.getElementById('maintenanceMode').value = this.settings.maintenanceMode.toString();
        
        document.getElementById('smtpServer').value = this.settings.smtpServer;
        document.getElementById('smtpPort').value = this.settings.smtpPort;
        document.getElementById('emailFrom').value = this.settings.emailFrom;
        
        document.getElementById('autoBackup').value = this.settings.autoBackup;
        document.getElementById('backupRetention').value = this.settings.backupRetention;
        document.getElementById('backupLocation').value = this.settings.backupLocation;
        
        document.getElementById('sessionTimeout').value = this.settings.sessionTimeout;
        document.getElementById('maxLoginAttempts').value = this.settings.maxLoginAttempts;
        document.getElementById('passwordPolicy').value = this.settings.passwordPolicy;

        // E-commerce style settings
        document.getElementById('brandColor').value = this.settings.brandColor;
        document.getElementById('accentColor').value = this.settings.accentColor;
        document.getElementById('logoUrl').value = this.settings.logoUrl;
        document.getElementById('heroUrl').value = this.settings.heroUrl;
        document.getElementById('currency').value = this.settings.currency;
        document.getElementById('taxRate').value = this.settings.taxRate;
        document.getElementById('paymentProvider').value = this.settings.paymentProvider;
        document.getElementById('shippingSpeed').value = this.settings.shippingSpeed;
        document.getElementById('freeShip').value = this.settings.freeShip;
    }

    filterStories() {
        const categoryFilter = document.getElementById('categoryFilter').value;
        const ageFilter = document.getElementById('ageFilter').value;
        const searchInput = document.getElementById('searchStories').value.toLowerCase();

        const rows = document.querySelectorAll('#storiesTableBody tr');
        
        rows.forEach(row => {
            const title = row.cells[0].textContent.toLowerCase();
            const category = row.cells[1].textContent.toLowerCase();
            const ageGroup = row.cells[2].textContent;
            
            const categoryMatch = categoryFilter === 'all' || category.includes(categoryFilter);
            const ageMatch = ageFilter === 'all' || ageGroup === ageFilter;
            const searchMatch = title.includes(searchInput);
            
            if (categoryMatch && ageMatch && searchMatch) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    filterUsers() {
        const typeFilter = document.getElementById('userTypeFilter').value;
        const statusFilter = document.getElementById('userStatusFilter').value;
        const searchInput = document.getElementById('searchUsers').value.toLowerCase();

        const rows = document.querySelectorAll('#usersTableBody tr');
        
        rows.forEach(row => {
            const name = row.cells[0].textContent.toLowerCase();
            const type = row.cells[1].textContent.toLowerCase();
            const status = row.cells[5].textContent.toLowerCase();
            
            const typeMatch = typeFilter === 'all' || type.includes(typeFilter);
            const statusMatch = statusFilter === 'all' || status.includes(statusFilter);
            const searchMatch = name.includes(searchInput);
            
            if (typeMatch && statusMatch && searchMatch) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    addStory(e) {
        e.preventDefault();
        
        const title = document.getElementById('storyTitle').value;
        const category = document.getElementById('storyCategory').value;
        const ageGroup = document.getElementById('storyAgeGroup').value;
        const description = document.getElementById('storyDescription').value;
        const image = document.getElementById('storyImage').value;
        const content = document.getElementById('storyContent').value;
        
        if (!title || !category || !ageGroup || !description || !image || !content) {
            this.showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        const newStory = {
            id: Date.now(),
            title: title,
            category: category,
            ageGroup: ageGroup,
            description: description,
            image: image,
            content: content,
            reads: 0,
            rating: 0,
            status: 'published'
        };
        
        this.stories.push(newStory);
        this.saveUserData();
        this.updateUI();
        
        this.closeModal('addStoryModal');
        this.showNotification('Story added successfully!', 'success');
        
        // Reset form
        document.getElementById('addStoryForm').reset();
    }

    addUser(e) {
        e.preventDefault();
        
        const name = document.getElementById('userName').value;
        const type = document.getElementById('userType').value;
        const age = document.getElementById('userAge').value;
        const email = document.getElementById('userEmail').value;
        const avatar = document.getElementById('userAvatar').value;
        
        if (!name || !type) {
            this.showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        const newUser = {
            id: Date.now(),
            name: name,
            type: type,
            age: age ? parseInt(age) : null,
            email: email || null,
            avatar: avatar || '👤',
            booksRead: type === 'child' ? 0 : null,
            stars: type === 'child' ? 0 : null,
            status: 'active',
            createdAt: new Date().toISOString()
        };
        
        this.users.push(newUser);
        this.saveUserData();
        this.updateUI();
        
        this.closeModal('addUserModal');
        this.showNotification('User added successfully!', 'success');
        
        // Reset form
        document.getElementById('addUserForm').reset();
    }

    editStory(storyId) {
        const story = this.stories.find(s => s.id === storyId);
        if (story) {
            this.showNotification(`Edit functionality for "${story.title}" would be implemented here`, 'info');
        }
    }

    deleteStory(storyId) {
        const story = this.stories.find(s => s.id === storyId);
        if (story && confirm(`Are you sure you want to delete "${story.title}"?`)) {
            this.stories = this.stories.filter(s => s.id !== storyId);
            this.saveUserData();
            this.updateUI();
            this.showNotification(`Story "${story.title}" has been deleted`, 'success');
        }
    }

    editUser(userId) {
        const user = this.users.find(u => u.id === userId);
        if (user) {
            this.showNotification(`Edit functionality for ${user.name} would be implemented here`, 'info');
        }
    }

    deleteUser(userId) {
        const user = this.users.find(u => u.id === userId);
        if (user && confirm(`Are you sure you want to delete ${user.name}?`)) {
            this.users = this.users.filter(u => u.id !== userId);
            this.saveUserData();
            this.updateUI();
            this.showNotification(`${user.name} has been deleted`, 'success');
        }
    }

    saveGeneralSettings(e) {
        e.preventDefault();
        
        this.settings.platformName = document.getElementById('platformName').value;
        this.settings.maxUsers = parseInt(document.getElementById('maxUsers').value);
        this.settings.maintenanceMode = document.getElementById('maintenanceMode').value === 'true';
        
        this.saveUserData();
        this.showNotification('General settings saved successfully!', 'success');
    }

    saveEmailSettings(e) {
        e.preventDefault();
        
        this.settings.smtpServer = document.getElementById('smtpServer').value;
        this.settings.smtpPort = parseInt(document.getElementById('smtpPort').value);
        this.settings.emailFrom = document.getElementById('emailFrom').value;
        
        this.saveUserData();
        this.showNotification('Email settings saved successfully!', 'success');
    }

    saveBackupSettings(e) {
        e.preventDefault();
        
        this.settings.autoBackup = document.getElementById('autoBackup').value;
        this.settings.backupRetention = parseInt(document.getElementById('backupRetention').value);
        this.settings.backupLocation = document.getElementById('backupLocation').value;
        
        this.saveUserData();
        this.showNotification('Backup settings saved successfully!', 'success');
    }

    saveSecuritySettings(e) {
        e.preventDefault();
        
        this.settings.sessionTimeout = parseInt(document.getElementById('sessionTimeout').value);
        this.settings.maxLoginAttempts = parseInt(document.getElementById('maxLoginAttempts').value);
        this.settings.passwordPolicy = document.getElementById('passwordPolicy').value;
        
        this.saveUserData();
        this.showNotification('Security settings saved successfully!', 'success');
    }

    createBackup() {
        const backupData = {
            timestamp: new Date().toISOString(),
            stories: this.stories,
            users: this.users,
            settings: this.settings,
            analytics: this.analytics
        };
        
        const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `kidobo-backup-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        this.showNotification('Backup created successfully!', 'success');
    }

    exportData() {
        const exportData = {
            exportDate: new Date().toISOString(),
            stories: this.stories,
            users: this.users,
            analytics: this.analytics
        };
        
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `kidobo-export-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        this.showNotification('Data exported successfully!', 'success');
    }

    exportAnalytics() {
        const analyticsData = {
            exportDate: new Date().toISOString(),
            analytics: this.analytics
        };
        
        const blob = new Blob([JSON.stringify(analyticsData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `kidobo-analytics-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        this.showNotification('Analytics exported successfully!', 'success');
    }

    updateUI() {
        // Update dashboard stats
        document.getElementById('totalUsers').textContent = this.analytics.totalUsers;
        document.getElementById('totalStories').textContent = this.analytics.totalStories;
        document.getElementById('totalReads').textContent = this.analytics.totalReads.toLocaleString();
        document.getElementById('totalStars').textContent = this.analytics.totalStars.toLocaleString();
        
        // Update admin name
        document.getElementById('adminName').textContent = this.currentUser?.name || 'Administrator';
        
        // Update recent activity
        this.updateRecentActivity();
    }

    updateAnalyticsMetrics() {
        // This would update the analytics metrics on the analytics page
        console.log('Analytics metrics updated');
    }

    updateRecentActivity() {
        const recentActivity = document.getElementById('recentActivity');
        if (!recentActivity) return;
        
        // Sample activity data
        const activities = [
            {
                action: 'New user registered: Emma (Age 7)',
                time: '2 hours ago'
            },
            {
                action: 'Story "The Brave Little Mouse" completed 15 times',
                time: '4 hours ago'
            },
            {
                action: 'New story "The Space Adventure" added',
                time: '1 day ago'
            },
            {
                action: 'System backup completed successfully',
                time: '2 days ago'
            }
        ];
        
        recentActivity.innerHTML = '';
        
        activities.forEach(activity => {
            const activityItem = document.createElement('div');
            activityItem.className = 'activity-item';
            activityItem.innerHTML = `
                <span class="activity-action">${activity.action}</span>
                <span class="activity-time">${activity.time}</span>
            `;
            
            recentActivity.appendChild(activityItem);
        });
    }

    showModal(modalId) {
        document.getElementById(modalId).classList.add('show');
    }

    closeModal(modalId) {
        document.getElementById(modalId).classList.remove('show');
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

// Initialize the admin dashboard
const adminDashboard = new AdminDashboard(); 