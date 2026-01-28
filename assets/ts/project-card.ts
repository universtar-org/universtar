export let projectList: HTMLElement | null;
export let projectCards: HTMLDivElement[] = [];

export class ProjectCard {
  id: string;
  star: number;
  update: Date;

  constructor(card: HTMLDivElement) {
    this.id = card.id;
    this.star = Number(card.dataset.stars ?? 0);
    this.update = new Date(card.dataset.update ?? "");
  }
}

export function initProjects() {
  projectList = document.querySelector<HTMLElement>(".project-list");
  if (!projectList) {
    return;
  }
  projectCards = Array.from(
    projectList?.querySelectorAll<HTMLDivElement>(".project-card"),
  );
}
