/*
   Nour Emad Abdallah Portfolio
   Interactivity & Animations Script
*/

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 1. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuBtn.classList.toggle('active');
      navMenu.classList.toggle('active');
      mobileMenuBtn.setAttribute('aria-expanded', navMenu.classList.contains('active') ? 'true' : 'false');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navMenu.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 2. Sticky Header & Active Link Highlighting
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    // Header background change on scroll
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Determine current active section
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - 150)) {
        current = section.getAttribute('id');
      }
    });

    // Update active class on nav links
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // 3. Typewriter Effect
  const words = [
    "AI & Data Science Developer",
    "Computer Science Student",
    "Machine Learning Specialist",
    "Full-Stack Web Enthusiast"
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typewriterElement = document.getElementById('typewriter');

  function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      // Delete characters
      typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      // Add characters
      typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    // Determine typing speed
    let typingSpeed = isDeleting ? 50 : 100;

    // If word is complete, pause then start deleting
    if (!isDeleting && charIndex === currentWord.length) {
      typingSpeed = 2000; // Pause at the end of the word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length; // Move to next word
      typingSpeed = 500; // Pause before typing new word
    }

    setTimeout(type, typingSpeed);
  }

  if (typewriterElement) {
    type();
  }

  // 4. Scroll Reveal Effect for Sections
  const fadeSections = document.querySelectorAll('.fade-in-section');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.1 });

  fadeSections.forEach(section => {
    revealObserver.observe(section);
  });

  // 5. Project Card Hover Glow Coordinates
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // 6. Projects Category Filter
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Toggle active filter button style
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      projectItems.forEach(item => {
        // Reset transition styles for clean reveal animation
        item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.style.display = 'flex';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // 7. Contact Form Handling with Toast
  const contactForm = document.getElementById('portfolio-contact-form');
  const toast = document.getElementById('submit-toast');

  if (contactForm && toast) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const message = document.getElementById('contact-message').value.trim();
      const recipient = contactForm.dataset.recipient || 'nem78324@gmail.com';

      // Validate simple inputs
      if (name === '' || email === '' || message === '') {
        showToast('Please fill out all fields.', 'error');
        return;
      }

      const submitBtn = document.getElementById('form-submit-btn');
      const originalContent = submitBtn.innerHTML;
      const subject = encodeURIComponent(`Portfolio contact from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

      submitBtn.innerHTML = '<span>Opening email...</span><i data-lucide="mail-check" style="width: 16px; height: 16px;"></i>';
      if (typeof lucide !== 'undefined') lucide.createIcons();

      window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;

      setTimeout(() => {
        showToast(`Thanks, ${name}. Your email draft is ready to send.`);
        submitBtn.innerHTML = originalContent;
        if (typeof lucide !== 'undefined') lucide.createIcons();
      }, 700);
    });
  }

  function showToast(message, type = 'success') {
    const toastMsg = document.getElementById('toast-message');
    const toastIcon = toast.querySelector('i');
    
    toastMsg.textContent = message;
    
    // Adjust colors/icons depending on response
    if (type === 'error') {
      toast.style.borderColor = '#ef4444';
      if (toastIcon) {
        toastIcon.setAttribute('data-lucide', 'alert-circle');
        toastIcon.style.color = '#ef4444';
      }
    } else {
      toast.style.borderColor = 'var(--accent-indigo)';
      if (toastIcon) {
        toastIcon.setAttribute('data-lucide', 'check-circle-2');
        toastIcon.style.color = '#10b981';
      }
    }
    
    if (typeof lucide !== 'undefined') lucide.createIcons();

    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

  // 8. Scroll Progress Bar
  const progressBar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (height > 0) {
      const scrolled = (winScroll / height) * 100;
      if (progressBar) {
        progressBar.style.width = scrolled + '%';
      }
    }
  });

  // 9. Back to Top Button
  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
