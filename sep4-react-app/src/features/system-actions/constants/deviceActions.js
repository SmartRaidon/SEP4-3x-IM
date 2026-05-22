export const DEVICE_TYPES = {
  HEATER: "Heater",
  WINDOW: "Window",
  CURTAIN: "Curtain",
  HUMIDIFIER: "Humidifier",
};

export const DEVICE_STATES = {
  ON: "On",
  OFF: "Off",
  OPEN: "Open",
  CLOSED: "Closed",
};

export const ACTIONS_BY_DEVICE = {
  Heater: [DEVICE_STATES.ON, DEVICE_STATES.OFF],
  Window: [DEVICE_STATES.OPEN, DEVICE_STATES.CLOSED],
  Curtain: [DEVICE_STATES.OPEN, DEVICE_STATES.CLOSED],
  Humidifier: [DEVICE_STATES.ON, DEVICE_STATES.OFF],
};
