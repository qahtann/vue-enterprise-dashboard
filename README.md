# 🚀 Vue Enterprise Dashboard

<div align="center">

![Vue](https://img.shields.io/badge/Vue-3.4-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Nuxt](https://img.shields.io/badge/Nuxt-3.11-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**A modern, production-ready enterprise dashboard built with Vue 3, Nuxt 3, and TypeScript**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Project Structure](#-project-structure) • [Screenshots](#-screenshots)

</div>

---

## ✨ Features

- 🎨 **Modern UI/UX** - Beautiful, responsive design with dark/light theme support
- 🔐 **Role-Based Access Control** - Admin, user, and guest roles with route guards
- 📊 **Interactive Dashboards** - KPI cards, charts, and analytics with Chart.js
- 🧩 **Modular Architecture** - Reusable components, composables, and stores
- ♿ **Accessibility** - ARIA labels, keyboard navigation, and screen reader support
- 🎯 **TypeScript** - Full type safety with strict mode enabled
- 🧪 **Testing** - Vitest setup with component tests
- 📱 **Responsive Design** - Mobile-first approach with collapsible sidebar
- 🚀 **Performance** - Lazy loading, optimized renders, and efficient state management

## 🛠 Tech Stack

### Core Framework
- **[Vue 3](https://vuejs.org/)** - Progressive JavaScript framework with Composition API
- **[Nuxt 3](https://nuxt.com/)** - The Intuitive Vue Framework (SSR, auto-imports, modules)
- **[TypeScript](https://www.typescriptlang.org/)** - Typed JavaScript at any scale

### Styling & UI
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Lucide Vue Next](https://lucide.dev/)** - Beautiful & consistent icon toolkit
- **Custom UI Components** - shadcn-vue inspired component library

### State Management & Data
- **[Pinia](https://pinia.vuejs.org/)** - The Vue Store that you will enjoy using
- **Mock Data** - Static JSON data for demo purposes

### Charts & Visualization
- **[Chart.js](https://www.chartjs.org/)** - Simple yet flexible JavaScript charting
- **[Vue ChartJS](https://vue-chartjs.org/)** - Vue.js wrapper for Chart.js

### Development Tools
- **[Vitest](https://vitest.dev/)** - Fast unit test framework
- **[ESLint](https://eslint.org/)** - Code linting
- **[Nuxt Color Mode](https://color-mode.nuxtjs.org/)** - Dark/light/system theme support

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/vue-enterprise-dashboard.git
   cd vue-enterprise-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables** (optional)
   ```bash
   cp .env.example .env
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm run preview
```

### Run Tests

```bash
npm run test
```

## 📁 Project Structure

```
vue-enterprise-dashboard/
├── assets/
│   └── css/
│       └── main.css              # Global styles and theme variables
├── components/
│   ├── dashboard/                # Dashboard-specific components
│   │   ├── KpiCard.vue
│   │   ├── ChartWrapper.vue
│   │   ├── ActivityFeed.vue
│   │   └── DataTable.vue
│   ├── layout/                   # Layout components
│   │   ├── Sidebar.vue
│   │   └── Header.vue
│   └── ui/                       # Reusable UI components
│       ├── Button.vue
│       ├── Card.vue
│       ├── Table.vue
│       ├── Input.vue
│       └── ...
├── composables/                  # Vue composables
│   ├── useRoleCheck.ts
│   └── useFetchData.ts
├── layouts/
│   └── default.vue              # Default layout with sidebar
├── lib/
│   ├── types/                    # TypeScript type definitions
│   │   └── index.ts
│   └── utils/                    # Utility functions
│       └── index.ts
├── middleware/
│   └── admin.ts                  # Route guard for admin routes
├── pages/                        # Nuxt pages (auto-routing)
│   ├── index.vue                 # Dashboard/Overview
│   ├── users.vue                 # Users management (admin only)
│   ├── analytics.vue             # Analytics page
│   └── settings.vue               # Settings page
├── plugins/
│   └── click-outside.client.ts   # Click outside directive
├── stores/                       # Pinia stores
│   ├── user.ts                   # User state & auth
│   ├── theme.ts                  # Theme preferences
│   └── data.ts                   # Mock data & analytics
├── tests/
│   └── components/               # Component tests
│       └── Button.test.ts
├── app.vue                       # Root component
├── nuxt.config.ts                # Nuxt configuration
├── tailwind.config.js            # Tailwind configuration
├── tsconfig.json                  # TypeScript configuration
└── package.json
```

## 🎨 Features in Detail

### Dashboard Overview
- **KPI Cards** - Key performance indicators with trend indicators
- **Revenue Charts** - Interactive line charts showing revenue trends
- **Activity Feed** - Real-time activity updates and notifications

### Users Management (Admin Only)
- **Data Table** - Sortable, searchable, and paginated user table
- **CRUD Operations** - Create, read, update, and delete users
- **Role Management** - Assign and update user roles

### Analytics
- **Multiple Chart Types** - Line, bar, and doughnut charts
- **Date Range Filters** - Filter data by 7d, 30d, 90d, or 1y
- **Export Functionality** - Export analytics data as JSON

### Settings
- **Profile Management** - Update name and email
- **Theme Selector** - Switch between light, dark, and system themes

## 🔐 Role-Based Access Control

The dashboard supports three user roles:

- **Admin** - Full access to all features including user management
- **User** - Access to dashboard, analytics, and settings
- **Guest** - Limited access to dashboard only

Route guards and conditional rendering ensure users only see features they're authorized to access.

## 📧 Contact

- telegram: https://t.me/qahtan_n
- twitter:  https://x.com/qahtann_
