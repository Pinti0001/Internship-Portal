import axios from 'axios';

const API_URL = 'https://internshala.com/hiring/search';
const PROXY_URL = 'https://api.allorigins.win/raw?url=';

function normalizeInternship(raw) {
  const durationMatch = raw.duration?.match(/(\d+)/);
  const durationMonths = durationMatch ? parseInt(durationMatch[1], 10) : 0;

  return {
    id: raw.id,
    title: raw.title,
    profileName: raw.profile_name || '',
    companyName: raw.company_name || '',
    companyLogo: raw.company_logo
      ? `https://internshala.com/uploads/logo/${raw.company_logo}`
      : null,
    workFromHome: raw.work_from_home || false,
    type: raw.type || 'regular',
    duration: raw.duration || '',
    durationMonths,
    startDate: raw.start_date || '',
    postedOn: raw.posted_on || '',
    postedLabel: raw.posted_by_label || '',
    postedLabelType: raw.posted_by_label_type || 'info',
    locationNames: raw.work_from_home
      ? ['Work from Home']
      : raw.location_names || [],
    stipendRaw: raw.stipend?.salary || 'Unpaid',
    stipendValue: raw.stipend?.salaryValue1 || 0,
    stipendType: raw.stipend?.salaryType || 'unpaid',
    isPPO: raw.is_ppo || false,
    labels: raw.labels_app_in_card || [],
    applicationDeadline: raw.application_deadline || '',
    url: raw.url || '',
    isInternational: raw.is_international_job || false,
    officeDays: raw.office_days || null,
  };
}

export async function fetchInternships() {
  let data;

  try {
    const res = await axios.get(API_URL, {
      headers: { Accept: 'application/json' },
      timeout: 8000,
    });
    data = res.data;
  } catch {
    const proxyRes = await axios.get(
      `${PROXY_URL}${encodeURIComponent(API_URL)}`,
      { timeout: 10000 }
    );
    data = typeof proxyRes.data === 'string'
      ? JSON.parse(proxyRes.data)
      : proxyRes.data;
  }

  const { internships_meta, internship_ids } = data;

  if (!internships_meta || !internship_ids) {
    throw new Error('Invalid API response structure');
  }

  return internship_ids
    .map((id) => internships_meta[id])
    .filter(Boolean)
    .map(normalizeInternship);
}
