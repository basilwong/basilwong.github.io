---
title: "Trillium: UBC Orbit"
excerpt: "Redundant Data Storage for Space<br/><img src='https://basilwong.github.io/files/logos/ubc-orbit.png' width='200'>"
collection: portfolio
---

# Background

In outer space, ionizing radiation can cause electronics to malfunction. Individual bits can become “latched-up” or “flipped”, meaning that the state of the bit can be frozen, or incorrectly set. The name for the effect of radiation on the computer state is called a single event upset which results in corrupted memory and unanticipated code execution. While radiation-hardened(resistant) components are commercially available, they are extremely expensive.

A single event upset (SEU) is a change of state caused by one single ionizing particle (ions, electrons, photons...) striking a sensitive node in a micro-electronic device, such as in a microprocessor, semiconductor memory, or power transistors. The state change is a result of the free charge created by ionization in or close to an important node of a logic element (e.g. memory "bit"). The error in device output or operation caused as a result of the strike is called an SEU or a soft error.

# UBC Orbit



# Trillium Project

Trillium is a low-cost alternative to radiation hardened memory. Instead of aiming the negate the effects of radiation, Trillium aims to detect the errors induced by radiation, and counteract them. When a malfunctioning bit is detected, the system is corrected correspondingly.

# Hardware

The Communications and Data Handling part of the satellite required an MCU which was able to fit the power requirements of the satellite, the clock speed to do the job, and the I/O peripherals to facilitate communication with all the parts of the satellite. We ended up using an MCU with the model name STMf401re. During development we used the Nucleo development board to flash our implementations and test on the STMf401re's. The Trillium design utilized 3 STMf401re's connected to each other.

# Redundant Computation and Memory

Trillium is able to detect and correct single event upsets by using redundant computation and memory. Essentially, three of the same MCUs are running the same process at the same time. The changes in bits or state are detected when they compare memory and current process state.
The design implements the comparison by comparing the values/states of two of the MCU's, then if they are different, determining that the third MCU is correct. The first and second MCU's then take on the state and values of the third MCU. The comparison algorithm was implemented this way because it was simpler and we determined that the probability a single event upset would occur on two MCU's causing the comparison algorithm to believe an unknown state was correct was negligible. In the case that the first and second MCU's values were the same, the third MCU would be given the value the first and second MCUs agreed on.

An exception to the redundant computation process was I/O as it was simpler to have all the components connect to one of the MCUs, then have that MCU forward the signals to the other two.

# My Role

On the Communications and Data Handling team at UBC Orbit, I lead the development Trillium
  * Team Lead of the 8 person Communications Data Management Team
  * Management role: Hardware/Software integration with other teams(COMMs, Payload), assigning members tasks to keep the team on schedule, ramping up new team members
  * Technical role:  Implementing protocol API for communication between microcontrollers and the modules of other teams over SPI, I2C, UART
  * Spearheaded design and prototype of triple redundant STM32f401 microcontrollers for space applications
    * Estimated at 10% of the cost of a normal radiation hardened microcontroller
	* Successfully tested a prototype under proton beam at TRIUMF facility November 2017
	* Design is based on C
