# Knowledge Quiz — Claude Code Instructions

This file tells Claude Code how to extend the quiz.
**The only file you need to edit is `topics.js`.**

---

## Architecture

```
quiz/
├── index.html   ← App shell. Do NOT edit unless adding a new calc type.
├── topics.js    ← ALL quiz content. This is what you edit.
└── CLAUDE.md    ← This file.
```

`index.html` reads `window.TOPICS` from `topics.js` and renders everything dynamically.
A new entry in `TOPICS` automatically creates a new card on the home screen.

---

## Before Writing Questions — Read the Wiki

Each topic has a `wikiPages` array. **Always read those files first** for accuracy.

```bash
# Example: reading wiki sources for the LLM topic
cat "wiki/concepts/Software 3.0.md"
cat "wiki/concepts/Transformer Architecture.md"
cat "wiki/concepts/KV Caching.md"
```

---

## Adding a New Topic

1. Copy the `TOPIC_TEMPLATE` from the bottom of `topics.js`
2. Fill in `id`, `title`, `icon`, `color`, `description`
3. Add the relevant wiki pages to `wikiPages[]`
4. Write 4–6 slides following the slide structure
5. Write 8–15 questions following the question structure
6. Add the object to `window.TOPICS` (before the closing `];`)

---

## Adding Questions to an Existing Topic

1. Find the topic by `id` in `topics.js`
2. Add to its `questions` array
3. Follow the `QUESTION_TEMPLATE` exactly
4. `ans` is the **0-based index** of the correct option in `opts`

---

## Slide Structure Reference

```js
{
  num: '01',               // display number string, e.g. '01', '02'
  title: 'Slide Title',
  body: 'Explanation. Use <strong>bold</strong> for key terms.',

  // OPTIONAL fields — omit any that are not needed:
  formula: 'Y = A × B',   // rendered in monospace purple box
  riskMap: true,           // renders the finance risk-map grid (finance topic only)
  table: {
    headers: ['Col1', 'Col2', 'Col3'],
    rows: [
      ['val1', 'val2', 'val3'],
    ]
  },
  keyPoints: [             // accent boxes below the text
    { color: 'blue',   text: 'Key insight' },  // blue|green|yellow|red
    { color: 'green',  text: 'Another point' },
  ],
  calc: 'var',             // interactive calculator (see types below)
}
```

### Available `calc` types (built into index.html)

| Key        | What it renders                                      |
|------------|------------------------------------------------------|
| `var`      | VaR bell-curve simulator (portfolio, vol, days, CI)  |
| `el`       | Expected Loss: PD × EAD × LGD sliders + bar chart   |
| `lcr`      | LCR calculator: HQLA levels vs net outflow           |
| `basel`    | Basel III capital ratio vs minimums                  |
| `raroc`    | RAROC two-department comparison                      |
| `kvcache`  | KV Cache memory calculator (layers, hidden, context) |
| `sw30`     | Software 1.0/2.0/3.0 comparison bar chart (static)  |

To add a **new calc type**: add its HTML to the `calcHTML()` function in `index.html`,
and add its draw function (e.g. `dMyCalc()`) to the `fns` map in `initSlideCalc()`.

---

## Question Structure Reference

```js
{
  cat: 'Category Label',    // shown as badge (e.g. 'Transformer', 'LCR')
  q: 'Question text ending with ?',
  hint: 'Optional hint shown before answering',  // omit if not useful
  opts: [
    'Option A',   // index 0
    'Option B',   // index 1
    'Option C',   // index 2
    'Option D',   // index 3
  ],
  ans: 1,         // 0-based index of the CORRECT option
  exp: 'Explanation with <strong>HTML</strong> highlighting key terms.',
}
```

**Rules for good questions:**
- One clearly correct answer, three plausible distractors
- `exp` should name the correct answer in `<strong>` and explain WHY
- `hint` should give a conceptual nudge without giving the answer away
- `cat` should match a concept from the slide content

---

## Wiki Page Mapping

The quiz is designed to mirror the `/wiki/` structure. When adding a topic:

| Wiki type         | Maps to quiz content                              |
|-------------------|---------------------------------------------------|
| `wiki/concepts/`  | Core concept slides + conceptual questions        |
| `wiki/entities/`  | Organization/person context in questions          |
| `wiki/infrastructure/` | System/process slides + technical questions  |

---

## Example: Adding an "Algorithmic Trading" topic

```js
// In topics.js, add to window.TOPICS:
{
  id: 'algo-trading',
  title: 'Algorithmic Trading',
  icon: '⚡',
  color: '#f59e0b',
  description: 'VWAP, TWAP, Smart Order Routing, Market Microstructure',
  slideCount: 5,
  wikiPages: [
    'wiki/concepts/Algorithmic Trading.md',   // READ THIS FIRST
    'wiki/concepts/Smart Order Routing.md',   // AND THIS
    'wiki/concepts/Capital Markets.md',
  ],
  slides: [ /* ... */ ],
  questions: [ /* ... */ ],
},
```

---

## Deployment

The quiz is live at:
**`https://lucasmasunoacn.github.io/second-brain/quiz/`**

After editing `topics.js`, push to `main` — GitHub Pages redeploys automatically (usually within 60 seconds).

```bash
cd "C:\Users\lucas.masuno\second-brain"
git add quiz/topics.js
git commit -m "quiz: add [topic name] topic"
git push
```
