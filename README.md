# 87 Ultimate Experience App

A premium mobile-first web application for the "87 Ultimate Experience League", featuring real-time tactical stats, gamification, and a sleek dark-themed UI.

## Features

- **Home Dashboard**: Tournament overview, featured matches, and gamified promo cards.
- **Tactical Dashboard**: Advanced visualizations including:
  - **Heatmaps**: Scoring density analysis.
  - **Assist Networks**: Vector maps of goal creations.
  - **Live Stats**: Real-time possession and completion rates.
- **Teams & Rosters**: Detailed team profiles with season stats.
- **Gamification**: "Win a Weekend with BMW" promo integration.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS (Custom Premium Theme)
- **Icons**: Lucide React
- **Charts**: Recharts
- **Deployment**: Vercel Ready

## Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Run the development server**:
    ```bash
    npm run dev
    ```

3.  **Open** [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Vercel (Recommended)

This repository is optimized for Vercel deployment.

1.  Push your code to GitHub.
2.  Import the repository in Vercel.
3.  Click **Deploy**.

No custom configuration is required. The app uses standard Next.js settings.

### GitHub Pages

If you prefer GitHub Pages, you can configure `next.config.ts` for static export (`output: 'export'`) and set the `basePath` if deploying to a subdirectory.
