// app.js
(function () {
    const DATA = window.PORTFOLIO;
  
    const $ = (sel, root = document) => root.querySelector(sel);
    const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  
    // Theme
    const themeToggle = $("#themeToggle");
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) document.documentElement.setAttribute("data-theme", storedTheme);
  
    themeToggle?.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "light";
      const next = current === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    });
  
    // Basic bindings
    $("#brandName").textContent = "ANAND.";
    $("#brandRole").textContent = "Web Developer/ UI/UX Designer";
    $("#heroSubtitle").innerHTML = DATA.person.headline
      .split("|")
      .map(text => `<span class="hero__tag">${escapeHtml(text.trim())}</span>`)
      .join("");
    const heroPill = $("#heroPill");
    if (heroPill) {
      heroPill.textContent = "Open to Relocation";
      heroPill.classList.add("pill--accent");
    }
    $("#footerText").textContent = `© ${new Date().getFullYear()} ${DATA.person.fullName}.`;

    // iPhone mockup lock screen
    const iphoneMockup = $("#iphoneMockup");
    const iphoneUnlock = $("#iphoneUnlock");
    const iphoneClock = $("#iphoneClock");
    const iphoneDate = $("#iphoneDate");
    const iphoneStatusTime = $("#iphoneStatusTime");
    const iphonePhotosSlider = $("#iphonePhotosSlider");
    if (iphoneMockup && iphoneClock && iphoneDate && iphoneUnlock) {
      const updateIphoneTime = () => {
        const now = new Date();
        const timeOptions = {
          hour: "numeric",
          minute: "2-digit",
          hour12: false,
          timeZone: "America/Chicago"
        };
        const dateOptions = {
          weekday: "long",
          month: "long",
          day: "numeric",
          timeZone: "America/Chicago"
        };
        const timeString = new Intl.DateTimeFormat("en-US", timeOptions).format(now);
        iphoneClock.textContent = timeString;
        iphoneDate.textContent = new Intl.DateTimeFormat("en-US", dateOptions).format(now);
        if (iphoneStatusTime) iphoneStatusTime.textContent = timeString;
      };

      updateIphoneTime();
      setInterval(updateIphoneTime, 1000);

      iphoneUnlock.addEventListener("click", () => {
        iphoneMockup.classList.add("is-unlocked");
      });
    }

    if (iphonePhotosSlider) {
      const slides = Array.from(iphonePhotosSlider.querySelectorAll("img, video"));
      let sliderTimer = null;
      const startSlider = () => {
        if (slides.length && !sliderTimer) {
          let slideIndex = 0;
          sliderTimer = setInterval(() => {
            slideIndex = (slideIndex + 1) % slides.length;
            const target = slides[slideIndex];
            iphonePhotosSlider.scrollTo({
              left: target.offsetLeft - iphonePhotosSlider.offsetLeft,
              behavior: "smooth"
            });
          }, 2500);
        }
      };
      const stopSlider = () => {
        if (sliderTimer) {
          clearInterval(sliderTimer);
          sliderTimer = null;
        }
      };
      startSlider();

      iphonePhotosSlider.addEventListener("click", (event) => {
        const video = event.target.closest("video");
        if (!video) return;
        if (video.paused) {
          stopSlider();
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });

      iphonePhotosSlider.addEventListener("ended", (event) => {
        const video = event.target.closest("video");
        if (!video) return;
        startSlider();
      });
    }
  
    // Resume button
    const resumeBtn = $("#resumeBtn");
    if (DATA.person.resumeUrl) {
      resumeBtn.href = DATA.person.resumeUrl;
    } else {
      resumeBtn.href = DATA.person.portfolio; // fallback
      resumeBtn.title = "Add a real resume URL in data.js (resumeUrl).";
    }
  
    // Hero meta
    const heroMeta = $("#heroMeta");
    const metaBits = [
      DATA.person.location,
      DATA.person.email,
      DATA.person.portfolio.replace("https://", "")
    ];
    heroMeta.innerHTML = metaBits.map(t => `<span class="chip">${escapeHtml(t)}</span>`).join("");
  
    // Stats + mini timeline
    $("#statGrid").innerHTML = DATA.stats
      .map(s => `<div class="stat"><div class="stat__k">${escapeHtml(s.k)}</div><div class="stat__v">${escapeHtml(s.v)}</div></div>`)
      .join("");
  
    $("#miniTimeline").innerHTML = DATA.miniTimeline
      .map(it => `<div class="mini-item"><div class="dot"></div><p><strong>${escapeHtml(it.when)}:</strong> ${escapeHtml(it.what)}</p></div>`)
      .join("");

    // Hero dropdown
    const heroToggle = document.querySelector(".hero__toggle");
    const heroDetails = document.querySelector("#heroDetails");
    if (heroToggle && heroDetails) {
      heroToggle.addEventListener("click", () => {
        const isOpen = heroDetails.classList.toggle("is-open");
        heroToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });
    }
  
    // About
    $("#aboutText").textContent = DATA.about.summary;
    const whatIDoList = $("#whatIDo");
    const whatIDoItems = DATA.about.whatIDo;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      whatIDoList.innerHTML = whatIDoItems.map(x => `<li>${escapeHtml(x)}</li>`).join("");
    } else {
      whatIDoList.innerHTML = "";
      let lineIndex = 0;

      const typeLine = (text, done) => {
        const li = document.createElement("li");
        const span = document.createElement("span");
        span.className = "typing-line is-typing";
        li.appendChild(span);
        whatIDoList.appendChild(li);

        let i = 0;
        const step = () => {
          span.textContent = text.slice(0, i++);
          if (i <= text.length) {
            setTimeout(step, 22);
          } else {
            span.classList.remove("is-typing");
            done();
          }
        };
        step();
      };

      const nextLine = () => {
        if (lineIndex >= whatIDoItems.length) return;
        typeLine(whatIDoItems[lineIndex], () => {
          lineIndex += 1;
          setTimeout(nextLine, 260);
        });
      };
      nextLine();
    }
    const certsEl = $("#certs");
    if (certsEl && certsEl.dataset.static !== "true") {
      certsEl.innerHTML = DATA.about.certifications
        .map((c, i) => `<li class="chip reveal" style="transition-delay:${i * 70}ms">${escapeHtml(c)}</li>`)
        .join("");
      requestAnimationFrame(setupReveal);
    }
  
    // Skills
    const skillIcons = {
      "HTML": { icon: "fab fa-html5", color: "#E34F26" },
      "CSS": { icon: "fab fa-css3-alt", color: "#2965F1" },
      "JavaScript": { icon: "fab fa-js", color: "#F7DF1E" },
      "TypeScript": { icon: "fas fa-code", color: "#3178C6" },
      "React.js": { icon: "fab fa-react", color: "#61DAFB" },
      "Node.js": { icon: "fab fa-node-js", color: "#83CD29" },
      "Angular": { icon: "fab fa-angular", color: "#DD0031" },
      "Power BI (DAX, Data Modeling)": { icon: "fas fa-chart-column", color: "#F2C811" },
      "Tableau": { icon: "fas fa-chart-bar", color: "#4E79A7" },
      "Excel": { icon: "fas fa-file-excel", color: "#1D6F42" },
      "Data Cleaning & Transformation": { icon: "fas fa-broom", color: "#F59E0B" },
      "Data Visualization": { icon: "fas fa-chart-pie", color: "#22C55E" },
      "Python": { icon: "fab fa-python", color: "#3776AB" },
      "SQL": { icon: "fas fa-database", color: "#0EA5E9" },
      "Java": { icon: "fab fa-java", color: "#E11D48" },
      "C++": { icon: "fas fa-c", color: "#8B5CF6" },
      "MySQL": { icon: "fas fa-database", color: "#00758F" },
      "RDBMS": { icon: "fas fa-database", color: "#64748B" },
      "Amazon RDS": { icon: "fas fa-database", color: "#FF9900" },
      "AWS": { icon: "fab fa-aws", color: "#FF9900" },
      "Azure": { icon: "fas fa-cloud", color: "#0078D4" },
      "GCP": { icon: "fas fa-cloud", color: "#EA4335" },
      "Git": { icon: "fab fa-git-alt", color: "#F05032" },
      "GitHub": { icon: "fab fa-github", color: "#9CA3AF" },
      "Jenkins": { icon: "fab fa-jenkins", color: "#D24939" },
      "Docker": { icon: "fab fa-docker", color: "#0EA5E9" },
      "Figma": { icon: "fab fa-figma", color: "#A259FF" },
      "Miro": { icon: "fas fa-diagram-project", color: "#FACC15" },
      "Lucidchart": { icon: "fas fa-diagram-project", color: "#F97316" },
      "Zeplin": { icon: "fas fa-pen-ruler", color: "#0EA5E9" },
      "Agile/Scrum": { icon: "fas fa-people-group", color: "#22C55E" },
      "Usability Testing": { icon: "fas fa-magnifying-glass", color: "#38BDF8" }
    };

    const skillLinks = {
      "Figma": "https://www.figma.com/design/tL6rPWKYREBWD0QeuyD2IA/RideNest?node-id=0-1&t=GAXydvlngPVCkZEh-1"
    };
    const skillProjects = {
      "HTML": "healthcare-dashboard",
      "CSS": "healthcare-dashboard",
      "JavaScript": "healthcare-dashboard",
      "Power BI (DAX, Data Modeling)": "ensureguard",
      "Python": "timewasters",
      "Tableau": "timewasters",
      "Data Cleaning & Transformation": "timewasters",
      "Data Visualization": "timewasters",
      "React.js": "elearning"
    };

    const renderSkillIcon = (label) => {
      const meta = skillIcons[label] || { icon: "fas fa-circle-dot", color: "#94A3B8" };
      const link = skillLinks[label];
      const projectId = skillProjects[label];
      const wrapper = link ? "a" : projectId ? "button" : "span";
      const hrefAttr = link ? ` href="${escapeAttr(link)}" target="_blank" rel="noreferrer"` : "";
      const buttonAttr = projectId ? ` type="button" data-open="${escapeAttr(projectId)}"` : "";
      const projectAttr = projectId ? ` data-project="${escapeAttr(projectId)}"` : "";
      const skillAttr = ` data-skill="${escapeAttr(label)}"`;
      return `
        <${wrapper} class="skill-icon reveal"${hrefAttr}${buttonAttr}${projectAttr}${skillAttr} title="${escapeAttr(label)}" aria-label="${escapeAttr(label)}">
          <i class="${meta.icon}" style="color: ${meta.color};"></i>
          <span class="skill-icon__label">${escapeHtml(label)}</span>
        </${wrapper}>
      `;
    };

    const skillItems = DATA.skills.flatMap(group => group.items);
    $("#skillsGrid").innerHTML = `
      <div class="skills-bento" aria-label="Skills">
        ${skillItems.map(renderSkillIcon).join("")}
      </div>
    `;

    const skillsBento = $("#skillsGrid");
    if (skillsBento && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const projectKeys = Array.from(new Set(Object.values(skillProjects)));
      const skillEls = Array.from(skillsBento.querySelectorAll(".skill-icon[data-project]"));
      if (projectKeys.length && skillEls.length) {
        let highlightIndex = 0;
        const applyHighlight = () => {
          const activeProject = projectKeys[highlightIndex % projectKeys.length];
          skillEls.forEach(el => {
            el.classList.toggle("is-highlight", el.dataset.project === activeProject);
          });
          highlightIndex += 1;
        };
        applyHighlight();
        setInterval(applyHighlight, 2200);
      }
    }
  
    // Education cards
    $("#educationCards").innerHTML = DATA.education.map(ed => `
      <article class="card reveal">
        <h3>${escapeHtml(ed.school)}</h3>
        <p class="muted">${escapeHtml(ed.degree)}</p>
        <p class="muted">${escapeHtml(ed.dates)}</p>
        ${ed.details?.length ? `<ul class="list">${ed.details.map(d => `<li>${escapeHtml(d)}</li>`).join("")}</ul>` : ""}
      </article>
    `).join("");
  
    // Experience
    $("#experienceTimeline").innerHTML = DATA.experience.map(x => `
      <li class="timeline-item reveal">
        <div class="timeline-item__head">
          <strong>${escapeHtml(x.role)} — ${escapeHtml(x.company)}</strong>
          <span>${escapeHtml(x.dates)} • ${escapeHtml(x.location)}</span>
        </div>
        <ul>
          ${x.bullets.map(b => `<li>${escapeHtml(b)}</li>`).join("")}
        </ul>
      </li>
    `).join("");
  
    // Contact list
    const contacts = [
      { label: "Email", value: DATA.person.email, href: `mailto:${DATA.person.email}`, icon: "fas fa-envelope" },
      { label: "Phone", value: DATA.person.phone, href: `tel:${DATA.person.phone.replace(/[^0-9+]/g, "")}`, icon: "fas fa-phone" },
      { label: "LinkedIn", value: "linkedin.com/in/anand-paul-nayak-banavath", href: DATA.person.linkedin, icon: "fab fa-linkedin" },
      { label: "Instagram", value: "instagram.com", href: DATA.person.instagram, icon: "fab fa-instagram" },
      { label: "Facebook", value: "facebook.com", href: DATA.person.facebook, icon: "fab fa-facebook" }
    ];
    $("#contactList").innerHTML = contacts.map(c => `
      <a class="contact-link" href="${escapeAttr(c.href)}" target="_blank" rel="noreferrer">
        <span class="contact-link__label">
          <i class="${escapeAttr(c.icon)}" aria-hidden="true"></i>
          ${escapeHtml(c.label)}
        </span>
        <span class="sr-only">${escapeHtml(c.value)}</span>
      </a>
    `).join("");

    // Back to top
    const backToTop = $(".back-to-top");
    if (backToTop) {
      const toggleBackToTop = () => {
        const isVisible = window.scrollY > 400;
        backToTop.classList.toggle("is-visible", isVisible);
      };
      toggleBackToTop();
      window.addEventListener("scroll", toggleBackToTop, { passive: true });
      backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  
    // Projects + modal
    const projectsGrid = $("#projectsGrid");
    const buildAction = (label, href, primary) => {
      const hasLink = Boolean(href);
      const className = `project-card__btn${primary ? " project-card__btn--primary" : ""}${hasLink ? "" : " is-disabled"}`;
      const safeHref = hasLink ? href : "#";
      const ariaDisabled = hasLink ? "" : ` aria-disabled="true" tabindex="-1"`;
      return `<a class="${className}" href="${escapeAttr(safeHref)}" target="_blank" rel="noreferrer"${ariaDisabled}>${label}</a>`;
    };

    function renderProjects() {
      projectsGrid.innerHTML = DATA.projects.map((p) => {
        const tag = p.tags?.[0] || "Project";
        const stack = (p.tags || []).map(t => `<span class="project-card__chip">${escapeHtml(t)}</span>`).join("");
        const caseStudy = buildAction("View Case Study", p.links?.github, true);
        const demo = buildAction("Live Demo", p.links?.demo, false);
        return `
          <article class="project-card reveal" data-project-card="${escapeAttr(p.id)}">
            <button class="project-card__header" type="button" aria-expanded="false">
              <div>
                <div class="project-card__tag">${escapeHtml(tag)}</div>
                <h3 class="project-card__title">${escapeHtml(p.title)}</h3>
                <div class="project-card__subtitle muted">${escapeHtml(p.subtitle)}</div>
              </div>
              <span class="project-card__chevron" aria-hidden="true">
                <i class="fas fa-chevron-down"></i>
              </span>
            </button>
            <div class="project-card__content">
              <div class="project-card__body">
                <p>${escapeHtml(p.description)}</p>
                <div class="project-card__stack">${stack}</div>
                <div class="project-card__actions">
                  ${caseStudy}
                  ${demo}
                </div>
              </div>
            </div>
          </article>
        `;
      }).join("");

      // Attach reveal observer again for new nodes
      setupReveal();
    }
  
    renderProjects();

    // Accordion behavior (single open at a time)
    const projectCards = () => Array.from(projectsGrid.querySelectorAll(".project-card"));
    projectsGrid.addEventListener("click", (event) => {
      const header = event.target.closest(".project-card__header");
      if (!header) return;
      const card = header.closest(".project-card");
      const wasOpen = card.classList.contains("is-open");
      projectCards().forEach((el) => {
        el.classList.remove("is-open");
        const btn = el.querySelector(".project-card__header");
        if (btn) btn.setAttribute("aria-expanded", "false");
      });
      if (!wasOpen) {
        card.classList.add("is-open");
        header.setAttribute("aria-expanded", "true");
      }
    });
  
    // Modal
    const modal = $("#projectModal");
    const modalTitle = $("#modalTitle");
    const modalBody = $("#modalBody");
    const modalFoot = $("#modalFoot");
  
    document.addEventListener("click", (e) => {
      const openBtn = e.target.closest("[data-open]");
      if (openBtn) {
        const id = openBtn.getAttribute("data-open");
        const proj = DATA.projects.find(p => p.id === id);
        if (proj) openModal(proj);
        return;
      }
  
      const closeBtn = e.target.closest("[data-close]");
      if (closeBtn) closeModal();
    });
  
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") closeModal();
    });
  
    function openModal(p) {
      modalTitle.textContent = p.title;
  
      modalBody.innerHTML = `
        <p>${escapeHtml(p.description)}</p>
        <div class="divider"></div>
        <h4 style="margin:0 0 8px; color: var(--text);">Highlights</h4>
        <ul class="list">
          ${p.highlights.map(h => `<li>${escapeHtml(h)}</li>`).join("")}
        </ul>
      `;
  
      modalFoot.innerHTML = `
        ${p.links?.github ? `<a class="btn" href="${escapeAttr(p.links.github)}" target="_blank" rel="noreferrer">GitHub</a>` : ""}
        ${p.links?.demo ? `<a class="btn" href="${escapeAttr(p.links.demo)}" target="_blank" rel="noreferrer">Demo</a>` : ""}
        <button class="btn btn--ghost" type="button" data-close="true">Close</button>
      `;
  
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      // focus close button
      const close = modal.querySelector("[data-close]");
      close?.focus();
    }
  
    function closeModal() {
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
  
    // Contact form: copy-to-clipboard message
    const form = $("#contactForm");
    const status = $("#formStatus");
    const clearForm = $("#clearForm");
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const fromName = String(fd.get("fromName") || "").trim();
      const fromEmail = String(fd.get("fromEmail") || "").trim();
      const topic = String(fd.get("topic") || "").trim();
      const msg = String(fd.get("msg") || "").trim();
  
      const compiled =
  `Hi Anand,
  
  ${msg}
  
  — ${fromName}
  ${fromEmail}
  Topic: ${topic}
  
  LinkedIn: ${DATA.person.linkedin}
  Portfolio: ${DATA.person.portfolio}`;
  
      try {
        await navigator.clipboard.writeText(compiled);
        status.textContent = "Copied. Paste into email/LinkedIn.";
      } catch {
        status.textContent = "Copy failed. Select text manually and copy.";
        // fallback: show prompt
        window.prompt("Copy this message:", compiled);
      }
    });
  
    clearForm.addEventListener("click", () => {
      form.reset();
      status.textContent = "";
    });
  
    // Reveal on scroll
    function setupReveal() {
      const nodes = $$(".reveal").filter(n => !n.dataset.observed);
      if (!nodes.length) return;

      const io = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      }, { threshold: 0.15 });

      // Stagger reveals for smoother, grouped motion.
      nodes.forEach((n, idx) => {
        n.dataset.observed = "true";
        n.style.transitionDelay = `${(idx % 6) * 80}ms`;
        io.observe(n);
      });
    }
    setupReveal();
  
    // JSON-LD
    injectJsonLd(DATA);
  
    function injectJsonLd(d) {
      const schema = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: d.person.fullName,
        email: d.person.email,
        telephone: d.person.phone,
        url: d.person.portfolio,
        sameAs: [d.person.linkedin],
        jobTitle: "Front-End / Web Developer",
        address: { "@type": "PostalAddress", addressLocality: "Denton", addressRegion: "TX", addressCountry: "US" }
      };
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.textContent = JSON.stringify(schema);
      document.head.appendChild(s);
    }
  
    function uniq(arr) { return Array.from(new Set(arr)); }
    function escapeHtml(str) {
      return String(str).replace(/[&<>"']/g, (m) => ({
        "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
      }[m]));
    }
    function escapeAttr(str) { return escapeHtml(str).replace(/`/g, "&#096;"); }
  })();
  
