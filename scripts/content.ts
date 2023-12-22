const url = new URL(window.location.href);
const actions = document.getElementById("article-header-page-actions");
if (actions) {
  const button = createButton();
  if (actions.firstChild) {
    actions.insertBefore(button, actions.firstChild);
  } else {
    actions.appendChild(button);
  }
}

function createButton(): HTMLButtonElement {
  const button = document.createElement("button");
  button.classList.add(
    "collection",
    "button",
    "button-clear",
    "button-sm",
    "button-primary",
    "display-none",
    "display-inline-flex-tablet"
  );
  button.title = "Open Markdown on GitHub";
  button.addEventListener("click", () => {
    openConvertedUrl(url.href).catch(console.error);
  });
  const span = document.createElement("span");
  span.classList.add("icon", "margin-none");
  button.appendChild(span);

  const icon = document.createElement("span");
  icon.classList.add("docon", "docon-brand-github");
  span.appendChild(icon);

  return button;
}

async function openConvertedUrl(url: string) {
  const enUrl = convertUrl(url);
  const ghUrl = await fetchGithubUrl(enUrl);
  if (ghUrl) {
    open(ghUrl);
  }
}

function convertUrl(url: string): string {
  return url.replace(
    /https:\/\/learn\.microsoft\.com\/[a-z]{2}-[a-z]{2}\//g,
    "https://learn.microsoft.com/en-us/"
  );
}

async function fetchGithubUrl(url: string): Promise<string | null> {
  const response = await fetch(url);
  if (!response.ok) return null;
  const text = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(text || "", "text/html");
  const edit = doc.querySelector("a[aria-label='Edit']");
  const hrefAttr = edit?.attributes.getNamedItem("href");
  return hrefAttr ? hrefAttr.value : null;
}
