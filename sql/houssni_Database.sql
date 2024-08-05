

CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100),
    prenom VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    role ENUM('admin', 'candidat')
);

CREATE TABLE Admins (
    id INT PRIMARY KEY,
    FOREIGN KEY (id) REFERENCES Users(id)
);

CREATE TABLE Candidats (
    id INT PRIMARY KEY,
    FOREIGN KEY (id) REFERENCES Users(id)
);

CREATE TABLE Evenements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(255),
    description TEXT,
    date DATE,
    lieu VARCHAR(255),
);

CREATE TABLE Programmes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    jour DATE,
    description TEXT,
    evenement_id INT,
    FOREIGN KEY (evenement_id) REFERENCES Evenements(id)
);

CREATE TABLE Speakers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100),
    prenom VARCHAR(100),
    description TEXT,
    evenement_id INT,
    FOREIGN KEY (evenement_id) REFERENCES Evenements(id)
);

CREATE TABLE Sponsors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100),
    description TEXT,
    evenement_id INT,
    FOREIGN KEY (evenement_id) REFERENCES Evenements(id)
);

CREATE TABLE Candidatures (
    id INT AUTO_INCREMENT PRIMARY KEY,
    candidat_id INT,
    evenement_id INT,
    statut ENUM('en attente', 'accepte', 'refuse'),
    FOREIGN KEY (candidat_id) REFERENCES Candidats(id),
    FOREIGN KEY (evenement_id) REFERENCES Evenements(id)
);
