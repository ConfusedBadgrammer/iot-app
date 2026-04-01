# Ambient — Full-Stack IoT Environmental Monitoring System

A full-stack IoT system for real-time environmental monitoring. ESP32 sensor nodes collect
temperature and humidity data and transmit it wirelessly via an ESP-NOW mesh network to a
central hub, which forwards readings to a backend and persists them to Supabase. A dashboard
displays live sensor data and historical trends.

The project maintains two parallel implementations of the backend and frontend — one using
**Node.js/Express + React (Vite)** as a learning reference, and one using **Next.js** as the
primary active development target.

> **🔧 Ongoing project** — Ambient is actively being developed. The current codebase represents
> a working MVP across firmware, backend, and frontend. New hardware capabilities, dashboard
> features, and infrastructure improvements are planned and being added incrementally. See the
> [Roadmap](#roadmap) for what's coming next.

---

## Architecture

**Next.js (primary)**

```
┌─────────────────┐        ┌──────────────────┐        ┌──────────────────────────────┐
│  Sensor Nodes   │        │    Hub Node      │        │         Next.js App          │
│                 │        │                  │        │                              │
│  AHT20 (I2C)    │──ESP   │  Wi-Fi bridge    │──HTTP─▶│  API Routes   │  Dashboard UI│
│  SCD41 (I2C)    │  NOW──▶│  ESP32           │        │  /api/readings│  TailwindCSS │
│  ESP32          │        │  Channel lock    │        └───────┬───────────────────---┘
│  Deep sleep     │        │  Channel lock    │                │
└─────────────────┘        └──────────────────┘                │
                                                     ┌─────────▼─────────┐
                                                     │     Supabase      │
                                                     │   PostgreSQL      │
                                                     │   Triggers, RPC   │
                                                     └───────────────────┘
```

**Express + React (reference)**

```
┌─────────────────┐        ┌──────────────────┐        ┌──────────────────┐        ┌───────────────────┐
│  Sensor Nodes   │        │    Hub Node      │        │  Express Backend │        │  React Dashboard  │
│                 │        │                  │        │                  │        │                   │
│  AHT20 (I2C)    │──ESP   │  Wi-Fi bridge    │──HTTP─▶│  SensorController│──HTTP─▶│  Vite + Tailwind  │
│  SCD41 (I2C)    │  NOW──▶│  ESP32           │        │  Node.js         │        │  Real-time graphs │
│  ESP32          │        │  Channel lock    │        └────────┬─────────┘        └───────────────────┘
│  Deep sleep     │        │  Channel lock    │                 │
└─────────────────┘        └──────────────────┘                 │
                                                      ┌─────────▼─────────┐
                                                      │     Supabase      │
                                                      │   PostgreSQL      │
                                                      │   Triggers, RPC   │
                                                      └───────────────────┘
```

---

## Features

- **ESP-NOW mesh networking** — sensor nodes communicate directly to the hub without a router,
  for low-latency, low-power transmission
- **Battery-efficient firmware** — sensor nodes use deep sleep between readings, waking only to
  sample and transmit
- **Router channel locking** — resolves ESP-NOW channel drift that occurs after hub Wi-Fi
  reconnects
- **FreeRTOS queue pattern** — ISR-safe sensor data callbacks using FreeRTOS queues in firmware
- **Multi-sensor support** — AHT20 for temperature/humidity and SCD41 for CO₂ concentration,
  both over I2C
- **Supabase backend** — sensor readings persisted to PostgreSQL via Supabase, with database
  triggers automatically updating `last_posted` per device
- **Time-bucketed graph queries** — Supabase RPC functions bucket readings by time interval for
  efficient dashboard charting
- **React dashboard** — real-time temperature, humidity, and CO₂ display per node, with
  historical trend graphs

---

## Tech Stack

| Layer                | Technology                                            |
| -------------------- | ----------------------------------------------------- |
| Firmware             | Embedded C, ESP-IDF, FreeRTOS, ESP-NOW                |
| Sensors              | AHT20 (temperature & humidity, I2C), SCD41 (CO₂, I2C) |
| Microcontroller      | ESP32                                                 |
| Backend (primary)    | Next.js (API routes)                                  |
| Backend (reference)  | Node.js, Express.js                                   |
| Database             | Supabase (PostgreSQL)                                 |
| Frontend (primary)   | Next.js, TailwindCSS                                  |
| Frontend (reference) | React, Vite, TailwindCSS                              |

---

> **Note:** Firmware lives in a separate repository. See [Hardware &
> Firmware](#hardware--firmware) below.

---

### Prerequisites

- Node.js 22+
- A [Supabase](https://supabase.com) project (free tier works)
- ESP-IDF v5+ (for firmware, separate repo currently not posted)

---

## Database

The backend uses Supabase (PostgreSQL). Key design decisions:

- **`sensor_readings` table** — stores timestamped temperature, humidity, and CO₂ readings per
  device
- **`last_posted` trigger** — a PostgreSQL trigger updates a device's last-seen timestamp on
  every insert, keeping the dashboard status accurate without polling
- **Time-bucketing RPC** — a Supabase RPC function aggregates readings into time buckets (e.g.
  5-minute averages), so the frontend can render smooth historical graphs without pulling every
  raw row

---

## Hardware & Firmware

The ESP32 firmware is written in C using the **ESP-IDF** framework. Key implementation details:

- **Hub-and-sensor architecture** — one hub node bridges ESP-NOW → Wi-Fi; sensor nodes only
  communicate via ESP-NOW, keeping them off Wi-Fi entirely for power efficiency
- **Channel locking** — after connecting to Wi-Fi, the hub locks the ESP-NOW channel to match
  the router channel, preventing drift that breaks peer communication after reconnects
- **FreeRTOS queues** — sensor reads triggered by a timer ISR post data to a FreeRTOS queue; a
  dedicated task dequeues and transmits, keeping ISR execution time minimal
- **AHT20 over I2C** — temperature and humidity sampled at configurable intervals
- **SCD41 over I2C** — CO₂ concentration (ppm) sampled alongside temperature and humidity; uses
  the SCD41's on-chip self-calibration

---

## Environment Variables

| Variable       | Used by          | Description                                 |
| -------------- | ---------------- | ------------------------------------------- |
| `SUPABASE_URL` | Express, Next.js | Your Supabase project URL                   |
| `SUPABASE_KEY` | Express, Next.js | Supabase anon or service role key           |
| `PORT`         | Express only     | Port for the Express server (default: 3000) |

---

## Roadmap

Ambient is an ongoing project. The current state is a fully functional MVP — sensor nodes
are live, data is flowing to the backend, and the dashboard is rendering real readings.
The plan is to keep expanding it across all three layers as new hardware and features are
built out.

**Firmware**

- [ ] Publish firmware as a separate repo with full setup docs
- [ ] OTA (over-the-air) firmware updates for deployed nodes
- [ ] Additional sensor support (CO₂, air quality, light level, barometer)
- [ ] Per-node configurable sleep/wake intervals via backend

**Backend**

- [ ] WebSocket support for push-based real-time updates (replacing polling)
- [ ] Alert thresholds — trigger notifications when readings exceed set limits
- [ ] Multi-site / multi-user support with scoped device access
- [ ] Docker Compose setup for fully local backend + database development

**Frontend / Dashboard**

- [ ] Per-node detail view with full reading history
- [ ] Device control panel — toggle lighting from the dashboard
- [ ] CO₂ trend graphs and threshold indicators
- [ ] Mobile-responsive layout
- [ ] Configurable alert rules in the UI

**Hardware**

- [ ] Custom PCB design for sensor nodes (KiCad)
- [ ] 3D-printed enclosures for outdoor deployment
- [ ] Battery level reporting from nodes

---

## Dev Log

This project is documented through a series of development vlogs capturing the build
process, hardware decisions, debugging sessions, and lessons learned along the way.

📹 [Watch the dev vlogs on Loom](https://loom.com/share/folder/ec8a78009cf94fb4896e9990cbdad6c4)

---
