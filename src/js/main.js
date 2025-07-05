import { alertError, alertSucces } from "./alert.js";

const API_URL = "http://localhost:3000/containers";

// DOM elements selection
const $form = document.getElementById("container-form");
const $containerID = document.getElementById("containerID");
const $cargoType = document.getElementById("cargoType");
const $originPort = document.getElementById("originPort");
const $destinationPort = document.getElementById("destinationPort");
const $status = document.getElementById("status");
const $inventoryList = document.getElementById("inventory-list");

const getContainers = async () => {
  try {
    const response = await fetch(API_URL); // API call to get containers
    if (!response.ok) throw new Error("Error al obtener los contenedores.");
    const containers = await response.json();
    updateInventoryList(containers); // Update inventory in DOM
  } catch (error) {
    alertError(error.message);
  }
};

const addContainer = async () => {
  const containerID = parseInt($containerID.value.trim(), 10);
  const cargo = $cargoType.value.trim();
  const origin = $originPort.value.trim();
  const destination = $destinationPort.value.trim();
  const status = $status.value.trim();

  // Validation for required fields
  if (!containerID || !cargo || !origin || !destination || !status) {
    alertError("Todos los campos son obligatorios.");
    return;
  }

  // Check for duplicate containerID
  const existingContainers = await (
    await fetch(`${API_URL}?containerID=${containerID}`)
  ).json();
  if (existingContainers.length > 0) {
    alertError(`El contenedor con ID "${containerID}" ya existe.`);
    return;
  }

  const newContainer = { containerID, cargo, origin, destination, status };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newContainer),
    });
    if (!response.ok) throw new Error("No se pudo agregar el contenedor.");

    alertSucces(`Contenedor "${containerID}" agregado correctamente.`);
    await getContainers();
    $form.reset();
  } catch (error) {
    alertError(error.message);
  }
};

const deleteContainer = async () => {
  const containerID = parseInt($containerID.value.trim(), 10);
  if (!containerID) {
    alertError("Ingrese el ID del contenedor que desea eliminar.");
    return;
  }

  try {
    // Find container by containerID
    const response = await fetch(`${API_URL}?containerID=${containerID}`);
    const data = await response.json();

    if (data.length === 0) {
      alertError(`Contenedor con ID "${containerID}" no encontrado.`);
      return;
    }

    const apiId = data[0].id; 

    // Delete request to API
    const deleteResponse = await fetch(`${API_URL}/${apiId}`, {
      method: "DELETE",
    });

    if (!deleteResponse.ok)
      throw new Error("No se pudo eliminar el contenedor.");

    alertSucces(`Contenedor "${containerID}" eliminado correctamente.`);
    await getContainers(); 
    $form.reset();
  } catch (error) {
    alertError(error.message);
  }
};

const updateContainer = async () => {
  const containerID = parseInt($containerID.value.trim(), 10);
  const cargo = $cargoType.value.trim();
  const origin = $originPort.value.trim();
  const destination = $destinationPort.value.trim();
  const status = $status.value.trim();

  // Validation for required fields
  if (!containerID || !cargo || !origin || !destination || !status) {
    alertError("Para actualizar, ingrese un ID y complete todos los campos.");
    return;
  }

  try {
    // Find container by containerID
    const response = await fetch(`${API_URL}?containerID=${containerID}`);
    const data = await response.json();

    if (data.length === 0) {
      alertError(
        `Contenedor con ID "${containerID}" no encontrado para actualizar.`
      );
      return;
    }

    const apiId = data[0].id;
    const updatedContainer = {
      containerID,
      cargo,
      origin,
      destination,
      status,
    };

    // Update request to API
    const updateResponse = await fetch(`${API_URL}/${apiId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedContainer),
    });

    if (!updateResponse.ok)
      throw new Error("No se pudo actualizar el contenedor.");

    alertSucces(`Contenedor "${containerID}" actualizado correctamente.`);
    await getContainers();
    $form.reset();
  } catch (error) {
    alertError(error.message);
  }
};

const findAndFillContainer = async () => {
  const containerID = parseInt($containerID.value.trim(), 10);
  if (!containerID) {
    alertError("Ingrese un ID para buscar.");
    return;
  }

  try {
    // Find by containerID
    const response = await fetch(`${API_URL}?containerID=${containerID}`);
    const data = await response.json();

    if (data.length === 0) {
      alertError(
        `No se encontró ningún contenedor con el ID "${containerID}".`
      );
      return;
    }

    const container = data[0];
    $cargoType.value = container.cargo;
    $originPort.value = container.origin;
    $destinationPort.value = container.destination;
    $status.value = container.status;

    alertSucces(
      `Datos del contenedor "${containerID}" cargados en el formulario.`
    );
  } catch (error) {
    alertError(error.message);
  }
};

function updateInventoryList(containers) {
  $inventoryList.innerHTML = "<h2>Inventario Actual:</h2>";
  if (containers.length === 0) {
    $inventoryList.innerHTML += "<p>No hay contenedores en el inventario.</p>";
    return;
  }

  const ul = document.createElement("ul");
  containers.forEach((c) => {
    const li = document.createElement("li");
    li.textContent = `ID: ${c.containerID}, Carga: ${c.cargo}, Origen: ${c.origin}, Destino: ${c.destination}, Estado: ${c.status}`;

    // Fill form when clicking on list item
    li.addEventListener("click", () => {
      $containerID.value = c.containerID;
      $cargoType.value = c.cargo;
      $originPort.value = c.origin;
      $destinationPort.value = c.destination;
      $status.value = c.status;
    });
    ul.appendChild(li);
  });
  $inventoryList.appendChild(ul);
}

// Button event assignments
document
  .getElementById("addContainerButton")
  .addEventListener("click", addContainer);
document
  .getElementById("viewContainersButton")
  .addEventListener("click", getContainers);
document
  .getElementById("deleteContainerButton")
  .addEventListener("click", deleteContainer);
document
  .getElementById("updateContainerButton")
  .addEventListener("click", updateContainer);

document.addEventListener("DOMContentLoaded", getContainers);

document
  .getElementById("searchContainerButton")
  .addEventListener("click", findAndFillContainer);
