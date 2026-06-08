// ===== SEARCH =====
function searchTools() {
  const query = document
      .getElementById('searchInput')
          .value.toLowerCase().trim();

            if (query === '') {
                filteredTools = [...allTools];
                  } else {
                      filteredTools = allTools.filter(tool =>
                            tool.name.toLowerCase().includes(query) ||
                                  tool.category.toLowerCase().includes(query) ||
                                        tool.description.toLowerCase().includes(query) ||
                                              tool.pricing.toLowerCase().includes(query)
                                                  );
                                                    }

                                                      renderTools(true);
                                                        updateCount();
                                                        }