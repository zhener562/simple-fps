/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
// Removed: FormEvent, GoogleGenAI, GenerateContentResponse as they are no longer used for the contact form.

interface ProfileSectionTitles {
  about: string;
  skills: string;
  resume: string;
  skillsSheet: string; // Added for Skills Sheet section
  projects: string;
  techArticle: string; // Added for Tech Article section
  game: string;
  cardGame: string;
  aiBot: string; // Added for AI Bot section
  contact: string;
}

interface ProfileUIStrings {
  noSkills: string;
  contactLinkDescription: string;
  contactLinkText: string;
  resumeLinkDescription: string;
  resumeLinkText: string;
  skillsSheetLinkDescription: string; // Added for Skills Sheet section
  skillsSheetLinkText: string; // Added for Skills Sheet section
  techArticleLinkDescription: string; // Added for Tech Article section
  techArticleLinkText: string; // Added for Tech Article section
  gameLinkDescription: string;
  gameLinkText: string;
  cardGameLinkDescription: string;
  cardGameLinkText: string;
  aiBotLinkDescription: string; // Added for AI Bot section
  aiBotLinkText: string; // Added for AI Bot section
}

interface ProfileData {
  name: string;
  tagline: string;
  about: string;
  skills:string[];
  projects: string;
  sectionTitles: ProfileSectionTitles;
  uiStrings: ProfileUIStrings;
}

const translations: Record<string, ProfileData> = {
  ja: {
    name: "清水真二",
    tagline: "AIイノベーションを推進する、Rust得意なフルスタック・アーキテクト",
    about: "スタンフォード大学機械学習コースを修了したAIエキスパート兼フルスタックウェブアプリエンジニア。リアルタイム会話アバター型カウンセリングAI開発、国際トランザクション管理システム、リアルタイム金融SNSの開発経験を持つ。コミュニティサイト及び温泉紹介サイトのテックリーダーとしてチームを牽引。Rustによるハイパフォーマンスバックエンドシステム構築、システム全体の最適化、AIシステムの0→1開発を得意とする。",
    skills: [
      "AI/機械学習 (Deep Learning, NLP)",
      "Rust (Actix, Tokio, Axum)",
      "ハイパフォーマンスバックエンドシステム",
      "システム全体の最適化とパフォーマンス改善",
      "AIシステム導入及び0→1開発",
      "フルスタック開発 (React, Vue, Node.js, Python/Django/Flask)",
      "クラウドアーキテクチャ (AWS, GCP)",
      "データベース (PostgreSQL, MySQL, MongoDB, Redis)",
      "CI/CD & DevOps",
      "技術リーダーシップ & プロジェクトマネジメント",
      "国際トランザクションシステム設計",
      "リアルタイム金融システム開発"
    ],
    projects: "革新的なAIソリューション、高性能な金融取引プラットフォーム、スケーラブルなウェブアプリケーションなど、多岐にわたるプロジェクト実績を近日公開予定です。",
    sectionTitles: {
      about: "自己紹介",
      skills: "スキル",
      resume: "履歴書",
      skillsSheet: "スキルシート",
      projects: "プロジェクト",
      techArticle: "技術記事",
      game: "ゲーム",
      cardGame: "カードゲーム",
      aiBot: "AIボット",
      contact: "お問い合わせ"
    },
    uiStrings: {
      noSkills: "表示するスキルがありません。",
      contactLinkDescription: "お問い合わせは、こちらのGoogleフォームをご利用ください。",
      contactLinkText: "お問い合わせフォームを開く",
      resumeLinkDescription: "詳細な職務経歴については、以下のリンクより履歴書をご覧ください。",
      resumeLinkText: "履歴書を見る (Google Document)",
      skillsSheetLinkDescription: "保有スキルや経験プロジェクトの詳細については、以下のスキルシートをご覧ください。",
      skillsSheetLinkText: "スキルシートを見る (Google Document)",
      techArticleLinkDescription: "AIエージェント調査の技術記事を掲載しています。",
      techArticleLinkText: "技術記事を読む",
      gameLinkDescription: "こちらのリンクからFPSゲームをプレイできます。",
      gameLinkText: "ゲームをプレイ",
      cardGameLinkDescription: "こちらのリンクからカードゲームをプレイできます。",
      cardGameLinkText: "カードゲームをプレイ",
      aiBotLinkDescription: "AIボットが私の代わりにご質問にお答えします。",
      aiBotLinkText: "AIボットと話す",
    }
  },
  en: {
    name: "Shinji Shimizu",
    tagline: "Full-Stack Architect Driving AI Innovation, Specializing in Rust",
    about: "An AI expert and full-stack web app engineer, having completed Stanford University's Machine Learning course. Experienced in developing real-time conversational AI avatars, international transaction management systems, and real-time financial SNS. Led teams as a tech lead for community and hot spring review sites. Specializes in building high-performance backend systems with Rust, overall system optimization, and 0-to-1 AI system development.",
    skills: [
      "AI/Machine Learning (Deep Learning, NLP)",
      "Rust (Actix, Tokio, Axum)",
      "High-Performance Backend Systems",
      "Overall System Optimization & Performance Improvement",
      "AI System Implementation & 0-to-1 Development",
      "Full-Stack Development (React, Vue, Node.js, Python/Django/Flask)",
      "Cloud Architecture (AWS, GCP)",
      "Databases (PostgreSQL, MySQL, MongoDB, Redis)",
      "CI/CD & DevOps",
      "Technical Leadership & Project Management",
      "International Transaction System Design",
      "Real-Time Financial System Development"
    ],
    projects: "Details of diverse project achievements, including innovative AI solutions, high-performance financial trading platforms, and scalable web applications, will be unveiled soon.",
    sectionTitles: {
      about: "About Me",
      skills: "Skills",
      resume: "Resume",
      skillsSheet: "Skills Sheet",
      projects: "Projects",
      techArticle: "Tech Article",
      game: "Game",
      cardGame: "Card Game",
      aiBot: "AI Bot",
      contact: "Get in Touch"
    },
    uiStrings: {
      noSkills: "No skills to display.",
      contactLinkDescription: "Please use our Google Form to get in touch.",
      contactLinkText: "Open Inquiry Form",
      resumeLinkDescription: "For my detailed professional background, please view my resume linked below.",
      resumeLinkText: "View Resume (Google Document)",
      skillsSheetLinkDescription: "For details on my skills and project experience, please see my skills sheet linked below.",
      skillsSheetLinkText: "View Skills Sheet (Google Document)",
      techArticleLinkDescription: "Read my technical article on AI agent research.",
      techArticleLinkText: "Read Tech Article",
      gameLinkDescription: "You can play the FPS game from this link.",
      gameLinkText: "Play Game",
      cardGameLinkDescription: "You can play the card game from this link.",
      cardGameLinkText: "Play Card Game",
      aiBotLinkDescription: "An AI bot will answer your questions on my behalf.",
      aiBotLinkText: "Talk to AI Bot",
    }
  }
};

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSf1iflhbrAWKN_KIW9Ye_lC1UBIlvLBjNhnScfNGoJgW9HXzQ/viewform?usp=sharing&ouid=100770318650346238783";
const GOOGLE_RESUME_URL = "https://docs.google.com/document/d/1q_q2R8Zi3jzDeCMETO3iPQxHPujH6GpKBaR8kuZYasU/edit?usp=sharing";
const GOOGLE_SKILLS_SHEET_URL = "https://docs.google.com/document/d/11fAzy2TjCngP-va2P8K90OTM7Hnsu-JH/edit?usp=sharing&ouid=100770318650346238783&rtpof=true&sd=true";


function App() {
  const [currentLanguage, setCurrentLanguage] = useState<string>('ja');
  const [profileData, setProfileData] = useState<ProfileData>(translations.ja);

  useEffect(() => {
    setProfileData(translations[currentLanguage] || translations.ja);
  }, [currentLanguage]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-35% 0px -35% 0px',
      threshold: 0.01,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-centered-active');
        } else {
          entry.target.classList.remove('is-centered-active');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = document.querySelectorAll('.scroll-interactive-card');

    sections.forEach(section => observer.observe(section));

    return () => {
      sections.forEach(section => observer.unobserve(section));
      observer.disconnect();
    };
  }, [profileData]); // Re-run if profileData changes, ensures new sections are observed

  return (
    <div className="app-container" style={{opacity: 1, transition: 'opacity 0.5s ease-in'}}>
      <div className="language-switcher">
        <button
          onClick={() => setCurrentLanguage('ja')}
          className={currentLanguage === 'ja' ? 'active' : ''}
          aria-pressed={currentLanguage === 'ja'}
        >
          日本語
        </button>
        <button
          onClick={() => setCurrentLanguage('en')}
          className={currentLanguage === 'en' ? 'active' : ''}
          aria-pressed={currentLanguage === 'en'}
        >
          English
        </button>
      </div>

      <header className="hero-section" aria-labelledby="profile-name">
        <div className="profile-pic-placeholder" aria-hidden="true">
          <svg width="65%" height="65%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="2.5" fill="#61dafb" filter="url(#glow)"/>
            <ellipse cx="12" cy="12" rx="10" ry="4.5" stroke="#61dafb" strokeWidth="1.2"/>
            <ellipse cx="12" cy="12" rx="10" ry="4.5" stroke="#61dafb" strokeWidth="1.2" transform="rotate(60 12 12)"/>
            <ellipse cx="12" cy="12" rx="10" ry="4.5" stroke="#61dafb" strokeWidth="1.2" transform="rotate(-60 12 12)"/>
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
          </svg>
        </div>
        <h1 id="profile-name" className="name">{profileData.name}</h1>
        <p className="tagline">{profileData.tagline}</p>
      </header>

      <main>
        <section id="about" className="content-section scroll-interactive-card" aria-labelledby="about-heading">
          <h2 id="about-heading">{profileData.sectionTitles.about}</h2>
          <p>{profileData.about}</p>
        </section>

        <section id="skills" className="content-section scroll-interactive-card" aria-labelledby="skills-heading">
          <h2 id="skills-heading">{profileData.sectionTitles.skills}</h2>
          <ul className="skills-list" aria-label="List of skills">
            {(profileData.skills && profileData.skills.length > 0) ? profileData.skills.map((skill, index) => (
              <li key={index} className="skill-tag">{skill}</li>
            )) : <li>{profileData.uiStrings.noSkills}</li>}
          </ul>
        </section>

        <section id="resume" className="content-section scroll-interactive-card" aria-labelledby="resume-heading">
          <h2 id="resume-heading">{profileData.sectionTitles.resume}</h2>
          <p className="resume-description">{profileData.uiStrings.resumeLinkDescription}</p>
          <a
            href={GOOGLE_RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link-button"
            aria-label={profileData.uiStrings.resumeLinkText}
          >
            {profileData.uiStrings.resumeLinkText}
          </a>
        </section>

        <section id="skills-sheet" className="content-section scroll-interactive-card" aria-labelledby="skills-sheet-heading">
          <h2 id="skills-sheet-heading">{profileData.sectionTitles.skillsSheet}</h2>
          <p className="skills-sheet-description">{profileData.uiStrings.skillsSheetLinkDescription}</p>
          <a
            href={GOOGLE_SKILLS_SHEET_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link-button" // Reusing style from contact button
            aria-label={profileData.uiStrings.skillsSheetLinkText}
          >
            {profileData.uiStrings.skillsSheetLinkText}
          </a>
        </section>

        <section id="projects" className="content-section scroll-interactive-card" aria-labelledby="projects-heading">
          <h2 id="projects-heading">{profileData.sectionTitles.projects}</h2>
          <p>{profileData.projects}</p>
        </section>

        <section id="tech-article" className="content-section scroll-interactive-card" aria-labelledby="tech-article-heading">
          <h2 id="tech-article-heading">{profileData.sectionTitles.techArticle}</h2>
          <p className="tech-article-description">{profileData.uiStrings.techArticleLinkDescription}</p>
          <a
            href="/ai-agent-research"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link-button"
            aria-label={profileData.uiStrings.techArticleLinkText}
          >
            {profileData.uiStrings.techArticleLinkText}
          </a>
        </section>

        <section id="game" className="content-section scroll-interactive-card" aria-labelledby="game-heading">
          <h2 id="game-heading">{profileData.sectionTitles.game}</h2>
          <p className="game-description">{profileData.uiStrings.gameLinkDescription}</p>
          <a
            href="/game"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link-button"
            aria-label={profileData.uiStrings.gameLinkText}
          >
            {profileData.uiStrings.gameLinkText}
          </a>
        </section>

        <section id="card-game" className="content-section scroll-interactive-card" aria-labelledby="card-game-heading">
          <h2 id="card-game-heading">{profileData.sectionTitles.cardGame}</h2>
          <p className="card-game-description">{profileData.uiStrings.cardGameLinkDescription}</p>
          <a
            href="/card-game"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link-button"
            aria-label={profileData.uiStrings.cardGameLinkText}
          >
            {profileData.uiStrings.cardGameLinkText}
          </a>
        </section>

        <section id="ai-bot" className="content-section scroll-interactive-card" aria-labelledby="ai-bot-heading">
          <h2 id="ai-bot-heading">{profileData.sectionTitles.aiBot}</h2>
          <p className="ai-bot-description">{profileData.uiStrings.aiBotLinkDescription}</p>
          <a
            href={"/clone-shinji"}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link-button"
            aria-label={profileData.uiStrings.aiBotLinkText}
          >
            {profileData.uiStrings.aiBotLinkText}
          </a>
        </section>

      </main>

      <footer id="contact" className="contact-section scroll-interactive-card" aria-labelledby="contact-heading">
        <h2 id="contact-heading">{profileData.sectionTitles.contact}</h2>
        <p className="contact-description">{profileData.uiStrings.contactLinkDescription}</p>
        <a
          href={GOOGLE_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-link-button"
          aria-label={profileData.uiStrings.contactLinkText}
        >
          {profileData.uiStrings.contactLinkText}
        </a>
      </footer>
    </div>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
} else {
  console.error("Root element not found");
}
