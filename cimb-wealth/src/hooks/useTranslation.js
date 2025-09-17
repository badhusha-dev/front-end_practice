import { useState, useEffect } from 'react'

const translations = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    investments: 'Investments',
    portfolio: 'Portfolio',
    goals: 'Goals',
    reports: 'Reports',
    settings: 'Settings',
    
    // Common
    totalWealth: 'Total Wealth',
    customers: 'Customers',
    recentTransactions: 'Recent Transactions',
    portfolioOverview: 'Portfolio Overview',
    totalHoldings: 'Total Holdings',
    ytdReturn: 'YTD Return',
    riskProfile: 'Risk Profile',
    moderate: 'Moderate',
    conservative: 'Conservative',
    aggressive: 'Aggressive',
    
    // Dashboard
    customize: 'Customize',
    doneEditing: 'Done Editing',
    addWidget: 'Add Widget',
    wealth: 'Wealth',
    performance: 'Performance',
    goalsProgress: 'Goals Progress',
    marketAlerts: 'Market Alerts',
    marketNews: 'Market News',
    
    // Goals
    financialGoals: 'Financial Goals',
    milestonesAchieved: 'Milestones Achieved',
    recentMilestones: 'Recent Milestones',
    goalAchieved: 'Goal Achieved',
    progress: 'Progress',
    current: 'Current',
    target: 'Target',
    remaining: 'Remaining',
    daysLeft: 'Days Left',
    deadline: 'Deadline',
    
    // Analytics
    advancedAnalytics: 'Advanced Analytics & Predictions',
    aiPoweredInsights: 'AI-powered insights and predictive modeling',
    analysisPeriod: 'Analysis Period',
    predictionConfidence: 'Prediction Confidence',
    lastUpdated: 'Last Updated',
    portfolioPredictions: 'Portfolio Predictions',
    nextMonth: 'Next Month',
    nextQuarter: 'Next Quarter',
    nextYear: 'Next Year',
    riskAnalysis: 'Risk Analysis',
    sharpeRatio: 'Sharpe Ratio',
    beta: 'Beta',
    volatility: 'Volatility',
    maxDrawdown: 'Max Drawdown',
    performanceAnalysis: 'Performance Analysis',
    assetAllocation: 'Asset Allocation',
    riskMetrics: 'Risk Metrics',
    aiGeneratedInsights: 'AI-Generated Insights',
    portfolioOptimization: 'Portfolio Optimization',
    diversificationAlert: 'Diversification Alert',
    taxOptimization: 'Tax Optimization',
    goalProgress: 'Goal Progress',
    
    // Gamification
    investmentGamification: 'Investment Gamification',
    trackProgress: 'Track your progress and compete with other investors',
    totalPoints: 'Total Points',
    achievements: 'Achievements',
    badges: 'Badges',
    growth: 'Growth',
    leaderboard: 'Leaderboard',
    investor: 'Investor',
    score: 'Score',
    portfolio: 'Portfolio',
    progressTracking: 'Progress Tracking',
    diversificationScore: 'Diversification Score',
    riskManagement: 'Risk Management',
    goalsCompleted: 'Goals Completed',
    
    // Security
    enterpriseSecurity: 'Enterprise Security Dashboard',
    monitorSecurity: 'Monitor security events and access patterns',
    totalLogins: 'Total Logins',
    failedAttempts: 'Failed Attempts',
    suspiciousActivities: 'Suspicious Activities',
    securityScore: 'Security Score',
    securityAlerts: 'Security Alerts',
    accessAttempts: 'Access Attempts',
    ipAddress: 'IP Address',
    attempts: 'Attempts',
    success: 'Success',
    lastAttempt: 'Last Attempt',
    status: 'Status',
    securityAuditLog: 'Security Audit Log',
    timestamp: 'Timestamp',
    event: 'Event',
    user: 'User',
    location: 'Location',
    riskLevel: 'Risk Level',
    details: 'Details',
    securitySettings: 'Security Settings',
    twoFactorAuth: 'Two-Factor Authentication',
    emailSecurityAlerts: 'Email Security Alerts',
    autoSessionTimeout: 'Auto Session Timeout',
    ipWhitelist: 'IP Address Whitelist',
    enhancedAuditLogging: 'Enhanced Audit Logging',
    dataEncryption: 'Data Encryption at Rest'
  },
  
  ms: {
    // Navigation
    dashboard: 'Papan Pemuka',
    investments: 'Pelaburan',
    portfolio: 'Portfolio',
    goals: 'Matlamat',
    reports: 'Laporan',
    settings: 'Tetapan',
    
    // Common
    totalWealth: 'Jumlah Kekayaan',
    customers: 'Pelanggan',
    recentTransactions: 'Transaksi Terkini',
    portfolioOverview: 'Gambaran Keseluruhan Portfolio',
    totalHoldings: 'Jumlah Pegangan',
    ytdReturn: 'Pulangan YTD',
    riskProfile: 'Profil Risiko',
    moderate: 'Sederhana',
    conservative: 'Konservatif',
    aggressive: 'Agresif',
    
    // Dashboard
    customize: 'Sesuaikan',
    doneEditing: 'Selesai Edit',
    addWidget: 'Tambah Widget',
    wealth: 'Kekayaan',
    performance: 'Prestasi',
    goalsProgress: 'Kemajuan Matlamat',
    marketAlerts: 'Amaran Pasaran',
    marketNews: 'Berita Pasaran',
    
    // Goals
    financialGoals: 'Matlamat Kewangan',
    milestonesAchieved: 'Pencapaian Dicapai',
    recentMilestones: 'Pencapaian Terkini',
    goalAchieved: 'Matlamat Dicapai',
    progress: 'Kemajuan',
    current: 'Semasa',
    target: 'Sasaran',
    remaining: 'Baki',
    daysLeft: 'Hari Tinggal',
    deadline: 'Tarikh Akhir',
    
    // Analytics
    advancedAnalytics: 'Analisis Lanjutan & Ramalan',
    aiPoweredInsights: 'Wawasan berkuasa AI dan pemodelan ramalan',
    analysisPeriod: 'Tempoh Analisis',
    predictionConfidence: 'Keyakinan Ramalan',
    lastUpdated: 'Kemaskini Terakhir',
    portfolioPredictions: 'Ramalan Portfolio',
    nextMonth: 'Bulan Depan',
    nextQuarter: 'Suku Depan',
    nextYear: 'Tahun Depan',
    riskAnalysis: 'Analisis Risiko',
    sharpeRatio: 'Nisbah Sharpe',
    beta: 'Beta',
    volatility: 'Volatiliti',
    maxDrawdown: 'Penarikan Maksimum',
    performanceAnalysis: 'Analisis Prestasi',
    assetAllocation: 'Peruntukan Aset',
    riskMetrics: 'Metrik Risiko',
    aiGeneratedInsights: 'Wawasan Dijana AI',
    portfolioOptimization: 'Pengoptimuman Portfolio',
    diversificationAlert: 'Amaran Kepelbagaian',
    taxOptimization: 'Pengoptimuman Cukai',
    goalProgress: 'Kemajuan Matlamat',
    
    // Gamification
    investmentGamification: 'Gamifikasi Pelaburan',
    trackProgress: 'Jejak kemajuan anda dan bersaing dengan pelabur lain',
    totalPoints: 'Jumlah Mata',
    achievements: 'Pencapaian',
    badges: 'Lencana',
    growth: 'Pertumbuhan',
    leaderboard: 'Papan Pendahulu',
    investor: 'Pelabur',
    score: 'Mata',
    portfolio: 'Portfolio',
    progressTracking: 'Jejak Kemajuan',
    diversificationScore: 'Skor Kepelbagaian',
    riskManagement: 'Pengurusan Risiko',
    goalsCompleted: 'Matlamat Selesai',
    
    // Security
    enterpriseSecurity: 'Papan Pemuka Keselamatan Perusahaan',
    monitorSecurity: 'Pantau peristiwa keselamatan dan corak akses',
    totalLogins: 'Jumlah Log Masuk',
    failedAttempts: 'Percubaan Gagal',
    suspiciousActivities: 'Aktiviti Mencurigakan',
    securityScore: 'Skor Keselamatan',
    securityAlerts: 'Amaran Keselamatan',
    accessAttempts: 'Percubaan Akses',
    ipAddress: 'Alamat IP',
    attempts: 'Percubaan',
    success: 'Berjaya',
    lastAttempt: 'Percubaan Terakhir',
    status: 'Status',
    securityAuditLog: 'Log Audit Keselamatan',
    timestamp: 'Stempel Masa',
    event: 'Peristiwa',
    user: 'Pengguna',
    location: 'Lokasi',
    riskLevel: 'Tahap Risiko',
    details: 'Butiran',
    securitySettings: 'Tetapan Keselamatan',
    twoFactorAuth: 'Pengesahan Dua Faktor',
    emailSecurityAlerts: 'Amaran Keselamatan E-mel',
    autoSessionTimeout: 'Masa Tamat Sesi Auto',
    ipWhitelist: 'Senarai Putih IP',
    enhancedAuditLogging: 'Log Audit Dipertingkatkan',
    dataEncryption: 'Penyulitan Data pada Rehat'
  },
  
  zh: {
    // Navigation
    dashboard: '仪表板',
    investments: '投资',
    portfolio: '投资组合',
    goals: '目标',
    reports: '报告',
    settings: '设置',
    
    // Common
    totalWealth: '总财富',
    customers: '客户',
    recentTransactions: '最近交易',
    portfolioOverview: '投资组合概览',
    totalHoldings: '总持仓',
    ytdReturn: '年初至今回报',
    riskProfile: '风险档案',
    moderate: '中等',
    conservative: '保守',
    aggressive: '激进',
    
    // Dashboard
    customize: '自定义',
    doneEditing: '完成编辑',
    addWidget: '添加小部件',
    wealth: '财富',
    performance: '表现',
    goalsProgress: '目标进度',
    marketAlerts: '市场警报',
    marketNews: '市场新闻',
    
    // Goals
    financialGoals: '财务目标',
    milestonesAchieved: '已达成里程碑',
    recentMilestones: '最近里程碑',
    goalAchieved: '目标达成',
    progress: '进度',
    current: '当前',
    target: '目标',
    remaining: '剩余',
    daysLeft: '剩余天数',
    deadline: '截止日期',
    
    // Analytics
    advancedAnalytics: '高级分析与预测',
    aiPoweredInsights: 'AI驱动的洞察和预测建模',
    analysisPeriod: '分析期间',
    predictionConfidence: '预测信心',
    lastUpdated: '最后更新',
    portfolioPredictions: '投资组合预测',
    nextMonth: '下个月',
    nextQuarter: '下季度',
    nextYear: '明年',
    riskAnalysis: '风险分析',
    sharpeRatio: '夏普比率',
    beta: '贝塔',
    volatility: '波动率',
    maxDrawdown: '最大回撤',
    performanceAnalysis: '表现分析',
    assetAllocation: '资产配置',
    riskMetrics: '风险指标',
    aiGeneratedInsights: 'AI生成洞察',
    portfolioOptimization: '投资组合优化',
    diversificationAlert: '多元化警报',
    taxOptimization: '税务优化',
    goalProgress: '目标进度',
    
    // Gamification
    investmentGamification: '投资游戏化',
    trackProgress: '跟踪您的进度并与其他投资者竞争',
    totalPoints: '总积分',
    achievements: '成就',
    badges: '徽章',
    growth: '增长',
    leaderboard: '排行榜',
    investor: '投资者',
    score: '分数',
    portfolio: '投资组合',
    progressTracking: '进度跟踪',
    diversificationScore: '多元化分数',
    riskManagement: '风险管理',
    goalsCompleted: '已完成目标',
    
    // Security
    enterpriseSecurity: '企业安全仪表板',
    monitorSecurity: '监控安全事件和访问模式',
    totalLogins: '总登录次数',
    failedAttempts: '失败尝试',
    suspiciousActivities: '可疑活动',
    securityScore: '安全分数',
    securityAlerts: '安全警报',
    accessAttempts: '访问尝试',
    ipAddress: 'IP地址',
    attempts: '尝试',
    success: '成功',
    lastAttempt: '最后尝试',
    status: '状态',
    securityAuditLog: '安全审计日志',
    timestamp: '时间戳',
    event: '事件',
    user: '用户',
    location: '位置',
    riskLevel: '风险级别',
    details: '详情',
    securitySettings: '安全设置',
    twoFactorAuth: '双因素认证',
    emailSecurityAlerts: '邮件安全警报',
    autoSessionTimeout: '自动会话超时',
    ipWhitelist: 'IP白名单',
    enhancedAuditLogging: '增强审计日志',
    dataEncryption: '静态数据加密'
  }
}

export const useTranslation = () => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en'
  })

  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  const t = (key) => {
    return translations[language]?.[key] || key
  }

  const changeLanguage = (lang) => {
    setLanguage(lang)
  }

  return { t, language, changeLanguage }
}

export default function LanguageSelector() {
  const { t, language, changeLanguage } = useTranslation()

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ms', name: 'Bahasa Malaysia', flag: '🇲🇾' },
    { code: 'zh', name: '中文', flag: '🇨🇳' }
  ]

  return (
    <div className="dropdown">
      <button 
        className="btn btn-outline-secondary btn-sm dropdown-toggle" 
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {languages.find(lang => lang.code === language)?.flag} {languages.find(lang => lang.code === language)?.name}
      </button>
      <ul className="dropdown-menu">
        {languages.map(lang => (
          <li key={lang.code}>
            <button 
              className={`dropdown-item ${language === lang.code ? 'active' : ''}`}
              onClick={() => changeLanguage(lang.code)}
            >
              {lang.flag} {lang.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
