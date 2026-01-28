import { projectList, projectCards, ProjectCard } from "./project-card";

export function initSortSelector() {
  const sortSelector = document.getElementById(
    "sort-selector",
  ) as HTMLSelectElement;

  sortSelector?.addEventListener("change", () => {
    const value = sortSelector.value;

    projectCards.sort((a, b) => {
      const aCard = new ProjectCard(a);
      const bCard = new ProjectCard(b);

      switch (value) {
        case "star-desc": {
          return bCard.star - aCard.star;
        }
        case "star-asce": {
          return aCard.star - bCard.star;
        }
        case "update-desc": {
          return bCard.update.getTime() - aCard.update.getTime();
        }
        default: {
          return aCard.update.getTime() - bCard.update.getTime();
        }
      }
    });

    projectCards.forEach((card) => projectList?.appendChild(card));
  });
}
