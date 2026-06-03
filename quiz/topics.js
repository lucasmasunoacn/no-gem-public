/**
 * ══════════════════════════════════════════════════════════════
 *  KNOWLEDGE QUIZ — Topic Registry
 *  obsidian/quiz/topics.js
 * ══════════════════════════════════════════════════════════════
 *
 *  ┌── FOR CLAUDE CODE ────────────────────────────────────────┐
 *  │  Read quiz/CLAUDE.md FIRST before editing this file.      │
 *  │  • Add a topic  → copy TOPIC_TEMPLATE (bottom of file)    │
 *  │  • Add slides   → copy SLIDE_TEMPLATE  (bottom of file)   │
 *  │  • Add questions→ copy QUESTION_TEMPLATE (bottom of file) │
 *  │  • Before writing questions, read wikiPages[] listed      │
 *  │    in each topic for accuracy.                            │
 *  └───────────────────────────────────────────────────────────┘
 *
 *  Slide `calc` types available in index.html:
 *    'var'      VaR bell-curve simulator
 *    'el'       Expected Loss (PD × EAD × LGD)
 *    'lcr'      Liquidity Coverage Ratio
 *    'basel'    Basel III capital ratio
 *    'raroc'    RAROC dept comparison
 *    'kvcache'  KV Cache memory calculator (LLM topic)
 *    'sw30'     Software 3.0 static comparison chart
 *
 *  Slide `keyPoint` accent colors: 'blue' | 'green' | 'yellow' | 'red'
 */

window.TOPICS = [

/* ══════════════════════════════════════════════════════════════
   TOPIC 1 — 証券・金融リスク
   Wiki sources: wiki/concepts/, wiki/infrastructure/, wiki/entities/
══════════════════════════════════════════════════════════════ */
{
  id: 'finance',
  title: '証券・金融リスク',
  icon: '📊',
  color: '#3b82f6',
  description: 'バーゼルⅢ・VaR・信用リスク・流動性規制を対話形式で学ぶ',
  slideCount: 6,
  wikiPages: [
    'wiki/concepts/Capital Markets.md',
    'wiki/concepts/Basel III Regulation.md',
    'wiki/concepts/Value at Risk.md',
    'wiki/concepts/Algorithmic Trading.md',
    'wiki/concepts/Derivatives.md',
    'wiki/concepts/Smart Order Routing.md',
    'wiki/infrastructure/Securities Firm Systems.md',
    'wiki/infrastructure/DVP and STP Settlement.md',
    'wiki/infrastructure/Tokyo Stock Exchange arrowhead.md',
    'wiki/entities/Japan Exchange Group.md',
    'wiki/entities/Japan Securities Clearing Corporation.md',
  ],

  slides: [
    {
      num: '01',
      title: '金融リスクの全体マップ',
      body: '金融機関のリスクを「規制対象リスク」と「その他の領域」に分類します。<strong>日々晒されるリスク</strong>（市場・信用）と<strong>突発的なダウンサイドリスク</strong>（オペ・流動性）が主要4分類です。',
      riskMap: true,
      table: {
        headers: ['規制・枠組み', '主なカバー領域', 'タイプ'],
        rows: [
          ['自己資本比率規制（バーゼルⅡ/Ⅲ）', '市場・信用・オペリスク', 'グローバル'],
          ['LCR / NSFR', '流動性リスク', 'グローバル'],
          ['TLAC', 'システミックリスク（G-SIBs破綻時）', 'グローバル'],
          ['ボルカールール / リングフェンス', 'プロップ取引・商業銀行分離', '米・英固有'],
          ['MiFIDⅡ / MiFIR', '最良執行・透明性', 'EU固有'],
        ]
      },
      keyPoints: [
        { text: '規制の4特徴：①グローバル＋ローカル並存 ②段階的強化（LCR: 2015年60%→2019年100%）③広範囲（自己資本・流動性・報酬まで）④G-SIBs追加要件（日本の3メガバンク含む）' }
      ]
    },
    {
      num: '02',
      title: '市場リスク ― VaR（バリュー・アット・リスク）',
      body: '金利・為替・株価等の変動により資産価値が変化して損失を被るリスク。',
      formula: 'VaR = z × σ × √保有期間 × ポートフォリオ額',
      table: {
        headers: ['パラメータ', '意味', '例'],
        rows: [
          ['観測期間', '過去データ何日分を使うか', '250日'],
          ['保有期間', '何日間保有し続けるか', '10日'],
          ['信頼水準', '何%の確率で収まるか', '99%（z=2.326）'],
        ]
      },
      keyPoints: [
        { color: 'blue',   text: '読み方：VaR=9億円（99%・10日）→「今後10日間に9億円以上損する確率は1%」' },
        { color: 'green',  text: 'BPV（金利1bp）・GPS（特定年限シフト）・SPV（スロープ変化）は感応度分析。VaRは統計的最大損失額。' },
        { color: 'yellow', text: '💡 金利↑ → 債券価格↓（逆相関）。市中金利が上昇すると既存低利率債券の価値は下落。' },
      ],
      calc: 'var'
    },
    {
      num: '03',
      title: '信用リスク ― 期待損失額（EL）',
      body: '与信先の財務悪化により資産価値が減少・消失するリスク。基本計量指標が期待損失額（EL）です。',
      formula: 'EL = PD × EAD × LGD',
      table: {
        headers: ['記号', '英語', '意味'],
        rows: [
          ['PD', 'Probability of Default', 'デフォルト確率（格付けに連動）'],
          ['EAD', 'Exposure at Default', 'デフォルト時エクスポージャー額'],
          ['LGD', 'Loss Given Default', '損失率 ＝ 1 − 回収率'],
        ]
      },
      keyPoints: [
        { color: 'blue',   text: '担保カバー率60% → 回収率60% → LGD=40%。担保の種類・カバー率によって変わります。' },
        { color: 'green',  text: 'ELは「引当金（平均的損失）」、信用VaRは「99%信頼水準の最大損失」。差分=予期しない損失（UL）は自己資本でカバー。' },
        { color: 'yellow', text: 'CVA ≈ ∫EPE × PD × LGD × 割引率 dt。デリバの「貸倒引当金」。トレーダーへの賦課で低格付先との取引を自然に抑制。' },
      ],
      calc: 'el'
    },
    {
      num: '04',
      title: '流動性リスク ― LCR / NSFR',
      body: '調達と運用の<strong>期間ミスマッチ</strong>や予期せぬ資金流出により資金確保が困難になるリスク。2008年金融危機を受けバーゼル委員会が2指標を導入。',
      formula: 'LCR = HQLA（適格流動資産） / 30日ネット資金流出 ≥ 100%',
      table: {
        headers: ['レベル', '資産例', '掛目'],
        rows: [
          ['Lv1', '現金・中銀預金・国債（RW0%）', '100%'],
          ['Lv2A', '高品質社債・カバードボンド', '85%'],
          ['Lv2B', 'RMBS（AA以上）', '75%'],
          ['Lv3', '株式・BBB〜A+社債', '50%'],
        ]
      },
      keyPoints: [
        { color: 'green',  text: '段階的強化：2015年60% → 2016年70% → 2017年80% → 2018年90% → 2019年100%' },
        { color: 'blue',   text: 'NSFR = 利用可能な安定調達 / 所要安定調達 ≥ 100%。「3ヵ月借入で2年貸付」のミスマッチを防ぐ。' },
      ],
      calc: 'lcr'
    },
    {
      num: '05',
      title: '自己資本規制 ― バーゼルⅡ / Ⅲ',
      body: '金融機関が保有すべき最低自己資本を定める国際規制。バーゼルⅢでは<strong>資本の質向上</strong>と<strong>流動性規制</strong>が追加されました。',
      formula: '自己資本比率 = 自己資本 / (信用RWA + 市場リスク + オペリスク) ≥ 8%',
      table: {
        headers: ['区分', '主な構成要素', 'バーゼルⅢ最低比率'],
        rows: [
          ['CET1', '普通株式・利益剰余金（最高品質）', '4.5%'],
          ['Tier1', 'CET1 + AT1（優先株等）', '6.0%'],
          ['Total', 'Tier1 + Tier2（劣後債等）', '8.0%'],
        ]
      },
      keyPoints: [
        { color: 'blue',   text: 'バーゼルⅢの追加要件：資本保全バッファ+2.5%、カウンターシクリカルバッファ、G-SIBsサーチャージ+1〜3.5%、TLAC' },
        { color: 'yellow', text: 'FRTB（マーケットリスク規制抜本見直し）・IRRBB（銀行勘定金利リスク）もバーゼルⅢの重要追加要素' },
      ],
      calc: 'basel'
    },
    {
      num: '06',
      title: 'RAROC ― リスク調整後資本収益率',
      body: '単純な収益ではなく、内包されるリスクを控除した後の収益で評価する指標。事業部門間の<strong>資本配賦の意思決定</strong>に使われます。',
      formula: 'RAROC = (収益 − リスクコスト) / 経済資本（EC）',
      table: {
        headers: ['', '部門A', '部門B'],
        rows: [
          ['収益', '100億', '100億'],
          ['リスク', '10億', '50億'],
          ['EC', '50億', '50億'],
          ['RAROC', '180%', '100%'],
        ]
      },
      keyPoints: [
        { color: 'blue',   text: 'EC配賦：①VaRでリスク計量→②ECをリミットとして配賦→③部門がテイク→④RAROCで評価→⑤バックテスト' },
        { color: 'yellow', text: 'CVAとの連動：CVA引当金をトレーダーに賦課 → 低格付先との取引コストが可視化 → 自然と高格付先優先' },
      ],
      calc: 'raroc'
    },
  ],

  questions: [
    {cat:"リスク基礎",
     q:"金融規制（バーゼルⅢ等）の主な対象に含まれないリスクはどれか？",
     hint:"4つの主要リスク（市場・信用・オペ・流動性）と「その他の領域」を区別しましょう",
     opts:["市場リスク","信用リスク","地政学リスク","オペレーショナルリスク"],ans:2,
     exp:"<strong>地政学リスク</strong>は「その他の領域（BCP対応）」に分類されます。バーゼル規制の主な対象は①市場②信用③オペレーショナル④流動性の4分類です。"},
    {cat:"市場リスク",
     q:"VaRの3パラメータとして正しい組み合わせはどれか？",
     hint:"「どのくらい過去を見て・何日間持ち続けて・何%の確率で収まるか」で定義されます",
     opts:["観測期間・保有期間・信頼水準","観測期間・回収率・信頼水準","PD・EAD・LGD","保有期間・格付け・信頼水準"],ans:0,
     exp:"<strong>観測期間</strong>（過去データ日数）、<strong>保有期間</strong>（何日間保有）、<strong>信頼水準</strong>（99%など）の3つです。"},
    {cat:"市場リスク",
     q:"金利が上昇したとき、保有する固定利付き債券の価格はどうなるか？",
     hint:"利息2%の債券を持っているとき、市中金利が3%になったら、その債券の魅力は…",
     opts:["上昇する","下落する","変化しない","デュレーションのみに依存する"],ans:1,
     exp:"<strong>金利↑ → 債券価格↓</strong>（逆相関）。市中金利が上がると低利率の既存債券の魅力が薄れ、価格が下落します。"},
    {cat:"市場リスク",
     q:"GPS（Grid Point Sensitivity）手法の説明として正しいのはどれか？",
     opts:["カーブ全体を平行移動させて影響を測る","特定年限だけを局所的にシフトして年限ごとのリスクを測る","スティープ化・フラット化など形状変化リスクを測る","株価の変動に対する感応度を測る"],ans:1,
     exp:"<strong>GPS</strong>はイールドカーブの特定年限だけを局所シフトし、細かい年限ごとのリスクを把握します。BPVはカーブ全体の平行移動、SPVはスロープ変化を測ります。"},
    {cat:"信用リスク",
     q:"期待損失額（EL）の正しい計算式はどれか？",
     opts:["EL = PD + EAD + LGD","EL = PD × EAD ÷ LGD","EL = PD × EAD × LGD","EL = (1 − PD) × EAD × LGD"],ans:2,
     exp:"<strong>EL = PD × EAD × LGD</strong>。デフォルト確率 × デフォルト時エクスポージャー × デフォルト時損失率。"},
    {cat:"信用リスク",
     q:"LGD（Loss Given Default）の計算式として正しいのはどれか？",
     opts:["1 + 回収率","1 − 回収率","デフォルト確率 × 回収率","エクスポージャー ÷ 担保額"],ans:1,
     exp:"<strong>LGD = 1 − 回収率</strong>。担保で60%回収できればLGD = 40%。担保の種類・カバー率によって変化します。"},
    {cat:"信用リスク",
     q:"CVA（Credit Value Adjustment）を一言で表すと最も適切なのはどれか？",
     opts:["市場VaRを信用リスクに適用した指標","店頭デリバの相手方デフォルト時の期待損失の現在価値を時価に反映","LCRを補完する流動性調整指標","G-SIBsに課される追加資本要件"],ans:1,
     exp:"<strong>CVA</strong>は店頭デリバの取引相手がデフォルトした際に取り損なうポジションの現在価値。ローンの<strong>貸倒引当金</strong>をデリバに適用したものです。"},
    {cat:"流動性リスク",
     q:"LCR（流動性カバレッジ比率）の計算式として正しいのはどれか？",
     opts:["適格流動資産（HQLA）÷ 30日間のネット資金流出 ≥ 100%","利用可能な安定調達額 ÷ 所要安定調達額 ≥ 100%","自己資本 ÷ リスク加重資産 ≥ 8%","リスク調整後収益 ÷ 経済資本"],ans:0,
     exp:"<strong>LCR = HQLA ÷ 30日ネット資金流出 ≥ 100%</strong>。②はNSFR、③は自己資本比率、④はRAROCです。"},
    {cat:"流動性リスク",
     q:"LCRの適格流動資産のうち、掛目が100%なのはどれか？",
     opts:["A格以上の一般事業会社の社債","住宅ローン担保証券（RMBS）AA以上","現金・中央銀行預金・リスクウェイト0%の国債","カバードボンド（AA以上）"],ans:2,
     exp:"<strong>レベル1資産</strong>（現金・中銀預金・リスクウェイト0%の国債等）のみ掛目100%。L2A（社債等）は85%、L2B（RMBS AA+）は75%です。"},
    {cat:"流動性リスク",
     q:"NSFRが防ごうとする問題として最も適切な説明はどれか？",
     opts:["30日間の短期ストレスへの耐性不足","短期で調達し長期で運用する期間ミスマッチによる資金繰り破綻","取引相手のデフォルトによる損失","グローバル銀行の自己資本不足"],ans:1,
     exp:"<strong>NSFR</strong>は「3ヵ月借入で2年貸付→危機時に借入更新できず破綻」を防ぎます。長期安定負債で長期資産をカバーすることを要求します。"},
    {cat:"規制・バーゼルⅢ",
     q:"バーゼルⅢで新設された「最高品質の自己資本」の区分名はどれか？",
     opts:["Tier1","Tier2","CET1（Common Equity Tier 1）","TLAC"],ans:2,
     exp:"<strong>CET1</strong>はバーゼルⅢで新設された最高品質の自己資本区分で、普通株式・利益剰余金のみで構成。最低比率は4.5%。"},
    {cat:"規制・バーゼルⅢ",
     q:"RAROCの計算式として正しいのはどれか？",
     opts:["(収益 + リスク) ÷ 経済資本","(収益 − リスク) ÷ 経済資本","収益 ÷ (経済資本 × リスク)","リスク × 収益 ÷ 自己資本"],ans:1,
     exp:"<strong>RAROC = (収益 − リスク) ÷ EC</strong>。同じ収益・資本でもリスクが低い部門のRAROCが高くなります。資本配賦の意思決定に使います。"},
    {cat:"規制・バーゼルⅢ",
     q:"バーゼルⅡの自己資本比率規制の分母（3要素）として正しいのはどれか？",
     opts:["市場リスク＋信用リスク＋地政学リスク","信用リスク＋オペリスク＋流動性リスク","信用リスク＋市場リスク＋オペレーショナルリスク","市場リスク＋流動性リスク＋レピュテーショナルリスク"],ans:2,
     exp:"自己資本比率 = 自己資本 ÷ （<strong>信用リスク＋市場リスク＋オペレーショナルリスク</strong>） ≥ 8%。バーゼルⅢでLCR・NSFR・レバレッジ比率等が追加されました。"},
    {cat:"証券システム",
     q:"東証ArrowHead（2010年導入）で注文受付時間はどう変化したか？",
     opts:["5秒 → 1秒","3秒 → 10ミリ秒","1秒 → 100マイクロ秒","10秒 → 1ミリ秒"],ans:1,
     exp:"<strong>ArrowHead</strong>では注文受付が3秒から<strong>10ミリ秒</strong>に短縮。Tick毎秒600→8,200件（約13.5倍）に増加。"},
    {cat:"証券システム",
     q:"ジェイコム株誤発注事件（2005年）のSEへの教訓として最も適切なのはどれか？",
     opts:["大量注文は技術的に禁止すべき","メッセージボックスのデフォルトはキャンセルをカレントにすべき","東証との接続を常時2系統にすべき","担当者2名によるダブルチェックを必須にすべき"],ans:1,
     exp:"<strong>「危険な操作はデフォルトで取り消せる設計」</strong>。確認ダイアログでは「実行」ではなく「キャンセル」がデフォルトフォーカスになるよう設計します。"},
  ]
},

/* ══════════════════════════════════════════════════════════════
   TOPIC 2 — AI & LLM Fundamentals
   Wiki sources: wiki/concepts/Software 3.0.md,
                 wiki/concepts/Transformer Architecture.md,
                 wiki/concepts/KV Caching.md,
                 wiki/concepts/12-Factor Agents.md,
                 wiki/concepts/Vibe Coding.md,
                 wiki/concepts/Agentic AI.md,
                 wiki/concepts/Human-in-the-loop.md,
                 wiki/concepts/GraphRAG.md
══════════════════════════════════════════════════════════════ */
{
  id: 'llm',
  title: 'AI & LLM Fundamentals',
  icon: '🤖',
  color: '#10b981',
  description: 'Software 3.0, Transformers, Agents & Karpathy\'s Wiki Architecture',
  slideCount: 5,
  wikiPages: [
    'wiki/concepts/Software 3.0.md',
    'wiki/concepts/Transformer Architecture.md',
    'wiki/concepts/KV Caching.md',
    'wiki/concepts/Context Window Optimization.md',
    'wiki/concepts/12-Factor Agents.md',
    'wiki/concepts/Vibe Coding.md',
    'wiki/concepts/Agentic AI.md',
    'wiki/concepts/Human-in-the-loop.md',
    'wiki/concepts/GraphRAG.md',
    'wiki/concepts/Mixture-of-Experts (MoE).md',
  ],

  slides: [
    {
      num: '01',
      title: 'Software 3.0 — The Paradigm Shift',
      body: 'Software has evolved through three paradigms. In <strong>Software 3.0</strong>, natural language becomes the primary interface and LLMs act as the programmable runtime — replacing explicit rules and gradient-trained weights with prompt-driven behavior.',
      table: {
        headers: ['Era', 'Primary Interface', 'Characteristic'],
        rows: [
          ['Software 1.0', 'Explicit code (C, Python)', 'Deterministic, hand-crafted rules'],
          ['Software 2.0', 'Training data + gradients', 'Learned behavior, neural weights'],
          ['Software 3.0', 'Natural language prompts', 'LLM as runtime, emergent capabilities'],
        ]
      },
      keyPoints: [
        { color: 'blue',   text: 'Karpathy\'s insight: "The hot new programming language is English." Prompts are programs.' },
        { color: 'green',  text: 'This wiki implements Karpathy\'s LLM Wiki: a 3-layer architecture where LLMs incrementally build and maintain a compiled knowledge base (vs. RAG retrieval every query).' },
        { color: 'yellow', text: '3 layers: Raw Sources (immutable) → Wiki /wiki/ (LLM-owned) → Schema /README, prompts/ (config). LLM reads raw, writes wiki, follows schema.' },
      ],
      calc: 'sw30'
    },
    {
      num: '02',
      title: 'Transformer Architecture',
      body: 'The Transformer (Vaswani et al., "Attention Is All You Need", 2017) replaced sequential RNNs with <strong>parallel self-attention</strong>, enabling training at unprecedented scale.',
      formula: 'Attention(Q,K,V) = softmax(QK᷊ / √d_k) · V',
      table: {
        headers: ['Component', 'Role'],
        rows: [
          ['Self-Attention', 'Each token attends to all others — captures global context in one step'],
          ['Multi-Head Attention', 'Run attention h times in parallel — captures different relationship types'],
          ['Feed-Forward', 'Per-token dense layer — adds capacity'],
          ['Positional Encoding', 'Injects order info (no recurrence)'],
          ['Layer Norm + Residual', 'Enables training very deep networks stably'],
        ]
      },
      keyPoints: [
        { color: 'blue',   text: 'Key advantage over RNN/LSTM: fully parallel — no sequential dependency. Scales massively on GPUs/TPUs.' },
        { color: 'green',  text: 'Scaling laws (Chinchilla): loss ∝ (parameters, tokens)^−α. Optimal: ~20 training tokens per parameter.' },
      ]
    },
    {
      num: '03',
      title: 'KV Cache & Context Windows',
      body: 'During autoregressive inference, the model recomputes Key and Value matrices for every prior token at each step. <strong>KV Caching</strong> stores these to avoid redundant computation — trading memory for speed.',
      formula: 'KV Cache (GB) = 2 × L × H × C × bytes / 1024³',
      table: {
        headers: ['Variable', 'Meaning', 'LLaMA-3 8B example'],
        rows: [
          ['L', 'Number of layers', '32'],
          ['H', 'Hidden size', '4096'],
          ['C', 'Context length', '128 000 tokens'],
          ['bytes', '2 (fp16) or 4 (fp32)', '2 (fp16)'],
          ['Result', 'Total KV cache', '≈ 64 GB'],
        ]
      },
      keyPoints: [
        { color: 'blue',   text: 'Prompt caching (Anthropic/OpenAI): cache the expensive prefix of a long system prompt. Reduces latency and cost by >80% on repeated calls.' },
        { color: 'green',  text: 'Grouped-Query Attention (GQA) and Multi-Query Attention (MQA) reduce KV cache size by sharing K,V heads across query heads.' },
        { color: 'yellow', text: 'Context length has exploded: GPT-3 (4k) → Claude 3.5 (200k) → Gemini 1.5 (1M). Larger context = larger KV cache = more memory pressure.' },
      ],
      calc: 'kvcache'
    },
    {
      num: '04',
      title: 'Agentic AI & 12-Factor Agents',
      body: 'LLMs as <strong>agents</strong> — not just chatbots — use tools, maintain state, and complete multi-step tasks autonomously. Reliability is the core challenge.',
      table: {
        headers: ['12-Factor Principle', 'Why it matters'],
        rows: [
          ['Natural language to tool calls', 'LLM decides which tool to invoke based on context'],
          ['Own your control flow', 'Avoid infinite agent loops; keep humans in the loop at checkpoints'],
          ['Stateless where possible', 'Explicit state management prevents context drift'],
          ['Small, focused agents', 'Single-responsibility reduces failure surface'],
          ['Structured outputs', 'JSON/schema contracts between LLM and downstream systems'],
          ['Human-in-the-loop', 'Pause for human approval on irreversible or high-risk actions'],
        ]
      },
      keyPoints: [
        { color: 'blue',   text: '"Why Johnny Can\'t Use Agents" (CMU 2025): the reliability gap is the #1 barrier. Agents fail not because LLMs are wrong, but because system design is fragile.' },
        { color: 'green',  text: 'Vibe Coding: human as director, AI as executor. Natural language intent → Claude Code → working software. The human reviews and redirects, not codes line-by-line.' },
      ]
    },
    {
      num: '05',
      title: 'GraphRAG & Knowledge Architectures',
      body: 'Standard RAG retrieves chunks from a vector store. <strong>GraphRAG</strong> builds a knowledge graph first — enabling multi-hop reasoning across interconnected entities.',
      table: {
        headers: ['Approach', 'How it works', 'Best for'],
        rows: [
          ['Keyword search', 'BM25 / inverted index', 'Exact term matching'],
          ['Standard RAG', 'Embed → cosine similarity', 'Semantic similarity queries'],
          ['GraphRAG', 'Entity graph + community summaries', 'Multi-hop relational questions'],
          ['LLM Wiki (Karpathy)', 'LLM compiles knowledge incrementally', 'Deep synthesis over time'],
        ]
      },
      keyPoints: [
        { color: 'blue',   text: 'Karpathy\'s insight: RAG has to re-synthesize every query. A compiled wiki pays the synthesis cost once and serves it instantly — like compiled vs interpreted code.' },
        { color: 'yellow', text: 'Wiki page types in this repo: concepts/ (ideas), entities/ (orgs/people), infrastructure/ (systems). Organized by TYPE to prevent domain silos.' },
      ]
    },
  ],

  questions: [
    {cat:"Software 3.0",
     q:"What best defines 'Software 3.0' in Karpathy's framework?",
     opts:["The third generation of Windows OS","A paradigm where natural language + LLMs replace traditional explicit code","Software with 3 billion parameters","OpenAI's third GPT version"],ans:1,
     exp:"<strong>Software 3.0</strong> is a development paradigm where natural language serves as the primary interface and LLMs act as the runtime. 'The hot new programming language is English.'"},
    {cat:"Transformer",
     q:"What was the key architectural innovation of the Transformer (2017)?",
     opts:["Recurrent LSTM layers","Convolutional filters for text","Self-attention enabling fully parallel sequence processing","Deep residual connections"],ans:2,
     exp:"<strong>Self-attention</strong> allows every token to attend to all others in a single step — fully parallel, not sequential. This is what made scaling on GPUs/TPUs practical."},
    {cat:"KV Cache",
     q:"What is the primary purpose of KV Caching in LLM inference?",
     opts:["Cache HTTP API responses from the model provider","Store Key-Value matrices from prior tokens to avoid recomputing them each step","Compress model weights to reduce VRAM","Index the training dataset for retrieval"],ans:1,
     exp:"<strong>KV Caching</strong> stores the Key and Value matrices already computed for prior tokens, so the model only processes new tokens at each generation step — trading memory for speed."},
    {cat:"LLM Wiki",
     q:"In Karpathy's LLM Wiki architecture (this repo), what role does the /wiki/ layer play?",
     opts:["Stores immutable raw source documents","Contains LLM-generated, incrementally updated markdown synthesis pages","Holds configuration and schema for LLM prompts","Logs all user queries for analytics"],ans:1,
     exp:"The <strong>/wiki/ layer</strong> is fully LLM-owned: summaries, entity pages, concept pages, comparisons. The LLM reads from raw sources but only writes to the wiki layer."},
    {cat:"Agents",
     q:"What problem does the 12-Factor Agents methodology primarily address?",
     opts:["12 compliance requirements for deploying AI","Applying cloud-native engineering principles to overcome the reliability gap in LLM agents","12 prompt engineering templates for production","Multi-model routing and load balancing"],ans:1,
     exp:"<strong>12-Factor Agents</strong> applies cloud-native software principles (explicit state, small focused components, human-in-the-loop, structured outputs) to make LLM agents production-reliable."},
    {cat:"LLM Wiki",
     q:"Why does Karpathy's wiki organize pages 'by type, not domain'?",
     opts:["It is technically simpler to implement","Domain names change frequently over time","To prevent domain silos so pages remain discoverable peers that link naturally across topics","To match Obsidian's default folder limit"],ans:2,
     exp:"Organizing by type (<strong>concepts/, entities/, infrastructure/</strong>) prevents domain silos. A page about JPX is in <em>entities/</em>, findable from any domain — not buried in a financial systems subfolder."},
    {cat:"Vibe Coding",
     q:"What best describes 'Vibe Coding'?",
     opts:["Writing code while listening to music for creativity","Human as director using natural language to command AI as executor — reviewing and redirecting, not writing line-by-line","Informal, undocumented programming style","A React component architecture pattern"],ans:1,
     exp:"<strong>Vibe Coding</strong> (Karpathy): the human provides high-level direction in natural language; the AI (e.g. Claude Code) executes. The human's job shifts from writing code to reviewing and steering."},
    {cat:"Architecture",
     q:"What is Mixture-of-Experts (MoE)?",
     opts:["An ensemble of multiple LLM API providers","A neural architecture that activates only a subset of its parameters (experts) for each input token","A multi-agent debate framework for consensus","A technique for mixing training datasets from different domains"],ans:1,
     exp:"<strong>MoE</strong> routes each token to a small subset of 'expert' FFN layers, keeping compute per token constant even as total parameter count grows massively (e.g. GPT-4, Mixtral, DeepSeek)."},
    {cat:"Retrieval",
     q:"What distinguishes GraphRAG from standard vector RAG?",
     opts:["GraphRAG uses larger embedding models for better recall","GraphRAG builds a knowledge graph + community summaries, enabling multi-hop relational reasoning","GraphRAG is faster because it skips the embedding step","GraphRAG only works with tabular/structured data"],ans:1,
     exp:"<strong>GraphRAG</strong> (Microsoft) first builds an entity knowledge graph, then uses LLM-generated community summaries for retrieval. This enables questions that require reasoning across multiple interconnected entities."},
    {cat:"Agents",
     q:"What is Human-in-the-loop (HITL) primarily used for in agentic systems?",
     opts:["To replace all AI decisions with human ones","To collect training labels efficiently","To integrate human approval at key checkpoints — especially before irreversible or high-risk actions","To bypass automated pipelines entirely"],ans:2,
     exp:"<strong>HITL</strong> integrates human intervention at specific decision points — not to replace AI, but to ensure high-stakes or irreversible actions get human approval. Central to the 12-Factor Agents design."},
  ]
},

/* ══════════════════════════════════════════════════════════════
   TEMPLATES — Copy these to add new topics / questions
══════════════════════════════════════════════════════════════ */

// ── TOPIC_TEMPLATE ──────────────────────────────────────────
// Uncomment, fill in, and add to window.TOPICS above.
/*
{
  id: 'my-topic',                     // unique kebab-case id
  title: 'Topic Title',               // shown on home card
  icon: '📘',                         // emoji icon
  color: '#a78bfa',                   // accent color (hex)
  description: 'One-line description',
  slideCount: 5,                      // update when done
  wikiPages: [
    // List wiki pages Claude Code should read for context:
    'wiki/concepts/My Concept.md',
    'wiki/entities/My Entity.md',
  ],
  slides: [
    // SLIDE_TEMPLATE:
    {
      num: '01',
      title: 'Slide Title',
      body: 'Explanation text. Use <strong>bold</strong> for key terms.',
      formula: null,            // optional: 'Formula = A × B'
      table: null,              // optional: { headers: ['Col1','Col2'], rows: [['a','b']] }
      riskMap: false,           // set true only for the finance risk-map slide
      keyPoints: [              // optional: { color: 'blue'|'green'|'yellow'|'red', text: '...' }
        { color: 'blue', text: 'Key insight here' }
      ],
      calc: null,               // optional: 'var'|'el'|'lcr'|'basel'|'raroc'|'kvcache'|'sw30'
    },
  ],
  questions: [
    // QUESTION_TEMPLATE:
    {
      cat: 'Category Label',    // shown as badge
      q: 'Question text?',
      hint: 'Optional hint',    // remove if not needed
      opts: ['Option A','Option B','Option C','Option D'],
      ans: 0,                   // index of correct answer (0-based)
      exp: 'Explanation with <strong>HTML</strong> allowed.',
    },
  ]
},
*/

]; // end window.TOPICS
