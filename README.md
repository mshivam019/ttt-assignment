# Link : https://ttt-assignment-zeta.vercel.app


This is a NextJs component that displays a histogram of the 20 most common words in a text file. The component uses several libraries and plugins to accomplish this functionality:

1. `use client`: This is not a library or plugin, but rather a code comment indicating that the code is meant to be run on the client-side.

2. `useState` from the "react" library: This is a React hook that allows the component to maintain state. The component uses `useState` to keep track of the histogram data and whether or not to display the export button.

3. `saveAs` from the "file-saver" library: This is a plugin that allows the component to download a CSV file of the histogram data.

4. `Chart` from the "chart.js/auto" library: This is a library for creating charts and graphs. The component uses it to create the histogram.

5. `clsx` from the "clsx" library: This is a utility function for conditionally joining classNames together. The component uses it to conditionally apply styling to the histogram container div based on whether or not the export button is shown.

The component consists of a function called `IndexPage` that returns JSX, which is compiled to HTML by React. The JSX includes two buttons: one to submit the text file and generate the histogram, and one to export the histogram data to a CSV file. It also includes a div containing a canvas element with an ID of "histogram", which is where the histogram will be rendered. 

The component uses `useState` to keep track of the histogram data and whether or not to display the export button. When the submit button is clicked, the component sends a GET request to a text file hosted at https://www.terriblytinytales.com/test.txt, splits the text into individual words, and counts the frequency of each word. It then sorts the word counts in descending order and takes the top 20 most frequent words. The resulting data is stored in state using `setHistogramData`, and the export button is displayed using `setShowExportButton`.

When the export button is clicked, the component uses the `saveAs` plugin to create a CSV file containing the top 20 most frequent words and their counts.

The component also includes a function called `renderHistogram`, which uses `Chart` to render the histogram on the canvas element with the ID of "histogram". If `histogramData` is null, the function does nothing. Otherwise, it creates an object containing the data for the histogram, and uses `Chart` to create a bar chart with the specified options.

Overall, this component allows the user to submit a text file, generate a histogram of the 20 most common words in the text, and export the histogram data to a CSV file.