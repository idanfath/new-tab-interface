# Danne's Tool

A modern React-based web interface built with TypeScript, Vite, and Tailwind CSS, featuring a sleek dark theme and various interactive components.

## 🌟 Features

- **Dynamic Header**

  - GitHub contribution graph visualization
  - Real-time clock display
  - Social media links (GitHub & LinkedIn)
  - Animated hover effects

- **Modern UI Components**

  - Radix UI integration for accessible components
  - Custom Aurora background effect
  - Shiny text animations
  - Context menu support
  - Toast notifications

- **Apps Integration**
  - Cobalt Selfhost - Video/audio downloader
  - Wakapi Selfhost - Coding activity tracker

## 🛠️ Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Radix UI Components
- GSAP Animations
- Three.js
- Framer Motion

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.18.0 or higher)
- pnpm (recommended) or npm

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/dannes-tool.git
cd dannes-tool
```

2. Install dependencies

```bash
pnpm install
```

3. Create a `.env` file based on `.env.example`

```bash
VITE_GITHUB_USERNAME=your_github_username
VITE_WAKAPI_USERNAME=your_wakapi_username
VITE_WAKAPI_API_KEY=your_wakapi_api_key
VITE_WAKAPI_BASE_URL=your_wakapi_base_url
VITE_LINKEDIN_USERNAME=your_linkedin_username
```

4. Start the development server

```bash
pnpm dev
```

## 🏗️ Build

To build for production:

```bash
pnpm build
```

The built files will be in the `dist` directory.

## 🧪 Linting

```bash
pnpm lint
```

## 📁 Project Structure

```
src/
├── components/
│   ├── custom/
│   │   ├── header/
│   │   └── tabs/
│   ├── ReactBits/
│   └── ui/
├── hooks/
├── lib/
├── service/
└── types/
```

## 🎨 Styling

- Tailwind CSS for utility-first styling
- Custom animations and transitions
- Dark theme by default
- Aurora background effect

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📝 License

[Add your license here]

## 🙏 Acknowledgments

- [Radix UI](https://www.radix-ui.com/) for accessible component primitives
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS framework
- [Vite](https://vitejs.dev/) for fast development and building
