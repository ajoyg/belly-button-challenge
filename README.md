# Belly Button Challenge
This challenge is a part of the UC Berkeley Data Analytics and Visualization Bootcamp Module 14 challenge. The assignment is to build an interactive dashboard to explore the [Belly Button Biodiversity dataset](http://robdunnlab.com/projects/belly-button-biodiversity/), which catalogs the microbes that colonize human navels.

The interactive dashboard read from from a json file. The app.js in the static folder creates the follwing elements of the dashboard:
1. A drop down list of subject IDs that were studied as part of the analysis.
2. A bar chart of the top 10 microbial species or operational taxonomic units (OTU) for each subject.
3. A bubble chart of all the different OTU values for each subject.
4. A gauge chart that shows how frequently the subject washed their belly botton per week.
5. The dashboard is updated every time the use picks a new subject.

The interactive dashboard is live [here](https://ajoyg.github.io/belly-button-challenge/).