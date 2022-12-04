create table user_type (
    id SERIAL NOT NULL PRIMARY KEY,
    title VARCHAR(50) NOT NULL
);
create table category (
    id SERIAL NOT NULL PRIMARY KEY,
    title VARCHAR(50) NOT NULL
);
create table users (
    id SERIAL NOT NULL PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL, 
    password VARCHAR(50) NOT NULL, 
    code VARCHAR(8), 
    user_type_id SMALLINT REFERENCES user_type (id),
    active SMALLINT NOT NULL DEFAULT 1,
    UNIQUE(user_type_id)

);
create table products (
    id SERIAL NOT NULL PRIMARY KEY,
    category_id BIGINT REFERENCES category (id),
    title VARCHAR(50) NOT NULL,
    description TEXT,
    price NUMERIC(19, 2) NOT NULL,
    UNIQUE (category_id)
);