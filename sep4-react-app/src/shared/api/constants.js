// IoT team's directive: all physical sensors and actuators are seeded under
// a single room with id "shared". Calls to /sensor-data, /device-logs, and
// /devices/action must use this id regardless of which UI room is selected.
export const SHARED_ROOM_ID = "shared";
