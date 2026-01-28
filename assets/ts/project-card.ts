import { DefaultSearchResults } from "flexsearch";
import { HIDDEN_CLASS } from "./constants";

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

export function updateProjectCards(activeTags: Set<string>): void;
export function updateProjectCards(
  ids: DefaultSearchResults,
  displayAll?: boolean,
): void;

export function updateProjectCards(
  arg: Set<string> | DefaultSearchResults,
  displayAll: boolean = false,
) {
  if (arg instanceof Set) {
    projectCards.forEach((card) => {
      const tags = (card.dataset.tags ?? "").split(",");
      const shouldShow = arg.has("All") || tags.some((tag) => arg.has(tag));
      card.classList.toggle(HIDDEN_CLASS, !shouldShow);
    });

    return;
  }

  if (displayAll) {
    projectCards.forEach((card) => card.classList.remove(HIDDEN_CLASS));
    return;
  }

  projectCards.forEach((card) => {
    if (!arg.includes(card.id)) {
      card.classList.add(HIDDEN_CLASS);
    } else {
      card.classList.remove(HIDDEN_CLASS);
    }
  });
}
