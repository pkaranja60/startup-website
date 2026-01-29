import { Code2, Cloud, Database, Headphones, Lightbulb, Palette, Rocket, Search, TrendingUp, Users, Zap, Smartphone, Shield, Cpu, Award } from "lucide-react";

export    const services = [
        {
            icon: Code2,
            title: 'Web Development',
            description: 'Custom web applications built with Next.js, React, and modern technologies. Optimized for performance, SEO, and scalability.',
            features: ['E-commerce platforms', 'Corporate websites', 'Web portals', 'Progressive Web Apps'],
            color: 'primary',
            link: '/services/web-development'
        },
        {
            icon: Smartphone,
            title: 'Mobile App Development',
            description: 'Native and cross-platform mobile applications for iOS and Android with seamless user experiences.',
            features: ['Native iOS & Android', 'Cross-platform (Flutter)', 'App maintenance', 'App store optimization'],
            color: 'accent',
            link: '/services/mobile-development'
        },
        {
            icon: Shield,
            title: 'Cybersecurity Solutions',
            description: 'Comprehensive security services to protect your business from cyber threats and ensure compliance.',
            features: ['Security audits', 'Penetration testing', 'Compliance consulting', '24/7 monitoring'],
            color: 'purple',
            link: '/services/cybersecurity'
        },
        {
            icon: Cloud,
            title: 'Cloud Infrastructure',
            description: 'Scalable cloud solutions on AWS, Azure, and Google Cloud. Migration, optimization, and management.',
            features: ['Cloud migration', 'DevOps setup', 'Auto-scaling', 'Cost optimization'],
            color: 'primary',
            link: '/services/cloud'
        },
        {
            icon: Database,
            title: 'Database Solutions',
            description: 'Design, implementation, and optimization of robust database systems for your business data.',
            features: ['Database design', 'Performance tuning', 'Backup solutions', 'Data migration'],
            color: 'accent',
            link: '/services/database'
        },
        {
            icon: Cpu,
            title: 'AI & Machine Learning',
            description: 'Integrate intelligent automation and AI capabilities into your products and workflows.',
            features: ['Custom AI models', 'Chatbot development', 'Data analytics', 'Process automation'],
            color: 'purple',
            link: '/services/ai'
        }
    ];

export const caseStudies = [
        {
            title: 'Hospital Management System',
            client: 'HealthTech Solutions',
            category: 'Healthcare',
            description: 'Complete digital transformation of hospital operations including patient management, billing, and analytics.',
            image: '/case-studies/healthcare.jpg', // You'll need to add actual images
            results: [
                { icon: TrendingUp, value: '40%', label: 'Efficiency increase' },
                { icon: Users, value: '10K+', label: 'Patients managed' },
                { icon: Zap, value: '6 weeks', label: 'Development time' }
            ],
            tech: ['Next.js', 'PostgreSQL', 'AWS', 'WebSockets'],
            color: 'from-blue-500/20 to-cyan-500/20',
            link: '/case-studies/healthcare'
        },
        {
            title: 'Mobile Banking Application',
            client: 'FinanceHub Africa',
            category: 'Fintech',
            description: 'Secure mobile banking app with real-time transactions, biometric authentication, and comprehensive financial tools.',
            image: '/case-studies/fintech.jpg',
            results: [
                { icon: Users, value: '50K+', label: 'Active users' },
                { icon: TrendingUp, value: '0', label: 'Security breaches' },
                { icon: Zap, value: '<2s', label: 'Transaction time' }
            ],
            tech: ['Flutter', 'Node.js', 'MongoDB', 'Azure'],
            color: 'from-green-500/20 to-emerald-500/20',
            link: '/case-studies/fintech'
        },
        {
            title: 'E-Learning Platform',
            client: 'EduLearn Platform',
            category: 'Education',
            description: 'Scalable e-learning solution with live classes, course management, and progress tracking for students and educators.',
            image: '/case-studies/education.jpg',
            results: [
                { icon: Users, value: '10K+', label: 'Concurrent users' },
                { icon: TrendingUp, value: '300%', label: 'Engagement boost' },
                { icon: Zap, value: '6 weeks', label: 'Time to market' }
            ],
            tech: ['React', 'Python', 'WebRTC', 'Redis'],
            color: 'from-purple-500/20 to-pink-500/20',
            link: '/case-studies/education'
        }
    ];

    export   const steps = [
        {
            step: '01',
            icon: Search,
            title: 'Discovery & Analysis',
            description: 'We start by understanding your business goals, target audience, and technical requirements through detailed consultation.',
            deliverables: ['Requirements document', 'Technical feasibility study', 'Project timeline']
        },
        {
            step: '02',
            icon: Lightbulb,
            title: 'Strategy & Planning',
            description: 'Create a comprehensive roadmap with milestones, technology stack selection, and resource allocation.',
            deliverables: ['Project roadmap', 'Architecture design', 'Sprint planning']
        },
        {
            step: '03',
            icon: Palette,
            title: 'Design & Prototyping',
            description: 'User-centric UI/UX design with interactive prototypes to visualize the final product before development.',
            deliverables: ['Wireframes', 'UI/UX design', 'Interactive prototype']
        },
        {
            step: '04',
            icon: Code2,
            title: 'Development & Testing',
            description: 'Agile development with continuous integration, rigorous testing, and regular progress updates.',
            deliverables: ['Clean code', 'Unit tests', 'Integration tests']
        },
        {
            step: '05',
            icon: Rocket,
            title: 'Deployment & Launch',
            description: 'Smooth deployment to production with monitoring setup, performance optimization, and go-live support.',
            deliverables: ['Production deployment', 'Monitoring setup', 'Documentation']
        },
        {
            step: '06',
            icon: Headphones,
            title: 'Support & Maintenance',
            description: 'Ongoing technical support, bug fixes, security updates, and feature enhancements as your business grows.',
            deliverables: ['24/7 support', 'Monthly updates', 'Performance reports']
        }
    ];

    export    const reasons = [
        {
            icon: Zap,
            title: 'Lightning Fast Delivery',
            description: 'Agile methodology ensures rapid development without compromising quality. Get to market faster.',
            stat: '2-8 weeks',
            statLabel: 'Average turnaround'
        },
        {
            icon: Shield,
            title: 'Enterprise Security',
            description: 'Bank-level security protocols, regular audits, and compliance with international standards.',
            stat: 'ISO 27001',
            statLabel: 'Certified processes'
        },
        {
            icon: Headphones,
            title: '24/7 Technical Support',
            description: 'Round-the-clock support from our expert team. No issue is too small or too complex.',
            stat: '<1 hour',
            statLabel: 'Response time'
        },
        {
            icon: Award,
            title: 'Proven Track Record',
            description: 'Over 400 successful projects across healthcare, finance, retail, and technology sectors.',
            stat: '98%',
            statLabel: 'Success rate'
        },
        {
            icon: TrendingUp,
            title: 'Scalable Solutions',
            description: 'Built to grow with your business. From startup to enterprise, our solutions scale seamlessly.',
            stat: '10x',
            statLabel: 'Growth capacity'
        },
        {
            icon: Users,
            title: 'Expert Team',
            description: 'Senior developers, security specialists, and consultants with 10+ years of experience.',
            stat: '50+',
            statLabel: 'Tech experts'
        }
    ];

    export const guarantees = [
        'Money-back guarantee if not satisfied',
        'Free consultation & project scoping',
        'Transparent pricing with no hidden fees',
        'Post-launch support included'
    ];