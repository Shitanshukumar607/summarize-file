## 🧠 summarize-file

Summarize any text file using **Gemini** or **OpenAI** directly from your terminal.

```bash
npx summarize ./file.txt
```

---

## ⚙️ Setup API Key

Before running the summarizer, set up your API key for **Gemini** or **OpenAI**.

```bash
npx summarize --setup
```

This command launches an interactive prompt to securely store your API key in your system environment variables.

---

## 🧰 Requirements

* **Node.js ≥ 18**
* **Internet connection**
* A valid **Gemini** or **OpenAI** API key stored in your environment variables

---

## 🔑 Example

```bash
npx summarize ./notes.txt
```

If your API key isn’t already set, run:

```bash
npx summarize --setup
```

