

INSERT INTO users (name, lastname, email, password, avatar, public_id, token, caducidad_token, status) 
VALUES ('John', 'Doe', 'johndoe@example.com', 'mypassword', 'avatar.jpg', 'abc123', null, null, true);
INSERT INTO users (name, lastname, email, password, avatar, public_id, token, caducidad_token, status) 
VALUES ('Alice', 'Smith', 'alice@example.com', 'password123', 'avatar1.jpg', 'xyz789', null, null, true);
INSERT INTO users (name, lastname, email, password, avatar, public_id, token, caducidad_token, status) 
VALUES ('Bob', 'Johnson', 'bob@example.com', 'securepassword', 'avatar2.jpg', 'def456', null, null, true);
INSERT INTO users (name, lastname, email, password, avatar, public_id, token, caducidad_token, status) 
VALUES ('Emma', 'Davis', 'emma@example.com', 'mysecret', 'avatar3.jpg', 'ghi789', 'token123', '2023-06-30', true);
INSERT INTO users (name, lastname, email, password, avatar, public_id, token, caducidad_token, status) 
VALUES ('Michael', 'Wilson', 'michael@example.com', 'password456', 'avatar4.jpg', 'jkl012', null, null, false);
INSERT INTO users (name, lastname, email, password, avatar, public_id, token, caducidad_token, status) 
VALUES ('Sophia', 'Brown', 'sophia@example.com', 'pass1234', 'avatar5.jpg', 'mno345', 'token456', '2023-07-15', true);



INSERT INTO roles (name) VALUES ('Admin');
INSERT INTO roles (name) VALUES ('Manager');
INSERT INTO roles (name) VALUES ('Employee');
INSERT INTO roles (name) VALUES ('Supervisor');
INSERT INTO roles (name) VALUES ('Analyst');



INSERT INTO usersroles (user_id, role_id) VALUES (1, 1);
INSERT INTO usersroles (user_id, role_id) VALUES (2, 1);
INSERT INTO usersroles (user_id, role_id) VALUES (1, 2);



INSERT INTO categories (name, description, image, public_id, user_id) 
VALUES ('Electrónica', 'Categoría de productos electrónicos', 'electronica.jpg', 'public123', 1);
INSERT INTO categories (name, description, image, public_id, user_id) 
VALUES ('Ropa', 'Categoría de prendas de vestir', 'ropa.jpg', 'public456', 2);
INSERT INTO categories (name, description, image, public_id, user_id) 
VALUES ('Alimentación', 'Categoría de productos alimenticios', 'alimentacion.jpg', 'public789', 1);
INSERT INTO categories (name, description, image, public_id, user_id) 
VALUES ('Hogar', 'Categoría de artículos para el hogar', 'hogar.jpg', 'public987', 3);
INSERT INTO categories (name, description, image, public_id, user_id) 
VALUES ('Deportes', 'Categoría de productos deportivos', 'deportes.jpg', 'public654', 2);
INSERT INTO categories (name, description, image, public_id, user_id) 
VALUES ('Juguetes', 'Categoría de juguetes para niños', 'juguetes.jpg', 'public321', 1);
INSERT INTO categories (name, description, image, public_id, user_id) 
VALUES ('Belleza', 'Categoría de productos de belleza', 'belleza.jpg', 'public890', 2);
INSERT INTO categories (name, description, image, public_id, user_id) 
VALUES ('Libros', 'Categoría de libros y novelas', 'libros.jpg', 'public567', 3);
INSERT INTO categories (name, description, image, public_id, user_id) 
VALUES ('Música', 'Categoría de CDs y vinilos', 'musica.jpg', 'public234', 1);
INSERT INTO categories (name, description, image, public_id, user_id) 
VALUES ('Automóviles', 'Categoría de vehículos y accesorios', 'automoviles.jpg', 'public901', 2);




INSERT INTO products (name, description, stock, price, image, public_id, user_id, categories_id)
VALUES ('Camiseta', 'Camiseta de algodón para hombre', 50, 19.99, 'camiseta.jpg', 'public123', 1, 2);
INSERT INTO products (name, description, stock, price, image, public_id, user_id, categories_id)
VALUES ('Zapatillas deportivas', 'Zapatillas para correr de alta calidad', 30, 79.99, 'zapatillas.jpg', 'public456', 2, 5);
INSERT INTO products (name, description, stock, price, image, public_id, user_id, categories_id)
VALUES ('Televisor LED', 'Televisor de 55 pulgadas con resolución 4K', 10, 799.99, 'televisor.jpg', 'public789', 1, 1);
INSERT INTO products (name, description, stock, price, image, public_id, user_id, categories_id)
VALUES ('Pantalones vaqueros', 'Pantalones de mezclilla para mujer', 20, 49.99, 'pantalones.jpg', 'public987', 3, 2);
INSERT INTO products (name, description, stock, price, image, public_id, user_id, categories_id)
VALUES ('Mochila', 'Mochila resistente para excursiones', 15, 39.99, 'mochila.jpg', 'public654', 2, 4);
INSERT INTO products (name, description, stock, price, image, public_id, user_id, categories_id)
VALUES ('Cámara digital', 'Cámara de fotos compacta de alta resolución', 5, 299.99, 'camara.jpg', 'public321', 1, 1);
INSERT INTO products (name, description, stock, price, image, public_id, user_id, categories_id)
VALUES ('Reloj de pulsera', 'Reloj elegante para hombres', 8, 129.99, 'reloj.jpg', 'public890', 2, 3);
INSERT INTO products (name, description, stock, price, image, public_id, user_id, categories_id)
VALUES ('Sartén antiadherente', 'Sartén de alta calidad con revestimiento antiadherente', 12, 29.99, 'sarten.jpg', 'public567', 3, 4);
INSERT INTO products (name, description, stock, price, image, public_id, user_id, categories_id)
VALUES ('Libro de cocina', 'Libro de recetas internacionales', 25, 14.99, 'libro.jpg', 'public234', 1, 4);
INSERT INTO products (name, description, stock, price, image, public_id, user_id, categories_id)
VALUES ('Cafetera', 'Máquina de café para preparar espresso', 7, 129.99, 'cafetera.jpg', 'public876', 3, 4);
INSERT INTO products (name, description, stock, price, image, public_id, user_id, categories_id)
VALUES ('Guitarra eléctrica', 'Guitarra de cuerpo sólido para rock', 3, 499.99, 'guitarra.jpg', 'public543', 2, 1);
INSERT INTO products (name, description, stock, price, image, public_id, user_id, categories_id)
VALUES ('Perfume', 'Fragancia floral para mujeres', 15, 69.99, 'perfume.jpg', 'public210', 1, 3);
INSERT INTO products (name, description, stock, price, image, public_id, user_id, categories_id)
VALUES ('Teclado inalámbrico', 'Teclado ergonómico con conexión Bluetooth', 9, 59.99, 'teclado.jpg', 'public789', 2, 1);
INSERT INTO products (name, description, stock, price, image, public_id, user_id, categories_id)
VALUES ('Vino tinto', 'Vino de uva Tempranillo de la región de Rioja', 25, 19.99, 'vino.jpg', 'public432', 3, 3);


