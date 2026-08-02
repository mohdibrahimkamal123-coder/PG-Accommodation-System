import api from "./api";

export const getAllPgs = async () => {
  const response = await api.get("/pgs");
  return response.data;
};

export const getPgById = async (id) => {
  const response = await api.get(`/pgs/${id}`);
  return response.data;
};

export const getPgsByCity = async (city) => {
  const response = await api.get(`/pgs/city/${city}`);
  return response.data;
};

export const getTopRatedPgs = async () => {
  const response = await api.get("/pgs/top-rated");
  return response.data;
};

export const getPgsByRent = async (rent) => {
  const response = await api.get(`/pgs/rent/${rent}`);
  return response.data;
};

export const getWifiPgs = async () => {
  const response = await api.get("/pgs/wifi");
  return response.data;
};

export const getFoodPgs = async () => {
  const response = await api.get("/pgs/food");
  return response.data;
};

// ✅ NEW: Search PGs by query (for live search)
export const searchPgs = async (query) => {
  try {
    const response = await api.get(`/pgs/search?q=${encodeURIComponent(query)}`);
    return response.data;
  } catch (error) {
    console.error("Search error:", error);
    throw error;
  }
};

// ✅ NEW: Advanced search with multiple filters
export const advancedSearchPgs = async (filters) => {
  try {
    // Build query string from filters
    const params = new URLSearchParams();
    
    if (filters.query) {
      params.append('q', filters.query);
    }
    if (filters.city) {
      params.append('city', filters.city);
    }
    if (filters.state) {
      params.append('state', filters.state);
    }
    if (filters.minRent) {
      params.append('minRent', filters.minRent);
    }
    if (filters.maxRent) {
      params.append('maxRent', filters.maxRent);
    }
    if (filters.minRating) {
      params.append('minRating', filters.minRating);
    }
    if (filters.wifi !== undefined) {
      params.append('wifi', filters.wifi);
    }
    if (filters.food !== undefined) {
      params.append('food', filters.food);
    }
    if (filters.laundry !== undefined) {
      params.append('laundry', filters.laundry);
    }
    
    const response = await api.get(`/pgs/advanced-search?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error("Advanced search error:", error);
    throw error;
  }
};

// ✅ NEW: Get PGs by name (partial match)
export const getPgsByName = async (name) => {
  try {
    const response = await api.get(`/pgs/name/${encodeURIComponent(name)}`);
    return response.data;
  } catch (error) {
    console.error("Search by name error:", error);
    throw error;
  }
};

// ✅ NEW: Get PGs by state
export const getPgsByState = async (state) => {
  try {
    const response = await api.get(`/pgs/state/${encodeURIComponent(state)}`);
    return response.data;
  } catch (error) {
    console.error("Search by state error:", error);
    throw error;
  }
};

// ✅ NEW: Get PGs with filters (city, state, rent range, rating)
export const filterPgs = async (filters) => {
  try {
    const params = new URLSearchParams();
    
    Object.keys(filters).forEach(key => {
      if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
        params.append(key, filters[key]);
      }
    });
    
    const response = await api.get(`/pgs/filter?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error("Filter error:", error);
    throw error;
  }
};