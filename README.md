Mini ERP System for Product and Sales Order Management
======================================================

Overview
--------

This project is a **Mini ERP System** designed for managing products and sales orders. It includes functionality for inventory management, order processing, and reporting. The application is built using modern web technologies, providing a robust, scalable, and user-friendly interface.

# Getting Started  

Follow these steps to clone and run the project on your local machine:  

## Prerequisites  
Ensure you have the following installed on your system:  
- **Node.js** (v16 or later)  
- **npm** or **yarn**  
- **PostgreSQL**  
- **Git**  

## 

## Clone the Repository  
1. Open your terminal and run the following command:  
   ```bash
   git clone https://github.com/GulamRza000/SalesERPS.git

2. Navigate to the project directory:
   ```bash
   cd RepositoryName


3. Install Dependencies

Run the following command to install all required dependencies:
```bash
    npm install
```

4. Configure Environment Variables
   * Create a .env file in the root directory.
   * Add the following environment variables:

**DATABASE_URL=postgresql://username:password@localhost:5432/database_name
NEXTAUTH_SECRET=your_secret_key**

Replace username, password, and database_name with your PostgreSQL credentials.


5. Set Up the Database

* Run Prisma migrations to set up the database schema:
   ```bash
   npx prisma migrate dev --name init

* Seed the database (if applicable):
   ```bash
   npx prisma db seed


6. Start the Development Server

Run the following command to start the server:

   **npm run dev**

7. Additional Commands
   * Generate Prisma Client
     npx prisma generate


Scripts
-------

*   npm run dev: Starts the development server.
*   npm run build: Builds the application for production.
*   npm run start: Starts the production server.
*   npx prisma studio: Opens Prisma Studio for database inspection.
    


Features
--------

### Product Management

*   Add, edit, and delete products.
*   View a paginated list of all products.
*   Track product inventory with low-stock alerts.
    

### Sales Order Management

*   Create sales orders with multiple products and quantities.
*   Update sales order statuses (pending, completed, cancelled).
*   View detailed sales orders along with their items.
    

### Reporting

*   Sales summary report showing:    
    *   Total orders, revenue, and sales by status.
    *   Top 5 selling products (by quantity and revenue).
            

### Additional Features

*   Interactive dashboards with visualizations.
*   RESTful API routes for managing products, sales orders, and reports.
    

Tech Stack
----------

*   **Frontend**: React 19, Tailwind CSS
*   **Backend**: Next.js (App Router)
*   **Database**: PostgreSQL
*   **ORM**: Prisma
*   **Charts and Visualizations**: Recharts
    

API Endpoints
-------------

### Product APIs

*   GET /api/products: Fetch all products (paginated).
*   GET /api/products/\[id\]: Fetch a single product by ID.
*   POST /api/products: Create a new product.
*   PUT /api/products/\[id\]: Update a product by ID.
*   DELETE /api/products/\[id\]: Delete a product by ID.
    

### Sales Order APIs

*   GET /api/sales-orders: Fetch all sales orders (paginated).
*   GET /api/sales-orders/\[id\]: Fetch a sales order by ID with its items.
*   POST /api/sales-orders: Create a new sales order.
*   PUT /api/sales-orders/\[id\]: Update the status of a sales order by ID.
    

### Reporting APIs

*   GET /api/reports/sales-summary: Fetch sales summary report.
*   GET /api/reports/top-selling-products: Fetch the top 5 selling products by quantity.
    

Key Pages
---------

### Dashboard

*   Displays key metrics, recent activity, and sales trends.
    

### Product Pages

*   **List Page**: Paginated table of products with search functionality.
*   **Detail Page**: Detailed view of a single product.
*   **Creation/Edit Form**: Form to add or update product information.
    

### Sales Order Pages

*   **List Page**: Paginated table of sales orders with filters.
*   **Detail Page**: View order details, including items and status.
*   **Creation Form**: Create a new sales order with product selection.
    

### Sales Summary

*   Visualization of total sales, order statuses, and top-selling products.

### Not Implemented Features

* Pagination on /products and sales-orders pages
* User Authentication
* Not able to deploy within the given timeframe
    
### Project Summary
This project is a Mini ERP System for Product and Sales Order Management, developed as part of an assignment for a small project from IMax Technologies Private Limited. The goal of this assignment was to demonstrate the ability to design and implement a robust, scalable system for managing inventory, processing sales orders, and generating reports using modern web technologies like Next.js, Prisma, PostgreSQL, and Tailwind CSS.

This project showcases essential features of an ERP system, including CRUD operations, reporting, and data visualization, and serves as a foundational example of efficient system design and implementation.






