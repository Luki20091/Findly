# **Findly — Product Requirements Document (PRD)**

## **1. Overview**

### **1.1 Product Name**

**Findly — Lost & Found Web Application**

### **1.2 Product Summary**

Findly is a front-end web application that enables users to search for lost items and browse found items stored in a JSON-based local dataset. The platform features a clean UI, smart search functionalities, theme switching, a helper chatbot (Find-Bot), and engaging aesthetics powered by React, TypeScript, Vite, and TailwindCSS.

### **1.3 Purpose of the Document**

The PRD outlines the functional, technical, and UX requirements necessary to build the full MVP version of Findly.

---

# **2. Goals & Non-Goals**

## **2.1 Goals**

* Provide a fast, intuitive, Google-style search interface for lost items.
* Allow real-time filtering of items stored in a local JSON database.
* Create a clean and modern interface with dark/light mode support.
* Introduce a helper chatbot (Find-Bot) to guide first-time users.
* Deliver smooth animations, skeleton loaders, and responsive UI.
* Build a fully front-end-only product with no backend.

## **2.2 Non-Goals**

* No user authentication system.
* No ability to add or remove items dynamically.
* No real-time backend or API.
* No AI-powered chatbot.

---

# **3. Target Audience**

* People searching for lost items.
* Users who prefer minimalistic interfaces.
* People who want quick, no-login access to information.
* Non-technical users who rely on assistants (Find-Bot).

---

# **4. Functional Requirements**

## **4.1 Core Features**

1. **Search Bar (centered, Google-like)**

   * Live search filtering.
   * Randomized placeholder text from a predefined list.
   * Filters items by name, description, and location.
   * Search results display only after user types input.

2. **Items List (from items.json)**

   * Data loaded using `fetch()` from `/src/data/items.json`.
   * Displayed below search bar when input is present.
   * Styled using Card components.

3. **Theme Toggle (Dark/Light Mode)**

   * Toggle button switches themes.
   * Theme persistence via localStorage.

4. **Find-Bot (Helper Chat)**

   * Floating button in bottom-right.
   * Expands into a panel when clicked.
   * First-time users asked for name.
   * Name stored in localStorage.
   * Returning users welcomed by name.
   * 3-button FAQ-only interaction.
   * No free text input.

5. **Skeleton Loading**

   * All loading elements (header, search, cards, chat) have skeletons.

6. **Meta Tags & Logo**

   * SEO support.
   * `logo.png` & `logo.ico` placed in `public/`.

---

# **5. Detailed Requirements**

## **5.1 User Interface Requirements**

### **Header**

* Displays the project logo.
* Shows headline: **“Welcome to Findly”**.
* Includes theme toggle.
* Smooth fade-in animation.

### **Search Section**

* Search bar is centered and large.
* Uses rounded full style, shadows, transitions.
* Shows results only if input length > 0.
* Random placeholder from list of 10 examples.

### **Results Section**

* Cards appear in a grid or column layout.
* Each card shows:

  * Item name
  * Description
  * Date
  * Location
* Hover scaling animation.
* Fade-in on list refresh.

### **Find-Bot Helper Panel**

* Collapsible panel fixed to bottom-right.
* First message depends on localStorage.
* FAQ buttons visible after introduction.
* Each FAQ returns predefined answer.

---

# **5.2 Technical Requirements**

## **Technology Stack**

* **Vite 5+**
* **React 18+**
* **TypeScript**
* **TailwindCSS**

## **Data Handling**

* Items dataset stored in `src/data/items.json`.
* Data fetched once using `fetch()`.
* No backend calls.

## **State Management**

* Local component state via React hooks.
* Context used only for Theme.
* No external state libraries.

## **Local Storage Keys**

* `theme` — current theme.
* `findly_name` — stored username for Find-Bot.

---

# **6. UX Requirements**

## **6.1 Accessibility**

* ARIA labels on chat button, search bar, theme toggle.
* High contrast between light/dark themes.
* Tab-friendly navigation.

## **6.2 Animations**

* Skeleton loaders during all loading states.
* Fade-in for cards.
* Slide-in for chat panel.
* Hover scaling on cards.

---

# **7. Assets**

* `logo.png` (header, Open Graph image)
* `logo.ico` (favicon)
* Placeholder list stored in `/src/utils/placeholders.ts`

---

# **8. File Structure**

```
/src
  /components
    Card.tsx
    SearchBar.tsx
    ThemeToggle.tsx
    FindBot.tsx
    Skeleton.tsx
  /context
    ThemeContext.tsx
  /data
    items.json
  /hooks
    useItems.ts
  /types
    Item.ts
  /utils
    placeholders.ts
  App.tsx
  main.tsx
/public
  logo.png
  logo.ico
```

---

# **9. Acceptance Criteria**

A feature is DONE when:

* It fulfills functional requirements.
* It meets UX guidelines.
* It is responsive across mobile, tablet, desktop.
* Animations and skeletons are present.
* No console errors in development.
* All text is readable in dark & light themes.
* Find-Bot behavior matches PRD logic.

---

# **10. Success Metrics (MVP)**

* Page loads under 150ms (Vite + no backend).
* Search filters results instantly.
* 100% Lighthouse performance score.
* LocalStorage stores theme & username reliably.
* Zero runtime errors.

---

# **11. Future Enhancements (Post-MVP)**

* Ability to add lost items through UI.
* Backend integration.
* AI-powered Find-Bot.
* User accounts.
* Notifications when an item is found.

---

# **12. Version Control & Deployment**

## **Versioning**

* Semantic Versioning (semver) starting from v0.1.0.

## **Deployment Target**

* Vercel or Netlify.
* Must support SPA routing.

---

# **13. Final Summary**

This PRD defines the complete structure, behavior, and requirements for the Findly MVP. It includes technical, design, UX, and behavioral features needed to build a polished, user-friendly Lost & Found application.

The system must be aesthetically clean, fast, and intuitive — with modern interactive elements that support the user's search journey.

---

