/* @flow */
import * as materials from "./materials"
import * as util from "./util"
import type {Element} from "./materials"
let freeze = Object.freeze.bind(Object)

export type Weather = [string | null, string | null, string | null]
export type Biome = {
  name: string,
  subtypes: string[],
  weather: Weather[],
  anomalies: string[],
  materials: Set<Element>
}


export const default_materials =  freeze(["Fe", "Fe+", "C", "Na"])

export function createWeather(clear: ?string, normal: ?string, extreme: ?string): Weather {
  let weather: Weather = [clear || null, normal || null, extreme || null]
  Object.freeze(weather)
  return weather
}

export function create(options: {name?: string, subtypes?: Array<string>, weather?: Array<Array<string | null>>, anomalies?: Array<string>, materials?: Array<string>} = {}): Biome {
  let weather: Weather[] = [createWeather("Unknown")]
  let subtypes: string[] = []
  if (options.weather instanceof Array) weather = weather.concat(options.weather.map(weather => createWeather(...weather)))
  if (options.subtypes instanceof Array) subtypes = subtypes.concat(options.subtypes)
  let anomalies: string[] = (options.anomalies instanceof Array) ? options.anomalies : []
  let biome_materials: Set<Element> = new Set((options.materials instanceof Array ?
    materials.any([...options.materials, ...default_materials]) :
    materials.any(default_materials)))
  freeze(anomalies)
  freeze(weather)
  freeze(subtypes)
  return {
    name: options.name || "",
    subtypes,
    weather,
    anomalies,
    materials: biome_materials
  }
}

const biomes: Biome[] = []
biomes.push(create({
  name: "Barren",
  subtypes: ["Abandoned", "Barren", "Bleak", "Desert", "Desolate", "Dusty", "Parched", "Rocky", "Wind-Swept"],
  weather: [
    ["Baked", "Blasted Atmosphere", "Billowing Dust Storms"],
    ["Clear", "Ceaseless Drought", "Blasted Atmosphere"],
    ["Dry Gusts", "Dust-Choked Winds", "Choking Sandstorms"],
    ["Icy Nights", "Freezing Night Winds", "Dead Wastes"],
    ["Moistureless", "Highly Variable Temperatures", "Extreme Wind Blasting"],
    ["Sterile", "Infrequent Dust Storms", "Hazardous Temperature Extremes"],
    ["Unclouded Skies", "Intermittent Wind Blasting", "Howling Gales"],
    ["Withered", "Occasional Sandstorms", "Lung-Burning Night Wind"],
    [null, "Parched Sands", "Planetwide Desiccation"],
    [null, "Sporadic Grit Storms", "Sand Blizzards"]
  ],
  materials: ["Cc", "Py"]
}))

biomes.push(create({
  name: "Dead",
  subtypes: ["Abandoned", "Airless", "Dead", "Desolate", "Empty", "Forsaken", "Life-Incompatible", "Lifeless", "Low Atmosphere", "Terraforming Catastrophe"],
  weather: [
    ["Absent"],
    ["Clear"],
    ["Airless"],
    ["Emollient"],
    ["Clear"],
    ["Fair"],
    ["Eerily Calm"],
    ["Fine"],
    ["Inert"],
    ["Fine"],
    ["No Atmosphere"],
    ["Moderate"],
    ["Peaceful"],
    ["Moderate"],
    ["Perfectly Clear"],
    ["Peaceful Climate"],
    ["Silent"],
    ["Tempered"],
    ["Utterly Still"],
    ["Unclouded Skies"]
  ]
}))

biomes.push(create({
  name: "Frozen",
  subtypes: ["Arctic", "Freezing", "Frostbound", "Frozen", "Glacial", "Hiemal", "Hyperborean", "Icebound", "Icy", "Sub-zero"],
  weather: [
    ["Crisp", "Drifting Snowstorms", "Deep Freeze"],
    ["Freezing", "Frozen Clouds", "Frequent Blizzards"],
    ["Frost", "Harsh, Icy Winds", "Hazardous Whiteouts"],
    ["Icy", "Icy Blasts", "Howling Blizzards"],
    ["Permafrost", "Ice Storms", "Icy Tempests"],
    ["Powder Snow", "Infrequent Blizzards", "Ice Storms"],
    ["Snowy", "Migratory Blizzards", "Intense Cold"],
    ["Wintry", "Occasional Snowfall", "Raging Snowstorms"],
    [null, "Outbreaks of Frozen Rain", "Roaring Ice Storms"],
    [null, "Wandering Frosts", "Supercooled Storms"]
  ],
  materials: ["Fr", "CO2"]
}))

biomes.push(create({
  name: "Exotic",
  subtypes: ["[REDACTED]", "Breached", "Corrupted", "Crimson", "Doomed", "Erased", "Glassy", "Infected", "Malfunctioning", "Planetary Anomaly", "Temporary", "Thirsty"],
  weather: [
    ["[REDACTED]"],
    ["Anomalous"],
    ["Crimson Heat"],
    ["Haunted Frost"],
    ["Indetectable Burning"],
    ["Internal Rain"],
    ["Invisible Mist"],
    ["Lost Clouds"],
    ["Memories of Frost"],
    ["Obsidian Heat"],
    ["Thirsty Clouds"],
    ["Winds of Glass"]
  ],
  anomalies: ["The Hex", "The Glass", "Pillars of Aurora", "Nanophage", "Mollusc-Virus", "Metallic Bubbles"]
}))

biomes.push(create({
  name: "Irradiated",
  subtypes: ["Contaminated", "Decaying Nuclear", "Gamma-Intensive", "High Radio Frequency", "High Energy", "Irradiated", "Isotopic", "Nuclear", "Radioactive", "Supercritical"],
  weather: [
    ["Contaminated Puddles", "Energetic Storms", "Contaminated Squalls"],
    ["Gamma Dust", "Irradiated Downpours", "Enormous Nuclear Storms"],
    ["Irradiated Winds", "Irradiated Storms", "Extreme Atmospheric Decay"],
    ["Nuclidic Atmosphere", "Occasional Radiation Outbursts", "Extreme Radioactivity"],
    ["Radioactive Damp", "Particulate Winds", "Extreme Thermonuclear Fog"],
    ["Radioactive Humidity", "Radioactive Dust Storms", "Frequent Particle Eruptions"],
    ["Unstable Atmosphere", "Radioactive Dust Storms", "Gamma Cyclones"],
    ["Volatile Winds", "Reactive Rain", "Irradiated Thunderstorms"],
    [null, "Unstable Fog", "Planet-Wide Radiation Storms"],
    [null, "Volatile Windstorms", "Roaring Nuclear Wind "]
  ],
  materials: ["Gr", "U"]
}))

biomes.push(create({
  name: "Lush",
  subtypes: ["Bountiful", "Flourishing", "Humid", "Lush", "Overgrown", "Paradise", "Temperate", "Tropical", "Verdant", "Viridescent"],
  weather: [
    ["Balmy", "Blistering Damp", "Blistering Floods"],
    ["Beautiful", "Boiling Puddles", "Boiling Monsoons"],
    ["Blissful", "Choking Humidity", "Boiling Superstorms"],
    ["Humid", "Dangerously Hot Fog", "Broiling Humidity"],
    ["Light Showers", "Lethal Humidity Outbreaks", "Intense Heatbursts"],
    ["Mellow", "Mostly Calm", "Painfully Hot Rain"],
    ["Mild Rain", "Occasional Scalding Cloudbursts", "Scaling Rainstorms"],
    ["Pleasant", "Superheated Drizzle", "Superheated Rain"],
    ["Refreshing Breeze", "Sweltering Damp", "Torrential Heat"],
    ["Temperate", "Usually Mild", "Torrid Deluges"]
  ],
  materials: ["Sb", "Pf"]
}))

biomes.push(create({
  name: "Scorched",
  subtypes: ["Arid", "Boiling", "Charred", "Fiery", "High Temperature", "Hot", "Incandescent", "Scalding", "Scorched", "Torrid"],
  weather: [
    ["Dehydrated", "Atmospheric Heat Instabilities", "Burning Gas Clouds"],
    ["Direct Sunlight", "Burning Air", "Combustible Dust"],
    ["Heated Atmosphere", "Dangerously Hot", "Extreme Heat"],
    ["Overly Warm", "Direct Sunlight", "Firestorms"],
    ["Parched", "Heated Atmosphere", "Incendiary Dust"],
    ["Sunny", "Infrequent Heat Storms", "Inferno Winds"],
    ["Sweltering", "Occasional Ash Storms", "Intense Heat"],
    ["Unending Sunlight", "Rare Firestorms", "Scalding Heat"],
    [null, "Superheated Gas Pockets", "Self-Igniting Storms"],
    [null, "Wandering Hot Spots", "Superheated Air"]
  ],
  materials: ["So", "P"]
}))

biomes.push(create({
  name: "Toxic",
  subtypes: ["Acidic", "Acrid", "Blighted", "Caustic", "Corrosive", "Miasmatic", "Noxious", "Poisonous", "Rotting", "Toxic"],
  weather: [
    ["Acid Rain", "Acidic Dust Pockets", "Acidic Deluges"],
    ["Caustic Moisture", "Alkaline Cloudbursts", "Bone-Stripping Acid Storms"],
    ["Choking Clouds", "Atmospheric Corruption", "Caustic Floods"],
    ["Corrosive Damp", "Caustic Winds", "Corrosive Cyclones"],
    ["Poison Rain", "Corrosive Sleet Storms", "Corrosive Rainstorms"],
    ["Poisonous Gas", "Dangerously Toxic Rain", "Corrosive Storms"],
    ["Stinging Atmosphere", "Infrequent Toxic Drizzle", "Frequent Toxic Floods"],
    ["Stinging Puddles", "Lethal Atmosphere", "Noxious Gas Storms"],
    ["Toxic Clouds", "Occasional Acid Storms", "Pouring Toxic Rain"],
    ["Toxic Damp", "Passing Toxic Fronts", "Torrential Acid"],
    [null, "Poison Flurries", "Toxic Monsoons"],
    [null, "Toxic Outbreaks", "Toxic Superstorms"]
  ],
  materials: ["Fm", "NH3"]
}))

export const set = biomes

export const unknown_biome: Biome = create({name: "Unknown", subtypes: ["Unknown"]})

export const byName = (name: string): Biome => util.find(biomes, name, "name") || unknown_biome
export const bySubtype = (subtype: string): Biome => biomes.find(biome => !!util.find(biome.subtypes, subtype)) || unknown_biome
