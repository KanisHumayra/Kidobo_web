// KIDOBO Parent Dashboard JavaScript

console.log('Parent.js loaded successfully!');

class ParentDashboard {
    constructor() {
        console.log('ParentDashboard constructor called');
        this.currentUser = null;
        this.children = [];
        this.familyStats = {
            totalChildren: 0,
            totalBooksRead: 0,
            totalStars: 0,
            totalReadingTime: 0
        };
        this.goals = [];
        this.activities = [];
        
        this.init();
    }

    init() {
        console.log('ParentDashboard init called');
        this.loadUserData();
        this.setupEventListeners();
        this.loadSampleData();
        this.updateUI();
        this.hideLoadingScreen();
    }

    loadUserData() {
        const savedUser = localStorage.getItem('kidoboCurrentUser');
        const savedChildren = localStorage.getItem('kidoboChildren');
        const savedGoals = localStorage.getItem('kidoboGoals');
        
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
        } else {
            // Create demo parent user for testing
            this.currentUser = {
                id: 1,
                name: 'Sarah Johnson',
                type: 'parent',
                email: 'sarah@kidobo.com'
            };
            localStorage.setItem('kidoboCurrentUser', JSON.stringify(this.currentUser));
        }
        
        if (savedChildren) {
            this.children = JSON.parse(savedChildren);
        }
        
        if (savedGoals) {
            this.goals = JSON.parse(savedGoals);
        }
    }

    saveUserData() {
        localStorage.setItem('kidoboChildren', JSON.stringify(this.children));
        localStorage.setItem('kidoboGoals', JSON.stringify(this.goals));
    }

    loadSampleData() {
        // Sample children data
        if (this.children.length === 0) {
            this.children = [
                {
                    id: 1,
                    name: 'Emma',
                    age: 7,
                    avatar: '🐱',
                    booksRead: 12,
                    totalStars: 180,
                    readingTime: 120,
                    achievements: ['First Reader', 'Bookworm'],
                    favoriteStories: ['The Brave Little Mouse', 'The Magic Garden'],
                    createdAt: '2024-01-15'
                },
                {
                    id: 2,
                    name: 'Liam',
                    age: 5,
                    avatar: '🐶',
                    booksRead: 8,
                    totalStars: 120,
                    readingTime: 80,
                    achievements: ['First Reader'],
                    favoriteStories: ['The Brave Little Mouse'],
                    createdAt: '2024-02-01'
                }
            ];
        }

        // Sample goals data
        if (this.goals.length === 0) {
            this.goals = [
                {
                    id: 1,
                    title: 'Read 20 Stories This Month',
                    type: 'family',
                    target: 20,
                    current: 15,
                    metric: 'books',
                    deadline: '2024-12-31',
                    description: 'Family goal for this month'
                },
                {
                    id: 2,
                    title: 'Earn 500 Stars Together',
                    type: 'family',
                    target: 500,
                    current: 245,
                    metric: 'stars',
                    deadline: '2024-12-31',
                    description: 'Combined stars goal'
                },
                {
                    id: 3,
                    title: 'Emma: Read 10 Stories',
                    type: 'individual',
                    childId: 1,
                    target: 10,
                    current: 8,
                    metric: 'books',
                    deadline: '2024-12-31',
                    description: 'Individual goal for Emma'
                },
                {
                    id: 4,
                    title: 'Liam: Earn 200 Stars',
                    type: 'individual',
                    childId: 2,
                    target: 200,
                    current: 150,
                    metric: 'stars',
                    deadline: '2024-12-31',
                    description: 'Individual goal for Liam'
                }
            ];
        }

        // Sample activities
        this.activities = [
            {
                action: 'Emma completed "The Brave Little Mouse"',
                time: '2 hours ago',
                childId: 1
            },
            {
                action: 'Liam earned 20 stars in Word Match',
                time: '4 hours ago',
                childId: 2
            },
            {
                action: 'Emma started reading "The Magic Garden"',
                time: '1 day ago',
                childId: 1
            }
        ];

        this.calculateFamilyStats();
    }

    calculateFamilyStats() {
        this.familyStats = {
            totalChildren: this.children.length,
            totalBooksRead: this.children.reduce((sum, child) => sum + child.booksRead, 0),
            totalStars: this.children.reduce((sum, child) => sum + child.totalStars, 0),
            totalReadingTime: this.children.reduce((sum, child) => sum + child.readingTime, 0)
        };
    }

    setupEventListeners() {
        console.log('Setting up parent event listeners');
        
        // Navigation
        const overviewBtn = document.getElementById('overviewBtn');
        const childrenBtn = document.getElementById('childrenBtn');
        const progressBtn = document.getElementById('progressBtn');
        const goalsBtn = document.getElementById('goalsBtn');
        const reportsBtn = document.getElementById('reportsBtn');
        
        if (overviewBtn) overviewBtn.addEventListener('click', () => this.showPage('overviewPage'));
        if (childrenBtn) childrenBtn.addEventListener('click', () => this.showPage('childrenPage'));
        if (progressBtn) progressBtn.addEventListener('click', () => this.showPage('progressPage'));
        if (goalsBtn) goalsBtn.addEventListener('click', () => this.showPage('goalsPage'));
        if (reportsBtn) reportsBtn.addEventListener('click', () => this.showPage('reportsPage'));

        // Logout
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) logoutBtn.addEventListener('click', () => this.logout());
        
        // Back to Main
        const backToMainBtn = document.getElementById('backToMainBtn');
        if (backToMainBtn) backToMainBtn.addEventListener('click', () => this.backToMain());

        // Quick actions
        const addChildBtn = document.getElementById('addChildBtn');
        const addChildBtn2 = document.getElementById('addChildBtn2');
        const setGoalBtn = document.getElementById('setGoalBtn');
        const createGoalBtn = document.getElementById('createGoalBtn');
        const exportDataBtn = document.getElementById('exportDataBtn');
        const viewReportsBtn = document.getElementById('viewReportsBtn');
        
        if (addChildBtn) addChildBtn.addEventListener('click', () => this.showModal('addChildModal'));
        if (addChildBtn2) addChildBtn2.addEventListener('click', () => this.showModal('addChildModal'));
        if (setGoalBtn) setGoalBtn.addEventListener('click', () => this.showModal('createGoalModal'));
        if (createGoalBtn) createGoalBtn.addEventListener('click', () => this.showModal('createGoalModal'));
        if (exportDataBtn) exportDataBtn.addEventListener('click', () => this.exportData());
        if (viewReportsBtn) viewReportsBtn.addEventListener('click', () => this.showPage('reportsPage'));

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

        // Forms
        document.getElementById('addChildForm').addEventListener('submit', (e) => this.addChild(e));
        document.getElementById('createGoalForm').addEventListener('submit', (e) => this.createGoal(e));

        // Report actions
        document.getElementById('exportReportBtn').addEventListener('click', () => this.exportReport());
        document.getElementById('printReportBtn').addEventListener('click', () => this.printReport());
        document.getElementById('generateReportBtn').addEventListener('click', () => this.generateReport());
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
        if (pageId === 'childrenPage') {
            this.loadChildrenList();
        } else if (pageId === 'goalsPage') {
            this.loadGoals();
        } else if (pageId === 'reportsPage') {
            this.loadReports();
        }
    }

    loadChildrenList() {
        const childrenList = document.getElementById('childrenList');
        if (!childrenList) return;
        
        childrenList.innerHTML = '';
        
        this.children.forEach(child => {
            const childCard = document.createElement('div');
            childCard.className = 'child-card';
            childCard.innerHTML = `
                <div class="child-avatar">
                    <div class="child-avatar-large">${child.avatar}</div>
                </div>
                <div class="child-info">
                    <h3>${child.name}</h3>
                    <p>Age: ${child.age} years old</p>
                    <div class="child-stats">
                        <div class="stat-item">
                            <span class="stat-label">Books Read:</span>
                            <span class="stat-value">${child.booksRead}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Stars Earned:</span>
                            <span class="stat-value">${child.totalStars}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Reading Time:</span>
                            <span class="stat-value">${child.readingTime} min</span>
                        </div>
                    </div>
                </div>
                <div class="child-actions">
                    <button class="btn-secondary" onclick="parentDashboard.editChild(${child.id})">Edit</button>
                    <button class="btn-secondary" onclick="parentDashboard.viewChildProgress(${child.id})">Progress</button>
                    <button class="btn-danger" onclick="parentDashboard.deleteChild(${child.id})">Delete</button>
                </div>
            `;
            
            childrenList.appendChild(childCard);
        });
    }

    loadGoals() {
        const familyGoals = document.getElementById('familyGoals');
        const individualGoals = document.getElementById('individualGoals');
        
        if (!familyGoals || !individualGoals) return;

        familyGoals.innerHTML = '';
        individualGoals.innerHTML = '';

        this.goals.forEach(goal => {
            const goalItem = document.createElement('div');
            goalItem.className = 'goal-item';
            
            const progress = (goal.current / goal.target) * 100;
            const childName = goal.type === 'individual' ? 
                this.children.find(c => c.id === goal.childId)?.name + ': ' : '';
            
            goalItem.innerHTML = `
                <h5>${childName}${goal.title}</h5>
                <p>${goal.description}</p>
                <div class="goal-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progress}%"></div>
                    </div>
                    <span>${goal.current}/${goal.target} ${goal.metric}</span>
                </div>
            `;
            
            if (goal.type === 'family') {
                familyGoals.appendChild(goalItem);
            } else {
                individualGoals.appendChild(goalItem);
            }
        });
    }

    loadReports() {
        // Reports are already populated in HTML
        // This function can be used to generate dynamic reports
        console.log('Reports loaded');
    }

    addChild(e) {
        e.preventDefault();
        
        const name = document.getElementById('childName').value;
        const age = parseInt(document.getElementById('childAge').value);
        const selectedAvatar = document.querySelector('.avatar-option.selected');
        
        if (!name || !age || !selectedAvatar) {
            this.showNotification('Please fill in all fields and select an avatar', 'error');
            return;
        }
        
        const newChild = {
            id: Date.now(),
            name: name,
            age: age,
            avatar: selectedAvatar.dataset.avatar,
            booksRead: 0,
            totalStars: 0,
            readingTime: 0,
            achievements: [],
            favoriteStories: [],
            createdAt: new Date().toISOString()
        };
        
        this.children.push(newChild);
        this.saveUserData();
        this.calculateFamilyStats();
        this.updateUI();
        
        this.closeModal('addChildModal');
        this.showNotification(`Child ${name} added successfully!`, 'success');
        
        // Reset form
        document.getElementById('addChildForm').reset();
        document.querySelectorAll('.avatar-option').forEach(opt => opt.classList.remove('selected'));
    }

    createGoal(e) {
        e.preventDefault();
        
        const title = document.getElementById('goalTitle').value;
        const type = document.getElementById('goalType').value;
        const target = parseInt(document.getElementById('goalTarget').value);
        const metric = document.getElementById('goalMetric').value;
        const deadline = document.getElementById('goalDeadline').value;
        const description = document.getElementById('goalDescription').value;
        
        if (!title || !target || !deadline) {
            this.showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        const newGoal = {
            id: Date.now(),
            title: title,
            type: type,
            target: target,
            current: 0,
            metric: metric,
            deadline: deadline,
            description: description
        };
        
        this.goals.push(newGoal);
        this.saveUserData();
        this.updateUI();
        
        this.closeModal('createGoalModal');
        this.showNotification('Goal created successfully!', 'success');
        
        // Reset form
        document.getElementById('createGoalForm').reset();
    }

    editChild(childId) {
        const child = this.children.find(c => c.id === childId);
        if (child) {
            // Populate edit form and show modal
            this.showNotification(`Edit functionality for ${child.name} would be implemented here`, 'info');
        }
    }

    viewChildProgress(childId) {
        const child = this.children.find(c => c.id === childId);
        if (child) {
            this.showPage('progressPage');
            // Filter progress page to show specific child
            document.getElementById('childFilter').value = child.name.toLowerCase();
            this.showNotification(`Viewing progress for ${child.name}`, 'info');
        }
    }

    deleteChild(childId) {
        const child = this.children.find(c => c.id === childId);
        if (child && confirm(`Are you sure you want to delete ${child.name}?`)) {
            this.children = this.children.filter(c => c.id !== childId);
            this.saveUserData();
            this.calculateFamilyStats();
            this.updateUI();
            this.showNotification(`${child.name} has been removed`, 'success');
        }
    }

    exportData() {
        const data = {
            children: this.children,
            goals: this.goals,
            familyStats: this.familyStats,
            exportDate: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `kidobo-family-data-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        this.showNotification('Family data exported successfully!', 'success');
    }

    exportReport() {
        const reportData = {
            reportType: 'Family Reading Report',
            generatedDate: new Date().toISOString(),
            familyStats: this.familyStats,
            children: this.children,
            goals: this.goals,
            activities: this.activities
        };
        
        const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `kidobo-report-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        this.showNotification('Report exported successfully!', 'success');
    }

    printReport() {
        window.print();
        this.showNotification('Print dialog opened', 'info');
    }

    generateReport() {
        const childFilter = document.getElementById('reportChildFilter').value;
        const reportType = document.getElementById('reportTypeFilter').value;
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        
        // Generate report based on filters
        this.showNotification(`Report generated for ${reportType} period`, 'success');
    }

    updateUI() {
        // Update dashboard stats
        document.getElementById('totalChildren').textContent = this.familyStats.totalChildren;
        document.getElementById('totalBooksRead').textContent = this.familyStats.totalBooksRead;
        document.getElementById('totalStars').textContent = this.familyStats.totalStars;
        document.getElementById('totalReadingTime').textContent = this.familyStats.totalReadingTime;
        
        // Update parent name
        document.getElementById('parentName').textContent = this.currentUser?.name || 'Parent';
        
        // Update children grid on overview page
        this.updateChildrenGrid();
        
        // Update recent activity
        this.updateRecentActivity();
        
        // Update current goals
        this.updateCurrentGoals();
        
        // Update popular stories
        this.updatePopularStories();
    }

    updateChildrenGrid() {
        const childrenGrid = document.getElementById('childrenGrid');
        if (!childrenGrid) return;
        
        childrenGrid.innerHTML = '';
        
        this.children.forEach(child => {
            const childCard = document.createElement('div');
            childCard.className = 'child-overview-card';
            childCard.innerHTML = `
                <div class="child-avatar">
                    <div class="child-avatar-medium">${child.avatar}</div>
                </div>
                <div class="child-overview-info">
                    <h4>${child.name}</h4>
                    <p>Age ${child.age}</p>
                    <div class="child-overview-stats">
                        <span>📖 ${child.booksRead} books</span>
                        <span>⭐ ${child.totalStars} stars</span>
                    </div>
                </div>
            `;
            
            childrenGrid.appendChild(childCard);
        });
    }

    updateRecentActivity() {
        const recentActivity = document.getElementById('recentActivity');
        if (!recentActivity) return;
        
        recentActivity.innerHTML = '';
        
        this.activities.slice(0, 5).forEach(activity => {
            const activityItem = document.createElement('div');
            activityItem.className = 'activity-item';
            activityItem.innerHTML = `
                <span class="activity-action">${activity.action}</span>
                <span class="activity-time">${activity.time}</span>
            `;
            
            recentActivity.appendChild(activityItem);
        });
    }

    updateCurrentGoals() {
        const currentGoals = document.getElementById('currentGoals');
        if (!currentGoals) return;
        
        currentGoals.innerHTML = '';
        
        this.goals.slice(0, 2).forEach(goal => {
            const progress = (goal.current / goal.target) * 100;
            const goalItem = document.createElement('div');
            goalItem.className = 'goal-item';
            goalItem.innerHTML = `
                <h5>${goal.title}</h5>
                <p>${goal.description}</p>
                <div class="goal-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progress}%"></div>
                    </div>
                    <span>${goal.current}/${goal.target} ${goal.metric}</span>
                </div>
            `;
            
            currentGoals.appendChild(goalItem);
        });
    }

    updatePopularStories() {
        const popularStories = document.getElementById('popularStories');
        if (!popularStories) return;
        
        // This would be populated with actual story data
        // For now, showing sample data
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

// Initialize the parent dashboard
const parentDashboard = new ParentDashboard(); 