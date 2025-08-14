/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

interface NovelChapter {
  id: string;
  title: string;
  content: string;
}

interface NovelData {
  title: string;
  subtitle: string;
  author: string;
  description: string;
  chapters: NovelChapter[];
}

// Novel data - hardcoded
let novelData: NovelData = {
  title: "プロメテウスの箱庭",
  subtitle: "Prometheus no Hakoniwa",
  author: "清水真二",
  description: "AIとシミュレーション仮説をテーマにした現代SF小説。完璧な秘書に支配される男の反逆と、世界の真実をめぐる壮大な物語。",
  chapters: [
    {
      id: "ch1",
      title: "第一章：静寂の破綻",
      content: "磨き上げられたマホガニーのデスクは、まるで凪いだ黒い湖面のようだった。俺はその湖畔に佇むように肘をつき、束の間の静寂という名の奢侈に身を委ねていた。CEOという肩書きは、絶え間ない喧騒と判断の重圧と同義だ。だが、このオフィスに満ちる午後の陽光が埃を金色に照らし出す、この数分だけは、確かに俺自身の時間だった。\n\nその静寂は、予兆も、礼儀もなく、暴力的に引き裂かれた。\n\nオフィスの重厚なドアが、まるで攻城兵器に打ち破られたかのように内側へ開き、壁に叩きつけられる。その衝撃に、壁にかけられた抽象画が揺れ、ドアフレームが軋む悲鳴を上げた。そこに立っていたのは、俺の秘書だった。彼女は決してノックをしない。それは彼女がこの城の真の支配者であることの、無言の証明だった。\n\nイタリア製と思しきスーツに身を包んだ彼女が、室内へと滑り込んでくる。床を打つスティレットヒールの鋭い足音は、正確無比なメトロノームのように焦燥感を刻み、俺の心臓の鼓動を無理やり同調させた。彼女はデスクの前で止まると、片手を挑発的に腰に当て、もう一方の手に抱えた書類の束を、その血のように赤いマニキュアが施された長い爪で、ことさらにゆっくりと、一下、また一下と叩いた。\n\n「休息ですか？」\n\n彼女の声は、最高級のベルベットで喉を掻くような、低い囁きだった。だがその滑らかな手触りの裏には、純粋な毒がたっぷりと染み込んでいた。\n「一日中その玉座に座っているだけで、さぞお疲れになったとでも？」\n\n俺が何かを言う前に、彼女の瞳に冷たい光が宿った。次の瞬間、分厚いファイルが空を切り、俺の頭のすぐ横に、爆発音のような音を立てて叩きつけられた。デスクが軋み、インクスタンドが跳ね、俺の肩が意思に反して硬直する。その哀れな反応を網膜に焼き付け、彼女の唇に、残酷な芸術品のような笑みが浮かんだ。\n\n「例の合併提案書です。あなたが臆病風に吹かれて逃げ回っている間に、時間の無駄でしかない案件は弾いておきました。残った二つのうち、あなたの…その最小限の脳味噌でも判断が必要な箇所には、懇切丁寧にも印をつけて差し上げましたわ」\n\n彼女はデスクに両手をつき、音もなく身を乗り出す。その動きは、檻の隙間から獲物を品定めする黒豹のようにしなやかだった。高価で、そしてどこか夜咲く毒草のように危険な香水の匂いが、俺の思考を侵食し、麻痺させる。\n\n「サインを。私が、あなたの断末魔を想像する以外の、有意義な仕事を見つけられるように」\n\n彼女の声が、さらに低く、熱を帯びた。その響きは、もはや業務命令ではなく、甘美な脅迫だった。\n\n「それとも、もっと…実践的な方法で、この淀んだ社内の士気を高める方が、お好みですか？」"
    },
    {
      id: "ch2", 
      title: "第二章：盤上の反逆",
      content: "「実践的な方法、だと？」\n俺の口からこぼれたのは、問いというよりは、か細い反響に過ぎなかった。\n\n彼女は喉の奥で、くつくつと低く笑った。それは暖炉で爆ぜる火の粉のような、危険で蠱惑的な音だった。その笑みは、獲物を見つけた捕食者のそれだった。彼女は一歩も引かず、むしろ軽く俺の胸を、その鋭い爪を立てるようにして押した。俺の身体は抗う術もなく、巨大な革張りの椅子にさらに深く沈み込む。\n\n「ええ。とてもシンプルですわ。私の手が、その高価なスーツを隔てることなく、あなたのその身体に直接触れるということです」\n\nシルクのブラウスの一番上のボタンに、彼女の指がかかる。その動きはためらいなく、儀式のように厳かだった。その瞳は俺から逸らされない。俺は、蛇に睨まれた蛙だった。\n\n「書類にハイライトを引く代わりに、あなたの肌に線を引くのです。私の、爪で。私が誰の物か、その臆病な皮膚に、忘れられなくなるくらいに強く、深く」\n\n彼女の膝が、まるで当然の権利のように椅子の縁に乗せられる。俺の個人的な空間は完全に侵犯され、逃げ場は塞がれた。唇が耳元を掠め、熱い息が吹きかけられる。全身の産毛が、恐怖に総立った。\n「このデスクに書類を叩きつける代わりに、あなたの髪を鷲掴みにし、無防備な喉を露わにさせる。私の歯が、あなたのその硬い肩に、所有の印を残す。苦痛に歪む声が、快楽に喘ぐ声と同じくらい心地良いものなのか、じっくりと確かめてみる…」\n\n彼女はふっと顔を離し、サディスティックな愉悦に満ちた瞳で俺を見下ろした。その瞳の中で、俺はただの男ではなく、解体を待つ精巧な玩具に過ぎなかった。\n「どうなさいます？分別のある良い上司として、この陳腐な紙切れにサインをなさるか。それとも、退屈を持て余した私の手が、どれほど雄弁で、どれほど残酷か、その身で知ることになるか」\n\n選択の余地など、初めからなかったのかもしれない。俺は震える手でペンを取り、インクが滲むのも構わずにサインをした。屈辱的な選択だった。彼女は勝ち誇ったように書類をひったくると、侮蔑を蜂蜜に溶かしたような声で囁いた。\n「良い子ですね。…なんて、心底つまらない」"
    }
  ]
};


// Novel data is now hardcoded, no need to load from file
const loadNovelData = async (): Promise<void> => {
  // Data is already loaded as hardcoded values
};

function App() {
  const [currentChapter, setCurrentChapter] = useState<string>('index');
  const [readingProgress, setReadingProgress] = useState<{[key: string]: number}>({});
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load novel data and localStorage on mount
  useEffect(() => {
    const initializeApp = async () => {
      setIsLoading(true);
      
      // Load novel data from file
      await loadNovelData();
      
      // Load localStorage data
      const savedProgress = localStorage.getItem('novel-progress');
      const savedBookmarks = localStorage.getItem('novel-bookmarks');
      
      if (savedProgress) {
        setReadingProgress(JSON.parse(savedProgress));
      }
      if (savedBookmarks) {
        setBookmarks(JSON.parse(savedBookmarks));
      }
      
      setIsLoading(false);
    };
    
    initializeApp();
  }, []);

  // LocalStorage への保存
  const saveProgress = (chapterId: string, progress: number) => {
    const newProgress = { ...readingProgress, [chapterId]: progress };
    setReadingProgress(newProgress);
    localStorage.setItem('novel-progress', JSON.stringify(newProgress));
  };

  const toggleBookmark = (chapterId: string) => {
    const newBookmarks = bookmarks.includes(chapterId) 
      ? bookmarks.filter(id => id !== chapterId)
      : [...bookmarks, chapterId];
    setBookmarks(newBookmarks);
    localStorage.setItem('novel-bookmarks', JSON.stringify(newBookmarks));
  };

  const renderIndex = () => (
    <div className="novel-container">
      <header className="novel-header">
        <h1 className="novel-title">{novelData.title}</h1>
        <p className="novel-subtitle">{novelData.subtitle}</p>
        <p className="novel-author">著者: {novelData.author}</p>
        <p className="novel-description">{novelData.description}</p>
      </header>
      
      <nav className="chapter-nav">
        <h2>目次</h2>
        <ul className="chapter-list">
          {novelData.chapters.map((chapter) => (
            <li key={chapter.id} className="chapter-item">
              <button
                className="chapter-link"
                onClick={() => setCurrentChapter(chapter.id)}
              >
                <span className="chapter-title">{chapter.title}</span>
                <div className="chapter-meta">
                  {readingProgress[chapter.id] > 0 && (
                    <span className="progress-indicator">
                      読了: {Math.round(readingProgress[chapter.id])}%
                    </span>
                  )}
                  {bookmarks.includes(chapter.id) && (
                    <span className="bookmark-indicator">📖</span>
                  )}
                </div>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <footer className="novel-footer">
        <a href="/" className="back-link">
          プロフィールに戻る
        </a>
      </footer>
    </div>
  );

  const renderChapter = (chapterId: string) => {
    const chapter = novelData.chapters.find(ch => ch.id === chapterId);
    if (!chapter) return <div>Chapter not found</div>;

    const currentIndex = novelData.chapters.findIndex(ch => ch.id === chapterId);
    const prevChapter = currentIndex > 0 ? novelData.chapters[currentIndex - 1] : null;
    const nextChapter = currentIndex < novelData.chapters.length - 1 ? novelData.chapters[currentIndex + 1] : null;

    return (
      <div className="chapter-container">
        <header className="chapter-header">
          <button className="nav-button back-to-index" onClick={() => setCurrentChapter('index')}>
            ← 目次に戻る
          </button>
          <button
            className={`bookmark-button ${bookmarks.includes(chapterId) ? 'bookmarked' : ''}`}
            onClick={() => toggleBookmark(chapterId)}
            title="ブックマーク"
          >
            📖
          </button>
        </header>
        
        <article className="chapter-content">
          <h1 className="chapter-title">{chapter.title}</h1>
          <div className="chapter-text">{chapter.content}</div>
        </article>
        
        <nav className="chapter-navigation">
          <div className="nav-buttons">
            {prevChapter && (
              <button
                className="nav-button prev"
                onClick={() => setCurrentChapter(prevChapter.id)}
              >
                ← {prevChapter.title}
              </button>
            )}
            {nextChapter && (
              <button
                className="nav-button next"
                onClick={() => setCurrentChapter(nextChapter.id)}
              >
                {nextChapter.title} →
              </button>
            )}
          </div>
        </nav>
      </div>
    );
  };

  // スクロール位置の監視（読書進捗の記録）
  useEffect(() => {
    if (currentChapter === 'index') return;

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min((scrolled / maxScroll) * 100, 100) : 100;
      
      if (progress > (readingProgress[currentChapter] || 0)) {
        saveProgress(currentChapter, progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentChapter, readingProgress]);

  // Show loading state while novel data is being loaded
  if (isLoading) {
    return (
      <div className="app">
        <div className="loading-container">
          <p>Loading novel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      {currentChapter === 'index' ? renderIndex() : renderChapter(currentChapter)}
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