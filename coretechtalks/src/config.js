export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
export const DISABLED_TOOLS = process.env.REACT_APP_DISABLED_TOOLS 
  ? process.env.REACT_APP_DISABLED_TOOLS.split(',').map(s => s.trim()) 
  : [];

