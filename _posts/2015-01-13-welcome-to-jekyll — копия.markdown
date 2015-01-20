---
layout: post
title:  "Welcome to Jekyll!"
date:   2015-01-13 11:17:15
categories: jekyll update
---
{{ site.time | date_to_string }}

 {{ site.members | group_by:"graduation_year" }}

[{"name"=>"2013", "items"=>[...]}, {"name"=>"2014", "items"=>[...]}] 
