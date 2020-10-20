<p align="center">
  <img width="610" height="120" src="https://tellurian.s3.amazonaws.com/tellurian_logo.gif" ></img>
</p>

## Background and Overview
[The Tellurian](http://the-tellurian.herokuapp.com/#/) is an aggregate world news source where users can find and save breaking news stories from around the globe.


## Functionality and MVP
Logged in users will interface with an interactive globe, where they can select countries to view country statistics and breaking news stories sourced from various news APIs(NYT, newsAPI, newscatcher). A search bar is available to aid users in quickly locating countries of interest. 

<p align="center">
<img display: inline-block width: "480" height="230" src ="https://tellurian.s3.amazonaws.com/demo_gif_small.gif"></img>
</p>

Users also have the ability to bookmark and access saved articles on their profile, or navigate to the news source for further reading. 
<p align="center">
<img display: inline-block width: "480" height ="230" src="https://tellurian.s3.amazonaws.com/bookmark_demo.gif"></img>
</p>

## Team Members
- Team-lead: Kevin Yieh the Prodigy
- Backend-lead: Wilson Li the List Element
- Frontend-lead: Becca Burten the BB
- Flex: Donald Herndon the Young Gun

## Technologies and Technical Challenges
The Tellurian is built using React, Redux, Node.js, CSS, MongoDB, Mongoose, Express, amCharts4, and Axios.

The Tellurian fetches data from the following APIs:
* [New York Times API](https://developer.nytimes.com/docs/articlesearch-product/1/overview)
* [NewsAPI](https://newsapi.org/)
* [World Bank API](https://data.worldbank.org/)

One technical challenge we faced was the asynchronicity of HTTP requests in Javascript. Our solution was to utilize the Promise object's .all method to     aggregate the responses from the APIs we fetched from.   

```
const fetchAll = async (req,res) => {
    const {cca2, countryName} = req.body;
    let articles = [];
    await Promise.allSettled([
      nytFetch(countryName)
        .then((resp) => {
          articles = resp ? articles.concat(resp) : articles;
      }),
      newsapiFetch(cca2)
        .then((resp) => {
          articles = resp ? articles.concat(resp) : articles;
        })
      ])
      .catch((err) => res.status(400).json(err));
      
    res.json({ [cca2]: articles });
}
```

Another technical hurdle we overcame was *media query difficulty here*


# Implementation Timeline
### Day One
  * KY: Interactive map will center upon click and search bar in the Nav component
  * WL: Seeding country statistics database, including Schema/Model/Show Route and beginning News API implementation
  * BB: Set up splash page and Frontend User Auth
  * DH: Backend User Auth and implementing OAuth integration
 
### Day Two
  * KY: 
  * WL: 
  * BB: 
  * DH: 
  
### Day Three
  * KY: 
  * WL: 
  * BB: 
  * DH: 
  
### Day Four
  * KY: News API integration backend, fetching data for index
  * WL: News API integration backend, and db saving articles as users bookmark
  * BB: News API integration frontend Div components to show country stats and article index
  * DH: Div styling and animation for splash
