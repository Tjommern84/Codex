package com.codex.yoga;

import java.io.IOException;
import java.sql.SQLException;
import java.util.Scanner;

public class App {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Fokusområde (f.eks. hofter): ");
        String focus = scanner.nextLine().trim();
        System.out.print("Total varighet i minutter: ");
        int minutes = Integer.parseInt(scanner.nextLine().trim());

        DatabaseManager db = new DatabaseManager("exercises.db");
        WorkoutGenerator generator = new WorkoutGenerator(db);
        try {
            WorkoutGenerator.WorkoutSections sections = generator.generate(focus, minutes);
            generator.output(sections);
        } catch (SQLException | IOException e) {
            System.err.println("Kunne ikke generere økt: " + e.getMessage());
        }
    }
}
