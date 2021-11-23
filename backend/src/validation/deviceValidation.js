const DeviceSchema = {
  create: {
    type: "object",
    properties: {
      name: { type: "string", minLength: 1, maxLength: 64 },
      description: { type: "string", minLength: 1, maxLength: 128 },
      guid: { type: "string", minLength: 32, maxLength: 32 },
      image: { type: "string", maxLength: 256 },
      location: {
        type: "object",
        properties: {
          lat: { type: "number", minimum: -90, maximum: 90},
          long: { type: "number", minimum: -180, maximum: 180 },
        }
      }
    },
    required: ["name", "description", "guid", "location"],
    additionalProperties: false
  }
};

export { DeviceSchema };