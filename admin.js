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
        this.hideLoadingScreen();
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
                    category: 'adventure',
                    ageGroup: '4-6',
                    description: 'A tiny mouse learns that courage comes in all sizes!',
                    image: '🐭',
                    reads: 156,
                    rating: 4.8,
                    status: 'published'
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
                    status: 'published'
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
                    status: 'published'
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
                    createdAt: '2024-01-15'
                },
                {
                    id: 2,
                    name: 'Liam Johnson',
                    type: 'child',
                    age: 5,
                    booksRead: 8,
                    stars: 120,
                    status: 'active',
                    createdAt: '2024-02-01'
                },
                {
                    id: 3,
                    name: 'Sarah Johnson',
                    type: 'parent',
                    age: null,
                    booksRead: null,
                    stars: null,
                    status: 'active',
                    createdAt: '2024-01-10'
                }
            ];
        }

        // Sample analytics data
        this.analytics = {
            totalUsers: 156,
            totalStories: 24,
            totalReads: 1247,
            totalStars: 8934,
            userGrowth: [120, 135, 142, 156],
            storyPerformance: [
                { title: 'The Brave Little Mouse', reads: 156, rating: 4.8 },
                { title: 'The Magic Garden', reads: 89, rating: 4.6 },
                { title: 'The Space Adventure', reads: 67, rating: 4.9 }
            ],
            demographics: {
                '4-6': 45,
                '7-8': 38,
                '9-10': 17
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
            passwordPolicy: 'medium'
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
        document.getElementById('generalSettingsForm').addEventListener('submit', (e) => this.saveGeneralSettings(e));
        document.getElementById('emailSettingsForm').addEventListener('submit', (e) => this.saveEmailSettings(e));
        document.getElementById('backupSettingsForm').addEventListener('submit', (e) => this.saveBackupSettings(e));
        document.getElementById('securitySettingsForm').addEventListener('submit', (e) => this.saveSecuritySettings(e));

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