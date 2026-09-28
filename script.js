/* =========================================
   README//STUDIO
   ========================================= */


/* -----------------------------------------
   ELEMENTS
----------------------------------------- */

const nameInput = document.getElementById("nameInput");
const taglineInput = document.getElementById("taglineInput");
const locationInput = document.getElementById("locationInput");
const currentlyInput = document.getElementById("currentlyInput");

const aboutInput = document.getElementById("aboutInput");
const goalsInput = document.getElementById("goalsInput");

const githubInput = document.getElementById("githubInput");
const websiteInput = document.getElementById("websiteInput");
const twitterInput = document.getElementById("twitterInput");

const projectName = document.getElementById("projectName");
const projectDescription = document.getElementById("projectDescription");
const projectTech = document.getElementById("projectTech");
const demoLink = document.getElementById("demoLink");
const repoLink = document.getElementById("repoLink");

const preview = document.getElementById("preview");
const rawMarkdown = document.getElementById("rawMarkdown");

const techInput = document.getElementById("techInput");
const techList = document.getElementById("techList");

const toast = document.getElementById("toast");


/* -----------------------------------------
   STATE
----------------------------------------- */

let technologies = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Figma"
];

let selectedBadges = [
  "HTML",
  "CSS",
  "JavaScript"
];

let projects = [];

let currentTheme = "soft";


/* -----------------------------------------
   INITIALIZE
----------------------------------------- */

renderTech();

document
  .querySelectorAll("input, textarea")
  .forEach(input => {
    input.addEventListener("input", updateREADME);
  });

updateREADME();


/* -----------------------------------------
   TECH STACK
----------------------------------------- */

function renderTech() {

  techList.innerHTML = "";

  technologies.forEach((tech, index) => {

    const chip = document.createElement("span");

    chip.className = "chip";

    chip.textContent = `${tech} ×`;

    chip.title = "Click to remove";

    chip.addEventListener("click", () => {

      technologies.splice(index, 1);

      renderTech();
      updateREADME();

    });

    techList.appendChild(chip);

  });

}


/* ADD TECH */

document.getElementById("addTech").addEventListener("click", () => {

  const value = techInput.value.trim();

  if (!value) return;

  if (!technologies.includes(value)) {
    technologies.push(value);
  }

  techInput.value = "";

  renderTech();
  updateREADME();

});


/* ENTER TO ADD TECH */

techInput.addEventListener("keydown", event => {

  if (event.key === "Enter") {

    event.preventDefault();

    document.getElementById("addTech").click();

  }

});


/* -----------------------------------------
   BADGES
----------------------------------------- */

document
  .querySelectorAll(".badge-option")
  .forEach(button => {

    const badge = button.dataset.badge;

    if (selectedBadges.includes(badge)) {
      button.classList.add("selected");
    }

    button.addEventListener("click", () => {

      button.classList.toggle("selected");

      if (selectedBadges.includes(badge)) {

        selectedBadges =
          selectedBadges.filter(item => item !== badge);

      } else {

        selectedBadges.push(badge);

      }

      updateREADME();

    });

  });


/* -----------------------------------------
   PROJECT
----------------------------------------- */

document
  .getElementById("addProject")
  .addEventListener("click", () => {

    const name = projectName.value.trim();

    if (!name) {

      showToast("ADD A PROJECT NAME ♡");

      return;
    }

    projects.push({
      name: name,
      description: projectDescription.value.trim(),
      tech: projectTech.value.trim(),
      demo: demoLink.value.trim(),
      repo: repoLink.value.trim()
    });

    projectName.value = "";
    projectDescription.value = "";
    projectTech.value = "";
    demoLink.value = "";
    repoLink.value = "";

    showToast("PROJECT ADDED ✦");

    updateREADME();

  });


/* -----------------------------------------
   GENERATE MARKDOWN
----------------------------------------- */

function generateMarkdown() {

  const name =
    nameInput.value.trim() || "Your Name";

  const tagline =
    taglineInput.value.trim() ||
    "web developer · designer · creative";

  const location =
    locationInput.value.trim();

  const currently =
    currentlyInput.value.trim();

  const about =
    aboutInput.value.trim();

  const goals =
    goalsInput.value.trim();

  const github =
    githubInput.value.trim();

  const website =
    websiteInput.value.trim();

  const twitter =
    twitterInput.value.trim();


  let markdown = "";


  /* HEADER */

  markdown += `# hi, i'm ${name} ♡\n\n`;

  markdown += `${tagline}\n\n`;

  if (location) {
    markdown += `📍 ${location}\n\n`;
  }


  /* CURRENTLY */

  if (currently) {

    markdown += `### currently\n\n`;

    markdown += `${currently}\n\n`;

  }


  /* ABOUT */

  if (about) {

    markdown += `## about me\n\n`;

    markdown += `${about}\n\n`;

  }


  /* STACK */

  if (technologies.length > 0) {

    markdown += `## tech stack\n\n`;

    technologies.forEach(tech => {

      markdown += `\`${tech}\` `;

    });

    markdown += `\n\n`;

  }


  /* BADGES */

  if (selectedBadges.length > 0) {

    markdown += `## tools & technologies\n\n`;

    selectedBadges.forEach(badge => {

      markdown += `![${badge}](https://img.shields.io/badge/${encodeURIComponent(
        badge
      )}-ff3f9f?style=for-the-badge&logoColor=black) `;

    });

    markdown += `\n\n`;

  }


  /* GOALS */

  if (goals) {

    markdown += `## goals\n\n`;

    markdown += `${goals}\n\n`;

  }


  /* PROJECTS */

  if (projects.length > 0) {

    markdown += `## projects\n\n`;

    projects.forEach(project => {

      markdown += `### ${project.name}\n\n`;

      if (project.description) {
        markdown += `${project.description}\n\n`;
      }

      if (project.tech) {
        markdown += `**Stack:** ${project.tech}\n\n`;
      }

      if (project.demo) {
        markdown += `[Live Demo](${project.demo})`;
      }

      if (project.demo && project.repo) {
        markdown += ` · `;
      }

      if (project.repo) {
        markdown += `[Repository](${project.repo})`;
      }

      markdown += `\n\n`;

    });

  }


  /* SOCIALS */

  if (github || website || twitter) {

    markdown += `## find me online\n\n`;

    if (github) {
      markdown += `- [GitHub](${github})\n`;
    }

    if (website) {
      markdown += `- [Website](${website})\n`;
    }

    if (twitter) {
      markdown += `- [X / Twitter](${twitter})\n`;
    }

    markdown += `\n`;

  }


  /* FOOTER */

  markdown += `---\n\n`;

  markdown += `made with ♡ and a little bit of code.\n`;

  return markdown;
}


/* -----------------------------------------
   PREVIEW RENDERER
----------------------------------------- */

function updateREADME() {

  const markdown = generateMarkdown();

  rawMarkdown.textContent = markdown;

  preview.innerHTML =
    markdownToHTML(markdown);

}


/* -----------------------------------------
   SIMPLE MARKDOWN RENDERER
----------------------------------------- */

function markdownToHTML(markdown) {

  let html = escapeHTML(markdown);


  /* Images / badges */

  html = html.replace(
    /!\[([^\]]+)\]\(([^)]+)\)/g,
    '<span class="fake-badge">$1</span>'
  );


  /* Links */

  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank">$1</a>'
  );


  /* Headings */

  html = html.replace(
    /^### (.*)$/gm,
    "<h3>$1</h3>"
  );

  html = html.replace(
    /^## (.*)$/gm,
    "<h2>$1</h2>"
  );

  html = html.replace(
    /^# (.*)$/gm,
    "<h1>$1</h1>"
  );


  /* Inline code */

  html = html.replace(
    /`([^`]+)`/g,
    "<code>$1</code>"
  );


  /* Bold */

  html = html.replace(
    /\*\*(.*?)\*\*/g,
    "<strong>$1</strong>"
  );


  /* Horizontal rule */

  html = html.replace(
    /^---$/gm,
    "<hr>"
  );


  /* Lists */

  html = html.replace(
    /^- (.*)$/gm,
    "<li>$1</li>"
  );

  html = html.replace(
    /(<li>.*<\/li>)/gs,
    "<ul>$1</ul>"
  );


  /* Paragraphs */

  html = html
    .split(/\n{2,}/)
    .map(block => {

      if (
        block.startsWith("<h1>") ||
        block.startsWith("<h2>") ||
        block.startsWith("<h3>") ||
        block.startsWith("<ul>") ||
        block.startsWith("<hr>")
      ) {
        return block;
      }

      return `<p>${block.replace(/\n/g, "<br>")}</p>`;

    })
    .join("");


  return html;
}


/* -----------------------------------------
   ESCAPE HTML
----------------------------------------- */

function escapeHTML(text) {

  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

}


/* -----------------------------------------
   COPY MARKDOWN
----------------------------------------- */

async function copyMarkdown() {

  const markdown = generateMarkdown();

  await navigator.clipboard.writeText(markdown);

  showToast("MARKDOWN COPIED ♡");

}

document
  .getElementById("copyBtn")
  .addEventListener("click", copyMarkdown);

document
  .getElementById("copyRaw")
  .addEventListener("click", copyMarkdown);


/* -----------------------------------------
   TOAST
----------------------------------------- */

function showToast(message) {

  toast.textContent = message;

  toast.classList.add("show");

  setTimeout(() => {

    toast.classList.remove("show");

  }, 1800);

}


/* -----------------------------------------
   TEMPLATE SWITCHER
----------------------------------------- */

document
  .querySelectorAll(".template")
  .forEach(button => {

    button.addEventListener("click", () => {

      document
        .querySelectorAll(".template")
        .forEach(item => {
          item.classList.remove("active");
        });

      button.classList.add("active");

      const template =
        button.dataset.template;

      currentTheme = template;

      document.body.className = "";

      if (template !== "soft") {
        document.body.classList.add(
          `theme-${template}`
        );
      }

      showToast(
        `${template.toUpperCase()} TEMPLATE ✦`
      );

    });

  });


/* -----------------------------------------
   QUICK SECTIONS
----------------------------------------- */

document
  .querySelectorAll(".quick-card")
  .forEach(card => {

    card.addEventListener("click", () => {

      const section =
        card.dataset.section;

      if (section === "currently") {

        currentlyInput.focus();

        currentlyInput.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });

      }


      if (section === "funfacts") {

        aboutInput.value +=
          "\n\n### fun facts\n\n- I love building things\n- I collect cute ideas\n- I am always learning something new";

        updateREADME();

        aboutInput.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });

      }


      if (section === "music") {

        aboutInput.value +=
          "\n\n### now playing\n\n♫ currently listening to something good";

        updateREADME();

        aboutInput.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });

      }


      if (section === "quote") {

        aboutInput.value +=
          '\n\n> "Make something you would want to visit."';

        updateREADME();

        aboutInput.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });

      }

    });

  });


/* -----------------------------------------
   DOWNLOAD README.MD
----------------------------------------- */

document
  .getElementById("downloadBtn")
  .addEventListener("click", () => {

    const markdown =
      generateMarkdown();

    const blob = new Blob(
      [markdown],
      { type: "text/markdown" }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download = "README.md";

    document.body.appendChild(link);

    link.click();

    link.remove();

    URL.revokeObjectURL(url);

    showToast("README.MD EXPORTED ✦");

  });


/* -----------------------------------------
   KEYBOARD SHORTCUT
----------------------------------------- */

document.addEventListener("keydown", event => {

  if (
    event.ctrlKey &&
    event.key.toLowerCase() === "s"
  ) {

    event.preventDefault();

    document
      .getElementById("downloadBtn")
      .click();

  }

});