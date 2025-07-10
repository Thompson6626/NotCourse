# Course Website Landing Page

A smooth, animated landing page built with **React 19** ,**Threejs**, **TypeScript**, **Vite**, and **CSS**, showcasing both frontend interaction and design process integration.

![Preview](assets/gif/Demo.gif)

---

## Features

- Light/Dark theme toggle
- Responsive design
- Custom SVG logo (Adobe Illustrator)
- Animated content using **GSAP**
- Carousel/Slider powered by **Swiper.js**
- WebGL-ready with **Three.js** for future visual integrations

---

## Tech Stack

| Tool            | Purpose                          |
|-----------------|----------------------------------|
| [React 19](https://react.dev)         | UI library                      |
| [Vite](https://vitejs.dev)            | Lightning-fast dev/build tool   |
| [TypeScript](https://www.typescriptlang.org/) | Type safety                   |
| [Tailwind CSS](https://tailwindcss.com)     | Utility-first styling           |
| [GSAP](https://gsap.com)              | Animation engine                |
| [Lucide Icons](https://lucide.dev)    | Feather-style icon set          |
| [Swiper.js](https://swiperjs.com/)    | Carousel/Slider                 |
| [Three.js](https://threejs.org/)      | WebGL support        |

---

## Progress

### Icons3D Component

A rotating **3D icon carousel** built with **Three.js** and powered by **GSAP** for smooth animated transitions between logos.

> Including classics like React, Java, Laravel, and… — **a 3D Poop icon**.

Each icon:
- Rotates smoothly on the Z-axis  
- Transitions every 8 seconds or on click  
- Triggers a small **particle burst** effect during transitions  
- Is **loaded from a single `.glb` file**


You can check out the logic in [`Icons3D.tsx`](src/components/Icons3D.tsx) — it’s modular and ready for extension (or more meme-worthy logos).


### 3D Icons
![Some Blender progress](assets/gif/Blender.gif)

This was the simple proccess done in Blender:

- Ensuring they weren’t **distorted during import**
- **Converting them to meshes**
- **Normalizing their scale** for consistent proportions
- Giving them **some depth** through extrusion
- Adding a **back face** so both sides looked identical when rotating
- Adjusting the **origin point** to achieve proper center-based rotation


### Illustrator Logo Design
![Some Adobe Illustrator progress](assets/gif/AdobeIllus.gif)

In Illustrator, I just created some basic grids by adding vertical, horizontal, and diagonal lines.  
Then I used the **Shape Builder Tool** with the website’s primary color, experimenting until something looked nice and balanced —  
and finally exported it as an **SVG** for use in the site.

---

## Running Locally

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

To build for production:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

---

## Project Structure

```
.
├── assets/               # Gifs for github
├── public/               # Static assets (e.g. logo.svg)
├── src/
│   ├── components/       # Landing Page Components
│   ├── constants/        
│   ├── styles/           # CSS files
│   └── main.tsx
└── vite.config.ts        # Vite config (includes SVGR)
```
