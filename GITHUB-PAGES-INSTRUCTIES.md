# 🚀 GitHub Pages Deployment - Stap voor Stap

## ✅ Voordelen GitHub Pages
- **100% GRATIS** (altijd!)
- Onbeperkt bandwidth
- Geen usage limits
- Snelle hosting
- Automatische HTTPS

---

## 📋 Stappen

### 1️⃣ Maak een nieuwe repository

1. Ga naar **https://github.com**
2. Log in met je account
3. Klik rechtsboven op **"+"** → **"New repository"**

### 2️⃣ Repository instellingen

Vul in:
- **Repository name**: `topo-game` (of een andere naam)
- **Description**: `Topo Game - Nederland Topografie Spel`
- **Public** (aanvinken)
- **NIET** aanvinken: "Add a README file"
- Klik **"Create repository"**

### 3️⃣ Upload bestanden

Je ziet nu een lege repository pagina.

**Optie A: Via website (makkelijkst)**

1. Klik op **"uploading an existing file"** (in de blauwe tekst)
2. Sleep deze bestanden naar het upload vak:
   - `index.html`
   - `style.css`
   - `js/` folder (hele folder)
3. Scroll naar beneden
4. Klik **"Commit changes"**

**Optie B: Via terminal (voor gevorderden)**

```bash
cd ~/Desktop/TopoGame-GitHub
git init
git add .
git commit -m "Initial commit - Topo Game"
git branch -M main
git remote add origin https://github.com/JOUW-USERNAME/topo-game.git
git push -u origin main
```

### 4️⃣ Activeer GitHub Pages

1. Ga naar je repository op GitHub
2. Klik op **"Settings"** (bovenaan)
3. Klik in het linkermenu op **"Pages"**
4. Bij **"Source"** selecteer: **"Deploy from a branch"**
5. Bij **"Branch"** selecteer: **"main"** en **"/ (root)"**
6. Klik **"Save"**

### 5️⃣ Wacht 1-2 minuten

GitHub bouwt je site. Refresh de pagina.

### 6️⃣ Je site is live! 🎉

Je ziet bovenaan:
```
Your site is live at https://JOUW-USERNAME.github.io/topo-game/
```

Klik op de link en **KLAAR!** 🚀

---

## 🔄 Updates uploaden

Als je iets wilt aanpassen:

1. Ga naar je repository op GitHub
2. Klik op het bestand dat je wilt aanpassen
3. Klik op het potlood icoon (edit)
4. Maak je wijzigingen
5. Scroll naar beneden en klik **"Commit changes"**
6. Wacht 30 seconden → refresh je site

**Of upload nieuwe versie:**
1. Klik op **"Add file"** → **"Upload files"**
2. Sleep nieuwe bestanden
3. Klik **"Commit changes"**

---

## 🎮 Jouw Spel Features

✅ Start met 5 punten
✅ < 0 punten = Game Over
✅ 20 goed = Gewonnen
✅ 3x drone hit = Game Over (❤️❤️❤️ → 💔💔💔)
✅ Kindvriendelijke feedback
✅ Firebase gedeelde highscores
✅ Touch controls (mobiel)
✅ Drones achtervolgen helikopter
✅ Game over geluid
✅ Alleen 12 provincies (geen eilanden)

---

## 🆘 Problemen?

**Site niet zichtbaar na 5 minuten?**
- Check of "Pages" is geactiveerd in Settings
- Check of branch "main" is geselecteerd
- Refresh de GitHub Pages pagina

**Firebase werkt niet?**
- Firebase config zit al in index.html
- Werkt automatisch!

**Highscores niet gedeeld?**
- Check of iedereen dezelfde URL gebruikt
- Firebase moet geactiveerd zijn (is al gedaan)

---

## 📱 Testen

Test op:
- ✅ Desktop (Chrome, Safari, Firefox)
- ✅ iPad (Safari)
- ✅ iPhone (Safari)
- ✅ Android (Chrome)

---

## 🎉 Veel Speelplezier!

Je spel is nu **100% GRATIS** online en werkt voor iedereen! 🚀

**URL delen:**
Stuur je vrienden de link:
`https://JOUW-USERNAME.github.io/topo-game/`

**Geen limits, geen kosten, altijd online!** ✨

