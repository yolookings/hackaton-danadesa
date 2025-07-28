# Dana Desa - Blockchain-Based Village Fund Transparency System

<div align="center">

![Dana Desa Logo](/img/logo-danadesa.png)

**Sistem Transparansi Dana Desa Berbasis Blockchain**

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

</div>

## 📋 Overview

Dana Desa is a modern, blockchain-based transparency system designed to provide real-time monitoring and accountability for village fund management in Indonesia. This system ensures that every transaction and project allocation is transparent, traceable, and accessible to all stakeholders.

### 🎯 Key Objectives

- **Transparency**: Provide real-time visibility into village fund allocation and usage
- **Accountability**: Ensure all transactions are recorded on blockchain for immutability
- **Accessibility**: Enable easy access to fund information for villagers and stakeholders
- **Efficiency**: Streamline the monitoring and reporting process for village administrators

## ✨ Features

### 🔍 Real-time Project Monitoring

- Live tracking of project progress and fund utilization
- Interactive dashboards with visual progress indicators
- Search and filter functionality for easy project discovery

### 📊 Comprehensive Analytics

- Fund allocation breakdown by category
- Progress tracking with percentage completion
- Financial summaries and reporting tools

### 🔐 Blockchain Integration

- Immutable transaction records
- Smart contract-based fund allocation
- Transparent audit trails

### 📱 Responsive Design

- Mobile-first approach for accessibility
- Modern UI/UX with intuitive navigation
- Cross-platform compatibility

### 🎨 Modern Interface

- Beautiful gradient designs
- Interactive components
- Real-time data visualization

## 🛠️ Technology Stack

### Frontend

- **Next.js 15.2.4** - React framework for production
- **React 18.2.0** - UI library
- **TypeScript 5.0** - Type-safe JavaScript
- **Tailwind CSS 3.4.17** - Utility-first CSS framework

### UI Components

- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons
- **Recharts** - Data visualization
- **React Hook Form** - Form management
- **Zod** - Schema validation

### Development Tools

- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing
- **ESLint** - Code linting

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm, yarn, or pnpm package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/danadesa.git
   cd danadesa
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
danadesa/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── loading.tsx        # Loading component
│   ├── page.tsx           # Home page
│   └── project/           # Project pages
│       └── [id]/          # Dynamic project routes
├── components/            # Reusable components
│   ├── ui/               # UI components (shadcn/ui)
│   └── theme-provider.tsx # Theme configuration
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static assets
├── styles/               # Additional styles
└── img/                  # Project images
```

## 🖼️ Screenshots

<div>

### Dashboard Overview

![Dashboard](/img/dashboard.png)

### Project List

![Project List](/img/project-list.png)

### Project Details

![Project Details](/img/project-details.png)

</div>

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Blockchain Configuration
BLOCKCHAIN_NETWORK=ethereum
CONTRACT_ADDRESS=your_contract_address
PRIVATE_KEY=your_private_key

# Database Configuration
DATABASE_URL=your_database_url

# API Configuration
API_BASE_URL=http://localhost:3000/api
```

### Tailwind Configuration

The project uses a custom Tailwind configuration with:

- Custom color palette
- Responsive breakpoints
- Animation utilities
- Component-specific styles

## 📱 Usage

### For Village Administrators

1. **Login** to the admin dashboard
2. **Create** new projects with fund allocation
3. **Monitor** project progress and fund utilization
4. **Generate** reports for stakeholders

### For Villagers

1. **Browse** available projects
2. **Search** for specific projects or locations
3. **View** detailed project information
4. **Track** fund allocation and progress

### For Stakeholders

1. **Access** public dashboard
2. **Review** project transparency data
3. **Download** reports and analytics
4. **Verify** blockchain transactions

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use conventional commit messages
- Ensure responsive design
- Write comprehensive tests
- Update documentation

## Web

You can access on this site =
https://its.id/m/danadesa

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **Vercel** for hosting and deployment
- **Tailwind CSS** for the utility-first CSS framework
- **Radix UI** for accessible components
- **Indonesian Government** for village fund transparency initiatives

## 🔮 Roadmap

- [ ] **Phase 1**: Basic transparency dashboard ✅
- [ ] **Phase 2**: Blockchain integration
- [ ] **Phase 3**: Mobile application
- [ ] **Phase 4**: Advanced analytics
- [ ] **Phase 5**: Multi-village support
- [ ] **Phase 6**: AI-powered insights

---

<div align="center">

**Made with ❤️ for Indonesian Villages**

_Empowering transparency through blockchain technology_

</div>
