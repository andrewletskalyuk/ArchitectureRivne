WITH DailyTotals AS (
    SELECT 
        s.BuyerEmail,
        s.SaleDate,
        SUM(sd.ProductQuantity * sd.ProductPrice) AS TotalAmount
    FROM 
        Sales s
    JOIN 
        SalesDetails sd ON s.SaleID = sd.SaleID
    GROUP BY 
        s.BuyerEmail, s.SaleDate
),
AveragedTotals AS (
    SELECT 
        BuyerEmail,
        AVG(TotalAmount) AS AvgDailyTotal
    FROM 
        DailyTotals
    GROUP BY 
        BuyerEmail
)
SELECT 
    BuyerEmail
FROM 
    AveragedTotals
WHERE 
    AvgDailyTotal > 1000;
