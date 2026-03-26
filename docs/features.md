You are a senior full-stack engineer and UI/UX designer specialist in high-performance modern web applications.

Your task is to build a production-ready company website using:

* Next.js (App Router)
* TypeScript
* Tailwind CSS
* shadcn/ui components
* next-themes for dark/light mode
* Nodemailer (or equivalent) for email handling
* Optimized for performance (Lighthouse 95+)

---

## 🌍 PROJECT CONTEXT

This is a website for an Ethiopian export company that exports:

* Coffee
* Oil seeds
* Agricultural products

The design must reflect:

* Ethiopian culture (colors, patterns, warmth)
* Premium/export-quality branding
* Clean, modern, minimal aesthetic
* Trust, reliability, and global professionalism

---

## 🎯 CORE REQUIREMENTS

### Pages

Create the following pages:

1. Home
2. About Us
3. Products
4. Contact Us

---

### 🏠 HOME PAGE

* Hero section with strong headline + CTA
* High-quality product showcase (coffee, seeds)
* Company highlights (export experience, quality, certifications)
* Visual storytelling using provided images in /pic
* Use floating or layered images (since images are background-removed PNGs)
* Include trust indicators (export stats, global reach)

---

### 🧾 ABOUT PAGE

* Company story
* Mission & vision
* Values
* Cultural identity (Ethiopian roots)
* Professional layout with typography hierarchy

---

### 📦 PRODUCTS PAGE

* Grid layout of products
* Each product has:

  * Image (from /pic)
  * Title
  * Short description
* Add hover effects and subtle animations
* Optional: modal or detail page per product

---

### 📞 CONTACT PAGE

* Contact form with:

  * Name
  * Email
  * Message
* Form must send email to admin using API route
* Add loading + success + error states
* Include company contact info

---

## 🎨 DESIGN SYSTEM

* Use shadcn/ui components wherever possible
* Implement a design system:

  * Typography scale
  * Color palette inspired by Ethiopian coffee tones:

    * Browns
    * Golds
    * Earth tones
* Include subtle animations (Framer Motion optional)

---

## 🌗 DARK MODE

* Implement dark/light mode toggle
* Use next-themes
* Ensure all components support both modes
* Persist user preference

---

## ⚡️ PERFORMANCE

* Use Next.js Image optimization
* Lazy loading for images
* Minimize JS bundle
* Use server components where possible
* Avoid unnecessary client-side rendering

---

## 🖼 IMAGE HANDLING

* Images are located in `asset/img`
* Filenames are descriptive
* Most images are transparent PNGs (no background)
* Use them creatively:

  * Layered compositions
  * Floating product visuals
  * Depth effects

---

## 🧩 COMPONENT ARCHITECTURE

Create reusable components:

* Navbar
* Footer
* HeroSection
* ProductCard
* ThemeToggle
* ContactForm

---

## 📁 FOLDER STRUCTURE

Use clean scalable structure:

/app
/components
/lib
/styles
/public/pic

---

## ✉️ EMAIL IMPLEMENTATION

* Create API route /api/contact
* Use Nodemailer
* Secure with environment variables
* Validate inputs

---

## 🧠 UX PRINCIPLES

* Fast loading (<2s)
* Mobile-first design
* Clear CTA buttons
* Clean spacing and hierarchy
* Accessible (ARIA, semantic HTML)

---

## 🚀 OUTPUT

Provide:

1. Full project structure
2. All core files
3. Key components
4. Instructions to run locally

Write clean, maintainable, production-quality code.

Do NOT explain too much — prioritize implementation.