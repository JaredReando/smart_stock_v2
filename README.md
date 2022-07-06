## SmartStock 2.0 

### Overview
SmartStock automates complicated warehouse FIFO (first-in, first-out) restocking work for management and warehouse staff in a lightweight, web-based desktop and mobile application.

### Key Features: 
- Fully automated - saves hours of time each week curating manual reports.
- Intelligent - eliminates unnecessary warehouse travel by automatically locating
the closest inventory in racking.
- Error proof - eliminates human error and creates flawless reports every time, instantly.
- Zero training required - any worker of any skill level can create, review, and
fulfill pick path restocking tasks without learning any special processes or prerequisite technical skills.
- Paperless restocking - a mobile device or ruggedized warehouse scanner
guides the restocking, replacing cumbersome paper reports with an intuitive user interface.
- Multiple user support - dramatically reduces restocking time by supporting
multiple simultaneous restocking users.
- Live updating - all updates and changes appear immediately across all devices and users with easily readable color coded status updates, eliminating duplicate work and miscommunication.

### How does it work? 
- SmartStock works by defining the product fixed bin locations and overstock replenishment locations during setup configuration. 
- Once it knows what locations and products are eligible for restocking, all it needs is a current SAP full inventory report upload in CSV format to calculate an up-to-date FIFO restock report. 
- Referencing a full inventory report, it sees which empty fixed bins need product, knows which product to look for, and then looks in the defined overstock locations to find it. 
- It combines all of the matches into guided, interactive report for a warehouse floor worker to fulfill while providing a dashboard for management to track progress in real-time.

## Local Setup
1. Clone the SmartStock repo to a local host directory:
    ```bash
        git clone ${GITHUB_REPO_URL}
    ```
   
2. Navigate to the cloned directory in the command line and install project dependencies (via ```yarn``` or ```npm```):
    ```bash
        yarn install
    ```
   
3. SmartStock requires a Firebase Realtime database for its backend. Set up a new project in your Google Firebase console ([instructions](https://firebase.google.com/docs/web/setup)), then navigate to `Develop/Database` in the Project Overview area and create a Realtime Database for your project. Select the `Start in test mode` option before enabling.

4. Locate the `firebaseConfig` your Firebase project overview settings. This is required for connecting the local SmartStock project with Firebase. It will look like this: 
    ```javascript
          var firebaseConfig = {
            apiKey: "API_KEY",
            authDomain: "AUTH_DOMAIN",
            databaseURL: "DATABASE_URL",
            projectId: "PROJECT_ID",
            storageBucket: "STORAGE_BUCKET",
            messagingSenderId: "MESSAGING_SENDER_ID",
            appId: "APP_ID",
            measurementId: "MEASUREMENT_ID",
          };
    ```
   
5. Open the local SmartStock project repo in the code editor of your choice and navigate to ```src/constants/firebaseConfig.js.example```. This is a placeholder configuration file. In the next steps, you will configure your private `firebaseConfig` in the SmartStock directory to point to and communicate with the newly created Firebase project.

6. Copy and paste the `firebaseConfig` settings to overwrite the placeholder object in `firebaseConfig.js.example`. Once finished, rename the file `firebaseConfig.js`. Make sure the configuration credentials are correct and the file name matches exactly, or else the application will not work properly.

7. With local configuration now pointing to you hosted Firebase project, initialize the Realtime DB connection to SmartStock from the command line:
    ```bash
        firbase init
    ```
   
8. Select only the `Database: Deploy Firebase Realtime Database Rules` for now, then hit enter to select the suggested default options until the initialization is complete.

9. Local setup is complete. Create a runtime build and start SmartStock:
    ```bash
        yarn start
    ```

 ##### **Developer Contact:** *Jared Reando* -- jaredreando@gmail.com
