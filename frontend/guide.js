const checklistContainer = document.querySelector("[data-checklist]");
const resetBtn = document.querySelector("[data-reset-checklist]");
const progressLabel = document.querySelector(".js-checklist-progress");
const storageKey = "pulsewave-checklist";

const loadState = () => {
  try {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : {};
  } catch (error) {
    console.warn("Unable to access checklist storage.", error);
    return {};
  }
};

const saveState = (state) => {
  try {
    localStorage.setItem(storageKey, JSON.stringify(state));
  } catch (error) {
    console.warn("Unable to persist checklist state.", error);
  }
};

const state = loadState();

const updateProgress = () => {
  if (!checklistContainer || !progressLabel) return;
  const items = checklistContainer.querySelectorAll("input[type='checkbox']");
  const total = items.length;
  const checked = [...items].filter((input) => input.checked).length;
  progressLabel.textContent = `${checked} / ${total} ready`;
};

const syncInputs = () => {
  if (!checklistContainer) return;
  checklistContainer.querySelectorAll("input[type='checkbox']").forEach((input) => {
    const savedValue = state[input.value];
    if (typeof savedValue === "boolean") {
      input.checked = savedValue;
    }
    input.closest(".checklist-item")?.classList.toggle("is-checked", input.checked);
  });
  updateProgress();
};

checklistContainer?.addEventListener("change", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLInputElement)) return;
  const parent = target.closest(".checklist-item");
  parent?.classList.toggle("is-checked", target.checked);
  state[target.value] = target.checked;
  saveState(state);
  updateProgress();
});

resetBtn?.addEventListener("click", () => {
  checklistContainer?.querySelectorAll("input[type='checkbox']").forEach((input) => {
    input.checked = false;
    state[input.value] = false;
    input.closest(".checklist-item")?.classList.remove("is-checked");
  });
  saveState(state);
  updateProgress();
});

syncInputs();

