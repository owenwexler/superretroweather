const addLocation = (newLocation: string, userLocations: string[]) => {
  return Array.from(new Set([newLocation, ...userLocations]));
}

export {
  addLocation
}