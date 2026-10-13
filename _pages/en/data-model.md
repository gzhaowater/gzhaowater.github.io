---
lang: en
layout: archive
permalink: /en/year-archive/
title: ""
author_profile: true
---

Global Lake Evaporation Volume (GLEV) dataset
=======
Data available at: [Zenodo v1](https://doi.org/10.5281/zenodo.4646620), [Google Drive (v2)](https://drive.google.com/drive/folders/1d-vDopGx2hunx7pXNjTFVGLjH1heTaQ_?usp=sharing)

Data description: This global dataset contains the monthly surface area and evaporation volumes for [1,427,687 lakes and reservoirs](https://www.hydrosheds.org/products/hydrolakes) from Jan 1985 to Dec 2024.  

Related publication: Zhao, G., Y. Li, L. Zhou, H. Gao (2022), Evaporative water loss of 1.42 million global lakes, Nature Communications, 13, 3686. [doi.org/10.1038/s41467-022-31125-6](doi.org/10.1038/s41467-022-31125-6)

Interactive map: [Earth Engine App](https://zeternity.users.earthengine.app/view/glev)

Note: v1 covers 1985-2018 (as in the original paper); v2 is the updated 1984-2024 release.

----

Global reservoir surface area dataset (GRSAD)
=======
Data available at: [Texas Data Repository (v2)](https://dataverse.tdl.org/dataset.xhtml?persistentId=doi:10.18738/T8/DF80WG), [Google Drive (v3)](https://drive.google.com/drive/folders/1w3q2Ujb7quBWTl_J39wEVXArLl6RyTQ4?usp=sharing)

Data description: This dataset contains the time series of area values for 7246 global reservoirs (with an integrated capacity of 6810 km3) from 1984 to 2020 (updated). It was based on the dataset by [Pekel et al. (2016)](https://www.nature.com/articles/nature20584), with the contaminations from clouds, cloud shadows, and terrain shadows corrected automatically. 

Related publication: Zhao, G. and H. Gao (2018), Automatic correction of contaminated images for assessment of reservoir surface area dynamics, Geophysical Research Letters, [doi.org/10.1029/2018GL078343](doi.org/10.1029/2018GL078343) 

Interactive map: [Earth Engine App](https://ee-zhao.users.earthengine.app/view/grsad)

----

Global Dryland Lake Storage (GDLS) dataset
=======
Data available at: [Figshare](https://doi.org/10.6084/m9.figshare.25609902)

Data description: This dataset provides time series of lake water storage for ~100,000 dryland lakes worldwide from January 1985 to December 2020, supporting analysis of the decoupling between surface water storage and precipitation under anthropogenic influence.

Related publication: Zhao, G., H. Gao, Y. Li, et al. (2025), Decoupling of surface water storage from precipitation in global drylands due to anthropogenic activity, Nature Water, 3, 80–88. [doi.org/10.1038/s44221-024-00367-7](doi.org/10.1038/s44221-024-00367-7)

Interactive map: [Earth Engine App](https://ee-zhao.users.earthengine.app/view/gdls)

----

CROWN (China Reservoir Water Observation Network)
=======

The CROWN interactive map shows time-series water levels for major Chinese reservoirs, with marker overlays on a base map and click-to-load hydrographs backed by a live data server.

<p style="margin: 1.2em 0;">
  <a class="btn btn--primary btn--large" href="{{ '/crown/' | relative_url }}" target="_blank" rel="noopener">
    Open the CROWN map →
  </a>
</p>

Notes
- Click any reservoir marker to load its water-level time series in a floating chart panel.
- Data is served by an HTTPS endpoint (self-signed certificate) and may require accepting the certificate warning once per browser.
- For the underlying dataset and citations, see the related publications on the Publications page.
