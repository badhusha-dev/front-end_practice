-- V2__seed_data.sql
-- Seed data for CIMB Wealth Financial App development

-- Insert sample users
INSERT INTO users (email, password, first_name, last_name, phone_number, role, risk_profile, active) VALUES
('john.doe@cimb.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'John', 'Doe', '+60123456789', 'CUSTOMER', 'MODERATE', true),
('jane.smith@cimb.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'Jane', 'Smith', '+60123456790', 'CUSTOMER', 'AGGRESSIVE', true),
('advisor1@cimb.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'Sarah', 'Johnson', '+60123456791', 'ADVISOR', 'MODERATE', true),
('admin@cimb.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'Admin', 'User', '+60123456792', 'ADMIN', 'CONSERVATIVE', true);

-- Insert sample accounts
INSERT INTO accounts (account_number, account_name, account_type, balance, active, user_id) VALUES
('ACC001', 'John Doe Savings Account', 'SAVINGS', 50000.00, true, 1),
('ACC002', 'John Doe Investment Account', 'INVESTMENT', 150000.00, true, 1),
('ACC003', 'John Doe Retirement Account', 'RETIREMENT', 200000.00, true, 1),
('ACC004', 'Jane Smith Savings Account', 'SAVINGS', 75000.00, true, 2),
('ACC005', 'Jane Smith Investment Account', 'INVESTMENT', 300000.00, true, 2),
('ACC006', 'Jane Smith Education Fund', 'EDUCATION', 100000.00, true, 2);

-- Insert sample holdings
INSERT INTO holdings (ticker, asset_name, asset_type, sector, quantity, current_price, average_cost, market_value, unrealized_gain_loss, unrealized_gain_loss_percentage, account_id) VALUES
-- John Doe's holdings
('CIMB', 'CIMB Group Holdings Berhad', 'STOCK', 'Financials', 1000.00, 5.20, 5.00, 5200.00, 200.00, 4.00, 2),
('MAYBANK', 'Malayan Banking Berhad', 'STOCK', 'Financials', 800.00, 8.50, 8.20, 6800.00, 240.00, 3.66, 2),
('PETRONAS', 'Petroliam Nasional Berhad', 'STOCK', 'Energy', 500.00, 6.80, 6.50, 3400.00, 150.00, 4.62, 2),
('TENAGA', 'Tenaga Nasional Berhad', 'STOCK', 'Utilities', 300.00, 9.10, 8.80, 2730.00, 90.00, 3.41, 2),
('GENTING', 'Genting Berhad', 'STOCK', 'Consumer', 200.00, 4.50, 4.20, 900.00, 60.00, 7.14, 2),
('SIME', 'Sime Darby Berhad', 'STOCK', 'Industrial', 400.00, 2.10, 2.00, 840.00, 40.00, 5.00, 2),
('DIGI', 'Digi.Com Berhad', 'STOCK', 'Technology', 600.00, 3.20, 3.00, 1920.00, 120.00, 6.67, 2),
('MAXIS', 'Maxis Berhad', 'STOCK', 'Technology', 700.00, 4.10, 3.90, 2870.00, 140.00, 5.13, 2),
('PUBLIC', 'Public Bank Berhad', 'STOCK', 'Financials', 900.00, 3.80, 3.60, 3420.00, 180.00, 5.56, 2),
('ASNB', 'Amanah Saham Nasional Berhad', 'MUTUAL_FUND', 'Mixed', 300.00, 1.20, 1.15, 360.00, 15.00, 4.35, 2),
('EASTSPRING', 'Eastspring Investments', 'MUTUAL_FUND', 'Equity', 200.00, 2.10, 2.00, 420.00, 20.00, 5.00, 2),
('PRINCIPAL', 'Principal Asset Management', 'MUTUAL_FUND', 'Balanced', 150.00, 1.80, 1.75, 270.00, 7.50, 2.86, 2),
('MANULIFE', 'Manulife Investment Management', 'MUTUAL_FUND', 'Growth', 100.00, 2.50, 2.40, 250.00, 10.00, 4.17, 2),
('FBMKLCI', 'FTSE Bursa Malaysia KLCI ETF', 'ETF', 'Index', 400.00, 1.50, 1.45, 600.00, 20.00, 3.45, 2),
('MYGov10Y', 'Malaysia Government 10Y Bond', 'BOND', 'Government', 50.00, 100.00, 98.50, 5000.00, 75.00, 1.52, 2),
('MYGov5Y', 'Malaysia Government 5Y Bond', 'BOND', 'Government', 30.00, 98.50, 97.00, 2955.00, 45.00, 1.55, 2),
('CORP3Y', 'Corporate Bond 3Y', 'BOND', 'Corporate', 25.00, 95.20, 94.00, 2380.00, 30.00, 1.28, 2),
('CORP7Y', 'Corporate Bond 7Y', 'BOND', 'Corporate', 20.00, 97.80, 96.50, 1956.00, 26.00, 1.35, 2),

-- Jane Smith's holdings
('CIMB', 'CIMB Group Holdings Berhad', 'STOCK', 'Financials', 2000.00, 5.20, 5.10, 10400.00, 200.00, 1.96, 5),
('MAYBANK', 'Malayan Banking Berhad', 'STOCK', 'Financials', 1500.00, 8.50, 8.30, 12750.00, 300.00, 2.41, 5),
('PETRONAS', 'Petroliam Nasional Berhad', 'STOCK', 'Energy', 1000.00, 6.80, 6.60, 6800.00, 200.00, 3.03, 5),
('TENAGA', 'Tenaga Nasional Berhad', 'STOCK', 'Utilities', 600.00, 9.10, 8.90, 5460.00, 120.00, 2.25, 5),
('GENTING', 'Genting Berhad', 'STOCK', 'Consumer', 500.00, 4.50, 4.30, 2250.00, 100.00, 4.65, 5),
('SIME', 'Sime Darby Berhad', 'STOCK', 'Industrial', 800.00, 2.10, 2.05, 1680.00, 40.00, 2.44, 5),
('DIGI', 'Digi.Com Berhad', 'STOCK', 'Technology', 1200.00, 3.20, 3.10, 3840.00, 120.00, 3.23, 5),
('MAXIS', 'Maxis Berhad', 'STOCK', 'Technology', 1400.00, 4.10, 4.00, 5740.00, 140.00, 2.50, 5),
('PUBLIC', 'Public Bank Berhad', 'STOCK', 'Financials', 1800.00, 3.80, 3.70, 6840.00, 180.00, 2.70, 5),
('ASNB', 'Amanah Saham Nasional Berhad', 'MUTUAL_FUND', 'Mixed', 600.00, 1.20, 1.18, 720.00, 12.00, 1.69, 5),
('EASTSPRING', 'Eastspring Investments', 'MUTUAL_FUND', 'Equity', 400.00, 2.10, 2.05, 840.00, 20.00, 2.44, 5),
('PRINCIPAL', 'Principal Asset Management', 'MUTUAL_FUND', 'Balanced', 300.00, 1.80, 1.78, 540.00, 6.00, 1.12, 5),
('MANULIFE', 'Manulife Investment Management', 'MUTUAL_FUND', 'Growth', 200.00, 2.50, 2.45, 500.00, 10.00, 2.04, 5),
('FBMKLCI', 'FTSE Bursa Malaysia KLCI ETF', 'ETF', 'Index', 800.00, 1.50, 1.48, 1200.00, 16.00, 1.35, 5),
('MYGov10Y', 'Malaysia Government 10Y Bond', 'BOND', 'Government', 100.00, 100.00, 99.00, 10000.00, 100.00, 1.01, 5),
('MYGov5Y', 'Malaysia Government 5Y Bond', 'BOND', 'Government', 60.00, 98.50, 97.50, 5910.00, 60.00, 1.03, 5),
('CORP3Y', 'Corporate Bond 3Y', 'BOND', 'Corporate', 50.00, 95.20, 94.50, 4760.00, 35.00, 0.74, 5),
('CORP7Y', 'Corporate Bond 7Y', 'BOND', 'Corporate', 40.00, 97.80, 97.00, 3912.00, 32.00, 0.82, 5);

-- Insert sample transactions
INSERT INTO transactions (transaction_id, transaction_type, ticker, asset_name, quantity, price, amount, fees, total_amount, description, status, account_id) VALUES
-- John Doe's transactions
('TXN001', 'BUY', 'CIMB', 'CIMB Group Holdings Berhad', 1000.00, 5.00, 5000.00, 25.00, 5025.00, 'Initial purchase of CIMB shares', 'COMPLETED', 2),
('TXN002', 'BUY', 'MAYBANK', 'Malayan Banking Berhad', 800.00, 8.20, 6560.00, 32.80, 6592.80, 'Purchase of Maybank shares', 'COMPLETED', 2),
('TXN003', 'BUY', 'PETRONAS', 'Petroliam Nasional Berhad', 500.00, 6.50, 3250.00, 16.25, 3266.25, 'Petronas shares purchase', 'COMPLETED', 2),
('TXN004', 'BUY', 'TENAGA', 'Tenaga Nasional Berhad', 300.00, 8.80, 2640.00, 13.20, 2653.20, 'Tenaga shares purchase', 'COMPLETED', 2),
('TXN005', 'BUY', 'GENTING', 'Genting Berhad', 200.00, 4.20, 840.00, 4.20, 844.20, 'Genting shares purchase', 'COMPLETED', 2),
('TXN006', 'BUY', 'SIME', 'Sime Darby Berhad', 400.00, 2.00, 800.00, 4.00, 804.00, 'Sime Darby shares purchase', 'COMPLETED', 2),
('TXN007', 'BUY', 'DIGI', 'Digi.Com Berhad', 600.00, 3.00, 1800.00, 9.00, 1809.00, 'Digi shares purchase', 'COMPLETED', 2),
('TXN008', 'BUY', 'MAXIS', 'Maxis Berhad', 700.00, 3.90, 2730.00, 13.65, 2743.65, 'Maxis shares purchase', 'COMPLETED', 2),
('TXN009', 'BUY', 'PUBLIC', 'Public Bank Berhad', 900.00, 3.60, 3240.00, 16.20, 3256.20, 'Public Bank shares purchase', 'COMPLETED', 2),
('TXN010', 'BUY', 'ASNB', 'Amanah Saham Nasional Berhad', 300.00, 1.15, 345.00, 1.73, 346.73, 'ASNB fund purchase', 'COMPLETED', 2),
('TXN011', 'DIVIDEND', 'CIMB', 'CIMB Group Holdings Berhad', 0.00, 0.00, 150.00, 0.00, 150.00, 'CIMB dividend payment', 'COMPLETED', 2),
('TXN012', 'DIVIDEND', 'MAYBANK', 'Malayan Banking Berhad', 0.00, 0.00, 200.00, 0.00, 200.00, 'Maybank dividend payment', 'COMPLETED', 2),
('TXN013', 'DEPOSIT', 'CASH', 'Cash Deposit', 0.00, 0.00, 10000.00, 0.00, 10000.00, 'Initial cash deposit', 'COMPLETED', 1),
('TXN014', 'DEPOSIT', 'CASH', 'Cash Deposit', 0.00, 0.00, 50000.00, 0.00, 50000.00, 'Investment account funding', 'COMPLETED', 2),
('TXN015', 'INTEREST', 'CASH', 'Savings Interest', 0.00, 0.00, 250.00, 0.00, 250.00, 'Monthly savings interest', 'COMPLETED', 1),

-- Jane Smith's transactions
('TXN016', 'BUY', 'CIMB', 'CIMB Group Holdings Berhad', 2000.00, 5.10, 10200.00, 51.00, 10251.00, 'Large CIMB position', 'COMPLETED', 5),
('TXN017', 'BUY', 'MAYBANK', 'Malayan Banking Berhad', 1500.00, 8.30, 12450.00, 62.25, 12512.25, 'Maybank position', 'COMPLETED', 5),
('TXN018', 'BUY', 'PETRONAS', 'Petroliam Nasional Berhad', 1000.00, 6.60, 6600.00, 33.00, 6633.00, 'Petronas position', 'COMPLETED', 5),
('TXN019', 'BUY', 'TENAGA', 'Tenaga Nasional Berhad', 600.00, 8.90, 5340.00, 26.70, 5366.70, 'Tenaga position', 'COMPLETED', 5),
('TXN020', 'BUY', 'GENTING', 'Genting Berhad', 500.00, 4.30, 2150.00, 10.75, 2160.75, 'Genting position', 'COMPLETED', 5),
('TXN021', 'BUY', 'SIME', 'Sime Darby Berhad', 800.00, 2.05, 1640.00, 8.20, 1648.20, 'Sime Darby position', 'COMPLETED', 5),
('TXN022', 'BUY', 'DIGI', 'Digi.Com Berhad', 1200.00, 3.10, 3720.00, 18.60, 3738.60, 'Digi position', 'COMPLETED', 5),
('TXN023', 'BUY', 'MAXIS', 'Maxis Berhad', 1400.00, 4.00, 5600.00, 28.00, 5628.00, 'Maxis position', 'COMPLETED', 5),
('TXN024', 'BUY', 'PUBLIC', 'Public Bank Berhad', 1800.00, 3.70, 6660.00, 33.30, 6693.30, 'Public Bank position', 'COMPLETED', 5),
('TXN025', 'BUY', 'ASNB', 'Amanah Saham Nasional Berhad', 600.00, 1.18, 708.00, 3.54, 711.54, 'ASNB fund purchase', 'COMPLETED', 5),
('TXN026', 'DIVIDEND', 'CIMB', 'CIMB Group Holdings Berhad', 0.00, 0.00, 300.00, 0.00, 300.00, 'CIMB dividend payment', 'COMPLETED', 5),
('TXN027', 'DIVIDEND', 'MAYBANK', 'Malayan Banking Berhad', 0.00, 0.00, 400.00, 0.00, 400.00, 'Maybank dividend payment', 'COMPLETED', 5),
('TXN028', 'DEPOSIT', 'CASH', 'Cash Deposit', 0.00, 0.00, 15000.00, 0.00, 15000.00, 'Initial cash deposit', 'COMPLETED', 4),
('TXN029', 'DEPOSIT', 'CASH', 'Cash Deposit', 0.00, 0.00, 100000.00, 0.00, 100000.00, 'Investment account funding', 'COMPLETED', 5),
('TXN030', 'INTEREST', 'CASH', 'Savings Interest', 0.00, 0.00, 375.00, 0.00, 375.00, 'Monthly savings interest', 'COMPLETED', 4),
('TXN031', 'SELL', 'CIMB', 'CIMB Group Holdings Berhad', 100.00, 5.25, 525.00, 2.63, 522.37, 'Partial CIMB sale', 'COMPLETED', 5),
('TXN032', 'BUY', 'FBMKLCI', 'FTSE Bursa Malaysia KLCI ETF', 800.00, 1.48, 1184.00, 5.92, 1189.92, 'ETF purchase', 'COMPLETED', 5),
('TXN033', 'BUY', 'MYGov10Y', 'Malaysia Government 10Y Bond', 100.00, 99.00, 9900.00, 49.50, 9949.50, 'Government bond purchase', 'COMPLETED', 5),
('TXN034', 'BUY', 'MYGov5Y', 'Malaysia Government 5Y Bond', 60.00, 97.50, 5850.00, 29.25, 5879.25, '5Y bond purchase', 'COMPLETED', 5),
('TXN035', 'BUY', 'CORP3Y', 'Corporate Bond 3Y', 50.00, 94.50, 4725.00, 23.63, 4748.63, 'Corporate bond purchase', 'COMPLETED', 5);

-- Insert sample goals
INSERT INTO goals (title, description, goal_type, priority, target_amount, current_amount, target_date, start_date, status, progress_percentage, user_id) VALUES
-- John Doe's goals
('Retirement Fund', 'Build a comfortable retirement fund for age 65', 'RETIREMENT', 'HIGH', 1000000.00, 200000.00, '2040-12-31', '2020-01-01', 'ACTIVE', 20.00, 1),
('Home Purchase', 'Save for down payment on first home', 'HOME_PURCHASE', 'CRITICAL', 150000.00, 75000.00, '2025-06-30', '2022-01-01', 'ACTIVE', 50.00, 1),
('Emergency Fund', 'Build 6 months emergency fund', 'EMERGENCY_FUND', 'HIGH', 50000.00, 30000.00, '2024-12-31', '2023-01-01', 'ACTIVE', 60.00, 1),
('Children Education', 'Education fund for future children', 'EDUCATION', 'MEDIUM', 200000.00, 50000.00, '2035-12-31', '2023-01-01', 'ACTIVE', 25.00, 1),
('Vacation Fund', 'Annual vacation fund', 'VACATION', 'LOW', 15000.00, 8000.00, '2024-12-31', '2024-01-01', 'ACTIVE', 53.33, 1),

-- Jane Smith's goals
('Early Retirement', 'Retire by age 50 with financial independence', 'RETIREMENT', 'CRITICAL', 2000000.00, 500000.00, '2035-12-31', '2020-01-01', 'ACTIVE', 25.00, 2),
('Investment Property', 'Purchase rental property for passive income', 'INVESTMENT', 'HIGH', 500000.00, 150000.00, '2027-12-31', '2022-01-01', 'ACTIVE', 30.00, 2),
('Children Education', 'University fund for 2 children', 'EDUCATION', 'HIGH', 300000.00, 100000.00, '2030-12-31', '2021-01-01', 'ACTIVE', 33.33, 2),
('Emergency Fund', '12 months emergency fund', 'EMERGENCY_FUND', 'HIGH', 100000.00, 75000.00, '2024-06-30', '2023-01-01', 'ACTIVE', 75.00, 2),
('Business Investment', 'Start own business fund', 'INVESTMENT', 'MEDIUM', 200000.00, 50000.00, '2026-12-31', '2023-06-01', 'ACTIVE', 25.00, 2),
('Luxury Car', 'Purchase dream car', 'VACATION', 'LOW', 300000.00, 0.00, '2028-12-31', '2024-01-01', 'ACTIVE', 0.00, 2);
