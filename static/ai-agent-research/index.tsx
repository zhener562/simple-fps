/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

interface ArticleData {
  title: string;
  subtitle: string;
  sections: {
    background: {
      title: string;
      content: string;
    };
    ollamaAider: {
      title: string;
      content: string;
    };
    gptOos: {
      title: string;
      content: string;
    };
    performance20b: {
      title: string;
      content: string;
    };
    conclusion: {
      title: string;
      content: string;
    };
  };
  backToProfile: string;
}

const translations: Record<string, ArticleData> = {
  ja: {
    title: "AIエージェント調査レポート",
    subtitle: "オンプレミスAIモデル（ollama + aider）とgpt-oos検証",
    sections: {
      background: {
        title: "調査の背景",
        content: "会社でAIエージェントを調べる活動がある。その一環でセキュリティ的に完全に潔白であろう公開モデルをローカルで動かして使用感を他のAPI型と比較しようと思った。もし有用であれば会社に交渉して実務での使用を検討したい。"
      },
      ollamaAider: {
        title: "ollama + aiderの試用",
        content: "まず`ollama`, `aider`の組み合わせを試してみた。このモデルはコマンド実行権限がないので必要な情報は一々こちらで指定する必要があり、`claude code`に甘やかされた筆者には辛いものがある。"
      },
      gptOos: {
        title: "gpt-oos:120bモデルの検証",
        content: "実行したモデルは最近話題の`gpt-oos:120b` and `20b`。`64GB`+追加`18GB`のスワップでようやく`120b`のモデルを動かせた。推論が遅いので会話の待ち時間でイライラする。性能に関してはあまり検証できてないが結構賢そうではある。"
      },
      performance20b: {
        title: "20bモデルの実用性",
        content: "`20b`も試してみたがセットアップしたあとでファーストトライするには申し分ない性能だ。関数単位とか自分が当たりをつけた処理を特定の処理に置き換えたいとかそのレベルまでタスクを分割できてるときに使う分には十分な性能でないだろうか。"
      },
      conclusion: {
        title: "結論と今後の展望",
        content: "ただしコピペで何度も往復するのが絶望的に辛い。可能であれば`claude code`, `gemini-cli`あたりを使えることが理想ではある。今回の検証もクライアントの許可を得ずとも使えるレベルで`100％安全`なモデルを使いたいという理由からなのでまあ我慢できなくもない。"
      }
    },
    backToProfile: "プロフィールに戻る"
  },
  en: {
    title: "AI Agent Research Report",
    subtitle: "On-Premises AI Model Evaluation: ollama + aider & gpt-oos",
    sections: {
      background: {
        title: "Research Background",
        content: "Our company has an initiative to explore AI agents. As part of this, I wanted to run publicly available models locally that are completely secure and compare their usability with API-based models. If they prove useful, I'd like to negotiate with the company for their practical use in work."
      },
      ollamaAider: {
        title: "ollama + aider Trial",
        content: "First, I tried the combination of `ollama` and `aider`. Since this model doesn't have command execution permissions, I need to specify all necessary information manually, which is painful for someone spoiled by `claude code`."
      },
      gptOos: {
        title: "gpt-oos:120b Model Verification",
        content: "I tested the recently popular `gpt-oos:120b` and `20b` models. With `64GB` + an additional `18GB` swap, I could finally run the `120b` model. The inference is slow, and the waiting time during conversations is frustrating. While I couldn't thoroughly verify the performance, it seems quite intelligent."
      },
      performance20b: {
        title: "20b Model Practicality",
        content: "I also tried the `20b` model, and it has adequate performance for initial trials after setup. It should be sufficient when tasks are broken down to the level of function units or when you want to replace specific processing that you've targeted."
      },
      conclusion: {
        title: "Conclusion and Future Prospects",
        content: "However, the constant back-and-forth copying and pasting is desperately painful. Ideally, I'd like to use something like `claude code` or `gemini-cli` if possible. The reason for this verification was to use `100% safe` models that can be used without client permission, so it's somewhat bearable."
      }
    },
    backToProfile: "Back to Profile"
  }
};

function formatTextWithCode(text: string) {
  const parts = text.split(/`([^`]+)`/g);
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      return <code key={index}>{part}</code>;
    }
    return part;
  });
}

function App() {
  const [currentLanguage, setCurrentLanguage] = useState<string>('ja');
  const [articleData, setArticleData] = useState<ArticleData>(translations.ja);

  useEffect(() => {
    setArticleData(translations[currentLanguage] || translations.ja);
  }, [currentLanguage]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px',
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = document.querySelectorAll('.article-section');

    sections.forEach(section => observer.observe(section));

    return () => {
      sections.forEach(section => observer.unobserve(section));
      observer.disconnect();
    };
  }, [articleData]);

  return (
    <div className="app-container">
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

      <header className="article-header">
        <h1 className="article-title">{articleData.title}</h1>
        <p className="article-subtitle">{articleData.subtitle}</p>
      </header>

      <main className="article-content">
        <section className="article-section" id="background">
          <h2>{articleData.sections.background.title}</h2>
          <p>{formatTextWithCode(articleData.sections.background.content)}</p>
        </section>

        <section className="article-section" id="ollama-aider">
          <h2>{articleData.sections.ollamaAider.title}</h2>
          <p>{formatTextWithCode(articleData.sections.ollamaAider.content)}</p>
        </section>

        <section className="article-section" id="gpt-oos">
          <h2>{articleData.sections.gptOos.title}</h2>
          <p>{formatTextWithCode(articleData.sections.gptOos.content)}</p>
        </section>

        <section className="article-section" id="performance-20b">
          <h2>{articleData.sections.performance20b.title}</h2>
          <p>{formatTextWithCode(articleData.sections.performance20b.content)}</p>
        </section>

        <section className="article-section" id="conclusion">
          <h2>{articleData.sections.conclusion.title}</h2>
          <p>{formatTextWithCode(articleData.sections.conclusion.content)}</p>
        </section>
      </main>

      <footer className="article-footer">
        <a
          href="/all-about-shinji"
          className="back-to-profile-button"
          aria-label={articleData.backToProfile}
        >
          {articleData.backToProfile}
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