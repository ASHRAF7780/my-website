const notes = [
  "Meri pyaari Shaniya ❤️✨, tumhari paidaish ka din meri zindagi ka sabse khoobsurat din hai 🌸. Allah se meri dua hai ki tumhari zindagi hamesha khushiyon se bhari rahe, tumhari muskaan kabhi kam na ho, aur tumhare har qadam par barkat ho 🤲💖. Tum meri duniya ki sabse badi blessing ho, aur main hamesha Allah ka shukr ada karta hoon ki usne tumhe meri zindagi ka hissa banaya 🌷. Happy Birthday meri jaan, meri duaen aur mera pyaar hamesha tumhare saath hain 🌟💞.",
  "Shaniya ❤️🌸, tum meri zindagi ki sabse khoobsurat kahani ho ✨. Aaj tumhara birthday hai aur main Allah Ta'ala se dua karta hoon ki tumhari zindagi roshan tareeqon se chamakti rahe 🌟, tumhari har manzil aasan ho aur tumhe har khushi naseeb ho 🥹💖. Tum meri mohabbat ho, meri duaon ki rooh ho, aur meri har muskaan ka sabab tum ho 🌷. Happy Birthday meri pari 🫶, tum meri zindagi ka sabse anmol tohfa ho.",
  "Shaniya 🌸, tum meri duaon ka sabse khoobsurat jawab ho ❤️. Happy Birthday meri rooh, meri mohabbat 💞.",
  "Happy Birthday meri pyaari Shaniya ❤️🌸. Allah tumhari zindagi ko apni rehmaton aur barkaton se bharde 🤲. Tum meri duniya ka sabse khoobsurat hissa ho; tumhari muskaan meri rooh ki taazgi hai ✨. Dua karta hoon tumhe har din naye rang aur khushiyan naseeb hon 🥰.",
  "Shaniya ❤️✨, tum meri zindagi ki woh roshni ho jise dekh kar sab kuch khubsurat lagta hai 🌸. Tumhari zindagi hamesha Allah ki rehmaton se bhari rahe, aur tumhe wohi sab mile jo tumhare dil ka armaan hai 🤲💖. Happy Birthday meri jaan 🥰."
];

const gifs = ["gif1.gif", "gif2.gif", "gif3.gif", "gif4.gif", "gif5.gif"];

let currentIndex = 0;

// Create falling hearts
function createHeart() {
  const heart = document.createElement("div");
  const heartSymbols = ["😘", "🎂", "💕", "🙈", "💝"];
  heart.innerHTML =
    heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
  heart.className = "heart-rain";

  // Random starting position
  const startX = Math.random() * window.innerWidth;
  heart.style.left = `${startX}px`;

  // Random ending position (swaying effect)
  const finalX = (Math.random() - 0.5) * 200;
  heart.style.setProperty("--finalX", `${finalX}px`);

  // Random duration
  const duration = Math.random() * 2 + 3;
  heart.style.animationDuration = `${duration}s`;

  document.body.appendChild(heart);

  // Remove heart after animation
  setTimeout(() => heart.remove(), duration * 1000);
}

// Initialize content and progress dots
function initialize() {
  updateContent();
  createProgressDots();
  // Start creating hearts
  setInterval(createHeart, 300);
}

// Update both note and GIF
function updateContent() {
  updateNote();
  updateGIF();
  updateProgressDots();

  const nextButton = document.getElementById("nextButton");
  const nextPageButton = document.getElementById("nextPageButton");

  if (currentIndex === notes.length - 1) {
    nextButton.classList.add("hidden"); // Hide Ahann button
    nextPageButton.classList.remove("hidden"); // Show next page button
  } else {
    nextButton.classList.remove("hidden"); // Show Ahann button
    nextPageButton.classList.add("hidden"); // Hide next page button
  }
}

// Update the love note with animation
function updateNote() {
  const noteText = document.getElementById("noteText");
  gsap.to(noteText, {
    opacity: 0,
    y: -20,
    duration: 0.5,
    onComplete: () => {
      noteText.textContent = notes[currentIndex];
      gsap.to(noteText, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "back.out",
      });
    },
  });
}

// Update the GIF display
function updateGIF() {
  const gifImg = document.getElementById("gifDisplay");
  gsap.to(gifImg, {
    opacity: 0,
    scale: 0.8,
    duration: 0.5,
    onComplete: () => {
      gifImg.src = gifs[currentIndex];
      gsap.to(gifImg, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "back.out",
      });
    },
  });
}

// Create progress dots
function createProgressDots() {
  const container = document.getElementById("progressDots");
  container.innerHTML = ""; // clear previous dots if any
  for (let i = 0; i < notes.length; i++) {
    const dot = document.createElement("div");
    dot.className = "w-3 h-3 rounded-full bg-pink-300";
    container.appendChild(dot);
  }
}

// Update progress dots
function updateProgressDots() {
  const dots = document.querySelectorAll("#progressDots div");
  dots.forEach((dot, index) => {
    if (index === currentIndex) {
      dot.className = "w-3 h-3 rounded-full bg-pink-500 beating";
    } else {
      dot.className = "w-3 h-3 rounded-full bg-pink-300";
    }
  });
}

// Handle next button click
document.getElementById("nextButton").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % notes.length;
  updateContent();
});

// Handle next page button click
document.getElementById("nextPageButton").addEventListener("click", () => {
  gsap.to("body", {
    opacity: 0,
    duration: 1,
    onComplete: () => (window.location.href = "final.html"),
  });
});

// Initialize the page
initialize();
