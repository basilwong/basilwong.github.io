---
title: "Human Motion Monitor"
description: "Fall Detection Product"
thumbnail: "/files/logos/human-motion-monitor-pic.png"
order: 5
tags: ["c", "embedded", "iot"]
---

# Summary

The human motion monitoring module detects when its user falls and uses the LTE module to connect to the internet and send for help. The module utilizes Riot Micro's Bluetooth based LTE chip for the purpose of communicating fall detection alerts. The LTE chip provides the user with freedom to leave the range of a Wi-Fi or Bluetooth network. Riot Micro's Bluetooth based LTE module allows for much lower power usage compared to normal LTE module. A low power rating is important in this application as it allows for longer battery life.

# Background

The human global population is aging as many states across the world are experiencing an increase in quantity and proportion of older persons in their society. The number of people of age 60 or older is expected to rise from 962 million globally (2017) to 2.1 billion in 2050 and 3.1 billion in 2100.

One of the leading causes of senior emergency room visits is falling. The motivation for this project was to reduce the severity of those hospital visits due to falling by decreasing the response time, especially for patients who routinely go outside the reach of a Wi-Fi network.

# Sponsor

Riot Micro (acquired by [STMicroelectronics](https://www.st.com/content/st_com/en.html)) develops industry-leading wireless chipsets for smart objects in the Internet of Things.

# Design

For this project, we followed an [Analog Dialogue article by Ning Jia](https://www.analog.com/en/analog-dialogue/articles/detecting-falls-3-axis-digital-accelerometer.html) and a [paper by Wu, F., Zhao, H., Zhao, Y., and Zhong, H](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4346101/).

Below is the project's system level diagram:

<img src="/files/cap-2/system-level-diagram.JPG" width='600'>

During a fall, there are two easily distinguishable states - free-fall and impact:

<img src="/files/cap-2/graph.JPG">

Fall detection algorithm flow:

<img src="/files/cap-2/flow-chart.JPG">

# Testing

## Fall Testing Results

| Fall Scenario | Percentage Passed |
|---|---|
| Forward Falls | 87 |
| Backward Falls | 87 |
| Sitting | 80 |
| Walking | 80 |

<img src="/files/cap-2/fall-testing-results.JPG" width='400'>

# Server-side Architecture

<img src="/files/cap-2/server-side.JPG" width='500'>
