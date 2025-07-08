package com.codex.yoga;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class DatabaseManager {
    private final String url;

    public DatabaseManager(String dbFile) {
        this.url = "jdbc:sqlite:" + dbFile;
    }

    private Connection connect() throws SQLException {
        return DriverManager.getConnection(url);
    }

    public List<Exercise> getExercisesBySection(String section) throws SQLException {
        String sql = "SELECT * FROM exercises WHERE section = ?";
        try (Connection conn = connect();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, section);
            try (ResultSet rs = stmt.executeQuery()) {
                List<Exercise> list = new ArrayList<>();
                while (rs.next()) {
                    list.add(mapExercise(rs));
                }
                return list;
            }
        }
    }

    public List<Exercise> getExercisesBySectionAndMuscle(String section, String muscle) throws SQLException {
        String sql = "SELECT * FROM exercises WHERE section = ? AND muscle_groups LIKE ?";
        try (Connection conn = connect();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, section);
            stmt.setString(2, "%" + muscle + "%");
            try (ResultSet rs = stmt.executeQuery()) {
                List<Exercise> list = new ArrayList<>();
                while (rs.next()) {
                    list.add(mapExercise(rs));
                }
                return list;
            }
        }
    }

    private Exercise mapExercise(ResultSet rs) throws SQLException {
        return new Exercise(
                rs.getInt("id"),
                rs.getString("name"),
                rs.getString("type"),
                rs.getString("muscle_groups"),
                rs.getString("stretch_points"),
                rs.getInt("duration_seconds"),
                rs.getString("section")
        );
    }
}
