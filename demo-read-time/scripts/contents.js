const article = document.querySelector('article');
console.log('Found article:', article); // Debug log

if (article) {
    const text = article.textContent;
    const wordMatchReg = /[^\s]+/g;
    const words = text.matchAll(wordMatchReg);
    const wordCounts = [...words].length;
    const readingTime = Math.round(wordCounts / 200);
    console.log({readingTime})

    const badge = document.createElement("p");
    badge.classList.add("color-secondary-text", "type--caption");
    badge.innerHTML = `⏱️ ${readingTime} min read`;

    // Try different insertion points
    const heading = article.querySelector("h1");
    const date = article.querySelector("time")?.parentNode;
    const targetElement = date ?? heading ?? article.firstChild;

    if (targetElement) {
        targetElement.insertAdjacentElement("afterend", badge);
        console.log('Badge inserted after:', targetElement);
    } else {
        console.error('No suitable insertion point found');
    }
} else {
    console.error('No article element found on the page');
}