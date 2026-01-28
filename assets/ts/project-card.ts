export let projectList: HTMLElement | null;
export let projectCards: HTMLDivElement[] = [];

export class ProjectCard {
  id: string = "";
  stars: number = 0;
  update: Date | null = null;
  repo: string = "";
  author: string = "";
  description: string = "";
  tags: string[] = [];

  [key: string]: any;

  constructor(card: HTMLDivElement | Record<string, any>) {
    this.id = card.id;
    this.tags = ((card.dataset.tags ?? "") as string).split(",");

    if ("dataset" in card) {
      // Initialize from DOM.
      this.update = new Date(card.dataset.update ?? "");
      this.stars = Number(card.dataset.stars ?? 0);
    } else {
      // Initialize from JSON.
      this.description = card.description;
      this.repo = card.repo;
      this.author = card.author;
    }
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
