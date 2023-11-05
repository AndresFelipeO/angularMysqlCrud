GRANT ALL PRIVILEGES ON *.* TO 'username'@'localhost' IDENTIFIED BY '123456';

CREATE DATABASE ng_products_db;

use ng_products_db;

CREATE TABLE user (
    userid INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(180),
    user_password VARCHAR(180),
    username VARCHAR(180)
);

CREATE TABLE shopping_list (
    listid INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    list_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    list_name VARCHAR(180),
    userid INT(11),

    FOREIGN KEY (userid) REFERENCES user(userid)
);

CREATE TABLE supplier (
    supplierid INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    supplier_name VARCHAR(180),
    supplier_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE product (
    productid INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(180),
    product_price DOUBLE,
    product_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    supplierid INT(11),

    FOREIGN KEY (supplierid) REFERENCES supplier(supplierid)
);

CREATE TABLE list_product (
    listid INT(11),
    productid INT(11),
    list_product_state VARCHAR(180),

    FOREIGN KEY (listid) REFERENCES shopping_list(listid),
    FOREIGN KEY (productid) REFERENCES product(productid)
);


INSERT INTO user (user_name, user_password, username) VALUES
('Usuario1', '12345', 'Nombre1'),
('Usuario2', '54321', 'Nombre2'),
('Usuario3', 'abcde', 'Nombre3');

INSERT INTO shopping_list (list_name, userid) VALUES
('Lista1', 1), -- El 1 representa el userid del usuario correspondiente
('Lista2', 2), -- El 2 representa el userid del usuario correspondiente
('Lista3', 1); -- El 1 representa el userid del usuario correspondiente

INSERT INTO supplier (supplier_name) VALUES
('Proveedor1'),
('Proveedor2'),
('Proveedor3');

INSERT INTO product (product_name, product_price, supplierid) VALUES
('Producto1', 10.99, 1), -- El 1 representa el supplierid del proveedor correspondiente
('Producto2', 20.99, 2), -- El 2 representa el supplierid del proveedor correspondiente
('Producto3', 15.99, 1); -- El 1 representa el supplierid del proveedor correspondiente

INSERT INTO list_product (listid, productid, list_product_state) VALUES
(1, 1, 'En stock'), -- 1 representa el listid y el productid correspondientes
(2, 2, 'Agotado'),  -- 2 representa el listid y el productid correspondientes
(3, 1, 'En stock'); -- 3 representa el listid y el productid correspondientes
