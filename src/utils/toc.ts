export const createToc = (content: HTMLDivElement, toc: HTMLUListElement) => {
  const headings = content.querySelectorAll("h1, h2, h3");
  console.log("heading finding");
  for (let i = 0; i < headings.length; i++) {
    const li = document.createElement("li");
    const id = headings[i].id || "toc-" + i;
    headings[i].id = id;
    li.innerHTML = '';
    li.innerHTML = `
      <a href="#${id}" >${headings[i].textContent}</a>
    `;
    li.className = ''
    li.style.setProperty(
      "margin-left",
      (Number.parseInt(headings.item(i).tagName.at(1) as string) - 1) * 30 +
        "px"
    );
    toc.appendChild(li);
  }
};
