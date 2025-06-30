import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useApp } from "../context/AppContext";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

const Events = () => {
  const { events, loading, selectedCategory, setSelectedCategory } = useApp();
  const [registrationModal, setRegistrationModal] = useState(null);

  const categories = [
    "All",
    "Technical",
    "Engineering",
    "Innovation",
    "Entertainment",
  ];

  const handleRegister = (event) => {
    setRegistrationModal(event);
  };

  const closeModal = () => {
    setRegistrationModal(null);
  };

  return (
    <Layout>
      <div className="pt-16 py-20">
        <div className="container">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Event Schedule
            </h1>
            <p className="text-xl opacity-80 max-w-2xl mx-auto">
              Explore all the exciting events planned for E-Week 2025
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`btn ${
                  selectedCategory === category
                    ? "btn-primary"
                    : "btn-secondary"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-8">
              <div className="loading"></div>
              <p className="mt-4">Loading events...</p>
            </div>
          )}

          {/* Events Grid */}
          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <div key={event.id} className="card">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-white">
                      {event.title}
                    </h3>
                    <span className="bg-red text-white px-3 py-1 rounded-full text-xs font-medium">
                      {event.category}
                    </span>
                  </div>

                  <p className="text-white opacity-80 mb-6 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-white opacity-70">
                      <Calendar className="w-4 h-4 mr-3 text-red" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center text-white opacity-70">
                      <Clock className="w-4 h-4 mr-3 text-red" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-white opacity-70">
                      <MapPin className="w-4 h-4 mr-3 text-red" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center text-white opacity-70">
                      <Users className="w-4 h-4 mr-3 text-red" />
                      <span>{event.participants}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRegister(event)}
                    className="btn btn-primary w-full"
                  >
                    Register for Event
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* No Events Message */}
          {!loading && events.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl opacity-80">
                No events found for the selected category.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Registration Modal */}
      {registrationModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-navy rounded-xl p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Register for {registrationModal.title}
            </h3>
            <p className="text-white opacity-80 mb-6">
              Registration will be available soon. Stay tuned for updates!
            </p>
            <div className="flex gap-4">
              <button className="btn btn-primary flex-1">Notify Me</button>
              <button onClick={closeModal} className="btn btn-secondary flex-1">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Events;
