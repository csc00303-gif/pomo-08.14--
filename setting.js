const STORAGE_KEY = "pomodoroMinutes";

const timeInput = document.getElementById("time-input");

let originalValue = timeInput.value.trim();

function loadSavedMinutes() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved !== null) {
    timeInput.value = saved;
  }
  originalValue = timeInput.value.trim();
}

function saveMinutes() {
  const rawValue = timeInput.value.trim();

  if (rawValue === "") {
    alert("타이머 시간을 입력해주세요.");
    return;
  }

  if (rawValue === originalValue) {
    alert("변경된 내용이 없습니다.");
    return;
  }

  const minutes = Number(rawValue);

  if (!Number.isInteger(minutes) || minutes < 1 || minutes > 60) {
    alert("1분 이상 60분 이하로 설정해주세요.");
    return;
  }

  localStorage.setItem(STORAGE_KEY, String(minutes));
  alert("타이머 설정이 저장되었습니다.");
  window.location.href = "index.html";
}

loadSavedMinutes();
