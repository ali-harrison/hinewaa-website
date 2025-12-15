# Supersolid-Style Page Transition - Complete Explanation

## Overview
This document explains how the gradient wipe page transition works, step by step.

---

## 1. The Animation Timeline

Think of this as a movie with 4 acts:

```
Act 1: Wipe Out (0s → 0.8s)
├─ Gradient line moves UP from bottom
├─ Covers the old page content
└─ Screen is now filled with gradient

Act 2: Dark Moment (0.8s → 0.95s)
├─ Gradient fades out
├─ Dark screen visible
└─ **THIS IS WHERE YOU CHANGE THE PAGE CONTENT**

Act 3: Wipe In (0.95s → 1.75s)
├─ Gradient reappears at bottom
├─ Moves UP again
└─ Reveals new page content underneath

Act 4: Cleanup (1.75s → 2.05s)
├─ Gradient fades out
├─ Overlay fades out
└─ New page fully visible
```

---

## 2. Key GSAP Concepts Used

### yPercent vs y
```javascript
// yPercent: 100 = move down by 100% of element's OWN height
gsap.to(element, { yPercent: 100 })  // If element is 150vh tall, moves 150vh down

// y: 100 = move down by 100 pixels (fixed distance)
gsap.to(element, { y: 100 })  // Always moves exactly 100px
```

**Why we use yPercent:**
- Works on any screen size
- Our gradient is 150vh tall
- yPercent: 100 moves it completely off-screen
- yPercent: 0 brings it back to original position

### Timeline Sequencing
```javascript
const tl = gsap.timeline()

// Default: animations run one after another
tl.to(element1, { x: 100 })   // Step 1
  .to(element2, { y: 100 })   // Step 2 (waits for step 1)
  .to(element3, { opacity: 0 }) // Step 3 (waits for step 2)

// With position parameter:
tl.to(element1, { x: 100 })
  .to(element2, { y: 100 }, '-=0.3')  // Starts 0.3s BEFORE element1 finishes
  .to(element3, { opacity: 0 }, '+=0.5') // Starts 0.5s AFTER element2 finishes
```

In our code:
```javascript
tl.to(wipeRef.current, { opacity: 0 }, '+=0.05')
//                                      ↑
//                       Means: "start 0.05s after previous animation ends"
```

### gsap.set() vs gsap.to()
```javascript
// .to() = animate over time
gsap.to(element, { x: 100, duration: 1 })  // Takes 1 second

// .set() = instant change (no animation)
gsap.set(element, { x: 100 })  // Happens immediately
```

We use `.set()` to instantly reset the gradient position between wipes.

---

## 3. CSS Techniques Breakdown

### The Radial Gradient
```css
background: radial-gradient(
  ellipse 100% 40% at 50% 100%,  /* Shape and position */
  rgba(138, 43, 226, 0.9) 0%,    /* Color stops */
  rgba(255, 105, 180, 0.7) 30%,
  rgba(100, 149, 237, 0.5) 60%,
  transparent 100%
);
```

**Breaking it down:**
```
ellipse 100% 40%
│       │    └─ Vertical radius: 40% of container height
│       └────── Horizontal radius: 100% of container width
└────────────── Shape (could also be 'circle')

at 50% 100%
   │   └──── Vertical position: 100% (bottom)
   └──────── Horizontal position: 50% (center)

Result: Wide, short ellipse positioned at bottom-center
```

**Why this creates a curve:**
- The ellipse is wider than it is tall (100% × 40%)
- Positioned at the bottom (100%)
- Creates a dome/arc shape
- Perfect for the "wipe" effect

### The Blur Filter
```css
filter: blur(40px);
```

**What this does:**
- Blurs the gradient by 40 pixels
- Creates the soft, glowing edge
- Makes colors blend smoothly
- Gives that "premium" feel

**Performance note:**
- Blur is GPU-accelerated (fast)
- Applied to entire element
- Works great with gradients

### Z-Index Layering
```css
.page-transition-overlay { z-index: 9999 }  /* Top container */
  .dark-screen { z-index: 1 }               /* Behind gradient */
  .gradient-wipe { z-index: 2 }             /* In front of dark screen */
```

**Why this matters:**
```
Stack (bottom to top):
┌──────────────────────┐
│ Your page content    │ z-index: default (0)
├──────────────────────┤
│ Dark screen          │ z-index: 1 (inside overlay)
├──────────────────────┤
│ Gradient wipe        │ z-index: 2 (inside overlay)
└──────────────────────┘
All inside overlay (z-index: 9999)
```

The overlay is above everything, then inside it we control which part shows on top.

---

## 4. How the Animation Actually Works

### Stage 1: Wipe Out

**Initial state (set by GSAP):**
```javascript
yPercent: 100  // Gradient is below viewport
```

```
Viewport
┌─────────────────┐
│                 │
│  Your content   │
│                 │
└─────────────────┘
        ↓         ← Gradient is down here (100% below)
    [GRADIENT]
```

**Animation:**
```javascript
gsap.to(wipeRef.current, { yPercent: 0, duration: 0.8 })
```

```
Frame 1 (0.0s):      Frame 2 (0.4s):      Frame 3 (0.8s):
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   Content   │      │ ╱GRADIENT╲  │      │ ╱GRADIENT╲  │
│             │      │   Content   │      │ ╱GRADIENT╲  │
└─────────────┘      └─────────────┘      │ ╱GRADIENT╲  │
    ↓                    ↑                 └─────────────┘
[GRADIENT]           [GRADIENT]                ↑
                                           yPercent: 0
```

The gradient "wipes up" and covers your content.

### Stage 2: Dark Moment

**What happens:**
```javascript
gsap.to(wipeRef.current, { opacity: 0, duration: 0.1 })
```

```
Before:              After:
┌─────────────┐      ┌─────────────┐
│ ╱GRADIENT╲  │      │             │
│ ╱GRADIENT╲  │  →   │   [DARK]    │  ← Dark screen shows
│ ╱GRADIENT╲  │      │             │
└─────────────┘      └─────────────┘
Gradient visible     Gradient faded (dark screen behind)
```

**This is the key moment:**
- Gradient becomes invisible (opacity: 0)
- Dark screen is revealed
- The `onComplete()` callback fires
- Your app changes the page content NOW
- User only sees dark screen during this swap

### Stage 3: Wipe In

**Reset:**
```javascript
gsap.set(wipeRef.current, { yPercent: 100, opacity: 1 })
```

Gradient instantly jumps back to bottom (no animation).

**Animate:**
```javascript
gsap.to(wipeRef.current, { yPercent: 0, duration: 0.8 })
```

```
Frame 1:             Frame 2:             Frame 3:
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   [DARK]    │      │ ╱GRADIENT╲  │      │ ╱GRADIENT╲  │
│   [DARK]    │      │  NEW PAGE   │      │ ╱GRADIENT╲  │
└─────────────┘      └─────────────┘      │ ╱GRADIENT╲  │
    ↑                    ↑                 └─────────────┘
[GRADIENT]           [GRADIENT]           NEW PAGE shows
starts here          moving up            underneath
```

The new page content is now behind the dark screen. As the gradient wipes up again, it reveals the new page.

### Stage 4: Cleanup

**Final fade:**
```javascript
gsap.to([wipeRef.current, overlayRef.current], { opacity: 0 })
```

```
Before:              After:
┌─────────────┐      ┌─────────────┐
│ ╱GRADIENT╲  │      │             │
│ ╱GRADIENT╲  │  →   │  NEW PAGE   │  ← Fully visible
│  NEW PAGE   │      │             │
└─────────────┘      └─────────────┘
```

Everything fades out, leaving just your new page.

---

## 5. How to Use It

### Basic Usage

In your navigation component:

```tsx
import { useState } from 'react'
import PageTransition from './PageTransition'

function Navigation() {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [targetSection, setTargetSection] = useState<string | null>(null)

  const scrollToSection = (sectionId: string) => {
    setTargetSection(sectionId)
    setIsTransitioning(true)  // Start transition
  }

  const handleTransitionComplete = () => {
    if (targetSection) {
      // This runs during the "dark moment"
      const element = document.getElementById(targetSection)
      element?.scrollIntoView({ behavior: 'instant' })
      setTargetSection(null)
    }
    setIsTransitioning(false)  // End transition
  }

  return (
    <>
      <PageTransition
        isTransitioning={isTransitioning}
        onComplete={handleTransitionComplete}
      />
      <nav>
        <button onClick={() => scrollToSection('home')}>Home</button>
        <button onClick={() => scrollToSection('about')}>About</button>
      </nav>
    </>
  )
}
```

### With React Router

```tsx
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import PageTransition from './PageTransition'

function App() {
  const navigate = useNavigate()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [nextRoute, setNextRoute] = useState<string | null>(null)

  const navigateWithTransition = (route: string) => {
    setNextRoute(route)
    setIsTransitioning(true)
  }

  const handleTransitionComplete = () => {
    if (nextRoute) {
      navigate(nextRoute)  // Change route during dark moment
      setNextRoute(null)
    }
    setIsTransitioning(false)
  }

  return (
    <>
      <PageTransition
        isTransitioning={isTransitioning}
        onComplete={handleTransitionComplete}
      />
      {/* Your routes and navigation */}
    </>
  )
}
```

---

## 6. Customization Guide

### Change the Speed

```javascript
// Faster (snappier)
duration: 0.5

// Slower (more dramatic)
duration: 1.2
```

### Change the Easing

```javascript
// Current (smooth both ends)
ease: 'power3.inOut'

// Smoother start
ease: 'power4.out'

// Bouncy
ease: 'back.inOut(1.7)'

// Elastic (experimental)
ease: 'elastic.out(1, 0.3)'
```

### Change the Colors

In `pageTransition.css`:

```css
/* Your brand colors */
background: radial-gradient(
  ellipse 100% 40% at 50% 100%,
  rgba(44, 95, 79, 0.9) 0%,     /* Your primary */
  rgba(200, 90, 62, 0.7) 40%,   /* Your accent */
  rgba(44, 95, 79, 0.5) 70%,    /* Blend back to primary */
  transparent 100%
);
```

### Change the Shape

```css
/* Sharper curve (taller ellipse) */
ellipse 100% 60% at 50% 100%

/* Gentler curve (shorter ellipse) */
ellipse 100% 25% at 50% 100%

/* Perfect circle (no curve) */
circle 50% at 50% 100%
```

### More/Less Blur

```css
filter: blur(20px);  /* Sharper */
filter: blur(60px);  /* Softer */
filter: blur(0);     /* No blur (sharp gradient) */
```

---

## 7. Performance Tips

### GPU Acceleration

The animation uses `transform` (via `yPercent`) which is GPU-accelerated:

✅ **Fast properties:**
- transform (translate, scale, rotate)
- opacity
- filter (blur, etc.)

❌ **Slow properties (avoid in animations):**
- top, left, right, bottom
- width, height
- margin, padding

### will-change

```css
will-change: transform;
```

This tells the browser: "Hey, I'm about to animate this property, prepare for it!"
- Browser creates a separate layer
- Animation is smoother
- Don't overuse (only on animating elements)

### Cleanup

```javascript
return () => {
  tl.kill()  // Important! Prevents memory leaks
}
```

Always kill GSAP timelines when component unmounts.

---

## 8. Troubleshooting

### "The wipe doesn't cover the full screen"

**Problem:** Viewport height calculation issue

**Fix:** Ensure the gradient height is large enough:
```css
.gradient-wipe {
  height: 150vh;  /* Increase if needed */
}
```

### "The transition feels janky"

**Problem:** Browser isn't GPU-accelerating

**Fix:** Add hardware acceleration hints:
```css
.gradient-wipe {
  transform: translateZ(0);  /* Force GPU layer */
  will-change: transform;
}
```

### "Content changes too early/late"

**Problem:** onComplete timing

**Fix:** Adjust when content changes:
```javascript
// Current: changes during dark moment (good)
.call(() => onComplete())

// Change earlier (during first wipe):
tl.fromTo(wipe, { yPercent: 100 }, { yPercent: 0 })
  .call(() => onComplete(), null, '-=0.4')  // 0.4s before wipe ends
```

---

## 9. Advanced: Adding Multiple Wipes

Want 3 colors like Supersolid? Add another wipe layer:

```tsx
<div className="page-transition-overlay" ref={overlayRef}>
  <div className="dark-screen" ref={darkScreenRef} />
  <div className="gradient-wipe gradient-wipe-1" ref={wipe1Ref} />
  <div className="gradient-wipe gradient-wipe-2" ref={wipe2Ref} />
  <div className="gradient-wipe gradient-wipe-3" ref={wipe3Ref} />
</div>
```

```css
.gradient-wipe-1 { /* Purple */ }
.gradient-wipe-2 { /* Pink */ }
.gradient-wipe-3 { /* Blue */ }
```

Animate with stagger:
```javascript
tl.to([wipe1Ref.current, wipe2Ref.current, wipe3Ref.current], {
  yPercent: 0,
  duration: 0.8,
  stagger: 0.1  // Each starts 0.1s after previous
})
```

---

## 10. Why This Approach Works

### Compared to CSS-only transitions:
✅ **More control:** GSAP timeline lets us precisely orchestrate each step
✅ **Better easing:** GSAP has smoother easing functions
✅ **Sequencing:** Easy to add/remove steps without breaking the flow
✅ **Callbacks:** Know exactly when to change content

### Compared to page-level animations:
✅ **Works anywhere:** Not tied to routing
✅ **Smooth:** No flash of unstyled content
✅ **Controlled:** You decide when transition happens

---

## Need Help?

**Common questions:**

Q: Can I use this with Next.js App Router?
A: Yes! Use it in a Client Component with the approach router events.

Q: How do I make it work on mobile?
A: It already does! The percentages and viewport units make it responsive.

Q: Can I customize the colors to match my brand?
A: Absolutely! See the "Customization Guide" section above.

---

**You now understand:**
- ✅ How GSAP timelines work
- ✅ Why yPercent is better than pixels
- ✅ How radial gradients create curves
- ✅ The z-index layering strategy
- ✅ When and how to change page content
- ✅ How to customize every aspect

Happy animating! 🎨
