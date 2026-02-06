# 💌 Love Letter - A Romantic Next.js Experience

A beautifully crafted digital love letter with elegant animations and vintage aesthetics.

## ✨ Features

- **Wax Seal Animation** - Click the romantic wax seal to reveal your letter
- **Vintage Paper Design** - Authentic aged paper texture with subtle lined details
- **Elegant Typography** - Classic serif fonts with handwritten script accents
- **Floating Hearts** - Animated hearts gently float across the background
- **Staggered Reveal** - Content gracefully appears with carefully timed animations
- **Responsive Design** - Looks beautiful on all screen sizes

## 🎨 Design Philosophy

This design embraces a timeless, romantic aesthetic inspired by classic handwritten love letters:

- **Color Palette**: Warm amber, rose, and cream tones evoke aged paper and romance
- **Typography**: Georgia serif for readability paired with Brush Script for intimate moments
- **Motion**: Gentle, meaningful animations that enhance the emotional experience
- **Details**: Paper texture, subtle borders, wax seal, and floating hearts create atmosphere

## 🚀 Getting Started

### Prerequisites

- Node.js 16.8 or later
- npm or yarn

### Installation

1. **Install dependencies:**

```bash
npm install
```

2. **Run the development server:**

```bash
npm run dev
```

3. **Open your browser:**

Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
love-letter-app/
├── app/
│   ├── layout.jsx          # Root layout with metadata
│   ├── page.jsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   └── LoveLetter.jsx      # Main love letter component
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

## 🎯 Customization

### Changing the Letter Content

Edit the letter body in `components/LoveLetter.jsx`:

```jsx
<p>
  Your custom love letter text here...
</p>
```

### Adjusting Colors

Modify the Tailwind color classes or add custom colors in `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      'custom-rose': '#...',
    }
  }
}
```

### Animation Timing

Adjust the delay values in the component to change reveal timing:

```jsx
className="... delay-500"  // Change to delay-300, delay-700, etc.
```

## 🌟 Interactive Elements

- **Wax Seal**: Click to reveal the letter content
- **Floating Hearts**: Continuously animated background elements
- **Pulsing Accents**: Heart decorations with staggered pulse animations
- **Hover Effects**: Subtle interactions on the wax seal

## 📱 Responsive Behavior

- Adapts to mobile, tablet, and desktop screens
- Font sizes scale appropriately
- Padding adjusts for smaller screens
- Maintains visual hierarchy across breakpoints

## 🛠️ Built With

- **Next.js 14** - React framework for production
- **React 18** - UI component library
- **Tailwind CSS** - Utility-first CSS framework
- **CSS Animations** - Native web animations for performance

## 💡 Use Cases

- Valentine's Day messages
- Anniversary celebrations
- Wedding invitations or thank you notes
- Romantic proposals
- Birthday love letters
- Just because moments

## 🎭 Aesthetic Notes

The design intentionally avoids generic modern web aesthetics in favor of:
- Warm, organic color palettes
- Classical typography choices
- Meaningful, purposeful animations
- Textural depth and layered details
- Emotional resonance through design

## 📄 License

This project is open source and available for personal and commercial use.

## 💝 Made with Love

Created to help you express your deepest feelings in the most beautiful way possible.

---

**Remember**: The most important part isn't the code—it's the words you write and the love you share. ❤️
