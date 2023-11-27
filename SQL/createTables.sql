CREATE TABLE Sales (
    SaleID SERIAL PRIMARY KEY,
    SaleDate DATE,
    BuyerEmail VARCHAR(255)
);

CREATE TABLE SalesDetails (
    SaleID INT,
    ProductID INT,
    ProductName VARCHAR(255),
    ProductQuantity INT,
    ProductPrice NUMERIC,
    FOREIGN KEY (SaleID) REFERENCES Sales(SaleID)
);