// Production default — used whenever VITE_API_ORIGIN isn't set (e.g. production builds).
const DEFAULT_API_ORIGIN = 'https://api.drboahemaantim.com';

export const API_ORIGIN = import.meta.env.VITE_API_ORIGIN || DEFAULT_API_ORIGIN;
export const API_BASE = `${API_ORIGIN}/api`;
