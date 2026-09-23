---
layout: archive
permalink: /year-archive/
title: ""
author_profile: true
redirect_from:
  - /wordpress/blog-posts/
---

全球湖泊蒸发量（GLEV）数据集
=======
数据获取：[Zenodo](https://doi.org/10.5281/zenodo.4646620)

数据说明：本全球数据集包含1985年1月至2018年12月期间，全球[142.7万个湖泊和水库](https://www.hydrosheds.org/products/hydrolakes)的月度水面面积和蒸散发体积。

相关论文：Zhao, G., Y. Li, L. Zhou, H. Gao (2022), Evaporative water loss of 1.42 million global lakes, Nature Communications, 13, 3686. [doi.org/10.1038/s41467-022-31125-6](doi.org/10.1038/s41467-022-31125-6)

交互地图：[Earth Engine App](https://zeternity.users.earthengine.app/view/glev)

注：1984至2020年的更新版本可联系作者获取。

<!---<iframe
  src="https://zeternity.users.earthengine.app/view/glev"
  style="width:100%; height:600px;"
></iframe>-->

----

全球水库水面面积数据集（GRSAD）
=======
数据获取：[Texas Data Repository (v2)](https://dataverse.tdl.org/dataset.xhtml?persistentId=doi:10.18738/T8/DF80WG)、[Google Drive (v3)](https://drive.google.com/drive/folders/1w3q2Ujb7quBWTl_J39wEVXArLl6RyTQ4?usp=sharing)

数据说明：本数据集包含1984至2020年（更新版）全球7246座水库（总库容6810 km³）的面积时间序列。数据基于 [Pekel et al. (2016)](https://www.nature.com/articles/nature20584) 研发，并自动校正了云、云影和地形阴影造成的图像污染。

相关论文：Zhao, G. and H. Gao (2018), Automatic correction of contaminated images for assessment of reservoir surface area dynamics, Geophysical Research Letters, [doi.org/10.1029/2018GL078343](doi.org/10.1029/2018GL078343)

交互地图：[Earth Engine App](https://ee-zhao.users.earthengine.app/view/grsad)

<!---<iframe
  src="https://ee-zhao.users.earthengine.app/view/grsad"
  style="width:100%; height:600px;"
></iframe>-->

----

CROWN（中国水库水观测网络）
=======

CROWN 交互地图展示中国主要水库的水位时间序列，底图上叠加水库标记，点击即可在浮动面板中加载由实时数据服务器支撑的水位过程线。

<p style="margin: 1.2em 0;">
  <a class="btn btn--primary btn--large" href="{{ '/crown/' | relative_url }}" target="_blank" rel="noopener">
    打开 CROWN 地图 →
  </a>
</p>

说明
- 点击任一水库标记，即可在浮动图表面板中加载其水位时间序列。
- 数据由 HTTPS 端点（自签名证书）提供，浏览器可能需要接受一次证书警告。
- 底层数据集与引用信息，请参见"论著"页面的相关论文。

----

XNKK Photos（XNKK 相册）
=======

私人照片库。访问需要登录；凭据由办公室认证服务器校验（服务器上线前暂以占位模式运行）。

<p style="margin: 1.2em 0;">
  <a class="btn btn--primary btn--large" href="{{ '/xnkk_photos/' | relative_url }}">
    登录查看照片 →
  </a>
</p>
