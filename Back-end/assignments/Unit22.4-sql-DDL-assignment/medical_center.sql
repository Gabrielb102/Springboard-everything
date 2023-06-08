CREATE DATABASE medical_center;

\c medical_center;
 
CREATE TABLE doctors (
	id SERIAL NOT NULL PRIMARY KEY,
	first_name TEXT NOT NULL,
	last_name TEXT NOT NULL
);

CREATE TABLE patients (
	id SERIAL PRIMARY KEY,
	first_name TEXT NOT NULL,
	last_name TEXT NOT NULL
);

CREATE TABLE diagnoses (
	id SERIAL NOT NULL PRIMARY KEY,
	diagnosis TEXT NOT NULL,
	patient_id INT NOT NULL REFERENCES patients,
	doctor_id INT NOT NULL REFERENCES doctors
);

CREATE TABLE visits (
    visit_date DATE NOT NULL PRIMARY KEY,
    doctor_id INT NOT NULL REFERENCES doctors,
    patient_id INT NOT NULL REFERENCES patients,
    diag_id INT REFERENCES diagnoses
);




