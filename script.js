import SocialMediaService from './services.js';

// Enhanced chart configurations with modern styling
const chartConfig = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
        duration: 1200,
        easing: 'easeOutQuart'
    },
    plugins: {
        legend: {
            position: 'top',
            labels: {
                usePointStyle: true,
                padding: 20,
                font: {
                    size: 12,
                    family: 'Inter',
                    weight: '500'
                },
                color: '#64748b'
            }
        },
        tooltip: {
            mode: 'index',
            intersect: false,
            backgroundColor: 'rgba(255, 255, 255, 0.98)',
            titleColor: '#0f172a',
            bodyColor: '#64748b',
            borderColor: '#e2e8f0',
            borderWidth: 1,
            padding: 16,
            bodyFont: {
                size: 13,
                family: 'Inter'
            },
            titleFont: {
                size: 14,
                weight: '600',
                family: 'Inter'
            },
            displayColors: true,
            boxWidth: 8,
            boxHeight: 8,
            boxPadding: 4,
            usePointStyle: true,
            cornerRadius: 8,
            callbacks: {
                label: function(context) {
                    let label = context.dataset.label || '';
                    if (label) {
                        label += ': ';
                    }
                    if (context.parsed.y !== null) {
                        label += new Intl.NumberFormat().format(context.parsed.y);
                    }
                    return label;
                }
            }
        }
    },
    scales: {
        y: {
            beginAtZero: true,
            grid: {
                color: 'rgba(0, 0, 0, 0.05)',
                drawBorder: false
            },
            ticks: {
                font: {
                    size: 12,
                    family: 'Inter'
                },
                color: '#64748b',
                padding: 8,
                callback: function(value) {
                    return new Intl.NumberFormat().format(value);
                }
            },
            border: {
                display: false
            }
        },
        x: {
            grid: {
                display: false
            },
            ticks: {
                font: {
                    size: 12,
                    family: 'Inter'
                },
                color: '#64748b',
                padding: 8
            },
            border: {
                display: false
            }
        }
    },
    interaction: {
        mode: 'nearest',
        axis: 'x',
        intersect: false
    }
};

// Mini chart configuration for stat cards
const miniChartConfig = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { display: false },
        tooltip: { enabled: false }
    },
    scales: {
        x: { display: false },
        y: { display: false }
    },
    elements: {
        point: { radius: 0 },
        line: { borderWidth: 2, tension: 0.4 }
    }
};

// Initialize charts
let engagementChart, growthChart;
let miniCharts = {};

// Sample data for demonstration
const sampleData = {
    engagement: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Facebook',
                data: [1200, 1350, 1100, 1400, 1600, 1800, 1700],
                borderColor: '#1877f2',
                backgroundColor: 'rgba(24, 119, 242, 0.1)',
                tension: 0.4,
                fill: true
            },
            {
                label: 'Twitter',
                data: [800, 950, 700, 1100, 1200, 1400, 1300],
                borderColor: '#1da1f2',
                backgroundColor: 'rgba(29, 161, 242, 0.1)',
                tension: 0.4,
                fill: true
            },
            {
                label: 'Instagram',
                data: [1500, 1700, 1400, 1800, 2000, 2200, 2100],
                borderColor: '#e4405f',
                backgroundColor: 'rgba(228, 64, 95, 0.1)',
                tension: 0.4,
                fill: true
            }
        ]
    },
    growth: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Total Followers',
            data: [10500, 10800, 11100, 11400, 11700, 12000, 12300],
            borderColor: '#6366f1',
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            tension: 0.4,
            fill: true
        }]
    },
    miniCharts: {
        facebook: [10500, 10600, 10700, 10800, 10900, 11000, 11100],
        twitter: [8200, 8300, 8400, 8500, 8600, 8700, 8800],
        instagram: [15700, 15900, 16100, 16300, 16500, 16700, 16900],
        linkedin: [5800, 5850, 5900, 5950, 6000, 6050, 6100]
    }
};

// Dashboard sections
const dashboardSections = {
    overview: {
        title: 'Social Media Analytics',
        subtitle: 'Track your social media performance across all platforms',
        breadcrumb: 'Overview'
    },
    analytics: {
        title: 'Advanced Analytics',
        subtitle: 'Deep dive into your social media performance metrics',
        breadcrumb: 'Analytics'
    },
    reports: {
        title: 'Reports & Insights',
        subtitle: 'Generate comprehensive reports and detailed insights',
        breadcrumb: 'Reports'
    },
    settings: {
        title: 'Dashboard Settings',
        subtitle: 'Configure your dashboard preferences and integrations',
        breadcrumb: 'Settings'
    }
};

// Initialize the dashboard
async function initializeDashboard() {
    try {
        showLoading();
        
        // Initialize GSAP animations
        initializeAnimations();
        
        // Initialize charts
        initializeCharts();
        
        // Initialize interactive features
        initializeInteractiveFeatures();
        
        // Initialize theme toggle
        initThemeToggle();
        
        // Add loading states
        addLoadingStates();
        
        // Initialize real-time updates
        await initializeRealTimeUpdates();
        
        // Hide loading after everything is ready
        setTimeout(() => {
            hideLoading();
        }, 1500);
        
    } catch (error) {
        console.error('Error initializing dashboard:', error);
        hideLoading();
        showError('Failed to load dashboard data');
    }
}

// Initialize GSAP animations
function initializeAnimations() {
    // Animate stat cards on load
    gsap.from('.stat-card', {
        duration: 0.8,
        y: 50,
        opacity: 0,
        stagger: 0.1,
        ease: 'power2.out'
    });
    
    // Animate chart cards
    gsap.from('.chart-card', {
        duration: 0.8,
        x: -50,
        opacity: 0,
        stagger: 0.2,
        ease: 'power2.out',
        delay: 0.4
    });
    
    // Animate activity and insights cards
    gsap.from('.activity-card, .insights-card', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.6
    });
    
    // Animate performance card
    gsap.from('.performance-card', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        ease: 'power2.out',
        delay: 0.8
    });
}

// Initialize charts with enhanced styling
function initializeCharts() {
    const engagementCtx = document.getElementById('engagementChart');
    const growthCtx = document.getElementById('growthChart');
    
    if (engagementCtx) {
        engagementChart = new Chart(engagementCtx, {
            type: 'line',
            data: sampleData.engagement,
            options: chartConfig
        });
    }
    
    if (growthCtx) {
        growthChart = new Chart(growthCtx, {
            type: 'line',
            data: sampleData.growth,
            options: chartConfig
        });
    }
    
    // Initialize mini charts
    initializeMiniCharts();
}

// Initialize mini charts for stat cards
function initializeMiniCharts() {
    const platforms = ['facebook', 'twitter', 'instagram', 'linkedin'];
    
    platforms.forEach(platform => {
        const canvas = document.getElementById(`${platform}Chart`);
        if (canvas) {
            const ctx = canvas.getContext('2d');
            const data = sampleData.miniCharts[platform];
            
            miniCharts[platform] = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['', '', '', '', '', '', ''],
                    datasets: [{
                        data: data,
                        borderColor: getPlatformColor(platform),
                        backgroundColor: getPlatformColor(platform, 0.1),
                        tension: 0.4,
                        fill: true,
                        borderWidth: 2,
                        pointRadius: 0
                    }]
                },
                options: miniChartConfig
            });
        }
    });
}

// Get platform color
function getPlatformColor(platform, alpha = 1) {
    const colors = {
        facebook: `rgba(24, 119, 242, ${alpha})`,
        twitter: `rgba(29, 161, 242, ${alpha})`,
        instagram: `rgba(228, 64, 95, ${alpha})`,
        linkedin: `rgba(0, 119, 181, ${alpha})`
    };
    return colors[platform] || `rgba(99, 102, 241, ${alpha})`;
}

// Initialize interactive features
function initializeInteractiveFeatures() {
    // Chart period buttons
    const chartButtons = document.querySelectorAll('.chart-btn');
    chartButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const parent = this.closest('.chart-actions');
            parent.querySelectorAll('.chart-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Animate button click
            gsap.to(this, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1
            });
            
            // Update chart data based on period
            updateChartData(this.dataset.period);
        });
    });
    
    // Performance filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const parent = this.closest('.performance-filter');
            parent.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Animate button click
            gsap.to(this, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1
            });
            
            // Filter metrics based on platform
            filterMetrics(this.textContent);
        });
    });
    
    // Navigation items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Animate active state
            gsap.to(this, {
                scale: 1.05,
                duration: 0.2,
                yoyo: true,
                repeat: 1
            });
            
            // Get section from data attribute
            const section = this.getAttribute('data-section');
            if (section && dashboardSections[section]) {
                updateDashboardSection(section);
            }
        });
    });
    
    // Social links hover effects
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.1,
                duration: 0.2,
                ease: 'power2.out'
            });
        });
        
        link.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                duration: 0.2,
                ease: 'power2.out'
            });
        });
    });
    
    // Activity items hover effects
    const activityItems = document.querySelectorAll('.activity-item');
    activityItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            gsap.to(this, {
                x: 5,
                duration: 0.2,
                ease: 'power2.out'
            });
        });
        
        item.addEventListener('mouseleave', function() {
            gsap.to(this, {
                x: 0,
                duration: 0.2,
                ease: 'power2.out'
            });
        });
    });
}

// Update dashboard section
function updateDashboardSection(section) {
    const sectionData = dashboardSections[section];
    if (!sectionData) return;
    
    // Update header content
    const headerTitle = document.querySelector('.header-content h1');
    const headerSubtitle = document.querySelector('.header-content .subtitle');
    const activeBreadcrumb = document.querySelector('.breadcrumb-item.active');
    
    if (headerTitle) {
        gsap.to(headerTitle, {
            opacity: 0,
            duration: 0.2,
            onComplete: () => {
                headerTitle.textContent = sectionData.title;
                gsap.to(headerTitle, { opacity: 1, duration: 0.2 });
            }
        });
    }
    
    if (headerSubtitle) {
        gsap.to(headerSubtitle, {
            opacity: 0,
            duration: 0.2,
            onComplete: () => {
                headerSubtitle.textContent = sectionData.subtitle;
                gsap.to(headerSubtitle, { opacity: 1, duration: 0.2 });
            }
        });
    }
    
    if (activeBreadcrumb) {
        gsap.to(activeBreadcrumb, {
            opacity: 0.5,
            duration: 0.2,
            yoyo: true,
            repeat: 1,
            onComplete: () => {
                activeBreadcrumb.textContent = sectionData.breadcrumb;
            }
        });
    }
    
    // Show different content based on section
    showSectionContent(section);
}

// Show section-specific content
function showSectionContent(section) {
    // Hide all section-specific content first
    const allSections = document.querySelectorAll('.section-content');
    allSections.forEach(s => s.style.display = 'none');
    
    // Show the selected section content
    const selectedSection = document.querySelector(`.${section}-content`);
    if (selectedSection) {
        selectedSection.style.display = 'block';
        gsap.from(selectedSection, {
            opacity: 0,
            y: 20,
            duration: 0.5,
            ease: 'power2.out'
        });
    }
}

// Update chart data based on period
function updateChartData(period) {
    const days = parseInt(period);
    const labels = generateLabels(days);
    
    // Generate new data based on period
    const newEngagementData = generateEngagementData(days);
    const newGrowthData = generateGrowthData(days);
    
    // Update engagement chart
    if (engagementChart) {
        engagementChart.data.labels = labels;
        engagementChart.data.datasets.forEach((dataset, index) => {
            dataset.data = newEngagementData[index];
        });
        engagementChart.update('active');
    }
    
    // Update growth chart
    if (growthChart) {
        growthChart.data.labels = labels;
        growthChart.data.datasets[0].data = newGrowthData;
        growthChart.update('active');
    }
}

// Generate labels based on period
function generateLabels(days) {
    const labels = [];
    const today = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        labels.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
    }
    
    return labels;
}

// Generate engagement data
function generateEngagementData(days) {
    const data = [];
    for (let i = 0; i < 3; i++) {
        const platformData = [];
        let baseValue = 1000 + (i * 200);
        
        for (let j = 0; j < days; j++) {
            const variation = Math.random() * 400 - 200;
            platformData.push(Math.max(0, baseValue + variation));
        }
        data.push(platformData);
    }
    return data;
}

// Generate growth data
function generateGrowthData(days) {
    const data = [];
    let baseValue = 10000;
    
    for (let i = 0; i < days; i++) {
        const growth = Math.random() * 200 + 50;
        baseValue += growth;
        data.push(Math.round(baseValue));
    }
    
    return data;
}

// Filter metrics based on platform
function filterMetrics(platform) {
    const metricItems = document.querySelectorAll('.metric-item');
    
    metricItems.forEach(item => {
        if (platform === 'All') {
            gsap.to(item, {
                opacity: 1,
                scale: 1,
                duration: 0.3
            });
        } else {
            // Simulate filtering (in real app, this would filter actual data)
            gsap.to(item, {
                opacity: 0.7,
                scale: 0.98,
                duration: 0.3
            });
        }
    });
}

// Initialize theme toggle with enhanced functionality
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // Animate theme transition
        gsap.to(body, {
            opacity: 0.8,
            duration: 0.2,
            onComplete: () => {
                body.setAttribute('data-theme', newTheme);
                updateThemeIcon(newTheme);
                localStorage.setItem('theme', newTheme);
                
                // Update chart colors for dark theme
                updateChartColors(newTheme);
                
                gsap.to(body, {
                    opacity: 1,
                    duration: 0.2
                });
            }
        });
        
        // Animate button
        gsap.to(this, {
            rotation: 180,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
}

// Update theme icon
function updateThemeIcon(theme) {
    const icon = document.querySelector('.theme-toggle i');
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// Update chart colors for theme
function updateChartColors(theme) {
    const isDark = theme === 'dark';
    
    // Update chart text colors
    const chartTextColor = isDark ? '#cbd5e1' : '#64748b';
    const chartGridColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
    
    // Update engagement chart
    if (engagementChart) {
        engagementChart.options.scales.y.ticks.color = chartTextColor;
        engagementChart.options.scales.x.ticks.color = chartTextColor;
        engagementChart.options.scales.y.grid.color = chartGridColor;
        engagementChart.options.plugins.legend.labels.color = chartTextColor;
        engagementChart.update('none');
    }
    
    // Update growth chart
    if (growthChart) {
        growthChart.options.scales.y.ticks.color = chartTextColor;
        growthChart.options.scales.x.ticks.color = chartTextColor;
        growthChart.options.scales.y.grid.color = chartGridColor;
        growthChart.options.plugins.legend.labels.color = chartTextColor;
        growthChart.update('none');
    }
    
    // Update mini charts
    Object.values(miniCharts).forEach(chart => {
        if (chart) {
            chart.update('none');
        }
    });
}

// Add loading states with animations
function addLoadingStates() {
    // Add loading animation to stat numbers
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(number => {
        const finalValue = number.getAttribute('data-value');
        if (finalValue) {
            animateNumber(number, finalValue);
        }
    });
    
    // Add pulse animation to insight items
    const insightItems = document.querySelectorAll('.insight-item');
    insightItems.forEach((item, index) => {
        gsap.to(item, {
            scale: 1.02,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'power2.inOut',
            delay: index * 0.2
        });
    });
}

// Animate number changes
function animateNumber(element, targetValue) {
    const currentValue = parseInt(element.textContent.replace(/[^\d]/g, ''));
    const target = parseInt(targetValue);
    
    gsap.to({}, {
        duration: 2,
        onUpdate: function() {
            const progress = this.progress();
            const current = Math.round(currentValue + (target - currentValue) * progress);
            element.textContent = formatNumber(current);
        },
        ease: 'power2.out'
    });
}

// Format number with K/M suffix
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Initialize real-time updates
async function initializeRealTimeUpdates() {
    try {
        // Simulate real-time data updates
        setInterval(() => {
            updateRealTimeData();
        }, 30000); // Update every 30 seconds
        
        // Initial update
        updateRealTimeData();
        
    } catch (error) {
        console.error('Error initializing real-time updates:', error);
    }
}

// Update real-time data
function updateRealTimeData() {
    // Update mini charts with new data
    Object.keys(miniCharts).forEach(platform => {
        if (miniCharts[platform]) {
            const newData = generateMiniChartData(platform);
            miniCharts[platform].data.datasets[0].data = newData;
            miniCharts[platform].update('none');
        }
    });
    
    // Update activity items with new timestamps
    updateActivityTimestamps();
}

// Generate mini chart data
function generateMiniChartData(platform) {
    const baseValues = {
        facebook: 10500,
        twitter: 8200,
        instagram: 15700,
        linkedin: 5800
    };
    
    const data = [];
    let baseValue = baseValues[platform];
    
    for (let i = 0; i < 7; i++) {
        const variation = Math.random() * 200 - 100;
        baseValue += variation;
        data.push(Math.max(0, baseValue));
    }
    
    return data;
}

// Update activity timestamps
function updateActivityTimestamps() {
    const timeElements = document.querySelectorAll('.activity-time');
    timeElements.forEach(element => {
        const currentText = element.textContent;
        if (currentText.includes('hours ago')) {
            const hours = parseInt(currentText);
            if (hours < 24) {
                element.textContent = `${hours + 1} hours ago`;
            } else {
                element.textContent = '1 day ago';
            }
        }
    });
}

// Show loading overlay
function showLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.classList.add('show');
    }
}

// Hide loading overlay
function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        gsap.to(overlay, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                overlay.classList.remove('show');
            }
        });
    }
}

// Show error message
function showError(message) {
    // Create error notification
    const notification = document.createElement('div');
    notification.className = 'error-notification';
    notification.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        <span>${message}</span>
    `;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ef4444;
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(239, 68, 68, 0.3);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    gsap.to(notification, {
        x: 0,
        duration: 0.3,
        ease: 'power2.out'
    });
    
    // Remove after 5 seconds
    setTimeout(() => {
        gsap.to(notification, {
            x: '100%',
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
                document.body.removeChild(notification);
            }
        });
    }, 5000);
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeDashboard);

// Export functions for potential external use
export {
    initializeDashboard,
    updateChartData,
    filterMetrics,
    showError,
    hideLoading
};