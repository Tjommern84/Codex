yoga prosjekt# Codex

💬 Prompt: Yin Yoga & Styrketrenings Generator i Java
Jeg ønsker å lage en Java-applikasjon som automatisk genererer et daglig treningsprogram for yin yoga og styrketrening med kroppsvekt og strikk.

🧘‍♀️ Formål
Appen skal hjelpe min kone, som er yogainstruktør, med å spare tid ved å automatisere prosessen med å lage yogaprogrammer til gruppetimer. Programmene skal kombinere yin yoga og funksjonell styrketrening.

⚙️ Funksjonelle krav
Konsollapplikasjon (ingen GUI ennå)

Brukeren oppgir:

Fokusområde (en stor muskelgruppe)

Total varighet (eks: 60 minutter)

Appen genererer en strukturert økt:

Oppvarming (yin)

Hoveddel (yin + styrke)

Avslutning (yin)

Alle muskelgrupper aktiveres, men én er i fokus

Økten skrives ut i terminalen og lagres i tekstfil

Nye økter genereres tilfeldig hver dag, ingen kontinuitet nødvendig

All øvelsesdata lagres i SQLite-database

🧱 Tekniske detaljer
Språk: Java

Database: SQLite

Datastruktur for øvelser:

Navn

Type (yin / strength)

Muskelgrupper (f.eks. "hofter", "rygg")

Strekkpunkter (valgfritt)

Varighet (sekunder)

Seksjon (warmup, main, cooldown)

📦 Eksempel: Database-tabell exercises
sql
Kopier
Rediger
CREATE TABLE exercises (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT CHECK(type IN ('yin', 'strength')) NOT NULL,
    muscle_groups TEXT,
    stretch_points TEXT,
    duration_seconds INTEGER NOT NULL,
    section TEXT CHECK(section IN ('warmup', 'main', 'cooldown')) NOT NULL
);
🔄 Øktgeneratorens logikk
Trekker øvelser tilfeldig fra databasen, med følgende struktur:

Warmup (f.eks. 3 yin-øvelser)

Main (mix av yin og styrke, dekker hele kroppen, fokusert på valgt område)

Cooldown (yin)

Tidsfordeling justeres etter total øktvarighet (f.eks. 20/30/10 minutter)

📄 Filutskrift
Programmet genererer en .txt-fil med treningsøkten i lettlest format:

Inndeling i seksjoner

Hver øvelse: navn, varighet, type, muskelgrupper

🛠️ Fremtidige forbedringer (utenfor MVP)
GUI med redigeringsmuligheter

Øvelsesbeskrivelser og bilder

Lagring av historikk

Personlig progresjon og planlegging

📥 Neste steg
Generer:

Prosjektstruktur (Java med SQLite)

Klassene for Exercise, database-tilkobling, generator

Konsollgrensesnitt for input og tekstfil-eksport

