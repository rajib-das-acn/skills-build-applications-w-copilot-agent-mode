# OctoFit Tracker frontend

The frontend reads `VITE_CODESPACE_NAME` from the Vite environment to connect to
the API at `https://<codespace-name>-8000.app.github.dev`. In a Codespace, define
the variable in `octofit-tracker/frontend/.env.local` before starting Vite:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

Restart the Vite development server after changing `.env.local`. If the variable
is unset, the app safely uses `http://localhost:8000` for local development.

Run the presentation tier with:

```bash
npm --prefix octofit-tracker/frontend run dev
```
