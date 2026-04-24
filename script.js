//Anastasija Bobere, ab25286
// const elements
const nav = document.querySelector("nav");
const links = document.querySelectorAll("nav ul li a");
const camera = document.querySelector("#camera_png");
const message = document.querySelector("#crystal-message");
const button_more_info = document.querySelector("#more_info_btn");
const button_less_info = document.querySelector("#less_info_btn");
const p_more_info = document.querySelector("#more_info_p");
const images = Array.from(document.querySelectorAll("#cards_home img"));
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const stickyNav = document.getElementById("stickyNav");

let index = 0;

// When clicked on a link it moves to a section and removes nav from view temporalily
links.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.add("hidden");
    setTimeout(() => {
      nav.classList.remove("hidden");
    }, 2000);
  });
});

/// Messages array AI generated (source: ChatGPT)
const messages = [
  "Every moment has a story — capture it before it fades.",
  "Great light often appears when you least expect it.",
  "Your perspective is your signature — keep refining it.",
  "A small shift in angle can change everything.",
  "Creativity grows in silence — pause and observe.",
  "Beauty hides in ordinary places — look again.",
  "Your next great shot is closer than you think.",
  "Focus on what matters — the rest will blur naturally.",
  "Photography is the art of noticing — today notice more.",
  "Chase light, not perfection.",
  "The world looks different through your lens — embrace that.",
  "Details make stories — pay attention to them.",
  "Every photograph is a poem made of light.",
  "Trust your eye — it sees what the heart feels.",
  "A moment becomes art the second you choose to frame it.",
  "Sometimes the best shot is the one you didn’t plan.",
  "Keep shooting — consistency creates masterpieces.",
  "An empty frame is an invitation to imagine.",
  "Follow the shadows — they lead to interesting places.",
  "Patience is the hidden ingredient of stunning photos.",
  "Your vision is evolving — let it surprise you.",
  "Great photos start with curiosity.",
  "The world changes every second — capture the change.",
  "You have an instinct for beauty — trust it.",
  "Inspiration often hides behind the next corner.",
  "Photograph what makes you feel something.",
  "Technical skills fade — vision stays.",
  "Even imperfect shots can tell perfect stories.",
  "Your style is forming — let it grow naturally.",
  "Small moments often make the most powerful images.",
  "See the world as if you’re seeing it for the first time.",
  "Every click is a step on your artistic journey.",
  "Your lens reveals what many overlook.",
  "Great photographers don’t wait — they anticipate.",
  "Seek authenticity, not aesthetics.",
  "Light is a language — learn to speak it.",
  "Creativity thrives when you explore.",
  "The best stories are captured, not created.",
  "Your photos will inspire someone — keep going.",
  "A fresh perspective can change an entire scene.",
  "Your passion shows in every frame.",
  "Practice today — your future self will thank you.",
  "Chase the sun, follow the moon — light is everywhere.",
  "Photography is controlled magic — keep experimenting.",
  "The moment you feel something — shoot.",
  "Your unique vision is your superpower.",
  "Good composition begins with a good feeling.",
  "Look for emotion, not perfection.",
  "Great shots happen when preparation meets chance.",
  "Let your photos breathe — simplicity is powerful.",
  "Every snapshot is a memory preserved forever.",
  "A camera is a passport to hidden worlds.",
  "Keep observing — inspiration loves an attentive mind.",
  "Your story matters — show it through your lens.",
  "Creativity is a journey, not a destination.",
  "Something beautiful is waiting to be captured today.",
];

//function for messages on click
camera.addEventListener("click", () => {
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  message.textContent = randomMessage;
  camera.classList.add("active");
  setTimeout(() => camera.classList.remove("active"), 700);
  setTimeout(() => {
    message.textContent = "Click the camera for a message...";
  }, 15000);
});

// JQuery selection and toogling of a text
$(document).ready(function () {
  $("#toggle_info_btn").on("click", function () {
    $("#more_info_p").fadeToggle(400);
    $(this).text($(this).text() === "Show Less" ? "Show More" : "Show Less");
  });
});

// form validation
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const fname = document.getElementById("fname").value.trim();
  const lname = document.getElementById("lname").value.trim();
  const email = document.getElementById("email").value.trim();
  const plan = document.querySelector('input[name="plan"]:checked');

  let errors = [];

  if (!fname) errors.push("First name is required.");

  if (!lname) errors.push("Last name is required.");
  if (!email) {
    errors.push("Email is required.");
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.push("Invalid email format.");
  }
  if (!plan) errors.push("Please select a plan.");

  if (errors.length > 0) {
    alert("Form errors:\n" + errors.join("\n"));
  } else {
    form.action = "https://www.w3schools.com/action_page.php";
    form.submit();
  }
});
const menuBtn = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
});

// View images in a gallery
images.forEach((img, i) => {
  img.addEventListener("click", () => {
    index = i;
    showImage();
    lightbox.style.display = "flex";
    stickyNav.style.display = "none";
    document.body.style.overflow = "hidden";
  });
});

function showImage() {
  lightboxImg.src = images[index].src;
}

// Next / Previous
document.getElementById("nextBtn").onclick = () => {
  index = (index + 1) % images.length;
  showImage();
};

document.getElementById("prevBtn").onclick = () => {
  index = (index - 1 + images.length) % images.length;
  showImage();
};

function closeLightbox() {
  lightbox.style.display = "none";
  stickyNav.style.display = "";
  document.body.style.overflow = "";
}

document.getElementById("closeBtn").onclick = closeLightbox;

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// Comments section with localStorage
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#commentForm");
  const commentsContainer = document.querySelector("#comments");

  // Load saved comments
  const savedComments = JSON.parse(localStorage.getItem("commentsList")) || [];
  console.log(savedComments.length); // 0
  if (savedComments.length === 0) {
    document.querySelector("#commentsH3").style.display = "none";
  }

  function addCommentToDOM({ firstName, lastName, message }) {
    const line = document.createElement("div");
    line.classList.add("comment-line");

    line.innerHTML = `
      <span class="comment-name">${firstName} ${lastName}:</span>
      <span>${message}</span>
    `;

    commentsContainer.appendChild(line);
  }

  savedComments.forEach(addCommentToDOM);

  // Handle new comment
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const firstName = form.querySelector("#fname").value.trim();
    const lastName = form.querySelector("#lname").value.trim();
    const message = form.querySelector("#message").value.trim();

    if (!firstName || !lastName || !message) {
      alert("Please fill in all fields.");
      return;
    }

    const newComment = { firstName, lastName, message };

    addCommentToDOM(newComment);

    savedComments.push(newComment);
    localStorage.setItem("commentsList", JSON.stringify(savedComments));

    form.reset();
  });
});
