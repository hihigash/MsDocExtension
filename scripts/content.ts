import { mappingUrl } from "./mappingUrl";

const url = new URL(window.location.href);
console.log(url.href);
const actions = document.getElementById("article-header-page-actions");
if (actions) {
  const button = document.createElement("button");
  button.classList.add("collection", "button", "button-clear", "button-sm", "button-primary", "display-none", "display-inline-flex-tablet");
  button.title = "Open Markdown on GitHub";
  button.addEventListener("click", () => {
    OpenConvrtedUrl(url.href);
  });
  const span = document.createElement("span");
  span.classList.add("icon", "margin-none");
  button.appendChild(span);

  const icon = document.createElement("span");
  icon.classList.add("docon", "docon-brand-github");
  span.appendChild(icon);

  if (actions.firstChild) {
    actions.insertBefore(button, actions.firstChild);
  } else {
    actions.appendChild(button);
  }
}

function OpenConvrtedUrl(url: string) {
  const enUrl = url.replace(/https:\/\/learn\.microsoft\.com\/[a-z]{2}-[a-z]{2}\//g, 'https://learn.microsoft.com/en-us/');
  console.log(enUrl);
  const result = mappingUrl.find((i) => enUrl.startsWith(i.baseUrl));
  if (result) {
    console.log(result.baseUrl)
    const escapedBaseUrl = result.baseUrl.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`${escapedBaseUrl}(.*)\\?.*|${escapedBaseUrl}(.*)`, 'g');
    const newUrl = enUrl.replace(regex, `${result.repoUrl}$1$2.md`);
    console.log(newUrl);
    window.open(newUrl);
  } else {
    window.alert("No matching GitHub repository found for this document.");
  }
}
