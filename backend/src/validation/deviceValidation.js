const DeviceSchema = {
    create: {
      "type": "object",
      "properties": {
        "name": { "type": "string" }
      },
      "required": ["name"],
      "additionalProperties": false
    }
  };
  
export { DeviceSchema };