---
title: "Trillium: UBC Orbit"
excerpt: "Redundant Data Storage for Space<br/><img src='https://basilwong.github.io/files/logos/ubc-orbit.png' width='200'>"
collection: portfolio
---

# Background 

In outer space, ionizing radiation can cause electronics to malfunction. Individual bits can become “latched-up” or “flipped”, meaning that the state of the bit can be frozen, or incorrectly set. This results in corrupted memory. While radiation-hardened(resistant) components are commercially available, they are extremely expensive. 

# Trillium Project

Trillium is a low-cost alternative to radiation hardened memory. Instead of aiming the negate the effects of radiation, Trillium aims to detect the errors induced by radiation, and counteract them. When a malfunctioning bit is detected, the system is correspondingly corrected.

# My Role

On the Communications and Data Handling team at UBC Orbit, I lead the development Trillium
  * Team Lead of the 8 person Communications Data Management Team 
  * Management role: Hardware/Software integration with other teams(COMMs, Payload), assigning members tasks to keep the team on schedule, ramping up new team members 
  * Technical role:  Implementing protocol API for communication between microcontrollers and the modules of other teams over SPI, I2C, UART 
  * Spearheaded design and prototype of triple redundant STM32f401 microcontrollers for space applications 
    * Estimated at 10% of the cost of a normal radiation hardened microcontroller 
	* Successfully tested a prototype under proton beam at TRIUMF facility November 2017 
	* Design is based on C



