# Python Functions Reference Guide

A simple web-based reference for Python's built-in functions and math module. I built this because I was tired of constantly googling basic Python functions while coding.

## What's Inside

This guide covers over 60 Python functions including:
- All the essential built-ins like `len()`, `range()`, `print()`, etc.
- Math module functions for calculations and trigonometry
- Practical examples you can actually use
- A search feature to find what you need quickly

## How to Use

Just open the site and start browsing. Use the search box if you're looking for something specific. Click any code example to copy it to your clipboard.

Want a PDF version? Hit the download button and you'll get a nicely formatted reference guide you can save offline.

## Running This Locally

Pretty straightforward:

```bash
git clone https://github.com/YOUR_USERNAME/python-functions-reference.git
cd python-functions-reference
```

Then just open `index.html` in your browser. That's it.

If you use VS Code, grab the Live Server extension and right-click the HTML file to open it with live reload.

## Putting It Online

The easiest way is GitHub Pages:

1. Push your code to GitHub
2. Go to Settings > Pages in your repo
3. Set it to deploy from the main branch
4. Wait a few minutes and your site will be live

You can also use Netlify, Vercel, or any static hosting service.

## Want to Add Something?

Found a function that's missing? Want to improve an example? Just fork the repo and send a pull request.

To add a new function, find the right section in `index.html` and add a new card:

```html
<div class="function-card">
    <div class="function-name">your_function()</div>
    <div class="function-description">What it does</div>
    <div class="function-syntax">your_function(params)</div>
    <div class="function-example">your_function(1, 2) → 3</div>
</div>
```

## Technical Details

Built with vanilla HTML, CSS, and JavaScript. No frameworks, no build process, no complications.

Uses jsPDF for the download feature and includes a basic search that filters functions as you type.

## Browser Support

Works in any modern browser. Tested on Chrome, Firefox, Safari, and Edge.

## Why I Made This

I kept finding myself looking up the same Python functions over and over. Sure, the official docs are comprehensive, but sometimes you just want a quick reference with examples.

This started as a simple HTML page for my own use and grew into something I thought others might find useful too.

## License

MIT License - use it however you want.

---

If this saves you some time, consider starring the repo. If you find bugs or have suggestions, open an issue.