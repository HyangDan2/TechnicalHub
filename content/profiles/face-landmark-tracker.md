---
id: face-landmark-tracker
slug: face-landmark-tracker
title: Face Landmark Tracker
summary: A private desktop application that tracks facial landmarks from live or mock video, estimates head pose, and raises a drowsiness warning when eye closure is sustained.
thumbnail: assets/profiles/face-landmark-tracker-dms-warning.jpg
thumbnailAlt: Face Landmark Tracker showing a drowsiness warning over mock video.
categories:
  - AI
  - ML
  - SW
status: published
updatedAt: "2026-10-24"
technologies:
  - name: Python
    version: "3.12"
    role: Runs the desktop application and coordinates video processing and analysis.
  - name: PySide6
    role: Provides the desktop interface for video display, controls, status, and local settings.
  - name: OpenCV
    role: Supports video input, frame operations, and annotated overlay rendering.
  - name: MediaPipe
    role: Supplies facial landmark tracking for downstream head pose and drowsiness analysis.
references:
  - title: Python Documentation
    url: https://docs.python.org/3.12/
  - title: Qt for Python Documentation
    url: https://doc.qt.io/qtforpython-6/
  - title: OpenCV Documentation
    url: https://docs.opencv.org/
  - title: MediaPipe Documentation
    url: https://ai.google.dev/edge/api/mediapipe/python/mp/tasks/vision/FaceLandmarker
---

## Overview

Face Landmark Tracker is a desktop application for facial landmark tracking and drowsiness-warning demonstrations. It accepts a live camera or mock video source, processes frames, estimates head pose, and presents analysis results in a desktop interface.

The implementation project is private. This profile describes the approved technical overview and does not include source code or a link to the private repository.

## Runtime Architecture

The diagram shows a public-facing UML component view. It summarizes the data flow without exposing private implementation details.

![UML component diagram showing Video Source, Video Processor, optional ISP, analysis components, overlay, desktop UI, and local settings](../../assets/profiles/face-landmark-tracker-architecture.svg)

### Processing flow

1. **Video Source** selects a live camera or mock video input and provides one active frame stream, with fallback behavior.
2. **Frame Preparation** normalizes frames for downstream processing.
3. **Optional ISP** can apply CLAHE, blur, or unsharp processing when enabled and applicable. When disabled, frames bypass this stage.
4. **Face Landmark Tracking** provides landmarks used by head pose estimation and drowsiness evaluation.
5. **Overlay Rendering** combines the video with analysis results and warning status for display in the PySide6 interface.

Local settings control the source and processing options. The diagram is a conceptual overview, not a deployment or source-level design.

## Demonstration

The following capture shows the application running with mock video and drowsiness monitoring enabled. The warning appears after the closed-eye condition is held during the demonstration.

![Face Landmark Tracker demonstration showing a drowsiness warning with mock video and DMS enabled](../../assets/profiles/face-landmark-tracker-dms-warning.jpg)

This is a functional demonstration capture, not a claim about real-world accuracy or safety performance.

## Privacy

The implementation source is private. This profile publishes only a high-level technical introduction, approved architecture diagram, and demonstration image.
