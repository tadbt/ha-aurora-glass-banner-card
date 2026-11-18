# Aurora Glass Banner Card

A compact, animated Home Assistant Lovelace banner card forked from **Aurora Glass** (`lucalux00/aurora-glass`), keeping only the hero greeting panel with the live clock, time-of-day sky & animated worlds, weather/atmosphere effects, and glass pill badges.

## Features

- **10 animated worlds** (`casetta`, `citta`, `montagna`, `mare`, `foresta`, `spazio`, `giappone`, `cyberpunk`, `natale`, `oceano` — English aliases like `house`, `city`, `mountain`, `sea`, `forest`, `space`, `japan`, `christmas`, `ocean` also supported) with continuous day-to-night sky, sun/moon arc, clouds, stars, and glowing windows at night.
- **11 canvas weather & atmosphere effects** (`rain`, `storm`, `snow`, `fog`, `leaves`, `petals`, `fireflies`, `stars`, `fireworks`, `bubbles`, `confetti`, plus Italian keys), with `auto` mode driven by a `weather.*` entity.
- **Compact greeting & live clock** — date eyebrow, time-based greeting (`Good morning`, `Good afternoon`, `Good evening`, `Good night`), and gradient tabular clock.
- **Glass pill badges (`badges`)** — render any Home Assistant entity or attribute in the Aurora Glass pill style with automatic icons, localized states, and `tap_action` (`more-info`, `toggle`, `navigate`, `url`, `call-service`, `none`).
- **Visual UI Editor + YAML** — configure every card option and add, edit, reorder, or remove badges directly in the Home Assistant UI card editor, or via YAML.
- **Auto dark/light theme** — follows Home Assistant's theme or can be set to `dark` / `light`.

## Installation

### HACS (Custom Repository)

1. In Home Assistant, open **HACS → Frontend → ⋮ → Custom repositories**.
2. Add this repository URL with category **Dashboard**.
3. Install **Aurora Glass Banner Card** and reload your browser.

### Manual

1. Copy [`aurora-glass-banner-card.js`](aurora-glass-banner-card.js) into `/config/www/aurora-glass-banner-card.js`.
2. Add `/local/aurora-glass-banner-card.js` as a JavaScript Module under **Settings → Dashboards → ⋮ → Resources**.

## Configuration

You can configure the card using the **Visual Editor** in Home Assistant or in **YAML**:

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
| `world` | `casetta` | Animated world (`casetta`, `citta`, `montagna`, `mare`, `foresta`, `spazio`, `giappone`, `cyberpunk`, `natale`, `oceano`, or English aliases). |
| `effect` | `auto` | Weather/atmosphere overlay: `auto`, `none`, or `rain`, `storm`, `snow`, `fog`, `leaves`, `petals`, `fireflies`, `stars`, `fireworks`, `bubbles`, `confetti`. |
| `weather_entity` | — | Optional `weather.*` entity used when `effect: auto`. |
| `theme` | `auto` | `auto` (follows HA), `dark`, or `light`. |
| `name` | HA user first name | Optional name override for the greeting. |
| `greeting` | auto by hour | Optional custom greeting text. |
| `show_date` | `true` | Show the date eyebrow above the greeting. |
| `show_clock` | `true` | Show the gradient clock. |
| `show_world_tag` | `true` | Show the top-right world pill (click to preview/switch world and effect). |
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
| `unit` | auto | Override unit of measurement (supports Jinja2 in YAML). |
| `value` | auto | Custom value or Jinja2 template (YAML only). |
| `color` | — | Custom icon color (supports RGB, CSS color, or Jinja2 in YAML). |
| `colors` | — | Value-based color map or threshold/range rules (YAML only). |
| `badge_color` | — | Custom pill background/border tint (supports Jinja2 in YAML). |
| `precision` | `1` (auto) | Decimal places for numeric values. |
| `tap_action` | `more-info` | Standard HA action (`more-info`, `toggle`, `navigate`, `url`, `call-service`, `none`). |

#### Badge Jinja2 & Value-Based Colors (YAML only)

In YAML, `name`, `value`, `icon`, `unit`, `color`, and `badge_color` accept Home Assistant Jinja2 templates (`{{ ... }}` / `{% ... %}`), with `entity` available as a template variable when `entity:` is set. You can also color badges based on their state or numeric value using `colors`:

```yaml
badges:
  - entity: weather.home
    attribute: temperature
    name: Outside
    colors:
      - value: 30
        color: "#ef4444"
      - value: 20
        color: "#22c55e"
      - value: 0
        color: "#38bdf8"
  - entity: binary_sensor.front_door
    colors:
      "on": "#fb7185"
      "off": "#34d399"
  - name: "Power"
    icon: "{% if states('sensor.house_power') | float > 3000 %}mdi:flash-alert{% else %}mdi:flash{% endif %}"
    value: "{{ states('sensor.house_power') }} W"
    color: "{% if states('sensor.house_power') | float > 3000 %}#f59e0b{% else %}#34d399{% endif %}"
```

## Development & Testing

- **Build bundle**:
  ```bash
  npm run build
  ```
- **Test in Docker Home Assistant** (starts Home Assistant on `http://localhost:8123` with `demo:` entities and [docker/config/ui-lovelace.yaml](docker/config/ui-lovelace.yaml)):
  ```bash
  npm run test:ha
  # stop when done:
  npm run test:ha:down
  ```
- **Standalone YAML test harness**: open [src/tests/harness.html](src/tests/harness.html) in a browser to preview and edit card YAML live.
- **Release & tag**:
  ```bash
  ./scripts/release.sh "Release message" 1.0.0
  ```
