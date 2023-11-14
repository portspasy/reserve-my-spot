import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import "./CarParkInterface.css";
import ConfirmationDialog from "./ConfirmationDialog";
import axios from "axios";

const ParkingSpot = ({ id, status, onSpotClick, onBookClick }) => {
  const handleClick = useCallback(() => {
    if (status === "available") {
      onSpotClick(id);
    }
  }, [id, status, onSpotClick]);

  return (
    <div
      className={`parking-spot ${status}`}
      onClick={handleClick}
      data-cy={`parking-spot-${status}-${id}`}
    >
      {status === "booked" && <img src="top-view-car.png" alt="Car parked" />}
      {status === "available" && <span>{id}</span>}
      {status === "selected" && (
        <>
          <span>{id}</span>
          <button
            onClick={() => onBookClick(id)}
            aria-label={`Book spot ${id}`}
          >
            BOOK
          </button>
        </>
      )}
    </div>
  );
};

ParkingSpot.propTypes = {
  id: PropTypes.string.isRequired,
  status: PropTypes.oneOf(["available", "booked", "selected"]).isRequired,
  onSpotClick: PropTypes.func.isRequired,
  onBookClick: PropTypes.func.isRequired,
};

const CarParkGrid = ({ spots, onSpotClick, onBookClick }) => {
  return (
    <div className="parking-grid">
      {spots.map((spot) => (
        <ParkingSpot
          key={spot.id}
          id={spot.id}
          status={spot.status}
          onSpotClick={onSpotClick}
          onBookClick={onBookClick}
        />
      ))}
    </div>
  );
};

CarParkGrid.propTypes = {
  spots: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSpotClick: PropTypes.func.isRequired,
  onBookClick: PropTypes.func.isRequired,
};

const CarParkInterface = () => {
  const [spots, setSpots] = useState([]);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const totalSpots = spots.length;
  const availableSpots = spots.filter(
    (spot) => spot.status === "available"
  ).length;

  useEffect(() => {
    const fetchSpots = async () => {
      try {
        const response = await axios.get("./spots.json"); // Replace with your API endpoint
        setSpots(response.data);
      } catch (error) {
        console.error("Error fetching spots:", error);
      }
    };

    fetchSpots();
  }, []);

  const handleSpotClick = useCallback((id) => {
    setSpots((currentSpots) =>
      currentSpots.map((spot) => ({
        ...spot,
        status:
          spot.id === id
            ? "selected"
            : spot.status === "selected"
            ? "available"
            : spot.status,
      }))
    );
    setSelectedSpot(id);
  }, []);

  const handleBookClick = useCallback((id) => {
    setIsDialogOpen(true);
  }, []);

  const handleConfirmBooking = useCallback(() => {
    setSpots((currentSpots) =>
      currentSpots.map((spot) => ({
        ...spot,
        status: spot.id === selectedSpot ? "booked" : spot.status,
      }))
    );
    setSelectedSpot(null);
    setIsDialogOpen(false);
  }, [selectedSpot]);

  // Function to close the dialog
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div>
      <h1>SMART CAR PARKING</h1>
      <div>
        <p>Total Spots: {totalSpots}</p>
        <p>Available Spots: {availableSpots}</p>
      </div>
      <CarParkGrid
        spots={spots}
        onSpotClick={handleSpotClick}
        onBookClick={handleBookClick}
      />
      <ConfirmationDialog
        open={isDialogOpen}
        spotId={selectedSpot}
        onConfirmBooking={handleConfirmBooking}
        onClose={handleCloseDialog}
      />
    </div>
  );
};

export default CarParkInterface;
