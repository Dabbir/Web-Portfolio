document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 800,
    easing: "ease",
    once: true,
    mirror: false,
  });

  document.getElementById("current-year").textContent =
    new Date().getFullYear();

  const header = document.querySelector("header");
  const backToTop = document.getElementById("back-to-top");
  const navLinks = document.querySelectorAll(".nav-link");
  const tabs = document.querySelectorAll(".tab");
  const tabContents = document.querySelectorAll(".tab-content");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");
  const contactForm = document.getElementById("contact-form");
  const menuToggle = document.getElementById("menu-toggle");
  const navItems = document.querySelectorAll("nav ul li a");

  const textElement = document.querySelector(".typing-effect");
  if (textElement) {
    const text = textElement.textContent;
    textElement.textContent = "";

    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        textElement.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100); 
      }
    };

    setTimeout(typeWriter, 1000);
  }

  // Header scroll effect
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    if (window.scrollY > 500) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }

    updateActiveNavLink();
  });

  initSkillCards();
  initSkillHexagons();
  initTechItems();
  observeResumeSection();

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      if (menuToggle.checked) {
        menuToggle.checked = false;
      }

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      window.scrollTo({
        top: targetSection.offsetTop - 80,
        behavior: "smooth",
      });
    });
  });

  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      if (menuToggle.checked) {
        menuToggle.checked = false;
      }
    });
  });

  function updateActiveNavLink() {
    const sections = document.querySelectorAll("section");

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  backToTop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      tabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");
      tabContents.forEach((content) => {
        content.style.display = "none";
      });

      const targetContent = document.getElementById(
        this.getAttribute("data-target")
      );
      if (targetContent) {
        targetContent.style.display = "block";
      }
    });
  });

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      filterBtns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
      const filter = this.getAttribute("data-filter");
      portfolioItems.forEach((item) => {
        if (
          filter === "all" ||
          item.getAttribute("data-category").includes(filter)
        ) {
          item.style.display = "block";
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "scale(1)";
          }, 100);
        } else {
          item.style.opacity = "0";
          item.style.transform = "scale(0.8)";
          setTimeout(() => {
            item.style.display = "none";
          }, 500);
        }
      });
    });
  });

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;
      
      if (name && email && subject && message) {
        const submitBtn = document.querySelector(".submit-btn");
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = "Sending...";
        submitBtn.disabled = true;
        
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("subject", subject);
        formData.append("message", message);
        
        fetch("https://formspree.io/f/mldjpdbq", {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        })
          .then(response => {
            if (response.ok) {
              alert("Thank you for your message! I will get back to you soon.");
              contactForm.reset();
            } else {
              throw new Error("Oops! There was a problem sending your message.");
            }
          })
          .catch(error => {
            alert(error.message);
          })
          .finally(() => {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
          });
      } else {
        alert("Please fill in all fields.");
      }
    });
  }

  const downloadCV = document.getElementById("download-cv");
  if (downloadCV) {
    downloadCV.addEventListener("click", function (e) {
      console.log("CV download initiated");

      setTimeout(() => {
        alert("Thank you for downloading my CV!");
      }, 1000);

      // The download will happen automatically because of the 'download' attribute
    });
  }

  gsap.from(".logo", {
    duration: 1,
    y: -50,
    opacity: 0,
    ease: "power3.out",
    delay: 0.5,
  });

  gsap.from("nav ul li", {
    duration: 1,
    y: -50,
    opacity: 0,
    stagger: 0.2,
    ease: "power3.out",
    delay: 0.7,
  });

  window.addEventListener("scroll", function () {
    const scrollPosition = window.pageYOffset;
    const landingBg = document.querySelector(".landing-bg");

    if (landingBg) {
      landingBg.style.transform = `translateY(${scrollPosition * 0.3}px)`;
    }
  });

  const portfolioCards = document.querySelectorAll(".portfolio-item");
  portfolioCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      gsap.to(this.querySelector(".portfolio-image"), {
        duration: 0.4,
        scale: 1.1,
        ease: "power1.out",
      });
    });

    card.addEventListener("mouseleave", function () {
      gsap.to(this.querySelector(".portfolio-image"), {
        duration: 0.4,
        scale: 1,
        ease: "power1.out",
      });
    });
  });

  function initSkillCards() {
    const skillCards = document.querySelectorAll(".skill-card");

    skillCards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        gsap.to(this, {
          duration: 0.3,
          y: -10,
          boxShadow: "0 15px 30px rgba(0, 0, 0, 0.25)",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          ease: "power2.out",
        });

        const stars = this.querySelectorAll(".skill-stars i");
        const skillLevel = parseInt(this.getAttribute("data-skill-level"));

        stars.forEach((star, index) => {
          if (index < skillLevel) {
            gsap.to(star, {
              duration: 0.2,
              scale: 1.3,
              color: "#64ffda",
              ease: "back.out",
              delay: index * 0.1,
            });
          }
        });
      });

      card.addEventListener("mouseleave", function () {
        gsap.to(this, {
          duration: 0.3,
          y: 0,
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.15)",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          ease: "power2.out",
        });

        const stars = this.querySelectorAll(".skill-stars i");
        stars.forEach((star) => {
          gsap.to(star, {
            duration: 0.2,
            scale: 1,
            color: "#4caf50",
            ease: "power1.out",
          });
        });
      });
    });
  }

  function initSkillHexagons() {
    const hexagonItems = document.querySelectorAll(".hexagon-item");

    hexagonItems.forEach((item) => {
      const skillLevel = parseInt(item.getAttribute("data-level"));
      const skillName = item.getAttribute("data-skill");

      item.addEventListener("mouseenter", function () {
        gsap.to(this.querySelector(".hexagon"), {
          duration: 0.5,
          rotationY: 180,
          ease: "power2.out",
        });

        gsap.to(this.querySelector("i"), {
          duration: 0.5,
          scale: 1.2,
          color: "#ffffff",
          ease: "power2.out",
        });

        const tooltip = document.createElement("div");
        tooltip.className = "skill-tooltip";
        tooltip.innerHTML = `<strong>${skillName}</strong><br>Level: ${skillLevel}/10`;
        tooltip.style.position = "absolute";
        tooltip.style.top = "-40px";
        tooltip.style.left = "50%";
        tooltip.style.transform = "translateX(-50%)";
        tooltip.style.backgroundColor = "rgba(76, 175, 80, 0.9)";
        tooltip.style.color = "white";
        tooltip.style.padding = "5px 10px";
        tooltip.style.borderRadius = "5px";
        tooltip.style.fontSize = "0.8rem";
        tooltip.style.zIndex = "100";
        tooltip.style.whiteSpace = "nowrap";
        tooltip.style.opacity = "0";

        this.style.position = "relative";
        this.appendChild(tooltip);

        gsap.to(tooltip, {
          duration: 0.3,
          opacity: 1,
          delay: 0.2,
        });
      });

      item.addEventListener("mouseleave", function () {
        gsap.to(this.querySelector(".hexagon"), {
          duration: 0.5,
          rotationY: 0,
          ease: "power2.out",
        });

        gsap.to(this.querySelector("i"), {
          duration: 0.5,
          scale: 1,
          color: "#4caf50",
          ease: "power2.out",
        });

        const tooltip = this.querySelector(".skill-tooltip");
        if (tooltip) {
          gsap.to(tooltip, {
            duration: 0.2,
            opacity: 0,
            onComplete: function () {
              tooltip.remove();
            },
          });
        }
      });
    });
  }

  function initTechItems() {
    const techItems = document.querySelectorAll(".tech-item");

    techItems.forEach((item) => {
      const proficiency = item.getAttribute("data-proficiency");

      item.addEventListener("mouseenter", function () {
        gsap.to(this, {
          duration: 0.3,
          y: -10,
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          ease: "power2.out",
        });

        gsap.to(this.querySelector("i"), {
          duration: 0.3,
          scale: 1.2,
          ease: "back.out",
        });

        gsap.to(this.querySelector("span"), {
          duration: 0.3,
          scale: 1.1,
          fontWeight: 600,
          ease: "power2.out",
        });
      });

      item.addEventListener("mouseleave", function () {
        gsap.to(this, {
          duration: 0.3,
          y: 0,
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          ease: "power2.out",
        });

        gsap.to(this.querySelector("i"), {
          duration: 0.3,
          scale: 1,
          ease: "power2.out",
        });

        gsap.to(this.querySelector("span"), {
          duration: 0.3,
          scale: 1,
          fontWeight: 400,
          ease: "power2.out",
        });
      });
    });
  }

  function observeResumeSection() {
    const resumeSection = document.getElementById("resume");
    const skillCards = document.querySelectorAll(".skill-card");
    const hexagonItems = document.querySelectorAll(".hexagon-item");
    const techItems = document.querySelectorAll(".tech-item");

    if (resumeSection) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            skillCards.forEach((card, index) => {
              gsap.from(card, {
                duration: 0.5,
                y: 50,
                opacity: 0,
                delay: 0.1 * index,
                ease: "power2.out",
              });
            });

            hexagonItems.forEach((hexagon, index) => {
              gsap.from(hexagon, {
                duration: 0.5,
                scale: 0,
                opacity: 0,
                delay: 0.05 * index,
                ease: "back.out",
              });
            });

            techItems.forEach((item, index) => {
              gsap.from(item, {
                duration: 0.4,
                y: 30,
                opacity: 0,
                delay: 0.05 * index,
                ease: "power2.out",
              });
            });

            observer.unobserve(resumeSection);
          }
        },
        { threshold: 0.2 }
      );
      observer.observe(resumeSection);
    }
  }
});