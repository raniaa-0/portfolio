// Lorsque le document est entièrement chargé
document.addEventListener('DOMContentLoaded', function() { 

    // --- Défilement fluide pour les liens de navigation ---
    const navLinks = document.querySelectorAll('.sectiond div, .back-to-top');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Empêche le comportement par défaut du lien

            // Récupère l'ID cible ou le texte du lien
            const targetId = this.getAttribute('href') || this.textContent.toLowerCase();

            // Détermine la section cible à faire défiler
            const targetSection = document.querySelector(`.section${
                targetId === 'about me' ? '3' :
                targetId === 'skills' ? '4' :
                targetId === 'portfolio' ? '5' :
                '1'
            }`);

            // Défilement fluide vers la section cible
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Défilement vers la section contact au clic du bouton ---
    const contactBtn = document.querySelector('.contact');
    contactBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const contactSection = document.querySelector('.contact-form-section');
        window.scrollTo({
            top: contactSection.offsetTop,
            behavior: 'smooth'
        });
    });

    // --- Affichage du bouton "retour en haut" après défilement ---
    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });

    // --- Observer pour déclencher les animations au scroll ---
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate'); // Ajoute la classe d'animation
            }
        });
    }, observerOptions);

    // Sélection des sections à animer
    const sectionsToAnimate = document.querySelectorAll('.section2, .section3, .contact-form-section, .about-card, .skills-card');
    sectionsToAnimate.forEach(section => {
        section.classList.add('pre-animate'); // Classe de départ
        observer.observe(section); // Observation pour animation
    });

    // --- Soumission du formulaire de contact ---
    const contactForm = document.querySelector('.modern-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Récupération des champs
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Validation simple
            if (!name || !email || !message) {
                alert('Please fill in all required fields');
                return;
            }

            // Traitement du formulaire (à remplacer par une requête serveur)
            console.log('Form submitted:', { name, email, message });

            // Message de confirmation
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset(); // Réinitialise le formulaire
        });
    }

    // --- Effets de survol sur les compétences ---
    const skillItems = document.querySelectorAll('.skill-category li');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.color = '#ff3366';
        });
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.color = '#cccccc';
        });
    });

    // --- Animation des barres de progression au scroll ---
    const progressBars = document.querySelectorAll('.progress-fill');
    const progressObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width; // Garde la largeur originale
                entry.target.style.width = '0'; // Réinitialise temporairement
                setTimeout(() => {
                    entry.target.style.width = width; // Réanime à la bonne valeur
                }, 100);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => {
        progressObserver.observe(bar); // Observe chaque barre
    });
});

// --- Animation de flottement de l'image de profil avec la souris ---
const profileImage = document.querySelector('.profile-image');
if (profileImage) {
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        profileImage.style.transform = `translate(-${x * 10}px, -${y * 10}px)`;
    });
}

// --- Avatar flottant et interactif ---
document.querySelectorAll('section').forEach(section => {
    observer.observe(section); // Réutilise l'observer pour les animations
});

const cuteAvatar = document.getElementById('cute-avatar');
const avatarBubble = document.getElementById('avatar-bubble');

// Messages aléatoires que l'avatar peut afficher
const messages = [
  "Salut! :)", 
  "Regarde mes projets!",
  "Je suis là pour t'aider!",
  "Tu veux voir mon travail?",
];

// États d'humeur de l'avatar
const moods = ['happy', 'excited', 'shy', 'laughing'];

// Réaction de l'avatar au clic
cuteAvatar.addEventListener('click', function() {
  // Message aléatoire
  avatarBubble.textContent = messages[Math.floor(Math.random() * messages.length)];
  avatarBubble.style.transform = 'scale(1)';

  // Petite animation de saut
  this.style.animation = 'bounce 0.5s ease';

  // Changement d'humeur
  const currentMood = moods[Math.floor(Math.random() * moods.length)];
  this.dataset.mood = currentMood;

  // Cache la bulle après 3 secondes
  setTimeout(() => {
    avatarBubble.style.transform = 'scale(0)';
  }, 3000);

  // Réinitialise l'animation
  setTimeout(() => {
    this.style.animation = '';
  }, 500);
});

// --- Rotation de l'avatar au scroll ---
window.addEventListener('scroll', function() {
  const scrollY = window.scrollY;
  cuteAvatar.style.transform = `rotate(${Math.min(scrollY * 0.05, 8)}deg)`;
});

// --- Changement automatique d'expression toutes les 8s ---
setInterval(() => {
  if (!cuteAvatar.matches(':hover')) {
    const randomMood = moods[Math.floor(Math.random() * moods.length)];
    cuteAvatar.dataset.mood = randomMood;
  }
}, 8000);
