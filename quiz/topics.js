/**
 * ══════════════════════════════════════════════════════════════
 *  SECOND BRAIN — Topic Registry
 *  second-brain/quiz/topics.js
 * ══════════════════════════════════════════════════════════════
 *
 *  ┌── FOR CLAUDE CODE ────────────────────────────────────────┐
 *  │  Read quiz/CLAUDE.md FIRST before editing this file.      │
 *  │  • Add a topic   → copy TOPIC_TEMPLATE (bottom of file)   │
 *  │  • Add slides    → copy SLIDE_TEMPLATE  (bottom of file)  │
 *  │  • Add questions → copy QUESTION_TEMPLATE (bottom)        │
 *  │  • Before writing questions, read wikiPages[] for accuracy │
 *  └───────────────────────────────────────────────────────────┘
 *
 *  Slide `calc` types (built into index.html):
 *    'var'      VaR bell-curve simulator
 *    'el'       Expected Loss (PD × EAD × LGD)
 *    'lcr'      Liquidity Coverage Ratio
 *    'basel'    Basel III capital ratio
 *    'raroc'    RAROC dept comparison
 *    'kvcache'  KV Cache memory calculator
 *    'sw30'     Software 3.0 comparison chart
 *
 *  Slide `wikiSource`: array of wiki file paths (relative to obsidian repo root).
 *  Rendered as clickable links to the private obsidian repo — visible only when
 *  authenticated on GitHub. Safe to include in this public repo.
 *
 *  Slide `keyPoint` accent colors: 'blue' | 'green' | 'yellow' | 'red'
 */

const WIKI = 'https://github.com/lucasmasunoacn/obsidian/blob/main/';

window.TOPICS = [

/* ══════════════════════════════════════════════════════════════
   TOPIC 1 — Securities & Financial Risk
   Source wiki: wiki/concepts/, wiki/infrastructure/, wiki/entities/
══════════════════════════════════════════════════════════════ */
{
  id: 'finance',
  title: 'Securities & Financial Risk',
  icon: '📊',
  color: '#3b82f6',
  description: 'Basel III, VaR, Credit Risk, Liquidity Regulation — from the Accenture FS curriculum',
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
      title: 'Financial Risk — Overview Map',
      body: 'Financial institution risks split into "regulatory risks" and "other domains". The four primary categories are <strong>daily-exposure risks</strong> (market, credit) and <strong>sudden downside risks</strong> (operational, liquidity).',
      riskMap: true,
      table: {
        headers: ['Regulation / Framework', 'Primary Coverage', 'Type'],
        rows: [
          ['Capital Adequacy (Basel II/III)', 'Market, Credit, Operational Risk', 'Global'],
          ['LCR / NSFR', 'Liquidity Risk', 'Global'],
          ['TLAC', 'Systemic Risk (G-SIBs resolution)', 'Global'],
          ['Volcker Rule / Ring-fencing', 'Proprietary trading / bank separation', 'US / UK'],
          ['MiFID II / MiFIR', 'Best execution, transparency', 'EU'],
        ]
      },
      keyPoints: [
        { text: '4 regulatory characteristics: ① Global + local coexistence ② Phased strengthening (LCR: 60%→100% over 2015–2019) ③ Broad scope (capital, liquidity, remuneration) ④ G-SIBs additional requirements (Japan\'s 3 mega-banks included)' }
      ],
      wikiSource: ['wiki/concepts/Capital Markets.md', 'wiki/concepts/Basel III Regulation.md']
    },
    {
      num: '02',
      title: 'Market Risk — VaR (Value at Risk)',
      body: 'Risk that asset values change due to fluctuations in interest rates, FX, or equity prices.',
      formula: 'VaR = z × σ × √Holding Period × Portfolio Value',
      table: {
        headers: ['Parameter', 'Meaning', 'Example'],
        rows: [
          ['Observation period', 'How many past days of data to use', '250 days'],
          ['Holding period', 'How many days to hold the position', '10 days'],
          ['Confidence level', 'Probability the loss stays within VaR', '99% (z = 2.326)'],
        ]
      },
      keyPoints: [
        { color: 'blue',   text: 'Reading: VaR = ¥9B (99%, 10d) → "Only 1% chance of losing ¥9B+ over the next 10 days."' },
        { color: 'green',  text: 'BPV (1bp rate shift), GPS (specific tenor), SPV (slope change) = sensitivity analysis. VaR = statistical maximum loss estimate.' },
        { color: 'yellow', text: '💡 Interest rates ↑ → Bond prices ↓ (inverse relationship). Higher market rates make existing low-coupon bonds less attractive → their price falls.' },
      ],
      calc: 'var',
      wikiSource: ['wiki/concepts/Value at Risk.md']
    },
    {
      num: '03',
      title: 'Credit Risk — Expected Loss (EL)',
      body: 'Risk that asset value decreases or disappears due to a counterparty\'s financial deterioration. The core quantitative metric is Expected Loss (EL).',
      formula: 'EL = PD × EAD × LGD',
      table: {
        headers: ['Symbol', 'Full Name', 'Meaning'],
        rows: [
          ['PD', 'Probability of Default', 'Chance of default — linked to internal credit rating'],
          ['EAD', 'Exposure at Default', 'Outstanding exposure at the time of default'],
          ['LGD', 'Loss Given Default', 'Loss rate = 1 − Recovery Rate'],
        ]
      },
      keyPoints: [
        { color: 'blue',   text: 'Collateral coverage 60% → Recovery rate 60% → LGD = 40%. Varies by collateral type (real estate, securities, etc.) and coverage ratio.' },
        { color: 'green',  text: 'EL = average expected loss (like a loan loss provision). Credit VaR = 99th percentile max loss. The gap = Unexpected Loss (UL), covered by regulatory capital.' },
        { color: 'yellow', text: 'CVA ≈ ∫EPE × PD × LGD × discount dt — the "loan loss provision for derivatives". Charging CVA to traders naturally deters transactions with low-credit counterparties.' },
      ],
      calc: 'el',
      wikiSource: ['wiki/concepts/Basel III Regulation.md']
    },
    {
      num: '04',
      title: 'Liquidity Risk — LCR / NSFR',
      body: 'Risk that securing funds becomes difficult due to <strong>maturity mismatches</strong> or unexpected cash outflows. Introduced post-2008 financial crisis by the Basel Committee.',
      formula: 'LCR = HQLA (High-Quality Liquid Assets) / 30-day Net Cash Outflow ≥ 100%',
      table: {
        headers: ['Level', 'Asset Examples', 'Haircut'],
        rows: [
          ['Lv 1', 'Cash, central bank reserves, 0% RW government bonds', '100%'],
          ['Lv 2A', 'High-quality corporate bonds, covered bonds', '85%'],
          ['Lv 2B', 'RMBS (AA+ rated)', '75%'],
          ['Lv 3', 'Equities, BBB–A+ corporate bonds', '50%'],
        ]
      },
      keyPoints: [
        { color: 'green',  text: 'Phased in: 2015 → 60% | 2016 → 70% | 2017 → 80% | 2018 → 90% | 2019 → 100% (full compliance)' },
        { color: 'blue',   text: 'NSFR = Available Stable Funding / Required Stable Funding ≥ 100%. Prevents "3-month borrowing to fund 2-year lending" — if borrowing cannot be rolled over in a crisis, insolvency follows.' },
      ],
      calc: 'lcr',
      wikiSource: ['wiki/concepts/Basel III Regulation.md']
    },
    {
      num: '05',
      title: 'Capital Adequacy — Basel II / III',
      body: 'International regulation defining the minimum capital that financial institutions must hold. Basel III added <strong>capital quality improvements</strong> and <strong>liquidity regulation</strong> to the existing framework.',
      formula: 'Capital Ratio = Own Capital / (Credit RWA + Market Risk + Op Risk) ≥ 8%',
      table: {
        headers: ['Tier', 'Main Components', 'Basel III Minimum'],
        rows: [
          ['CET1', 'Common equity, retained earnings (highest quality)', '4.5%'],
          ['Tier 1', 'CET1 + AT1 (preferred shares, etc.)', '6.0%'],
          ['Total Capital', 'Tier 1 + Tier 2 (subordinated debt, etc.)', '8.0%'],
        ]
      },
      keyPoints: [
        { color: 'blue',   text: 'Basel III additions: capital conservation buffer +2.5% (CET1), countercyclical buffer, G-SIBs surcharge +1–3.5%, TLAC (Total Loss-Absorbing Capacity).' },
        { color: 'yellow', text: 'FRTB (Fundamental Review of the Trading Book) and IRRBB (Interest Rate Risk in the Banking Book) are significant additional Basel III regulatory changes.' },
      ],
      calc: 'basel',
      wikiSource: ['wiki/concepts/Basel III Regulation.md']
    },
    {
      num: '06',
      title: 'RAROC — Risk-Adjusted Return on Capital',
      body: 'Instead of comparing raw revenue, deduct the embedded risk cost first. RAROC is used for <strong>economic capital allocation</strong> decisions across business units.',
      formula: 'RAROC = (Revenue − Risk Cost) / Economic Capital (EC)',
      table: {
        headers: ['', 'Unit A', 'Unit B'],
        rows: [
          ['Revenue', '¥100B', '¥100B'],
          ['Risk cost', '¥10B', '¥50B'],
          ['Econ. Capital', '¥50B', '¥50B'],
          ['RAROC', '180%', '100%'],
        ]
      },
      keyPoints: [
        { color: 'blue',   text: 'EC allocation flow: ① Measure risk via VaR → ② Allocate EC as unit limits → ③ Units take risk within EC → ④ Evaluate by RAROC → ⑤ Validate via backtesting.' },
        { color: 'yellow', text: 'CVA linkage: charging CVA to traders makes low-credit counterparty costs visible, naturally prioritizing high-rated counterparties — aligns incentives without mandates.' },
      ],
      calc: 'raroc',
      wikiSource: ['wiki/infrastructure/Securities Firm Systems.md', 'wiki/concepts/Basel III Regulation.md']
    },
  ],

  questions: [
    {cat:"Risk Basics",
     q:"Which of the following is NOT among the major risk categories targeted by financial regulation (Basel III)?",
     hint:"The 4 main categories are market, credit, operational, and liquidity. Think about which belongs to 'other domains'.",
     opts:["Market risk","Credit risk","Geopolitical risk","Operational risk"],ans:2,
     exp:"<strong>Geopolitical risk</strong> falls under 'other domains' (BCP-covered) — not a Basel regulatory target. The 4 Basel targets are ① market ② credit ③ operational ④ liquidity risk."},
    {cat:"Market Risk",
     q:"What are the 3 parameters that define a VaR measurement?",
     hint:"Think: how far back do you look, how long do you hold, and how confident are you?",
     opts:["Observation period, holding period, confidence level","Observation period, recovery rate, confidence level","PD, EAD, LGD","Holding period, credit rating, confidence level"],ans:0,
     exp:"<strong>Observation period</strong> (past data days), <strong>holding period</strong> (days held), and <strong>confidence level</strong> (e.g. 99%). Reading: VaR = ¥9B means only 1% chance of losing ¥9B+ over the holding period."},
    {cat:"Market Risk",
     q:"When interest rates rise, what happens to a fixed-rate bond you hold?",
     hint:"You hold a bond paying 2% coupon. Market rates move to 3%. How attractive is your bond now?",
     opts:["Its price rises","Its price falls","Its price stays the same","It depends only on duration"],ans:1,
     exp:"<strong>Interest rates ↑ → Bond prices ↓</strong> (inverse relationship). Higher market rates make existing low-coupon bonds less attractive — their market price falls to compensate."},
    {cat:"Market Risk",
     q:"Which description correctly defines GPS (Grid Point Sensitivity)?",
     hint:"There are 3 sensitivity methods — BPV, GPS, SPV. Each measures a different type of yield curve movement.",
     opts:["Shifts the entire yield curve in parallel to measure impact","Shifts only a specific maturity point to measure per-tenor risk","Measures steepening/flattening yield curve shape risk","Measures equity price sensitivity"],ans:1,
     exp:"<strong>GPS</strong> shifts only a specific maturity point locally — giving granular risk by tenor. BPV = parallel shift of the full curve. SPV = slope (steepening/flattening) change."},
    {cat:"Credit Risk",
     q:"Which formula correctly calculates Expected Loss (EL)?",
     opts:["EL = PD + EAD + LGD","EL = PD × EAD ÷ LGD","EL = PD × EAD × LGD","EL = (1 − PD) × EAD × LGD"],ans:2,
     exp:"<strong>EL = PD × EAD × LGD</strong>. Default probability × exposure at default × loss given default. This is the baseline credit risk metric — analogous to a loan loss provision."},
    {cat:"Credit Risk",
     q:"Which formula correctly defines LGD (Loss Given Default)?",
     hint:"If you have collateral covering 60%, how much do you actually lose?",
     opts:["1 + Recovery Rate","1 − Recovery Rate","Default probability × Recovery Rate","Exposure ÷ Collateral value"],ans:1,
     exp:"<strong>LGD = 1 − Recovery Rate</strong>. If collateral covers 60% → Recovery Rate = 60% → LGD = 40%. The type and coverage ratio of collateral determine LGD."},
    {cat:"Credit Risk",
     q:"Which best describes CVA (Credit Value Adjustment)?",
     hint:"Think of it as the equivalent of a loan loss provision, but applied to derivatives.",
     opts:["VaR methodology applied to credit risk","Present value of expected loss on OTC derivatives if the counterparty defaults","A liquidity metric complementing LCR","Additional capital surcharge imposed on G-SIBs"],ans:1,
     exp:"<strong>CVA</strong> is the present value of the expected loss from an OTC derivative counterparty defaulting — essentially the 'loan loss provision for derivatives'. Charging CVA to traders naturally discourages high-risk counterparties."},
    {cat:"Liquidity Risk",
     q:"Which formula correctly defines LCR?",
     opts:["HQLA ÷ 30-day net cash outflows ≥ 100%","Available stable funding ÷ required stable funding ≥ 100%","Own capital ÷ risk-weighted assets ≥ 8%","Risk-adjusted return ÷ economic capital"],ans:0,
     exp:"<strong>LCR = HQLA ÷ 30-day net cash outflows ≥ 100%</strong>. ② is NSFR, ③ is the Basel capital ratio, ④ is RAROC."},
    {cat:"Liquidity Risk",
     q:"Which HQLA level receives a 100% haircut (full value counted)?",
     hint:"Think about the safest, most liquid assets a bank can hold.",
     opts:["Investment-grade corporate bonds (A+)","Residential mortgage-backed securities (RMBS, AA+)","Cash, central bank reserves, 0% risk-weight government bonds","Covered bonds (AA+)"],ans:2,
     exp:"<strong>Level 1 assets</strong> (cash, central bank reserves, 0% RW government bonds) qualify at 100%. Level 2A (corp bonds, covered bonds) = 85%. Level 2B (RMBS AA+) = 75%."},
    {cat:"Liquidity Risk",
     q:"What core problem does NSFR address?",
     opts:["Short-term (30-day) stress — insufficient liquid assets","Maturity mismatch: funding long-term assets with short-term debt, causing insolvency when rollover fails","Counterparty default loss on derivative contracts","Global bank capital adequacy shortfall"],ans:1,
     exp:"<strong>NSFR</strong> targets maturity mismatch. Classic failure: borrow 3-month money, lend for 2 years. In a crisis, the short-term rollover fails but the long-term loan can't be recalled → insolvency."},
    {cat:"Basel III",
     q:"Which capital tier was newly introduced in Basel III?",
     opts:["Tier 1 (common equity + preferred shares)","Tier 2 (subordinated debt, etc.)","CET1 — Common Equity Tier 1","TLAC — Total Loss-Absorbing Capacity"],ans:2,
     exp:"<strong>CET1 (Common Equity Tier 1)</strong> was introduced in Basel III — consisting solely of common shares and retained earnings. It is the highest-quality capital tier, with a minimum requirement of 4.5%."},
    {cat:"Basel III",
     q:"Which formula correctly defines RAROC?",
     opts:["(Revenue + Risk) ÷ Economic Capital","(Revenue − Risk) ÷ Economic Capital","Revenue ÷ (Economic Capital × Risk)","Risk × Revenue ÷ Own Capital"],ans:1,
     exp:"<strong>RAROC = (Revenue − Risk Cost) ÷ Economic Capital</strong>. Two units with the same revenue but different risk levels will have different RAROCs. Used to allocate capital to the most efficient business units."},
    {cat:"Basel III",
     q:"What are the 3 denominator components of the Basel II capital ratio?",
     opts:["Market risk + credit risk + geopolitical risk","Credit risk + op risk + liquidity risk","Credit risk + market risk + operational risk","Market risk + liquidity risk + reputational risk"],ans:2,
     exp:"Basel II: Capital Ratio = Own Capital ÷ (<strong>Credit risk + Market risk + Operational risk</strong>) ≥ 8%. Basel III then added LCR, NSFR, leverage ratio, and various capital buffers on top."},
    {cat:"Securities Systems",
     q:"How did TSE ArrowHead (launched 2010) change order processing time?",
     opts:["5 seconds → 1 second","3 seconds → 10 milliseconds","1 second → 100 microseconds","10 seconds → 1 millisecond"],ans:1,
     exp:"<strong>ArrowHead</strong> reduced order processing from 3 seconds to <strong>10 milliseconds</strong>. Market data tick capacity also grew from 600 to 8,200 ticks/sec (~13.5×). Co-location services were introduced."},
    {cat:"Securities Systems",
     q:"What is the key SE design lesson from the J-COM stock misorder incident (2005)?",
     hint:"A trader entered '1 yen for 610,000 shares' instead of '¥610,000 for 1 share'. Think about UI default states.",
     opts:["Large orders should be blocked by the system","Confirmation dialogs should default focus to Cancel — not Confirm","Exchange connections should always be dual-line","Two-person double-check should be mandatory for all orders"],ans:1,
     exp:"<strong>'Default the dangerous action to Cancel.'</strong> Confirmation dialogs should focus the Cancel button, not Confirm — so an accidental Enter key press triggers cancellation, not execution. ¥40.4B in losses led to a ¥10.7B Supreme Court settlement against TSE."},
  ]
},

/* ══════════════════════════════════════════════════════════════
   TOPIC 2 — AI & LLM Fundamentals
   Source wiki: wiki/concepts/Software 3.0.md etc.
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
        { color: 'green',  text: 'This wiki implements Karpathy\'s LLM Wiki: LLMs incrementally build and maintain a compiled knowledge base — paying synthesis cost once, vs. RAG which re-synthesizes on every query.' },
        { color: 'yellow', text: '3 layers: Raw Sources (immutable) → Wiki /wiki/ (LLM-owned synthesis) → Schema /README, prompts/ (config). LLM reads raw, writes wiki, follows schema.' },
      ],
      calc: 'sw30',
      wikiSource: ['wiki/concepts/Software 3.0.md', 'wiki/concepts/Vibe Coding.md']
    },
    {
      num: '02',
      title: 'Transformer Architecture',
      body: 'The Transformer (Vaswani et al., "Attention Is All You Need", 2017) replaced sequential RNNs with <strong>parallel self-attention</strong>, enabling training at unprecedented scale.',
      formula: 'Attention(Q,K,V) = softmax(QKᵀ / √d_k) · V',
      table: {
        headers: ['Component', 'Role'],
        rows: [
          ['Self-Attention', 'Each token attends to all others — captures global context in one step'],
          ['Multi-Head Attention', 'Run attention h times in parallel — captures different relationship types'],
          ['Feed-Forward', 'Per-token dense layer — adds non-linear capacity'],
          ['Positional Encoding', 'Injects order information (no recurrence needed)'],
          ['Layer Norm + Residual', 'Enables stable training of very deep networks'],
        ]
      },
      keyPoints: [
        { color: 'blue',   text: 'Key advantage over RNN/LSTM: fully parallel — no sequential dependency. Scales massively on GPU/TPU clusters.' },
        { color: 'green',  text: 'Chinchilla scaling laws: optimal training uses ~20 tokens per parameter. A 7B model needs ~140B training tokens for compute-optimal performance.' },
      ],
      wikiSource: ['wiki/concepts/Transformer Architecture.md']
    },
    {
      num: '03',
      title: 'KV Cache & Context Windows',
      body: 'During autoregressive inference, the model recomputes Key and Value matrices for every prior token at each step. <strong>KV Caching</strong> stores these to avoid redundant computation — trading memory for speed.',
      formula: 'KV Cache (GB) = 2 × L × H × C × bytes_per_element / 1024³',
      table: {
        headers: ['Variable', 'Meaning', 'LLaMA-3 8B example'],
        rows: [
          ['L', 'Number of layers', '32'],
          ['H', 'Hidden size', '4096'],
          ['C', 'Context length (tokens)', '128,000'],
          ['bytes', 'fp16 = 2, fp32 = 4', '2 (fp16)'],
          ['Result', 'Total KV cache', '≈ 64 GB'],
        ]
      },
      keyPoints: [
        { color: 'blue',   text: 'Prompt caching (Anthropic / OpenAI): cache expensive system prompt prefixes. Reduces latency and cost by >80% on repeated API calls with the same prefix.' },
        { color: 'green',  text: 'GQA / MQA (Grouped / Multi-Query Attention): reduce KV cache size by sharing K,V heads across query heads — key technique behind efficient long-context models.' },
        { color: 'yellow', text: 'Context length explosion: GPT-3 (4k) → Claude 3.5 Sonnet (200k) → Gemini 1.5 (1M tokens). Larger context = larger KV cache = more GPU memory pressure.' },
      ],
      calc: 'kvcache',
      wikiSource: ['wiki/concepts/KV Caching.md', 'wiki/concepts/Context Window Optimization.md']
    },
    {
      num: '04',
      title: 'Agentic AI & 12-Factor Agents',
      body: 'LLMs as <strong>agents</strong> — not just chatbots — use tools, maintain state, and complete multi-step tasks autonomously. Reliability is the core engineering challenge.',
      table: {
        headers: ['12-Factor Principle', 'Why it matters'],
        rows: [
          ['Natural language to tool calls', 'LLM decides which tool to invoke based on context'],
          ['Own your control flow', 'Avoid infinite loops; gate on humans at key checkpoints'],
          ['Stateless where possible', 'Explicit state management prevents context drift'],
          ['Small, focused agents', 'Single-responsibility reduces failure surface area'],
          ['Structured outputs', 'JSON/schema contracts make LLM output machine-readable'],
          ['Human-in-the-loop', 'Pause for approval on irreversible or high-risk actions'],
        ]
      },
      keyPoints: [
        { color: 'blue',   text: '"Why Johnny Can\'t Use Agents" (CMU 2025): the reliability gap is the #1 barrier. Agents fail not because LLMs are wrong, but because system design is fragile.' },
        { color: 'green',  text: 'Vibe Coding (Karpathy): human as director, AI as executor. Natural language intent → Claude Code → working software. Human reviews and redirects, not codes line-by-line.' },
      ],
      wikiSource: ['wiki/concepts/12-Factor Agents.md', 'wiki/concepts/Agentic AI.md', 'wiki/concepts/Human-in-the-loop.md', 'wiki/concepts/Vibe Coding.md']
    },
    {
      num: '05',
      title: 'GraphRAG & Knowledge Architectures',
      body: 'Standard RAG retrieves text chunks from a vector store. <strong>GraphRAG</strong> first builds a knowledge graph — enabling multi-hop reasoning across interconnected entities.',
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
        { color: 'blue',   text: 'Karpathy\'s key insight: RAG re-synthesizes on every query. A compiled wiki pays the synthesis cost once and serves it instantly — like compiled vs. interpreted code.' },
        { color: 'yellow', text: 'This repo\'s wiki organizes pages by TYPE (concepts/, entities/, infrastructure/) — not domain — to prevent silos and allow natural cross-domain linking.' },
      ],
      wikiSource: ['wiki/concepts/GraphRAG.md']
    },
  ],

  questions: [
    {cat:"Software 3.0",
     q:"What best defines 'Software 3.0' in Karpathy's framework?",
     opts:["The third generation of the Windows OS","A paradigm where natural language + LLMs replace traditional explicit code","Software with 3 billion parameters","OpenAI's third GPT version"],ans:1,
     exp:"<strong>Software 3.0</strong> is a development paradigm where natural language serves as the primary interface and LLMs act as the programmable runtime. Karpathy: 'The hot new programming language is English.'"},
    {cat:"Transformer",
     q:"What was the key architectural innovation of the Transformer (Vaswani et al., 2017)?",
     opts:["Recurrent LSTM layers for sequential memory","Convolutional filters adapted for text","Self-attention enabling fully parallel sequence processing","Deep residual connections for gradient flow"],ans:2,
     exp:"<strong>Self-attention</strong> allows every token to attend to all others in a single step — fully parallel, not sequential. This is what made scaling on GPUs/TPUs practical and enabled modern LLMs."},
    {cat:"KV Cache",
     q:"What is the primary purpose of KV Caching in LLM inference?",
     opts:["Cache HTTP API responses from the model provider","Store Key-Value matrices from prior tokens to avoid recomputing them each step","Compress model weights to reduce VRAM","Index the training dataset for faster retrieval"],ans:1,
     exp:"<strong>KV Caching</strong> stores the Key and Value matrices already computed for prior tokens, so the model only needs to process new tokens at each generation step — trading memory for inference speed."},
    {cat:"LLM Wiki",
     q:"In Karpathy's LLM Wiki architecture, what role does the /wiki/ layer play?",
     opts:["Stores immutable raw source documents the LLM reads","Contains LLM-generated, incrementally maintained markdown synthesis pages","Holds configuration and schema (prompts) that guide the LLM","Logs all user queries for analytics"],ans:1,
     exp:"The <strong>/wiki/ layer</strong> is fully LLM-owned: summaries, entity pages, concept pages, comparisons. The LLM reads raw sources but only writes to the wiki layer, following the schema in /README."},
    {cat:"Agents",
     q:"What problem does the 12-Factor Agents methodology primarily address?",
     opts:["12 compliance requirements for deploying AI in production","Applying cloud-native engineering principles to overcome the reliability gap in LLM agents","12 prompt engineering templates for production systems","Multi-model routing and load balancing"],ans:1,
     exp:"<strong>12-Factor Agents</strong> applies cloud-native software principles (explicit state, small focused components, HITL, structured outputs) to make LLM agents production-reliable — addressing the 'reliability gap'."},
    {cat:"LLM Wiki",
     q:"Why does Karpathy's wiki organize pages 'by type, not domain'?",
     opts:["It is technically simpler to implement in file systems","Domain names change frequently and become stale","To prevent domain silos — pages remain discoverable peers that link naturally across topics","To match Obsidian's default folder structure requirements"],ans:2,
     exp:"Organizing by type (<strong>concepts/, entities/, infrastructure/</strong>) prevents domain silos. A page on JPX lives in entities/ and is findable from any domain — not buried in a financial-systems subfolder."},
    {cat:"Vibe Coding",
     q:"What best describes 'Vibe Coding'?",
     opts:["Writing code while listening to music for creative flow","Human as director using natural language to command AI as executor — reviewing and redirecting rather than writing line-by-line","Informal, undocumented rapid prototyping","A React component architecture pattern"],ans:1,
     exp:"<strong>Vibe Coding</strong> (Karpathy): the human provides high-level direction in natural language; the AI (e.g. Claude Code) executes. The human's role shifts from writing code to directing, reviewing, and steering outcomes."},
    {cat:"Architecture",
     q:"What is Mixture-of-Experts (MoE)?",
     opts:["An ensemble of multiple LLM API providers","A neural architecture that activates only a subset of its parameters (experts) for each input token","A multi-agent debate framework for building consensus","A technique for mixing training datasets from different domains"],ans:1,
     exp:"<strong>MoE</strong> routes each token to a small subset of 'expert' feed-forward layers, keeping compute per token constant even as total parameter count grows massively (used in GPT-4, Mixtral, DeepSeek)."},
    {cat:"Retrieval",
     q:"What distinguishes GraphRAG from standard vector RAG?",
     opts:["GraphRAG uses larger embedding models for better recall","GraphRAG builds a knowledge graph and community summaries, enabling multi-hop relational reasoning","GraphRAG is faster because it skips the embedding step","GraphRAG only works with structured tabular data"],ans:1,
     exp:"<strong>GraphRAG</strong> (Microsoft) first builds an entity knowledge graph, then uses LLM-generated community summaries. This enables questions requiring reasoning across multiple interconnected entities — not just semantic similarity."},
    {cat:"Agents",
     q:"What is Human-in-the-loop (HITL) primarily used for in agentic systems?",
     opts:["To replace all AI decisions with human ones","To efficiently collect training labels at scale","To integrate human approval at key checkpoints — especially before irreversible or high-risk actions","To bypass automated pipelines when they fail"],ans:2,
     exp:"<strong>HITL</strong> integrates human intervention at specific decision points — not to replace AI, but to ensure high-stakes or irreversible actions receive human approval. A core principle of the 12-Factor Agents methodology."},
  ]
},

/* ══════════════════════════════════════════════════════════════
   TEMPLATES — Copy these to add new topics / questions
══════════════════════════════════════════════════════════════ */

// ── TOPIC_TEMPLATE ──────────────────────────────────────────
/*
{
  id: 'my-topic',
  title: 'Topic Title',
  icon: '📘',
  color: '#a78bfa',
  description: 'One-line description shown on the home card.',
  slideCount: 5,
  wikiPages: [
    'wiki/concepts/My Concept.md',
    'wiki/entities/My Entity.md',
  ],
  slides: [
    {
      num: '01',
      title: 'Slide Title',
      body: 'Explanation. Use <strong>bold</strong> for key terms.',
      formula: null,
      table: null,
      riskMap: false,
      keyPoints: [
        { color: 'blue', text: 'Key insight' }
      ],
      calc: null,
      wikiSource: ['wiki/concepts/My Concept.md'],
    },
  ],
  questions: [
    {
      cat: 'Category',
      q: 'Question?',
      hint: 'Optional hint',
      opts: ['A','B','C','D'],
      ans: 0,
      exp: 'Explanation with <strong>key term</strong> highlighted.',
    },
  ]
},
*/

]; // end window.TOPICS
