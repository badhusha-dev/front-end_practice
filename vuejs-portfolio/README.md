# Shahul Hameed Badhusha Ansari - Portfolio

A modern, responsive personal portfolio website built with Vue 3, Vite, Bootstrap 5, and PWA support.

## 🚀 Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **PWA Support**: Progressive Web App with offline functionality
- **Theme System**: 4 different themes (Light, Dark, Blue, Green) with persistence
- **Animations**: Smooth transitions and scroll-triggered animations
- **SEO Optimized**: Meta tags, Open Graph, and Twitter Card support
- **Fast Loading**: Optimized with Vite for fast development and builds

## 📋 Pages

- **Home**: Hero section with typing animation and featured content
- **About**: Personal information and quick facts
- **Experience**: Professional timeline with detailed work history
- **Projects**: Portfolio showcase with project modals
- **Skills**: Categorized skills with progress bars
- **Contact**: Contact form with validation
- **Blog**: Article showcase with newsletter signup

## 🛠️ Tech Stack

- **Frontend**: Vue 3 (Composition API)
- **Build Tool**: Vite
- **Styling**: Bootstrap 5 + Custom CSS
- **Animations**: Animate.css + VueUse Motion
- **Routing**: Vue Router 4
- **PWA**: Service Worker + Web App Manifest
- **Icons**: Font Awesome 6

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.vue
│   ├── Footer.vue
│   ├── Hero.vue
│   ├── ProjectCard.vue
│   ├── TimelineItem.vue
│   ├── SkillCard.vue
│   └── ThemeToggle.vue
├── views/              # Page components
│   ├── Home.vue
│   ├── About.vue
│   ├── Experience.vue
│   ├── Projects.vue
│   ├── Skills.vue
│   ├── Contact.vue
│   └── Blog.vue
├── data/               # Static data files
│   ├── personal.js
│   ├── experience.js
│   ├── projects.js
│   ├── skills.js
│   └── blog.js
├── assets/             # Static assets
│   ├── css/
│   └── images/
├── router/             # Vue Router configuration
└── main.js            # Application entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd vuejs-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 🎨 Customization

### Personal Information

Update the data files in `src/data/` to customize your portfolio:

- `personal.js`: Personal details, contact info, bio
- `experience.js`: Work experience and achievements
- `projects.js`: Portfolio projects and descriptions
- `skills.js`: Technical skills and proficiency levels
- `blog.js`: Blog posts and articles

### Styling

- Modify `src/assets/css/main.css` for custom styles
- Update theme colors in `src/App.vue`
- Customize Bootstrap variables if needed

### Images

Replace placeholder images in `src/assets/images/` with your own:
- Profile photo
- Project screenshots
- Blog post images

## 📱 PWA Features

- **Offline Support**: Service worker caches resources for offline access
- **Installable**: Can be installed as a native app on mobile devices
- **Push Notifications**: Ready for push notification implementation
- **Background Sync**: Form submissions sync when connection is restored

## 🔧 Configuration

### Service Worker

The service worker (`public/sw.js`) handles:
- Resource caching
- Offline functionality
- Background sync
- Push notifications

### Web App Manifest

The manifest (`public/manifest.json`) defines:
- App metadata
- Icons and screenshots
- Display preferences
- Shortcuts

## 📈 Performance

- **Lazy Loading**: Components and routes are loaded on demand
- **Image Optimization**: SVG placeholders for fast loading
- **Code Splitting**: Automatic code splitting with Vite
- **Caching**: Service worker caching for repeat visits

## 🌐 Deployment

### Netlify

1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure redirects for SPA routing

### Vercel

1. Connect your repository to Vercel
2. Vercel will automatically detect Vue.js and configure the build
3. Deploy with zero configuration

### GitHub Pages

1. Build the project: `npm run build`
2. Push the `dist` folder to a `gh-pages` branch
3. Enable GitHub Pages in repository settings

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Shahul Hameed Badhusha Ansari**
- Java Backend Developer
- 4+ years of experience
- Email: shahulhameed.ansari@gmail.com
- LinkedIn: [linkedin.com/in/shahulhameedansari](https://linkedin.com/in/shahulhameedansari)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

If you have any questions or need help, feel free to contact me at shahulhameed.ansari@gmail.com

---

Built with ❤️ using Vue 3, Vite, and Bootstrap 5
