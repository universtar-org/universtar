const sortSelector = document.getElementById(
  "sort-selector",
) as HTMLSelectElement;
const projectList = document.querySelector<HTMLElement>(".project-list");

const getProjectCards = (): HTMLDivElement[] => {
  if (!projectList) {
    return [];
  }
  return Array.from(
    projectList?.querySelectorAll<HTMLDivElement>(".project-card"),
  );
};

class ProjectCard {
  star: number;
  update: Date;

  constructor(card: HTMLDivElement) {
    this.star = Number(card.dataset.stars ?? 0);
    this.update = new Date(card.dataset.update ?? "");
  }
}

sortSelector?.addEventListener("change", () => {
  const cards = getProjectCards();
  const value = sortSelector.value;

  cards.sort((a, b) => {
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

  cards.forEach((card) => projectList?.appendChild(card));
});
