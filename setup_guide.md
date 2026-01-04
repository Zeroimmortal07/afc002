# Amma Food Center - Setup Guide

## 1. How to Customize the Menu
Open `index.html` in Notepad. Look for the section starting with `const menuItems = [`.
You will see a list of items like this:
```javascript
{
    id: 1,
    name: "Idli (2 pcs)",
    price: 40,
    category: "Breakfast",
    image: "..." 
},
```
- **Change Name**: Edit the text inside quotes next to `name`.
- **Change Price**: Edit the number next to `price`.
- **Change Image**: Paste a new image URL inside the quotes next to `image`.
- **Add Item**: Copy one `{...},` block and paste it below. Make sure to give it a unique `id`.

## 2. How to Connect Google Forms (Order Tracking)
If you want to save orders to a Google Sheet automatically:

### Step A: Create the Form
1. Go to [Google Forms](https://forms.google.com/).
2. Create a **Blank Form**.
3. Name it "Amma Food Orders".
4. Create the following **Short Answer** questions:
   - **Order Details**
   - **Total Amount**
   - **Customer Name**
   - **Address**

### Step B: Get the Entry IDs
1. In your form, click the **three dots** (top right) > **Get pre-filled link**.
2. Fill in dummy data for each answer (e.g., "ORDER", "TOTAL", "NAME", "ADDRESS").
3. Click **Get Link**, then **Copy Link**.
4. Paste the link in Notepad. It will look like this:
   `https://docs.google.com/forms/d/e/YOUR_LONG_ID/viewform?usp=pp_url&entry.123456=ORDER&entry.987654=TOTAL...`
5. Note down the numbers after `entry.`:
   - `entry.123456` is for Order Details.
   - `entry.987654` is for Total Amount.
   (And so on).

### Step C: Update index.html
1. Open `index.html` in Notepad.
2. Find the `// GOOGLE FORM CONFIG` section near the bottom.
3. Update the variables:
   ```javascript
   const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/YOUR_LONG_ID/formResponse"; // Note: change 'viewform' to 'formResponse'
   const ENTRY_ID_ORDER = "entry.123456";
   const ENTRY_ID_TOTAL = "entry.987654";
   // ... fill others
   ```
4. Save the file.

## 3. Go Live
1. Go to [Netlify Drop](https://app.netlify.com/drop).
2. Drag your `index.html` file onto the page.
3. It will give you a link. Share it!
