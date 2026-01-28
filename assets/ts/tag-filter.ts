import { projectCards } from "./project-card";

const hiddenClass = "hidden";
const showAllTag = document.querySelector<HTMLElement>(".select-all-tags");
const tagFilters = document.querySelectorAll<HTMLElement>(".tag-filter");

let activeTags = new Set<string>(["All"]);

function setTagStyle(tagFilter: HTMLElement, selected: boolean) {
  const tagDiv = tagFilter.querySelector<HTMLDivElement>("div");
  if (!tagDiv) {
    return;
  }

  const selectedStyleClass = "tag-filter-selected";
  const normalStyleClass = "tag-filter-normal";
  if (selected) {
    tagDiv.classList.remove(normalStyleClass);
    tagDiv.classList.add(selectedStyleClass);
  } else {
    tagDiv.classList.remove(selectedStyleClass);
    tagDiv.classList.add(normalStyleClass);
  }
}

function updateProjectCards() {
  projectCards.forEach((card) => {
    const tags = (card.dataset.tags ?? "").split(",");
    const shouldShow =
      activeTags.has("All") || tags.some((tag) => activeTags.has(tag));
    card.classList.toggle(hiddenClass, !shouldShow);
  });
}

export function initTagFilter() {
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

        const allCheckBox =
          showAllTag?.querySelector<HTMLInputElement>("input");
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
      setTagStyle(showAllTag, true);

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
}
