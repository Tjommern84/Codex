package com.codex.yoga;

import java.sql.SQLException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.io.IOException;
import java.io.PrintWriter;

public class WorkoutGenerator {
    private final DatabaseManager db;

    public WorkoutGenerator(DatabaseManager db) {
        this.db = db;
    }

    public List<Exercise> randomSample(List<Exercise> source, int count) {
        List<Exercise> copy = new ArrayList<>(source);
        Collections.shuffle(copy);
        return copy.subList(0, Math.min(count, copy.size()));
    }

    private List<Exercise> selectExercisesForDuration(List<Exercise> source, int durationMinutes) {
        List<Exercise> result = new ArrayList<>();
        List<Exercise> pool = new ArrayList<>(source);
        Collections.shuffle(pool);
        int total = 0;
        while (total < durationMinutes) {
            if (pool.isEmpty()) {
                pool = new ArrayList<>(source);
                Collections.shuffle(pool);
            }
            Exercise e = pool.remove(0);
            result.add(e);
            total += e.getDurationSeconds() / 60;
        }
        return result;
    }

    public WorkoutSections generate(String focus, int totalMinutes) throws SQLException {
        int warmMinutes = (int)(totalMinutes * 0.33);
        int mainMinutes = (int)(totalMinutes * 0.5);
        int coolMinutes = totalMinutes - warmMinutes - mainMinutes;

        List<Exercise> warm = selectExercisesForDuration(db.getExercisesBySection("warmup"), warmMinutes);
        List<Exercise> main = db.getExercisesBySectionAndMuscle("main", focus);
        if (main.isEmpty()) {
            main = db.getExercisesBySection("main");
        }
        main = selectExercisesForDuration(main, mainMinutes);
        List<Exercise> cool = selectExercisesForDuration(db.getExercisesBySection("cooldown"), coolMinutes);

        return new WorkoutSections(warm, main, cool, warmMinutes, mainMinutes, coolMinutes);
    }

    public void output(WorkoutSections sections) throws IOException {
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyyMMdd");
        String fileName = "workout_" + LocalDate.now().format(fmt) + ".txt";
        // File output temporarily disabled
        // try (PrintWriter pw = new PrintWriter(fileName)) {
        //     pw.println(formatSections(sections));
        // }
        System.out.println(formatSections(sections));
        // System.out.println("\nSaved to " + fileName);
    }

    private String formatSections(WorkoutSections ws) {
        StringBuilder sb = new StringBuilder();
        sb.append("Warmup (" + ws.warmMinutes + " min)\n");
        for (Exercise e : ws.warm) {
            sb.append(" - ").append(e.toString()).append('\n');
        }
        sb.append("\nMain (" + ws.mainMinutes + " min)\n");
        for (Exercise e : ws.main) {
            sb.append(" - ").append(e.toString()).append('\n');
        }
        sb.append("\nCooldown (" + ws.coolMinutes + " min)\n");
        for (Exercise e : ws.cool) {
            sb.append(" - ").append(e.toString()).append('\n');
        }
        return sb.toString();
    }

    public static class WorkoutSections {
        public final List<Exercise> warm;
        public final List<Exercise> main;
        public final List<Exercise> cool;
        public final int warmMinutes;
        public final int mainMinutes;
        public final int coolMinutes;

        public WorkoutSections(List<Exercise> w, List<Exercise> m, List<Exercise> c,
                               int wMin, int mMin, int cMin) {
            this.warm = w;
            this.main = m;
            this.cool = c;
            this.warmMinutes = wMin;
            this.mainMinutes = mMin;
            this.coolMinutes = cMin;
        }
    }
}
