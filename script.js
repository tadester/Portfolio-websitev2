const snippets = {
  api: `type DailyRouteResult = {
  ordered_jobs: OrderedRouteJob[];
  legs: RouteLeg[];
  total_distance: number;
  total_time: number;
};`,
  ui: `function ProjectCard({ title, stack, summary }) {
  return (
    <article className="card">
      <h3>{title}</h3>
      <p>{summary}</p>
      <footer>{stack.join(" • ")}</footer>
    </article>
  );
}`,
  data: `if (matches!(current_stage, ShotStage::Load)
  && wrist_velocity <= thresholds.set_point_velocity_threshold) {
  current_stage = ShotStage::SetPoint;
}`,
};

const terminalMessages = [
  "loading jumpshot trainer case study",
  "mounting tadester ops systems snapshot",
  "warming up portfolio interaction layer",
  "syncing product polish with engineering depth",
  "ready for recruiters, founders, and engineers",
];

const snippetContent = document.querySelector("#snippet-content");
const snippetTabs = document.querySelectorAll(".snippet-tab");
const projectToggles = document.querySelectorAll(".project-toggle");
const terminalLog = document.querySelector("#terminal-log");
const glowRange = document.querySelector("#glow-range");
const gridRange = document.querySelector("#grid-range");
const revealTargets = document.querySelectorAll(".project-card, .resume-card, .lab-card, .contact-card");
const resumeLinks = document.querySelectorAll(".resume-link");

function setSnippet(key) {
  if (!snippetContent) return;
  snippetContent.textContent = snippets[key];

  snippetTabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.snippet === key);
  });
}

snippetTabs.forEach((tab) => {
  tab.addEventListener("click", () => setSnippet(tab.dataset.snippet));
});

projectToggles.forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.querySelector(`#${button.dataset.target}`);
    if (!target) return;

    target.hidden = !target.hidden;
  });
});

function appendTerminalLine(message, delay) {
  window.setTimeout(() => {
    if (!terminalLog) return;

    const line = document.createElement("p");
    line.className = "terminal-line";
    line.innerHTML = `<span>ktr@portfolio</span>:~$ ${message}`;
    terminalLog.appendChild(line);
  }, delay);
}

function bindRangeControl(input, variable, divisor = 100) {
  if (!input) return;

  const applyValue = () => {
    document.documentElement.style.setProperty(variable, Number(input.value) / divisor);
  };

  input.addEventListener("input", applyValue);
  applyValue();
}

function setupReveals() {
  if (!("IntersectionObserver" in window)) return;

  revealTargets.forEach((element) => {
    element.setAttribute("data-reveal", "");
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.16 }
  );

  revealTargets.forEach((element) => observer.observe(element));
}

async function validateResumeLinks() {
  const isHttp = window.location.protocol.startsWith("http");

  if (!isHttp) {
    resumeLinks.forEach((link) => link.classList.add("is-disabled"));
    return;
  }

  await Promise.all(
    Array.from(resumeLinks).map(async (link) => {
      try {
        const response = await fetch(link.dataset.fileLink, { method: "HEAD" });
        if (!response.ok) {
          link.classList.add("is-disabled");
        }
      } catch (error) {
        link.classList.add("is-disabled");
      }
    })
  );
}

setSnippet("api");
setupReveals();
validateResumeLinks();

terminalMessages.forEach((message, index) => {
  appendTerminalLine(message, 350 * index);
});

bindRangeControl(glowRange, "--glow-strength");
bindRangeControl(gridRange, "--grid-strength");
