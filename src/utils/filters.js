export function filterByProfile(internships, query) {
  if (!query) return internships;
  const q = query.toLowerCase().trim();
  return internships.filter(
    (i) =>
      i.profileName.toLowerCase().includes(q) ||
      i.title.toLowerCase().includes(q) ||
      i.companyName.toLowerCase().includes(q)
  );
}

export function filterByLocation(internships, locations) {
  if (!locations || locations.length === 0) return internships;
  const selected = new Set(locations.map((l) => l.toLowerCase()));

  return internships.filter((i) => {
    if (selected.has('work from home') && i.workFromHome) return true;
    return i.locationNames.some((loc) => selected.has(loc.toLowerCase()));
  });
}

export function filterByDuration(internships, maxMonths) {
  if (!maxMonths || maxMonths === 0) return internships;
  return internships.filter((i) => i.durationMonths <= maxMonths);
}

export function filterByStipend(internships, minStipend) {
  if (!minStipend || minStipend === 0) return internships;
  return internships.filter((i) => i.stipendValue >= minStipend);
}

export function applyFilters(internships, filters) {
  let result = internships;
  result = filterByProfile(result, filters.profile);
  result = filterByLocation(result, filters.locations);
  result = filterByDuration(result, filters.duration);
  result = filterByStipend(result, filters.stipend);
  return result;
}

export function sortInternships(internships, sortBy) {
  if (!sortBy || sortBy === 'relevance') return internships;

  const sorted = [...internships];

  switch (sortBy) {
    case 'stipend_desc':
      sorted.sort((a, b) => b.stipendValue - a.stipendValue);
      break;
    case 'stipend_asc':
      sorted.sort((a, b) => a.stipendValue - b.stipendValue);
      break;
    case 'duration_asc':
      sorted.sort((a, b) => a.durationMonths - b.durationMonths);
      break;
    default:
      break;
  }

  return sorted;
}

export function extractUniqueLocations(internships) {
  const locationSet = new Set();
  internships.forEach((i) => {
    if (i.workFromHome) {
      locationSet.add('Work from Home');
    }
    i.locationNames.forEach((loc) => {
      if (loc !== 'Work from Home') locationSet.add(loc);
    });
  });
  return Array.from(locationSet).sort();
}

export function extractUniqueProfiles(internships) {
  const profileSet = new Set();
  internships.forEach((i) => {
    if (i.profileName) profileSet.add(i.profileName);
  });
  return Array.from(profileSet).sort();
}
