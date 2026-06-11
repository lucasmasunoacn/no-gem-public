# second-brain

Personal learning platform — interactive tools built on a personal [knowledge wiki](https://github.com/lucasmasunoacn/obsidian).

## Tools

| App | URL | Description |
|-----|-----|-------------|
| [Knowledge Quiz](quiz/) | [→ Open](https://lucasmasunoacn.github.io/second-brain/quiz/) | Interactive slides + quiz for Finance, AI/LLM, and more |
| [Vocabulary](vocab/) | [→ Open](https://lucasmasunoacn.github.io/second-brain/vocab/) | Searchable glossary + 🎯 multiple-choice quiz mode |
| [Flashcards](vocab/flashcards.html) | [→ Open](https://lucasmasunoacn.github.io/second-brain/vocab/flashcards.html) | Anki-style spaced-repetition (SM-2) memorization |
| [Requests](quiz/requests.html) | [→ Open](https://lucasmasunoacn.github.io/second-brain/quiz/requests.html) | Capture vocab/quiz ideas → export for local Claude Code |

## Adding content

Each app has its own `CLAUDE.md` with instructions for extending it via Claude Code.

- **Quiz topics** → edit [`quiz/topics.js`](quiz/topics.js), follow [`quiz/CLAUDE.md`](quiz/CLAUDE.md)
- **Vocabulary** → edit [`vocab/vocab.js`](vocab/vocab.js), follow [`vocab/CLAUDE.md`](vocab/CLAUDE.md) (powers the dictionary + flashcards)
- **Capture ideas** → use the [Requests](quiz/requests.html) page, then process `quiz/_requests.json` in local Claude Code
