import { 
  Zap, 
  Smartphone, 
  Globe,
  Apple,
  PlayCircle,
  Shield,
  Lock,
  Eye,
  Server,
  Database,
  BarChart3,
  TrendingUp,
  Bot,
  MessageSquare} from 'lucide-react';

export const webTechnologies = [
    'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 
    'Node.js', 'PostgreSQL', 'MongoDB', 'GraphQL',
    'AWS', 'Vercel', 'Docker', 'Redis'
  ];

  export const projects = [
    {
      title: 'E-commerce Platform',
      description: 'Full-featured online store with payment integration',
      metrics: { users: '50K+', uptime: '99.9%', speed: '<2s' }
    },
    {
      title: 'SaaS Dashboard',
      description: 'Real-time analytics and user management',
      metrics: { users: '10K+', uptime: '99.99%', speed: '<1.5s' }
    },
    {
      title: 'Corporate Website',
      description: 'Modern, SEO-optimized company presence',
      metrics: { users: '100K+', uptime: '100%', speed: '<1s' }
    }
  ];

  export const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized for 100 Lighthouse scores with sub-second load times'
    },
    {
      icon: Smartphone,
      title: 'Fully Responsive',
      description: 'Perfect experience on every device, from mobile to desktop'
    },
    {
      icon: Globe,
      title: 'SEO Optimized',
      description: 'Built-in SEO best practices for maximum visibility'
    }
  ];

  export const platforms = [
    { icon: Apple, name: 'iOS', color: 'text-gray-300' },
    { icon: PlayCircle, name: 'Android', color: 'text-primary' },
  ];

  export const appFeatures = [
    'Push notifications',
    'Offline functionality',
    'Biometric authentication',
    'Real-time updates',
    'In-app purchases',
    'Social media integration'
  ];

  export const mobileTechnologies = [
    'React Native', 'Flutter', 'Swift', 'Kotlin',
    'Firebase', 'AWS Amplify', 'GraphQL', 'Redux'
  ];

  export const mobileStats = [
    { value: '50K+', label: 'App Downloads' },
    { value: '4.8★', label: 'Average Rating' },
    { value: '100+', label: 'Apps Launched' },
    { value: '98%', label: 'Retention Rate' }
  ];


  export const cybersecurityServices = [
      { icon: Shield, title: 'Security Audits', description: 'Comprehensive security assessment and vulnerability analysis' },
      { icon: Eye, title: 'Penetration Testing', description: 'Ethical hacking to identify and fix security weaknesses' },
      { icon: Lock, title: 'Data Encryption', description: 'End-to-end encryption for sensitive data protection' },
      { icon: Server, title: '24/7 Monitoring', description: 'Real-time threat detection and incident response' }
    ];
  
    export const cybersecurityThreats = [
      'SQL Injection', 'XSS Attacks', 'CSRF', 'DDoS',
      'Malware', 'Phishing', 'Zero-day Exploits', 'Ransomware'
    ];

    export const cloudProviders = [
      { name: 'AWS', logo: '☁️' },
      { name: 'Azure', logo: '⚡' },
      { name: 'Google Cloud', logo: '🌐' }
    ];

    export const cloudBenefits = [
      { icon: Zap, title: '10x Faster Deployment', value: '< 1 hour' },
      { icon: TrendingUp, title: '60% Cost Reduction', value: 'Average savings' },
      { icon: Shield, title: '99.99% Uptime', value: 'Guaranteed SLA' },
      { icon: Server, title: 'Auto-Scaling', value: 'Handle any load' }
    ];

    export  const databases = ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Cassandra', 'DynamoDB'];
  
    export const DatabaseServices = [
    { icon: Database, title: 'Database Design', desc: 'Optimized schema and architecture' },
    { icon: Zap, title: 'Performance Tuning', desc: 'Query optimization and indexing' },
    { icon: Shield, title: 'Backup Solutions', desc: 'Automated backups and recovery' },
    { icon: BarChart3, title: 'Data Analytics', desc: 'Business intelligence and reporting' }
  ];

  export const aiCapabilities = [
    { icon: Bot, title: 'Custom AI Models', desc: 'Trained for your specific use case' },
    { icon: MessageSquare, title: 'Chatbots', desc: '24/7 intelligent customer support' },
    { icon: BarChart3, title: 'Data Analytics', desc: 'AI-powered insights from your data' },
    { icon: Zap, title: 'Process Automation', desc: 'Automate repetitive tasks' }
  ];

  export const aiUseCases = [
    'Customer Service Automation',
    'Predictive Analytics',
    'Document Processing',
    'Image Recognition',
    'Natural Language Processing',
    'Recommendation Systems'
  ];