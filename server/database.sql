CREATE DATABASE authweatherapp;

CREATE TABLE users(
    user_id UUID DEFAULT uuid_generate_v4(),
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL, 
    user_password_verify VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE favorites (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(user_id),
    city_name VARCHAR(255)
);