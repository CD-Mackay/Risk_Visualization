## Climate Change Risk Visualizer

  - Welcome! This application was originally built as an assessment project for a developer role. The purpose of the application is to fetch climate risk data from a spreadsheet and present it in a visual, user-friendly manner. 
  - To run the application, first clone the repository to your local machine
    - Run ```npm install``` to install dependencies
    - ```npm run dev``` will boot the development version in your local environment.

## Features
  - This application has three primary features

  ### Interactive Map
    - The map displays color coded markers indicating the location and relative risk level of various businesses. Hover over the marker to access more information
      - Data is displayed according to the selected decade, use the dropdown at the top of the map to look at projected risk for other timelines.

  ### Line Chart
    - The line chart can either be used to display cumulative risk for a geographic location, or risk for all assets belonging to a specific company. Use the dropdown menus at the top of the page to change parameters.

  ### Data Table
    - A more user friendly version of the spreadsheet the data is fetched from. Pagination assists with managing the enormous dataset, and every category can be sorted and filtered.

    !["View of the main screen of the application"](/public/images/climate_risk_screenshot.png?raw=true "Optional title")