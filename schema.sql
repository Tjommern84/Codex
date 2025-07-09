CREATE TABLE IF NOT EXISTS exercises (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT CHECK(type IN ('yin','strength')) NOT NULL,
    muscle_groups TEXT,
    stretch_points TEXT,
    duration_seconds INTEGER NOT NULL,
    section TEXT CHECK(section IN ('warmup','main','cooldown')) NOT NULL
);
