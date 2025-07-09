package com.codex.yoga;

public class Exercise {
    private int id;
    private String name;
    private String type; // yin or strength
    private String muscleGroups;
    private String stretchPoints;
    private int durationSeconds;
    private String section; // warmup, main, cooldown

    public Exercise(int id, String name, String type, String muscleGroups,
                    String stretchPoints, int durationSeconds, String section) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.muscleGroups = muscleGroups;
        this.stretchPoints = stretchPoints;
        this.durationSeconds = durationSeconds;
        this.section = section;
    }

    public int getId() { return id; }
    public String getName() { return name; }
    public String getType() { return type; }
    public String getMuscleGroups() { return muscleGroups; }
    public String getStretchPoints() { return stretchPoints; }
    public int getDurationSeconds() { return durationSeconds; }
    public String getSection() { return section; }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(name)
          .append(" (")
          .append(type)
          .append(", ")
          .append(durationSeconds / 60)
          .append(" min")
          .append(") - ")
          .append(muscleGroups);
        return sb.toString();
    }
}
