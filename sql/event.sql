create database sam_db;

use sam_db;

CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    start_date DATETIME NOT NULL,
    end_date DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO events (name, description, location, start_date, end_date) VALUES
('Conférence Tech', 'Une conférence sur les dernières avancées technologiques.', 'Casablanca', '2024-09-15 09:00:00', '2024-09-15 17:00:00'),
('Atelier de Cuisine', 'Un atelier pour apprendre à cuisiner des plats marocains.', 'Marrakech', '2024-10-01 14:00:00', '2024-10-01 18:00:00'),
('Festival de Musique', 'Un festival avec des concerts de divers genres musicaux.', 'Agadir', '2024-08-20 12:00:00', '2024-08-20 23:00:00'),
('Exposition d\'Art', 'Une exposition d\'art contemporain avec des artistes du monde entier.', 'Fès', '2024-11-10 10:00:00', '2024-11-10 18:00:00'),
('Marathon', 'Un marathon annuel ouvert à tous les niveaux de coureurs.', 'Rabat', '2024-12-05 07:00:00', '2024-12-05 14:00:00');
