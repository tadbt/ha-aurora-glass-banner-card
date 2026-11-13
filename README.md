# Aurora Glass Banner Card

A lightweight Home Assistant Lovelace banner card forked from **Aurora Glass**, keeping only the animated hero greeting panel with the live clock, time-of-day sky & worlds, weather/atmosphere effects, and glass pill badges.

## Features

- **10 animated worlds** (`casetta`, `citta`, `montagna`, `mare`, `foresta`, `spazio`, `giappone`, `cyberpunk`, `natale`, `oceano`) with continuous day-to-night sky, sun/moon arc, clouds, stars, and glowing windows at night.
- **11 canvas weather & atmosphere effects** (`pioggia`/`rain`, `temporale`/`storm`, `neve`/`snow`, `nebbia`/`fog`, `foglie`/`leaves`, `petali`/`petals`, `lucciole`/`fireflies`, `stelle`/`stars`, `fuochi`/`fireworks`, `bolle`/`bubbles`, `coriandoli`/`confetti`), plus `auto` mode driven by a `weather.*` entity.
- **Live clock & greeting** — time-aware greeting (`Good morning`, `Good afternoon`, `Good evening`, `Good night`), date eyebrow, and gradient tabular clock.
- **Glass pill badges (`badges`)** — displays any Home Assistant entities (or attributes) in the exact Aurora Glass pill style with auto icons, localized states, and `tap_action` support (`more-info`, `toggle`, `navigate`, `call-service`, `url`, `none`).
- **Auto dark/light theme** — follows Home Assistant's theme or can be forced to `dark` / `light`.
- **Visual editor + live world/effect picker** — configure via the Home Assistant UI editor or YAML.

## Installation

### HACS (Custom Repository)

1. In Home Assistant, open **HACS → Frontend → ⋮ → Custom repositories**.
2. Add this repository URL with category **Dashboard** (or **Lovelace**).
3. Install **Aurora Glass Banner Card** and reload your browser.

### Manual

1. Copy [`aurora-glass-banner-card.js`](aurora-glass-banner-card.js) into `/config/www/aurora-glass-banner-card.js`.
2. Add `/local/aurora-glass-banner-card.js` as a JavaScript Module under **Settings → Dashboards → ⋮ → Resources**.

## Configuration

```yaml
type: custom:aurora-glass-banner-card
world: casetta
effect: auto
weather_entity: weather.home
theme: auto
show_date: true
show_clock: true
show_world_tag: true
hour_24: true
badges:
  - entity: weather.home
    attribute: temperature
    name: Outside
  - entity: sensor.house_power
    name: Power
  - entity: binary_sensor.living_motion
    name: Motion
  - binary_sensor.front_door
  - entity: light.living_room
    tap_action:
      action: toggle
```

### Card Options

| Option | Default | Description |
| --- | --- | --- |
| `world` | `casetta` | Animated world (`casetta`, `citta`, `montagna`, `mare`, `foresta`, `spazio`, `giappone`, `cyberpunk`, `natale`, `oceano`; English aliases like `house`, `city`, `mountain`, `sea`, `forest`, `space`, `japan`, `christmas`, `ocean` also work). |
| `effect` | `auto` | Weather/atmosphere overlay: `auto`, `none`, or any effect (`rain`, `storm`, `snow`, `fog`, `leaves`, `petals`, `fireflies`, `stars`, `fireworks`, `bubbles`, `confetti`). |
| `weather_entity` | — | Optional `weather.*` entity used when `effect: auto`. |
| `theme` | `auto` | `auto` (follows HA), `dark`, or `light`. |
| `name` | HA user first name | Optional name override for the greeting. |
| `greeting` | auto by hour | Optional custom greeting text. |
| `show_date` | `true` | Show the date eyebrow above the greeting. |
| `show_clock` | `true` | Show the large gradient clock. |
| `show_world_tag` | `true` | Show the top-right world pill (click to switch world/effect). |
| `hour_24` | `true` | `true` for 24-hour clock, `false` for 12-hour AM/PM. |
| `language` | `auto` | `auto`, `en`, or `it`. |
| `badges` | `[]` | List of entity IDs or badge objects. |

### Badge Options

Each item in `badges` can be an entity ID string or an object:

| Option | Default | Description |
| --- | --- | --- |
| `entity` | — | Home Assistant entity ID. |
| `attribute` | — | Optional attribute to display instead of `state`. |
| `name` | `friendly_name` | Custom label before the value. |
| `show_name` | `true` | Set `false` to show only icon and value. |
| `show_icon` | `true` | Show entity/custom icon. |
| `show_state` | `true` | Show formatted state/attribute value. |
| `icon` | auto | Override icon (e.g. `mdi:thermometer`). |
| `unit` | auto | Override unit of measurement. |
| `color` | — | Custom icon color. |
| `precision` | `1` (auto) | Decimal places for numeric values. |
| `tap_action` | `more-info` | Standard HA action (`more-info`, `toggle`, `navigate`, `url`, `call-service`, `none`). |

## Development

Source files live in `src/`. Rebuild the single-file bundle with:

```bash
python3 tools/build.py
```
