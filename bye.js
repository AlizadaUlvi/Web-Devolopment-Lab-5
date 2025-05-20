let profileData = {};
let originalData = {};

document.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await fetch("data.json");
    const data = await response.json();
    profileData = structuredClone(data);
    originalData = structuredClone(data);
    renderAll();
  } catch (e) {
    console.error("Failed to load data.json", e);
  }
});

function renderAll() {
  renderProfile();
  renderContact();
  renderLanguages();
  renderAbout();
  renderInterests();
  renderEducation();
  renderExperience();
  renderSkills();
  fillEditFields();
}

function renderProfile() {
  const profile = profileData.profile;
  document.getElementById("profileText").innerHTML = `
    <div class="imgbx">
      <img src="images.jpg" alt="Profile photo">
    </div>
    <h2>${profile.name}<br><span>${profile.title}</span></h2>
  `;
}

function renderContact() {
  const contacts = profileData.contact || [];
  document.getElementById("contactInfo").innerHTML = contacts.map(c => `
    <li>
      <span class="icon"><i class="fa ${c.icon}"></i></span>
      <span class="text">${c.info}</span>
    </li>
  `).join("");
}

function renderLanguages() {
  const languages = profileData.languages || [];
  document.getElementById("languageInfo").innerHTML = languages.map(lang => `
    <li>
      <span class="text">${lang.name}</span>
      <span class="percent"><div style="width: ${lang.percent}%"></div></span>
    </li>
  `).join("");
}

function renderAbout() {
  const about = profileData.about || "No bio available.";
  document.getElementById("aboutProfile").innerHTML = `
    <h2 class="title2">Profile</h2>
    <p>${about}</p>
  `;
}

function renderInterests() {
  const interests = profileData.interests || [];
  const icons = ["gamepad", "music", "futbol-o", "book"];
  document.getElementById("interestList").innerHTML = interests.map((item, i) => `
    <li><i class="fa fa-${icons[i % icons.length]}"></i>${item}</li>
  `).join("");
}

function renderEducation() {
  const educations = profileData.education || [];
  document.getElementById("educationInfo").innerHTML = educations.map(edu => `
    <li>
      <h5>${edu.year}</h5>
      <h4>${edu.degree}</h4>
      <h4>${edu.school}</h4>
    </li>
  `).join("");
}

function renderExperience() {
  const experiences = profileData.experience || [];
  document.getElementById("experienceList").innerHTML = experiences.map(exp => `
    <div class="box">
      <div class="year_Company">
        <h5>${exp.year}</h5>
        <h5>${exp.company}</h5>
      </div>
      <div class="text">
        <h4>${exp.position}</h4>
        <p>${exp.desc}</p>
      </div>
    </div>
  `).join("");
}

function renderSkills() {
  const skills = profileData.skills || [];
  document.getElementById("skillsList").innerHTML = skills.map(skill => `
    <div class="box">
      <h4>${skill.name}</h4>
      <div class="percent"><div style="width: ${skill.percent}%"></div></div>
    </div>
  `).join("");
}

function fillEditFields() {
  document.getElementById("editName").value = profileData.profile.name;
  document.getElementById("editTitle").value = profileData.profile.title;
}

function saveField(field) {
  const input = document.getElementById(`edit${capitalize(field)}`).value;
  profileData.profile[field] = input;
  renderAll();
}

function resetAll() {
  profileData = structuredClone(originalData);
  renderAll();
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
