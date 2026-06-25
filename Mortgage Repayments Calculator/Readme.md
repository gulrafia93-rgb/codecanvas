#  Mortgage Repayments Calculator

A modern, fully responsive, and high-performance **Mortgage Repayments Calculator** built with semantic HTML5, CSS3 Grid/Flexbox, and vanilla JavaScript. This tool allows users to calculate both standard **Repayment** (Principal + Interest) and **Interest-Only** mortgages with active state feedback and an intuitive, accessible UI.

---

## Features

* **Dual Calculation Modes:** Supports both amortized **Repayment** mortgages and **Interest-Only** structures.
* **Dynamic UI States:** Instantly switches between an "Empty/Idle" placeholder state and an "Active" results state upon calculation.
* **Intuitive Form Interactions:** Enhanced accessibility with focus-within highlighting on custom input prefixes (`£`) and suffixes (`years`, `%`).
* **Instant Reset functionality:** A single-click "Clear All" action resets all input criteria and seamlessly reverts the DOM to its default state.
* **Fully Responsive & Accessible Design:** Crafted using a mobile-first responsive layout (CSS Grid/Flexbox) that guarantees cross-device fluid execution.
* **Client-Side Validation:** Pre-validated fields prevent calculation bugs (`min` / `step` / basic constraints native to HTML5 inputs).

---

##  Tech Stack & Key Concepts Used

* **Structure:** Semantic `HTML5` elements (`<main>`, `<section>`, `<form>`) for structural clarity and SEO/Screen-reader optimization.
* **Styling:** Modern `CSS3` implementing Custom Properties (Variables) for strict component theming, Grid & Flexbox layouts, interactive pseudo-classes (`:focus-within`, `:has()`), and fluid media queries.
* **Logic:** Native standard `Vanilla JavaScript (ES6+)` for DOM manipulation, specialized event management, and mathematical amortization logic.
* **Localization Formatting:** Standardized currency output using the built-in native `Intl.NumberFormat` engine configured for `en-GB` (`£`).

---

##  Mathematical Amortization Formulas Applied

### 1. Repayment Mortgage (Principal + Interest)
To calculate the fixed monthly payment, the following standard compound interest distribution formula is utilized:

$$M = P \frac{r(1 + r)^n}{(1 + r)^n - 1}$$

Where:
* $M$ = Monthly payment
* $P$ = Principal loan amount (`amount`)
* $r$ = Monthly interest rate (Annual Rate / 12 / 100)
* $n$ = Total number of payments (Term in Years $\times$ 12)

### 2. Interest-Only Mortgage
$$M = P \times r$$

---

##  Project Structure

```text
├── index.html          # Main application file (HTML, Embedded CSS, and JS Logic)
└── Assets/
    └── dol1.png        # Empty-state placeholder graphic asset
