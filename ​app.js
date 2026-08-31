// Estado do App
const state = {
  platform: 'mobile',
  btnSize: 55,
  sensi: {
    '1shot': 120,
    'smg': 150,
    'ar': 135,
    'shotgun': 160,
    'touch': 140
  }
};

document.addEventListener("DOMContentLoaded", () => {
  detectDevice();
});

function switchTab(screenId, btn) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.querySelectorAll(".nav-item").forEach(b => b.classList.remove("active"));
  
  document.getElementById(screenId).classList.add("active");
  btn.classList.add("active");
}

function detectDevice() {
  const userAgent = navigator.userAgent;
  let deviceName = "Android Genérico";
  
  if (/Samsung/i.test(userAgent)) deviceName = "Samsung Galaxy";
  else if (/Xiaomi|Redmi/i.test(userAgent)) deviceName = "Xiaomi / Redmi";
  else if (/Motorola/i.test(userAgent)) deviceName = "Motorola Moto";
  else if (/iPhone/i.test(userAgent)) deviceName = "Apple iPhone";

  document.getElementById("dash-device").innerText = deviceName;
}

function setPlatform(plat, btn) {
  state.platform = plat;
  document.querySelectorAll(".plat-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  showToast(`Modo alternado para: ${plat.toUpperCase()}`);
}

function updateVal(type) {
  const val = document.getElementById(`sensi-${type}`).value;
  document.getElementById(`val-${type}`).innerText = val;
  state.sensi[type] = val;
}

function loadProPreset(preset) {
  if (preset === 'nobru') {
    setSliderValues(140, 165, 130, 175, 150);
    showToast("Preset Rushador Carregado!");
  } else if (preset === 'bak') {
    setSliderValues(110, 130, 120, 140, 120);
    showToast("Preset Precisão Carregado!");
  } else if (preset === 'thurzin') {
    setSliderValues(180, 170, 160, 190, 160);
    showToast("Preset Capador 1T Carregado!");
  }
}

function setSliderValues(s1, smg, ar, sg, touch) {
  document.getElementById("sensi-1shot").value = s1;
  document.getElementById("sensi-smg").value = smg;
  document.getElementById("sensi-ar").value = ar;
  document.getElementById("sensi-shotgun").value = sg;
  document.getElementById("sensi-touch").value = touch;
  
  ['1shot','smg','ar','shotgun','touch'].forEach(updateVal);
}

function copyWeaponSensi() {
  const text = `=== SENSI PRO CALIBRAÇÃO ===
1 Tiro: ${state.sensi['1shot']}
SMG: ${state.sensi['smg']}
AR: ${state.sensi['ar']}
Espingarda: ${state.sensi['shotgun']}
Resposta do Toque: ${state.sensi['touch']}
===========================`;

  navigator.clipboard.writeText(text).then(() => {
    showToast("✓ Configuração copiada!");
  });
}

function setBtnSize(size, elem) {
  state.btnSize = size;
  document.querySelectorAll(".size-btn").forEach(b => b.classList.remove("active"));
  elem.classList.add("active");
}

function generateAISuggestion() {
  const resultsBox = document.getElementById("ai-results");
  const output = document.getElementById("ai-output");
  
  const suggestedDpi = state.platform === 'mobile' ? 620 : 400;
  
  resultsBox.classList.remove("hidden");
  output.innerHTML = `
    <p>• <strong>DPI Recomendada:</strong> ${suggestedDpi}</p>
    <p>• <strong>Tamanho do Botão:</strong> ${state.btnSize}%</p>
    <p>• <strong>Velocidade do Ponteiro:</strong> Máxima (-1)</p>
  `;
  showToast("Recomendação Gerada!");
}

function launchGame(packageType) {
  const ffPackage = packageType === 'freefiremax' ? 'com.dts.freefiremax' : 'com.dts.freefireth';
  window.location.href = `intent://#Intent;scheme=android-app;package=${ffPackage};end`;
}

function showToast(msg) {
  const t = document.getElementById("toast");
  t.innerText = msg;
  t.classList.remove("hidden");
  setTimeout(() => t.classList.add("hidden"), 2000);
}

