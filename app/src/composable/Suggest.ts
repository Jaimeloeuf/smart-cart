import { ref, watch } from "vue";
import { useSearch, type SearchOptions } from "./Search";

/**
 * Composable to encapsulate auto suggest and click to complete logic.
 * This builts on top of the useSearch composable.
 */
export function useSuggest<T>(
  searchables: Array<T>,
  searchOptions: SearchOptions,
  clearSearchInputHandler?: () => unknown
) {
  const { searchInput, results, clearSearchInput } = useSearch(
    searchables,
    searchOptions,
    clearSearchInputHandler
  );

  const hideDropDown = ref<boolean>(true);

  /** Function to set suggestion to input */
  function selectSuggestion(selectedSuggestion: string) {
    searchInput.value = selectedSuggestion;

    // Use setTimeout to run this after the render loop pass for searchInput
    // update completes so that the searchInput setting won't trigger the drop
    // down to show again.
    setTimeout(() => (hideDropDown.value = true));
  }

  // Watch search input to hide/show dropdown
  watch(searchInput, () => {
    if (
      // Hide dropdown if input is cleared
      searchInput.value === "" ||
      // Hide dropdown if there is no search result
      results.value.length === 0 ||
      // Hide dropdown if input matches the first result of the suggestion
      (results.value.length > 0 &&
        // @todo Temporary type hack to make it work just for `Item` type
        (results.value[0]?.item as { name: string })?.name ===
          searchInput.value)
    )
      hideDropDown.value = true;
    // else show dropdown
    else hideDropDown.value = false;
  });

  // expose managed state as return value
  return {
    searchInput,
    results,
    clearSearchInput,
    hideDropDown,
    selectSuggestion,
  };
}
