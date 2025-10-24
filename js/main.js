// Helikopter Spel

// Global AudioContext voor Safari compatibility
let globalAudioContext = null;

function getAudioContext() {
  if (!globalAudioContext) {
    globalAudioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (globalAudioContext.state === 'suspended') {
    globalAudioContext.resume();
  }
  return globalAudioContext;
}

const game = {
  helicopter: null,
  position: { x: 300, y: 200 },
  speed: 3,
  score: 5,
  playerName: '',
  currentMission: null,
  questionsAnswered: 0,
  drones: [],
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

    
    // === RESCUE MISSIES === (Moeilijkheid: 2-4)
    { text: 'Red iemand in Groningen', target: 'Groningen', type: 'rescue', difficulty: 2 },
    { text: 'Red iemand in Leeuwarden', target: 'Friesland', type: 'rescue', difficulty: 3 },
    { text: 'Red iemand in Assen', target: 'Drenthe', type: 'rescue', difficulty: 3 },
    { text: 'Red iemand in Zwolle', target: 'Overijssel', type: 'rescue', difficulty: 3 },
    { text: 'Red iemand in Arnhem', target: 'Gelderland', type: 'rescue', difficulty: 3 },
    { text: 'Red iemand in Utrecht', target: 'Utrecht', type: 'rescue', difficulty: 2 },
    { text: 'Red iemand in Den Haag', target: 'ZuidHolland', type: 'rescue', difficulty: 2 },
    { text: 'Red iemand in Maastricht', target: 'Limburg', type: 'rescue', difficulty: 2 },
    
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


function createTouchControls() {
  const touchControls = document.createElement('div');
  touchControls.id = 'touch-controls';
  
  // D-pad container
  const dpad = document.createElement('div');
  dpad.className = 'touch-dpad';
  
  // Pijltjes knoppen
  const directions = [
    { dir: 'up', key: 'ArrowUp', symbol: '▲' },
    { dir: 'left', key: 'ArrowLeft', symbol: '◀' },
    { dir: 'down', key: 'ArrowDown', symbol: '▼' },
    { dir: 'right', key: 'ArrowRight', symbol: '▶' }
  ];
  
  directions.forEach(({ dir, key, symbol }) => {
    const btn = document.createElement('div');
    btn.className = `touch-btn touch-${dir}`;
    btn.textContent = symbol;
    
    // Touch events
    btn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      game.keys[key] = true;
    });
    btn.addEventListener('touchend', (e) => {
      e.preventDefault();
      game.keys[key] = false;
    });
    
    // Mouse events (voor desktop testing)
    btn.addEventListener('mousedown', (e) => {
      e.preventDefault();
      game.keys[key] = true;
    });
    btn.addEventListener('mouseup', (e) => {
      e.preventDefault();
      game.keys[key] = false;
    });
    btn.addEventListener('mouseleave', () => {
      game.keys[key] = false;
    });
    
    dpad.appendChild(btn);
  });
  
  // Land knop
  const landBtn = document.createElement('div');
  landBtn.className = 'touch-land';
  landBtn.textContent = 'LAND';
  
  landBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    checkLanding();
  });
  landBtn.addEventListener('click', (e) => {
    e.preventDefault();
    checkLanding();
  });
  
  touchControls.appendChild(dpad);
  touchControls.appendChild(landBtn);
  document.body.appendChild(touchControls);
}



function playDroneAlarm() {
  const audioContext = getAudioContext();

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  // Siren geluid
  oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
  oscillator.frequency.setValueAtTime(400, audioContext.currentTime + 0.2);
  oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.4);
  
  gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.5);
}

function playGameOverSound() {
  const audioContext = getAudioContext();

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  // Dramatisch dalend geluid
  oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(110, audioContext.currentTime + 0.8);
  
  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.8);
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
      <h1>🚁 Topo Game</h1>
      <p>Voer je naam in:</p>
      <input type="text" id="player-name" maxlength="15" placeholder="Je naam">
      
      <button id="start-btn">Start Spel</button>
      <button id="highscore-btn">Bekijk Top 10</button>
      
      <div class="game-rules">
        <h3>📋 Spelregels</h3>
        <ul>
          <li>🎯 <strong>Start met 5 punten</strong></li>
          <li>✅ <strong>Goed antwoord:</strong> +1 tot +5 punten (afhankelijk van moeilijkheid ⭐)</li>
          <li>❌ <strong>Fout antwoord:</strong> -1 tot -5 punten</li>
          <li>🛸 <strong>3x geraakt door drone:</strong> Game Over! 💔💔💔</li>
          <li>😢 <strong>Score onder 0:</strong> Game Over!</li>
          <li>🏆 <strong>20 vragen goed:</strong> Gewonnen!</li>
        </ul>
        
        <h3>🎮 Besturing</h3>
        <p><strong>Desktop:</strong> Pijltjestoetsen + Spatie om te landen</p>
        <p><strong>Mobiel:</strong> D-pad + LAND knop</p>
        
        <p style="margin-top: 15px; font-size: 14px; color: #666;">
          Vlieg naar de juiste provincie en land met Spatie (of LAND knop).<br>
          Ontwijk de drones! Elke 3 vragen komt er een nieuwe drone bij.
        </p>
      </div>
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
  game.score = 5;
  game.running = true;
  game.scoreSaved = false;
  game.gameOver = false;
  game.droneHitCount = 0; // Reset drone hits
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
  scoreDisplay.textContent = `${game.playerName}: ${game.score} punten`;
  document.body.appendChild(scoreDisplay);
  
  // Drone lives indicator
  const droneLivesDisplay = document.createElement('div');
  droneLivesDisplay.id = 'drone-lives';
  droneLivesDisplay.innerHTML = '❤️❤️❤️ <span style="font-size: 12px; color: #fff;">Levens</span>';
  document.body.appendChild(droneLivesDisplay);
  
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
  highscorePanel.innerHTML = '<h3>🏆 Top 10</h3><ol id="live-highscores"></ol>';
  document.body.appendChild(highscorePanel);
  updateLiveHighscores();
  
  // Start eerste missie
  newMission();
  
  // Helikopter geluid (continu)
  let heliSound = null;
  
  // Keyboard controls
  game.keydownHandler = (e) => {
    if (!game.running) return; // Stop als game niet meer loopt
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
  };
  
  game.keyupHandler = (e) => {
    if (!game.running) return;
    game.keys[e.key] = false;
  };
  
  document.addEventListener('keydown', game.keydownHandler);
  document.addEventListener('keyup', game.keyupHandler);
  
  // Touch controls voor iPad/mobiel
  createTouchControls();
  
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
    if (!game.running) return; // Stop als game niet meer loopt
    
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
    
    // Beweeg drones (achtervolgen helikopter)
    game.drones.forEach(drone => {
      // Bereken richting naar helikopter
      const dx = game.position.x - drone.x;
      const dy = game.position.y - drone.y;
      const dist = Math.hypot(dx, dy) || 1;
      
      // Zet snelheid naar helikopter toe
      const speed = window.innerWidth < 768 ? 0.3 : 1.0;
      drone.vx = (dx / dist) * speed;
      drone.vy = (dy / dist) * speed;
      
      const newX = drone.x + drone.vx;
      const newY = drone.y + drone.vy;
      
      // Beweeg drone (soepele boundary check)
      drone.x = newX;
      drone.y = newY;
      
      // Beperk binnen scherm met margin
      const margin = 50;
      if (drone.x < margin || drone.x > window.innerWidth - margin) {
        drone.vx *= -1;
        drone.x = Math.max(margin, Math.min(window.innerWidth - margin, drone.x));
      }
      if (drone.y < margin || drone.y > window.innerHeight - margin) {
        drone.vy *= -1;
        drone.y = Math.max(margin, Math.min(window.innerHeight - margin, drone.y));
      }
      
      drone.element.style.left = drone.x + 'px';
      drone.element.style.top = drone.y + 'px';
      
      // Check botsing met helikopter
      const dx2 = drone.x - game.position.x;
      const dy2 = drone.y - game.position.y;
      const distance = Math.sqrt(dx2 * dx2 + dy2 * dy2);
      
      if (distance < 30) {
        game.droneHitCount++;
        game.score -= 1;
        updateScore();
        updateDroneLives();
        
        if (game.droneHitCount >= 3 && !game.gameOver) {
          // Game Over - 3x geraakt
          game.gameOver = true;
          playGameOverSound();
          showFeedback('Helaas, je bent af! 💔💔💔', false);
          setTimeout(() => {
            endGame(true);
          }, 1500);
        } else {
          const livesLeft = 3 - game.droneHitCount;
          showFeedback(`BOTSING MET DRONE! -1 punt (${livesLeft} ${livesLeft === 1 ? 'leven' : 'levens'} over)`, false);
        }
        
        // Verplaats drone naar willekeurige provincie
        repositionDroneOverNetherlands(drone);
      }
    });
    
    requestAnimationFrame(gameLoop);
  }
  
  gameLoop();
}

function newMission() {
  if (game.gameOver || !game.running) return; // Stop als game over
  
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
  // Langzamer op mobiel
  const droneSpeed = window.innerWidth < 768 ? 0.3 : 1.0;
  
  const drone = {
    x: 0,
    y: 0,
    vx: (Math.random() - 0.5) * droneSpeed,
    vy: (Math.random() - 0.5) * droneSpeed,
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

function endGame(saveScore = true) {
  game.running = false; // Stop game loop
  game.gameOver = true; // Mark as game over
  
  // Verwijder ALL event listeners
  document.removeEventListener('keydown', game.keydownHandler);
  document.removeEventListener('keyup', game.keyupHandler);
  
  // Verberg helicopter en drones
  if (game.helicopter) game.helicopter.style.display = 'none';
  game.drones.forEach(drone => {
    if (drone.element) drone.element.style.display = 'none';
  });
  
  // Verberg game UI
  const mission = document.getElementById('mission');
  const difficulty = document.getElementById('difficulty');
  const score = document.getElementById('score');
  const instructions = document.getElementById('instructions');
  const stopBtn = document.getElementById('stop-btn');
  const lives = document.getElementById('drone-lives');
  const touchControls = document.getElementById('touch-controls');
  
  if (mission) mission.style.display = 'none';
  if (difficulty) difficulty.style.display = 'none';
  if (score) score.style.display = 'none';
  if (instructions) instructions.style.display = 'none';
  if (stopBtn) stopBtn.style.display = 'none';
  if (lives) lives.style.display = 'none';
  if (touchControls) touchControls.style.display = 'none';
  
  if (saveScore) {
    saveHighscore();
  } else {
    showHighscoresAfterGame();
  }
}


function getChildFriendlyError(locationId, targetId, points) {
  const capital = getCapital(locationId);
  const location = getLocationName(locationId);
  const targetName = getLocationName(targetId);
  const targetCapital = getCapital(targetId);
  
  const messages = [
    `Oeps! 😅 Dit is ${location}${capital ? ' (hoofdstad: ' + capital + ')' : ''}. Je moest naar ${targetName}${targetCapital ? ' (hoofdstad: ' + targetCapital + ')' : ''}!`,
    `Jammer! 🤔 Je bent in ${location}${capital ? ' met hoofdstad ' + capital : ''} geland. Het moest ${targetName}${targetCapital ? ' met hoofdstad ' + targetCapital : ''} zijn!`,
    `Helaas! 😢 Dit is ${location}${capital ? ' (hoofdstad: ' + capital + ')' : ''}. Je moest naar ${targetName}${targetCapital ? ' (hoofdstad: ' + targetCapital + ')' : ''}!`
  ];
  const msg = messages[Math.floor(Math.random() * messages.length)];
  return `${msg} -${points} ${points === 1 ? 'punt' : 'punten'}`;
}

function getCapital(provinceId) {
  const capitals = {
    'Groningen': 'Groningen',
    'Friesland': 'Leeuwarden',
    'Drenthe': 'Assen',
    'Overijssel': 'Zwolle',
    'Flevoland': 'Lelystad',
    'Gelderland': 'Arnhem',
    'Utrecht': 'Utrecht',
    'NoordHolland': 'Haarlem',
    'ZuidHolland': 'Den Haag',
    'Zeeland': 'Middelburg',
    'NoordBrabant': "'s-Hertogenbosch",
    'Limburg': 'Maastricht'
  };
  return capitals[provinceId] || '';
}

function checkLanding() {
  playLandingSound();
  
  const heliRect = game.helicopter.getBoundingClientRect();
  const heliCenter = {
    x: heliRect.left + heliRect.width / 2,
    y: heliRect.top + heliRect.height / 2
  };
  
  let locationId = null;
  
  // Detect provincie via elementsFromPoint
  const elements = document.elementsFromPoint(heliCenter.x, heliCenter.y);
  
  // Zoek naar path element met id (dat is een provincie)
  for (const el of elements) {
    if (el.tagName === 'path' && el.id) {
      locationId = el.id;
      console.log('✅ Gedetecteerde locatie:', locationId, '| Target:', game.currentMission.target);
      break;
    }
  }
  
  if (!locationId) {
    console.log('❌ GEEN PROVINCIE GEVONDEN');
    showFeedback('FOUT - Je bent niet boven een provincie!', false);
    return;
  }
  
  const points = game.currentMission.difficulty;
  
  // Check transport missie (2 stappen)
  if (game.currentMission.type === 'transport') {
    if (game.transportStep === 0) {
      // Eerste stap: ophalen
      if (locationId === game.currentMission.target) {
        game.transportStep = 1;
        showFeedback('Top! 👍 Nu naar ' + getLocationName(game.currentMission.destination) + '!', true);
        const missionDisplay = document.getElementById('mission');
        missionDisplay.textContent = 'Breng naar ' + getLocationName(game.currentMission.destination);
      } else {
        game.score -= points;
        updateScore();
        showFeedback(getChildFriendlyError(locationId, game.currentMission.target, points), false);
        setTimeout(newMission, 1500);
      }
    } else {
      // Tweede stap: afleveren
      if (locationId === game.currentMission.destination) {
        game.score += points;
        updateScore();
        showFeedback(`Super! 🎉 +${points} ${points === 1 ? 'punt' : 'punten'}`, true);
        setTimeout(newMission, 2000);
      } else {
        game.score -= points;
        updateScore();
        showFeedback(getChildFriendlyError(locationId, game.currentMission.destination, points), false);
        setTimeout(newMission, 1500);
      }
    }
  } else {
    // Normale missie
    if (locationId === game.currentMission.target) {
      game.score += points;
      updateScore();
      showFeedback(`Super! 🎉 +${points} ${points === 1 ? 'punt' : 'punten'}`, true);
      setTimeout(newMission, 2000);
    } else {
      game.score -= points;
      updateScore();
      showFeedback(getChildFriendlyError(locationId, game.currentMission.target, points), false);
      setTimeout(newMission, 1500);
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
  
  // Check game over (onder 0 punten)
  if (game.score < 0 && !game.gameOver) {
    game.gameOver = true;
    setTimeout(() => {
      playGameOverSound();
      showFeedback('GAME OVER! Je score is onder 0 gekomen 😢', false);
      setTimeout(() => {
        endGame(true);
      }, 2000);
    }, 100);
  }
  
  // Check gewonnen (20 goede antwoorden)
  if (game.correctAnswers >= 20 && !game.gameOver) {
    game.gameOver = true;
    setTimeout(() => {
      showFeedback('🎉 GEWONNEN! Je hebt 20 vragen goed beantwoord! 🏆', true);
      setTimeout(() => {
        endGame(true);
      }, 2000);
    }, 100);
  }
}


function updateDroneLives() {
  const droneLivesDisplay = document.getElementById('drone-lives');
  if (!droneLivesDisplay) return;
  
  const livesLeft = 3 - game.droneHitCount;
  let hearts = '';
  
  // Rode hartjes voor levens over
  for (let i = 0; i < livesLeft; i++) {
    hearts += '❤️';
  }
  // Grijze/gebroken hartjes voor verloren levens
  for (let i = 0; i < game.droneHitCount; i++) {
    hearts += '💔';
  }
  
  droneLivesDisplay.innerHTML = `${hearts} <span style="font-size: 12px; color: #fff;">Levens</span>`;
  
  // Animatie bij hit
  droneLivesDisplay.style.animation = 'shake 0.5s';
  setTimeout(() => {
    droneLivesDisplay.style.animation = '';
  }, 500);
}

function checkHighscore() {
  // Don't wait for Firebase - just use fallback for now
  const stored = localStorage.getItem('helikopterHighscores');
  const highscores = stored ? JSON.parse(stored) : [];
  const lowestScore = highscores.length < 10 ? -Infinity : highscores[9].score;
  
  if (game.score > lowestScore) {
    // Nieuwe highscore!
    const scoreDisplay = document.getElementById('score');
    scoreDisplay.style.animation = 'pulse 0.5s';
    setTimeout(() => {
      scoreDisplay.style.animation = '';
    }, 500);
  }
}

async function saveHighscore() {
  // Voorkom dubbele saves
  if (game.scoreSaved) return;
  game.scoreSaved = true;
  
  try {
    // Sla op in Firebase
    await window.firebaseAddDoc(window.firebaseCollection(window.firebaseDB, 'highscores'), {
      name: game.playerName,
      score: game.score,
      date: new Date().toLocaleDateString('nl-NL'),
      timestamp: new Date()
    });
    
    console.log('✅ Highscore opgeslagen in Firebase!');
    
    // Wacht even en toon dan highscores
    setTimeout(() => {
      showHighscoresAfterGame();
    }, 500);
  } catch (error) {
    console.error('❌ Fout bij opslaan highscore:', error);
    // Fallback naar localStorage
    const highscores = await getHighscores();
    highscores.push({
      name: game.playerName,
      score: game.score,
      date: new Date().toLocaleDateString('nl-NL')
    });
    highscores.sort((a, b) => b.score - a.score);
    const top5 = highscores.slice(0, 10);
    localStorage.setItem('helikopterHighscores', JSON.stringify(top5));
    showHighscoresAfterGame();
  }
}

async function getHighscores() {
  try {
    const q = window.firebaseQuery(
      window.firebaseCollection(window.firebaseDB, 'highscores'),
      window.firebaseOrderBy('score', 'desc'),
      window.firebaseLimit(10)
    );
    
    const querySnapshot = await window.firebaseGetDocs(q);
    const highscores = [];
    querySnapshot.forEach((doc) => {
      highscores.push(doc.data());
    });
    
    return highscores;
  } catch (error) {
    console.error('❌ Fout bij ophalen highscores:', error);
    // Fallback naar localStorage
    const stored = localStorage.getItem('helikopterHighscores');
    return stored ? JSON.parse(stored) : [];
  }
}

async function showHighscores() {
  const highscores = await getHighscores();
  
  let html = '<div class="highscore-box"><h2>🏆 Top 10 Highscores</h2>';
  
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

async function showHighscoresAfterGame() {
  const highscores = await getHighscores();
  const playerRank = highscores.findIndex(h => h.name === game.playerName && h.score === game.score) + 1;
  
  let html = '<div class="highscore-box"><h2>🏆 Spel Afgelopen!</h2>';
  html += `<p class="final-score">Je score: ${game.score} punten</p>`;
  
  if (playerRank > 0 && playerRank <= 10) {
    html += `<p class="rank-message">🎉 Gefeliciteerd! Je staat op plaats ${playerRank}!</p>`;
  }
  
  html += '<h3>Top 10 Highscores</h3><ol class="highscore-list">';
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
  };
  return names[id] || id;
}

async function updateLiveHighscores() {
  const highscores = await getHighscores();
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

