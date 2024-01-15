"use client";
import { useState } from "react";
import { saveAs } from "file-saver";
import Chart from "chart.js/auto";
import clsx from "clsx";

const IndexPage = () => {
  const [histogramData, setHistogramData] = useState(null);
  const [showExportButton, setShowExportButton] = useState(false);

  const handleSubmit = async () => {
    const file = await fetch("/test.txt").then((response) => response.blob());
    const text = await file.text();
    const words = text.split(/[,\s'"()\[\]{}?!\\/]+|\.\s|\.\n/).filter((word) => word.length > 0);
    const wordCounts = new Map();
    for (const word of words) {
      wordCounts.set(
        word.toLowerCase(),
        (wordCounts.get(word.toLowerCase()) ?? 0) + 1
      );
    }

    const sortedWordCounts = new Map(
      [...wordCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 20)
    );
    setHistogramData(sortedWordCounts);
    setShowExportButton(true);
  };

  const handleExport = () => {
    if (histogramData) {
      const csv = Array.from(
        histogramData,
        ([word, count]) => `${word},${count}`
      ).join("\n");
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      saveAs(blob, "histogram.csv");
    }
  };
  const renderHistogram = () => {
    if (histogramData) {
      const chartData = {
        labels: Array.from(histogramData.keys()),
        datasets: [
          {
            data: Array.from(histogramData.values()),
            label: "frequency",
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 1,
          },
        ],
      };
      const ctx = document.getElementById("histogram").getContext("2d");

      new Chart(ctx, {
        type: "bar",
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              ticks: { autoSkip: false },
            },
            y: {
              ticks: {
                beginAtZero: true,
              },
            },
          },
        },
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
      {!showExportButton && (
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleSubmit}
        >
          Submit
        </button>
      )}
      {showExportButton && (
        <button
          className="ml-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleExport}
        >
          Export
        </button>
      )}
      <div
        className={clsx(
          "my-6",
          showExportButton
            ? " bg-white rounded-lg p-6 max-w-md w-full h-72"
            : ""
        )}
      >
        <canvas id="histogram"></canvas>
      </div>
      {renderHistogram()}
    </div>
  );
};

export default IndexPage;
