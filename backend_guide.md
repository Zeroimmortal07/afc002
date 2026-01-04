# Amma Food Center - Backend Setup Guide

You have upgraded to a custom Node.js backend! This allows you to save orders to a file and manage your menu from the server.

## 1. Install Node.js
If you haven't already:
1.  Download **Node.js** from [nodejs.org](https://nodejs.org/).
2.  Install it (just click Next, Next, Finish).

## 2. Setup the Backend
1.  Open a terminal (Command Prompt or PowerShell).
2.  Navigate to your backend folder:
    ```bash
    cd "c:\Users\frank\Music\AMMA FOOD CENTER\backend"
    ```
3.  Install dependencies (only need to do this once):
    ```bash
    npm install
    ```

## 3. Run the Server
To start your website's "brain":
1.  In the terminal (inside the `backend` folder), run:
    ```bash
    npm start
    ```
2.  You should see: `Server running at http://localhost:3000`

## 4. Use the Website
1.  Keep the terminal window OPEN.
2.  Double-click `index.html` in the main folder (`c:\Users\frank\Music\AMMA FOOD CENTER`).
3.  The menu should load from the server!
4.  When you place an order, check the terminal—it will say "New Order Received".
5.  Orders are saved in `backend/orders.json`.

## Troubleshooting
- **Menu not loading?** Make sure the black terminal window is open and says "Server running".
- **Want to change the menu?** Open `backend/server.js` and edit the `menuItems` list there. Restart the server (Ctrl+C, then `npm start`) to see changes.
