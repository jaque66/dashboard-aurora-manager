# Aurora Guard: czujniki telefonow dzieci zasilane webhookiem (bez tokenu administratora w aplikacji)
- triggers:
    - trigger: webhook
      webhook_id: __HOOK__
      local_only: false
      allowed_methods: [POST]
  sensor:
    - name: "Aurora Guard __ID__ status"
      unique_id: aurora_guard___ID___status
      icon: mdi:shield-lock-outline
      state: >-
        {{ trigger.json.state | default('ok') if trigger.json.type | default('status') == 'status' else (this.state | default('ok')) }}
      attributes:
        accessibility: >-
          {{ trigger.json.accessibility if trigger.json.type | default('status') == 'status' else this.attributes.accessibility | default(false) }}
        locked: >-
          {{ trigger.json.locked if trigger.json.type | default('status') == 'status' else this.attributes.locked | default(false) }}
        full_locked: >-
          {{ trigger.json.full_locked if trigger.json.type | default('status') == 'status' else this.attributes.full_locked | default(false) }}
        blocked_count: >-
          {{ trigger.json.blocked_count if trigger.json.type | default('status') == 'status' else this.attributes.blocked_count | default(0) }}
        device_owner: >-
          {{ trigger.json.device_owner if trigger.json.type | default('status') == 'status' else this.attributes.device_owner | default(false) }}
        battery: >-
          {{ trigger.json.battery if trigger.json.type | default('status') == 'status' else this.attributes.battery | default(none) }}
        last_seen: >-
          {{ trigger.json.last_seen if trigger.json.type | default('status') == 'status' else this.attributes.last_seen | default(none) }}
        model: >-
          {{ trigger.json.model if trigger.json.type | default('status') == 'status' else this.attributes.model | default(none) }}
        android: >-
          {{ trigger.json.android if trigger.json.type | default('status') == 'status' else this.attributes.android | default(none) }}
        version: >-
          {{ trigger.json.version if trigger.json.type | default('status') == 'status' else this.attributes.version | default(none) }}
        sleep_until: >-
          {{ trigger.json.sleep_until | default(0) if trigger.json.type | default('status') == 'status' else this.attributes.sleep_until | default(0) }}
    - name: "Aurora Guard __ID__ apps"
      unique_id: aurora_guard___ID___apps
      icon: mdi:apps
      state: >-
        {{ trigger.json.apps | length if trigger.json.type | default('status') == 'apps' else (this.state | default(0)) }}
      attributes:
        apps: >-
          {{ trigger.json.apps if trigger.json.type | default('status') == 'apps' else this.attributes.apps | default([]) }}
    - name: "Aurora Guard __ID__ usage"
      unique_id: aurora_guard___ID___usage
      icon: mdi:chart-bar
      state: >-
        {{ trigger.json.total | default(0) if trigger.json.type | default('status') == 'usage' else (this.state | default(0)) }}
      attributes:
        apps: >-
          {{ trigger.json.apps if trigger.json.type | default('status') == 'usage' else this.attributes.apps | default([]) }}
        week: >-
          {{ trigger.json.week if trigger.json.type | default('status') == 'usage' else this.attributes.week | default([]) }}
        days: >-
          {% set old = this.attributes.days | default([]) %}{% if trigger.json.type | default('status') != 'usage' or trigger.json.days is not defined %}{{ old }}{% else %}{% set inc = trigger.json.days %}{% set ds = inc | map(attribute='d') | list %}{% set ns = namespace(l=[]) %}{% for o in old %}{% if o.d not in ds %}{% set ns.l = ns.l + [o] %}{% endif %}{% endfor %}{% for n in inc %}{% set aa = namespace(x=[]) %}{% for x in n.a[:6] %}{% set aa.x = aa.x + [{'n': x.n, 'm': x.m}] %}{% endfor %}{% set ns.l = ns.l + [{'d': n.d, 't': n.t, 'a': aa.x}] %}{% endfor %}{{ (ns.l | sort(attribute='d'))[-30:] }}{% endif %}
        updated: >-
          {{ now().isoformat() if trigger.json.type | default('status') == 'usage' else this.attributes.updated | default(none) }}

# Reguly dla aplikacji (czytane przez zwyklego uzytkownika): pakiety z list todo
- triggers:
    - trigger: state
      entity_id:
        - todo.guard___ID__
        - todo.guard___ID___dozwolone
    - trigger: homeassistant
      event: start
    - trigger: event
      event_type: aurora_guard_refresh
    - trigger: time_pattern
      minutes: "/15"
  actions:
    - action: todo.get_items
      target:
        entity_id: todo.guard___ID__
      data:
        status: needs_action
      response_variable: blk
    - action: todo.get_items
      target:
        entity_id: todo.guard___ID___dozwolone
      data:
        status: needs_action
      response_variable: alw
  sensor:
    - name: "Aurora Guard __ID__ rules"
      unique_id: aurora_guard___ID___rules
      icon: mdi:shield-account-outline
      state: "{{ blk['todo.guard___ID__']['items'] | length }}"
      attributes:
        blocked: >-
          {% set ns = namespace(l=[]) %}{% for i in blk['todo.guard___ID__']['items'] %}{% set q = i.summary.split('|') %}{% if q | length < 3 %}{% set ns.l = ns.l + [q[0] | trim] %}{% endif %}{% endfor %}{{ ns.l }}
        limits: >-
          {% set ns = namespace(l=[]) %}{% for i in blk['todo.guard___ID__']['items'] %}{% set q = i.summary.split('|') %}{% if q | length >= 3 and q[2] | trim | int(0) > 0 %}{% set ns.l = ns.l + [(q[0] | trim) ~ '|' ~ (q[2] | trim | int(0))] %}{% endif %}{% endfor %}{{ ns.l }}
        allowed: "{{ alw['todo.guard___ID___dozwolone']['items'] | map(attribute='summary') | map('regex_replace', '[|].*$', '') | list }}"

# Pozycja telefonu (zamiast przestarzalego device_tracker.see): szablonowy device_tracker z webhooka
- triggers:
    - trigger: webhook
      webhook_id: __HOOK__
      local_only: false
      allowed_methods: [POST]
  conditions:
    - condition: template
      value_template: "{{ trigger.json.type | default('') == 'location' }}"
  device_tracker:
    - name: "Aurora Guard __ID__"
      unique_id: aurora_guard___ID___gps
      default_entity_id: device_tracker.guard___ID__
      icon: mdi:cellphone-marker
      latitude: "{{ trigger.json.lat | float(0) }}"
      longitude: "{{ trigger.json.lon | float(0) }}"
      location_accuracy: "{{ trigger.json.acc | default(50) | float(50) }}"
