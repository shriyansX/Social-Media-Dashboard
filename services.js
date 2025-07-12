// Enhanced Social Media Service with modern API handling
class SocialMediaService {
    constructor() {
        this.baseUrls = {
            facebook: 'https://graph.facebook.com/v18.0',
            twitter: 'https://api.twitter.com/2',
            instagram: 'https://graph.instagram.com/v18.0',
            linkedin: 'https://api.linkedin.com/v2'
        };
        
        this.cache = new Map();
        this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
    }

    // Get all social media statistics
    async getAllStats() {
        try {
            const [facebook, twitter, instagram, linkedin] = await Promise.allSettled([
                this.getFacebookStats(),
                this.getTwitterStats(),
                this.getInstagramStats(),
                this.getLinkedInStats()
            ]);

            return {
                facebook: facebook.status === 'fulfilled' ? facebook.value : null,
                twitter: twitter.status === 'fulfilled' ? twitter.value : null,
                instagram: instagram.status === 'fulfilled' ? instagram.value : null,
                linkedin: linkedin.status === 'fulfilled' ? linkedin.value : null
            };
        } catch (error) {
            console.error('Error fetching all stats:', error);
            throw new Error('Failed to fetch social media statistics');
        }
    }

    // Get Facebook statistics
    async getFacebookStats() {
        const cacheKey = 'facebook_stats';
        const cached = this.getCachedData(cacheKey);
        if (cached) return cached;

        try {
            // Simulate API call with realistic data
            const stats = {
                followers: 10500 + Math.floor(Math.random() * 500),
                engagement: 4.8 + Math.random() * 2,
                reach: 45000 + Math.floor(Math.random() * 5000),
                impressions: 128000 + Math.floor(Math.random() * 10000),
                posts: 156,
                pageViews: 8900 + Math.floor(Math.random() * 1000),
                lastUpdated: new Date().toISOString()
            };

            this.setCachedData(cacheKey, stats);
            return stats;
        } catch (error) {
            console.error('Error fetching Facebook stats:', error);
            throw new Error('Failed to fetch Facebook statistics');
        }
    }

    // Get Twitter statistics
    async getTwitterStats() {
        const cacheKey = 'twitter_stats';
        const cached = this.getCachedData(cacheKey);
        if (cached) return cached;

        try {
            // Simulate API call with realistic data
            const stats = {
                followers: 8200 + Math.floor(Math.random() * 300),
                engagement: 3.2 + Math.random() * 1.5,
                reach: 32000 + Math.floor(Math.random() * 3000),
                impressions: 95000 + Math.floor(Math.random() * 8000),
                tweets: 89,
                retweets: 234 + Math.floor(Math.random() * 50),
                likes: 567 + Math.floor(Math.random() * 100),
                lastUpdated: new Date().toISOString()
            };

            this.setCachedData(cacheKey, stats);
            return stats;
        } catch (error) {
            console.error('Error fetching Twitter stats:', error);
            throw new Error('Failed to fetch Twitter statistics');
        }
    }

    // Get Instagram statistics
    async getInstagramStats() {
        const cacheKey = 'instagram_stats';
        const cached = this.getCachedData(cacheKey);
        if (cached) return cached;

        try {
            // Simulate API call with realistic data
            const stats = {
                followers: 15700 + Math.floor(Math.random() * 800),
                engagement: 6.1 + Math.random() * 2.5,
                reach: 68000 + Math.floor(Math.random() * 8000),
                impressions: 145000 + Math.floor(Math.random() * 15000),
                posts: 234,
                stories: 89,
                reels: 45,
                likes: 8900 + Math.floor(Math.random() * 1500),
                comments: 567 + Math.floor(Math.random() * 200),
                lastUpdated: new Date().toISOString()
            };

            this.setCachedData(cacheKey, stats);
            return stats;
        } catch (error) {
            console.error('Error fetching Instagram stats:', error);
            throw new Error('Failed to fetch Instagram statistics');
        }
    }

    // Get LinkedIn statistics
    async getLinkedInStats() {
        const cacheKey = 'linkedin_stats';
        const cached = this.getCachedData(cacheKey);
        if (cached) return cached;

        try {
            // Simulate API call with realistic data
            const stats = {
                connections: 5800 + Math.floor(Math.random() * 200),
                followers: 3200 + Math.floor(Math.random() * 150),
                engagement: 2.8 + Math.random() * 1.2,
                reach: 18000 + Math.floor(Math.random() * 2000),
                impressions: 45000 + Math.floor(Math.random() * 5000),
                posts: 67,
                profileViews: 890 + Math.floor(Math.random() * 200),
                lastUpdated: new Date().toISOString()
            };

            this.setCachedData(cacheKey, stats);
            return stats;
        } catch (error) {
            console.error('Error fetching LinkedIn stats:', error);
            throw new Error('Failed to fetch LinkedIn statistics');
        }
    }

    // Get engagement data for charts
    async getEngagementData(period = 7) {
        try {
            const data = {
                labels: this.generateDateLabels(period),
                datasets: [
                    {
                        label: 'Facebook',
                        data: this.generateEngagementData(period, 1200, 1800),
                        borderColor: '#1877f2',
                        backgroundColor: 'rgba(24, 119, 242, 0.1)',
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'Twitter',
                        data: this.generateEngagementData(period, 800, 1400),
                        borderColor: '#1da1f2',
                        backgroundColor: 'rgba(29, 161, 242, 0.1)',
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'Instagram',
                        data: this.generateEngagementData(period, 1500, 2200),
                        borderColor: '#e4405f',
                        backgroundColor: 'rgba(228, 64, 95, 0.1)',
                        tension: 0.4,
                        fill: true
                    }
                ]
            };

            return data;
        } catch (error) {
            console.error('Error generating engagement data:', error);
            throw new Error('Failed to generate engagement data');
        }
    }

    // Get growth data for charts
    async getGrowthData(period = 7) {
        try {
            const data = {
                labels: this.generateDateLabels(period),
                datasets: [{
                    label: 'Total Followers',
                    data: this.generateGrowthData(period),
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            };

            return data;
        } catch (error) {
            console.error('Error generating growth data:', error);
            throw new Error('Failed to generate growth data');
        }
    }

    // Get recent activity
    async getRecentActivity() {
        try {
            const activities = [
                {
                    platform: 'facebook',
                    type: 'post',
                    message: 'New post reached 2.4K people',
                    metric: '2.4K',
                    metricLabel: 'Reach',
                    time: '2 hours ago',
                    icon: 'fab fa-facebook'
                },
                {
                    platform: 'twitter',
                    type: 'tweet',
                    message: 'Tweet received 156 retweets',
                    metric: '156',
                    metricLabel: 'Retweets',
                    time: '5 hours ago',
                    icon: 'fab fa-twitter'
                },
                {
                    platform: 'instagram',
                    type: 'story',
                    message: 'Story viewed by 1.2K users',
                    metric: '1.2K',
                    metricLabel: 'Views',
                    time: '8 hours ago',
                    icon: 'fab fa-instagram'
                },
                {
                    platform: 'linkedin',
                    type: 'post',
                    message: 'Post engagement increased by 23%',
                    metric: '23%',
                    metricLabel: 'Growth',
                    time: '1 day ago',
                    icon: 'fab fa-linkedin'
                }
            ];

            return activities;
        } catch (error) {
            console.error('Error fetching recent activity:', error);
            throw new Error('Failed to fetch recent activity');
        }
    }

    // Get insights and recommendations
    async getInsights() {
        try {
            const insights = [
                {
                    type: 'positive',
                    title: 'Instagram Performance',
                    message: 'Your Instagram posts are performing 34% better than average',
                    icon: 'fas fa-arrow-up',
                    priority: 'high'
                },
                {
                    type: 'warning',
                    title: 'Twitter Engagement',
                    message: 'Consider posting more frequently on Twitter to boost engagement',
                    icon: 'fas fa-exclamation-triangle',
                    priority: 'medium'
                },
                {
                    type: 'positive',
                    title: 'Overall Growth',
                    message: 'Total followers increased by 8.2% this month',
                    icon: 'fas fa-chart-line',
                    priority: 'high'
                }
            ];

            return insights;
        } catch (error) {
            console.error('Error fetching insights:', error);
            throw new Error('Failed to fetch insights');
        }
    }

    // Generate date labels for charts
    generateDateLabels(period) {
        const labels = [];
        const today = new Date();
        
        for (let i = period - 1; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            labels.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
        }
        
        return labels;
    }

    // Generate engagement data
    generateEngagementData(period, min, max) {
        const data = [];
        for (let i = 0; i < period; i++) {
            const value = min + Math.random() * (max - min);
            data.push(Math.round(value));
        }
        return data;
    }

    // Generate growth data
    generateGrowthData(period) {
        const data = [];
        let baseValue = 40000; // Starting total followers
        
        for (let i = 0; i < period; i++) {
            const growth = Math.random() * 200 + 50;
            baseValue += growth;
            data.push(Math.round(baseValue));
        }
        
        return data;
    }

    // Cache management
    getCachedData(key) {
        const cached = this.cache.get(key);
        if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
            return cached.data;
        }
        return null;
    }

    setCachedData(key, data) {
        this.cache.set(key, {
            data,
            timestamp: Date.now()
        });
    }

    // Clear cache
    clearCache() {
        this.cache.clear();
    }

    // Get cache statistics
    getCacheStats() {
        return {
            size: this.cache.size,
            keys: Array.from(this.cache.keys())
        };
    }

    // Error handling utility
    handleError(error, context) {
        console.error(`Error in ${context}:`, error);
        
        // Create user-friendly error message
        let message = 'An unexpected error occurred';
        
        if (error.message.includes('Failed to fetch')) {
            message = 'Unable to connect to the service. Please check your internet connection.';
        } else if (error.message.includes('API')) {
            message = 'Service temporarily unavailable. Please try again later.';
        } else if (error.message.includes('rate limit')) {
            message = 'Too many requests. Please wait a moment before trying again.';
        }
        
        return {
            error: true,
            message,
            context,
            timestamp: new Date().toISOString()
        };
    }

    // Validate API response
    validateResponse(response, platform) {
        if (!response || typeof response !== 'object') {
            throw new Error(`Invalid response from ${platform} API`);
        }
        
        // Add platform-specific validation here if needed
        return response;
    }

    // Simulate network delay for realistic testing
    async simulateNetworkDelay(min = 100, max = 500) {
        const delay = Math.random() * (max - min) + min;
        await new Promise(resolve => setTimeout(resolve, delay));
    }
}

// Create and export service instance
const socialMediaService = new SocialMediaService();

export default socialMediaService;