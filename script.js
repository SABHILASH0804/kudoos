document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("generateBtn");
  const container = document.getElementById("slide-container");

const qaPairs = [
  { q: "Just Do It", a: "Nike" },
  { q: "I'm Lovin' It", a: "McDonald's" },
  { q: "Think Different", a: "Apple" },
  { q: "Because You're Worth It", a: "L'Oréal" },
  { q: "The Ultimate Driving Machine", a: "BMW" },
  { q: "Finger Lickin' Good", a: "KFC" },
  { q: "Have It Your Way", a: "Burger King" },
  { q: "Taste the Feeling", a: "Coca-Cola" },
  { q: "Melts in Your Mouth, Not in Your Hands", a: "M&M’s" },
  { q: "Think Big", a: "IBM" },
  { q: "Impossible is Nothing", a: "Adidas" },
  { q: "Connecting People", a: "Nokia" },
  { q: "Ideas for Life", a: "Panasonic" },
  { q: "What's in Your Wallet?", a: "Capital One" },
  { q: "Save Money. Live Better.", a: "Walmart" },
  { q: "Eat Fresh", a: "Subway" },
  { q: "Have a Break, Have a KitKat", a: "KitKat (Nestlé)" },
  { q: "Good Food, Good Life", a: "Nestlé" },
  { q: "Let’s Go Places", a: "Toyota" },
  { q: "The Best a Man Can Get", a: "Gillette" },
  { q: "Red Bull Gives You Wings", a: "Red Bull" },
  { q: "Betcha Can’t Eat Just One", a: "Lay’s" },
  { q: "Har Ghar Kuch Kehta Hai", a: "Asian Paints" },
  { q: "The Complete Man", a: "Raymond" },
  { q: "Zindagi ke Saath bhi, Zindagi ke Baad bhi", a: "LIC" },
  { q: "Desh Ki Dhadkan", a: "Hero Honda" },
  { q: "SBI – The Banker to Every Indian", a: "State Bank of India" },
  { q: "Connecting India", a: "BSNL" },
  { q: "What an Idea Sirji", a: "Idea Cellular" },
  { q: "Naye India ka Bazaar", a: "Reliance Retail" },
  { q: "Aam Aadmi ka Budget", a: "Big Bazaar" },
  { q: "Taste of India", a: "Amul" },
  { q: "Express Yourself", a: "Airtel" }
];


  const intro = document.getElementById("introScreen");
  const main = document.getElementById("mainScreen");
  const slideContainer = document.getElementById("slide-container");
  const generateBtn = document.getElementById("generateBtn");
  const mainTitle = document.getElementById("mainTitle");
  const navbar = document.getElementById("navbar");

  let positions = [];

  generateBtn.addEventListener("click", () => {
    intro.style.transition = "all 0.7s ease-in-out";
    intro.style.transform = "scale(1.5) rotate(720deg)";
    intro.style.opacity = 0;
    setTimeout(() => {
      intro.style.display = "none";
      main.style.display = "block";
      main.style.opacity = 1;
      main.classList.add("animated-background");

      const count = parseInt(document.getElementById("slideCount").value);
      const cols = Math.ceil(Math.sqrt(count));
      const rows = Math.ceil(count / cols);
      slideContainer.innerHTML = "";
      slideContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
      slideContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

      positions = [];
      for (let i = 0; i < count; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const bgX = (cols === 1) ? 0 : (col / (cols - 1)) * 100;
        const bgY = (rows === 1) ? 0 : (row / (rows - 1)) * 100;
        positions.push({ x: bgX, y: bgY });
      }

      const shuffledIndices = [...Array(count).keys()].sort(() => Math.random() - 0.5);
      const shuffledQA = qaPairs.sort(() => Math.random() - 0.5).slice(0, count);

      for (let i = 0; i < count; i++) {
        const card = document.createElement("div");
        card.className = "flip-card";
        card.style.width = "100%";
        card.style.height = "100%";

        const front = document.createElement("div");
        front.className = "card-face card-front";
        front.textContent = i + 1;

        const back = document.createElement("div");
        back.className = "card-face card-back";
        back.style.backgroundImage = "url('images/S ABHILASH.jpeg')";
        back.style.backgroundSize = `${cols * 100}% ${rows * 100}%`;

        const shuffledIndex = shuffledIndices[i];
        const segment = positions[shuffledIndex];
        back.style.backgroundPosition = `${segment.x}% ${segment.y}%`;

        card.appendChild(front);
        card.appendChild(back);

        let clickCount = 0;
        const qa = shuffledQA[i];

        card.addEventListener("click", () => {
          if (clickCount === 0) {
            front.textContent = qa.q;
          } else if (clickCount === 1) {
            front.textContent = qa.a;
          } else if (clickCount === 2) {
            card.classList.add("flipped");

            const flipped = document.querySelectorAll(".flip-card.flipped").length;
            if (flipped === count) {
              launchConfetti();

              setTimeout(() => {
                document.querySelectorAll(".flip-card").forEach((tile, index) => {
                  const newX = positions[index].x;
                  const newY = positions[index].y;
                  const backFace = tile.querySelector(".card-back");
                  backFace.style.transition = "background-position 2s ease-in-out";
                  backFace.style.backgroundPosition = `${newX}% ${newY}%`;
                });
              }, 800);

              setTimeout(() => {
                navbar.classList.add("bombart");
                mainTitle.textContent = "KUDOS LOGO LAUNCH";
                mainTitle.classList.add("title-transition");
              }, 2500);

              setTimeout(() => {
                slideContainer.style.transition = "all 1.2s ease-in-out";
                slideContainer.innerHTML = "";
                const fullImage = document.createElement("div");
                fullImage.style.backgroundImage = "url('images/S ABHILASH.jpeg')";
                fullImage.style.backgroundSize = "100% 100%";
                fullImage.style.backgroundRepeat = "no-repeat";
                fullImage.style.backgroundPosition = "center";
                fullImage.style.width = slideContainer.offsetWidth + "px";
                fullImage.style.height = slideContainer.offsetHeight + "px";
                fullImage.style.animation = "zoomIn 1.2s ease-out forwards";
                slideContainer.appendChild(fullImage);
              }, 3500);
            }
          }
          clickCount++;
        });

        slideContainer.appendChild(card);
      }
    }, 700);
  });

  function launchConfetti() {
    const canvas = document.createElement("canvas");
    canvas.id = "confettiCanvas";
    canvas.style.position = "fixed";
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = 9999;
    document.body.appendChild(canvas);

    const context = canvas.getContext("2d");
    const pieces = [];
    const numPieces = 100;

    for (let i = 0; i < numPieces; i++) {
      pieces.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight - window.innerHeight,
        radius: Math.random() * 6 + 4,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        speed: Math.random() * 3 + 2,
        sway: Math.random() * 10 + 2,
        angle: Math.random() * Math.PI * 2
      });
    }

    function draw() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of pieces) {
        context.beginPath();
        context.arc(p.x + Math.sin(p.angle) * p.sway, p.y, p.radius, 0, Math.PI * 2);
        context.fillStyle = p.color;
        context.fill();
        p.y += p.speed;
        p.angle += 0.02;
        if (p.y > window.innerHeight) p.y = -10;
      }
      requestAnimationFrame(draw);
    }
    draw();

    setTimeout(() => {
      canvas.remove();
    }, 4000);
  }
});
