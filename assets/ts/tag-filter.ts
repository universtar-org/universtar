const color2ctp = (color: string): readonly [string, string] => [
  `bg-ctp-${color}/20`,
  `text-ctp-${color}`,
];
const selectedColor = color2ctp("overlay0");
const normalColor = color2ctp("overlay2");
const hiddenClass = "hidden";

const showAllTag = document.querySelector<HTMLElement>(".select-all-tags");
const tagFilters = document.querySelectorAll<HTMLElement>(".tag-filter");
const projectCards = document.querySelectorAll<HTMLElement>(".project-card");

let activeTags = new Set<string>(["All"]);

function setTagStyle(tagFilter: HTMLElement, selected: boolean) {
  const tagDiv = tagFilter.querySelector<HTMLDivElement>("div");
  if (!tagDiv) {
    return;
  }

  if (selected) {
    tagDiv.classList.remove(...normalColor);
    tagDiv.classList.add(...selectedColor);
  } else {
    tagDiv.classList.remove(...selectedColor);
    tagDiv.classList.add(...normalColor);
  }
}

tagFilters.forEach((tagFilter) => {
  tagFilter.addEventListener("change", () => {
    const checkbox = tagFilter.querySelector<HTMLInputElement>("input");
    const tag = tagFilter.dataset.tag;

    if (!checkbox || !tag) {
      return;
    }

    if (checkbox.checked) {
      activeTags.delete("All");
      activeTags.add(tag);
      setTagStyle(tagFilter, true);

      const allCheckBox = showAllTag?.querySelector<HTMLInputElement>("input");
      if (allCheckBox) {
        allCheckBox.checked = false;
      }
      if (showAllTag) {
        setTagStyle(showAllTag, false);
      }
    } else {
      activeTags.delete(tag);
      setTagStyle(tagFilter, false);

      if (activeTags.size === 0) {
        activeTags.add("All");
        const allCheckBox =
          showAllTag?.querySelector<HTMLInputElement>("input");
        if (allCheckBox) {
          allCheckBox.checked = true;
        }
        if (showAllTag) {
          setTagStyle(showAllTag, true);
        }
      }
    }

    updateProjectCards();
  });
});

showAllTag?.addEventListener("change", () => {
  const checkbox = showAllTag.querySelector<HTMLInputElement>("input");
  if (!checkbox) {
    return;
  }

  if (checkbox.checked) {
    activeTags.clear();
    activeTags.add("All");

    tagFilters.forEach((tagFilter) => {
      const cb = tagFilter.querySelector<HTMLInputElement>("input");
      if (!cb) {
        return;
      }
      cb.checked = false;
      setTagStyle(tagFilter, false);
    });
  }

  updateProjectCards();
});

function updateProjectCards() {
  projectCards.forEach((card) => {
    const tags = (card.dataset.tags ?? "").split(",");
    const shouldShow =
      activeTags.has("All") || tags.some((tag) => activeTags.has(tag));
    card.classList.toggle(hiddenClass, !shouldShow);
  });
}
