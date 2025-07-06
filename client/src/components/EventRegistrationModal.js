import React, { useState, useEffect } from "react";
import {
  X,
  Users,
  Calendar,
  MapPin,
  Clock,
  User,
  Award,
  AlertCircle,
  CheckCircle,
  UserPlus,
  Crown,
} from "lucide-react";

const EventRegistrationModal = ({ event, isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    eventId: "",
    batch: "",
    teamName: "",
    teamSize: 1,
    isTeamEvent: false,
    maxTeamsPerBatch: 0,
    maxPlayersPerBatch: 0,
    participants: [
      {
        name: "",
        registrationNumber: "",
        contactNumber: "",
        email: "",
        isCaptain: true,
      },
    ],
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationStats, setRegistrationStats] = useState({});

  // Batch options
  const batches = ["E20", "E21", "E22", "E23", "E24", "Staff"];

  // Initialize form data when event changes
  useEffect(() => {
    if (event && isOpen) {
      const isTeam = event.type === "team";
      const maxTeams = event.maxTeamsPerBatch || 2;
      const maxPlayers = event.maxPlayersPerBatch || 20;
      const teamSize = isTeam ? event.playersPerTeam || 4 : 1;

      setFormData({
        eventId: event.id,
        batch: "",
        teamName: isTeam ? "" : `${event.name} - Individual`,
        teamSize: teamSize,
        isTeamEvent: isTeam,
        maxTeamsPerBatch: maxTeams,
        maxPlayersPerBatch: maxPlayers,
        participants: Array.from({ length: teamSize }, (_, index) => ({
          name: "",
          registrationNumber: "",
          contactNumber: "",
          email: "",
          isCaptain: index === 0,
        })),
      });

      // Simulate fetching current registration stats
      fetchRegistrationStats(event.id);
    }
  }, [event, isOpen]);

  const fetchRegistrationStats = (eventId) => {
    // Simulate API call to get current registrations
    const mockStats = {
      E20: { teams: 1, players: 15 },
      E21: { teams: 2, players: 18 },
      E22: { teams: 1, players: 12 },
      E23: { teams: 0, players: 8 },
      E24: { teams: 0, players: 5 },
      Staff: { teams: 0, players: 2 },
    };
    setRegistrationStats(mockStats);
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate batch selection
    if (!formData.batch) {
      newErrors.batch = "Please select your batch";
    }

    // Check registration limits
    if (formData.batch) {
      const currentStats = registrationStats[formData.batch] || {
        teams: 0,
        players: 0,
      };

      if (formData.isTeamEvent) {
        if (currentStats.teams >= formData.maxTeamsPerBatch) {
          newErrors.batch = `Maximum ${formData.maxTeamsPerBatch} teams already registered for ${formData.batch}`;
        }
        if (!formData.teamName.trim()) {
          newErrors.teamName = "Team name is required";
        }
      } else {
        if (currentStats.players >= formData.maxPlayersPerBatch) {
          newErrors.batch = `Maximum ${formData.maxPlayersPerBatch} players already registered for ${formData.batch}`;
        }
      }
    }

    // Validate participants
    formData.participants.forEach((participant, index) => {
      if (!participant.name.trim()) {
        newErrors[`participant_${index}_name`] = "Name is required";
      }
      if (!participant.registrationNumber.trim()) {
        newErrors[`participant_${index}_registrationNumber`] =
          "Registration number is required";
      }
      if (!participant.contactNumber.trim()) {
        newErrors[`participant_${index}_contactNumber`] =
          "Contact number is required";
      } else if (
        !/^\d{10}$/.test(participant.contactNumber.replace(/\s/g, ""))
      ) {
        newErrors[`participant_${index}_contactNumber`] =
          "Please enter a valid 10-digit contact number";
      }
      if (!participant.email.trim()) {
        newErrors[`participant_${index}_email`] = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(participant.email)) {
        newErrors[`participant_${index}_email`] =
          "Please enter a valid email address";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear related errors
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleParticipantChange = (index, field, value) => {
    const updatedParticipants = [...formData.participants];
    updatedParticipants[index] = {
      ...updatedParticipants[index],
      [field]: value,
    };

    setFormData((prev) => ({
      ...prev,
      participants: updatedParticipants,
    }));

    // Clear related errors
    const errorKey = `participant_${index}_${field}`;
    if (errors[errorKey]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[errorKey];
        return newErrors;
      });
    }
  };

  const addParticipant = () => {
    if (formData.participants.length < formData.teamSize) {
      setFormData((prev) => ({
        ...prev,
        participants: [
          ...prev.participants,
          {
            name: "",
            registrationNumber: "",
            contactNumber: "",
            email: "",
            isCaptain: false,
          },
        ],
      }));
    }
  };

  const removeParticipant = (index) => {
    if (
      formData.participants.length > 1 &&
      !formData.participants[index].isCaptain
    ) {
      const updatedParticipants = formData.participants.filter(
        (_, i) => i !== index,
      );
      setFormData((prev) => ({
        ...prev,
        participants: updatedParticipants,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const registrationData = {
        ...formData,
        eventName: event.name,
        submittedAt: new Date().toISOString(),
      };

      onSubmit(registrationData);
      onClose();
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCurrentStats = () => {
    if (!formData.batch) return null;
    return registrationStats[formData.batch] || { teams: 0, players: 0 };
  };

  const canRegister = () => {
    if (!formData.batch) return true;
    const stats = getCurrentStats();
    if (formData.isTeamEvent) {
      return stats.teams < formData.maxTeamsPerBatch;
    } else {
      return stats.players < formData.maxPlayersPerBatch;
    }
  };

  if (!isOpen || !event) return null;

  return (
    <div className="modal-overlay-events">
      <div className="modal-content-events">
        <div className="modal-header-events">
          <div className="event-header-info">
            <h2 className="modal-title-events">Register for {event.name}</h2>
            <div className="event-meta-info">
              <div className="meta-item">
                <Calendar className="w-4 h-4" />
                <span>{event.date}</span>
              </div>
              <div className="meta-item">
                <Clock className="w-4 h-4" />
                <span>{event.time}</span>
              </div>
              <div className="meta-item">
                <MapPin className="w-4 h-4" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="modal-close-events">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="modal-body-events">
          <form onSubmit={handleSubmit} className="registration-form">
            {/* Event Type Info */}
            <div className="event-type-info">
              <div
                className={`event-type-badge ${formData.isTeamEvent ? "team" : "individual"}`}
              >
                {formData.isTeamEvent ? (
                  <>
                    <Users className="w-4 h-4" />
                    <span>Team Event ({formData.teamSize} players)</span>
                  </>
                ) : (
                  <>
                    <User className="w-4 h-4" />
                    <span>Individual Event</span>
                  </>
                )}
              </div>
              <div className="event-limits">
                {formData.isTeamEvent ? (
                  <span>Max {formData.maxTeamsPerBatch} teams per batch</span>
                ) : (
                  <span>
                    Max {formData.maxPlayersPerBatch} players per batch
                  </span>
                )}
              </div>
            </div>

            {/* Batch Selection */}
            <div className="form-group">
              <label className="form-label">
                <Users className="w-4 h-4" />
                Select Your Batch *
              </label>
              <select
                value={formData.batch}
                onChange={(e) => handleInputChange("batch", e.target.value)}
                className={`form-select ${errors.batch ? "error" : ""}`}
                required
              >
                <option value="">Choose your batch</option>
                {batches.map((batch) => (
                  <option key={batch} value={batch}>
                    {batch}
                  </option>
                ))}
              </select>
              {errors.batch && (
                <div className="error-message">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.batch}</span>
                </div>
              )}
            </div>

            {/* Registration Status for Selected Batch */}
            {formData.batch && (
              <div className="registration-status">
                <h4>Current Registration Status for {formData.batch}</h4>
                <div className="status-grid">
                  {formData.isTeamEvent ? (
                    <div className="status-item">
                      <div className="status-number">
                        {getCurrentStats()?.teams || 0} /{" "}
                        {formData.maxTeamsPerBatch}
                      </div>
                      <div className="status-label">Teams Registered</div>
                      <div className="status-bar">
                        <div
                          className="status-fill"
                          style={{
                            width: `${((getCurrentStats()?.teams || 0) / formData.maxTeamsPerBatch) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ) : (
                    <div className="status-item">
                      <div className="status-number">
                        {getCurrentStats()?.players || 0} /{" "}
                        {formData.maxPlayersPerBatch}
                      </div>
                      <div className="status-label">Players Registered</div>
                      <div className="status-bar">
                        <div
                          className="status-fill"
                          style={{
                            width: `${((getCurrentStats()?.players || 0) / formData.maxPlayersPerBatch) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
                {!canRegister() && (
                  <div className="warning-message">
                    <AlertCircle className="w-4 h-4" />
                    <span>Registration limit reached for {formData.batch}</span>
                  </div>
                )}
              </div>
            )}

            {/* Team Name (for team events) */}
            {formData.isTeamEvent && (
              <div className="form-group">
                <label className="form-label">
                  <Award className="w-4 h-4" />
                  Team Name *
                </label>
                <input
                  type="text"
                  value={formData.teamName}
                  onChange={(e) =>
                    handleInputChange("teamName", e.target.value)
                  }
                  className={`form-input ${errors.teamName ? "error" : ""}`}
                  placeholder="Enter your team name"
                  required
                />
                {errors.teamName && (
                  <div className="error-message">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.teamName}</span>
                  </div>
                )}
              </div>
            )}

            {/* Participants */}
            <div className="participants-section">
              <div className="section-header">
                <h4>
                  {formData.isTeamEvent
                    ? "Team Members"
                    : "Participant Details"}
                  <span className="participant-count">
                    ({formData.participants.length} / {formData.teamSize})
                  </span>
                </h4>
                {formData.isTeamEvent && (
                  <p className="section-note">
                    The first member will be designated as the team captain
                  </p>
                )}
              </div>

              {formData.participants.map((participant, index) => (
                <div key={index} className="participant-card">
                  <div className="participant-header">
                    <div className="participant-title">
                      {formData.isTeamEvent ? (
                        participant.isCaptain ? (
                          <>
                            <Crown className="w-4 h-4 text-yellow-400" />
                            <span>Team Captain</span>
                          </>
                        ) : (
                          <>
                            <User className="w-4 h-4" />
                            <span>Team Member {index}</span>
                          </>
                        )
                      ) : (
                        <>
                          <User className="w-4 h-4" />
                          <span>Participant</span>
                        </>
                      )}
                    </div>
                    {!participant.isCaptain &&
                      formData.participants.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeParticipant(index)}
                          className="remove-participant"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                  </div>

                  <div className="participant-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Full Name *</label>
                        <input
                          type="text"
                          value={participant.name}
                          onChange={(e) =>
                            handleParticipantChange(
                              index,
                              "name",
                              e.target.value,
                            )
                          }
                          className={`form-input ${errors[`participant_${index}_name`] ? "error" : ""}`}
                          placeholder="Enter full name"
                          required
                        />
                        {errors[`participant_${index}_name`] && (
                          <div className="error-message">
                            <AlertCircle className="w-4 h-4" />
                            <span>{errors[`participant_${index}_name`]}</span>
                          </div>
                        )}
                      </div>

                      <div className="form-group">
                        <label className="form-label">
                          Registration Number *
                        </label>
                        <input
                          type="text"
                          value={participant.registrationNumber}
                          onChange={(e) =>
                            handleParticipantChange(
                              index,
                              "registrationNumber",
                              e.target.value,
                            )
                          }
                          className={`form-input ${errors[`participant_${index}_registrationNumber`] ? "error" : ""}`}
                          placeholder="e.g., E/21/123"
                          required
                        />
                        {errors[`participant_${index}_registrationNumber`] && (
                          <div className="error-message">
                            <AlertCircle className="w-4 h-4" />
                            <span>
                              {
                                errors[
                                  `participant_${index}_registrationNumber`
                                ]
                              }
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Contact Number *</label>
                        <input
                          type="tel"
                          value={participant.contactNumber}
                          onChange={(e) =>
                            handleParticipantChange(
                              index,
                              "contactNumber",
                              e.target.value,
                            )
                          }
                          className={`form-input ${errors[`participant_${index}_contactNumber`] ? "error" : ""}`}
                          placeholder="07XXXXXXXX"
                          required
                        />
                        {errors[`participant_${index}_contactNumber`] && (
                          <div className="error-message">
                            <AlertCircle className="w-4 h-4" />
                            <span>
                              {errors[`participant_${index}_contactNumber`]}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="form-group">
                        <label className="form-label">Email Address *</label>
                        <input
                          type="email"
                          value={participant.email}
                          onChange={(e) =>
                            handleParticipantChange(
                              index,
                              "email",
                              e.target.value,
                            )
                          }
                          className={`form-input ${errors[`participant_${index}_email`] ? "error" : ""}`}
                          placeholder="example@email.com"
                          required
                        />
                        {errors[`participant_${index}_email`] && (
                          <div className="error-message">
                            <AlertCircle className="w-4 h-4" />
                            <span>{errors[`participant_${index}_email`]}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {formData.isTeamEvent &&
                formData.participants.length < formData.teamSize && (
                  <button
                    type="button"
                    onClick={addParticipant}
                    className="add-participant-btn"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Add Team Member</span>
                  </button>
                )}
            </div>

            {/* Form Actions */}
            <div className="form-actions">
              <button
                type="button"
                onClick={onClose}
                className="btn-cancel-events"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-submit-events"
                disabled={isSubmitting || !canRegister()}
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Submit Registration</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventRegistrationModal;
