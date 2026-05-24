export const STIPEND_OPTIONS = [
  { label: 'Any', value: 0 },
  { label: '₹2,000+', value: 2000 },
  { label: '₹5,000+', value: 5000 },
  { label: '₹10,000+', value: 10000 },
  { label: '₹20,000+', value: 20000 },
  { label: '₹40,000+', value: 40000 },
];

export const DURATION_OPTIONS = [
  { label: 'Any', value: 0 },
  { label: '1 Month', value: 1 },
  { label: '2 Months', value: 2 },
  { label: '3 Months', value: 3 },
  { label: '4 Months', value: 4 },
  { label: '6 Months', value: 6 },
];

export const SORT_OPTIONS = [
  { label: 'Relevance', value: 'relevance' },
  { label: 'Stipend: High → Low', value: 'stipend_desc' },
  { label: 'Stipend: Low → High', value: 'stipend_asc' },
  { label: 'Duration: Short first', value: 'duration_asc' },
];

export const ITEMS_PER_PAGE = 12;
