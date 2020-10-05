# The Tellurian

## Background and Overview
The Tellurian is an aggregate world news source where users can find and save breaking news stories from around the globe.


## Functionality and MVP
Logged in users will interface with an interactive globe, where they can select countries to view country statistics and breaking news stories as sourced from the NYT. They can then bookmark and access saved articles on their profile, or navigate to the news source for further reading. Countries with the most current breaking stories will be indicated visually, and a search bar will be available to aid users in locating countries of interest. 


## Technologies and Technical Challenges
The Tellurian uses MongoDB, Mongoose, Express, React, Redux, Node.js, AMCharts, Axios.
The Tellurian also pulls data from the [New York Times API](https://developer.nytimes.com/docs/articlesearch-product/1/overview) (Semantic & Articles) and the [World Bank API](https://data.worldbank.org/).



## Group Members and Work Breakdown
- Team-lead: Kevin Yieh the Prodigy
- Backend-lead: Wilson Li the List Element
- Frontend-lead: Becca Burten the BB
- Flex: Donald Herndon the Young Gun

# Days One-Two
  - KY: Interactive map will center upon click and search bar in the Nav component
  - WL: Seeding country statistics database, including Schema/Model/Show Route and beginning News API implementation
  - BB: Set up splash page and Frontend User Auth
  - DH: Backend User Auth and implementing OAuth integration
  
# Days Three-Four
  - KY: News API integration backend, fetching data for index
  - WL: News API integration backend, and db saving articles as users bookmark
  - BB: News API integration frontend Div components to show country stats and article index
  - DH: Div styling and animation for splash
