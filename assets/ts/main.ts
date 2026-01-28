import { initHorizontalScroll } from "./horizontal-scroll";
import { initProjects } from "./project-card";
import { initSearch } from "./search";
import { initSortSelector } from "./sorter";
import { initLanguageSwitcher } from "./switch-language";
import { initThemeSwitcher } from "./switch-theme";
import { initTagFilter } from "./tag-filter";

initProjects();
initSortSelector();
initLanguageSwitcher();
initThemeSwitcher();
initTagFilter();
initHorizontalScroll();
initSearch();
