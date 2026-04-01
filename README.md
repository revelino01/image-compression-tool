# 🍎 ShrinkIt - Smart Auto-Optimizing Image Compressor

> [!IMPORTANT]
> **AI-GENERATED PROJECT**
> This entire project—from architecture and logic to UI/UX and documentation—was designed, developed, and optimized entirely using **Antigravity** and **Gemini**. Every line of code was generated through agentic AI collaboration.

ShrinkIt is a premium, client-side web application designed for high-performance and privacy-focused image compression. It allows users to optimize individual images or entire folder hierarchies directly in their browser—no data ever leaves the local machine.

![ShrinkIt Landing Page](https://via.placeholder.com/1200x600/1e1b4b/ffffff?text=ShrinkIt+Landing+Page) *(Replace with a real screenshot before publishing)*

## ✨ Key Features

- **Smart Auto-Optimization**: Zero-configuration workflow. Just drop your files, and ShrinkIt automatically applies the "Goldilocks" compression profile (78% quality) to balance file size and visual fidelity.
- **Full Folder Support**: Utilizing the `webkitdirectory` API, ShrinkIt preserves your nested folder structures and bundles them back into a single ZIP for easy download.
- **Privacy First**: 100% client-side processing using Web Workers and `browser-image-compression`. Your images are never uploaded to a server.
- **Premium Aesthetics**: A modern, glassmorphic dark-mode interface built with Vanilla CSS for maximum performance and a sleek look.
- **Real-Time Progress**: Interactive progress bars and file-by-file tracking for large batches.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` or `yarn`

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/shrinkit.git
   cd shrinkit
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## 🛠️ Built With

- **React + Vite**: For a high-performance, modern development experience.
- **TypeScript**: Ensuring type safety across the compression and ZIP generation logic.
- **browser-image-compression**: The core engine for iterative, content-aware image reduction.
- **JSZip & FileSaver**: For hierarchical archive generation and robust binary downloads.
- **Lucide Icons**: Crisp, professional iconography.

## ⚖️ License

Distributed under the MIT License. See `LICENSE` for more information.

## 🤝 Acknowledgments

- [browser-image-compression](https://github.com/Donaldcwl/browser-image-compression)
- [JSZip](https://stuk.github.io/jszip/)
- [Lucide](https://lucide.dev/)

---
Created with 🍎 by Antigravity AI
