# Architectural Overview: Rick Becker Resume Website

**Generated:** December 9, 2025
**Repository:** rbecker1014/resume
**Type:** Static Website (Personal Resume/Portfolio)

---

## 1. Repository Structure

### Directory Tree

```
/home/user/resume/
├── .git/                         # Git version control
├── index.html                    # Production resume (16.0 KB)
├── staging.html                  # Staging/alternate version (9.8 KB)
├── favicon.png                   # Large favicon source (1.15 MB)
├── favicon_32x32.ico             # Optimized favicon (6.5 KB)
├── thumbnail_200x200.png         # Profile photo - production (31.5 KB)
└── thumb.jpg                     # Profile photo - staging (68 KB)
```

### File Purposes

| File | Purpose | Used By |
|------|---------|---------|
| `index.html` | **Primary production resume** - Full-featured design with advanced CSS, Google Fonts, animations, and comprehensive career history | Public visitors |
| `staging.html` | **Development/alternate version** - Simplified design using system fonts, compact layout for testing | Internal testing |
| `favicon.png` | High-resolution favicon source (1024x1024) | Asset reference |
| `favicon_32x32.ico` | Browser tab icon | `index.html` |
| `thumbnail_200x200.png` | Professional headshot (150x200) | `index.html` header |
| `thumb.jpg` | Profile photo (242x320) | `staging.html` header |

### Languages & Frameworks

| Technology | Version | Usage |
|------------|---------|-------|
| **HTML5** | - | Document structure and semantic markup |
| **CSS3** | - | Inline styling with CSS Variables, Flexbox, Grid, animations |
| **JavaScript (ES6)** | - | Google Analytics tracking only |
| **No Framework** | - | Vanilla HTML/CSS/JS (zero dependencies) |

### Build Tools

**None required.** This is a static website with no build process:
- No bundlers (Webpack, Parcel, Vite)
- No transpilers (Babel, TypeScript)
- No CSS preprocessors (Sass, Less)
- No package managers (npm, yarn)
- Files served as-is to browsers

---

## 2. Hosting & Deployment

### Hosting Platform

| Aspect | Details |
|--------|---------|
| **Platform** | GitHub Pages |
| **URL** | `https://rbecker1014.github.io/resume/` |
| **Type** | Static file hosting |
| **SSL/TLS** | Enabled (GitHub-provided certificate) |
| **CDN** | GitHub's global CDN via Fastly |

### Deployment Pipeline

```
┌─────────────────┐      ┌──────────────┐      ┌─────────────────┐
│   Local Dev     │──────│   Git Push   │──────│  GitHub Pages   │
│   (any editor)  │      │   to main    │      │   Auto-Deploy   │
└─────────────────┘      └──────────────┘      └─────────────────┘
```

**Deployment Method:** Manual Git push
- No CI/CD pipeline (no `.github/workflows/` directory)
- No build step required
- Changes go live immediately upon push to main branch

### Configuration Files

**No deployment configuration files present:**
- ❌ `firebase.json`
- ❌ `netlify.toml`
- ❌ `vercel.json`
- ❌ `.github/workflows/*.yml`
- ❌ `_config.yml` (Jekyll)
- ❌ `CNAME` (custom domain)

### Domain Configuration

| Setting | Value |
|---------|-------|
| **Primary Domain** | `rbecker1014.github.io` (GitHub subdomain) |
| **Custom Domain** | Not configured |
| **DNS Records** | Managed by GitHub |
| **HTTPS** | Enforced by default |

---

## 3. Backend Services & Integrations

### Service Overview

```
┌────────────────────────────────────────────────────────────────┐
│                    STATIC RESUME WEBSITE                       │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│   ┌─────────────────┐    ┌─────────────────┐                  │
│   │  Google Analytics│    │  Google Fonts   │                  │
│   │      (GA4)       │    │    (Inter)      │                  │
│   └────────┬────────┘    └────────┬────────┘                  │
│            │                      │                            │
│            ▼                      ▼                            │
│   ┌──────────────────────────────────────────────┐            │
│   │               index.html / staging.html       │            │
│   └──────────────────────────────────────────────┘            │
│            │                      │                            │
│            ▼                      ▼                            │
│   ┌─────────────────┐    ┌─────────────────┐                  │
│   │    Unsplash     │    │   Resume.io     │                  │
│   │  (background)   │    │   (external)    │                  │
│   └─────────────────┘    └─────────────────┘                  │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Google Analytics 4

| Aspect | Details |
|--------|---------|
| **Service** | Google Analytics 4 (GA4) |
| **Tracking ID** | `G-JZKHQNLG8N` |
| **Functionality** | Page views, visitor analytics, traffic sources |
| **Configuration** | Hardcoded in HTML `<script>` tags |
| **Files Using** | `index.html:6-13`, `staging.html:6-13` |

**Implementation:**
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-JZKHQNLG8N"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-JZKHQNLG8N');
</script>
```

### Google Fonts

| Aspect | Details |
|--------|---------|
| **Service** | Google Fonts API |
| **Font** | Inter (weights: 400, 500, 600, 700, 800) |
| **Functionality** | Typography enhancement |
| **Used In** | `index.html` only (staging uses system fonts) |
| **Implementation** | Preconnect hints + CSS import |

**Implementation:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

### Unsplash (Background Image)

| Aspect | Details |
|--------|---------|
| **Service** | Unsplash Image CDN |
| **URL** | `images.unsplash.com/photo-1520607162513-77705c0f0d4a` |
| **Functionality** | Header background image |
| **Used In** | `index.html:72` |

### Resume.io

| Aspect | Details |
|--------|---------|
| **Service** | Resume.io (external resume hosting) |
| **URL** | `https://resume.io/r/7CZgF7NFU` |
| **Functionality** | Alternative resume download/view |
| **Used In** | `index.html` download button |

### External Links (Contact & Social)

| Platform | URL | Purpose |
|----------|-----|---------|
| LinkedIn | `linkedin.com/in/rbecker` | Professional network profile |
| Email | `rick@beckerz.com` | Direct contact |
| Phone | `9254086074` | Call/SMS contact |

### API Endpoints

**None.** This is a purely static site with no:
- Cloud Functions
- Serverless functions
- REST APIs
- GraphQL endpoints
- WebSocket connections

---

## 4. Database & Storage

### Database

**None.** This site has no database requirements:
- ❌ Firebase Firestore/Realtime Database
- ❌ PostgreSQL/MySQL
- ❌ MongoDB
- ❌ SQLite
- ❌ localStorage/IndexedDB (client-side)

### Storage

| Type | Solution | Purpose |
|------|----------|---------|
| **Static Assets** | GitHub Repository | Source images, favicon, HTML files |
| **CDN Delivery** | GitHub Pages CDN | Production file serving |
| **External Images** | Unsplash CDN | Background image hosting |

### Security Rules

Not applicable - no database or protected storage.

---

## 5. Authentication & Authorization

### Authentication System

**None.** This is a public-facing resume website with:
- ❌ No login/signup functionality
- ❌ No user accounts
- ❌ No session management
- ❌ No authentication providers (Auth0, Firebase Auth, etc.)
- ❌ No JWT tokens or cookies

### Authorization Model

| Access Level | Description |
|--------------|-------------|
| **Public** | All content is publicly accessible |
| **No Restrictions** | No role-based access control |

---

## 6. Environment & Configuration

### Environment Variables

**None configured:**
- ❌ No `.env` files
- ❌ No `.env.example`
- ❌ No environment-specific builds
- ❌ No secrets management

### Hardcoded Configuration

| Configuration | Location | Value |
|---------------|----------|-------|
| GA Tracking ID | `index.html:12`, `staging.html:12` | `G-JZKHQNLG8N` |
| Favicon URL | `index.html:4` | `rbecker1014.github.io/resume/favicon_32x32.ico` |
| Profile Image | `index.html` | `rbecker1014.github.io/resume/thumbnail_200x200.png` |
| Background Image | `index.html:72` | Unsplash URL |

### CSS Variables (Design Tokens)

**Production (`index.html`):**
```css
:root {
  --ink: #0f172a;      /* Primary text color */
  --muted: #475569;    /* Secondary text color */
  --bg: #eef2ff;       /* Background color */
  --bg-alt: #f8fafc;   /* Alternate background */
  --card: #ffffff;     /* Card background */
  --brand: #0b1b33;    /* Brand color */
  --accent: #0ea5e9;   /* Accent color (cyan) */
  --success: #0f766e;  /* Success color */
  --radius: 18px;      /* Border radius */
  --maxw: 920px;       /* Max content width */
  --pad: 22px;         /* Content padding */
}
```

**Staging (`staging.html`):**
```css
:root {
  --ink: #0f172a;
  --muted: #475569;
  --bg: #f8fafc;
  --card: #ffffff;
  --brand: #0a1a33;
  --accent: #059669;   /* Green accent (different from prod) */
  --radius: 16px;
  --maxw: 780px;       /* Narrower than production */
  --pad: 20px;
}
```

---

## 7. Dependencies

### Runtime Dependencies

**Zero external dependencies.** All functionality is provided by:
- Native browser HTML5/CSS3/JavaScript
- Google-hosted external services (Analytics, Fonts)

### External Service Dependencies

| Service | Type | Required | Fallback |
|---------|------|----------|----------|
| Google Analytics | Analytics | Optional | Site works without it |
| Google Fonts | Typography | Optional | Falls back to system fonts |
| Unsplash | Image CDN | Optional | Background gradient visible |
| GitHub Pages | Hosting | Required | Site unavailable |

### Package Management

Not applicable - no `package.json`, `yarn.lock`, or any package manifests.

### Security Vulnerabilities

**None detected.** Static HTML with no:
- Outdated npm packages
- Known CVEs
- Dependency vulnerabilities

### Recommendations

| Issue | Severity | Recommendation |
|-------|----------|----------------|
| Large favicon.png | Low | 1.15 MB is excessive; compress or resize |
| No SRI hashes | Low | Add `integrity` attributes to external scripts |
| Hardcoded tracking ID | Info | Consider using a config file for consistency |

---

## 8. Architecture Diagram

### High-Level System Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              USER'S BROWSER                             │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
                                     │ HTTPS Request
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                           GITHUB PAGES CDN                              │
│                       (rbecker1014.github.io)                           │
├─────────────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌───────────────┐  ┌─────────────────────────────┐  │
│  │  index.html  │  │ staging.html  │  │  Static Assets              │  │
│  │  (16.0 KB)   │  │  (9.8 KB)     │  │  ├── favicon_32x32.ico     │  │
│  │              │  │               │  │  ├── thumbnail_200x200.png │  │
│  │  Production  │  │  Development  │  │  ├── thumb.jpg             │  │
│  │  Version     │  │  Version      │  │  └── favicon.png           │  │
│  └──────────────┘  └───────────────┘  └─────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
                     │                │                    │
                     │                │                    │
    ┌────────────────┘                │                    └────────────┐
    │                                 │                                 │
    ▼                                 ▼                                 ▼
┌─────────────┐               ┌─────────────┐                   ┌─────────────┐
│   GOOGLE    │               │   GOOGLE    │                   │  UNSPLASH   │
│  ANALYTICS  │               │   FONTS     │                   │    CDN      │
│    (GA4)    │               │             │                   │             │
├─────────────┤               ├─────────────┤                   ├─────────────┤
│ Tracking ID:│               │ Font: Inter │                   │ Background  │
│ G-JZKHQNLG8N│               │ Weights:    │                   │ Image       │
│             │               │ 400-800     │                   │             │
└─────────────┘               └─────────────┘                   └─────────────┘
```

### Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           REQUEST FLOW                                   │
└─────────────────────────────────────────────────────────────────────────┘

    User types URL
         │
         ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  DNS Resolution │────▶│  GitHub Pages   │────▶│  Return HTML    │
│  (github.io)    │     │  Edge Server    │     │  + Assets       │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                        │
                                                        ▼
                              ┌──────────────────────────────────────┐
                              │         BROWSER PARSING              │
                              │                                      │
                              │  1. Parse HTML                       │
                              │  2. Load Google Analytics (async)    │
                              │  3. Load Google Fonts (preconnect)   │
                              │  4. Load background from Unsplash    │
                              │  5. Render page                      │
                              └──────────────────────────────────────┘
                                                        │
                                                        ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                           ANALYTICS FLOW                                │
└─────────────────────────────────────────────────────────────────────────┘

    Page Load Complete
         │
         ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  gtag.js runs   │────▶│  Pageview event │────▶│  Google         │
│  gtag('config') │     │  sent to GA     │     │  Analytics      │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### Deployment Workflow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        DEPLOYMENT PROCESS                                │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   LOCAL     │     │    GIT      │     │   GITHUB    │     │   GITHUB    │
│   EDITOR    │────▶│   COMMIT    │────▶│   PUSH      │────▶│   PAGES     │
│             │     │             │     │             │     │   DEPLOY    │
│  Edit HTML  │     │  Save       │     │  Upload to  │     │  Serve      │
│  Edit CSS   │     │  Changes    │     │  Remote     │     │  Files      │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
                                                                   │
                                                                   │
                                              ┌────────────────────┘
                                              │
                                              ▼
                                    ┌─────────────────┐
                                    │   LIVE SITE     │
                                    │   UPDATED       │
                                    │   (~1-2 min)    │
                                    └─────────────────┘
```

---

## Summary

| Aspect | Status |
|--------|--------|
| **Architecture Type** | Static Website (JAMstack without the "J" and "A") |
| **Complexity Level** | Minimal - Single-page static HTML |
| **Backend** | None |
| **Database** | None |
| **Authentication** | None |
| **Build Process** | None |
| **Dependencies** | Zero (npm/yarn) |
| **External Services** | 3 (Google Analytics, Google Fonts, Unsplash) |
| **Hosting** | GitHub Pages (free tier) |
| **Deployment** | Manual git push |
| **Security Concerns** | None identified |

This architecture is intentionally simple and maintenance-free, optimized for a personal resume site that requires minimal updates and zero operational overhead.

---

*Document generated by Claude Code*
