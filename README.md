# Port Logistics Inventory Management

This project is a CRUD (Create, Read, Update, Delete) web application for managing a port logistics container inventory. It allows users to add, view, update, delete, and search for containers, displaying the inventory in a user-friendly interface.

## Project Structure

```
gestion_contenedores/
│
├── index.html
├── README.md
├── src/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       ├── main.js
│       └── alert.js
```

### Description of Files and Folders

- **index.html**  
  Main HTML file. Contains the form for container management and the inventory display area.

- **README.md**  
  This documentation file.

- **src/css/styles.css**  
  Stylesheet for the application. Implements a modern, animated, and responsive design.

- **src/js/main.js**  
  Main JavaScript logic for the CRUD operations, DOM manipulation, and API interaction.

- **src/js/alert.js**  
  Utility for showing success and error alerts using SweetAlert2.

## How It Works

- The user can add a new container by filling out the form and clicking "Agregar Contenedor".
- The inventory list is updated automatically and can be refreshed with "Ver Contenedores".
- Containers can be updated or deleted by entering their ID and using the corresponding buttons.
- The "Buscar Contenedor" button fills the form with the data of a specific container for easy editing.
- All operations show feedback using toast notifications.

## Requirements

- A backend REST API running at `http://localhost:3000/containers` 
- A modern web browser.

## Author 
- Daniela Martinez Quinto
- Clan caiman 
- link repo https://github.com/Daniela-M-Quinto/Gestion-contenedores.git
- daniela.m.quinto@outlook.es
- Daniela-M-Quinto user Github
