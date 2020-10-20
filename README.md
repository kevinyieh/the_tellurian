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

## Team Members
- Team-lead: Kevin Yieh
- Backend-lead: Wilson Li 
- Frontend-lead: Becca Burten 
- Flex: Donald Herndon
