import FlexSearch from "flexsearch";
import { ProjectCard, updateProjectCards } from "./project-card";

const projectIndex = new FlexSearch.Index({
  tokenize: "full",
  cache: true,
  encode: (str: string) => {
    const tokens: string[] = [];
    const latin = str.toLowerCase().match(/[a-z0-9]+/g);
    if (latin) {
      tokens.push(...latin);
    }
    const cjk = str.match(/[\u4e00-\u9fff]/g);
    if (cjk) {
      tokens.push(...cjk);
    }

    return tokens;
  },
});

const searchBox = document.getElementById("search-box") as HTMLInputElement;
const clearButton = document.getElementById(
  "search-clear-button",
) as HTMLButtonElement;

async function getProjectFromJSON() {
  const response = await fetch("/index.json");
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return response.json() as Promise<ProjectCard[]>;
}

async function initIndex() {
  const data: ProjectCard[] = await getProjectFromJSON();
  const delimiter = " ";
  for (const project of data) {
    projectIndex.add(
      project.id,
      [
        project.author,
        project.repo,
        project.tags.join(delimiter),
        project.description,
      ].join(delimiter),
    );
  }
}

export async function initSearch() {
  await initIndex();

  searchBox.addEventListener("input", () => {
    const query = searchBox.value.trim();
    if (!query) {
      updateProjectCards([], true);
      return;
    }

    const results = projectIndex.search(query);
    updateProjectCards(results);
  });

  clearButton.addEventListener("click", () => {
    searchBox.value = "";
    updateProjectCards([], true);
  });
}
