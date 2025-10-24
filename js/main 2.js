// Helikopter Spel
const game = {
  helicopter: null,
  position: { x: 300, y: 200 },
  speed: 3,
  score: 0,
  playerName: '',
  currentMission: null,
  questionsAnswered: 0,
  drones: [],
  dronePursuit: {
    enabled: true,
    speed: 1,
    chaseRadius: 100,
    retreatRadius: 50,
    retreatSpeed: 0.5,
    retreatDirection: 1, // 1 voor terug, -1 voor vooruit
    retreatTimer: null,
    retreatStartTime: null
  },
  missions: [
    // === PROVINCIE VRAGEN MET HOOFDSTAD === (Moeilijkheid: 3)
    { text: 'Vlieg naar de provincie met Groningen als hoofdstad', target: 'Groningen', type: 'fly', difficulty: 3 },
    { text: 'Vlieg naar de provincie met Leeuwarden als hoofdstad', target: 'Friesland', type: 'fly', difficulty: 3 },
    { text: 'Vlieg naar de provincie met Assen als hoofdstad', target: 'Drenthe', type: 'fly', difficulty: 3 },
    { text: 'Vlieg naar de provincie met Zwolle als hoofdstad', target: 'Overijssel', type: 'fly', difficulty: 3 },
    { text: 'Vlieg naar de provincie met Lelystad als hoofdstad', target: 'Flevoland', type: 'fly', difficulty: 3 },
    { text: 'Vlieg naar de provincie met Arnhem als hoofdstad', target: 'Gelderland', type: 'fly', difficulty: 3 },
    { text: 'Vlieg naar de provincie met Utrecht als hoofdstad', target: 'Utrecht', type: 'fly', difficulty: 2 },
    { text: 'Vlieg naar de provincie met Haarlem als hoofdstad', target: 'NoordHolland', type: 'fly', difficulty: 3 },
    { text: 'Vlieg naar de provincie met Den Haag als hoofdstad', target: 'ZuidHolland', type: 'fly', difficulty: 2 },
    { text: 'Vlieg naar de provincie met Middelburg als hoofdstad', target: 'Zeeland', type: 'fly', difficulty: 4 },
    { text: 'Vlieg naar de provincie met \'s-Hertogenbosch als hoofdstad', target: 'NoordBrabant', type: 'fly', difficulty: 4 },
    { text: 'Vlieg naar de provincie met Maastricht als hoofdstad', target: 'Limburg', type: 'fly', difficulty: 2 },
    
    // === HOOFDSTAD VRAGEN === (Moeilijkheid: 2-3)
    { text: 'Vlieg naar de hoofdstad van Groningen', target: 'Groningen', type: 'fly', difficulty: 2 },
    { text: 'Vlieg naar de hoofdstad van Friesland', target: 'Friesland', type: 'fly', difficulty: 3 },
    { text: 'Vlieg naar de hoofdstad van Drenthe', target: 'Drenthe', type: 'fly', difficulty: 3 },
    { text: 'Vlieg naar de hoofdstad van Overijssel', target: 'Overijssel', type: 'fly', difficulty: 3 },
    { text: 'Vlieg naar de hoofdstad van Flevoland', target: 'Flevoland', type: 'fly', difficulty: 3 },
    { text: 'Vlieg naar de hoofdstad van Gelderland', target: 'Gelderland', type: 'fly', difficulty: 3 },
    { text: 'Vlieg naar de hoofdstad van Utrecht', target: 'Utrecht', type: 'fly', difficulty: 2 },
    { text: 'Vlieg naar de hoofdstad van Noord-Holland', target: 'NoordHolland', type: 'fly', difficulty: 3 },
    { text: 'Vlieg naar de hoofdstad van Zuid-Holland', target: 'ZuidHolland', type: 'fly', difficulty: 2 },
    { text: 'Vlieg naar de hoofdstad van Zeeland', target: 'Zeeland', type: 'fly', difficulty: 4 },
    { text: 'Vlieg naar de hoofdstad van Noord-Brabant', target: 'NoordBrabant', type: 'fly', difficulty: 4 },
    { text: 'Vlieg naar de hoofdstad van Limburg', target: 'Limburg', type: 'fly', difficulty: 2 },
    
    // === DIRECTE PROVINCIE VRAGEN === (Moeilijkheid: 1-2)
    { text: 'Vlieg naar Groningen', target: 'Groningen', type: 'fly', difficulty: 1 },
    { text: 'Vlieg naar Friesland', target: 'Friesland', type: 'fly', difficulty: 1 },
    { text: 'Vlieg naar Drenthe', target: 'Drenthe', type: 'fly', difficulty: 2 },
    { text: 'Vlieg naar Overijssel', target: 'Overijssel', type: 'fly', difficulty: 2 },
    { text: 'Vlieg naar Flevoland', target: 'Flevoland', type: 'fly', difficulty: 2 },
    { text: 'Vlieg naar Gelderland', target: 'Gelderland', type: 'fly', difficulty: 1 },
    { text: 'Vlieg naar Utrecht', target: 'Utrecht', type: 'fly', difficulty: 2 },
    { text: 'Vlieg naar Noord-Holland', target: 'NoordHolland', type: 'fly', difficulty: 1 },
    { text: 'Vlieg naar Zuid-Holland', target: 'ZuidHolland', type: 'fly', difficulty: 1 },
    { text: 'Vlieg naar Zeeland', target: 'Zeeland', type: 'fly', difficulty: 2 },
    { text: 'Vlieg naar Noord-Brabant', target: 'NoordBrabant', type: 'fly', difficulty: 1 },
    { text: 'Vlieg naar Limburg', target: 'Limburg', type: 'fly', difficulty: 1 },
    
    // === WADDENEILANDEN === (Moeilijkheid: 4-5)
    { text: 'Vlieg naar Texel', target: 'Texel', type: 'island', difficulty: 4 },
    { text: 'Vlieg naar Vlieland', target: 'Vlieland', type: 'island', difficulty: 5 },
    { text: 'Vlieg naar Terschelling', target: 'Terschelling', type: 'island', difficulty: 4 },
    { text: 'Vlieg naar Ameland', target: 'Ameland', type: 'island', difficulty: 5 },
    { text: 'Vlieg naar Schiermonnikoog', target: 'Schiermonnikoog', type: 'island', difficulty: 5 },
    { text: 'Haal water uit de Waddenzee', target: 'Waddenzee', type: 'water', difficulty: 3 },
    { text: 'Land op de Afsluitdijk', target: 'Afsluitdijk', type: 'special', difficulty: 5 },
    
    // === RESCUE MISSIES === (Moeilijkheid: 2-4)
    { text: 'Red iemand in Groningen', target: 'Groningen', type: 'rescue', difficulty: 2 },
    { text: 'Red iemand in Leeuwarden', target: 'Friesland', type: 'rescue', difficulty: 3 },
    { text: 'Red iemand in Assen', target: 'Drenthe', type: 'rescue', difficulty: 3 },
    { text: 'Red iemand in Zwolle', target: 'Overijssel', type: 'rescue', difficulty: 3 },
    { text: 'Red iemand in Arnhem', target: 'Gelderland', type: 'rescue', difficulty: 3 },
    { text: 'Red iemand in Utrecht', target: 'Utrecht', type: 'rescue', difficulty: 2 },
    { text: 'Red iemand in Den Haag', target: 'ZuidHolland', type: 'rescue', difficulty: 2 },
    { text: 'Red iemand in Maastricht', target: 'Limburg', type: 'rescue', difficulty: 2 },
    { text: 'Red iemand op Texel', target: 'Texel', type: 'rescue', difficulty: 4 },
    { text: 'Red iemand op Ameland', target: 'Ameland', type: 'rescue', difficulty: 5 },
    { text: 'Red iemand op Schiermonnikoog', target: 'Schiermonnikoog', type: 'rescue', difficulty: 5 },
    
    // === TRANSPORT MISSIES === (Moeilijkheid: 4-5)
    { text: 'Breng iemand van Groningen naar Limburg', target: 'Groningen', type: 'transport', destination: 'Limburg', difficulty: 5 },
    { text: 'Breng iemand van Noord-Holland naar Overijssel', target: 'NoordHolland', type: 'transport', destination: 'Overijssel', difficulty: 4 },
    { text: 'Breng iemand van Zeeland naar Groningen', target: 'Zeeland', type: 'transport', destination: 'Groningen', difficulty: 5 },
    { text: 'Breng iemand van Friesland naar Noord-Brabant', target: 'Friesland', type: 'transport', destination: 'NoordBrabant', difficulty: 4 },
    { text: 'Breng iemand van Limburg naar Friesland', target: 'Limburg', type: 'transport', destination: 'Friesland', difficulty: 5 },
    { text: 'Breng iemand van Utrecht naar Zeeland', target: 'Utrecht', type: 'transport', destination: 'Zeeland', difficulty: 4 },
    { text: 'Breng iemand van Drenthe naar Zuid-Holland', target: 'Drenthe', type: 'transport', destination: 'ZuidHolland', difficulty: 4 },
    { text: 'Breng iemand van Gelderland naar Flevoland', target: 'Gelderland', type: 'transport', destination: 'Flevoland', difficulty: 3 },
    { text: 'Breng voedsel van Noord-Brabant naar Drenthe', target: 'NoordBrabant', type: 'transport', destination: 'Drenthe', difficulty: 4 },
    { text: 'Breng medicijnen van Zuid-Holland naar Groningen', target: 'ZuidHolland', type: 'transport', destination: 'Groningen', difficulty: 5 },
    { text: 'Breng pakketten van Overijssel naar Limburg', target: 'Overijssel', type: 'transport', destination: 'Limburg', difficulty: 4 },
    { text: 'Breng iemand van Texel naar Ameland', target: 'Texel', type: 'transport', destination: 'Ameland', difficulty: 5 },
    
    // === PICKUP MISSIES === (Moeilijkheid: 2)
    { text: 'Haal voedsel uit Zeeland', target: 'Zeeland', type: 'pickup', difficulty: 2 },
    { text: 'Haal voedsel uit Groningen', target: 'Groningen', type: 'pickup', difficulty: 2 },
    { text: 'Haal voedsel uit Noord-Brabant', target: 'NoordBrabant', type: 'pickup', difficulty: 2 },
    { text: 'Haal medicijnen uit Utrecht', target: 'Utrecht', type: 'pickup', difficulty: 2 },
    { text: 'Haal pakketten uit Gelderland', target: 'Gelderland', type: 'pickup', difficulty: 2 },
    { text: 'Haal brandstof uit Zuid-Holland', target: 'ZuidHolland', type: 'pickup', difficulty: 2 }
  ],
  usedMissions: [],
  transportStep: 0,
  keys: {},
  // Coördinaten voor Waddeneilanden en Waddenzee (relatief t.o.v. SVG viewBox)
  specialLocations: {
    'Texel': { x: 240, y: 150, radius: 40 },
    'Vlieland': { x: 290, y: 110, radius: 35 },
    'Terschelling': { x: 330, y: 95, radius: 40 },
    'Ameland': { x: 380, y: 85, radius: 35 },
    'Schiermonnikoog': { x: 450, y: 75, radius: 35 },
    'Waddenzee': { x: 350, y: 100, radius: 100 },
    'Afsluitdijk': { x: 265, y: 165, radius: 50 }
  }
};

// Audio context voor geluiden
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playSound(frequency, duration, type = 'sine') {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.value = frequency;
  oscillator.type = type;
  
  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);
}

function playHelicopterSound() {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.value = 80;
  oscillator.type = 'sawtooth';
  
  gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
  
  oscillator.start();
  
  return { oscillator, gainNode };
}

function playSuccessSound() {
  playSound(523, 0.2);
  setTimeout(() => playSound(659, 0.2), 200);
  setTimeout(() => playSound(784, 0.3), 400);
}

function playErrorSound() {
  playSound(200, 0.3, 'square');
  setTimeout(() => playSound(150, 0.4, 'square'), 300);
}

function playLandingSound() {
  playSound(300, 0.15);
  setTimeout(() => playSound(250, 0.15), 150);
}

document.addEventListener('DOMContentLoaded', () => {
  // Maak naam invoer scherm
  showNameInput();
});

function showNameInput() {
  const nameScreen = document.createElement('div');
  nameScreen.id = 'name-screen';
  nameScreen.innerHTML = `
    <div class="name-box">
      <h1>🚁 Helikopter Topografie</h1>
      <p>Voer je naam in:</p>
      <input type="text" id="player-name" maxlength="15" placeholder="Je naam">
      <button id="start-btn">Start Spel</button>
      <button id="highscore-btn">Bekijk Highscores</button>
    </div>
  `;
  document.body.appendChild(nameScreen);
  
  document.getElementById('start-btn').addEventListener('click', startGame);
  document.getElementById('player-name').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') startGame();
  });
  document.getElementById('highscore-btn').addEventListener('click', showHighscores);
  
  document.getElementById('player-name').focus();
}

function startGame() {
  const nameInput = document.getElementById('player-name');
  const name = nameInput.value.trim();
  
  if (!name) {
    alert('Voer eerst je naam in!');
    return;
  }
  
  game.playerName = name;
  game.score = 0;
  game.usedMissions = [];
  
  // Verwijder naam scherm
  document.getElementById('name-screen').remove();
  
  // Maak helikopter element
  game.helicopter = document.createElement('div');
  game.helicopter.id = 'helicopter';
  game.helicopter.innerHTML = '🚁';
  document.body.appendChild(game.helicopter);
  
  // Maak UI elementen
  const missionDisplay = document.createElement('div');
  missionDisplay.id = 'mission';
  document.body.appendChild(missionDisplay);
  
  const difficultyDisplay = document.createElement('div');
  difficultyDisplay.id = 'difficulty';
  document.body.appendChild(difficultyDisplay);
  
  const scoreDisplay = document.createElement('div');
  scoreDisplay.id = 'score';
  scoreDisplay.textContent = `${game.playerName}: 0 punten`;
  document.body.appendChild(scoreDisplay);
  
  const feedback = document.createElement('div');
  feedback.id = 'feedback';
  document.body.appendChild(feedback);
  
  const instructions = document.createElement('div');
  instructions.id = 'instructions';
  instructions.innerHTML = 'Pijltjestoetsen = vliegen | SPATIE = landen';
  document.body.appendChild(instructions);
  
  const stopBtn = document.createElement('button');
  stopBtn.id = 'stop-btn';
  stopBtn.textContent = 'Stop Spel';
  stopBtn.addEventListener('click', endGame);
  document.body.appendChild(stopBtn);
  
  // Highscore display (altijd zichtbaar)
  const highscorePanel = document.createElement('div');
  highscorePanel.id = 'highscore-panel';
  highscorePanel.innerHTML = '<h3>🏆 Top 5</h3><ol id="live-highscores"></ol>';
  document.body.appendChild(highscorePanel);
  updateLiveHighscores();
  
  // Start eerste missie
  newMission();
  
  // Helikopter geluid (continu)
  let heliSound = null;
  
  // Keyboard controls
  document.addEventListener('keydown', (e) => {
    game.keys[e.key] = true;
    
    // Start helikopter geluid bij eerste toets
    if (!heliSound && (e.key.startsWith('Arrow') || e.key === ' ')) {
      heliSound = playHelicopterSound();
    }
    
    // Spatie = landen
    if (e.key === ' ') {
      e.preventDefault();
      checkLanding();
    }
  });
  
  document.addEventListener('keyup', (e) => {
    game.keys[e.key] = false;
  });
  
  // Hover effect op provincies
  const provincePaths = document.querySelectorAll('#nederland path');
  provincePaths.forEach((pathEl) => {
    pathEl.addEventListener('mouseenter', () => {
      pathEl.style.filter = 'brightness(1.12)';
    });
    pathEl.addEventListener('mouseleave', () => {
      pathEl.style.filter = '';
    });
  });
  
  // Game loop
  function gameLoop() {
    // Beweeg helikopter
    if (game.keys['ArrowUp']) game.position.y -= game.speed;
    if (game.keys['ArrowDown']) game.position.y += game.speed;
    if (game.keys['ArrowLeft']) game.position.x -= game.speed;
    if (game.keys['ArrowRight']) game.position.x += game.speed;
    
    // Beperk binnen scherm
    const maxX = window.innerWidth - 50;
    const maxY = window.innerHeight - 50;
    game.position.x = Math.max(0, Math.min(maxX, game.position.x));
    game.position.y = Math.max(0, Math.min(maxY, game.position.y));
    
    // Update helikopter positie
    game.helicopter.style.left = game.position.x + 'px';
    game.helicopter.style.top = game.position.y + 'px';
    
    // Beweeg drones
    game.drones.forEach(drone => {
      const newX = drone.x + drone.vx;
      const newY = drone.y + drone.vy;
      
      // Check of nieuwe positie boven Nederland is
      const elements = document.elementsFromPoint(newX + 15, newY + 15);
      const overNederland = elements.find(el => el.tagName === 'path' && el.id);
      
      // Als boven Nederland, beweeg. Anders bounce terug
      if (overNederland) {
        drone.x = newX;
        drone.y = newY;
      } else {
        // Bounce: keer richting om
        drone.vx *= -1;
        drone.vy *= -1;
      }
      
      drone.element.style.left = drone.x + 'px';
      drone.element.style.top = drone.y + 'px';
      
      // Check botsing met helikopter
      const dx = drone.x - game.position.x;
      const dy = drone.y - game.position.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 30) {
        game.score -= 1;
        updateScore();
        showFeedback('BOTSING MET DRONE! -1 punt', false);
        // Verplaats drone naar willekeurige provincie
        repositionDroneOverNetherlands(drone);
      }
    });
    
    requestAnimationFrame(gameLoop);
  }
  
  gameLoop();
}

function newMission() {
  game.transportStep = 0;
  game.questionsAnswered++;
  
  // Spawn drone elke 3 vragen (max 5 drones)
  if (game.questionsAnswered % 3 === 0 && game.drones.length < 5) {
    spawnDrone();
  }
  
  // Als alle missies zijn gebruikt, reset de lijst
  if (game.usedMissions.length >= game.missions.length) {
    game.usedMissions = [];
  }
  
  // Kies een missie die nog niet gebruikt is
  let availableMissions = game.missions.filter((mission, index) => 
    !game.usedMissions.includes(index)
  );
  
  const randomIndex = Math.floor(Math.random() * availableMissions.length);
  game.currentMission = availableMissions[randomIndex];
  
  // Markeer deze missie als gebruikt
  const originalIndex = game.missions.indexOf(game.currentMission);
  game.usedMissions.push(originalIndex);
  
  const missionDisplay = document.getElementById('mission');
  missionDisplay.textContent = game.currentMission.text;
  missionDisplay.className = '';
  
  // Toon moeilijkheidsgraad
  const difficultyDisplay = document.getElementById('difficulty');
  if (difficultyDisplay) {
    const stars = '⭐'.repeat(game.currentMission.difficulty);
    difficultyDisplay.textContent = `${stars} (${game.currentMission.difficulty} ${game.currentMission.difficulty === 1 ? 'punt' : 'punten'})`;
  }
}

function spawnDrone() {
  const drone = {
    x: 0,
    y: 0,
    vx: (Math.random() - 0.5) * 3,
    vy: (Math.random() - 0.5) * 3,
    element: document.createElement('div')
  };
  
  // Positioneer drone boven Nederland
  repositionDroneOverNetherlands(drone);
  
  drone.element.className = 'drone';
  drone.element.innerHTML = '🛸';
  drone.element.style.left = drone.x + 'px';
  drone.element.style.top = drone.y + 'px';
  document.body.appendChild(drone.element);
  
  game.drones.push(drone);
  
  showFeedback(`WAARSCHUWING: Drone ${game.drones.length} gespot!`, false);
}

function repositionDroneOverNetherlands(drone) {
  // Probeer maximaal 100 keer een positie te vinden boven Nederland
  for (let i = 0; i < 100; i++) {
    const testX = Math.random() * (window.innerWidth - 100) + 50;
    const testY = Math.random() * (window.innerHeight - 100) + 50;
    
    const elements = document.elementsFromPoint(testX, testY);
    const overNederland = elements.find(el => el.tagName === 'path' && el.id);
    
    if (overNederland) {
      drone.x = testX;
      drone.y = testY;
      return;
    }
  }
  
  // Fallback: centrum van het scherm
  drone.x = window.innerWidth / 2;
  drone.y = window.innerHeight / 2;
}

function endGame() {
  if (confirm(`Weet je zeker dat je wilt stoppen?\n\nJe huidige score is: ${game.score} punten`)) {
    saveHighscore();
  }
}

function checkLanding() {
  playLandingSound();
  
  const heliRect = game.helicopter.getBoundingClientRect();
  const heliCenter = {
    x: heliRect.left + heliRect.width / 2,
    y: heliRect.top + heliRect.height / 2
  };
  
  let locationId = null;
  
  // Check eerst of we boven een speciaal gebied zijn (Waddeneilanden/Waddenzee)
  const svg = document.getElementById('nederland');
  const svgRect = svg.getBoundingClientRect();
  const svgPoint = svg.createSVGPoint();
  svgPoint.x = heliCenter.x;
  svgPoint.y = heliCenter.y;
  const svgCoords = svgPoint.matrixTransform(svg.getScreenCTM().inverse());
  
  // Check speciale locaties
  for (const [name, location] of Object.entries(game.specialLocations)) {
    const dx = svgCoords.x - location.x;
    const dy = svgCoords.y - location.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    console.log(`Check ${name}: SVG coords (${svgCoords.x.toFixed(1)}, ${svgCoords.y.toFixed(1)}), distance: ${distance.toFixed(1)}, radius: ${location.radius}`);
    
    if (distance <= location.radius) {
      locationId = name;
      console.log(`✓ Gevonden: ${name}`);
      break;
    }
  }
  
  // Als geen speciaal gebied, check provincie
  if (!locationId) {
    const elements = document.elementsFromPoint(heliCenter.x, heliCenter.y);
    const provincePath = elements.find(el => el.tagName === 'path' && el.id);
    
    if (!provincePath) {
      showFeedback('FOUT - Je bent niet boven een provincie of eiland!', false);
      return;
    }
    
    locationId = provincePath.id;
    console.log('Gedetecteerde locatie:', locationId, 'Target:', game.currentMission.target);
  }
  
  const points = game.currentMission.difficulty;
  
  // Check transport missie (2 stappen)
  if (game.currentMission.type === 'transport') {
    if (game.transportStep === 0) {
      // Eerste stap: ophalen
      if (locationId === game.currentMission.target) {
        game.transportStep = 1;
        showFeedback('GOED - Opgehaald! Vlieg nu naar ' + getLocationName(game.currentMission.destination), true);
        const missionDisplay = document.getElementById('mission');
        missionDisplay.textContent = 'Breng naar ' + getLocationName(game.currentMission.destination);
      } else {
        game.score -= points;
        updateScore();
        showFeedback(`FOUT - Dit is niet ${getLocationName(game.currentMission.target)}! -${points} ${points === 1 ? 'punt' : 'punten'}`, false);
      }
    } else {
      // Tweede stap: afleveren
      if (locationId === game.currentMission.destination) {
        game.score += points;
        updateScore();
        showFeedback(`GOED - Missie voltooid! +${points} ${points === 1 ? 'punt' : 'punten'}`, true);
        setTimeout(newMission, 2000);
      } else {
        game.score -= points;
        updateScore();
        showFeedback(`FOUT - Dit is niet ${getLocationName(game.currentMission.destination)}! -${points} ${points === 1 ? 'punt' : 'punten'}`, false);
      }
    }
  } else {
    // Normale missie
    if (locationId === game.currentMission.target) {
      game.score += points;
      updateScore();
      showFeedback(`GOED - Missie voltooid! +${points} ${points === 1 ? 'punt' : 'punten'}`, true);
      setTimeout(newMission, 2000);
    } else {
      game.score -= points;
      updateScore();
      showFeedback(`FOUT - Dit is niet ${getLocationName(game.currentMission.target)}! -${points} ${points === 1 ? 'punt' : 'punten'}`, false);
    }
  }
}

function showFeedback(message, success) {
  const feedback = document.getElementById('feedback');
  feedback.textContent = message;
  feedback.className = success ? 'success' : 'error';
  
  if (success) {
    playSuccessSound();
  } else {
    playErrorSound();
  }
  
  setTimeout(() => {
    feedback.className = '';
  }, 2000);
}

function updateScore() {
  const scoreDisplay = document.getElementById('score');
  scoreDisplay.textContent = `${game.playerName}: ${game.score} ${game.score === 1 ? 'punt' : 'punten'}`;
  
  // Maak score rood als negatief
  if (game.score < 0) {
    scoreDisplay.style.color = '#f44336';
    scoreDisplay.style.fontWeight = 'bold';
  } else {
    scoreDisplay.style.color = '#4CAF50';
    scoreDisplay.style.fontWeight = 'bold';
  }
  
  // Check of dit een nieuwe highscore is
  checkHighscore();
  
  // Update live highscores display
  updateLiveHighscores();
}

function checkHighscore() {
  const highscores = getHighscores();
  const lowestScore = highscores.length < 5 ? -Infinity : highscores[4].score;
  
  if (game.score > lowestScore) {
    // Nieuwe highscore!
    const scoreDisplay = document.getElementById('score');
    scoreDisplay.style.animation = 'pulse 0.5s';
    setTimeout(() => {
      scoreDisplay.style.animation = '';
    }, 500);
  }
}

function saveHighscore() {
  const highscores = getHighscores();
  highscores.push({
    name: game.playerName,
    score: game.score,
    date: new Date().toLocaleDateString('nl-NL')
  });
  
  // Sorteer op score (hoogste eerst) en houd top 5
  highscores.sort((a, b) => b.score - a.score);
  const top5 = highscores.slice(0, 5);
  
  localStorage.setItem('helikopterHighscores', JSON.stringify(top5));
  
  showHighscoresAfterGame();
}

function getHighscores() {
  const stored = localStorage.getItem('helikopterHighscores');
  return stored ? JSON.parse(stored) : [];
}

function showHighscores() {
  const highscores = getHighscores();
  
  let html = '<div class="highscore-box"><h2>🏆 Top 5 Highscores</h2>';
  
  if (highscores.length === 0) {
    html += '<p>Nog geen highscores!</p>';
  } else {
    html += '<ol class="highscore-list">';
    highscores.forEach((score, index) => {
      html += `<li>
        <span class="rank">${index + 1}.</span>
        <span class="name">${score.name}</span>
        <span class="score">${score.score} punten</span>
        <span class="date">${score.date}</span>
      </li>`;
    });
    html += '</ol>';
  }
  
  html += '<button id="close-highscores">Sluiten</button></div>';
  
  const overlay = document.createElement('div');
  overlay.id = 'highscore-overlay';
  overlay.innerHTML = html;
  document.body.appendChild(overlay);
  
  document.getElementById('close-highscores').addEventListener('click', () => {
    overlay.remove();
  });
}

function showHighscoresAfterGame() {
  const highscores = getHighscores();
  const playerRank = highscores.findIndex(h => h.name === game.playerName && h.score === game.score) + 1;
  
  let html = '<div class="highscore-box"><h2>🏆 Spel Afgelopen!</h2>';
  html += `<p class="final-score">Je score: ${game.score} punten</p>`;
  
  if (playerRank > 0 && playerRank <= 5) {
    html += `<p class="rank-message">🎉 Gefeliciteerd! Je staat op plaats ${playerRank}!</p>`;
  }
  
  html += '<h3>Top 5 Highscores</h3><ol class="highscore-list">';
  highscores.forEach((score, index) => {
    const isPlayer = score.name === game.playerName && score.score === game.score;
    html += `<li class="${isPlayer ? 'current-player' : ''}">
      <span class="rank">${index + 1}.</span>
      <span class="name">${score.name}</span>
      <span class="score">${score.score} punten</span>
      <span class="date">${score.date}</span>
    </li>`;
  });
  html += '</ol>';
  
  html += '<button id="play-again">Opnieuw Spelen</button></div>';
  
  const overlay = document.createElement('div');
  overlay.id = 'highscore-overlay';
  overlay.innerHTML = html;
  document.body.appendChild(overlay);
  
  document.getElementById('play-again').addEventListener('click', () => {
    location.reload();
  });
}

function getLocationName(id) {
  const names = {
    'Groningen': 'Groningen',
    'Friesland': 'Friesland',
    'Drenthe': 'Drenthe',
    'Overijssel': 'Overijssel',
    'Flevoland': 'Flevoland',
    'Gelderland': 'Gelderland',
    'Utrecht': 'Utrecht',
    'NoordHolland': 'Noord-Holland',
    'ZuidHolland': 'Zuid-Holland',
    'Zeeland': 'Zeeland',
    'NoordBrabant': 'Noord-Brabant',
    'Limburg': 'Limburg',
    'Texel': 'Texel',
    'Vlieland': 'Vlieland',
    'Terschelling': 'Terschelling',
    'Ameland': 'Ameland',
    'Schiermonnikoog': 'Schiermonnikoog',
    'Waddenzee': 'de Waddenzee',
    'Afsluitdijk': 'de Afsluitdijk'
  };
  return names[id] || id;
}

function updateLiveHighscores() {
  const highscores = getHighscores();
  const list = document.getElementById('live-highscores');
  
  if (!list) return;
  
  if (highscores.length === 0) {
    list.innerHTML = '<li style="list-style: none; color: #999;">Nog geen scores</li>';
    return;
  }
  
  list.innerHTML = highscores.map((score, index) => {
    const isCurrentPlayer = score.name === game.playerName;
    const className = isCurrentPlayer ? 'current-player-live' : '';
    return `<li class="${className}">
      <span class="hs-name">${score.name}</span>
      <span class="hs-score">${score.score}</span>
    </li>`;
  }).join('');
}

