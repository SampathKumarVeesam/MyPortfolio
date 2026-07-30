// ===================================================================
// components.ts — Typed component functions that build the DOM
// ===================================================================

import type { PortfolioData } from "./types";
import { el } from "./dom";

// ─── FLOATING ORBS ───────────────────────────────────────────────────
export function buildOrbs(): DocumentFragment {
  const frag = document.createDocumentFragment();
  for (let i = 1; i <= 3; i++) {
    frag.appendChild(el("div", { className: `orb orb-${i}` }));
  }
  return frag;
}

// ─── NAVBAR ──────────────────────────────────────────────────────────
export function buildNavbar(data: PortfolioData): HTMLElement {
  const nav = el("nav", { className: "navbar", id: "navbar" });
  const logo = el("a", {
    className: "nav-logo",
    text: data.personal.initials,
    attrs: { href: "#" },
  });

  const ul = el("ul", { className: "nav-links", id: "nav-links" });
  data.navLinks.forEach((link) => {
    const li = el("li");
    li.appendChild(
      el("a", { text: link.label, attrs: { href: link.href } })
    );
    ul.appendChild(li);
  });

  const cta = el("a", {
    className: "nav-cta",
    text: "Hire Me",
    attrs: { href: "#contact" },
  });

  const toggle = el("button", {
    className: "menu-toggle",
    id: "menu-toggle",
    attrs: { "aria-label": "Toggle menu" },
  });
  for (let i = 0; i < 3; i++) toggle.appendChild(el("span"));

  nav.append(logo, ul, cta, toggle);
  return nav;
}

// ─── HERO ────────────────────────────────────────────────────────────
export function buildHero(data: PortfolioData): HTMLElement {
  const section = el("section", { className: "hero", id: "hero" });
  const content = el("div", { className: "hero-content" });

  // Left: text content
  const heroText = el("div", { className: "hero-text" });

  const badge = el("div", { className: "hero-badge" });
  badge.appendChild(el("span", { className: "dot" }));
  badge.appendChild(document.createTextNode(" Available for Opportunities"));

  const title = el("h1", {
    className: "hero-title",
    html: `Hi, I'm <span class="gradient-text">${data.personal.name}</span><br/>${data.personal.lastName}`,
  });

  const typingLine = el("p", { className: "hero-subtitle" });
  typingLine.appendChild(
    el("span", { className: "typing-text", text: data.roles[0] })
  );
  typingLine.appendChild(
    el("span", {
      text: "|",
      style: { color: "var(--accent)", animation: "pulse 1s infinite" },
    })
  );

  const desc = el("p", {
    className: "hero-subtitle",
    text: data.personal.summary,
  });
  desc.style.marginTop = "-20px";

  const buttons = el("div", { className: "hero-buttons" });
  buttons.appendChild(
    el("a", {
      className: "btn-primary",
      attrs: { href: "#projects" },
      html: `View My Work <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`,
    })
  );
  buttons.appendChild(
    el("a", {
      className: "btn-outline",
      text: "Get In Touch",
      attrs: { href: "#contact" },
    })
  );

  const statsRow = el("div", { className: "hero-stats" });
  data.stats.forEach((s) => {
    const item = el("div", { className: "stat-item" });
    item.appendChild(
      el("h3", {
        text: "0",
        attrs: {
          "data-count": String(s.value),
          "data-suffix": s.suffix,
        },
      })
    );
    item.appendChild(el("p", { text: s.label }));
    statsRow.appendChild(item);
  });

  heroText.append(badge, title, typingLine, desc, buttons, statsRow);

  // Right: visual
  const visual = el("div", { className: "hero-visual" });
  const container = el("div", { className: "profile-container" });
  container.appendChild(el("div", { className: "profile-ring" }));
  container.appendChild(el("div", { className: "profile-ring" }));

  const imgWrapper = el("div", { className: "profile-img-wrapper" });
  imgWrapper.appendChild(
    el("img", {
      attrs: { src: data.personal.profileImage, alt: data.personal.name },
    })
  );
  container.appendChild(imgWrapper);

  data.floatingBadges.forEach((b) => {
    container.appendChild(
      el("div", {
        className: `floating-badge ${b.position}`,
        html: `<span class="icon">${b.icon}</span> ${b.text}`,
      })
    );
  });

  visual.appendChild(container);
  content.append(heroText, visual);
  section.appendChild(content);
  return section;
}

// ─── SECTION HEADER ──────────────────────────────────────────────────
function buildSectionHeader(
  label: string,
  title: string,
  desc?: string
): HTMLElement {
  const header = el("div", { className: "section-header reveal" });
  header.appendChild(el("div", { className: "section-label", text: label }));
  header.appendChild(el("h2", { className: "section-title", text: title }));
  if (desc) {
    header.appendChild(el("p", { className: "section-desc", text: desc }));
  }
  return header;
}

// ─── ABOUT ───────────────────────────────────────────────────────────
export function buildAbout(data: PortfolioData): HTMLElement {
  const section = el("section", { className: "section", id: "about" });
  section.appendChild(
    buildSectionHeader(
      "About Me",
      "Building Quality Software",
      "Combining development expertise with testing precision to deliver reliable, scalable solutions."
    )
  );

  const grid = el("div", { className: "about-grid" });

  const imgWrap = el("div", { className: "about-image-wrapper reveal" });
  imgWrap.appendChild(
    el("img", {
      attrs: { src: data.personal.heroBackground, alt: "Tech background" },
    })
  );

  const textWrap = el("div", { className: "about-text reveal" });
  textWrap.appendChild(
    el("h3", {
      html: `Passionate about <span class="gradient-text" style="background:var(--gradient-1);-webkit-background-clip:text;-webkit-text-fill-color:transparent">Quality & Innovation</span>`,
    })
  );

  data.personal.aboutParagraphs.forEach((p) => {
    textWrap.appendChild(el("p", { text: p }));
  });

  const tags = el("div", { className: "about-tags" });
  data.personal.aboutTags.forEach((t) => {
    tags.appendChild(el("span", { className: "about-tag", text: t }));
  });
  textWrap.appendChild(tags);

  grid.append(imgWrap, textWrap);
  section.appendChild(grid);
  return section;
}

// ─── SKILLS ──────────────────────────────────────────────────────────
export function buildSkills(data: PortfolioData): HTMLElement {
  const section = el("section", { className: "section", id: "skills" });
  section.appendChild(
    buildSectionHeader(
      "Tech Stack",
      "Core Competencies",
      "Technologies and methodologies I use to build and test high-quality software."
    )
  );

  const grid = el("div", { className: "skills-grid" });
  data.skills.forEach((cat) => {
    const card = el("div", { className: "glass-card skill-category reveal" });
    card.appendChild(
      el("h3", {
        html: `<span class="cat-icon">${cat.icon}</span> ${cat.title}`,
      })
    );

    const list = el("div", { className: "skill-list" });
    cat.items.forEach((skill) => {
      const item = el("div", { className: "skill-item" });
      item.appendChild(
        el("span", { className: "skill-name", text: skill.name })
      );

      const bar = el("div", { className: "skill-bar" });
      bar.appendChild(
        el("div", {
          className: "bar-fill",
          attrs: { "data-width": `${skill.level}%` },
        })
      );
      item.appendChild(bar);
      list.appendChild(item);
    });

    card.appendChild(list);
    grid.appendChild(card);
  });

  section.appendChild(grid);
  return section;
}

// ─── EXPERIENCE ──────────────────────────────────────────────────────
export function buildExperience(data: PortfolioData): HTMLElement {
  const section = el("section", { className: "section", id: "experience" });
  section.appendChild(
    buildSectionHeader(
      "Career Path",
      "Professional Experience",
      "My journey through software testing, automation, and full-stack development."
    )
  );

  const timeline = el("div", { className: "timeline" });
  data.experience.forEach((exp) => {
    const item = el("div", { className: "timeline-item reveal" });
    item.appendChild(el("div", { className: "timeline-dot" }));

    const card = el("div", { className: "glass-card timeline-card" });
    card.appendChild(el("div", { className: "date", text: exp.date }));
    card.appendChild(el("h3", { text: exp.role }));
    card.appendChild(
      el("div", {
        className: "company",
        text: `${exp.company} · ${exp.location}`,
      })
    );

    const ul = el("ul");
    exp.bullets.forEach((b) => ul.appendChild(el("li", { text: b })));
    card.appendChild(ul);

    item.appendChild(card);
    timeline.appendChild(item);
  });

  section.appendChild(timeline);
  return section;
}

// ─── PROJECTS ────────────────────────────────────────────────────────
export function buildProjects(data: PortfolioData): HTMLElement {
  const section = el("section", { className: "section", id: "projects" });
  section.appendChild(
    buildSectionHeader(
      "Portfolio",
      "Key Projects",
      "Real-world projects showcasing automation, full-stack development, and AI-driven solutions."
    )
  );

  const grid = el("div", { className: "projects-grid" });
  data.projects.forEach((proj) => {
    const card = el("div", { className: "glass-card project-card reveal" });

    const imgDiv = el("div", { className: "project-img" });
    imgDiv.appendChild(
      el("img", { attrs: { src: proj.image, alt: proj.title } })
    );
    imgDiv.appendChild(el("div", { className: "overlay" }));
    card.appendChild(imgDiv);

    const info = el("div", { className: "project-info" });
    info.appendChild(el("h3", { text: proj.title }));
    info.appendChild(el("p", { text: proj.description }));

    const tags = el("div", { className: "project-tags" });
    proj.tags.forEach((t) =>
      tags.appendChild(el("span", { className: "project-tag", text: t }))
    );
    info.appendChild(tags);

    const links = el("div", { className: "project-links" });
    links.appendChild(
      el("a", {
        className: "project-link primary",
        text: "View on GitHub",
        attrs: { href: proj.link, target: "_blank" },
      })
    );
    info.appendChild(links);

    card.appendChild(info);
    grid.appendChild(card);
  });

  section.appendChild(grid);
  return section;
}

// ─── EDUCATION ───────────────────────────────────────────────────────
export function buildEducation(data: PortfolioData): HTMLElement {
  const section = el("section", { className: "section", id: "education" });
  section.appendChild(buildSectionHeader("Education", "Academic Background"));

  const grid = el("div", { className: "edu-grid" });
  data.education.forEach((edu) => {
    const card = el("div", { className: "glass-card edu-card reveal" });
    card.appendChild(el("div", { className: "edu-icon", text: edu.icon }));
    card.appendChild(el("h3", { text: edu.degree }));
    card.appendChild(el("div", { className: "school", text: edu.school }));
    card.appendChild(el("div", { className: "details", text: edu.details }));
    grid.appendChild(card);
  });

  section.appendChild(grid);
  return section;
}

// ─── CERTIFICATIONS ──────────────────────────────────────────────────
export function buildCertifications(data: PortfolioData): HTMLElement {
  const section = el("section", {
    className: "section",
    id: "certifications",
  });
  section.appendChild(
    buildSectionHeader("Certifications", "Professional Certifications")
  );

  const grid = el("div", { className: "cert-grid" });
  data.certifications.forEach((cert) => {
    const card = el("div", { className: "glass-card cert-card reveal" });
    card.appendChild(el("div", { className: "cert-icon", text: "🏆" }));
    const textDiv = el("div");
    textDiv.appendChild(el("h4", { text: cert.title }));
    textDiv.appendChild(el("p", { text: cert.org }));
    card.append(textDiv);
    grid.appendChild(card);
  });

  section.appendChild(grid);
  return section;
}

// ─── CONTACT ─────────────────────────────────────────────────────────
export function buildContact(data: PortfolioData): HTMLElement {
  const section = el("section", { className: "section", id: "contact" });
  section.appendChild(
    buildSectionHeader(
      "Get In Touch",
      "Let's Work Together",
      "Have a project in mind or want to discuss an opportunity? I'd love to hear from you."
    )
  );

  const wrapper = el("div", { className: "contact-wrapper" });

  // Left info
  const info = el("div", { className: "contact-info reveal" });
  info.appendChild(el("h3", { text: "Contact Information" }));
  info.appendChild(
    el("p", {
      text: "Feel free to reach out through any of the channels below. I'm always open to discussing new projects, opportunities, or partnerships.",
    })
  );

  const contacts: Array<{
    icon: string;
    label: string;
    value: string;
    href: string | null;
  }> = [
    {
      icon: "📧",
      label: "Email",
      value: data.personal.email,
      href: `mailto:${data.personal.email}`,
    },
    {
      icon: "📱",
      label: "Phone",
      value: data.personal.phone,
      href: `tel:${data.personal.phone.replace(/\s/g, "")}`,
    },
    {
      icon: "📍",
      label: "Location",
      value: data.personal.location,
      href: null,
    },
  ];

  contacts.forEach((c) => {
    const item = el("div", { className: "contact-item" });
    item.appendChild(el("div", { className: "c-icon", text: c.icon }));
    const textDiv = el("div", { className: "c-text" });
    textDiv.appendChild(el("div", { className: "c-label", text: c.label }));
    if (c.href) {
      textDiv.appendChild(el("a", { text: c.value, attrs: { href: c.href } }));
    } else {
      textDiv.appendChild(el("span", { text: c.value }));
    }
    item.appendChild(textDiv);
    info.appendChild(item);
  });

  // Social links
  const socials = el("div", { className: "social-links" });
  socials.appendChild(
    el("a", {
      className: "social-link",
      text: "in",
      attrs: {
        href: data.personal.linkedin,
        target: "_blank",
        title: "LinkedIn",
      },
    })
  );
  socials.appendChild(
    el("a", {
      className: "social-link",
      text: "GH",
      attrs: {
        href: data.personal.github,
        target: "_blank",
        title: "GitHub",
      },
    })
  );
  socials.appendChild(
    el("a", {
      className: "social-link",
      text: "@",
      attrs: {
        href: `mailto:${data.personal.email}`,
        title: "Email",
      },
    })
  );
  info.appendChild(socials);

  // Right form
  const formWrap = el("div", { className: "contact-form reveal" });
  const formCard = el("div", { className: "glass-card" });
  const form = el("form", { id: "contact-form" });

  const fields: Array<{
    id: string;
    label: string;
    type: string;
    placeholder: string;
    required: boolean;
  }> = [
    {
      id: "name",
      label: "Your Name",
      type: "text",
      placeholder: "John Doe",
      required: true,
    },
    {
      id: "email",
      label: "Your Email",
      type: "email",
      placeholder: "john@example.com",
      required: true,
    },
    {
      id: "phone",
      label: "Contact Number",
      type: "tel",
      placeholder: "+91 93906 94772",
      required: false,
    },
    {
      id: "subject",
      label: "Subject",
      type: "text",
      placeholder: "Project Discussion",
      required: false,
    },
  ];

  fields.forEach((f) => {
    const group = el("div", { className: "form-group" });
    group.appendChild(el("label", { text: f.label, attrs: { for: f.id } }));
    const input = el("input", {
      attrs: { type: f.type, id: f.id, placeholder: f.placeholder },
    });
    if (f.required) input.setAttribute("required", "");
    group.appendChild(input);
    form.appendChild(group);
  });

  // Textarea
  const msgGroup = el("div", { className: "form-group" });
  msgGroup.appendChild(
    el("label", { text: "Message", attrs: { for: "message" } })
  );
  msgGroup.appendChild(
    el("textarea", {
      attrs: {
        id: "message",
        placeholder: "Tell me about your project...",
        required: "",
      },
    })
  );
  form.appendChild(msgGroup);

  form.appendChild(
    el("button", {
      className: "form-submit",
      text: "Send Message",
      attrs: { type: "submit" },
    })
  );
  formCard.appendChild(form);
  formWrap.appendChild(formCard);

  wrapper.append(info, formWrap);
  section.appendChild(wrapper);
  return section;
}

// ─── FOOTER ──────────────────────────────────────────────────────────
export function buildFooter(): HTMLElement {
  const footer = el("footer", { className: "footer" });
  footer.appendChild(
    el("p", {
      html: `© ${new Date().getFullYear()} Sampath Kumar Veesam. Crafted with <span class="heart">♥</span> JOY and clean code.`,
    })
  );
  return footer;
}

// ─── RENDER ALL ──────────────────────────────────────────────────────
export function renderPortfolio(data: PortfolioData): void {
  const app = document.getElementById("app");
  if (!app) return;

  const fragment = document.createDocumentFragment();

  fragment.appendChild(buildOrbs());
  fragment.appendChild(buildNavbar(data));
  fragment.appendChild(buildHero(data));
  fragment.appendChild(buildAbout(data));
  fragment.appendChild(buildSkills(data));
  fragment.appendChild(buildExperience(data));
  fragment.appendChild(buildProjects(data));
  fragment.appendChild(buildEducation(data));
  fragment.appendChild(buildCertifications(data));
  fragment.appendChild(buildContact(data));
  fragment.appendChild(buildFooter());

  app.appendChild(fragment);
}
