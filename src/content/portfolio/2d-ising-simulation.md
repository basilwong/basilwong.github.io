---
title: "2D Ising Model Simulation"
description: "Visualization of a 2D Ising Model"
thumbnail: "/files/ising-model/ising_screenshot.PNG"
order: 8
tags: ["matlab", "physics", "simulation"]
repoUrl: "https://github.com/basilwong/monte-carlo-2D-ising"
---

# Monte Carlo Simulation of the 2D Ising model

Explores the properties of the generalized Ising Model in 2 dimensions. The spins are arranged in a square lattice and interact with the nearest neighbors only. Periodic boundary conditions are imposed in both directions. Link to the source code [here](https://github.com/basilwong/monte-carlo-2D-ising).

Below is the visualization of the lattice over time given an inverse temperature and starting from a random configuration. The interaction between neighbors causes the elements of the lattice to group into like polarizations. As you can see in the video the lattice goes from very checkered and random to eventually showing clumps of polarizations grouped together.

<video src="/files/ising-model/ising_capture.mp4" poster="/files/ising-model/ising_capture_moment.jpg" width="320" height="200" controls preload></video>

## ising2D Function Input Variables

The ising2D.m uses the Monte Carlo algorithm to simulate the behavior of a General 2D Ising Model under specified conditions. If the plot flag is set to 1 then it will show the real time change of the cell matrix over time.

T = Temperature

N = linear lattice size

J = Ising coupling

plot_flag - 1 to have the script plot the cell matrix evolution in real time

## tempChange and T_C_investigation

These scripts graph the energy, magnetization, heat capacity, and magnetic susceptibility as temperature changes. The difference between them is that T_C_investigation.m focuses more on the range around the critical temperature.

## Thermalization

The thermalization time is how long it takes for the algorithm to reach an equilibrium.

thermalization_relationship plots the thermalization time of the simulated ising models as the value of N is increased.
