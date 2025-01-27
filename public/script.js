function validateSport() {
  const sportInput = document
    .getElementById("sport")
    .value.trim()
    .toLowerCase();
  const sportsList = Array.from(
    document.querySelectorAll(".sports-list li h1")
  ).map((h1) => h1.textContent.toLowerCase());

  if (sportsList.includes(sportInput)) {
    alert("Sport already exists.");
    return false;
  }
  return true;
}

async function deleteSport(sportName) {
  try {
    const response = await fetch(`/adminPage/${sportName}`, {
      method: "DELETE",
    });
    const sports = await response.json();

    const sportItem = document.querySelector(`li[data-sport="${sportName}"]`);
    if (sportItem) {
      sportItem.remove();
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

function openSessionForm() {
  document.getElementById("sessionFormContainer").style.display = "block";
}

function updateSession(sessionId, sessions) {
  // console.log("working or not");
  sessions = JSON.parse(sessions);

  console.log("Update the form where the id is:", sessionId);

  const formContainer = document.getElementById("updateSessionFormContainer");
  if (formContainer) {
    formContainer.style.display = "block";
  } else {
    console.error("Form container not found!");
    return;
  }

  const session = sessions.find((s) => s.id === sessionId);
  console.log("Found session:", session);

  if (!session) {
    console.error("Session not found!");
    return;
  }

  document.getElementById("sessionId").value = session.id;
  document.getElementById("sport").value = session.sport;
  document.getElementById("teamA").value = session.teamA;
  document.getElementById("teamASize").value = parseInt(session.teamAsize) || 0;
  document.getElementById("teamB").value = session.teamB;
  document.getElementById("teamBSize").value = parseInt(session.teamBsize) || 0;
  document.getElementById("actualSize").value =
    parseInt(session.actualSize) || 0;
  document.getElementById("place").value = session.place;
  document.getElementById("date").value = session.date
    ? session.date.split("T")[0]
    : "";
  document.getElementById("time").value = session.time;
}

async function submitSessionForm(event) {
  event.preventDefault();
  const form = document.getElementById("sessionForm");
  const formData = new FormData(form);

  const formObject = {};

  formData.forEach((value, key) => {
    if (!isNaN(value) && value.trim() !== "") {
      formObject[key] = parseInt(value, 10);
    } else {
      formObject[key] = value;
    }
  });

  console.log(formObject);

  try {
    const response = await fetch("/create-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formObject),
    });

    const result = await response.json();
    console.log("Server Response:", result);

    if (response.ok) {
      alert("Session created successfully!");
      window.location.reload();
    } else {
      alert("Error creating session!");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("There was an error while creating the session.");
  }
}

function deleteSession(sessionId) {
  fetch(`/delete-session/${sessionId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        location.reload(); // Reload the page to reflect the changes
      } else {
        console.error("Failed to delete the session.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function getFormData(event) {
  const form = document.getElementById("updateSessionForm");
  const sessionData = {
    sessionId: form.sessionId.value,
    sport: form.sport.value,
    teamA: form.teamA.value,
    teamASize: parseInt(form.teamASize.value),
    teamB: form.teamB.value,
    teamBSize: parseInt(form.teamBSize.value),
    actualSize: parseInt(form.actualSize.value),
    place: form.place.value,
    date: form.date.value,
    time: form.time.value,
  };

  fetch("/update-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sessionData),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response.text().then((text) => {
        throw new Error(text);
      });
    })
    .then((data) => {
      console.log("Session updated:", data);
      alert("Session updated successfully!");
      window.location.reload();
      document.getElementById("updateSessionFormContainer").style.display =
        "none";
    })
    .catch((error) => {
      console.error("Error updating session:", error);
      alert("Error updating session: " + error.message);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  const sessionId = getSessionIdSomehow();
  if (sessionId) {
    console.log("Session ID:", sessionId);
  } else {
    console.error("Session ID not found.");
  }
});

function getSessionIdSomehow() {
  const sessionElement = document.querySelector(".session");

  if (sessionElement) {
    return sessionElement.dataset.sessionId;
  } else {
    console.error("Session element not found!");
    return null;
  }
}

function toggleJoinUnjoin(sessionId) {
  const joinButton = document.getElementById(`joinButton${sessionId}`);
  const unjoinButton = document.getElementById(`unjoinButton${sessionId}`);

  if (joinButton.classList.contains("hidden")) {
    joinButton.classList.remove("hidden");
    unjoinButton.classList.add("hidden");
    decreaseTeamSize(sessionId);
  } else {
    joinButton.classList.add("hidden");
    unjoinButton.classList.remove("hidden");
    updateTeamSize(sessionId);
  }
}

async function updateTeamSize(sessionId) {
  try {
    console.log("Session ID:", sessionId);

    const response = await fetch("/updateIncreaseTeamSize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "An unknown error occurred.");
    }

    const data = await response.json();
    console.log("Update successful:", data);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

async function decreaseTeamSize(sessionId) {
  try {
    console.log("Session ID:", sessionId);

    const response = await fetch("/updateDecreaseTeamSize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "An unknown error occurred.");
    }

    const data = await response.json();
    console.log("Decrease successful:", data);
  } catch (error) {
    console.error("Error:", error.message);
  }
}
