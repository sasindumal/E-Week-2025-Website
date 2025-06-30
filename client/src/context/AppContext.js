import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";

// Initial State
const initialState = {
  events: [],
  leaderboard: [],
  galleryItems: [],
  loading: false,
  error: null,
  selectedCategory: "All",
  selectedYear: "All",
};

// Action Types
const ActionTypes = {
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
  SET_EVENTS: "SET_EVENTS",
  SET_LEADERBOARD: "SET_LEADERBOARD",
  SET_GALLERY_ITEMS: "SET_GALLERY_ITEMS",
  SET_SELECTED_CATEGORY: "SET_SELECTED_CATEGORY",
  SET_SELECTED_YEAR: "SET_SELECTED_YEAR",
  CLEAR_ERROR: "CLEAR_ERROR",
};

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    case ActionTypes.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    case ActionTypes.SET_EVENTS:
      return { ...state, events: action.payload, loading: false };
    case ActionTypes.SET_LEADERBOARD:
      return { ...state, leaderboard: action.payload, loading: false };
    case ActionTypes.SET_GALLERY_ITEMS:
      return { ...state, galleryItems: action.payload, loading: false };
    case ActionTypes.SET_SELECTED_CATEGORY:
      return { ...state, selectedCategory: action.payload };
    case ActionTypes.SET_SELECTED_YEAR:
      return { ...state, selectedYear: action.payload };
    case ActionTypes.CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};

// Create Context
const AppContext = createContext();

// Provider Component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // API Functions
  const fetchEvents = async (category = "All") => {
    try {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      const response = await axios.get(
        `/api/events${category !== "All" ? `?category=${category}` : ""}`,
      );
      dispatch({ type: ActionTypes.SET_EVENTS, payload: response.data });
    } catch (error) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
    }
  };

  const fetchLeaderboard = async () => {
    try {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      const response = await axios.get("/api/leaderboard");
      dispatch({ type: ActionTypes.SET_LEADERBOARD, payload: response.data });
    } catch (error) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
    }
  };

  const fetchGalleryItems = async (year = "All") => {
    try {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      const response = await axios.get(
        `/api/gallery${year !== "All" ? `?year=${year}` : ""}`,
      );
      dispatch({ type: ActionTypes.SET_GALLERY_ITEMS, payload: response.data });
    } catch (error) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
    }
  };

  const registerForEvent = async (eventId, teamName, members) => {
    try {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      const response = await axios.post("/api/register", {
        eventId,
        teamName,
        members,
      });
      dispatch({ type: ActionTypes.SET_LOADING, payload: false });
      return response.data;
    } catch (error) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
      throw error;
    }
  };

  // Action Creators
  const setSelectedCategory = (category) => {
    dispatch({ type: ActionTypes.SET_SELECTED_CATEGORY, payload: category });
    fetchEvents(category);
  };

  const setSelectedYear = (year) => {
    dispatch({ type: ActionTypes.SET_SELECTED_YEAR, payload: year });
    fetchGalleryItems(year);
  };

  const clearError = () => {
    dispatch({ type: ActionTypes.CLEAR_ERROR });
  };

  // Load initial data
  useEffect(() => {
    fetchEvents();
    fetchLeaderboard();
    fetchGalleryItems();
  }, []);

  const value = {
    ...state,
    fetchEvents,
    fetchLeaderboard,
    fetchGalleryItems,
    registerForEvent,
    setSelectedCategory,
    setSelectedYear,
    clearError,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom Hook
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

export default AppContext;
