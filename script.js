/* sidebar */
const sidebar_data = [
  {
    name: "Home",
    page: "home"
  },
  {
    name: "User",
    page: "user"
  },
  {
    name: "Settings",
    page: "settings"
  },
  {
    name: "DB-manager",
    page: "DB-manager"
  },
  {
    name: "enroll",
    page: "enroll"
  }
];

const sidebar = document.getElementById("sidebar");
const sidebar_list = document.getElementById("sidebar_list");

sidebar_data.forEach(item => {

  const li = document.createElement("li");

  li.textContent = item.name;

  li.addEventListener("click", () => {
    loadPage(item.page);
  });

  sidebar_list.appendChild(li);

});

async function loadPage(pageName) {

    loadCss(pageName);

    const response =
        await fetch(
            `pages/${pageName}/${pageName}.html`
        );

    const html =
        await response.text();

    document.getElementById(
        "main-content"
    ).innerHTML = html;

    loadScript(pageName);
}

function loadCss(pageName) {

    const oldCss =
        document.getElementById("page-style");

    if (oldCss) {
        oldCss.remove();
    }

    const link =
        document.createElement("link");

    link.id = "page-style";

    link.rel = "stylesheet";

    link.href =
        `pages/${pageName}/${pageName}.css`;

    document.head.appendChild(link);
}

function loadScript(pageName) {

    const oldScript =
        document.getElementById("page-script");

    if (oldScript) {
        oldScript.remove();
    }

    const script =
        document.createElement("script");

    script.id = "page-script";

    script.src =
        `pages/${pageName}/${pageName}.js`;

    document.body.appendChild(script);
}

loadPage("home");