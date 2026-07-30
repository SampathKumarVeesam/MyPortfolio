// ===================================================================
// interactions.ts — All interactive behaviors with full type safety
// ===================================================================

// ─── NAVBAR SCROLL & MOBILE MENU ─────────────────────────────────────
export function initNavbar(): void {
  const navbar = document.querySelector<HTMLElement>(".navbar");
  const menuToggle = document.querySelector<HTMLButtonElement>(".menu-toggle");
  const navLinks = document.querySelector<HTMLUListElement>(".nav-links");

  if (!navbar || !menuToggle || !navLinks) return;

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menuToggle.classList.toggle("active");
  });

  document.querySelectorAll<HTMLAnchorElement>(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => navLinks.classList.remove("active"));
  });
}

// ─── CURSOR GLOW ─────────────────────────────────────────────────────
export function initCursorGlow(): void {
  const cursorGlow = document.createElement("div");
  cursorGlow.classList.add("cursor-glow");
  document.body.appendChild(cursorGlow);

  document.addEventListener("mousemove", (e: MouseEvent) => {
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
  });
}

// ─── SCROLL REVEAL ───────────────────────────────────────────────────
export function initScrollReveal(): void {
  const elements = document.querySelectorAll<HTMLElement>(".reveal");
  const observer = new IntersectionObserver(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(
            () => (entry.target as HTMLElement).classList.add("active"),
            i * 100
          );
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  elements.forEach((el) => observer.observe(el));
}

// ─── SKILL BAR ANIMATION ────────────────────────────────────────────
export function initSkillBars(): void {
  const bars = document.querySelectorAll<HTMLElement>(".bar-fill");
  const observer = new IntersectionObserver(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          target.style.width = target.dataset.width || "0%";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );
  bars.forEach((bar) => observer.observe(bar));
}

// ─── COUNTER ANIMATION ──────────────────────────────────────────────
function animateCounter(element: HTMLElement): void {
  const target: number = parseInt(element.dataset.count || "0", 10);
  const suffix: string = element.dataset.suffix || "";
  const duration: number = 2000;
  const start: number = performance.now();

  function update(now: number): void {
    const progress: number = Math.min((now - start) / duration, 1);
    const eased: number = 1 - Math.pow(1 - progress, 3);
    element.textContent = Math.floor(target * eased) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

export function initCounters(): void {
  const counters = document.querySelectorAll<HTMLElement>("[data-count]");
  const observer = new IntersectionObserver(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((el) => observer.observe(el));
}

// ─── TYPING EFFECT ───────────────────────────────────────────────────
export function initTypingEffect(roles: string[]): void {
  const typingEl = document.querySelector<HTMLSpanElement>(".typing-text");
  if (!typingEl) return;

  let roleIndex: number = 0;
  let charIndex: number = 0;
  let isDeleting: boolean = false;

  function typeEffect(): void {
    const current: string = roles[roleIndex];
    typingEl!.textContent = current.substring(0, charIndex);

    if (!isDeleting && charIndex < current.length) {
      charIndex++;
      setTimeout(typeEffect, 60);
    } else if (!isDeleting && charIndex === current.length) {
      setTimeout(() => {
        isDeleting = true;
        typeEffect();
      }, 2000);
    } else if (isDeleting && charIndex > 0) {
      charIndex--;
      setTimeout(typeEffect, 30);
    } else {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeEffect, 500);
    }
  }
  typeEffect();
}

// ─── 3D TILT ON GLASS CARDS ─────────────────────────────────────────
export function initTiltCards(): void {
  document.querySelectorAll<HTMLElement>(".glass-card").forEach((card) => {
    // Skip 3D tilt animation on the contact form card for better usability when typing
    if (card.closest(".contact-form")) return;

    card.addEventListener("mousemove", (e: MouseEvent) => {
      const rect: DOMRect = card.getBoundingClientRect();
      const x: number = e.clientX - rect.left;
      const y: number = e.clientY - rect.top;
      const centerX: number = rect.width / 2;
      const centerY: number = rect.height / 2;
      const rotateX: number = (y - centerY) / 20;
      const rotateY: number = (centerX - x) / 20;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(800px) rotateX(0) rotateY(0) translateY(0)";
    });
  });
}

// ─── PARTICLE CANVAS ─────────────────────────────────────────────────
interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

function createParticle(width: number, height: number): Particle {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 2 + 0.5,
    speedX: (Math.random() - 0.5) * 0.4,
    speedY: (Math.random() - 0.5) * 0.4,
    opacity: Math.random() * 0.4 + 0.1,
  };
}

function updateParticle(p: Particle, width: number, height: number): void {
  p.x += p.speedX;
  p.y += p.speedY;
  if (p.x < 0 || p.x > width) p.speedX *= -1;
  if (p.y < 0 || p.y > height) p.speedY *= -1;
}

function drawParticle(
  ctx: CanvasRenderingContext2D,
  p: Particle
): void {
  ctx.beginPath();
  ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(108,99,255,${p.opacity})`;
  ctx.fill();
}

function connectParticles(
  ctx: CanvasRenderingContext2D,
  particles: Particle[]
): void {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx: number = particles[i].x - particles[j].x;
      const dy: number = particles[i].y - particles[j].y;
      const dist: number = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(108,99,255,${0.08 * (1 - dist / 150)})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

export function initParticleCanvas(): void {
  const canvas = document.getElementById("bg-canvas") as HTMLCanvasElement | null;
  if (!canvas) return;

  const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
  if (!ctx) return;

  function resize(): void {
    canvas!.width = window.innerWidth;
    canvas!.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const particles: Particle[] = [];
  for (let i = 0; i < 80; i++) {
    particles.push(createParticle(canvas.width, canvas.height));
  }

  function animate(): void {
    ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
    particles.forEach((p) => {
      updateParticle(p, canvas!.width, canvas!.height);
      drawParticle(ctx!, p);
    });
    connectParticles(ctx!, particles);
    requestAnimationFrame(animate);
  }
  animate();
}

// ─── SMOOTH SCROLL ───────────────────────────────────────────────────
export function initSmoothScroll(): void {
  document
    .querySelectorAll<HTMLAnchorElement>('a[href^="#"]')
    .forEach((anchor) => {
      anchor.addEventListener("click", (e: Event) => {
        e.preventDefault();
        const href: string | null = anchor.getAttribute("href");
        if (!href) return;
        const target = document.querySelector<HTMLElement>(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
}

// ─── CONTACT FORM ────────────────────────────────────────────────────
export function initContactForm(): void {
  const form = document.getElementById("contact-form") as HTMLFormElement | null;
  if (!form) return;

  const btn = form.querySelector<HTMLButtonElement>(".form-submit");
  const inputs = form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input, textarea");

  form.addEventListener("submit", async (e: Event) => {
    e.preventDefault();
    
    if (!btn) return;

    const nameInput = document.getElementById("name") as HTMLInputElement | null;
    const emailInput = document.getElementById("email") as HTMLInputElement | null;
    const phoneInput = document.getElementById("phone") as HTMLInputElement | null;
    const subjectInput = document.getElementById("subject") as HTMLInputElement | null;
    const messageInput = document.getElementById("message") as HTMLTextAreaElement | null;
    
    const name = nameInput?.value || "";
    const email = emailInput?.value || "";
    const phone = phoneInput?.value || "";
    const subject = subjectInput?.value || "";
    const message = messageInput?.value || "";

    if (!name || !email || !message) {
      alert("Please fill in all required fields.");
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Phone number format validation (if provided)
    if (phone) {
      const digitCount = phone.replace(/\D/g, "").length;
      const phoneRegex = /^\+?[0-9\s\-()]{10,20}$/;
      if (digitCount < 10 || !phoneRegex.test(phone)) {
        alert("Please enter a valid contact number (must be 10-20 digits).");
        return;
      }
    }

    // Set loading state
    const originalText = btn.textContent;
    btn.disabled = true;
    btn.textContent = "Sending...";
    inputs.forEach(input => input.disabled = true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone, subject, message }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Success state
        btn.textContent = "✓ Message Sent!";
        btn.style.background = "linear-gradient(135deg, #00ff88, #00d4ff)";
        form.reset();
      } else {
        // Failed state on server
        throw new Error(result.error || "Failed to send email");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      btn.textContent = "✗ Send Failed - Try Again";
      btn.style.background = "linear-gradient(135deg, #ff4d4d, #ff1a1a)";
    } finally {
      // Re-enable inputs after a short delay
      setTimeout(() => {
        btn.disabled = false;
        btn.textContent = originalText;
        btn.style.background = "";
        inputs.forEach(input => input.disabled = false);
      }, 4000);
    }
  });
}

