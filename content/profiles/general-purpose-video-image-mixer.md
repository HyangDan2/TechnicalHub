---
id: general-purpose-video-image-mixer
slug: general-purpose-video-image-mixer
title: General Purpose Video/Image Mixer
summary: A private desktop application that mixes two video or still-image sources in real time using selectable visual patterns.
thumbnail: assets/profiles/general-purpose-video-image-mixer-demo.png
thumbnailAlt: Two still-image sources mixed with Zig-zag mode in the desktop application.
categories:
  - SW
  - Utility
status: published
updatedAt: "2026-10-25"
technologies:
  - name: Python
    role: Runs the desktop application and coordinates its input and processing flow.
  - name: PySide6
    role: Provides the desktop interface, controls, signals, and threaded frame processing.
  - name: OpenCV
    role: Reads video frames and handles frame resizing and color conversion.
  - name: NumPy
    role: Applies the pixel and tile masks used by the mixing modes.
references:
  - title: Python Documentation
    url: https://docs.python.org/3/
  - title: Qt for Python Documentation
    url: https://doc.qt.io/qtforpython-6/
  - title: OpenCV Documentation
    url: https://docs.opencv.org/
  - title: NumPy Documentation
    url: https://numpy.org/doc/
---

## Overview

General Purpose Video/Image Mixer is a desktop application that combines two video or still-image sources in real time. Users can choose a mixing pattern and adjust the checker-board tile size.

The implementation project is private. This profile presents a technical overview, a public-facing architecture diagram, and an approved demonstration capture without publishing source code or a repository link.

## Runtime Architecture

The UML component view uses general input names and summarizes the runtime data flow without exposing private implementation details.

![UML component diagram showing two generic video or still-image inputs, source readers, frame queues, size normalization, mixing modes, display conversion, and the desktop interface](../../assets/profiles/general-purpose-video-image-mixer-architecture.svg)

1. **Media inputs** accept one video or still image per source.
2. **Source readers** decode video frames or feed still-image frames into separate queues.
3. **Frame mixing** pairs available frames, matches the secondary input to the reference frame size, and applies the selected mixing pattern.
4. **Display output** converts the mixed frame for the PySide6 interface and presents resolution metadata.

## Mixing Modes

- **Odd/Even Columns** alternates source pixels by column.
- **Checker-board** alternates image tiles; the tile size is adjustable.
- **Zig-zag** applies a diagonal alternating mask and combines selected BGR channels from the secondary input.

## Demonstration

The application capture shows two still-image inputs combined with Zig-zag mixing and the mode controls visible.

![Desktop application showing a mixed still-image output with Zig-zag selected](../../assets/profiles/general-purpose-video-image-mixer-demo.png)

The image demonstrates the application interface and mixing output; it does not represent a performance or accuracy benchmark.

## Privacy and Limitations

The implementation source remains private. This public profile contains only the approved overview, high-level architecture, and demonstration image. It does not include source code or a link to the private repository.
