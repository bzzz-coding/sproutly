"use client";

import React, { useState, useEffect } from "react";
import Button from "../components/Button";

export default function Home() {
  const [referenceDate, setReferenceDate] = useState(new Date());
  const [weeks, setWeeks] = useState(1);
  const [dateRelation, setDateRelation] = useState(-1);
  const [calculatedDate, setCalculatedDate] = useState<Date | null>(null);

  function getDateFromWeeks(
    referenceDate: Date,
    weeks: number,
    dateRelation: number
  ): Date {
    const millisecondsPerWeek = 7 * 24 * 60 * 60 * 1000;
    const weeksInMilliseconds = millisecondsPerWeek * weeks;

    const newDate = new Date(
      referenceDate.getTime() + weeksInMilliseconds * dateRelation
    );

    return newDate;
  }

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReferenceDate(new Date(event.target.value));
    setCalculatedDate(null);
  };

  const handleWeeksChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWeeks(parseInt(event.target.value));
    setCalculatedDate(null);
  };

  const handlePositiveChange = () => {
    setDateRelation(1);
    setCalculatedDate(null);
  };

  const handleNegativeChange = () => {
    setDateRelation(-1);
    setCalculatedDate(null);
  };

  const handleCalculateClick = () => {
    const newDate = getDateFromWeeks(referenceDate, weeks, dateRelation);
    setCalculatedDate(newDate);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-5xl font-bold">Gardening Date Calculator</h1>
      <p className="py-6">
        Enter a reference date and number of weeks to calculate the date before
        or after.
      </p>
      <div className="flex flex-col mb-4">
        <label htmlFor="referenceDate" className="label">
          <span className="label-text">Reference Date:</span>
        </label>
        <input
          type="date"
          id="referenceDate"
          name="referenceDate"
          value={referenceDate.toISOString().split("T")[0]}
          onChange={handleDateChange}
          className="input input-bordered input-primary w-full max-w-xs"
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="weeks" className="label">
          <span className="label-text">Weeks:</span>
        </label>
        <input
          type="number"
          id="weeks"
          name="weeks"
          value={weeks}
          onChange={handleWeeksChange}
          className="input input-bordered input-primary w-full max-w-xs"
        />
      </div>
      <div className="flex flex-row gap-x-3 mb-4">
        <Button
          onClick={handleNegativeChange}
          active={dateRelation === -1}
          color="secondary"
          text="Before"
        />
        <Button
          onClick={handlePositiveChange}
          active={dateRelation === 1}
          color="secondary"
          text="After"
        />
      </div>
      <button
        onClick={handleCalculateClick}
        className="btn btn-primary btn-outline"
      >
        Calculate
      </button>
      {calculatedDate && (
        <p className="py-6">
          {`Date ${weeks} week${weeks > 1 ? "s" : ""} ${
            dateRelation < 0 ? "before" : "after"
          } ${referenceDate.toLocaleDateString()}: ${calculatedDate.toLocaleDateString()}`}
        </p>
      )}
    </div>
  );
}
