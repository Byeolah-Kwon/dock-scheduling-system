# Dock Scheduling System

It is a web application for scheduling vessel and non-vessel reservations across waterfront berths. The system allows users to select a date range, reserve an appropriately sized berth, prevent conflicting reservations, and retrieve existing bookings using a booking ID.

## Live Demo

[View the deployed application](https://byeolah-kwon.github.io/dock-scheduling-system/)

## Features

- Select arrival and departure dates
- Create vessel and non-vessel event reservations
- Filter berths based on vessel length
- Check berth availability for the selected date range
- Prevent overlapping berth reservations
- Generate a unique booking ID for each reservation
- Look up reservations using a booking ID
- Persist newly created reservations using browser `localStorage`

## Screenshots

### Select a Date Range

Users begin by selecting the arrival and departure dates for their reservation.

<img width="621" height="516" alt="Screenshot 2026-09-22 at 5 45 10 PM" src="https://github.com/user-attachments/assets/f9da23f3-3600-493f-ae9d-0b57dcb6ac4b" />


### Choose a Reservation Type

Users can reserve dock space for either a vessel or a non-vessel event.

<img width="621" height="516" alt="Screenshot 2026-09-22 at 5 45 32 PM" src="https://github.com/user-attachments/assets/b0b471e3-0232-42e1-9835-eea2491c647d" />


### Find an Available Berth

For vessel reservations, the application filters berths based on both vessel length and availability during the selected dates.

<img width="621" height="608" alt="Screenshot 2026-09-22 at 5 46 15 PM" src="https://github.com/user-attachments/assets/8bad0e76-37ff-4233-aabe-8fe94e4c07e1" />

## Booking Logic

For a vessel reservation, a berth is available only when:

1. The berth is long enough to accommodate the selected vessel.
2. The berth does not have an existing reservation that overlaps with the selected date range.

Non-vessel events use the same date-conflict checking logic without the vessel-length constraint.

The application checks both the provided sample booking data and reservations created during the current browser session.

## Reservation Lookup

After confirming a reservation, the application generates a unique booking ID.

Users can return to the reservation lookup page and enter this ID to retrieve their booking details.

## Tech Stack

- Next.js
- React
- TypeScript
- CSS
- Browser `localStorage`
- GitHub Pages
- GitHub Actions

## Getting Started

Clone the repository and install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then open `http://localhost:3000` in your browser.

To create a production build:

```bash
npm run build
```

## Data Persistence

The application includes sample vessel, berth, and booking data.

New reservations are stored in browser `localStorage`. This approach keeps the prototype lightweight and allows reservations to persist across page refreshes without requiring a backend.

For a production system, this could be extended with a backend API and persistent database so reservations are shared across users and devices.

## Deployment

The application is statically exported with Next.js and automatically deployed to GitHub Pages using GitHub Actions.

Pushes to the `main` branch trigger the deployment workflow.
